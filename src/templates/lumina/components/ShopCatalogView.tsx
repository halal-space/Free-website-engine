'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '../products';
import { ProductCard } from './ProductCard';
import { useUIStore } from '../stores/uiStore';
import { SlidersHorizontal, Grid3X3, LayoutGrid, RotateCcw, ArrowLeft } from 'lucide-react';

interface ShopCatalogViewProps {
  accentColor?: string;
}

export const ShopCatalogView: React.FC<ShopCatalogViewProps> = ({
  accentColor = '#C5A880'
}) => {
  const { shopInitialCategory, setShopInitialCategory, setActivePageView } = useUIStore();

  const [selectedCategory, setSelectedCategory] = useState<string>(shopInitialCategory || 'all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [onlyNew, setOnlyNew] = useState<boolean>(false);
  const [onlyLimited, setOnlyLimited] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'editorial' | 'price-asc' | 'price-desc' | 'newest'>('editorial');
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4>(3);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    if (shopInitialCategory) {
      setSelectedCategory(shopInitialCategory);
      setShopInitialCategory(null);
    }
  }, [shopInitialCategory, setShopInitialCategory]);

  const categories: { label: string; value: string }[] = [
    { label: 'All Garments', value: 'all' },
    { label: 'Outerwear', value: 'outerwear' },
    { label: 'Architectural Tailoring', value: 'tailoring' },
    { label: 'Dresses & Silk', value: 'dresses' },
    { label: 'Mongolian Knitwear', value: 'knitwear' },
    { label: 'Leather & Objects', value: 'leather-accessories' }
  ];

  const materials = ['all', 'Cashmere', 'Silk', 'Wool', 'Cotton', 'Calfskin', 'Alpaca', 'Brass'];
  const colors = ['all', 'Noir', 'Alabaster', 'Oatmeal', 'Espresso', 'Bronze', 'White', 'Khaki'];
  const sizes = ['all', '34 FR', '36 FR', '38 FR', '40 FR', '42 FR', 'XS / S', 'M / L', 'One Size'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (onlyNew && !p.isNew) return false;
      if (onlyLimited && !p.isLimited) return false;
      if (inStockOnly && !p.sizes.some((s) => s.inStock)) return false;

      if (selectedMaterial !== 'all') {
        const hasMat = (p.composition || '').toLowerCase().includes(selectedMaterial.toLowerCase()) ||
                       (p.subtitle || '').toLowerCase().includes(selectedMaterial.toLowerCase());
        if (!hasMat) return false;
      }

      if (selectedColor !== 'all') {
        const hasCol = p.colors.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()));
        if (!hasCol) return false;
      }

      if (selectedSize !== 'all') {
        const hasSz = p.sizes.some((s) => s.name.includes(selectedSize) && s.inStock);
        if (!hasSz) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // editorial default
    });
  }, [selectedCategory, selectedMaterial, selectedColor, selectedSize, inStockOnly, onlyNew, onlyLimited, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedMaterial('all');
    setSelectedColor('all');
    setSelectedSize('all');
    setInStockOnly(false);
    setOnlyNew(false);
    setOnlyLimited(false);
    setSortBy('editorial');
  };

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedMaterial !== 'all',
    selectedColor !== 'all',
    selectedSize !== 'all',
    inStockOnly,
    onlyNew,
    onlyLimited
  ].filter(Boolean).length;

  return (
    <div className="py-12 sm:py-16 bg-[#FAF8F5] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Back navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setActivePageView('home')}
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#71717A] hover:text-[#0C0C0D] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Maison Home</span>
          </button>
          <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider">
            2026 Archive
          </span>
        </div>

        {/* Page Header */}
        <div className="mb-10 pb-8 border-b border-[#E8E3DA]">
          <span
            className="text-[10px] tracking-ultra-wide uppercase block mb-2 font-medium"
            style={{ color: accentColor }}
          >
            Atelier Permanent & Seasonal Archive
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-light text-[#0C0C0D] tracking-tight">
            The Complete 2026 Collection
          </h1>
          <p className="text-xs sm:text-sm text-[#52525B] mt-2 max-w-2xl font-light leading-relaxed">
            Architectural silhouettes cut from double-faced cashmere, crisp high-twist fresco wool, and 40-momme silk charmeuse. Displayed on bespoke atelier mannequins.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 text-xs tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-[#0C0C0D] text-[#FAF8F5] font-medium'
                  : 'bg-[#F5F2EB] text-[#52525B] hover:text-[#0C0C0D] hover:bg-[#E8E3DA]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Control Bar: Filter Toggle, Sort, Grid Layout, Active Count */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#E8E3DA] mb-10 text-xs">
          {/* Left: Filter Drawer Trigger & Active count */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className={`flex items-center gap-2 px-4 py-2 border transition-all cursor-pointer ${
                isFilterDrawerOpen || activeFiltersCount > 0
                  ? 'border-[#0C0C0D] bg-[#0C0C0D] text-[#FAF8F5]'
                  : 'border-[#D4CDC3] bg-transparent text-[#0C0C0D] hover:border-[#0C0C0D]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="tracking-wider uppercase">
                Filter Archive {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </span>
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-[11px] text-[#71717A] hover:text-[#0C0C0D] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}

            <span className="text-[#71717A] font-mono text-xs hidden sm:inline">
              Showing {filteredProducts.length} Garment{filteredProducts.length === 1 ? '' : 's'}
            </span>
          </div>

          {/* Right: Sort Dropdown & Column Density Switcher */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] tracking-wider uppercase text-[#71717A] hidden sm:inline">
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FAF8F5] border border-[#D4CDC3] px-3 py-1.5 text-xs text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D] cursor-pointer"
              >
                <option value="editorial">Editorial Selection</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

            {/* Grid density toggles */}
            <div className="hidden lg:flex items-center gap-1 border border-[#D4CDC3] p-0.5">
              <button
                onClick={() => setGridColumns(2)}
                className={`p-1.5 transition-colors cursor-pointer ${gridColumns === 2 ? 'bg-[#0C0C0D] text-white' : 'text-[#71717A]'}`}
                title="2 Columns (Editorial Large)"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setGridColumns(3)}
                className={`p-1.5 transition-colors cursor-pointer ${gridColumns === 3 ? 'bg-[#0C0C0D] text-white' : 'text-[#71717A]'}`}
                title="3 Columns"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setGridColumns(4)}
                className={`p-1.5 transition-colors cursor-pointer ${gridColumns === 4 ? 'bg-[#0C0C0D] text-white' : 'text-[#71717A]'}`}
                title="4 Columns Compact"
              >
                <span className="text-[10px] font-mono font-bold px-0.5">4</span>
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Filter Panel */}
        {isFilterDrawerOpen && (
          <div className="p-6 bg-[#F5F2EB] border border-[#E8E3DA] mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in text-xs">
            {/* Material Filter */}
            <div>
              <span className="text-[10px] tracking-ultra-wide uppercase text-[#71717A] block mb-2 font-medium">
                Textile & Fiber
              </span>
              <div className="flex flex-wrap gap-1.5">
                {materials.map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`px-2.5 py-1 text-[11px] border transition-colors cursor-pointer ${
                      selectedMaterial === mat
                        ? 'border-[#0C0C0D] bg-[#0C0C0D] text-white'
                        : 'border-[#D4CDC3] bg-white text-[#52525B] hover:border-[#0C0C0D]'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <span className="text-[10px] tracking-ultra-wide uppercase text-[#71717A] block mb-2 font-medium">
                Color Shade
              </span>
              <div className="flex flex-wrap gap-1.5">
                {colors.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-2.5 py-1 text-[11px] border transition-colors cursor-pointer ${
                      selectedColor === col
                        ? 'border-[#0C0C0D] bg-[#0C0C0D] text-white'
                        : 'border-[#D4CDC3] bg-white text-[#52525B] hover:border-[#0C0C0D]'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing */}
            <div>
              <span className="text-[10px] tracking-ultra-wide uppercase text-[#71717A] block mb-2 font-medium">
                Atelier Size
              </span>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-2.5 py-1 text-[11px] font-mono border transition-colors cursor-pointer ${
                      selectedSize === sz
                        ? 'border-[#0C0C0D] bg-[#0C0C0D] text-white'
                        : 'border-[#D4CDC3] bg-white text-[#52525B] hover:border-[#0C0C0D]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability & Toggles */}
            <div>
              <span className="text-[10px] tracking-ultra-wide uppercase text-[#71717A] block mb-2 font-medium">
                Edition Availability
              </span>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-[#0C0C0D] w-3.5 h-3.5 cursor-pointer"
                  />
                  <span>In Stock Pieces Only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyNew}
                    onChange={(e) => setOnlyNew(e.target.checked)}
                    className="accent-[#0C0C0D] w-3.5 h-3.5 cursor-pointer"
                  />
                  <span>New 2026 Releases</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyLimited}
                    onChange={(e) => setOnlyLimited(e.target.checked)}
                    className="accent-[#0C0C0D] w-3.5 h-3.5 cursor-pointer"
                  />
                  <span>Numbered Limited Editions</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 border border-[#E8E3DA] bg-[#F5F2EB]">
            <p className="font-serif text-xl text-[#0C0C0D]">No pieces match your selected criteria.</p>
            <p className="text-xs text-[#71717A] mt-2 mb-6">
              Try adjusting your color, material, or size filters.
            </p>
            <button
              onClick={resetFilters}
              className="bg-[#0C0C0D] text-[#FAF8F5] px-6 py-3 text-xs tracking-ultra-wide uppercase hover:bg-[#2A2A2E] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-8 ${
              gridColumns === 2
                ? 'grid-cols-1 sm:grid-cols-2'
                : gridColumns === 4
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} accentColor={accentColor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
