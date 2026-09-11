/**
 * Component registry types — defines the shape of registry entries.
 *
 * ComponentEntry wraps a dynamic import function so the registry never eagerly
 * imports component code. This enables automatic code splitting per-template:
 * only the components actually used by a store's sections are loaded.
 *
 * WARNING for consuming components (Security §8):
 * SectionInstance.props is Record<string, unknown>. Components MUST validate/narrow
 * props before rendering. Never pass raw prop values to dangerouslySetInnerHTML.
 */

import type { ComponentType } from 'react';

/**
 * A single entry in the component registry.
 *
 * `loader` is a function returning a dynamic import — it's called only when the
 * storefront assembler (Blueprint #2) needs to render this component. This is
 * the mechanism behind per-template code splitting.
 *
 * `ssr` controls whether next/dynamic server-renders the component (default: true).
 * Set to false only for components that depend on browser APIs at render time
 * (e.g. Three.js canvas).
 */
export interface ComponentEntry {
  /** Dynamic import function — called lazily on first render. */
  loader: () => Promise<{ default: ComponentType<Record<string, unknown>> }>;

  /** Whether to server-render this component (default: true). */
  ssr?: boolean;
}

/**
 * The full component registry map type.
 * Keys are componentId strings in the format "namespace:component_name".
 */
export type ComponentRegistryMap = Record<string, ComponentEntry>;
