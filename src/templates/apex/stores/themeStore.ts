import { create } from 'zustand';

type Theme = 'dark' | 'light';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const STORAGE_KEY = 'aether_theme_v1';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem(STORAGE_KEY) as Theme;
  if (saved === 'dark' || saved === 'light') return saved;
  // Default to dark luxury mode
  return 'dark';
};

const applyThemeToDOM = (theme: Theme) => {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'dark', // initial fallback for SSR

  setTheme: (theme) => {
    applyThemeToDOM(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, theme);
    }
    set({ theme });
  },

  toggleTheme: () => {
    const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
    get().setTheme(nextTheme);
  }
}));

// Initialize client theme
if (typeof window !== 'undefined') {
  const initial = getInitialTheme();
  useThemeStore.getState().setTheme(initial);
}
