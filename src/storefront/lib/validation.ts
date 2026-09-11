/**
 * Input validation for identifiers used in URL paths and fetch calls.
 *
 * Security §8 requirement: all user-controlled identifiers must be validated
 * before entering any fetch URL or file path to prevent path traversal / SSRF.
 * These validators are the single gatekeepers — no fetch call in the service
 * layer may bypass them.
 */

import { StorefrontError, type StorefrontErrorCode } from '../services/errors';

// ── Validation Patterns ──────────────────────────────────

/**
 * StoreId pattern: lowercase alphanumeric + hyphens, 1–64 chars.
 * Must start and end with alphanumeric (no leading/trailing hyphens).
 * Single-char IDs are allowed (the pattern accounts for this separately).
 *
 * Rejects: "../", "%2e%2e", null bytes, spaces, uppercase, special chars,
 * Unicode homoglyphs, and anything over 64 chars.
 */
const STORE_ID_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/;

/**
 * BlockId pattern: alphanumeric + hyphens + underscores, 1–128 chars.
 * Section block IDs use underscores (e.g. "sec_hero_01") unlike store IDs.
 */
const BLOCK_ID_PATTERN = /^[a-z0-9][a-z0-9_-]{0,126}[a-z0-9]$|^[a-z0-9]$/;

/**
 * Product slug pattern: lowercase alphanumeric + hyphens, 1–128 chars.
 * Derived from product titles (e.g. "quantum-pro-headphones").
 */
const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,126}[a-z0-9]$|^[a-z0-9]$/;

/** Max length for sanitized log output to prevent log injection with huge inputs. */
const MAX_LOG_INPUT_LENGTH = 64;

// ── Shared Validator Helper ──────────────────────────────

/**
 * Validates an identifier string against a pattern, logging and throwing on failure.
 * Shared between all specific field validators to eliminate duplicated logic.
 */
function validateIdentifier(
  input: string,
  pattern: RegExp,
  fieldName: string,
  errorCode: StorefrontErrorCode
): string {
  if (!pattern.test(input)) {
    const sanitizedInput = input.slice(0, MAX_LOG_INPUT_LENGTH);
    console.warn(
      `[storefront:validation] Rejected invalid ${fieldName}: "${sanitizedInput}"`
    );
    throw new StorefrontError(
      errorCode,
      `Invalid ${fieldName}: "${sanitizedInput}"`,
      undefined,
      400
    );
  }
  return input;
}

// ── Exported Validators ──────────────────────────────────

/**
 * What it does: Validates that a storeId string matches the strict lowercase alphanumeric and hyphen format (1–64 chars).
 * Why it exists: Mandatory security gatekeeper per Blueprint §8 to prevent path traversal, SSRF, and file injection.
 * How it works: Evaluates input against STORE_ID_PATTERN regex; logs sanitized preview and throws StorefrontError(INVALID_STORE_ID) on mismatch.
 * Limitations & Risks: Only permits lowercase letters, numbers, and hyphens without leading or trailing hyphens.
 *
 * @param storeId - Raw store identifier candidate
 * @returns The validated storeId string
 * @throws StorefrontError if invalid
 */
export function validateStoreId(storeId: string): string {
  return validateIdentifier(storeId, STORE_ID_PATTERN, 'store ID', 'INVALID_STORE_ID');
}

/**
 * What it does: Validates that a section blockId matches the alphanumeric, hyphen, and underscore format (1–128 chars).
 * Why it exists: Protects dynamic section rendering keys and layout composition identifiers per Blueprint §7.1.
 * How it works: Evaluates input against BLOCK_ID_PATTERN regex; logs sanitized preview and throws StorefrontError(INVALID_BLOCK_ID) on mismatch.
 * Limitations & Risks: Risk: N/A.
 *
 * @param blockId - Raw section block identifier candidate
 * @returns The validated blockId string
 * @throws StorefrontError if invalid
 */
export function validateBlockId(blockId: string): string {
  return validateIdentifier(blockId, BLOCK_ID_PATTERN, 'block ID', 'INVALID_BLOCK_ID');
}

/**
 * What it does: Validates that a product slug matches the lowercase alphanumeric and hyphen format (1–128 chars).
 * Why it exists: Guards single product REST API paths and router URL parameters per Blueprint §6.3.
 * How it works: Evaluates input against SLUG_PATTERN regex; logs sanitized preview and throws StorefrontError(INVALID_SLUG) on mismatch.
 * Limitations & Risks: Slugs must be URL-safe and strictly lowercase.
 *
 * @param slug - Raw product slug candidate
 * @returns The validated product slug string
 * @throws StorefrontError if invalid
 */
export function validateSlug(slug: string): string {
  return validateIdentifier(slug, SLUG_PATTERN, 'product slug', 'INVALID_SLUG');
}
