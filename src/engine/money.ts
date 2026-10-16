export function formatMinorAmount(amountMinor: number, currency: string): string {
  const formatter = new Intl.NumberFormat('en', { style: 'currency', currency });
  const digits = formatter.resolvedOptions().maximumFractionDigits ?? 2;
  return formatter.format(amountMinor / 10 ** digits);
}
