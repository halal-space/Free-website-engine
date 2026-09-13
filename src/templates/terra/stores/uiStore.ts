import { create } from 'zustand';
import { TerraView, ToastNotification, OrderRecord } from '../types';

interface UIStoreState {
  currentView: TerraView;
  selectedCategory: string | null;
  selectedProductSlug: string | null;
  selectedRecipeSlug: string | null;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  searchQuery: string;
  toasts: ToastNotification[];
  lastOrder: OrderRecord | null;

  navigateToHome: () => void;
  navigateToShop: (category?: string) => void;
  navigateToProduct: (slug: string) => void;
  navigateToBox: () => void;
  navigateToRecipes: () => void;
  navigateToRecipe: (slug: string) => void;
  navigateToMakers: () => void;
  navigateToCart: () => void;
  navigateToCheckout: () => void;
  navigateToCheckoutSuccess: (order: OrderRecord) => void;
  navigateToAbout: () => void;
  navigateToFaq: () => void;
  navigateToShipping: () => void;
  navigateToContact: () => void;
  navigateToAccount: () => void;
  navigateToLegal: () => void;
  navigateToSearch: (query?: string) => void;
  navigateTo404: () => void;

  openSearch: () => void;
  closeSearch: () => void;
  setSearchQuery: (query: string) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;

  showToast: (message: string, type?: 'info' | 'success' | 'warning') => void;
  removeToast: (id: string) => void;
  setView: (view: string, param?: string) => void;
}

export const useUIStore = create<UIStoreState>((set) => ({
  currentView: 'home',
  selectedCategory: null,
  selectedProductSlug: null,
  selectedRecipeSlug: null,
  isSearchOpen: false,
  isMobileMenuOpen: false,
  searchQuery: '',
  toasts: [],
  lastOrder: null,

  navigateToHome: () => {
    set({
      currentView: 'home',
      selectedProductSlug: null,
      selectedRecipeSlug: null,
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToShop: (category) => {
    set({
      currentView: 'shop',
      selectedCategory: category || null,
      selectedProductSlug: null,
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToProduct: (slug) => {
    set({
      currentView: 'product',
      selectedProductSlug: slug,
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToBox: () => {
    set({
      currentView: 'box',
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToRecipes: () => {
    set({
      currentView: 'recipes',
      selectedRecipeSlug: null,
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToRecipe: (slug) => {
    set({
      currentView: 'recipe',
      selectedRecipeSlug: slug,
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToMakers: () => {
    set({
      currentView: 'makers',
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToCart: () => {
    set({
      currentView: 'cart',
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToCheckout: () => {
    set({
      currentView: 'checkout',
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToCheckoutSuccess: (order) => {
    set({
      currentView: 'checkout-success',
      lastOrder: order,
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToAbout: () => {
    set({
      currentView: 'about',
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToFaq: () => {
    set({
      currentView: 'faq',
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToShipping: () => {
    set({
      currentView: 'shipping',
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToContact: () => {
    set({
      currentView: 'contact',
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToAccount: () => {
    set({
      currentView: 'account',
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToLegal: () => {
    set({
      currentView: 'legal',
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToSearch: (query) => {
    set({
      currentView: 'search',
      searchQuery: query || '',
      isSearchOpen: false,
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateTo404: () => {
    set({
      currentView: '404',
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  showToast: (message, type = 'success') => {
    const id = 'toast_' + Math.random().toString(36).slice(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4000);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  setView: (view: string, param?: string) => {
    switch (view) {
      case 'home':
        set({ currentView: 'home', selectedProductSlug: null, selectedRecipeSlug: null, isMobileMenuOpen: false });
        break;
      case 'shop':
        set({ currentView: 'shop', selectedCategory: null, selectedProductSlug: null, isMobileMenuOpen: false });
        break;
      case 'category':
        set({ currentView: 'shop', selectedCategory: param || null, selectedProductSlug: null, isMobileMenuOpen: false });
        break;
      case 'product':
        set({ currentView: 'product', selectedProductSlug: param || null, isMobileMenuOpen: false });
        break;
      case 'box':
        set({ currentView: 'box', isMobileMenuOpen: false });
        break;
      case 'recipes':
        set({ currentView: 'recipes', selectedRecipeSlug: null, isMobileMenuOpen: false });
        break;
      case 'recipe':
      case 'recipe-detail':
        set({ currentView: 'recipe', selectedRecipeSlug: param || null, isMobileMenuOpen: false });
        break;
      case 'makers':
        set({ currentView: 'makers', isMobileMenuOpen: false });
        break;
      case 'cart':
        set({ currentView: 'cart', isMobileMenuOpen: false });
        break;
      case 'checkout':
        set({ currentView: 'checkout', isMobileMenuOpen: false });
        break;
      case 'checkout-success':
        set({ currentView: 'checkout-success', isMobileMenuOpen: false });
        break;
      case 'about':
        set({ currentView: 'about', isMobileMenuOpen: false });
        break;
      case 'faq':
        set({ currentView: 'faq', isMobileMenuOpen: false });
        break;
      case 'shipping':
        set({ currentView: 'shipping', isMobileMenuOpen: false });
        break;
      case 'contact':
        set({ currentView: 'contact', isMobileMenuOpen: false });
        break;
      case 'account':
        set({ currentView: 'account', isMobileMenuOpen: false });
        break;
      case 'legal':
        set({ currentView: 'legal', isMobileMenuOpen: false });
        break;
      case 'search':
        set({ currentView: 'search', searchQuery: param || '', isSearchOpen: false, isMobileMenuOpen: false });
        break;
      case '404':
      case 'not-found':
        set({ currentView: '404', isMobileMenuOpen: false });
        break;
      default:
        set({ currentView: 'home', isMobileMenuOpen: false });
    }
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },
}));
