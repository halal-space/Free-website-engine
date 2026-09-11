/**
 * Unit tests for cache tag builder functions (Testing Strategy §11).
 *
 * Verifies that storeConfigTag, storeProductsTag, and productTag produce
 * the deterministic tag strings required for Next.js ISR revalidation.
 */

import { describe, it, expect } from 'vitest';
import { storeConfigTag, storeProductsTag, productTag } from './cache-tags';

describe('Cache Tag Builders', () => {
  it('builds correct store config cache tag', () => {
    expect(storeConfigTag('tech-haven')).toBe('store_config_tech-haven');
    expect(storeConfigTag('demo-aurelia')).toBe('store_config_demo-aurelia');
  });

  it('builds correct store products cache tag', () => {
    expect(storeProductsTag('tech-haven')).toBe('store_products_tech-haven');
    expect(storeProductsTag('demo-aurelia')).toBe('store_products_demo-aurelia');
  });

  it('builds correct product-specific cache tag', () => {
    expect(productTag('tech-haven', 'quantum-pro')).toBe('product_tech-haven_quantum-pro');
    expect(productTag('demo-atelier', 'cashmere-coat')).toBe('product_demo-atelier_cashmere-coat');
  });
});
