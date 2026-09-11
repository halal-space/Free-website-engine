/**
 * Dynamic component registry — maps componentId strings to lazily-loaded Next.js components.
 *
 * The storefront assembler (Blueprint #2) calls resolveComponent() with a
 * componentId from StoreConfig.sections[].componentId to get a renderable
 * component. Components are loaded via next/dynamic for automatic code splitting.
 *
 * Registry keys use the format "namespace:component_name" where namespace is
 * the template type (e.g. "shared", "gadget", "fashion", "dining").
 */

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { ComponentEntry, ComponentRegistryMap } from './registry.types';
import { RegistryError } from '../services/errors';

// ── Registry Map ─────────────────────────────────────────

const SEED_COMPONENT_IDS = [
  'gadget:hero_3d_stage',
  'gadget:hero_split',
  'fashion:hero_editorial',
  'fashion:lookbook_strip',
  'dining:hero_ambiance',
  'dining:menu_showcase',
  'dining:story_section',
  'dining:reservation_cta',
  'shared:product_grid',
  'shared:feature_highlights',
  'shared:newsletter_signup',
];

function createPlaceholderLoader(_id: string) {
  return async () => ({
    default: (_props: Record<string, unknown>) => null,
  });
}

/**
 * Global component registry map containing dynamic component entries.
 */
export const COMPONENT_REGISTRY: ComponentRegistryMap = Object.fromEntries(
  SEED_COMPONENT_IDS.map((id) => [
    id,
    {
      loader: createPlaceholderLoader(id),
      ssr: true,
    },
  ])
);

/**
 * Resolution cache to prevent re-instantiating dynamic() component wrappers on repeated renders.
 */
const RESOLVED_CACHE = new Map<string, ComponentType<Record<string, unknown>>>();

// ── Registration ─────────────────────────────────────────

/**
 * What it does: Registers a dynamic component loader under a namespaced componentId key.
 * Why it exists: Enables Blueprints #3–7 to plug components into the registry without hardcoded imports.
 * How it works: Writes entry to COMPONENT_REGISTRY map and invalidates any cached instance in RESOLVED_CACHE.
 * Limitations & Risks: Re-registering existing IDs overwrites silently, which supports HMR during dev mode.
 *
 * @param componentId - Registry key formatted as "namespace:component_name"
 * @param entry - Component loader function and SSR preferences
 */
export function registerComponent(
  componentId: string,
  entry: ComponentEntry
): void {
  COMPONENT_REGISTRY[componentId] = entry;
  RESOLVED_CACHE.delete(componentId);
}

// ── Resolution ───────────────────────────────────────────

/**
 * What it does: Resolves a componentId to a memoized Next.js dynamic React component.
 * Why it exists: Blueprint §1 & §2 requirement for composable page rendering with per-template code splitting.
 * How it works: Checks RESOLVED_CACHE; on cache miss, verifies entry existence, wraps loader with next/dynamic, and caches.
 * Limitations & Risks: Throws RegistryError with valid component list if componentId has not been registered.
 *
 * @param componentId - Section component key
 * @returns React Component suitable for JSX rendering
 * @throws RegistryError if unknown componentId
 */
export function resolveComponent(
  componentId: string
): ComponentType<Record<string, unknown>> {
  const cached = RESOLVED_CACHE.get(componentId);
  if (cached) {
    return cached;
  }

  const entry = COMPONENT_REGISTRY[componentId];
  if (!entry) {
    const validIds = Object.keys(COMPONENT_REGISTRY);
    console.error(
      `[storefront:registry] Unknown componentId "${componentId}". ` +
        `Registered IDs: ${validIds.join(', ') || '(none)'}`
    );
    throw new RegistryError(componentId, validIds);
  }

  const resolved = dynamic(entry.loader, { ssr: entry.ssr !== false });
  RESOLVED_CACHE.set(componentId, resolved);
  return resolved;
}

// ── Introspection ────────────────────────────────────────

/**
 * What it does: Returns an array of all currently registered componentId strings.
 * Why it exists: Enables test verification and provides component catalogues for merchant layout builders.
 * How it works: Reads all keys from the COMPONENT_REGISTRY dictionary.
 * Limitations & Risks: Risk: N/A.
 *
 * @returns Array of registered component IDs
 */
export function getRegisteredComponentIds(): string[] {
  return Object.keys(COMPONENT_REGISTRY);
}
