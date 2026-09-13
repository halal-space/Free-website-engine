import React, { useMemo, useState } from 'react';
import { products, categories } from '../data/catalog';
import { useUIStore } from '../stores/uiStore';
import ProductCard from './ProductCard';
import Icon from './Icon';

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
] as const;

type SortId = (typeof SORTS)[number]['id'];

const DIETS = Array.from(new Set(products.flatMap((p) => p.badges))).sort();

interface ShopCatalogPageProps {
  initialCategory?: string | null;
}

export default function ShopCatalogPage({ initialCategory }: ShopCatalogPageProps) {
  const { setView } = useUIStore();
  const [diet, setDiet] = useState('All');
  const [sort, setSort] = useState<SortId>('featured');

  const activeCategoryObj = useMemo(
    () => (initialCategory ? categories.find((c) => c.slug === initialCategory) : null),
    [initialCategory]
  );

  const list = useMemo(() => {
    let out = products.filter((p) => !initialCategory || p.category === initialCategory);
    if (diet !== 'All') out = out.filter((p) => p.badges.includes(diet));
    switch (sort) {
      case 'price-asc':
        out = [...out].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        out = [...out].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        out = [...out].sort((a, b) => b.rating - a.rating);
        break;
    }
    return out;
  }, [diet, sort, initialCategory]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-[#6F7A72]">
        <button
          type="button"
          onClick={() => setView('home')}
          className="hover:text-[#1B241E] cursor-pointer"
        >
          Home
        </button>{' '}
        /{' '}
        {activeCategoryObj ? (
          <>
            <button
              type="button"
              onClick={() => setView('shop')}
              className="hover:text-[#1B241E] cursor-pointer"
            >
              Shop All
            </button>{' '}
            / <span className="font-medium text-[#1B241E]">{activeCategoryObj.name}</span>
          </>
        ) : (
          <span className="font-medium text-[#1B241E]">Shop All</span>
        )}
      </nav>

      <h1 className="font-display text-4xl font-semibold sm:text-5xl">
        {activeCategoryObj ? activeCategoryObj.name : 'Shop the pantry'}
      </h1>
      <p className="mt-2 max-w-xl text-[15px] text-[#4A554D]">
        {activeCategoryObj
          ? activeCategoryObj.blurb
          : 'Every jar lists its harvest, maker and batch. Filter by diet, sort your way.'}
      </p>

      {/* Category Pills */}
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar" aria-label="Categories">
        <button
          type="button"
          onClick={() => setView('shop')}
          aria-current={!initialCategory ? 'page' : undefined}
          className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-[13px] font-bold transition-colors ${
            !initialCategory
              ? 'bg-[#1B241E] text-white'
              : 'border border-[#1B241E]/15 bg-white text-[#1B241E] hover:border-[#1B241E]/40'
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setView('category', c.slug)}
            aria-current={initialCategory === c.slug ? 'page' : undefined}
            className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-[13px] font-semibold whitespace-nowrap transition-colors duration-200 ${
              initialCategory === c.slug
                ? 'bg-[#1B241E] text-white font-bold'
                : 'border border-[#1B241E]/15 bg-white text-[#1B241E] hover:border-[#1B241E]/40'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Controls: Count & Sort */}
      <div className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="tnum text-sm text-[#4A554D]" role="status" aria-live="polite">
            {list.length} product{list.length === 1 ? '' : 's'}
          </p>
          <label className="inline-flex items-center gap-2 text-sm font-medium">
            <Icon name="SlidersHorizontal" size={15} />
            <span className="sr-only">Sort products</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
              className="cursor-pointer rounded-full border border-[#1B241E]/15 bg-white px-4 py-2 text-sm font-semibold outline-none focus:border-[#3B583E]"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Dietary Filters */}
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by dietary preference">
          {['All', ...DIETS].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDiet(d)}
              aria-pressed={diet === d}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors duration-200 ${
                diet === d
                  ? 'bg-[#1B241E] text-[#FBF9F5]'
                  : 'border border-[#1B241E]/15 bg-white hover:border-[#1B241E]/40'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {list.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-[#1B241E]/10 bg-white p-10 text-center">
            <p className="font-display text-2xl font-semibold">Nothing in this crate yet.</p>
            <p className="mt-2 text-sm text-[#6F7A72]">
              No products match “{diet}” here. Try clearing the filter.
            </p>
            <button
              type="button"
              onClick={() => setDiet('All')}
              className="mt-5 cursor-pointer rounded-full bg-[#C85A32] px-6 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#A84624]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
