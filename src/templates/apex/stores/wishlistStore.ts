import { create } from 'zustand';
import { useToastStore } from './toastStore';

interface WishlistState {
  wishlistIds: string[];
  isOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: (productId: string, productName?: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

const STORAGE_KEY = 'aether_wishlist_v1';

const getInitialWishlist = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const saveWishlist = (ids: string[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Error persisting wishlist:', e);
  }
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlistIds: getInitialWishlist(),
  isOpen: false,

  openWishlist: () => set({ isOpen: true }),
  closeWishlist: () => set({ isOpen: false }),

  toggleWishlist: (productId, productName = 'Product') => {
    const exists = get().wishlistIds.includes(productId);
    let updated: string[];

    if (exists) {
      updated = get().wishlistIds.filter((id) => id !== productId);
      useToastStore.getState().addToast({
        title: 'Removed from Wishlist',
        description: productName,
        type: 'info'
      });
    } else {
      updated = [...get().wishlistIds, productId];
      useToastStore.getState().addToast({
        title: 'Saved to Wishlist',
        description: productName,
        type: 'success'
      });
    }

    saveWishlist(updated);
    set({ wishlistIds: updated });
  },

  isInWishlist: (productId) => {
    return get().wishlistIds.includes(productId);
  },

  clearWishlist: () => {
    saveWishlist([]);
    set({ wishlistIds: [] });
  },

  getWishlistCount: () => {
    return get().wishlistIds.length;
  }
}));
