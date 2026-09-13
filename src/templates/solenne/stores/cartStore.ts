import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, CartLine } from '../types';
import { PROMOS, FREE_SHIPPING_THRESHOLD, productPrice } from '../data/products';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  promoCode: string | null;
  promoError: string | null;

  openCart: () => void;
  closeCart: () => void;
  addToCart: (slug: string, sizeIndex?: number, qty?: number) => void;
  removeFromCart: (slug: string, sizeIndex: number) => void;
  setQty: (slug: string, sizeIndex: number, qty: number) => void;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [
        { slug: 'velour-cleansing-balm', sizeIndex: 0, qty: 1 },
      ],
      isOpen: false,
      promoCode: null,
      promoError: null,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addToCart: (slug: string, sizeIndex = 0, qty = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.slug === slug && i.sizeIndex === sizeIndex
          );
          if (existingIndex > -1) {
            const nextItems = [...state.items];
            nextItems[existingIndex].qty = Math.min(9, nextItems[existingIndex].qty + qty);
            return { items: nextItems, isOpen: true };
          }
          return {
            items: [...state.items, { slug, sizeIndex, qty }],
            isOpen: true,
          };
        });
      },

      removeFromCart: (slug: string, sizeIndex: number) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.slug === slug && i.sizeIndex === sizeIndex)
          ),
        }));
      },

      setQty: (slug: string, sizeIndex: number, qty: number) => {
        if (qty <= 0) {
          get().removeFromCart(slug, sizeIndex);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => {
            if (i.slug === slug && i.sizeIndex === sizeIndex) {
              return { ...i, qty: Math.min(9, Math.max(1, qty)) };
            }
            return i;
          }),
        }));
      },

      applyPromo: (code: string) => {
        const normalized = code.trim().toUpperCase();
        if (PROMOS[normalized]) {
          set({ promoCode: normalized, promoError: null });
          return true;
        }
        set({ promoError: 'Invalid or expired promotional code.' });
        return false;
      },

      clearPromo: () => set({ promoCode: null, promoError: null }),

      clearCart: () => set({ items: [], promoCode: null, promoError: null }),
    }),
    {
      name: 'solenne-cart-storage',
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
      }),
    }
  )
);

export function computeCartSummary(items: CartItem[], allProducts: Product[], promoCode: string | null) {
  const lines: CartLine[] = [];
  for (const item of items) {
    const product = allProducts.find((p) => p.slug === item.slug);
    if (!product) continue;
    const unitPrice = productPrice(product, item.sizeIndex);
    lines.push({
      item,
      product,
      unitPrice,
      lineTotal: unitPrice * item.qty,
    });
  }

  const subtotal = lines.reduce((acc, l) => acc + l.lineTotal, 0);
  const promoRate = promoCode && PROMOS[promoCode] ? PROMOS[promoCode] : 0;
  const discount = Math.round(subtotal * promoRate * 100) / 100;
  const total = Math.max(0, subtotal - discount);
  const count = lines.reduce((acc, l) => acc + l.item.qty, 0);
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD && subtotal > 0;
  const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return {
    lines,
    count,
    subtotal,
    discount,
    total,
    freeShipping,
    shippingProgress,
    promoApplied: promoRate > 0 ? promoCode : null,
  };
}
