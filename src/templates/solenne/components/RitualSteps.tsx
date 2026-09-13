import React, { useState } from 'react';
import { RITUAL } from '../data/content';
import { getProduct, formatPrice } from '../data/products';
import { SectionHeading } from './SectionHeading';
import { useUIStore } from '../stores/uiStore';

export const RitualSteps: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { navigateToProduct } = useUIStore();

  const steps = RITUAL.map((r) => ({
    ...r,
    product: getProduct(r.productSlug),
  }));

  return (
    <section
      id="ritual"
      className="overflow-hidden bg-cream/60 py-20 md:py-32"
      aria-labelledby="ritual-title"
    >
      <div className="container-luxe">
        <SectionHeading
          id="ritual-title"
          eyebrow="The Ritual"
          title="Four steps. Five minutes. Transformed skin."
          center
        />

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, i) => {
            const isActive = activeStep === i;
            return (
              <button
                key={step.step}
                type="button"
                onClick={() => setActiveStep(isActive ? -1 : i)}
                className={`group relative overflow-hidden rounded-md text-left focus-visible:outline-gold aspect-[4/5] w-full cursor-pointer ${
                  isActive ? 'is-active' : ''
                }`}
                aria-pressed={isActive}
              >
                <div className="img-skeleton absolute inset-0">
                  <img
                    src={step.image}
                    alt={`${step.name} — ${step.title}`}
                    width={700}
                    height={875}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-all duration-[1.2s] ease-lux group-hover:scale-[1.05]"
                  />
                </div>
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-90 transition-opacity duration-500"
                  aria-hidden="true"
                />

                <span className="absolute left-5 top-5 font-serif text-lg italic text-white/85">
                  {step.step}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6 text-white transition-transform duration-500 ease-lux">
                  <p className="eyebrow mb-1.5 text-champagne">{step.name}</p>
                  <h3 className="font-serif text-2xl leading-snug">{step.title}</h3>
                  <div
                    className={`transition-all duration-500 ease-lux overflow-hidden ${
                      isActive ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-xs leading-relaxed text-white/75">{step.text}</p>
                  </div>
                  {step.product && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToProduct(step.product!.slug);
                      }}
                      className="mt-3 flex items-center gap-2 text-xs tracking-wide text-white/85 hover:text-champagne transition-colors"
                    >
                      <img
                        src={step.product.images[0]}
                        alt=""
                        width={28}
                        height={28}
                        loading="lazy"
                        decoding="async"
                        className="h-7 w-7 rounded-full object-cover ring-1 ring-white/40"
                      />
                      <span>
                        {step.product.name} · from {formatPrice(step.product.price)}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-md text-center text-sm leading-relaxed text-smoke">
          Tap a step to explore. Each ritual is designed to layer — actives first, comfort last.
        </p>
      </div>
    </section>
  );
};
