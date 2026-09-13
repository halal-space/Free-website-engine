'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';
import { products } from '../data/products';
import type { Product } from '../types';

const POPULAR_SEARCHES = [
  'Organic Swaddle',
  'Silicone Feeding Set',
  'Wooden Puzzle',
  'Linen Romper',
  'Bento Lunchbox',
  'Explorer Backpack',
  'Pacifier Clip'
];

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, toggleSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      }
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, toggleSearch, closeSearch]);

  // Focus input on modal open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  // Filter products matching query
  const trimmed = query.trim().toLowerCase();
  const results: Product[] = trimmed
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.subtitle.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.description.toLowerCase().includes(trimmed)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1917]/60 backdrop-blur-sm transition-opacity"
        onClick={closeSearch}
      />

      {/* Modal Container */}
      <div className="relative mx-auto max-w-2xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-[#E8E2D7] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[#E8E2D7] px-4 py-4 sm:px-6">
          <Search className="w-5 h-5 text-[#877E73] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search baby essentials, nursery linens, school bags..."
            className="w-full bg-transparent pl-3 pr-8 text-sm text-[#1C1917] placeholder-[#877E73] focus:outline-none font-sans"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-[#877E73] hover:text-[#1C1917]"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] text-[#877E73] bg-[#EAE3D5] rounded border border-[#DDD5C7]">
              ESC
            </kbd>
          )}
        </div>

        {/* Results / Suggestions Container */}
        <div className="max-h-96 overflow-y-auto p-4 sm:p-6">
          {query.trim() === '' ? (
            <div>
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#877E73] mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#B88B4A]" />
                <span>Popular Inquiries</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-full text-xs bg-[#F2ECE1] text-[#1C1917] hover:bg-[#E2D9CB] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-[#E8E2D7]">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#877E73] block mb-3">
                  Browse by Category
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      closeSearch();
                      useUIStore.getState().navigateToShop('baby-essentials');
                    }}
                    className="p-2.5 rounded-lg bg-white border border-[#E8E2D7] hover:border-[#B88B4A] hover:bg-[#FAF8F5] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Baby Essentials</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#877E73]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeSearch();
                      useUIStore.getState().navigateToShop('nursery-feeding');
                    }}
                    className="p-2.5 rounded-lg bg-white border border-[#E8E2D7] hover:border-[#B88B4A] hover:bg-[#FAF8F5] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Nursery & Feeding</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#877E73]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeSearch();
                      useUIStore.getState().navigateToShop('toys-play');
                    }}
                    className="p-2.5 rounded-lg bg-white border border-[#E8E2D7] hover:border-[#B88B4A] hover:bg-[#FAF8F5] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Toys & Play</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#877E73]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeSearch();
                      useUIStore.getState().navigateToShop('school-essentials');
                    }}
                    className="p-2.5 rounded-lg bg-white border border-[#E8E2D7] hover:border-[#B88B4A] hover:bg-[#FAF8F5] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>School Essentials</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#877E73]" />
                  </button>
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <span className="text-xs text-[#877E73] block mb-2">
                Found {results.length} matching {results.length === 1 ? 'item' : 'items'}
              </span>
              {results.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    closeSearch();
                    useUIStore.getState().navigateToProduct(product.slug);
                  }}
                  className="w-full text-left flex items-center gap-4 p-2.5 rounded-lg hover:bg-[#F2ECE1] transition-colors group cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-14 h-16 object-cover rounded bg-[#EAE3D5] shrink-0 border border-[#E8E2D7]"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] uppercase tracking-wider text-[#B88B4A] font-semibold block">
                      {product.category}
                    </span>
                    <h4 className="font-serif text-sm font-medium text-[#1C1917] truncate group-hover:text-[#B88B4A] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#877E73] truncate">{product.subtitle}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-semibold text-[#1C1917] tabular-nums">
                      ${product.price.toFixed(2)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#877E73] group-hover:text-[#1C1917] group-hover:translate-x-1 transition-all ml-auto mt-1" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-[#877E73]">
              <p className="text-sm font-serif text-[#1C1917]">No products found for "{query}"</p>
              <p className="text-xs mt-1">Try exploring our category filters or popular terms above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
