import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { WishlistItem, Product } from '../types';

interface WishlistState {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => boolean; // returns true if added, false if removed
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const existing = get().items.find((i) => i.productId === product.id);
        if (!existing) {
          set({
            items: [
              ...get().items,
              { productId: product.id, product, addedAt: new Date().toISOString() }
            ]
          });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },

      toggleItem: (product) => {
        const exists = get().isInWishlist(product.id);
        if (exists) {
          get().removeItem(product.id);
          return false;
        } else {
          get().addItem(product);
          return true;
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((i) => i.productId === productId);
      },

      clearWishlist: () => set({ items: [] })
    }),
    {
      name: 'atelier-velene-wishlist-v1',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {}
      } as unknown as Storage)),
      partialize: (state) => ({ items: state.items })
    }
  )
);
