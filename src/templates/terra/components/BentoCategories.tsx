import React from 'react';
import { useUIStore } from '../stores/uiStore';
import { categories } from '../data/catalog';
import Icon from './Icon';

export default function BentoCategories() {
  const { setView } = useUIStore();

  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#C85A32] uppercase">The pantry</p>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Shop by craving</h2>
        </div>
        <button
          type="button"
          onClick={() => setView('shop')}
          className="hidden cursor-pointer items-center gap-1 text-sm font-semibold underline underline-offset-4 hover:text-[#C85A32] sm:inline-flex"
        >
          View all <Icon name="ArrowRight" size={15} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-6 lg:grid-rows-2">
        {categories.map((c, i) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setView('category', c.slug)}
            className={`group relative cursor-pointer overflow-hidden rounded-[12px] bg-[#F2EFE9] text-left ${
              i === 0 ? 'col-span-2 row-span-2 min-h-[320px] lg:min-h-[420px]' : 'min-h-[180px]'
            } ${i === 3 ? 'lg:col-span-2' : ''}`}
          >
            <img
              src={c.image}
              alt={c.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-[#1B241E]/70 via-[#1B241E]/10 to-transparent pointer-events-none" />
            <span className="absolute top-3 left-3 rounded-full bg-[#FBF9F5]/90 px-3 py-1 text-[11px] font-bold backdrop-blur transition-colors duration-200 group-hover:bg-[#C85A32] group-hover:text-white">
              {c.badge}
            </span>
            <span className="absolute bottom-3 left-3 right-3">
              <span className="font-display block text-lg leading-tight font-semibold text-white sm:text-xl">
                {c.name}
              </span>
              <span className="block text-xs text-white/80">{c.blurb}</span>
            </span>
          </button>
        ))}
        <button
          type="button"
          onClick={() => setView('box')}
          className="flex min-h-[180px] cursor-pointer flex-col justify-between rounded-[12px] bg-[#1B241E] p-5 text-[#FBF9F5] text-left transition-colors duration-200 hover:bg-[#3B583E]"
        >
          <span className="text-[11px] font-semibold tracking-[0.14em] uppercase opacity-70">Save 15%</span>
          <span className="font-display inline-flex items-center gap-2 text-2xl leading-tight font-semibold">
            Build your Pantry Box <Icon name="ArrowRight" size={22} />
          </span>
          <span className="text-xs opacity-70">4, 6 or 8 picks in a wooden crate</span>
        </button>
      </div>
    </section>
  );
}
