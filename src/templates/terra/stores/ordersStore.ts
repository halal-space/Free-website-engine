import { CartLine } from '../types';

export interface Order {
  id: string;
  date: string;
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  carbon: number;
  total: number;
  email: string;
  name: string;
  city: string;
  method: string;
}

const ORDERS_KEY = 'tc-orders-v1';
const LAST_KEY = 'tc-last-order';

let memoryOrders: Order[] = [];
let memoryLastOrder: string | null = null;

export function getOrders(): Order[] {
  if (typeof localStorage === 'undefined') return memoryOrders;
  try {
    const raw = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch {
    return memoryOrders;
  }
}

export function saveOrder(o: Order) {
  const all = [o, ...getOrders()].slice(0, 20);
  memoryOrders = all;
  memoryLastOrder = o.id;
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(all));
      localStorage.setItem(LAST_KEY, o.id);
    } catch {}
  }
}

export function getLastOrder(): Order | null {
  if (typeof localStorage === 'undefined') {
    if (!memoryLastOrder) return null;
    return memoryOrders.find((o) => o.id === memoryLastOrder) ?? null;
  }
  try {
    const id = localStorage.getItem(LAST_KEY);
    if (!id) return null;
    return getOrders().find((o) => o.id === id) ?? null;
  } catch {
    return null;
  }
}

export function newOrderId(): string {
  return `TC-${Math.floor(100000 + Math.random() * 900000)}`;
}
