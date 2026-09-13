import React, { useState, useEffect, useRef } from 'react';
import { useUIStore } from '../stores/uiStore';
import { PRODUCTS, CATEGORIES, formatPrice } from '../data/products';
import { useCartStore } from '../stores/cartStore';

export const SearchOverlay: React.FC = () => {
  const isSearchOpen = useUIStore((s) => s.isSearchOpen);
  const closeSearch = useUIStore((s) => s.closeSearch);
  const navigateToProduct = useUIStore((s) => s.navigateToProduct);
  const showToast = useUIStore((s) => s.showToast);
  const addToCart = useCartStore((s) => s.addToCart);

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        useUIStore.getState().openSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  const popularSearches = ['Vitamin C', 'Retinol', 'Hyaluronic', 'Face Oil', 'Cleanser', 'Mask'];

  const results = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.concern.toLowerCase().includes(q) ||
        p.heroIngredients.some((ing) => ing.toLowerCase().includes(q))
      );
    });
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <>
      <div
        onClick={closeSearch}
        className="backdrop fixed inset-0 z-[79] bg-ink/50 backdrop-blur-[2px] is-open"
      />

      <div
        id="search-overlay"
        className="overlay-panel fixed inset-x-0 top-0 z-[80] max-h-[88dvh] overflow-y-auto bg-bg shadow-lifted is-open"
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        <div className="container-editorial py-10 md:py-14">
          <div className="flex items-center gap-5 border-b border-line-strong pb-5">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              className="shrink-0 text-stone"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.8-3.8" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search serums, rituals, ingredients…"
              autoComplete="off"
              aria-label="Search products"
              className="w-full bg-transparent font-serif text-2xl italic text-ink placeholder:text-stone focus:outline-none md:text-4xl"
            />
            <button
              type="button"
              onClick={closeSearch}
              className="eyebrow shrink-0 border border-line-strong px-4 py-2 text-smoke transition-colors hover:border-ink hover:text-ink cursor-pointer"
              aria-label="Close search"
            >
              Esc
            </button>
          </div>

          {/* Popular Searches */}
          {!query.trim() && (
            <div id="search-popular" className="pt-8">
              <p className="eyebrow mb-5 text-stone">Popular Searches</p>
              <div className="flex flex-wrap gap-2.5">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                      inputRef.current?.focus();
                    }}
                    className="rounded-full border border-line px-5 py-2.5 font-serif text-base italic text-espresso transition-all duration-300 hover:border-gold hover:text-gold cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query.trim() && (
            <div id="search-results" className="pt-8">
              {results.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((p) => {
                    const catLabel = CATEGORIES.find((c) => c.id === p.category)?.label;
                    return (
                      <article key={p.slug} className="flex gap-4 border border-line p-4 rounded-md bg-surface">
                        <button
                          type="button"
                          onClick={() => {
                            closeSearch();
                            navigateToProduct(p.slug);
                          }}
                          className="h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-cream cursor-pointer"
                        >
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="h-full w-full object-cover"
                          />
                        </button>
                        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
                          <p className="eyebrow text-stone">{catLabel}</p>
                          <button
                            type="button"
                            onClick={() => {
                              closeSearch();
                              navigateToProduct(p.slug);
                            }}
                            className="truncate font-serif text-lg leading-snug hover:text-bronze text-left cursor-pointer"
                          >
                            {p.name}
                          </button>
                          <div className="mt-2 flex items-center justify-between gap-3">
                            <span className="text-xs tracking-wide text-smoke font-medium">
                              {formatPrice(p.price)}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                addToCart(p.slug, 0, 1);
                                showToast(`${p.name} added to your bag.`);
                              }}
                              className="eyebrow border border-line-strong px-3.5 py-1.5 transition-all duration-300 hover:bg-ink hover:text-ivory cursor-pointer"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="font-serif text-2xl italic text-espresso">
                    No results for “{query}”
                  </p>
                  <p className="mt-2 text-sm text-stone">
                    Try searching for cleansers, oils, or active ingredients.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
