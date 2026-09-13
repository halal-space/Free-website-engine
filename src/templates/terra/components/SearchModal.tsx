import React, { useEffect, useRef, useState } from 'react';
import { useUIStore } from '../stores/uiStore';
import { products, trendingSearches, money } from '../data/catalog';
import Icon from './Icon';

export const SearchModal: React.FC = () => {
  const isSearchOpen = useUIStore((s) => s.isSearchOpen);
  const closeSearch = useUIStore((s) => s.closeSearch);
  const navigateToProduct = useUIStore((s) => s.navigateToProduct);
  const navigateToSearch = useUIStore((s) => s.navigateToSearch);

  const [q, setQ] = useState('');
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      try {
        const r = JSON.parse(localStorage.getItem('tc-recent') || '[]');
        if (Array.isArray(r)) setRecent(r.slice(0, 4));
      } catch {}
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) closeSearch();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const results = q.trim()
    ? products
        .filter((p) =>
          `${p.name} ${p.category} ${p.origin}`.toLowerCase().includes(q.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const commitSearch = (term: string) => {
    if (!term.trim()) return;
    const next = [term, ...recent.filter((r) => r !== term)].slice(0, 4);
    setRecent(next);
    try {
      localStorage.setItem('tc-recent', JSON.stringify(next));
    } catch {}
    closeSearch();
    navigateToSearch(term);
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-[#1B241E]/50 p-4 pt-16 sm:pt-24 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Search pantry"
    >
      <div
        className="fixed inset-0"
        onClick={closeSearch}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-[#FBF9F5] shadow-2xl border border-[#1B241E]/10 z-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            commitSearch(q);
          }}
          className="flex items-center gap-2 border-b border-[#1B241E]/10 px-4 py-3"
        >
          <Icon name="Search" size={18} className="text-[#6F7A72]" />
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search oils, grains, makers, regions..."
            aria-label="Search products"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#6F7A72] text-[#1B241E]"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ('')}
              className="text-xs text-[#6F7A72] hover:text-[#1B241E] cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={closeSearch}
            className="cursor-pointer rounded-full p-1 text-[#6F7A72] hover:bg-black/5"
            aria-label="Close search"
          >
            <Icon name="X" size={16} />
          </button>
        </form>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {q.trim() && results.length === 0 && (
            <p className="py-6 text-center text-sm text-[#6F7A72]">
              No pantry staples found for &ldquo;{q}&rdquo;.
            </p>
          )}

          {results.length > 0 && (
            <ul className="divide-y divide-[#1B241E]/8">
              {results.map((p) => (
                <li key={p.id} className="py-2.5 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => {
                      commitSearch(p.name);
                      navigateToProduct(p.slug);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl p-1 text-left transition-colors duration-150 hover:bg-[#F2EFE9] cursor-pointer"
                  >
                    <img
                      src={p.image}
                      alt=""
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#1B241E]">{p.name}</p>
                      <p className="text-xs text-[#6F7A72]">
                        {p.origin} · {p.category}
                      </p>
                    </div>
                    <span className="tnum text-sm font-bold text-[#1B241E]">{money(p.price)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {!q.trim() && (
            <div className="space-y-4">
              {recent.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-[#6F7A72] uppercase">
                    Recent
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {recent.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => commitSearch(r)}
                        className="cursor-pointer rounded-full bg-[#F2EFE9] px-3 py-1 text-xs font-medium text-[#1B241E] hover:bg-[#1B241E] hover:text-[#FBF9F5] transition-colors"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-[#6F7A72] uppercase">
                  Trending Searches
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {trendingSearches.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => commitSearch(t)}
                      className="cursor-pointer rounded-full border border-[#1B241E]/10 bg-white px-3 py-1 text-xs font-medium text-[#1B241E] hover:border-[#C85A32] hover:text-[#C85A32] transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
