import { create } from 'zustand';

export type SolennePageView = 'home' | 'shop' | 'about' | 'journal' | 'product' | '404';

export interface SolenneToast {
  id: string;
  message: string;
  image?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface UIState {
  activePageView: SolennePageView;
  selectedCategorySlug: string | null;
  selectedProductSlug: string | null;
  selectedSort: 'featured' | 'rating' | 'price-asc' | 'price-desc' | 'newest';

  isSearchOpen: boolean;
  quickViewProductSlug: string | null;
  recentlyViewedSlugs: string[];
  toasts: SolenneToast[];

  navigateToHome: () => void;
  navigateToShop: (categorySlug?: string | null, sort?: 'featured' | 'rating' | 'price-asc' | 'price-desc' | 'newest') => void;
  navigateToProduct: (slug: string) => void;
  navigateToAbout: () => void;
  navigateToJournal: () => void;
  navigateTo404: () => void;

  openSearch: () => void;
  closeSearch: () => void;
  openQuickView: (slug: string) => void;
  closeQuickView: () => void;

  trackRecent: (slug: string) => void;
  showToast: (message: string, opts?: { image?: string; action?: { label: string; onClick: () => void } }) => void;
  dismissToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  activePageView: 'home',
  selectedCategorySlug: null,
  selectedProductSlug: null,
  selectedSort: 'featured',

  isSearchOpen: false,
  quickViewProductSlug: null,
  recentlyViewedSlugs: ['velour-cleansing-balm', 'lumiere-vitamin-c-serum'],
  toasts: [],

  navigateToHome: () => {
    set({ activePageView: 'home' });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToShop: (categorySlug = null, sort = 'featured') => {
    set({
      activePageView: 'shop',
      selectedCategorySlug: categorySlug,
      selectedSort: sort,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToProduct: (slug: string) => {
    get().trackRecent(slug);
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

  navigateToJournal: () => {
    set({ activePageView: 'journal' });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateTo404: () => {
    set({ activePageView: '404' });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),

  openQuickView: (slug: string) => set({ quickViewProductSlug: slug }),
  closeQuickView: () => set({ quickViewProductSlug: null }),

  trackRecent: (slug: string) => {
    set((state) => {
      const filtered = state.recentlyViewedSlugs.filter((s) => s !== slug);
      return { recentlyViewedSlugs: [slug, ...filtered].slice(0, 6) };
    });
  },

  showToast: (message: string, opts = {}) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newToast: SolenneToast = {
      id,
      message,
      image: opts.image,
      action: opts.action,
    };
    set((state) => ({ toasts: [...state.toasts, newToast] }));
    setTimeout(() => {
      get().dismissToast(id);
    }, 4200);
  },

  dismissToast: (id: string) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));
