import { describe, expect, it } from 'vitest';
import { assemblePage, parseStorefrontRoute } from './assemble';
import { ApiStorefrontDataSource, MockStorefrontDataSource, assertSnapshot, normalizeHost } from './data-source';
import { MOCK_STORES } from './mock-data';
import { getMockPublishedSnapshot, getMockVersionHistory, publishMockConfig } from './mock-publishing';
import { contrastRatio, readableInk } from './validation';
import { formatMinorAmount } from './money';

describe('storefront assembly', () => {
  it('formats minor amounts using each currency’s decimal units', () => {
    expect(formatMinorAmount(1234, 'USD')).toBe('$12.34');
    expect(formatMinorAmount(1234, 'JPY')).toBe('¥1,234');
    expect(formatMinorAmount(1234, 'KWD')).toContain('1.234');
  });

  it('recognizes public URLs and rejects unknown routes', () => {
    expect(parseStorefrontRoute([])).toEqual({ kind: 'home' });
    expect(parseStorefrontRoute(['products', 'arc-headphones'])).toEqual({ kind: 'product', slug: 'arc-headphones' });
    expect(parseStorefrontRoute(['policies', 'privacy'])).toEqual({ kind: 'policy', slug: 'privacy' });
    expect(parseStorefrontRoute(['products'])).toBeNull();
    expect(parseStorefrontRoute(['policies', 'anything'])).toBeNull();
  });

  it('assembles different merchants without sharing catalog content', () => {
    const kids = assemblePage(MOCK_STORES['sprout-and-co'], { kind: 'home' });
    const tech = assemblePage(MOCK_STORES['form-and-function'], { kind: 'home' });
    expect(kids?.themeId).toBe('playful');
    expect(tech?.themeId).toBe('precision');
    expect(kids?.products.every(p => p.storeId === 'sprout-and-co')).toBe(true);
    expect(tech?.products.every(p => p.storeId === 'form-and-function')).toBe(true);
  });

  it('keeps the catalog intact when a store changes themes', () => {
    const before = structuredClone(MOCK_STORES['sprout-and-co']);
    const after = structuredClone(before);
    after.config.themeId = 'editorial';
    const plan = assemblePage(after, { kind: 'shop' });
    expect(plan?.themeId).toBe('editorial');
    expect(plan?.products).toEqual(before.products);
    expect(after.merchant).toEqual(before.merchant);
  });

  it('rejects cross-tenant data and missing products', () => {
    const mixed = structuredClone(MOCK_STORES['sprout-and-co']);
    mixed.products.push(MOCK_STORES['form-and-function'].products[0]);
    expect(() => assemblePage(mixed, { kind: 'shop' })).toThrow(/tenant boundary/);
    expect(assemblePage(MOCK_STORES['sprout-and-co'], { kind: 'product', slug: 'missing' })).toBeNull();
  });
});

describe('tenant and backend boundaries', () => {
  it('selects readable text for light and dark merchant colors', () => {
    for (const background of ['#FFFFFF', '#101820', '#747474', '#777777', '#F8C994']) {
      expect(contrastRatio(readableInk(background), background)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('maps only known domains to stores', async () => {
    const source = new MockStorefrontDataSource();
    expect(normalizeHost('SPROUT.LOCALHOST:3000')).toBe('sprout.localhost');
    expect(await source.resolveHost('sprout.localhost:3000')).toBe('sprout-and-co');
    expect(await source.resolveHost('unknown.localhost')).toBeNull();
    expect(await source.getPublishedSnapshot('../sprout-and-co')).toBeNull();
    expect(await source.getPublishedSnapshot('constructor')).toBeNull();
  });

  it('rejects backend data for another store', async () => {
    const source = new ApiStorefrontDataSource({
      resolveVerifiedDomain: async () => 'sprout-and-co',
      getPublishedStorefront: async () => MOCK_STORES['form-and-function'],
    });
    await expect(source.getPublishedSnapshot('sprout-and-co')).rejects.toThrow(/identity/);
  });

  it('rejects malformed prices before rendering', () => {
    const malformed = structuredClone(MOCK_STORES['sprout-and-co']);
    malformed.products[0].priceMinor = -1;
    expect(() => assertSnapshot(malformed, 'sprout-and-co')).toThrow(/catalog/);
  });

  it('rejects incomplete merchant policy data before route assembly', () => {
    const malformed = structuredClone(MOCK_STORES['sprout-and-co']);
    (malformed.merchant as unknown as { policies?: unknown }).policies = undefined;
    expect(() => assertSnapshot(malformed, 'sprout-and-co')).toThrow(/merchant/);
  });

  it('stops a backend call that ignores cancellation', async () => {
    const source = new ApiStorefrontDataSource({
      resolveVerifiedDomain: async () => new Promise(() => {}),
      getPublishedStorefront: async () => null,
    }, 10);
    await expect(source.resolveHost('sprout.example.com')).rejects.toThrow(/timed out/);
  });

  it('rejects unsafe catalog and navigation values', () => {
    const badSlug = structuredClone(MOCK_STORES['sprout-and-co']);
    badSlug.products[0].slug = '../escape';
    expect(() => assertSnapshot(badSlug, 'sprout-and-co')).toThrow(/catalog/);
    const badNavigation = structuredClone(MOCK_STORES['sprout-and-co']);
    badNavigation.config.navigation[0].href = '/\\evil.example';
    expect(() => assertSnapshot(badNavigation, 'sprout-and-co')).toThrow(/navigation/);
  });
});

describe('local demo publishing', () => {
  it('keeps drafts separate and rejects stale updates', () => {
    const storeId = 'sprout-and-co';
    const before = getMockPublishedSnapshot(storeId)!;
    const draft = structuredClone(before.config);
    draft.homepage[0].title = 'A NEW START';
    expect(getMockPublishedSnapshot(storeId)?.config.homepage[0].title).toBe(before.config.homepage[0].title);
    const published = publishMockConfig(storeId, draft);
    expect(published.config.publishedVersion).toBe(before.config.publishedVersion + 1);
    expect(getMockPublishedSnapshot(storeId)?.config.homepage[0].title).toBe('A NEW START');
    expect(() => publishMockConfig(storeId, draft)).toThrow(/out of date/);
    expect(getMockVersionHistory(storeId)).toContain(published.config.publishedVersion);
  });
});
