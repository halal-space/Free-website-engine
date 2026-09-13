import { create } from 'zustand';
import { CartLine } from '../types';
import { FREE_SHIPPING_THRESHOLD, BUTTER_GIFT_THRESHOLD_GAP } from '../data/catalog';

export const BUTTER_GIFT_THRESHOLD = FREE_SHIPPING_THRESHOLD + BUTTER_GIFT_THRESHOLD_GAP; // $79

interface CartSummary {
  count: number;
  subtotal: number;
  discount: number;
  shippingFee: number;
  carbonFee: number;
  total: number;
  freeShipping: boolean;
  shippingProgress: number;
  amountToFreeShipping: number;
  butterGiftUnlocked: boolean;
  butterGiftProgress: number;
  amountToButterGift: number;
}

export function computeCartSummary(
  lines: CartLine[],
  carbonNeutral: boolean,
  discountPercent = 0
): CartSummary {
  const count = lines.reduce((acc, l) => acc + l.qty, 0);
  const subtotal = lines.reduce((acc, l) => acc + l.qty * l.price, 0);
  const discount = Math.round(((subtotal * discountPercent) / 100) * 100) / 100;
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const butterGiftUnlocked = subtotal >= BUTTER_GIFT_THRESHOLD;
  const butterGiftProgress = Math.min(100, Math.round((subtotal / BUTTER_GIFT_THRESHOLD) * 100));
  const amountToButterGift = Math.max(0, BUTTER_GIFT_THRESHOLD - subtotal);

  const shippingFee = subtotal === 0 ? 0 : freeShipping ? 0 : 6.95;
  const carbonFee = subtotal === 0 ? 0 : carbonNeutral ? 1 : 0;
  const total = Math.max(0, subtotal - discount + shippingFee + carbonFee);

  return {
    count,
    subtotal,
    discount,
    shippingFee,
    carbonFee,
    total,
    freeShipping,
    shippingProgress,
    amountToFreeShipping,
    butterGiftUnlocked,
    butterGiftProgress,
    amountToButterGift,
  };
}

interface CartStoreState {
  lines: CartLine[];
  isCartOpen: boolean;
  carbonNeutral: boolean;
  giftNote: string;
  promoCode: string | null;
  discountPercent: number;

  addToCart: (item: Omit<CartLine, 'qty'>, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeLine: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setCarbonNeutral: (enabled: boolean) => void;
  setGiftNote: (note: string) => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;

  summary: () => CartSummary;
}

const STORAGE_KEY = 'terra-cru-cart-v1';

function getInitialLines(): CartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((l) => l.qty > 0) : [];
  } catch {
    return [];
  }
}

export const useCartStore = create<CartStoreState>((set, get) => ({
  lines: getInitialLines(),
  isCartOpen: false,
  carbonNeutral: true,
  giftNote: '',
  promoCode: null,
  discountPercent: 0,

  addToCart: (item, qty = 1) => {
    set((state) => {
      const existing = state.lines.find((l) => l.id === item.id);
      let updated: CartLine[];
      if (existing) {
        updated = state.lines.map((l) =>
          l.id === item.id ? { ...l, qty: l.qty + qty } : l
        );
      } else {
        updated = [...state.lines, { ...item, qty }];
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return { lines: updated, isCartOpen: true };
    });
  },

  setQty: (id, qty) => {
    set((state) => {
      let updated: CartLine[];
      if (qty <= 0) {
        updated = state.lines.filter((l) => l.id !== id);
      } else {
        updated = state.lines.map((l) => (l.id === id ? { ...l, qty } : l));
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return { lines: updated };
    });
  },

  removeLine: (id) => {
    set((state) => {
      const updated = state.lines.filter((l) => l.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return { lines: updated };
    });
  },

  clearCart: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    set({ lines: [], giftNote: '', promoCode: null, discountPercent: 0 });
  },

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),

  setCarbonNeutral: (carbonNeutral) => set({ carbonNeutral }),
  setGiftNote: (giftNote) => set({ giftNote }),

  applyPromo: (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'HARVEST10' || clean === 'PANTRY10') {
      set({ promoCode: clean, discountPercent: 10 });
      return true;
    }
    if (clean === 'SMALLHOLDER15' || clean === 'BOX15') {
      set({ promoCode: clean, discountPercent: 15 });
      return true;
    }
    return false;
  },

  removePromo: () => set({ promoCode: null, discountPercent: 0 }),

  summary: () => {
    const { lines, carbonNeutral, discountPercent } = get();
    return computeCartSummary(lines, carbonNeutral, discountPercent);
  },
}));
