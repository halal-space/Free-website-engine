import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  slugs: string[];
  isOpen: boolean;

  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: (slug: string) => boolean;
  isInWishlist: (slug: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      slugs: ['lumiere-vitamin-c-serum'],
      isOpen: false,

      openWishlist: () => set({ isOpen: true }),
      closeWishlist: () => set({ isOpen: false }),

      toggleWishlist: (slug: string) => {
        const current = get().slugs;
        const exists = current.includes(slug);
        if (exists) {
          set({ slugs: current.filter((s) => s !== slug) });
          return false;
        } else {
          set({ slugs: [...current, slug] });
          return true;
        }
      },

      isInWishlist: (slug: string) => get().slugs.includes(slug),

      clearWishlist: () => set({ slugs: [] }),
    }),
    {
      name: 'solenne-wishlist-storage',
      partialize: (state) => ({ slugs: state.slugs }),
    }
  )
);
