/**
 * Unit tests for formatting utilities (Testing Strategy §11).
 *
 * Verifies formatCurrency across all 4 supported currencies (USD, EUR, GBP, JPY)
 * and edge cases (0, negative, large numbers). Verifies formatDate with ISO strings and locales.
 */

import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate } from './format';

describe('formatCurrency', () => {
  it('formats USD correctly without decimal cents', () => {
    expect(formatCurrency(1299, 'USD')).toBe('$1,299');
    expect(formatCurrency(0, 'USD')).toBe('$0');
  });

  it('formats JPY correctly without decimal cents', () => {
    // Japanese yen format
    const formatted = formatCurrency(1299, 'JPY');
    expect(formatted).toContain('1,299');
    expect(formatted).toContain('¥');
  });

  it('formats EUR correctly with locale conventions', () => {
    const formatted = formatCurrency(890, 'EUR');
    expect(formatted).toContain('890');
    expect(formatted).toContain('€');
  });

  it('formats GBP correctly', () => {
    const formatted = formatCurrency(450, 'GBP');
    expect(formatted).toBe('£450');
  });

  it('handles edge cases: negative numbers and large amounts', () => {
    expect(formatCurrency(-50, 'USD')).toBe('-$50');
    expect(formatCurrency(1000000, 'USD')).toBe('$1,000,000');
  });
});

describe('formatDate', () => {
  it('formats valid ISO date strings in medium style', () => {
    const formatted = formatDate('2025-01-15T10:30:00Z');
    expect(formatted).toContain('2025');
    expect(formatted).toContain('Jan');
    expect(formatted).toContain('15');
  });

  it('returns raw string for invalid date inputs without throwing', () => {
    expect(formatDate('not-a-real-date')).toBe('not-a-real-date');
    expect(formatDate('')).toBe('');
  });
});
