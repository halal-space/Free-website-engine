import React from 'react';
import { INGREDIENTS } from '../data/content';
import { SectionHeading } from './SectionHeading';

const img = (id: string) => `https://images.unsplash.com/photo-${id}?q=80&w=400&auto=format&fit=crop`;

const thumbs: Record<string, string> = {
  'Hyaluronic Acid': img('1631729371254-42c2892f0e6e'),
  Niacinamide: img('1601049676869-702ea24cfd58'),
  'Vitamin C': img('1505944270255-72b8c68c6a70'),
  Retinol: img('1631730359585-38a4935cbec4'),
  Peptides: img('1611930022073-b7a4ba5fcccd'),
  'Botanical Extracts': img('1617897903246-719242758050'),
};

export const Ingredients: React.FC = () => {
  return (
    <section className="container-editorial py-20 md:py-32" aria-labelledby="ingredients-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
        {/* Sticky intro */}
        <div className="lg:sticky lg:top-36 lg:self-start">
          <SectionHeading
            id="ingredients-title"
            eyebrow="Ingredient Philosophy"
            title="Nothing accidental enters a bottle."
            center
          />
          <p className="-mt-6 text-center text-[0.92rem] leading-relaxed text-smoke">
            Every formula is built around molecules with published evidence — sourced at origin, dosed meaningfully, and listed honestly.
          </p>
        </div>

        {/* Editorial ingredient index */}
        <ol className="border-t border-line">
          {INGREDIENTS.map((ing, i) => (
            <li key={ing.name} className="group hairline-b">
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-5 py-7 transition-colors duration-500 sm:gap-x-8 md:py-9">
                <span className="w-16 font-serif text-lg italic text-stone transition-colors duration-500 group-hover:text-gold sm:w-24">
                  0{i + 1}
                </span>
                <span>
                  <span className="flex items-center gap-4">
                    <img
                      src={thumbs[ing.name] || thumbs['Hyaluronic Acid']}
                      alt=""
                      width="88"
                      height="88"
                      loading="lazy"
                      decoding="async"
                      className="hidden h-14 w-14 rounded-full object-cover ring-1 ring-line transition-all duration-700 ease-lux group-hover:scale-110 group-hover:ring-gold/50 lg:block xl:h-16 xl:w-16"
                    />
                    <h3 className="font-serif text-2xl leading-tight transition-transform duration-500 ease-lux group-hover:translate-x-1.5 sm:text-3xl md:text-4xl">
                      {ing.name}
                    </h3>
                  </span>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-smoke">
                    {ing.text}
                  </p>
                </span>
                <span className="text-right">
                  <span className="eyebrow block text-stone">{ing.role}</span>
                  <span className="mt-2 hidden text-xs italic text-clay sm:block">
                    {ing.origin}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
