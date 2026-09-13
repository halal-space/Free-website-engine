import { create } from 'zustand';
import type { Product } from '../types';

export type PetitPageView = 'home' | 'shop' | 'about' | 'product' | '404';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'favorite';
}

interface UIState {
  activePageView: PetitPageView;
  selectedCategorySlug: string | null;
  selectedProductSlug: string | null;
  selectedSort: string;

  quickViewProduct: Product | null;
  isSearchOpen: boolean;
  isCheckoutOpen: boolean;
  isAccountOpen: boolean;
  toasts: ToastMessage[];

  // Navigation
  setActivePageView: (view: PetitPageView) => void;
  navigateToHome: () => void;
  navigateToShop: (categorySlug?: string, sort?: string) => void;
  navigateToProduct: (slug: string) => void;
  navigateToAbout: () => void;
  navigateTo404: () => void;

  // Modals & Drawers
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;

  openCheckout: () => void;
  closeCheckout: () => void;

  openAccount: () => void;
  closeAccount: () => void;
  toggleAccount: () => void;

  addToast: (title: string, message?: string, type?: 'success' | 'info' | 'favorite') => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activePageView: 'home',
  selectedCategorySlug: null,
  selectedProductSlug: null,
  selectedSort: 'featured',

  quickViewProduct: null,
  isSearchOpen: false,
  isCheckoutOpen: false,
  isAccountOpen: false,
  toasts: [],

  setActivePageView: (activePageView) => set({ activePageView }),

  navigateToHome: () => {
    set({ activePageView: 'home' });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToShop: (categorySlug, sort = 'featured') => {
    set({
      activePageView: 'shop',
      selectedCategorySlug: categorySlug || null,
      selectedSort: sort,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToProduct: (slug: string) => {
    set({
      activePageView: 'product',
      selectedProductSlug: slug,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToAbout: () => {
    set({ activePageView: 'about' });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateTo404: () => {
    set({ activePageView: '404' });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  openQuickView: (product) => set({ quickViewProduct: product }),
  closeQuickView: () => set({ quickViewProduct: null }),

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),

  openCheckout: () => set({ isCheckoutOpen: true }),
  closeCheckout: () => set({ isCheckoutOpen: false }),

  openAccount: () => set({ isAccountOpen: true }),
  closeAccount: () => set({ isAccountOpen: false }),
  toggleAccount: () => set((s) => ({ isAccountOpen: !s.isAccountOpen })),

  addToast: (title, message, type = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    set((state) => ({
      toasts: [...state.toasts, { id, title, message, type }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3800);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
