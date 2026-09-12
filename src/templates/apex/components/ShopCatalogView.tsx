'use client';

import React, { useState, useMemo } from 'react';
import type { Product } from '../types';
import { products } from '../products';
import { categories } from '../categories';
import { ProductCard } from './ProductCard';
import { useUIStore } from '../stores/uiStore';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  RotateCcw,
  Star,
  Check,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

interface ShopCatalogViewProps {
  accentColor?: string;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export const ShopCatalogView: React.FC<ShopCatalogViewProps> = ({
  accentColor = '#3b82f6',
}) => {
  const {
    selectedCategorySlug,
    selectedSpecialFilter,
    navigateToHome,
    navigateToProduct,
    setSelectedCategorySlug,
    setSelectedSpecialFilter,
  } = useUIStore();

  const [selectedCategory, setSelectedCategory] = useState<string>(selectedCategorySlug || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [specialFilter, setSpecialFilter] = useState<string>(selectedSpecialFilter || 'all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Sync when store changes
  React.useEffect(() => {
    if (selectedCategorySlug) {
      setSelectedCategory(selectedCategorySlug);
    }
  }, [selectedCategorySlug]);

  React.useEffect(() => {
    if (selectedSpecialFilter) {
      setSpecialFilter(selectedSpecialFilter);
    }
  }, [selectedSpecialFilter]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.categorySlug !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchTagline = product.tagline.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchCat = product.category.toLowerCase().includes(q);
        if (!matchName && !matchTagline && !matchDesc && !matchCat) {
          return false;
        }
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      // In-stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Special tags filter
      if (specialFilter === 'new' && !product.isNew) return false;
      if (specialFilter === 'bestseller' && !product.isBestSeller) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default
    });
  }, [
    selectedCategory,
    searchQuery,
    priceRange,
    minRating,
    inStockOnly,
    specialFilter,
    sortBy,
  ]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedCategorySlug(null);
    setSearchQuery('');
    setPriceRange([0, 5000]);
    setMinRating(0);
    setInStockOnly(false);
    setSpecialFilter('all');
    setSelectedSpecialFilter(null);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery !== '' ||
    priceRange[0] > 0 ||
    priceRange[1] < 5000 ||
    minRating > 0 ||
    inStockOnly ||
    specialFilter !== 'all';

  const currentCategoryObj = categories.find((c) => c.slug === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in text-[var(--text-primary)]">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]" aria-label="Breadcrumb">
          <button
            onClick={navigateToHome}
            className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="text-[var(--text-primary)] font-semibold">Catalog</span>
          {currentCategoryObj && (
            <>
              <span>/</span>
              <span className="text-blue-500 font-semibold">{currentCategoryObj.name}</span>
            </>
          )}
        </nav>

        <button
          onClick={navigateToHome}
          className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Back to Home</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Header Banner */}
      <div className="max-w-2xl space-y-3">
        <span
          className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block"
          style={{ color: accentColor }}
        >
          PRECISION ARCHIVE 2026
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
          {currentCategoryObj ? currentCategoryObj.name : 'All Instruments'}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          {currentCategoryObj
            ? currentCategoryObj.description
            : 'Engineered for absolute fidelity, tactile pleasure, and enduring resilience. Filter by domain, investment tier, or release availability.'}
        </p>
      </div>

      {/* Top Filter & View Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)]">
        {/* Search & Mobile Filter Toggle */}
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by specifications, models, materials..."
              className="w-full pl-9 pr-8 py-2.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-xs font-semibold text-[var(--text-primary)] cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            )}
          </button>
        </div>

        {/* Sort & Grid Controls */}
        <div className="flex items-center justify-between lg:justify-end gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider hidden sm:inline">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="featured">Featured Allocations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Latest Releases</option>
            </select>
          </div>

          {/* Grid / List Switch */}
          <div className="flex items-center border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-secondary)] p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[var(--bg-card)] text-blue-500 shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              aria-label="Grid layout"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[var(--bg-card)] text-blue-500 shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              aria-label="List layout"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Faceted Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Faceted Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="p-6 rounded-2xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-[var(--text-primary)]">
                Faceted Filters
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="flex items-center gap-1 text-[10px] font-mono text-blue-500 hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* Categories Facet */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] font-semibold block">
                Collection
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedCategorySlug(null);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-blue-500/10 text-blue-500 font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                  }`}
                >
                  <span>All Collections</span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">{products.length}</span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setSelectedCategorySlug(cat.slug);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      selectedCategory === cat.slug
                        ? 'bg-blue-500/10 text-blue-500 font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">{cat.productCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Special Releases Facet */}
            <div className="space-y-2.5 pt-4 border-t border-[var(--border-subtle)]">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] font-semibold block">
                Release Status
              </span>
              <div className="space-y-1">
                {[
                  { id: 'all', label: 'All Catalog' },
                  { id: 'new', label: 'New Releases 2026' },
                  { id: 'bestseller', label: 'Best Sellers' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSpecialFilter(item.id);
                      setSelectedSpecialFilter(item.id === 'all' ? null : item.id);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      specialFilter === item.id
                        ? 'bg-blue-500/10 text-blue-500 font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {specialFilter === item.id && <Check className="w-3.5 h-3.5 text-blue-500" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Presets */}
            <div className="space-y-2.5 pt-4 border-t border-[var(--border-subtle)]">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] font-semibold block">
                Investment Range
              </span>
              <div className="space-y-1">
                {[
                  { range: [0, 5000] as [number, number], label: 'Any Investment' },
                  { range: [0, 500] as [number, number], label: 'Under $500' },
                  { range: [500, 1000] as [number, number], label: '$500 – $1,000' },
                  { range: [1000, 2000] as [number, number], label: '$1,000 – $2,000' },
                  { range: [2000, 5000] as [number, number], label: '$2,000+' },
                ].map((tier, i) => (
                  <button
                    key={i}
                    onClick={() => setPriceRange(tier.range)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      priceRange[0] === tier.range[0] && priceRange[1] === tier.range[1]
                        ? 'bg-blue-500/10 text-blue-500 font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                    }`}
                  >
                    <span>{tier.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Availability Toggle */}
            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-medium text-[var(--text-primary)]">
                  In Stock Only
                </span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-[var(--border-medium)] text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </label>
            </div>
          </div>
        </aside>

        {/* Mobile Filters Modal / Dropdown */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[var(--bg-card)] border border-[var(--border-medium)] rounded-3xl p-6 space-y-6 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                <h3 className="text-sm font-mono uppercase font-bold text-[var(--text-primary)]">
                  Faceted Filters
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Collection */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-[var(--text-secondary)]">Collection</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedCategorySlug(null);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs ${
                      selectedCategory === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                    }`}
                  >
                    All Collections
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCategory(c.slug);
                        setSelectedCategorySlug(c.slug);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs truncate ${
                        selectedCategory === c.slug
                          ? 'bg-blue-600 text-white'
                          : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Release */}
              <div className="space-y-2 pt-4 border-t border-[var(--border-subtle)]">
                <span className="text-xs font-mono uppercase text-[var(--text-secondary)]">Release</span>
                <div className="flex gap-2">
                  {['all', 'new', 'bestseller'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setSpecialFilter(st)}
                      className={`flex-1 py-2 rounded-xl text-xs uppercase font-mono ${
                        specialFilter === st
                          ? 'bg-blue-600 text-white'
                          : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
                <button
                  onClick={resetAllFilters}
                  className="flex-1 py-3 rounded-xl border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)]"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase tracking-wider"
                >
                  View {filteredProducts.length} Results
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid / List Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] mr-1">
                Active:
              </span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-blue-500/10 text-blue-500 border border-blue-500/20 font-medium">
                  {categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedCategorySlug(null);
                    }}
                    className="cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {specialFilter !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-blue-500/10 text-blue-500 border border-blue-500/20 font-medium">
                  {specialFilter === 'new' ? 'New Releases' : 'Best Sellers'}
                  <button
                    onClick={() => {
                      setSpecialFilter('all');
                      setSelectedSpecialFilter(null);
                    }}
                    className="cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 5000) && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-blue-500/10 text-blue-500 border border-blue-500/20 font-medium">
                  ${priceRange[0]} - ${priceRange[1]}
                  <button onClick={() => setPriceRange([0, 5000])} className="cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {inStockOnly && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-blue-500/10 text-blue-500 border border-blue-500/20 font-medium">
                  In Stock Only
                  <button onClick={() => setInStockOnly(false)} className="cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={resetAllFilters}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] underline ml-2 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results Count Header */}
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono">
            <span>
              Showing <strong className="text-[var(--text-primary)]">{filteredProducts.length}</strong> of {products.length} precision instruments
            </span>
          </div>

          {/* Product Items Display */}
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center rounded-3xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] p-8">
              <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-4 text-[var(--text-muted)]">
                <Search className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[var(--text-primary)]">No models match your specifications</h4>
              <p className="text-xs text-[var(--text-secondary)] mt-2 max-w-sm mx-auto">
                Adjust your price range, category selection, or search keywords to view available flagship allocations.
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-6 px-6 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--text-inverse)] text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all"
                >
                  <div
                    onClick={() => navigateToProduct(product.slug)}
                    className="w-full sm:w-48 aspect-square rounded-xl overflow-hidden bg-black/40 flex-shrink-0 cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-blue-500">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-mono text-[var(--text-secondary)]">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{product.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div
                        onClick={() => navigateToProduct(product.slug)}
                        className="cursor-pointer"
                      >
                        <h4 className="text-lg font-bold text-[var(--text-primary)] hover:text-blue-500 transition-colors mt-1">
                          {product.name}
                        </h4>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                      <span className="text-xl font-bold font-mono text-[var(--text-primary)]">
                        ${product.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => navigateToProduct(product.slug)}
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Inspect Specifications
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
