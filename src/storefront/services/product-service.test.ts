/**
 * Unit tests for product service (Testing Strategy §11, Acceptance Criteria §16).
 *
 * Verifies:
 * - Local dev preset fallback with filtering and limit
 * - Limit capped at 50 server-side
 * - Correct query parameter assembly for remote fetch
 * - Granular cache tags for single product fetch
 * - Error handling for missing products and stores
 * - 429 rate limiting retry handling
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getStoreProducts, getStoreProduct } from './product-service';
import { StorefrontError } from './errors';
import * as fetchClient from './fetch-client';

describe('product-service', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.BACKEND_API_URL;
    vi.restoreAllMocks();
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  describe('getStoreProducts (Local / Dev mode)', () => {
    it('returns local preset products when BACKEND_API_URL is unset', async () => {
      const response = await getStoreProducts('demo-aurelia');
      expect(response.items.length).toBeGreaterThan(0);
      expect(response.nextCursor).toBeNull();
      expect(response.items[0].storeId).toBe('demo-aurelia');
    });

    it('filters products by featured flag in local mode', async () => {
      const response = await getStoreProducts('demo-aurelia', {
        filter: 'featured',
        limit: 8,
      });
      expect(response.items.length).toBeGreaterThan(0);
      expect(response.items.every((p) => p.isFeatured)).toBe(true);
    });

    it('filters products by new arrivals in local mode', async () => {
      const response = await getStoreProducts('demo-aether', {
        filter: 'new-arrivals',
        limit: 2,
      });
      expect(response.items.length).toBeLessThanOrEqual(2);
      expect(response.items.every((p) => p.isNew)).toBe(true);
    });

    it('logs warning when filtering by unrecognized/unmatching filter in local mode', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const response = await getStoreProducts('demo-aurelia', {
        filter: 'invalid-nonexistent-category',
      });
      expect(response.items.length).toBe(0);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Product fetch with invalid filter')
      );
    });

    it('caps limit at 50', async () => {
      process.env.BACKEND_API_URL = 'https://api.example.com';
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ items: [], nextCursor: null }),
      });
      vi.stubGlobal('fetch', fetchMock);

      await getStoreProducts('demo-aurelia', { limit: 100 });

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('limit=50'),
        expect.any(Object)
      );
    });

    it('passes filter and cursor query params to remote fetch', async () => {
      process.env.BACKEND_API_URL = 'https://api.example.com';
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ items: [], nextCursor: null }),
      });
      vi.stubGlobal('fetch', fetchMock);

      await getStoreProducts('demo-aurelia', {
        filter: 'audio',
        limit: 10,
        cursor: 'cursor-xyz',
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.example.com/api/stores/demo-aurelia/products?filter=audio&limit=10&cursor=cursor-xyz',
        expect.objectContaining({
          next: {
            tags: ['store_products_demo-aurelia'],
            revalidate: 60,
          },
        })
      );
    });

    it('retries product list query on 429 response', async () => {
      process.env.BACKEND_API_URL = 'https://api.example.com';
      vi.spyOn(fetchClient.retryHelper, 'delay').mockResolvedValue();

      const fetchMock = vi
        .fn()
        .mockResolvedValueOnce({ status: 429, ok: false })
        .mockResolvedValueOnce({
          status: 200,
          ok: true,
          json: async () => ({ items: [], nextCursor: null }),
        });
      vi.stubGlobal('fetch', fetchMock);

      const response = await getStoreProducts('demo-aurelia');
      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(response.items).toEqual([]);
    });
  });

  describe('getStoreProduct (Single product)', () => {
    it('returns single product by slug from local presets', async () => {
      const product = await getStoreProduct(
        'demo-aurelia',
        'quantum-pro-headphones'
      );
      expect(product.slug).toBe('quantum-pro-headphones');
      expect(product.title).toBe('Quantum Pro Headphones');
    });

    it('throws PRODUCT_NOT_FOUND if slug does not exist locally', async () => {
      await expect(
        getStoreProduct('demo-aurelia', 'nonexistent-product')
      ).rejects.toThrowError(
        expect.objectContaining({
          code: 'PRODUCT_NOT_FOUND',
          httpStatus: 404,
        })
      );
    });

    it('fetches remote product with dual cache tags (catalog + product)', async () => {
      process.env.BACKEND_API_URL = 'https://api.example.com';
      const mockProduct = {
        id: 'p-1',
        slug: 'quantum-pro-headphones',
        title: 'Quantum Pro',
      };

      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockProduct,
      });
      vi.stubGlobal('fetch', fetchMock);

      const product = await getStoreProduct(
        'demo-aurelia',
        'quantum-pro-headphones'
      );

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.example.com/api/stores/demo-aurelia/products/quantum-pro-headphones',
        expect.objectContaining({
          next: {
            tags: [
              'store_products_demo-aurelia',
              'product_demo-aurelia_quantum-pro-headphones',
            ],
            revalidate: 60,
          },
        })
      );
      expect(product.title).toBe('Quantum Pro');
    });

    it('retries single product fetch on 429 response', async () => {
      process.env.BACKEND_API_URL = 'https://api.example.com';
      vi.spyOn(fetchClient.retryHelper, 'delay').mockResolvedValue();

      const mockProduct = { id: 'p-1', slug: 'quantum-pro', title: 'Quantum' };
      const fetchMock = vi
        .fn()
        .mockResolvedValueOnce({ status: 429, ok: false })
        .mockResolvedValueOnce({
          status: 200,
          ok: true,
          json: async () => mockProduct,
        });
      vi.stubGlobal('fetch', fetchMock);

      const product = await getStoreProduct('demo-aurelia', 'quantum-pro');
      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(product.title).toBe('Quantum');
    });
  });
});
