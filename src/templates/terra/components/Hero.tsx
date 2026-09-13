import React from 'react';
import { useUIStore } from '../stores/uiStore';
import Icon from './Icon';

export default function Hero() {
  const { setView } = useUIStore();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 pt-10 pb-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:pt-16 lg:pb-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#1B241E]/10 bg-white px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase">
            <span className="h-2 w-2 rounded-full bg-[#3B583E]" />
            Regenerative · Smallholder · Harvest 2026
          </p>
          <h1 className="font-display mt-5 text-[clamp(2.8rem,7vw,5.2rem)] leading-[0.95] font-semibold">
            Elevated everyday staples from regenerative smallholders.
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#4A554D]">
            Single-estate oils, line-caught tins, stone-milled grains. Transparent sourcing, harvest dates on every jar, carbon-neutral chill delivery.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('bestsellers');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setView('shop');
              }}
              className="cursor-pointer rounded-full bg-[#1B241E] px-7 py-3.5 text-sm font-bold text-[#FBF9F5] transition-colors duration-200 hover:bg-[#3B583E]"
            >
              Explore the Pantry
            </button>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('bundle');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setView('box');
              }}
              className="cursor-pointer rounded-full border border-[#1B241E]/20 bg-white px-7 py-3.5 text-sm font-bold transition-colors duration-200 hover:border-[#C85A32] hover:text-[#C85A32]"
            >
              Build a Starter Box
            </button>
          </div>
          <dl className="mt-8 flex gap-8">
            <div>
              <dt className="sr-only">Makers</dt>
              <dd className="font-display text-2xl font-semibold">42</dd>
              <dd className="text-xs text-[#6F7A72]">family makers</dd>
            </div>
            <div>
              <dt className="sr-only">Rating</dt>
              <dd className="font-display text-2xl font-semibold">4.9 ★</dd>
              <dd className="text-xs text-[#6F7A72]">12k reviews</dd>
            </div>
            <div>
              <dt className="sr-only">Press time</dt>
              <dd className="font-display text-2xl font-semibold">6 hr</dd>
              <dd className="text-xs text-[#6F7A72]">grove to press</dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <div className="grain relative overflow-hidden rounded-[24px] shadow-[0_16px_48px_rgba(27,36,30,0.18)]">
            <div className="img-shell absolute inset-0 pointer-events-none" aria-hidden="true" />
            <img
              src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=1200&auto=format&fit=crop"
              alt="Kitchen prep with olive oil, vegetables and pantry staples in warm light"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/5]"
              loading="eager"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-[#FBF9F5]/90 px-4 py-3 backdrop-blur">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6F7A72]">
                  This week's press
                </p>
                <p className="text-sm font-bold">Koroneiki · Batch No. 04 · 18 jars left</p>
              </div>
              <button
                type="button"
                onClick={() => setView('product', 'single-estate-koroneiki-olive-oil')}
                className="cursor-pointer rounded-full bg-[#C85A32] px-4 py-2 text-[13px] font-bold text-white hover:bg-[#A84624]"
              >
                Shop
              </button>
            </div>
          </div>
          <div className="absolute -top-3 -right-2 inline-flex rotate-6 items-center gap-1 rounded-full bg-[#F3D27A] px-4 py-2 text-[12px] font-bold shadow-lg">
            <Icon name="Star" size={14} /> Cold-Pressed
          </div>
        </div>
      </div>
    </section>
  );
}
