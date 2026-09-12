import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, CurrencyCode, Product } from '../types';
import { CURRENCIES } from '../products';

interface CartState {
  items: CartItem[];
  currency: CurrencyCode;
  isCartOpen: boolean;
  promoCode: string;
  discountPercentage: number;
  giftPackaging: boolean;
  giftMessage: string;
  
  // Actions
  addItem: (product: Product, selectedColor: string, selectedSize: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setCurrency: (currency: CurrencyCode) => void;
  setCartOpen: (isOpen: boolean) => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  setGiftPackaging: (enabled: boolean, message?: string) => void;
  
  // Computed helpers
  getCurrencySymbol: () => string;
  convertPrice: (priceInUSD: number) => number;
  formatPrice: (priceInUSD: number) => string;
  getSubtotalUSD: () => number;
  getTotalItemsCount: () => number;
  getDiscountAmountUSD: () => number;
  getFinalTotalUSD: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      currency: 'USD',
      isCartOpen: false,
      promoCode: '',
      discountPercentage: 0,
      giftPackaging: false,
      giftMessage: '',

      addItem: (product, selectedColor, selectedSize, quantity = 1) => {
        const itemId = `${product.id}-${selectedColor}-${selectedSize}`;
        const existingItems = get().items;
        const existingIndex = existingItems.findIndex((item) => item.id === itemId);

        if (existingIndex > -1) {
          const updatedItems = [...existingItems];
          updatedItems[existingIndex].quantity += quantity;
          set({ items: updatedItems, isCartOpen: true });
        } else {
          const newItem: CartItem = {
            id: itemId,
            productId: product.id,
            product,
            selectedColor,
            selectedSize,
            quantity,
            price: product.price
          };
          set({ items: [...existingItems, newItem], isCartOpen: true });
        }
      },

      removeItem: (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          )
        });
      },

      clearCart: () => set({ items: [] }),

      setCurrency: (currency) => set({ currency }),

      setCartOpen: (isCartOpen) => set({ isCartOpen }),

      applyPromoCode: (code) => {
        const clean = code.trim().toUpperCase();
        if (clean === 'ATELIER15' || clean === 'ARCHIVE2026') {
          set({ promoCode: clean, discountPercentage: 0.15 });
          return true;
        }
        if (clean === 'VIP20') {
          set({ promoCode: clean, discountPercentage: 0.20 });
          return true;
        }
        return false;
      },

      removePromoCode: () => set({ promoCode: '', discountPercentage: 0 }),

      setGiftPackaging: (giftPackaging, giftMessage = '') => {
        set({ giftPackaging, giftMessage });
      },

      getCurrencySymbol: () => {
        const curr = get().currency;
        return CURRENCIES[curr]?.symbol || '$';
      },

      convertPrice: (priceInUSD) => {
        const curr = get().currency;
        const rate = CURRENCIES[curr]?.rate || 1;
        return Math.round(priceInUSD * rate);
      },

      formatPrice: (priceInUSD) => {
        const curr = get().currency;
        const rate = CURRENCIES[curr]?.rate || 1;
        const symbol = CURRENCIES[curr]?.symbol || '$';
        const converted = Math.round(priceInUSD * rate);
        return `${symbol}${converted.toLocaleString()}`;
      },

      getSubtotalUSD: () => {
        return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      getTotalItemsCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      getDiscountAmountUSD: () => {
        const subtotal = get().getSubtotalUSD();
        return subtotal * get().discountPercentage;
      },

      getFinalTotalUSD: () => {
        const subtotal = get().getSubtotalUSD();
        const discount = get().getDiscountAmountUSD();
        const giftCost = get().giftPackaging ? 25 : 0;
        return Math.max(0, subtotal - discount + giftCost);
      }
    }),
    {
      name: 'atelier-velene-cart-v1',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {}
      } as unknown as Storage)),
      partialize: (state) => ({
        items: state.items,
        currency: state.currency,
        promoCode: state.promoCode,
        discountPercentage: state.discountPercentage,
        giftPackaging: state.giftPackaging,
        giftMessage: state.giftMessage
      })
    }
  )
);
