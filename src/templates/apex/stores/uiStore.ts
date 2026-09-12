import { create } from 'zustand';

export type ApexPageView = 
  | 'home' 
  | 'shop' 
  | 'product' 
  | 'cart' 
  | 'checkout' 
  | 'wishlist' 
  | 'about' 
  | 'contact' 
  | 'deals';

interface UIState {
  activePageView: ApexPageView;
  selectedProductSlug: string | null;
  selectedCategorySlug: string | null;
  selectedSpecialFilter: string | null;
  
  setActivePageView: (view: ApexPageView) => void;
  setSelectedProductSlug: (slug: string | null) => void;
  setSelectedCategorySlug: (slug: string | null) => void;
  setSelectedSpecialFilter: (filter: string | null) => void;

  navigateToHome: () => void;
  navigateToShop: (categorySlug?: string, specialFilter?: string) => void;
  navigateToProduct: (slug: string) => void;
  navigateToCart: () => void;
  navigateToCheckout: () => void;
  navigateToWishlist: () => void;
  navigateToAbout: () => void;
  navigateToContact: () => void;
  navigateToDeals: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activePageView: 'home',
  selectedProductSlug: null,
  selectedCategorySlug: null,
  selectedSpecialFilter: null,

  setActivePageView: (activePageView) => set({ activePageView }),
  setSelectedProductSlug: (selectedProductSlug) => set({ selectedProductSlug }),
  setSelectedCategorySlug: (selectedCategorySlug) => set({ selectedCategorySlug }),
  setSelectedSpecialFilter: (selectedSpecialFilter) => set({ selectedSpecialFilter }),

  navigateToHome: () => {
    set({ activePageView: 'home' });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  navigateToShop: (categorySlug?: string, specialFilter?: string) => {
    set({
      activePageView: 'shop',
      selectedCategorySlug: categorySlug || null,
      selectedSpecialFilter: specialFilter || null,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  navigateToProduct: (slug: string) => {
    set({ activePageView: 'product', selectedProductSlug: slug });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  navigateToCart: () => {
    set({ activePageView: 'cart' });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  navigateToCheckout: () => {
    set({ activePageView: 'checkout' });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  navigateToWishlist: () => {
    set({ activePageView: 'wishlist' });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  navigateToAbout: () => {
    set({ activePageView: 'about' });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  navigateToContact: () => {
    set({ activePageView: 'contact' });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  navigateToDeals: () => {
    set({ activePageView: 'deals' });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },
}));
