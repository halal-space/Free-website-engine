import React from 'react';
import { EDITORIAL } from '../data/content';

interface EditorialBrandProps {
  storyHeadline?: string;
  storyDescription?: string;
}

export const EditorialBrand: React.FC<EditorialBrandProps> = ({
  storyHeadline,
  storyDescription,
}) => {
  const paragraphs = storyDescription
    ? [storyDescription, EDITORIAL.paragraphs[1]]
    : EDITORIAL.paragraphs;

  return (
    <section className="container-luxe overflow-hidden py-20 md:py-32" aria-labelledby="editorial-title">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        {/* Asymmetric image stack */}
        <div className="relative order-2 lg:order-1">
          <div className="img-skeleton aspect-[4/5] w-full rounded-tl-[8rem] overflow-hidden">
            <img
              src={EDITORIAL.imageMain}
              alt={EDITORIAL.imageMainAlt}
              width={1000}
              height={1250}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-2 w-44 sm:w-56 lg:-right-14">
            <div className="img-skeleton aspect-[4/5] rotate-3 overflow-hidden border-[6px] border-bg shadow-lifted">
              <img
                src={EDITORIAL.imageSecondary}
                alt={EDITORIAL.imageSecondaryAlt}
                width={500}
                height={625}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="order-1 max-w-lg lg:order-2">
          <p className="eyebrow mb-5 flex items-center gap-3 text-gold">
            <span className="h-px w-10 bg-gold/60" />
            {EDITORIAL.eyebrow}
          </p>
          <h2
            id="editorial-title"
            className="font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02]"
          >
            {storyHeadline ? (
              <span>{storyHeadline}</span>
            ) : (
              <>
                Beauty, distilled
                <br />
                to its <span className="italic text-bronze">essentials.</span>
              </>
            )}
          </h2>

          {paragraphs.map((p, i) => (
            <p key={i} className="mt-7 text-[0.95rem] leading-[1.85] text-smoke">
              {p}
            </p>
          ))}

          <div className="mt-11 flex flex-wrap gap-x-10 gap-y-4 hairline-t pt-8">
            {[
              'Clinically proven actives',
              'Single-origin botanicals',
              'Refillable by design',
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2.5 text-xs uppercase tracking-[0.16em] text-clay"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-gold, #8a6d47)"
                  strokeWidth="1.75"
                >
                  <path d="m4 12.5 5 5L20 6.5" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
