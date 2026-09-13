import React from 'react';
import { recipes } from '../data/catalog';
import { useUIStore } from '../stores/uiStore';
import Icon from './Icon';

export default function RecipesPage() {
  const { setView } = useUIStore();

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
        / <span className="font-medium text-[#1B241E]">Recipes</span>
      </nav>

      <p className="text-[11px] font-semibold tracking-[0.14em] text-[#C85A32] uppercase">
        From the test kitchen
      </p>
      <h1 className="font-display mt-1 text-4xl font-semibold sm:text-5xl">Cook it tonight</h1>
      <p className="mt-2 max-w-xl text-[15px] text-[#4A554D]">
        Every recipe is shoppable — add all ingredients to your cart in one click.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {recipes.map((r) => (
          <button
            key={r.slug}
            type="button"
            onClick={() => setView('recipe-detail', r.slug)}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-[#1B241E]/8 bg-white text-left transition-shadow duration-200 hover:shadow-[0_2px_4px_rgba(27,36,30,0.06),0_16px_48px_rgba(27,36,30,0.14)]"
          >
            <div className="relative overflow-hidden">
              <img
                src={r.image}
                alt={r.title}
                loading="lazy"
                className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-[#1B241E]/85 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                <Icon name="Clock" size={12} /> {r.time} · {r.servings}
              </span>
            </div>
            <div className="p-5">
              <h2 className="font-display text-xl leading-tight font-semibold group-hover:text-[#C85A32] transition-colors">
                {r.title}
              </h2>
              <p className="mt-1 text-sm text-[#6F7A72]">{r.blurb}</p>
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}
