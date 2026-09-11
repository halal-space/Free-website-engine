/**
 * Unit tests for store configuration service (Testing Strategy §11, Acceptance Criteria §16).
 *
 * Verifies:
 * - Returns preset when BACKEND_API_URL is unset
 * - Calls fetch with correct URL and cache tags when BACKEND_API_URL is set
 * - Throws typed StorefrontError on 404, 500, and invalid storeId
 * - Implements retry logic on 429 responses
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getStoreConfig } from './store-service';
import { StorefrontError } from './errors';
import * as fetchClient from './fetch-client';

describe('getStoreConfig', () => {
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

  it('returns preset config when BACKEND_API_URL is unset', async () => {
    const config = await getStoreConfig('demo-aurelia');
    expect(config.id).toBe('demo-aurelia');
    expect(config.templateId).toBe('gadget_aurelia');
    expect(config.sections.length).toBeGreaterThan(0);
  });

  it('throws STORE_NOT_FOUND when local preset does not exist', async () => {
    await expect(getStoreConfig('nonexistent-store')).rejects.toThrowError(
      expect.objectContaining({
        code: 'STORE_NOT_FOUND',
        httpStatus: 404,
      })
    );
  });

  it('validates storeId and rejects invalid inputs before fetching', async () => {
    await expect(getStoreConfig('../evil')).rejects.toThrowError(
      expect.objectContaining({
        code: 'INVALID_STORE_ID',
      })
    );
  });

  it('calls fetch with correct URL and cache tags when BACKEND_API_URL is set', async () => {
    process.env.BACKEND_API_URL = 'https://api.example.com';

    const mockStoreConfig = {
      id: 'demo-aurelia',
      name: 'Tech Haven Remote',
      templateId: 'gadget_aurelia',
      domain: 'demo-aurelia',
      theme: {} as any,
      sections: [],
      metadata: {},
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockStoreConfig,
    });
    vi.stubGlobal('fetch', fetchMock);

    const config = await getStoreConfig('demo-aurelia');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/api/stores/demo-aurelia/config',
      expect.objectContaining({
        next: {
          tags: ['store_config_demo-aurelia'],
          revalidate: 60,
        },
      })
    );
    expect(config.name).toBe('Tech Haven Remote');
  });

  it('throws typed StorefrontError on 404 response from backend', async () => {
    process.env.BACKEND_API_URL = 'https://api.example.com';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({ error: 'STORE_NOT_FOUND', message: 'Not found' }),
      })
    );

    await expect(getStoreConfig('demo-aurelia')).rejects.toThrowError(
      expect.objectContaining({
        code: 'STORE_NOT_FOUND',
        httpStatus: 404,
      })
    );
  });

  it('throws typed StorefrontError on 500 response from backend', async () => {
    process.env.BACKEND_API_URL = 'https://api.example.com';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        text: async () => 'Internal Server Error',
      })
    );

    await expect(getStoreConfig('demo-aurelia')).rejects.toThrowError(
      expect.objectContaining({
        code: 'INTERNAL_ERROR',
        httpStatus: 500,
      })
    );
  });

  it('retries on 429 response with exponential backoff and succeeds', async () => {
    process.env.BACKEND_API_URL = 'https://api.example.com';
    vi.spyOn(fetchClient.retryHelper, 'delay').mockResolvedValue();

    const mockConfig = {
      id: 'demo-aurelia',
      name: 'Tech Haven',
      templateId: 'gadget_aurelia',
      domain: 'demo-aurelia',
      theme: {} as any,
      sections: [],
      metadata: {},
    };

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ status: 429, ok: false })
      .mockResolvedValueOnce({ status: 429, ok: false })
      .mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => mockConfig,
      });

    vi.stubGlobal('fetch', fetchMock);

    const config = await getStoreConfig('demo-aurelia');
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(config.id).toBe('demo-aurelia');
  });

  it('throws RATE_LIMITED error when 429 retries are exhausted', async () => {
    process.env.BACKEND_API_URL = 'https://api.example.com';
    vi.spyOn(fetchClient.retryHelper, 'delay').mockResolvedValue();

    const fetchMock = vi.fn().mockResolvedValue({ status: 429, ok: false });
    vi.stubGlobal('fetch', fetchMock);

    await expect(getStoreConfig('demo-aurelia')).rejects.toThrowError(
      expect.objectContaining({
        code: 'RATE_LIMITED',
        httpStatus: 429,
      })
    );
  });
});
