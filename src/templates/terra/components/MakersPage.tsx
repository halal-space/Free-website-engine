import React from 'react';
import { makers } from '../data/catalog';
import { useUIStore } from '../stores/uiStore';
import Icon from './Icon';

export default function MakersPage() {
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
        / <span className="font-medium text-[#1B241E]">Makers</span>
      </nav>

      <p className="text-[11px] font-semibold tracking-[0.14em] text-[#3B583E] uppercase">Provenance</p>
      <h1 className="font-display mt-1 text-4xl font-semibold sm:text-5xl">42 families, zero mysteries</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#4A554D]">
        Every product names its maker, harvest and batch. We pay above-market prices on
        multi-year contracts, publish lab tests, and visit every farm at least once a year.
      </p>

      <div className="mt-8 space-y-5">
        {makers.map((m, i) => (
          <article
            key={m.slug}
            className="overflow-hidden rounded-[20px] border border-[#1B241E]/8 bg-white"
          >
            <div className="grid md:grid-cols-2">
              <img
                src={m.image}
                alt={`${m.name}, ${m.region}`}
                loading="lazy"
                className={`h-60 w-full object-cover md:h-full ${i % 2 === 1 ? 'md:order-2' : ''}`}
              />
              <div className="p-6 sm:p-8">
                <p className="text-[11px] font-semibold tracking-[0.12em] text-[#6F7A72] uppercase">
                  {m.region} · Harvest {m.harvest}
                </p>
                <h2 className="font-display mt-1 text-2xl font-semibold sm:text-3xl">{m.name}</h2>
                <p className="tnum mt-1 text-sm font-semibold text-[#3B583E]">{m.metric}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-[#4A554D]">{m.story}</p>
                <ul className="mt-4 space-y-2">
                  {m.practices.map((pr) => (
                    <li key={pr} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 shrink-0 text-[#3B583E]">
                        <Icon name="Check" size={16} />
                      </span>{' '}
                      {pr}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {m.certs.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1 rounded-full bg-[#3B583E]/10 px-2.5 py-1 text-[11px] font-semibold text-[#3B583E]"
                    >
                      <Icon name="Check" size={12} /> {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-[20px] bg-[#1B241E] p-8 text-center text-[#FBF9F5]">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          Taste what transparency feels like
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm opacity-75">
          Every maker above has products in the shop right now, with batch numbers on the label.
        </p>
        <button
          type="button"
          onClick={() => setView('shop')}
          className="mt-5 inline-block cursor-pointer rounded-full bg-[#C85A32] px-7 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#A84624]"
        >
          Shop the pantry
        </button>
      </div>
    </main>
  );
}
