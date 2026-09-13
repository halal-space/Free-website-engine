import React, { useState } from 'react';
import { products } from '../data/catalog';
import { useUIStore } from '../stores/uiStore';
import ProductCard from './ProductCard';

export default function SearchPage() {
  const { setView } = useUIStore();
  const [q, setQ] = useState('');

  const query = q.trim().toLowerCase();
  const list = query
    ? products.filter((p) =>
        `${p.name} ${p.category} ${p.origin} ${p.badges.join(' ')}`.toLowerCase().includes(query)
      )
    : [];

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
        / <span className="font-medium text-[#1B241E]">Search</span>
      </nav>

      <h1 className="font-display text-4xl font-semibold">Search the pantry</h1>

      <div className="mt-5 max-w-2xl">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <input
            id="site-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search olive oil, tinned fish, harissa…"
            className="w-full rounded-full border border-[#1B241E]/15 bg-white px-5 py-3 text-[15px] outline-none placeholder:text-[#6F7A72] focus:border-[#3B583E]"
          />
          <button
            type="submit"
            className="shrink-0 cursor-pointer rounded-full bg-[#1B241E] px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#3B583E]"
          >
            Search
          </button>
        </form>

        <p className="tnum mt-4 text-sm text-[#4A554D]" role="status" aria-live="polite">
          {query === ''
            ? 'Type above to search the pantry.'
            : `${list.length} result${list.length === 1 ? '' : 's'} for “${q.trim()}”`}
        </p>

        {query !== '' && list.length === 0 && (
          <div className="mt-6 rounded-2xl border border-[#1B241E]/10 bg-white p-10 text-center">
            <p className="font-display text-2xl font-semibold">Nothing matched that craving.</p>
            <p className="mt-2 text-sm text-[#6F7A72]">Try “oil”, “harissa”, “rice” or “tinned”.</p>
            <button
              type="button"
              onClick={() => setView('shop')}
              className="mt-5 inline-block cursor-pointer rounded-full bg-[#C85A32] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#A84624] transition-colors"
            >
              Browse everything
            </button>
          </div>
        )}
      </div>

      {list.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
