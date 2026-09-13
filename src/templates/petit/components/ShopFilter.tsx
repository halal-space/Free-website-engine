'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, X, Search, ChevronDown, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { useUIStore } from '../stores/uiStore';

const CATEGORIES = [
  'All',
  'Baby Essentials',
  'Baby Accessories',
  'Nursery & Feeding',
  'Toys & Play',
  "Kids' Clothing",
  'School Essentials',
];

const AGE_RANGES = [
  { label: 'All Ages', value: 'all' },
  { label: 'Newborn (0–6 Months)', value: '0-6M' },
  { label: 'Infant (6–12 Months)', value: '6-12M' },
  { label: 'Toddler (1–3 Years)', value: '1-3Y' },
  { label: 'Early Childhood (3–6 Years)', value: '3-6Y' },
];

const PRICE_TIERS = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $40', min: 0, max: 40 },
  { label: '$40 to $65', min: 40, max: 65 },
  { label: 'Over $65', min: 65, max: Infinity },
];

interface ShopFilterProps {
  initialCategorySlug?: string;
  initialSort?: string;
}

export const ShopFilter: React.FC<ShopFilterProps> = ({
  initialCategorySlug,
  initialSort = 'featured',
}) => {
  const storeCategorySlug = useUIStore((s) => s.selectedCategorySlug);
  const storeSort = useUIStore((s) => s.selectedSort);

  const getCategoryFromSlug = (slug?: string) => {
    if (!slug) return 'All';
    const found = products.find((p) => p.categorySlug === slug);
    return found ? found.category : 'All';
  };

  const effectiveCategorySlug = storeCategorySlug || initialCategorySlug;
  const effectiveSort = storeSort || initialSort;

  const [selectedCategory, setSelectedCategory] = useState<string>(
    getCategoryFromSlug(effectiveCategorySlug)
  );
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [selectedPriceTier, setSelectedPriceTier] = useState<number>(0);
  const [organicOnly, setOrganicOnly] = useState<boolean>(false);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>(effectiveSort);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  useEffect(() => {
    if (storeCategorySlug) {
      setSelectedCategory(getCategoryFromSlug(storeCategorySlug));
    }
  }, [storeCategorySlug]);

  useEffect(() => {
    if (storeSort) {
      setSortBy(storeSort);
    }
  }, [storeSort]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Age range
        if (selectedAge !== 'all' && p.ageRange !== selectedAge) {
          return false;
        }
        // Price tier
        const tier = PRICE_TIERS[selectedPriceTier];
        if (p.price < tier.min || p.price > tier.max) {
          return false;
        }
        // Organic filter
        if (organicOnly && !p.isOrganic) {
          return false;
        }
        // Sale filter
        if (onSaleOnly && (!p.compareAtPrice || p.compareAtPrice <= p.price)) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            p.name.toLowerCase().includes(q) ||
            p.subtitle.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q);
          if (!match) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        // Default: featured / bestsellers
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [
    selectedCategory,
    selectedAge,
    selectedPriceTier,
    organicOnly,
    onSaleOnly,
    searchQuery,
    sortBy,
  ]);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedAge !== 'all' ||
    selectedPriceTier !== 0 ||
    organicOnly ||
    onSaleOnly ||
    searchQuery.trim() !== '';

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedAge('all');
    setSelectedPriceTier(0);
    setOrganicOnly(false);
    setOnSaleOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="w-full">
      {/* Category Pills Navigation */}
      <div className="border-b border-[#E8E2D7] pb-6 mb-8 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1C1917] text-[#FAF8F5] shadow-sm'
                  : 'bg-[#FAF8F5] border border-[#E8E2D7] text-[#575149] hover:bg-[#F2ECE1] hover:text-[#1C1917]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Control Bar: Search, Mobile Filter Toggle, Count, and Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D7]">
        {/* Left: Search within collection */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#877E73]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within collection..."
            className="w-full pl-9 pr-8 py-2 text-xs border border-[#E8E2D7] rounded-full bg-white text-[#1C1917] placeholder-[#877E73] focus:outline-none focus:border-[#B88B4A]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#877E73] hover:text-[#1C1917] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: Filter drawer toggle + Sort dropdown + Item counter */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs text-[#877E73] hidden md:inline-block">
            Showing <strong className="text-[#1C1917]">{filteredProducts.length}</strong> items
          </span>

          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-4 py-2 border border-[#E8E2D7] rounded-full bg-white text-xs font-medium text-[#1C1917] hover:bg-[#F2ECE1] cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#B88B4A]" />
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <label htmlFor="sort-select" className="sr-only">Sort by</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-[#E8E2D7] rounded-full pl-4 pr-9 py-2 text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#B88B4A] cursor-pointer"
            >
              <option value="featured">Sort: Curated Bestsellers</option>
              <option value="newest">Sort: Newest Arrivals</option>
              <option value="price-asc">Sort: Price Low to High</option>
              <option value="price-desc">Sort: Price High to Low</option>
              <option value="rating">Sort: Highest Customer Rating</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#877E73] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <span className="text-xs text-[#877E73]">Applied filters:</span>
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-[#EAE3D5] text-[#1C1917]">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('All')} className="hover:text-[#A83A32] cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedAge !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-[#EAE3D5] text-[#1C1917]">
              Age: {selectedAge}
              <button onClick={() => setSelectedAge('all')} className="hover:text-[#A83A32] cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedPriceTier !== 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-[#EAE3D5] text-[#1C1917]">
              Price: {PRICE_TIERS[selectedPriceTier].label}
              <button onClick={() => setSelectedPriceTier(0)} className="hover:text-[#A83A32] cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {organicOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-[#EBF4EE] text-[#3D6B4F]">
              GOTS Organic
              <button onClick={() => setOrganicOnly(false)} className="hover:text-[#A83A32] cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {onSaleOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-[#F9EFEA] text-[#B66C52]">
              On Sale
              <button onClick={() => setOnSaleOnly(false)} className="hover:text-[#A83A32] cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs text-[#877E73] hover:text-[#1C1917] underline ml-2 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Reset all
          </button>
        </div>
      )}

      {/* Main Content Layout: Desktop Sidebar Filters + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-8 pr-4 border-r border-[#E8E2D7]">
          {/* Age Range Filter */}
          <div>
            <h4 className="font-serif text-sm font-medium text-[#1C1917] uppercase tracking-wider mb-3">
              Age Stage
            </h4>
            <div className="space-y-2">
              {AGE_RANGES.map((age) => (
                <label
                  key={age.value}
                  className="flex items-center text-xs text-[#575149] hover:text-[#1C1917] cursor-pointer"
                >
                  <input
                    type="radio"
                    name="desktopAge"
                    checked={selectedAge === age.value}
                    onChange={() => setSelectedAge(age.value)}
                    className="mr-2 accent-[#1C1917]"
                  />
                  <span>{age.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h4 className="font-serif text-sm font-medium text-[#1C1917] uppercase tracking-wider mb-3">
              Price Range
            </h4>
            <div className="space-y-2">
              {PRICE_TIERS.map((tier, idx) => (
                <label
                  key={tier.label}
                  className="flex items-center text-xs text-[#575149] hover:text-[#1C1917] cursor-pointer"
                >
                  <input
                    type="radio"
                    name="desktopPrice"
                    checked={selectedPriceTier === idx}
                    onChange={() => setSelectedPriceTier(idx)}
                    className="mr-2 accent-[#1C1917]"
                  />
                  <span>{tier.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sustainable Certifications & Offers */}
          <div>
            <h4 className="font-serif text-sm font-medium text-[#1C1917] uppercase tracking-wider mb-3">
              Conscious Features
            </h4>
            <div className="space-y-2.5">
              <label className="flex items-center text-xs text-[#575149] hover:text-[#1C1917] cursor-pointer">
                <input
                  type="checkbox"
                  checked={organicOnly}
                  onChange={(e) => setOrganicOnly(e.target.checked)}
                  className="mr-2 rounded border-[#E8E2D7] accent-[#3D6B4F]"
                />
                <span>100% GOTS Certified Organic</span>
              </label>
              <label className="flex items-center text-xs text-[#575149] hover:text-[#1C1917] cursor-pointer">
                <input
                  type="checkbox"
                  checked={onSaleOnly}
                  onChange={(e) => setOnSaleOnly(e.target.checked)}
                  className="mr-2 rounded border-[#E8E2D7] accent-[#B66C52]"
                />
                <span>Special Offers & Sale Items</span>
              </label>
            </div>
          </div>

          {/* Trust Callout */}
          <div className="p-4 bg-[#F2ECE1] rounded-xl text-xs space-y-1.5 text-[#575149]">
            <strong className="text-[#1C1917] block font-serif">Maison Standard of Care</strong>
            <p className="text-[11px] leading-relaxed">
              Every item is tested for zero lead, zero endocrine disruptors, and ethical European & Nordic workshops.
            </p>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-[#FAF8F5] border border-dashed border-[#E8E2D7] rounded-xl">
              <h3 className="font-serif text-xl text-[#1C1917]">No products matched your criteria</h3>
              <p className="text-xs text-[#877E73] max-w-sm mx-auto">
                Try widening your price range, clearing selected filters, or checking back soon for new arrivals.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="px-6 py-2.5 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase hover:bg-[#B88B4A] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="fixed inset-0 bg-[#1C1917]/50 backdrop-blur-xs"
            onClick={() => setMobileFiltersOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-[#FAF8F5] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D7]">
                  <h3 className="font-serif text-lg text-[#1C1917]">Filter Collection</h3>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1 text-[#877E73] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Filters Content */}
                <div className="py-6 space-y-6">
                  {/* Category */}
                  <div>
                    <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-2.5">
                      Category
                    </h4>
                    <div className="space-y-1.5">
                      {CATEGORIES.map((cat) => (
                        <label key={cat} className="flex items-center text-xs text-[#575149] cursor-pointer">
                          <input
                            type="radio"
                            name="mobCat"
                            checked={selectedCategory === cat}
                            onChange={() => setSelectedCategory(cat)}
                            className="mr-2 accent-[#1C1917]"
                          />
                          <span>{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Age */}
                  <div>
                    <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-2.5">
                      Age Range
                    </h4>
                    <div className="space-y-1.5">
                      {AGE_RANGES.map((age) => (
                        <label key={age.value} className="flex items-center text-xs text-[#575149] cursor-pointer">
                          <input
                            type="radio"
                            name="mobAge"
                            checked={selectedAge === age.value}
                            onChange={() => setSelectedAge(age.value)}
                            className="mr-2 accent-[#1C1917]"
                          />
                          <span>{age.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-2.5">
                      Price
                    </h4>
                    <div className="space-y-1.5">
                      {PRICE_TIERS.map((tier, idx) => (
                        <label key={tier.label} className="flex items-center text-xs text-[#575149] cursor-pointer">
                          <input
                            type="radio"
                            name="mobPrice"
                            checked={selectedPriceTier === idx}
                            onChange={() => setSelectedPriceTier(idx)}
                            className="mr-2 accent-[#1C1917]"
                          />
                          <span>{tier.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="pt-2">
                    <label className="flex items-center text-xs text-[#575149] mb-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={organicOnly}
                        onChange={(e) => setOrganicOnly(e.target.checked)}
                        className="mr-2 accent-[#3D6B4F]"
                      />
                      <span>GOTS Organic Only</span>
                    </label>
                    <label className="flex items-center text-xs text-[#575149] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={onSaleOnly}
                        onChange={(e) => setOnSaleOnly(e.target.checked)}
                        className="mr-2 accent-[#B66C52]"
                      />
                      <span>On Sale Only</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="pt-4 border-t border-[#E8E2D7] flex gap-3">
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="flex-1 py-2 text-xs border border-[#E8E2D7] rounded-full text-[#1C1917] cursor-pointer"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 py-2 text-xs bg-[#1C1917] text-white rounded-full font-medium cursor-pointer"
                >
                  Apply ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
