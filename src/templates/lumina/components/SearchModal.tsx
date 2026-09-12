'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useUIStore } from '../stores/uiStore';
import { useCartStore } from '../stores/cartStore';
import { PRODUCTS } from '../products';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import type { Product } from '../types';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setSearchOpen,
    openQuickView,
    setSelectedProductSlug,
    setSelectedCollectionSlug,
    setActivePageView
  } = useUIStore();
  const { formatPrice } = useCartStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const trendingTags = [
    'Mongolian Cashmere',
    'Silk Satin Gown',
    'Peak-Lapel Blazer',
    'Pleated Wool Trousers',
    'Calfskin Tote',
    'Goodyear Boot'
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.composition.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex flex-col bg-[#0C0C0D]/95 backdrop-blur-xl text-[#FAF8F5] animate-fade-in">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-[#2A2A2E]">
        <div className="text-xs tracking-ultra-wide uppercase text-[#A1A1AA]">
          Atelier Archive Search
        </div>
        <button
          onClick={() => setSearchOpen(false)}
          className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#A1A1AA] hover:text-[#FAF8F5] transition-colors cursor-pointer"
        >
          <span>Close</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8 max-w-5xl mx-auto w-full">
        {/* Search Input Box */}
        <div className="relative border-b-2 border-[#C5A880] pb-3 mb-10">
          <div className="flex items-center gap-4">
            <Search className="w-6 h-6 text-[#C5A880] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search garments, tailoring, silk, cashmere, leather..."
              className="w-full bg-transparent text-xl md:text-3xl font-light text-[#FAF8F5] placeholder-[#52525B] focus:outline-none font-serif tracking-wide"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-[#71717A] hover:text-[#FAF8F5] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* If no query yet: show trending tags and collections */}
        {!query.trim() && (
          <div className="space-y-10 animate-fade-in-up">
            <div>
              <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#C5A880] mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-4 py-2 text-xs tracking-wider border border-[#2A2A2E] text-[#D4CDC3] hover:border-[#C5A880] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#1E1E20]">
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setActivePageView('shop');
                }}
                className="group p-5 border border-[#1E1E20] hover:border-[#C5A880] transition-colors bg-[#111112] text-left cursor-pointer"
              >
                <span className="text-[10px] tracking-ultra-wide uppercase text-[#A1A1AA]">Curated</span>
                <h4 className="text-base font-serif text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors mt-1">
                  Complete Catalog &rarr;
                </h4>
                <p className="text-xs text-[#71717A] mt-2">Browse the full spectrum of 2026 Archive garments.</p>
              </button>

              <button
                onClick={() => {
                  setSelectedCollectionSlug('the-2026-archive');
                  setActivePageView('collections');
                  setSearchOpen(false);
                }}
                className="group p-5 border border-[#1E1E20] hover:border-[#C5A880] transition-colors bg-[#111112] text-left cursor-pointer"
              >
                <span className="text-[10px] tracking-ultra-wide uppercase text-[#A1A1AA]">Collection</span>
                <h4 className="text-base font-serif text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors mt-1">
                  The Monolith Tailoring &rarr;
                </h4>
                <p className="text-xs text-[#71717A] mt-2">Sculpted outerwear, blazers, and deep-pleat wool.</p>
              </button>

              <button
                onClick={() => {
                  setSelectedCollectionSlug('sculptural-eveningwear');
                  setActivePageView('collections');
                  setSearchOpen(false);
                }}
                className="group p-5 border border-[#1E1E20] hover:border-[#C5A880] transition-colors bg-[#111112] text-left cursor-pointer"
              >
                <span className="text-[10px] tracking-ultra-wide uppercase text-[#A1A1AA]">Nocturne</span>
                <h4 className="text-base font-serif text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors mt-1">
                  Sculptural Eveningwear &rarr;
                </h4>
                <p className="text-xs text-[#71717A] mt-2">Liquid 40-momme silk gowns on couture stands.</p>
              </button>
            </div>
          </div>
        )}

        {/* Results list */}
        {query.trim() && (
          <div>
            <div className="text-xs tracking-widest uppercase text-[#71717A] mb-6">
              Found {results.length} piece{results.length === 1 ? '' : 's'} in archive
            </div>

            {results.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-base font-serif text-[#D4CDC3]">No atelier garments match "{query}".</p>
                <p className="text-xs text-[#71717A] mt-2">Try searching by material like "cashmere", "wool", or "silk".</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="group border border-[#1E1E20] bg-[#111112] p-4 flex flex-col hover:border-[#C5A880] transition-all"
                  >
                    <button
                      onClick={() => {
                        setSelectedProductSlug(product.slug);
                        setActivePageView('product');
                        setSearchOpen(false);
                      }}
                      className="block w-full aspect-[3/4] overflow-hidden bg-[#000] relative mb-3 cursor-pointer text-left"
                    >
                      <img
                        src={product.images[0].url}
                        alt={product.images[0].alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      {product.badge && (
                        <span className="absolute top-2 left-2 text-[9px] tracking-widest uppercase px-2 py-0.5 bg-[#0C0C0D]/90 text-[#C5A880] border border-[#C5A880]/30">
                          {product.badge}
                        </span>
                      )}
                    </button>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] tracking-widest uppercase text-[#A1A1AA] mb-1">
                          {product.categoryLabel}
                        </div>
                        <button
                          onClick={() => {
                            setSelectedProductSlug(product.slug);
                            setActivePageView('product');
                            setSearchOpen(false);
                          }}
                          className="font-serif text-sm text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors line-clamp-1 text-left cursor-pointer"
                        >
                          {product.name}
                        </button>
                        <p className="text-xs text-[#71717A] mt-0.5 line-clamp-1">{product.subtitle}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#1E1E20] flex items-center justify-between">
                        <span className="text-xs font-mono text-[#D4CDC3]">
                          {formatPrice(product.price)}
                        </span>
                        <button
                          onClick={() => {
                            setSearchOpen(false);
                            openQuickView(product);
                          }}
                          className="text-[10px] tracking-wider uppercase text-[#C5A880] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
