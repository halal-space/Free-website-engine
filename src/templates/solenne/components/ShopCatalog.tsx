import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { useUIStore } from '../stores/uiStore';
import { Category, Product } from '../types';

export const ShopCatalog: React.FC = () => {
  const { selectedCategorySlug, selectedSort } = useUIStore();

  const [categories, setCategories] = useState<Category[]>([]);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [skinTypes, setSkinTypes] = useState<string[]>([]);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [sort, setSort] = useState<string>(selectedSort || 'featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (selectedCategorySlug) {
      setCategories([selectedCategorySlug as Category]);
    } else {
      setCategories([]);
    }
  }, [selectedCategorySlug]);

  useEffect(() => {
    if (selectedSort) {
      setSort(selectedSort);
    }
  }, [selectedSort]);

  const allSkinTypes = ['Dry', 'Oily', 'Combination', 'Normal', 'Sensitive', 'Mature'];
  const allConcerns = useMemo(() => Array.from(new Set(PRODUCTS.map((p) => p.concern))), []);

  const handleCategoryToggle = (id: Category) => {
    setCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSkinTypeToggle = (skin: string) => {
    setSkinTypes((prev) =>
      prev.includes(skin) ? prev.filter((s) => s !== skin) : [...prev, skin]
    );
  };

  const handleConcernToggle = (concern: string) => {
    setConcerns((prev) =>
      prev.includes(concern) ? prev.filter((c) => c !== concern) : [...prev, concern]
    );
  };

  const clearAllFilters = () => {
    setCategories([]);
    setPriceRange(null);
    setSkinTypes([]);
    setConcerns([]);
    setSort('featured');
  };

  const hasActiveFilters =
    categories.length > 0 ||
    priceRange !== null ||
    skinTypes.length > 0 ||
    concerns.length > 0;

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (categories.length > 0 && !categories.includes(p.category)) {
        return false;
      }
      if (priceRange === 'under-60' && p.price >= 60) return false;
      if (priceRange === '60-90' && (p.price < 60 || p.price > 90)) return false;
      if (priceRange === 'over-90' && p.price <= 90) return false;
      if (
        skinTypes.length > 0 &&
        !skinTypes.some((st) => p.skinTypes.includes(st))
      ) {
        return false;
      }
      if (concerns.length > 0 && !concerns.includes(p.concern)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      switch (sort) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0);
        default:
          return 0;
      }
    });
  }, [categories, priceRange, skinTypes, concerns, sort]);

  return (
    <div className="pb-24">
      {/* Page head */}
      <header className="container-luxe pb-10 pt-14 text-center md:pb-14 md:pt-20">
        <p className="eyebrow mb-4 text-gold">The Collection</p>
        <h1 className="font-serif text-[clamp(2.6rem,6vw,4.5rem)] leading-none">
          Shop All
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-smoke">
          Twelve formulas. Nothing superfluous. Every product designed to earn its place on your shelf.
        </p>
      </header>

      {/* Toolbar */}
      <div className="sticky top-[4.5rem] z-30 border-y border-line bg-bg/92 backdrop-blur-xl">
        <div className="container-luxe flex items-center justify-between gap-4 py-4">
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2.5 eyebrow text-ink transition-colors hover:text-gold lg:pointer-events-none cursor-pointer"
            aria-expanded={isMobileFilterOpen}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M4 7h16M7 12h10m-8 5h6" />
            </svg>
            Filter
          </button>

          <p className="hidden text-xs tracking-wide text-stone sm:block">
            <span>{filteredProducts.length}</span> products
          </p>

          <label className="relative flex items-center gap-3 cursor-pointer">
            <span className="eyebrow text-stone">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="cursor-pointer appearance-none bg-transparent pr-6 eyebrow text-ink focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price · Low to High</option>
              <option value="price-desc">Price · High to Low</option>
              <option value="newest">Newest</option>
            </select>
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="pointer-events-none absolute right-0 text-stone"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </label>
        </div>
      </div>

      <div className="container-luxe grid gap-10 py-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
        {/* Filters Sidebar / Drawer */}
        {isMobileFilterOpen && (
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 z-[65] bg-ink/45 backdrop-blur-[2px] lg:hidden"
          />
        )}
        <aside
          className={`max-lg:fixed max-lg:inset-x-0 max-lg:bottom-0 max-lg:z-[70] max-lg:max-h-[82dvh] max-lg:overflow-y-auto max-lg:rounded-t-xl max-lg:bg-bg max-lg:p-7 max-lg:shadow-lifted max-lg:transition-transform max-lg:duration-500 max-lg:ease-lux ${
            isMobileFilterOpen ? 'max-lg:translate-y-0' : 'max-lg:translate-y-full'
          }`}
        >
          <div className="max-lg:mb-5 max-lg:flex max-lg:items-center max-lg:justify-between">
            <h2 className="font-serif text-xl lg:hidden">Filters</h2>
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(false)}
              className="p-1 text-stone hover:text-ink lg:hidden cursor-pointer"
              aria-label="Close filters"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="mb-8 w-full items-center justify-center gap-2 rounded-full border border-line-strong px-4 py-2.5 eyebrow text-clay transition-all hover:border-ink hover:text-ink flex cursor-pointer"
            >
              Clear all
            </button>
          )}

          {/* Category */}
          <fieldset className="border-t border-line py-6">
            <legend className="eyebrow mb-4 text-clay">Category</legend>
            <ul className="space-y-3">
              {CATEGORIES.map((c) => {
                const checked = categories.includes(c.id);
                return (
                  <li key={c.id}>
                    <label className="group flex cursor-pointer items-center gap-3 text-sm text-smoke transition-colors hover:text-ink">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleCategoryToggle(c.id)}
                        className="peer sr-only"
                      />
                      <span
                        className={`grid h-4 w-4 shrink-0 place-items-center rounded-[3px] border transition-all ${
                          checked
                            ? 'border-ink bg-ink text-ivory'
                            : 'border-line-strong'
                        }`}
                      >
                        {checked && (
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--color-ivory, #faf7f2)"
                            strokeWidth="3"
                          >
                            <path d="m4 12.5 5 5L20 6.5" />
                          </svg>
                        )}
                      </span>
                      {c.label}
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>

          {/* Price */}
          <fieldset className="border-t border-line py-6">
            <legend className="eyebrow mb-4 text-clay">Price</legend>
            <ul className="space-y-3">
              {[
                ['under-60', 'Under $60'],
                ['60-90', '$60 – $90'],
                ['over-90', 'Over $90'],
              ].map(([v, label]) => {
                const checked = priceRange === v;
                return (
                  <li key={v}>
                    <label className="group flex cursor-pointer items-center gap-3 text-sm text-smoke transition-colors hover:text-ink">
                      <input
                        type="radio"
                        name="price"
                        checked={checked}
                        onChange={() => setPriceRange(checked ? null : v)}
                        onClick={() => {
                          if (checked) setPriceRange(null);
                        }}
                        className="peer sr-only"
                      />
                      <span
                        className={`h-4 w-4 shrink-0 rounded-full border transition-all ${
                          checked
                            ? 'border-[5px] border-gold'
                            : 'border-line-strong'
                        }`}
                      />
                      {label}
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>

          {/* Skin Type */}
          <fieldset className="border-t border-line py-6">
            <legend className="eyebrow mb-4 text-clay">Skin Type</legend>
            <ul className="space-y-3">
              {allSkinTypes.map((s) => {
                const checked = skinTypes.includes(s);
                return (
                  <li key={s}>
                    <label className="group flex cursor-pointer items-center gap-3 text-sm text-smoke transition-colors hover:text-ink">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleSkinTypeToggle(s)}
                        className="peer sr-only"
                      />
                      <span
                        className={`grid h-4 w-4 shrink-0 place-items-center rounded-[3px] border transition-all ${
                          checked
                            ? 'border-ink bg-ink text-ivory'
                            : 'border-line-strong'
                        }`}
                      >
                        {checked && (
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--color-ivory, #faf7f2)"
                            strokeWidth="3"
                          >
                            <path d="m4 12.5 5 5L20 6.5" />
                          </svg>
                        )}
                      </span>
                      {s}
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>

          {/* Concern */}
          <fieldset className="border-y border-line py-6">
            <legend className="eyebrow mb-4 text-clay">Concern</legend>
            <ul className="space-y-3">
              {allConcerns.map((c) => {
                const checked = concerns.includes(c);
                return (
                  <li key={c}>
                    <label className="group flex cursor-pointer items-center gap-3 text-sm text-smoke transition-colors hover:text-ink">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleConcernToggle(c)}
                        className="peer sr-only"
                      />
                      <span
                        className={`grid h-4 w-4 shrink-0 place-items-center rounded-[3px] border transition-all ${
                          checked
                            ? 'border-ink bg-ink text-ivory'
                            : 'border-line-strong'
                        }`}
                      >
                        {checked && (
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--color-ivory, #faf7f2)"
                            strokeWidth="3"
                          >
                            <path d="m4 12.5 5 5L20 6.5" />
                          </svg>
                        )}
                      </span>
                      {c}
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>

          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(false)}
            className="mt-6 w-full rounded-full bg-ink py-3.5 eyebrow text-ivory transition-colors hover:bg-champagne hover:text-ink lg:hidden cursor-pointer"
          >
            Show Results ({filteredProducts.length})
          </button>
        </aside>

        {/* Products Grid */}
        <div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 xl:grid-cols-3">
              {filteredProducts.map((p, i) => (
                <div key={p.slug}>
                  <ProductCard product={p} eager={i < 3} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="font-serif text-3xl italic text-espresso">No matches found.</p>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-smoke">
                Adjust your filters, or explore the full collection.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="mt-8 rounded-full border border-line-strong px-7 py-3 eyebrow text-ink transition-all duration-300 hover:bg-ink hover:text-ivory cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
