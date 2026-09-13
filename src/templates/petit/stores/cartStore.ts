import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, Product, ProductColor } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  freeShippingThreshold: number;
  promoCode: string | null;
  discountPercentage: number;
  
  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number, color?: ProductColor, size?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;

  // Computed getters
  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingCost: () => number;
  getTotal: () => number;
  getProgressToFreeShipping: () => { amountNeeded: number; percentage: number; isFree: boolean };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      freeShippingThreshold: 75,
      promoCode: null,
      discountPercentage: 0,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, quantity = 1, color, size) => {
        const selectedColor = color || product.colors[0];
        const selectedSize = size || (product.sizes ? product.sizes[0] : undefined);
        const itemId = `${product.id}-${selectedColor.name}-${selectedSize || 'default'}`;

        set((state) => {
          const existingItemIndex = state.items.findIndex((item) => item.id === itemId);

          if (existingItemIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            return { items: updatedItems, isOpen: true };
          } else {
            const newItem: CartItem = {
              id: itemId,
              productId: product.id,
              product,
              quantity,
              selectedColor,
              selectedSize,
              price: product.price,
            };
            return { items: [...state.items, newItem], isOpen: true };
          }
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [], promoCode: null, discountPercentage: 0 }),

      applyPromoCode: (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode === 'PETIT10' || cleanCode === 'WELCOME10') {
          set({ promoCode: cleanCode, discountPercentage: 0.1 });
          return { success: true, message: '10% Welcome Discount applied!' };
        } else if (cleanCode === 'MAISON15' || cleanCode === 'LUXURY15') {
          set({ promoCode: cleanCode, discountPercentage: 0.15 });
          return { success: true, message: '15% Maison Privilege Discount applied!' };
        }
        return { success: false, message: 'Invalid promo code. Try WELCOME10' };
      },

      removePromoCode: () => set({ promoCode: null, discountPercentage: 0 }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        return subtotal * get().discountPercentage;
      },

      getShippingCost: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= get().freeShippingThreshold ? 0 : 9.5;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const shipping = get().getShippingCost();
        return Math.max(0, subtotal - discount + shipping);
      },

      getProgressToFreeShipping: () => {
        const subtotal = get().getSubtotal();
        const threshold = get().freeShippingThreshold;
        if (subtotal >= threshold) {
          return { amountNeeded: 0, percentage: 100, isFree: true };
        }
        const needed = threshold - subtotal;
        const percentage = Math.min(100, Math.round((subtotal / threshold) * 100));
        return { amountNeeded: needed, percentage, isFree: false };
      },
    }),
    {
      name: 'maison-petit-cart',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
      partialize: (state) => ({ items: state.items, promoCode: state.promoCode, discountPercentage: state.discountPercentage }),
    }
  )
);
