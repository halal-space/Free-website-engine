/**
 * Product service — fetches product listings and individual product details.
 *
 * Same dual-mode pattern as store-service: live API when BACKEND_API_URL is set,
 * local seed data when unset. Supports cursor-based pagination and filter params
 * per the API contract in Blueprint §6.2 and §6.3.
 *
 * Security: validateStoreId() and validateSlug() called before any fetch.
 * Performance: fetch calls include Next.js cache tags for ISR revalidation.
 */

import type { Product } from '../types/product';
import { validateStoreId, validateSlug } from '../lib/validation';
import { storeProductsTag, productTag } from './cache-tags';
import { fetchWithRetry } from './fetch-client';
import { StorefrontError } from './errors';
import { getLocalStoreProducts } from '../config/presets';

/** Default ISR revalidation interval in seconds (Performance §10). */
const DEFAULT_REVALIDATE_SECONDS = 60;

/** Server-side cap on products per request (§6.2 contract). */
const MAX_PRODUCTS_LIMIT = 50;

/** Default products per request when no limit specified. */
const DEFAULT_PRODUCTS_LIMIT = 12;

/** Recognized preset product filters. */
const KNOWN_FILTERS = new Set(['featured', 'new-arrivals', 'best-sellers', 'deals']);

// ── Types ────────────────────────────────────────────────

/** Query parameters for product listing requests. */
export interface ProductListParams {
  filter?: string;
  limit?: number;
  cursor?: string;
}

/** Paginated product listing response shape from the API (§6.2). */
export interface ProductListResponse {
  items: Product[];
  nextCursor: string | null;
}

// ── Product Listing ──────────────────────────────────────

/**
 * What it does: Fetches a paginated, filterable list of products for a validated storeId.
 * Why it exists: Feeds dynamic section components (e.g. product grid, carousel) and shop catalog pages (Blueprint §2 & §6.2).
 * How it works: Validates storeId; clamps limit to [1, 50]; delegates to local seed presets or remote API with Next.js cache tags.
 * Limitations & Risks: Cursor-based pagination is supported on live backend; local dev mode returns up to limit items with nextCursor: null.
 *
 * @param storeId - Validated store identifier
 * @param params - Query parameters (filter, limit, cursor)
 * @returns Paginated product list with nextCursor
 */
export async function getStoreProducts(
  storeId: string,
  params: ProductListParams = {}
): Promise<ProductListResponse> {
  validateStoreId(storeId);

  const backendUrl = process.env.BACKEND_API_URL;
  const effectiveLimit = clampLimit(params.limit);

  if (!backendUrl) {
    return getLocalProducts(storeId, { ...params, limit: effectiveLimit });
  }

  return fetchRemoteProducts(storeId, backendUrl, {
    ...params,
    limit: effectiveLimit,
  });
}

// ── Single Product ───────────────────────────────────────

/**
 * What it does: Fetches a single product by slug within a specified store.
 * Why it exists: Powers the Product Detail Page (PDP) layout and metadata generation (Blueprint §6.3).
 * How it works: Validates storeId and slug; checks local presets or fetches remote endpoint using granular product cache tags.
 * Limitations & Risks: Throws PRODUCT_NOT_FOUND if slug does not exist in store catalog.
 *
 * @param storeId - Validated store identifier
 * @param slug - Validated product URL slug
 * @returns Complete unified Product object
 * @throws StorefrontError on invalid identifiers or non-existent product
 */
export async function getStoreProduct(
  storeId: string,
  slug: string
): Promise<Product> {
  validateStoreId(storeId);
  validateSlug(slug);

  const backendUrl = process.env.BACKEND_API_URL;

  if (!backendUrl) {
    return getLocalProductBySlug(storeId, slug);
  }

  return fetchRemoteProduct(storeId, slug, backendUrl);
}

// ── Internal: Local Data ─────────────────────────────────

/**
 * Returns seed products from local presets, applying filter and limit.
 */
function getLocalProducts(
  storeId: string,
  params: ProductListParams
): ProductListResponse {
  console.debug(
    `[storefront:product-service] Using local products for store "${storeId}"`
  );

  const allProducts = getLocalStoreProducts(storeId);

  if (!allProducts) {
    throw new StorefrontError(
      'STORE_NOT_FOUND',
      `No local product data for store "${storeId}"`,
      storeId,
      404
    );
  }

  const filtered = applyLocalFilter(allProducts, params.filter);
  const limited = filtered.slice(0, params.limit ?? DEFAULT_PRODUCTS_LIMIT);

  return { items: limited, nextCursor: null };
}

/**
 * Returns a single product from local presets by slug.
 */
function getLocalProductBySlug(storeId: string, slug: string): Product {
  const allProducts = getLocalStoreProducts(storeId);

  if (!allProducts) {
    throw new StorefrontError(
      'STORE_NOT_FOUND',
      `No local product data for store "${storeId}"`,
      storeId,
      404
    );
  }

  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    throw new StorefrontError(
      'PRODUCT_NOT_FOUND',
      `Product "${slug}" not found in store "${storeId}"`,
      storeId,
      404
    );
  }

  return product;
}

/**
 * Applies a filter key to the product list — matches isFeatured, isNew, badges,
 * or category slug. Logs a warning when an unmatching filter is passed (§12).
 */
function applyLocalFilter(products: Product[], filter?: string): Product[] {
  if (!filter) return products;

  switch (filter) {
    case 'featured':
      return products.filter((p) => p.isFeatured);
    case 'new-arrivals':
      return products.filter((p) => p.isNew);
    case 'best-sellers':
      return products.filter((p) => p.badges.includes('best-seller'));
    case 'deals':
      return products.filter((p) => p.badges.includes('deal'));
    default: {
      const categoryMatches = products.filter((p) => p.category === filter);
      if (!KNOWN_FILTERS.has(filter) && categoryMatches.length === 0) {
        console.warn(
          `[storefront:product-service] Product fetch with invalid filter: "${filter}"`
        );
      }
      return categoryMatches;
    }
  }
}

// ── Internal: Remote Fetch ───────────────────────────────

/**
 * Fetches product listing from the live backend API with query params.
 */
async function fetchRemoteProducts(
  storeId: string,
  backendUrl: string,
  params: ProductListParams
): Promise<ProductListResponse> {
  const queryParts: string[] = [];

  if (params.filter) queryParts.push(`filter=${encodeURIComponent(params.filter)}`);
  if (params.limit) queryParts.push(`limit=${params.limit}`);
  if (params.cursor) queryParts.push(`cursor=${encodeURIComponent(params.cursor)}`);

  const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
  const url = `${backendUrl}/api/stores/${storeId}/products${queryString}`;

  console.info(
    `[storefront:product-service] Fetching products for store "${storeId}"`
  );

  return fetchWithRetry<ProductListResponse>(
    url,
    {
      next: {
        tags: [storeProductsTag(storeId)],
        revalidate: DEFAULT_REVALIDATE_SECONDS,
      },
    } as RequestInit,
    storeId
  );
}

/**
 * Fetches a single product from the live backend API.
 */
async function fetchRemoteProduct(
  storeId: string,
  slug: string,
  backendUrl: string
): Promise<Product> {
  const url = `${backendUrl}/api/stores/${storeId}/products/${slug}`;

  return fetchWithRetry<Product>(
    url,
    {
      next: {
        tags: [storeProductsTag(storeId), productTag(storeId, slug)],
        revalidate: DEFAULT_REVALIDATE_SECONDS,
      },
    } as RequestInit,
    storeId
  );
}

// ── Internal: Helpers ────────────────────────────────────

/**
 * Clamps the requested limit to the server-side maximum (50).
 * Defaults to 12 if no limit provided.
 */
function clampLimit(limit?: number): number {
  if (limit === undefined || limit === null) return DEFAULT_PRODUCTS_LIMIT;
  return Math.min(Math.max(1, limit), MAX_PRODUCTS_LIMIT);
}
