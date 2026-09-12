import React from 'react';
import { ArrowRight } from 'lucide-react';
import { u } from '../data';
import { buttonClasses } from './ui/Button';

export function PromoBanner() {
  const bg = u('photo-1606220588913-b3aacb4d2f46', { w: 1600, h: 700, q: 75 });

  return (
    <section className="container-site py-20 lg:py-24">
      <div className="relative overflow-hidden rounded-panel bg-obsidian">
        <img
          src={bg}
          alt=""
          aria-hidden="true"
          width={1600}
          height={700}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian/40" />
        <div className="light-sweep" aria-hidden="true" />

        <div className="relative z-10 px-6 py-16 text-center sm:px-16 sm:py-24">
          <p className="label-caps mb-4 !text-white/60">Limited Edition</p>
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
            The next generation has arrived.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
            Discover the collection we've spent the year perfecting — titanium, sapphire, and
            silence, in the same room as you.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#new-arrivals" className={buttonClasses({ size: 'xl' })}>
              Shop New Arrivals
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
