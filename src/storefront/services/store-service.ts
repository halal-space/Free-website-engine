/**
 * Store configuration service — fetches StoreConfig for a given storeId.
 *
 * Implements the dual-mode data source pattern from Blueprint §5 Architecture:
 * - If BACKEND_API_URL is set → fetch from the live API with Next.js cache tags
 * - If BACKEND_API_URL is unset → return seed data from local presets (dev mode)
 *
 * Security: validateStoreId() is called before any fetch to prevent path
 * traversal / SSRF (Security §8). BACKEND_API_URL is server-only (no NEXT_PUBLIC_ prefix).
 *
 * Observability: logs cache misses, warnings for 404s, and errors for 5xx (§12).
 */

import type { StoreConfig } from '../types/store';
import { validateStoreId } from '../lib/validation';
import { storeConfigTag } from './cache-tags';
import { fetchWithRetry } from './fetch-client';
import { StorefrontError } from './errors';
import { getLocalStorePreset } from '../config/presets';

/** Default ISR revalidation interval in seconds (Performance §10). */
const DEFAULT_REVALIDATE_SECONDS = 60;

/**
 * Returns a seed preset StoreConfig for local development.
 * Throws STORE_NOT_FOUND if storeId doesn't match any known preset —
 * never returns a "default" config (Edge Case §15).
 */
function getLocalStoreConfig(storeId: string): StoreConfig {
  console.debug(`[storefront:store-service] Using local preset for store "${storeId}"`);

  const preset = getLocalStorePreset(storeId);

  if (!preset) {
    throw new StorefrontError(
      'STORE_NOT_FOUND',
      `No local preset found for store "${storeId}"`,
      storeId,
      404
    );
  }

  return preset;
}

/**
 * Fetches StoreConfig from the live backend API.
 * Uses Next.js fetch cache with store-specific tags for ISR.
 */
async function fetchRemoteStoreConfig(
  storeId: string,
  backendUrl: string
): Promise<StoreConfig> {
  const url = `${backendUrl}/api/stores/${storeId}/config`;

  console.info(
    `[storefront:store-service] Fetching config for store "${storeId}" from ${url}`
  );

  const config = await fetchWithRetry<StoreConfig>(
    url,
    {
      next: {
        tags: [storeConfigTag(storeId)],
        revalidate: DEFAULT_REVALIDATE_SECONDS,
      },
    } as RequestInit,
    storeId
  );

  console.debug(`[storefront:store-service] Store config fetched successfully for store "${storeId}"`);
  return config;
}

/**
 * What it does: Fetches the complete StoreConfig (theme, sections, metadata) for a validated storeId.
 * Why it exists: Primary data source for the storefront assembler RSC (Blueprint #2) to render any store.
 * How it works: Validates storeId input; toggles between local preset seed data and remote Next.js cached fetch based on BACKEND_API_URL.
 * Limitations & Risks: Caller should execute this in parallel with getStoreProducts() via Promise.all to prevent waterfalls.
 *
 * @param storeId - Store identifier (alphanumeric and hyphens only, 1-64 chars)
 * @returns Complete StoreConfig object
 * @throws StorefrontError if invalid ID, store missing, or backend unavailable
 */
export async function getStoreConfig(storeId: string): Promise<StoreConfig> {
  validateStoreId(storeId);

  const backendUrl = process.env.BACKEND_API_URL;

  if (!backendUrl) {
    return getLocalStoreConfig(storeId);
  }

  return fetchRemoteStoreConfig(storeId, backendUrl);
}
