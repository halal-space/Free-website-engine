'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchStore } from '../stores/searchStore';
import { products } from '../products';
import { useCartStore } from '../stores/cartStore';
import { Search, X, Clock, Flame, ShoppingBag } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isOpen, closeSearch, query, setQuery, recentSearches, addRecentSearch, clearRecentSearches } = useSearchStore();
  const { addItem } = useCartStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        useSearchStore.getState().toggleSearch();
      }
      if (e.key === 'Escape' && isOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeSearch]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          Object.values(p.specs).some((val) => val.toLowerCase().includes(q))
        );
      })
    : [];

  const handleSelectSearch = (term: string) => {
    setQuery(term);
    addRecentSearch(term);
  };

  const handleProductAdd = (product: typeof products[0]) => {
    addItem(product, product.colors[0], product.variants?.[0], 1);
    addRecentSearch(product.name);
    closeSearch();
  };

  const popularSearches = ['Aura Pro', 'Nova X', 'Titanium Timepiece', 'Planar Magnetic', 'Beryllium Drivers', 'Mini-LED'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity cursor-pointer"
        onClick={closeSearch}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[var(--bg-elevated)] border border-[var(--border-medium)] rounded-2xl shadow-2xl overflow-hidden transition-all z-10">
        {/* Search Header Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50">
          <Search className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search luxury acoustics, smartphones, timepieces, computing..."
            className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-full mr-2 cursor-pointer"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded shadow-sm mr-2">
              ESC
            </kbd>
          )}
          <button
            onClick={closeSearch}
            className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-full hover:bg-[var(--border-subtle)] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[65vh] overflow-y-auto">
          {query.trim() ? (
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3">
                Matching Instruments ({filteredProducts.length})
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                  <p className="text-sm text-[var(--text-secondary)]">
                    No matching instruments found for "{query}"
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Try searching for general terms like "Headphones", "Titanium", or "Aura".
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] hover:border-blue-500/40 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-12 h-12 rounded-lg object-cover bg-black/40 border border-[var(--border-subtle)]"
                        />
                        <div>
                          <div className="text-xs font-bold text-[var(--text-primary)] group-hover:text-blue-400 transition-colors">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-[var(--text-muted)] font-mono">
                            {p.category} • ${p.price.toLocaleString()} USD
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleProductAdd(p)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Popular Curations</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSelectSearch(term)}
                      className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-blue-400 hover:border-blue-500/30 transition-all cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Recent Searches</span>
                    </div>
                    <button
                      onClick={clearRecentSearches}
                      className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSelectSearch(term)}
                        className="px-3 py-1 rounded-full text-xs border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
