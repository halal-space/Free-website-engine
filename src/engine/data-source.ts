import { MOCK_STORES } from './mock-data';
import { getMockPublishedSnapshot } from './mock-publishing';
import { isValidStoreId, normalizeHost, parseSnapshot } from './validation';
import type { StorefrontSnapshot } from './types';

export { assertSnapshot, isValidStoreId, normalizeHost, parseSnapshot } from './validation';

export interface StorefrontDataSource {
  resolveHost(host: string): Promise<string | null>;
  getPublishedSnapshot(storeId: string): Promise<StorefrontSnapshot | null>;
}

export interface BackendStorefrontGateway {
  // The main NestJS API supplies these operations. Endpoints are intentionally
  // not guessed here; the gateway is wired once its actual contract is known.
  resolveVerifiedDomain(host: string, signal: AbortSignal): Promise<string | null>;
  getPublishedStorefront(storeId: string, signal: AbortSignal): Promise<unknown>;
}

export class MockStorefrontDataSource implements StorefrontDataSource {
  async resolveHost(rawHost: string): Promise<string | null> {
    const host = normalizeHost(rawHost);
    if (!host) return null;
    return Object.values(MOCK_STORES).find(s => s.merchant.domains.includes(host))?.merchant.id ?? null;
  }

  async getPublishedSnapshot(storeId: string): Promise<StorefrontSnapshot | null> {
    if (!isValidStoreId(storeId)) return null;
    return getMockPublishedSnapshot(storeId);
  }
}

export class ApiStorefrontDataSource implements StorefrontDataSource {
  constructor(private readonly gateway: BackendStorefrontGateway, private readonly timeoutMs = 5000) {
    if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) throw new Error('Invalid backend timeout');
  }

  async resolveHost(rawHost: string): Promise<string | null> {
    const host = normalizeHost(rawHost);
    if (!host) return null;
    const storeId = await this.withTimeout(signal => this.gateway.resolveVerifiedDomain(host, signal));
    if (storeId !== null && !isValidStoreId(storeId)) throw new Error('Invalid store identity from backend');
    return storeId;
  }

  async getPublishedSnapshot(storeId: string): Promise<StorefrontSnapshot | null> {
    if (!isValidStoreId(storeId)) return null;
    const value = await this.withTimeout(signal => this.gateway.getPublishedStorefront(storeId, signal));
    if (value === null) return null;
    return parseSnapshot(value, storeId);
  }

  private async withTimeout<T>(operation: (signal: AbortSignal) => Promise<T>): Promise<T> {
    const controller = new AbortController();
    let timeout!: ReturnType<typeof setTimeout>;
    const deadline = new Promise<never>((_, reject) => {
      timeout = setTimeout(() => {
        controller.abort();
        reject(new Error('Storefront backend timed out'));
      }, this.timeoutMs);
    });
    try { return await Promise.race([operation(controller.signal), deadline]); }
    finally { clearTimeout(timeout); }
  }
}

export function getDemoSource(): StorefrontDataSource {
  if (process.env.STOREFRONT_MODE === 'api' || (process.env.NODE_ENV === 'production' && process.env.STOREFRONT_MODE !== 'mock')) {
    throw new Error('Production storefront gateway is not configured');
  }
  return new MockStorefrontDataSource();
}
