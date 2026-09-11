/**
 * Cache tag builder functions for Next.js ISR / on-demand revalidation.
 *
 * Each function produces a deterministic tag string that's used in two places:
 * 1. As `next: { tags: [...] }` in service layer fetch calls (read path)
 * 2. As `revalidateTag(tag)` in BFF mutation handlers (write path, Blueprint #9)
 *
 * Centralizing tag construction here prevents tag string drift between reads
 * and writes — a mismatch would cause stale data or unnecessary cache misses.
 */

/**
 * What it does: Builds the cache tag string for a store's configuration.
 * Why it exists: Enables on-demand Next.js ISR revalidation when store settings or layouts change (Blueprint §6.1).
 * How it works: Returns deterministic string formatted as `store_config_${storeId}`.
 * Limitations & Risks: Assumes storeId has been validated prior to invocation.
 *
 * @param storeId - Validated store identifier
 * @returns Cache tag string
 */
export function storeConfigTag(storeId: string): string {
  return `store_config_${storeId}`;
}

/**
 * What it does: Builds the cache tag string for a store's entire product catalog.
 * Why it exists: Invalidates cached product listings when catalog products are added, updated, or removed (Blueprint §6.2).
 * How it works: Returns deterministic string formatted as `store_products_${storeId}`.
 * Limitations & Risks: Invalidation purges all listing queries for the store.
 *
 * @param storeId - Validated store identifier
 * @returns Cache tag string
 */
export function storeProductsTag(storeId: string): string {
  return `store_products_${storeId}`;
}

/**
 * What it does: Builds a granular cache tag string for a single product within a store.
 * Why it exists: Supports surgical cache purging for single product edits without busting the whole catalog (Blueprint §6.3).
 * How it works: Returns deterministic string formatted as `product_${storeId}_${slug}`.
 * Limitations & Risks: Risk: N/A.
 *
 * @param storeId - Validated store identifier
 * @param slug - Validated product URL slug
 * @returns Granular cache tag string
 */
export function productTag(storeId: string, slug: string): string {
  return `product_${storeId}_${slug}`;
}
