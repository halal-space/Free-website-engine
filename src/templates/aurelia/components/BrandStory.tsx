import React from 'react';
import { u } from '../data';
import { buttonClasses } from './ui/Button';

export function BrandStory() {
  const storyImg = u('photo-1523275335684-37898b6baf30', { w: 1400, h: 1100, q: 85 });
  const secondary = u('photo-1517336714731-489689fd1ca8', { w: 900, h: 1100, q: 85 });

  return (
    <section id="story" className="border-t border-line py-20 lg:py-28">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <div className="overflow-hidden rounded-panel bg-surface-2">
            <img
              src={storyImg}
              alt="AURELIA craftsmanship"
              width={1400}
              height={1100}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 hidden w-56 overflow-hidden rounded-panel border-4 border-bg bg-surface shadow-lift sm:block">
            <img
              src={secondary}
              alt="Precision engineering"
              width={900}
              height={1100}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>

        <div className="lg:pl-4">
          <p className="label-caps mb-3 flex items-center gap-2.5">
            <span className="h-px w-8 bg-accent" />
            Our Story
          </p>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
            Designed for the next generation.
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-muted">
            <p>
              AURELIA was founded on a simple dissatisfaction: that flagship technology kept
              choosing performance over taste. We set out to build a studio where engineering,
              design, and craftsmanship answer to the same standard.
            </p>
            <p>
              Every product begins with materials and ends with obsession. A forged titanium
              frame, a sapphire lens, a driver tuned in silence for three years. Nothing ships
              until it feels inevitable.
            </p>
          </div>
          <div className="mt-8 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-8">
            <div>
              <p className="font-display text-3xl font-bold text-ink tabular">12M+</p>
              <p className="mt-1 text-xs text-ink-muted">Devices in the wild</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-ink tabular">200+</p>
              <p className="mt-1 text-xs text-ink-muted">Design awards</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-ink tabular">5yr</p>
              <p className="mt-1 text-xs text-ink-muted">Software commitment</p>
            </div>
          </div>
          <div className="mt-9">
            <a href="#featured" className={buttonClasses({ variant: 'secondary', size: 'lg' })}>
              Discover the Brand
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
