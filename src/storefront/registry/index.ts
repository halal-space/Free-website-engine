/**
 * Barrel re-export for the component registry module.
 */

export {
  COMPONENT_REGISTRY,
  registerComponent,
  resolveComponent,
  getRegisteredComponentIds,
} from './component-registry';

export type { ComponentEntry, ComponentRegistryMap } from './registry.types';
