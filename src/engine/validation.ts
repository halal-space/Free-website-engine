import type { StorefrontSnapshot, ThemeId } from './types';
import { THEME_IDS } from './theme-registry';

const STORE_ID = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CURRENCY = /^[A-Z]{3}$/;
const HOST = /^(?=.{1,253}$)[a-z0-9.-]+$/;
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;
const SECTIONS = new Set(['hero', 'discovery', 'featured', 'collections', 'story', 'announcement']);
const LEGACY_THEME_IDS: Record<string, ThemeId> = { playful: 'm1', precision: 'g2', editorial: 'c3' };

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function nonEmpty(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
function safeImage(value: unknown): boolean {
  if (!nonEmpty(value)) return false;
  if (/^\/storefront-demo\/[a-z0-9-]+\.png$/.test(value)) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password;
  }
  catch { return false; }
}

export function contrastRatio(a: string, b: string): number {
  function luminance(hex: string) {
    const values = [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16) / 255);
    const linear = values.map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    return .2126 * linear[0] + .7152 * linear[1] + .0722 * linear[2];
  }
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
}

export function readableInk(background: string): string {
  const dark = '#15181E';
  const light = '#FFFFFF';
  const darkContrast = contrastRatio(dark, background);
  const lightContrast = contrastRatio(light, background);
  if (darkContrast >= 4.5 && darkContrast >= lightContrast) return dark;
  if (lightContrast >= 4.5) return light;
  return '#000000';
}

export function normalizeHost(raw: string): string | null {
  const host = raw.trim().toLowerCase().replace(/:\d+$/, '').replace(/\.$/, '');
  return HOST.test(host) && !host.includes('..') && !host.startsWith('.') && !host.endsWith('.') ? host : null;
}

export function isValidStoreId(value: string): boolean { return STORE_ID.test(value); }

export function parseSnapshot(value: unknown, expectedStoreId: string): StorefrontSnapshot {
  // Version 1 shipped with three theme names. Preserve its merchant content and
  // tokens while mapping only those known names into the nine-theme registry.
  if (record(value) && record(value.config) && value.config.schemaVersion === 1) {
    const oldTheme = String(value.config.themeId);
    const themeId = LEGACY_THEME_IDS[oldTheme] ?? oldTheme;
    value = { ...value, config: { ...value.config, schemaVersion: 2, themeId } };
  }
  assertSnapshot(value, expectedStoreId);
  return value;
}

export function assertSnapshot(value: unknown, expectedStoreId: string): asserts value is StorefrontSnapshot {
  if (!record(value)) throw new Error('Invalid storefront response');
  const { merchant, config, products, collections } = value;
  if (!record(merchant) || !record(config) || !Array.isArray(products) || !Array.isArray(collections)) {
    throw new Error('Incomplete storefront response');
  }
  if (merchant.id !== expectedStoreId || config.storeId !== expectedStoreId || !THEME_IDS.has(String(config.themeId))) {
    throw new Error('Storefront identity or theme mismatch');
  }
  if (!nonEmpty(merchant.name) || !nonEmpty(merchant.email) || !nonEmpty(merchant.about)
    || !nonEmpty(merchant.logoText) || !nonEmpty(merchant.tagline) || !CURRENCY.test(String(merchant.currency))
    || !Array.isArray(merchant.domains) || merchant.domains.length === 0
    || merchant.domains.some(d => typeof d !== 'string' || normalizeHost(d) !== d)
    || !record(merchant.policies)
    || Object.values(merchant.policies).some(policy => typeof policy !== 'string')) {
    throw new Error('Invalid merchant data');
  }
  if (config.schemaVersion !== 2 || typeof config.publishedVersion !== 'number' || !Number.isInteger(config.publishedVersion) || config.publishedVersion < 1 || !Array.isArray(config.homepage)
    || !record(config.seo) || !nonEmpty(config.seo.description) || !record(config.tokens)) {
    throw new Error('Unsupported storefront configuration');
  }
  const t = config.tokens;
  if (!(['primary', 'secondary', 'accent', 'hover', 'background', 'surface', 'text', 'muted', 'border'] as const).every(key => typeof t[key] === 'string' && HEX_COLOR.test(t[key]))
    || !['sans', 'serif', 'rounded'].includes(String(t.displayFont))
    || !['sans', 'serif'].includes(String(t.bodyFont))
    || !['standard', 'large'].includes(String(t.headingScale))
    || !['regular', 'bold', 'heavy'].includes(String(t.headingWeight))
    || !['standard', 'relaxed'].includes(String(t.bodyLineHeight))
    || !['tight', 'normal'].includes(String(t.letterSpacing))
    || !['comfortable', 'compact'].includes(String(t.density))
    || !['standard', 'wide'].includes(String(t.containerWidth))
    || !['compact', 'standard'].includes(String(t.gridGap))
    || !['soft', 'sharp'].includes(String(t.radius))
    || !['rounded', 'pill', 'square'].includes(String(t.buttonShape))
    || !['thin', 'strong'].includes(String(t.borderWidth))
    || !['none', 'soft'].includes(String(t.shadow))
    || !['full', 'subtle', 'none'].includes(String(t.motion))) {
    throw new Error('Invalid design tokens');
  }
  if (contrastRatio(t.text as string, t.background as string) < 4.5
    || contrastRatio(t.text as string, t.surface as string) < 4.5
    || contrastRatio(t.muted as string, t.background as string) < 4.5) {
    throw new Error('Design tokens have insufficient text contrast');
  }
  if (config.homepage.length > 12 || new Set(config.homepage.map(s => record(s) ? s.id : undefined)).size !== config.homepage.length
    || config.homepage.some(s => !record(s) || !nonEmpty(s.id) || !SECTIONS.has(String(s.kind))
    || typeof s.enabled !== 'boolean' || (s.title !== undefined && typeof s.title !== 'string')
    || (s.text !== undefined && typeof s.text !== 'string') || (s.image !== undefined && !safeImage(s.image))
    || (s.eyebrow !== undefined && typeof s.eyebrow !== 'string')
    || (s.ctaLabel !== undefined && (!nonEmpty(s.ctaLabel) || s.ctaLabel.length > 80))
    || (s.ctaHref !== undefined && (typeof s.ctaHref !== 'string' || !/^\/(?!\/)[a-z0-9/-]*$/.test(s.ctaHref)))
    || (s.kind === 'hero' && s.enabled && (!nonEmpty(s.title) || !safeImage(s.image))))
    || !Array.isArray(config.navigation)
    || config.navigation.some(link => !record(link) || !nonEmpty(link.label)
      || typeof link.href !== 'string' || !link.href.startsWith('/') || link.href.startsWith('//')
      || /[\\\x00-\x1f]/.test(link.href))) {
    throw new Error('Invalid storefront sections or navigation');
  }
  if (products.some(p => !record(p) || p.storeId !== expectedStoreId || !nonEmpty(p.id) || !SLUG.test(String(p.slug))
    || !nonEmpty(p.name) || !CURRENCY.test(String(p.currency)) || p.currency !== merchant.currency || !safeImage(p.image)
    || !Number.isInteger(p.priceMinor) || Number(p.priceMinor) < 0 || !Array.isArray(p.images)
    || p.images.some((image: unknown) => !safeImage(image)) || typeof p.available !== 'boolean'
    || !nonEmpty(p.collectionId) || (p.collectionIds !== undefined && (!Array.isArray(p.collectionIds)
      || p.collectionIds.some((id: unknown) => !nonEmpty(id)) || new Set(p.collectionIds).size !== p.collectionIds.length)))
    || collections.some(c => !record(c) || c.storeId !== expectedStoreId || !nonEmpty(c.id)
      || !SLUG.test(String(c.slug)) || !nonEmpty(c.name) || !safeImage(c.image)
      || (c.placement !== undefined && !['category', 'discovery'].includes(String(c.placement))))
    || new Set(products.map(p => record(p) ? p.id : undefined)).size !== products.length
    || new Set(products.map(p => record(p) ? p.slug : undefined)).size !== products.length
    || new Set(collections.map(c => record(c) ? c.id : undefined)).size !== collections.length
    || new Set(collections.map(c => record(c) ? c.slug : undefined)).size !== collections.length
    || products.some(p => record(p) && (!collections.some(c => record(c) && c.id === p.collectionId)
      || (Array.isArray(p.collectionIds) && p.collectionIds.some(id => !collections.some(c => record(c) && c.id === id)))))) {
    throw new Error('Invalid or cross-tenant catalog data');
  }
}
