/**
 * Preset map export and local preset accessor functions.
 *
 * Implements the dev-mode seed preset data source (Blueprint §5 Architecture).
 * Maps storeId strings (e.g., 'demo-aurelia') to their respective StoreConfig
 * and Product arrays for instant local development without a backend database.
 */

import type { StoreConfig } from '../../types/store';
import type { Product } from '../../types/product';
import { aureliaConfig, aureliaProducts } from './aurelia';
import { aetherConfig, aetherProducts } from './aether';
import { atelierVeleneConfig, atelierVeleneProducts } from './atelier-velene';
import { emberOakConfig, emberOakProducts } from './ember-oak';

// ── Preset Registries ───────────────────────────────────

/**
 * Map of store IDs to their default StoreConfig seed data.
 */
export const STORE_PRESETS: Record<string, StoreConfig> = {
  [aureliaConfig.id]: aureliaConfig,
  [aetherConfig.id]: aetherConfig,
  [atelierVeleneConfig.id]: atelierVeleneConfig,
  [emberOakConfig.id]: emberOakConfig,
};

/**
 * Map of store IDs to their seed Product lists.
 */
export const PRODUCT_PRESETS: Record<string, Product[]> = {
  [aureliaConfig.id]: aureliaProducts,
  [aetherConfig.id]: aetherProducts,
  [atelierVeleneConfig.id]: atelierVeleneProducts,
  [emberOakConfig.id]: emberOakProducts,
};

// ── Lookup Functions ─────────────────────────────────────

/**
 * What it does: Retrieves a seed StoreConfig object matching the given storeId.
 * Why it exists: Provides instant dev-mode data access without requiring a running database or backend API.
 * How it works: Directly indexes into the STORE_PRESETS dictionary.
 * Limitations & Risks: Returns undefined if storeId does not map to a known seed template.
 *
 * @param storeId - Store identifier
 * @returns Matching StoreConfig or undefined if not found
 */
export function getLocalStorePreset(storeId: string): StoreConfig | undefined {
  return STORE_PRESETS[storeId];
}

/**
 * What it does: Retrieves seed products for a store by storeId.
 * Why it exists: Supplies demo catalog data for development and testing of product listing sections.
 * How it works: Directly indexes into the PRODUCT_PRESETS dictionary.
 * Limitations & Risks: Returns undefined if storeId does not exist in seed presets.
 *
 * @param storeId - Store identifier
 * @returns Array of Product items or undefined if store not found
 */
export function getLocalStoreProducts(storeId: string): Product[] | undefined {
  return PRODUCT_PRESETS[storeId];
}

/**
 * What it does: Retrieves a single seed product by storeId and product slug.
 * Why it exists: Feeds local PDP pages and tests when operating in offline/demo mode.
 * How it works: Fetches the store's product list and finds the item matching the slug.
 * Limitations & Risks: Returns undefined if product slug is not present.
 *
 * @param storeId - Store identifier
 * @param slug - Product slug
 * @returns Product item or undefined if not found
 */
export function getLocalStoreProduct(
  storeId: string,
  slug: string
): Product | undefined {
  const products = getLocalStoreProducts(storeId);
  return products?.find((product) => product.slug === slug);
}
