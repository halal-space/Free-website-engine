/**
 * Fetch helper with retry logic for 429 (rate limited) responses.
 *
 * Implements exponential backoff: 1s → 2s → 4s, max 3 retries.
 * Used by both store-service and product-service to avoid duplicating
 * retry logic across service functions.
 */

import { StorefrontError, type StorefrontErrorCode } from './errors';

/** Base delay in milliseconds for exponential backoff. */
const BASE_RETRY_DELAY_MS = 1000;

/** Maximum number of retry attempts for 429 responses. */
const MAX_RETRIES = 3;

/** Max characters to capture from backend error response bodies. */
const MAX_ERROR_BODY_LENGTH = 500;

/**
 * Helper object holding delay function to enable test mocking without module re-evaluation.
 */
export const retryHelper = {
  delay: (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms)),
};

/**
 * Handles 429 rate limit backoff delay or throws exhausted error.
 */
async function handle429Retry(attempt: number, storeId: string): Promise<void> {
  if (attempt >= MAX_RETRIES) {
    throw new StorefrontError(
      'RATE_LIMITED',
      `Rate limited after ${MAX_RETRIES} retries`,
      storeId,
      429
    );
  }
  const delayMs = BASE_RETRY_DELAY_MS * Math.pow(2, attempt);
  await retryHelper.delay(delayMs);
}

/**
 * Maps 404 response body to specific StorefrontError code.
 */
function resolve404ErrorCode(errorBody?: { error?: string }): StorefrontErrorCode {
  if (errorBody?.error === 'PRODUCT_NOT_FOUND') {
    return 'PRODUCT_NOT_FOUND';
  }
  if (errorBody?.error === 'STORE_DISABLED') {
    return 'STORE_DISABLED';
  }
  return 'STORE_NOT_FOUND';
}

/**
 * Handles the HTTP response: checks status codes and parses JSON.
 */
async function handleResponse<T>(
  response: Response,
  storeId: string
): Promise<T> {
  if (response.status === 404) {
    let errorBody: { error?: string; message?: string } | undefined;
    try {
      errorBody = (await response.json()) as { error?: string; message?: string };
    } catch {
      /* Response body is not JSON; fall back to default message */
    }
    const code = resolve404ErrorCode(errorBody);
    throw new StorefrontError(
      code,
      errorBody?.message ?? `Not found (storeId: ${storeId})`,
      storeId,
      404
    );
  }

  if (response.status === 403) {
    throw new StorefrontError('STORE_DISABLED', `Store is disabled (storeId: ${storeId})`, storeId, 403);
  }

  if (!response.ok) {
    const bodyText = await response.text().catch(() => '(unreadable)');
    console.error(
      `[storefront:service] Backend error ${response.status} for store "${storeId}": ${bodyText.slice(0, MAX_ERROR_BODY_LENGTH)}`
    );
    throw new StorefrontError('INTERNAL_ERROR', `Backend returned ${response.status}`, storeId, response.status);
  }

  try {
    return (await response.json()) as T;
  } catch (parseError) {
    const errorMessage = parseError instanceof Error ? parseError.message : 'Unknown parse error';
    throw new StorefrontError('INVALID_RESPONSE', `Failed to parse response JSON: ${errorMessage}`, storeId, undefined);
  }
}

/**
 * What it does: Executes an HTTP fetch request with automatic exponential backoff retry on 429 status codes.
 * Why it exists: Satisfies Blueprint §6.5 & §15 (graceful handling of rate limiting and network failures).
 * How it works: Loops up to MAX_RETRIES attempts; checks response status; delegates parsing or network error wrapping.
 * Limitations & Risks: Network errors are considered fatal and not retried to avoid long delays on severed connections.
 *
 * @param url - Destination endpoint URL
 * @param options - RequestInit configuration (includes Next.js cache tags)
 * @param storeId - Store identifier for diagnostic logging
 * @returns Parsed JSON response of type T
 */
export async function fetchWithRetry<T>(
  url: string,
  options: RequestInit,
  storeId: string
): Promise<T> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, options);

      if (response.status === 429) {
        await handle429Retry(attempt, storeId);
        continue;
      }

      return await handleResponse<T>(response, storeId);
    } catch (error) {
      if (error instanceof StorefrontError) {
        throw error;
      }
      const errorMessage = error instanceof Error ? error.message : 'Unknown network error';
      throw new StorefrontError('BACKEND_UNREACHABLE', `Backend unreachable: ${errorMessage}`, storeId, undefined);
    }
  }

  throw new StorefrontError('RATE_LIMITED', `Rate limited after ${MAX_RETRIES} retries`, storeId, 429);
}

/**
 * What it does: Delays execution for a specified duration in milliseconds.
 * Why it exists: Provides the timing mechanism for exponential backoff retry loops.
 * How it works: Wraps setTimeout in a Promise; delegates to retryHelper for vitest spying.
 * Limitations & Risks: Risk: N/A.
 *
 * @param ms - Delay duration in milliseconds
 */
export function delay(ms: number): Promise<void> {
  return retryHelper.delay(ms);
}
