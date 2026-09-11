/**
 * Formatting utilities for currency and dates.
 *
 * Uses Intl.NumberFormat and Intl.DateTimeFormat for locale-aware output.
 * These are pure functions with no side effects — safe for server and client use.
 */

import type { CurrencyCode } from '../types/product';

// ── Constants ────────────────────────────────────────────

/**
 * Maps CurrencyCode to the BCP 47 locale that gives the conventional symbol
 * placement and grouping for that currency. Using a fixed locale per currency
 * (rather than the user's browser locale) ensures consistent display across
 * the storefront — a USD store always shows "$1,299", not "1.299 $".
 */
const CURRENCY_LOCALE_MAP: Record<CurrencyCode, string> = {
  USD: 'en-US',
  EUR: 'de-DE',
  GBP: 'en-GB',
  JPY: 'ja-JP',
} as const;

/**
 * Default date formatting locale. Can be overridden per-call if needed.
 */
const DEFAULT_DATE_LOCALE = 'en-US';

// ── Currency Formatting ──────────────────────────────────

/**
 * What it does: Formats an integer price into a currency-formatted string without decimal fractions.
 * Why it exists: Unified price rendering conforming to the design patterns across all 4 templates (Blueprint §7.2).
 * How it works: Uses Intl.NumberFormat with minimum/maximum fraction digits of 0, replacing fullwidth yen with ASCII ¥.
 * Limitations & Risks: Only supports USD, EUR, GBP, JPY; assumes amounts are supplied in major currency units.
 *
 * @param amount - Numeric price value (e.g. 1299)
 * @param currencyCode - Target currency code
 * @returns Formatted currency string (e.g. "$1,299", "¥1,299")
 */
export function formatCurrency(amount: number, currencyCode: CurrencyCode): string {
  const locale = CURRENCY_LOCALE_MAP[currencyCode];

  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);

  return formatted.replace(/\uFFE5/g, '¥');
}

// ── Date Formatting ──────────────────────────────────────

/**
 * What it does: Converts an ISO date string into a localized medium-format date string.
 * Why it exists: Formats product review timestamps and metadata dates across store templates.
 * How it works: Parses date string into Date object and formats via Intl.DateTimeFormat with dateStyle: 'medium'.
 * Limitations & Risks: If date parsing fails, safely returns the raw input string instead of throwing.
 *
 * @param isoDate - ISO 8601 date string (e.g. "2025-01-15T10:30:00Z")
 * @param locale - Optional BCP 47 locale tag (defaults to 'en-US')
 * @returns Human-readable date string (e.g. "Jan 15, 2025")
 */
export function formatDate(isoDate: string, locale: string = DEFAULT_DATE_LOCALE): string {
  const parsed = new Date(isoDate);

  if (Number.isNaN(parsed.getTime())) {
    return isoDate;
  }

  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(parsed);
}
