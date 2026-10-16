import { assertSnapshot, isValidStoreId } from './validation';
import { MOCK_STORES } from './mock-data';
import type { StorefrontConfig, StorefrontSnapshot } from './types';

// Next.js may bundle routes separately. A process-wide demo state keeps those
// bundles in sync while making no durability promise across server restarts.
const mockState = globalThis as typeof globalThis & { __rooqxMockPublishing?: {
  published: Map<string, StorefrontSnapshot>;
  history: Map<string, StorefrontSnapshot[]>;
} };
const state: NonNullable<typeof mockState.__rooqxMockPublishing> = mockState.__rooqxMockPublishing ??= {
  published: new Map<string, StorefrontSnapshot>(), history: new Map<string, StorefrontSnapshot[]>(),
};
const { published, history } = state;

export function getMockPublishedSnapshot(storeId: string): StorefrontSnapshot | null {
  if (!isValidStoreId(storeId)) return null;
  const initial = Object.hasOwn(MOCK_STORES, storeId) ? MOCK_STORES[storeId] : null;
  return structuredClone(published.get(storeId) ?? initial);
}

export function publishMockConfig(storeId: string, proposed: unknown): StorefrontSnapshot {
  if (process.env.NODE_ENV === 'production' || process.env.STOREFRONT_MODE === 'api') throw new Error('Mock publishing is disabled');
  if (!isValidStoreId(storeId)) throw new Error('Invalid store ID');
  const current = getMockPublishedSnapshot(storeId);
  if (!current) throw new Error('Store not found');
  if (!proposed || typeof proposed !== 'object') throw new Error('Invalid configuration');
  const config = proposed as StorefrontConfig;
  if (config.storeId !== storeId) throw new Error('Store identity mismatch');
  if (config.publishedVersion !== current.config.publishedVersion) throw new Error('This design is out of date. Refresh before publishing.');
  const next: StorefrontSnapshot = {
    ...current,
    config: { ...config, storeId, publishedVersion: current.config.publishedVersion + 1 },
  };
  assertSnapshot(next, storeId);
  if (next.config.homepage.length > 12 || new Set(next.config.homepage.map(s => s.id)).size !== next.config.homepage.length) {
    throw new Error('Invalid homepage sections');
  }
  history.set(storeId, [...(history.get(storeId) ?? [current]), next]);
  published.set(storeId, structuredClone(next));
  return structuredClone(next);
}

export function getMockVersionHistory(storeId: string): number[] {
  const initial = Object.hasOwn(MOCK_STORES, storeId) ? MOCK_STORES[storeId] : null;
  return (history.get(storeId) ?? [initial]).filter((snapshot): snapshot is StorefrontSnapshot => Boolean(snapshot)).map(s => s.config.publishedVersion);
}
