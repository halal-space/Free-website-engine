import React, { useRef } from 'react';
import { products } from '../data/catalog';
import { useUIStore } from '../stores/uiStore';
import ProductCard from './ProductCard';
import Icon from './Icon';

export default function BestSellersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { setView } = useUIStore();

  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  const list = products.slice(0, 8);

  return (
    <section id="bestsellers" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#C85A32] uppercase">Most reordered</p>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Curated best-sellers</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setView('shop')}
            className="mr-1 hidden cursor-pointer text-sm font-semibold underline underline-offset-4 hover:text-[#C85A32] sm:block"
          >
            Shop all
          </button>
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Scroll products left"
            className="cursor-pointer rounded-full border border-[#1B241E]/15 bg-white p-2.5 transition-colors hover:border-[#1B241E]"
          >
            <Icon name="ArrowLeft" size={18} />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Scroll products right"
            className="cursor-pointer rounded-full border border-[#1B241E]/15 bg-white p-2.5 transition-colors hover:border-[#1B241E]"
          >
            <Icon name="ArrowRight" size={18} />
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-4"
      >
        {list.map((p) => (
          <div key={p.id} className="w-[260px] shrink-0 snap-start sm:w-auto">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
