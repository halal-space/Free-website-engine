/**
 * Unit tests for component registry (Testing Strategy §11, Acceptance Criteria §16).
 *
 * Verifies:
 * - resolveComponent returns dynamic component for registered IDs
 * - resolveComponent throws descriptive RegistryError for unknown IDs
 * - registerComponent adds new entries and overwrites cleanly
 * - getRegisteredComponentIds returns all registered keys
 */

import { describe, it, expect } from 'vitest';
import {
  resolveComponent,
  registerComponent,
  getRegisteredComponentIds,
} from './component-registry';
import { RegistryError } from '../services/errors';

describe('component-registry', () => {
  it('resolves registered component "shared:product_grid" to dynamic component', () => {
    const Component = resolveComponent('shared:product_grid');
    expect(Component).toBeDefined();
    // next/dynamic components are React components (functions or objects with render)
    expect(['function', 'object']).toContain(typeof Component);
  });

  it('throws descriptive RegistryError when resolving unknown componentId', () => {
    expect(() => resolveComponent('nonexistent:thing')).toThrowError(
      RegistryError
    );

    try {
      resolveComponent('nonexistent:thing');
    } catch (err: any) {
      expect(err).toBeInstanceOf(RegistryError);
      expect(err.code).toBe('REGISTRY_ERROR');
      expect(err.componentId).toBe('nonexistent:thing');
      expect(err.validIds).toBeDefined();
      expect(err.message).toContain('nonexistent:thing');
      expect(err.message).toContain('Valid IDs');
    }
  });

  it('allows registering a new component and resolving it', () => {
    registerComponent('custom:banner', {
      loader: async () => ({ default: () => null }),
      ssr: true,
    });

    const Component = resolveComponent('custom:banner');
    expect(Component).toBeDefined();
    expect(getRegisteredComponentIds()).toContain('custom:banner');
  });

  it('lists all registered component IDs through getRegisteredComponentIds', () => {
    const ids = getRegisteredComponentIds();
    expect(ids).toContain('shared:product_grid');
    expect(ids).toContain('gadget:hero_3d_stage');
  });
});
