import { create } from 'zustand';
import type { Product } from '../types';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'cart' | 'wishlist' | 'info' | 'success';
}

interface UIState {
  quickViewProduct: Product | null;
  isQuickViewOpen: boolean;
  isSearchOpen: boolean;
  isSizeGuideOpen: boolean;
  isMobileNavOpen: boolean;
  isWishlistOpen: boolean;
  activePageView: 'home' | 'shop' | 'collections' | 'lookbook' | 'about' | 'appointments' | 'wishlist' | 'product' | 'checkout' | 'account';
  selectedCollectionSlug: string | null;
  selectedProductSlug: string | null;
  shopInitialCategory: string | null;
  checkoutConfirmation: { orderId: string; email: string; name: string } | null;
  toasts: ToastMessage[];

  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  setSearchOpen: (open: boolean) => void;
  setSizeGuideOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  setActivePageView: (view: 'home' | 'shop' | 'collections' | 'lookbook' | 'about' | 'appointments' | 'wishlist' | 'product' | 'checkout' | 'account') => void;
  setSelectedCollectionSlug: (slug: string | null) => void;
  setSelectedProductSlug: (slug: string | null) => void;
  setShopInitialCategory: (category: string | null) => void;
  setCheckoutConfirmation: (conf: { orderId: string; email: string; name: string } | null) => void;
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  quickViewProduct: null,
  isQuickViewOpen: false,
  isSearchOpen: false,
  isSizeGuideOpen: false,
  isMobileNavOpen: false,
  isWishlistOpen: false,
  activePageView: 'home',
  selectedCollectionSlug: null,
  selectedProductSlug: null,
  shopInitialCategory: null,
  checkoutConfirmation: null,
  toasts: [],

  openQuickView: (product) => set({ quickViewProduct: product, isQuickViewOpen: true }),
  closeQuickView: () => set({ quickViewProduct: null, isQuickViewOpen: false }),
  setSearchOpen: (isSearchOpen) => set({ isSearchOpen }),
  setSizeGuideOpen: (isSizeGuideOpen) => set({ isSizeGuideOpen }),
  setMobileNavOpen: (isMobileNavOpen) => set({ isMobileNavOpen }),
  setWishlistOpen: (isWishlistOpen) => set({ isWishlistOpen }),
  setActivePageView: (activePageView) => set({ activePageView }),
  setSelectedCollectionSlug: (selectedCollectionSlug) => set({ selectedCollectionSlug }),
  setSelectedProductSlug: (selectedProductSlug) => set({ selectedProductSlug }),
  setShopInitialCategory: (shopInitialCategory) => set({ shopInitialCategory }),
  setCheckoutConfirmation: (checkoutConfirmation) => set({ checkoutConfirmation }),

  showToast: (toast) => {
    const id = `${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { ...toast, id };
    set({ toasts: [...get().toasts, newToast] });

    setTimeout(() => {
      get().removeToast(id);
    }, 3800);
  },

  removeToast: (id) => {
    set({ toasts: get().toasts.filter((t) => t.id !== id) });
  }
}));
