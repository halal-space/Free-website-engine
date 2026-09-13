import React from 'react';
import { ABOUT } from '../data/content';
import { Button } from './Button';
import { useUIStore } from '../stores/uiStore';

export const AboutPage: React.FC = () => {
  const { navigateToShop } = useUIStore();

  return (
    <div>
      {/* Hero */}
      <header className="container-luxe grid items-center gap-10 pb-16 pt-14 lg:grid-cols-[1.2fr_1fr] md:pb-24 md:pt-20">
        <div>
          <p className="eyebrow mb-5 flex items-center gap-3 text-gold">
            <span className="h-px w-10 bg-gold/60" />
            Our Story
          </p>
          <h1 className="font-serif text-[clamp(2.8rem,6vw,5rem)] leading-[1.0]">
            {ABOUT.heroTitle}
          </h1>
          <p className="mt-7 max-w-md font-serif text-xl italic leading-relaxed text-clay">
            {ABOUT.intro}
          </p>
        </div>
        <div className="img-skeleton aspect-[4/5] overflow-hidden rounded-tl-[9rem] max-lg:max-w-sm">
          <img
            src={ABOUT.images.portrait}
            alt="Portrait in soft editorial light"
            width={900}
            height={1125}
            className="h-full w-full object-cover"
          />
        </div>
      </header>

      {/* Story */}
      <section className="bg-cream/60 py-20 md:py-28" aria-label="Brand story">
        <div className="container-editorial grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="img-skeleton aspect-[4/3] self-start overflow-hidden rounded-md">
            <img
              src={ABOUT.images.lab}
              alt="Amber glass vessels arranged on laboratory stone"
              width={900}
              height={675}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-6 self-center">
            {ABOUT.story.map((para, i) => (
              <p key={i} className="text-[0.95rem] leading-[1.9] text-smoke">
                {para}
              </p>
            ))}
            <div className="pt-2">
              <Button variant="outline" onClick={() => navigateToShop()}>
                Shop the Collection
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="container-luxe scroll-mt-32 py-20 md:py-28" aria-labelledby="values-title">
        <div className="mb-14 text-center">
          <p className="eyebrow mb-4 text-gold">What We Stand For</p>
          <h2 id="values-title" className="mx-auto max-w-2xl font-serif text-[clamp(2.1rem,4.5vw,3.4rem)] leading-tight">
            Four principles,
            <br />
            <span className="italic text-bronze">never compromised.</span>
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT.values.map((v, i) => (
            <div
              key={v.title}
              className="group bg-bg p-8 transition-colors duration-500 hover:bg-surface md:p-10"
            >
              <p className="font-serif text-lg italic text-gold">0{i + 1}</p>
              <h3 className="mt-4 font-serif text-2xl">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-smoke">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Wide cinematic */}
      <section className="relative flex min-h-[60dvh] items-end overflow-hidden" aria-label="Atelier imagery">
        <img
          src={ABOUT.images.wide}
          alt="A serene dressing table with glass skincare vessels"
          width={2000}
          height={1100}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden="true" />
        <blockquote className="container-luxe relative pb-16">
          <p className="max-w-2xl font-serif text-[clamp(1.7rem,3.6vw,2.8rem)] font-light italic leading-snug text-white">
            “Luxury measured not by markup, but by what goes into the bottle.”
          </p>
        </blockquote>
      </section>
    </div>
  );
};
