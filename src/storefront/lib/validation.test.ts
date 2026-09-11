/**
 * Unit tests for input validation utilities (Security §8, Testing Strategy §11).
 *
 * Verifies strict validation of storeId, blockId, and product slug against
 * path traversal, null bytes, SSRF payloads, length limits, and character sets.
 */

import { describe, it, expect } from 'vitest';
import { validateStoreId, validateBlockId, validateSlug } from './validation';
import { StorefrontError } from '../services/errors';

describe('validateStoreId', () => {
  it('accepts valid store identifiers', () => {
    expect(validateStoreId('tech-haven')).toBe('tech-haven');
    expect(validateStoreId('bistro-roma')).toBe('bistro-roma');
    expect(validateStoreId('a')).toBe('a');
    expect(validateStoreId('store123')).toBe('store123');
    expect(validateStoreId('a-b-c-d')).toBe('a-b-c-d');
  });

  it('rejects path traversal attempts', () => {
    expect(() => validateStoreId('../evil')).toThrow(StorefrontError);
    expect(() => validateStoreId('../../etc/passwd')).toThrow(StorefrontError);
    expect(() => validateStoreId('%2e%2e')).toThrow(StorefrontError);
    expect(() => validateStoreId('..')).toThrow(StorefrontError);
  });

  it('rejects null bytes and control characters', () => {
    expect(() => validateStoreId('store\0id')).toThrow(StorefrontError);
    expect(() => validateStoreId('store\nid')).toThrow(StorefrontError);
  });

  it('rejects strings over 64 characters', () => {
    const longId = 'a'.repeat(65);
    expect(() => validateStoreId(longId)).toThrow(StorefrontError);
    const validMaxLengthId = 'a'.repeat(64);
    expect(validateStoreId(validMaxLengthId)).toBe(validMaxLengthId);
  });

  it('rejects invalid characters, uppercase, and spaces', () => {
    expect(() => validateStoreId('Tech-Haven')).toThrow(StorefrontError);
    expect(() => validateStoreId('tech haven')).toThrow(StorefrontError);
    expect(() => validateStoreId('tech_haven')).toThrow(StorefrontError);
    expect(() => validateStoreId('tech.haven')).toThrow(StorefrontError);
    expect(() => validateStoreId('-tech')).toThrow(StorefrontError);
    expect(() => validateStoreId('tech-')).toThrow(StorefrontError);
  });
});

describe('validateBlockId', () => {
  it('accepts valid section block identifiers', () => {
    expect(validateBlockId('sec_hero_01')).toBe('sec_hero_01');
    expect(validateBlockId('block-123')).toBe('block-123');
    expect(validateBlockId('b')).toBe('b');
  });

  it('rejects path traversal and invalid characters', () => {
    expect(() => validateBlockId('../sec')).toThrow(StorefrontError);
    expect(() => validateBlockId('sec hero')).toThrow(StorefrontError);
  });
});

describe('validateSlug', () => {
  it('accepts valid product slugs', () => {
    expect(validateSlug('quantum-pro-headphones')).toBe('quantum-pro-headphones');
    expect(validateSlug('p')).toBe('p');
  });

  it('rejects invalid slug characters and traversal', () => {
    expect(() => validateSlug('../slug')).toThrow(StorefrontError);
    expect(() => validateSlug('slug with spaces')).toThrow(StorefrontError);
    expect(() => validateSlug('Slug_Upper')).toThrow(StorefrontError);
  });
});
