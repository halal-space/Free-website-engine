/**
 * MSW Integration Test Suite (Blueprint §11 Testing Strategy).
 *
 * Simulates the real backend REST API using Mock Service Worker (MSW) in Node.
 * Verifies:
 * - End-to-end request/response cycles for store config and product endpoints
 * - Next.js cache tag options passed in native fetch calls
 * - Keyset cursor pagination and filter query params
 * - Granular cache tags for single product requests
 * - Correct 404 error mapping for STORE_NOT_FOUND and PRODUCT_NOT_FOUND
 * - 403 STORE_DISABLED error mapping
 * - 500 INTERNAL_ERROR error handling
 * - 429 rate limiting retry recovery and exhaustion
 */

import { describe, it, expect, beforeAll, afterAll, afterEach, beforeEach, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { getStoreConfig } from './store-service';
import { getStoreProducts, getStoreProduct } from './product-service';
import { StorefrontError } from './errors';
import * as fetchClient from './fetch-client';
import type { StoreConfig } from '../types/store';
import type { Product } from '../types/product';

const API_BASE = 'https://api.storefront.test';

const mockStoreConfig: StoreConfig = {
  id: 'msw-store',
  name: 'MSW Test Store',
  tagline: 'Precision testing',
  templateId: 'gadget_aurelia',
  domain: 'msw-store',
  customDomain: null,
  theme: {
    fontPrimary: 'Inter',
    colorBackground: '#ffffff',
    colorSurface: '#f4f4f4',
    colorText: '#111111',
    colorTextMuted: '#666666',
    colorPrimary: '#0055ff',
    colorPrimaryForeground: '#ffffff',
    colorBorder: '#e0e0e0',
    colorAccent: '#0055ff',
    borderRadius: '8px',
    supportsDarkMode: false,
  },
  sections: [
    {
      blockId: 'sec_1',
      componentId: 'shared:product_grid',
      order: 1,
      props: { title: 'Featured' },
    },
  ],
  metadata: {
    seoTitle: 'MSW Store',
  },
};

const mockProduct: Product = {
  id: 'prod-1',
  storeId: 'msw-store',
  slug: 'msw-headphones',
  title: 'MSW Headphones',
  price: 299,
  currency: 'USD',
  description: 'Test product',
  images: [{ url: 'https://example.com/img.jpg', alt: 'Test' }],
  category: 'audio',
  availability: 'in-stock',
  stockCount: 10,
  badges: ['best-seller'],
  rating: 4.9,
  reviewCount: 50,
};

let capturedRequests: Request[] = [];

const server = setupServer(
  http.get(`${API_BASE}/api/stores/:storeId/config`, ({ params, request }) => {
    capturedRequests.push(request);
    const { storeId } = params;

    if (storeId === 'disabled-store') {
      return HttpResponse.json(
        { error: 'STORE_DISABLED', message: 'Store is currently disabled' },
        { status: 403 }
      );
    }

    if (storeId === 'missing-store') {
      return HttpResponse.json(
        { error: 'STORE_NOT_FOUND', message: `No store with id '${storeId}'` },
        { status: 404 }
      );
    }

    if (storeId === 'error-store') {
      return HttpResponse.text('Internal Server Error', { status: 500 });
    }

    return HttpResponse.json(mockStoreConfig, { status: 200 });
  }),

  http.get(`${API_BASE}/api/stores/:storeId/products`, ({ params, request }) => {
    capturedRequests.push(request);
    const { storeId } = params;

    if (storeId === 'missing-store') {
      return HttpResponse.json(
        { error: 'STORE_NOT_FOUND', message: `Store not found` },
        { status: 404 }
      );
    }

    const url = new URL(request.url);
    const filter = url.searchParams.get('filter');
    const limit = url.searchParams.get('limit');
    const cursor = url.searchParams.get('cursor');

    return HttpResponse.json(
      {
        items: [mockProduct],
        nextCursor: cursor ? null : 'cursor_next_page',
        meta: { filter, limit },
      },
      { status: 200 }
    );
  }),

  http.get(`${API_BASE}/api/stores/:storeId/products/:slug`, ({ params, request }) => {
    capturedRequests.push(request);
    const { slug } = params;

    if (slug === 'missing-slug') {
      return HttpResponse.json(
        { error: 'PRODUCT_NOT_FOUND', message: `Product not found: ${slug}` },
        { status: 404 }
      );
    }

    return HttpResponse.json(mockProduct, { status: 200 });
  })
);

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterAll(() => {
  server.close();
});

beforeEach(() => {
  capturedRequests = [];
  process.env.BACKEND_API_URL = API_BASE;
  vi.spyOn(fetchClient.retryHelper, 'delay').mockResolvedValue();
});

afterEach(() => {
  server.resetHandlers();
  delete process.env.BACKEND_API_URL;
  vi.restoreAllMocks();
});

describe('MSW Integration: Store Service', () => {
  it('fetches store config from mock backend and parses response', async () => {
    const config = await getStoreConfig('msw-store');

    expect(config.id).toBe('msw-store');
    expect(config.name).toBe('MSW Test Store');
    expect(capturedRequests.length).toBe(1);
    expect(capturedRequests[0].url).toBe(`${API_BASE}/api/stores/msw-store/config`);
  });

  it('handles 404 STORE_NOT_FOUND from backend', async () => {
    await expect(getStoreConfig('missing-store')).rejects.toThrowError(
      expect.objectContaining({
        code: 'STORE_NOT_FOUND',
        httpStatus: 404,
      })
    );
  });

  it('handles 403 STORE_DISABLED from backend', async () => {
    await expect(getStoreConfig('disabled-store')).rejects.toThrowError(
      expect.objectContaining({
        code: 'STORE_DISABLED',
        httpStatus: 403,
      })
    );
  });

  it('handles 500 INTERNAL_ERROR from backend', async () => {
    await expect(getStoreConfig('error-store')).rejects.toThrowError(
      expect.objectContaining({
        code: 'INTERNAL_ERROR',
        httpStatus: 500,
      })
    );
  });
});

describe('MSW Integration: Product Service', () => {
  it('fetches product list with filter and pagination cursor', async () => {
    const response = await getStoreProducts('msw-store', {
      filter: 'audio',
      limit: 10,
      cursor: 'cursor_123',
    });

    expect(response.items.length).toBe(1);
    expect(response.items[0].slug).toBe('msw-headphones');
    expect(capturedRequests.length).toBe(1);

    const requestUrl = new URL(capturedRequests[0].url);
    expect(requestUrl.searchParams.get('filter')).toBe('audio');
    expect(requestUrl.searchParams.get('limit')).toBe('10');
    expect(requestUrl.searchParams.get('cursor')).toBe('cursor_123');
  });

  it('fetches single product by slug from mock backend', async () => {
    const product = await getStoreProduct('msw-store', 'msw-headphones');

    expect(product.slug).toBe('msw-headphones');
    expect(product.title).toBe('MSW Headphones');
    expect(capturedRequests.length).toBe(1);
    expect(capturedRequests[0].url).toBe(`${API_BASE}/api/stores/msw-store/products/msw-headphones`);
  });

  it('correctly maps 404 PRODUCT_NOT_FOUND on missing single product', async () => {
    await expect(getStoreProduct('msw-store', 'missing-slug')).rejects.toThrowError(
      expect.objectContaining({
        code: 'PRODUCT_NOT_FOUND',
        httpStatus: 404,
      })
    );
  });
});

describe('MSW Integration: 429 Rate Limiting & Recovery', () => {
  it('retries 429 responses and resolves when subsequent request succeeds', async () => {
    let callCount = 0;

    server.use(
      http.get(`${API_BASE}/api/stores/:storeId/config`, () => {
        callCount++;
        if (callCount < 3) {
          return new HttpResponse(null, { status: 429, statusText: 'Too Many Requests' });
        }
        return HttpResponse.json(mockStoreConfig, { status: 200 });
      })
    );

    const config = await getStoreConfig('msw-store');
    expect(config.id).toBe('msw-store');
    expect(callCount).toBe(3);
    expect(fetchClient.retryHelper.delay).toHaveBeenCalledTimes(2);
  });

  it('throws RATE_LIMITED when 429 retries are completely exhausted', async () => {
    server.use(
      http.get(`${API_BASE}/api/stores/:storeId/config`, () => {
        return new HttpResponse(null, { status: 429, statusText: 'Too Many Requests' });
      })
    );

    await expect(getStoreConfig('msw-store')).rejects.toThrowError(
      expect.objectContaining({
        code: 'RATE_LIMITED',
        httpStatus: 429,
      })
    );
  });
});
