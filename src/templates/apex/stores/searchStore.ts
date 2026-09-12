import { create } from 'zustand';

interface SearchState {
  isOpen: boolean;
  query: string;
  recentSearches: string[];
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  setQuery: (query: string) => void;
  addRecentSearch: (term: string) => void;
  clearRecentSearches: () => void;
}

const STORAGE_KEY = 'aether_recent_searches_v1';

const getInitialRecent = (): string[] => {
  if (typeof window === 'undefined') return ['Aura Pro', 'Titanium Watch', 'Noise Cancelling', 'VisionBook'];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : ['Aura Pro', 'Titanium Watch', 'Noise Cancelling', 'VisionBook'];
  } catch (e) {
    return ['Aura Pro', 'Titanium Watch', 'Noise Cancelling', 'VisionBook'];
  }
};

export const useSearchStore = create<SearchState>((set, get) => ({
  isOpen: false,
  query: '',
  recentSearches: getInitialRecent(),

  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false, query: '' }),
  toggleSearch: () => set((state) => ({ isOpen: !state.isOpen, query: state.isOpen ? '' : state.query })),
  setQuery: (query) => set({ query }),

  addRecentSearch: (term) => {
    const clean = term.trim();
    if (!clean) return;
    const current = get().recentSearches.filter((t) => t.toLowerCase() !== clean.toLowerCase());
    const updated = [clean, ...current].slice(0, 6);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
    }
    set({ recentSearches: updated });
  },

  clearRecentSearches: () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
    }
    set({ recentSearches: [] });
  }
}));
