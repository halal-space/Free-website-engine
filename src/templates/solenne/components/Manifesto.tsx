import React from 'react';
import { MANIFESTO } from '../data/content';

export const Manifesto: React.FC = () => {
  return (
    <section
      className="relative flex min-h-[85dvh] items-center overflow-hidden"
      aria-labelledby="manifesto-title"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={MANIFESTO.image}
          alt={MANIFESTO.imageAlt}
          width={2000}
          height={1200}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-ink/55" aria-hidden="true" />

      <div className="container-luxe relative py-24 text-center text-ivory">
        <p className="eyebrow mb-6 text-champagne">{MANIFESTO.eyebrow}</p>
        <h2
          id="manifesto-title"
          className="mx-auto max-w-4xl font-serif text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.05]"
        >
          Clean beauty,
          <br />
          <span className="italic text-champagne">consciously composed.</span>
        </h2>

        <div className="mx-auto mt-16 grid max-w-4xl gap-x-10 gap-y-10 text-left sm:grid-cols-2">
          {MANIFESTO.points.map((point) => (
            <div key={point.title} className="border-l border-white/20 pl-6">
              <h3 className="font-serif text-xl italic text-white">{point.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/65">
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
