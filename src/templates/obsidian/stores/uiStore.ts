import { create } from 'zustand';
import { ObsidianView } from '../types';

export interface Toast {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warning';
}

interface QuotePrefill {
  productSlug?: string;
  plan?: string;
  message?: string;
}

interface UIStoreState {
  currentView: ObsidianView;
  selectedProductSlug: string | null;
  targetSection: string | null;
  isMobileMenuOpen: boolean;
  quotePrefill: QuotePrefill | null;
  toasts: Toast[];

  // Navigation actions
  navigateToHome: () => void;
  navigateToProducts: () => void;
  navigateToProduct: (slug: string) => void;
  navigateToServices: (sectionId?: string) => void;
  navigateToProjects: () => void;
  navigateToAbout: () => void;
  navigateToQuote: (prefill?: QuotePrefill) => void;
  navigateToFaq: () => void;
  navigateToPrivacy: () => void;
  navigateToTerms: () => void;

  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;

  // Toast actions
  showToast: (message: string, type?: 'info' | 'success' | 'warning') => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIStoreState>((set) => ({
  currentView: 'home',
  selectedProductSlug: null,
  targetSection: null,
  isMobileMenuOpen: false,
  quotePrefill: null,
  toasts: [],

  navigateToHome: () => {
    set({ currentView: 'home', selectedProductSlug: null, isMobileMenuOpen: false });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToProducts: () => {
    set({ currentView: 'products', selectedProductSlug: null, isMobileMenuOpen: false });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToProduct: (slug: string) => {
    set({ currentView: 'product', selectedProductSlug: slug, isMobileMenuOpen: false });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToServices: (sectionId?: string) => {
    set({
      currentView: 'services',
      selectedProductSlug: null,
      targetSection: sectionId || null,
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') {
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  },

  navigateToProjects: () => {
    set({ currentView: 'projects', selectedProductSlug: null, isMobileMenuOpen: false });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToAbout: () => {
    set({ currentView: 'about', selectedProductSlug: null, isMobileMenuOpen: false });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToQuote: (prefill?: QuotePrefill) => {
    set({
      currentView: 'quote',
      selectedProductSlug: null,
      quotePrefill: prefill || null,
      isMobileMenuOpen: false,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToFaq: () => {
    set({ currentView: 'faq', selectedProductSlug: null, isMobileMenuOpen: false });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToPrivacy: () => {
    set({ currentView: 'privacy', selectedProductSlug: null, isMobileMenuOpen: false });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateToTerms: () => {
    set({ currentView: 'terms', selectedProductSlug: null, isMobileMenuOpen: false });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  setMobileMenuOpen: (open: boolean) => set({ isMobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  showToast: (message: string, type: 'info' | 'success' | 'warning' = 'success') => {
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

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
