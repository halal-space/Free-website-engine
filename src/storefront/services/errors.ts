/**
 * Typed error classes for the storefront service layer.
 *
 * All service layer failures throw StorefrontError (or its subclass RegistryError)
 * with structured fields (code, storeId, httpStatus) for error tracking and
 * observability (§12). The .toJSON() method enables structured logging capture
 * by Sentry, Datadog, or equivalent.
 */

// ── Error Codes ──────────────────────────────────────────

/**
 * Exhaustive union of all error codes the service layer can produce.
 * Consuming code can switch on this to determine the failure reason.
 */
export type StorefrontErrorCode =
  | 'STORE_NOT_FOUND'
  | 'STORE_DISABLED'
  | 'PRODUCT_NOT_FOUND'
  | 'INVALID_STORE_ID'
  | 'INVALID_BLOCK_ID'
  | 'INVALID_SLUG'
  | 'BACKEND_UNREACHABLE'
  | 'INVALID_RESPONSE'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR'
  | 'REGISTRY_ERROR';

// ── StorefrontError ──────────────────────────────────────

/**
 * Structured error class thrown by all storefront service layer functions.
 *
 * Includes machine-readable `code`, optional `storeId` for context, and
 * `httpStatus` to guide error UI rendering in the consuming page component.
 * The `.toJSON()` method produces a structured object for error tracking services.
 */
export class StorefrontError extends Error {
  public readonly code: StorefrontErrorCode;
  public readonly storeId?: string;
  public readonly httpStatus?: number;

  constructor(
    code: StorefrontErrorCode,
    message: string,
    storeId?: string,
    httpStatus?: number
  ) {
    super(message);
    this.name = 'StorefrontError';
    this.code = code;
    this.storeId = storeId;
    this.httpStatus = httpStatus;
  }

  /**
   * Structured representation for error tracking services (Sentry, Datadog).
   * Truncates the message to 500 chars to prevent log bloat from unexpected
   * response bodies.
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      code: this.code,
      message: this.message.slice(0, 500),
      storeId: this.storeId,
      httpStatus: this.httpStatus,
    };
  }
}

// ── RegistryError ────────────────────────────────────────

/**
 * Thrown when the component registry cannot resolve a componentId.
 * Extends StorefrontError with the offending componentId and a list of
 * valid IDs for debugging — so developers can quickly identify typos or
 * missing registrations.
 */
export class RegistryError extends StorefrontError {
  public readonly componentId: string;
  public readonly validIds: string[];

  constructor(componentId: string, validIds: string[]) {
    super(
      'REGISTRY_ERROR',
      `Unknown componentId "${componentId}". Valid IDs: ${validIds.join(', ')}`,
      undefined,
      undefined
    );
    this.name = 'RegistryError';
    this.componentId = componentId;
    this.validIds = validIds;
  }
}
