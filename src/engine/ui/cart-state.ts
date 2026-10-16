export interface CartLine { productId: string; quantity: number }

export function cartKey(storeId: string): string { return `rooqx:cart:${storeId}:v1`; }
export function orderKey(storeId: string): string { return `rooqx:demo-order:${storeId}:v1`; }

export function readCart(storeId: string): CartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const value: unknown = JSON.parse(localStorage.getItem(cartKey(storeId)) || '[]');
    return Array.isArray(value) ? value.filter((line): line is CartLine =>
      line && typeof line.productId === 'string' && Number.isInteger(line.quantity) && line.quantity > 0 && line.quantity <= 99
    ) : [];
  } catch { return []; }
}

export function writeCart(storeId: string, lines: CartLine[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(cartKey(storeId), JSON.stringify(lines));
  window.dispatchEvent(new CustomEvent('rooqx:cart-updated', { detail: storeId }));
}

export function addCartLine(storeId: string, productId: string): void {
  const lines = readCart(storeId);
  const current = lines.find(line => line.productId === productId);
  if (current) current.quantity = Math.min(current.quantity + 1, 99);
  else lines.push({ productId, quantity: 1 });
  writeCart(storeId, lines);
}
