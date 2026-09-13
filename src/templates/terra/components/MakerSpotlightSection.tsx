import React from 'react';
import { makers } from '../data/catalog';
import { useUIStore } from '../stores/uiStore';
import Icon from './Icon';

export default function MakerSpotlightSection() {
  const { setView } = useUIStore();

  return (
    <section id="makers" className="bg-[#F2EFE9] py-14 mt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#3B583E] uppercase">Provenance</p>
        <h2 className="font-display mt-1 text-3xl font-semibold sm:text-4xl">Know your makers</h2>
        <p className="mt-2 max-w-xl text-sm text-[#4A554D]">
          Harvest dates, certifications and sourcing metrics on every label. Lab-tested, no blends, no funny business.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {makers.map((m) => (
            <article key={m.slug} className="overflow-hidden rounded-2xl border border-[#1B241E]/8 bg-[#FBF9F5]">
              <img
                src={m.image}
                alt={`${m.name}, ${m.region}`}
                loading="lazy"
                className="h-44 w-full object-cover"
              />
              <div className="p-5">
                <p className="text-[11px] font-semibold tracking-[0.12em] text-[#6F7A72] uppercase">
                  {m.region} · {m.harvest}
                </p>
                <h3 className="font-display mt-1 text-xl font-semibold">{m.name}</h3>
                <p className="tnum mt-1 text-[13px] text-[#4A554D]">{m.metric}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
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
            </article>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setView('makers')}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#1B241E] px-6 py-3 text-sm font-bold text-[#FBF9F5] transition-colors duration-200 hover:bg-[#3B583E]"
          >
            Meet all 42 makers <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
