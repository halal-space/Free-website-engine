import React from 'react';
import { HERO } from '../data/content';
import { Button } from './Button';
import { useUIStore } from '../stores/uiStore';

interface HeroProps {
  heroTitle?: string;
  heroSubtitle?: string;
  ctaText?: string;
  heroImages?: string[];
}

export const Hero: React.FC<HeroProps> = ({
  heroTitle,
  heroSubtitle,
  ctaText = 'Shop Collection',
  heroImages,
}) => {
  const { navigateToShop, navigateToProduct } = useUIStore();

  const mainImage = heroImages?.[0] || HERO.image;
  const secondaryImage = heroImages?.[1] || HERO.secondaryImage;

  // Split title into two lines if default or handle custom
  const titleParts = heroTitle
    ? heroTitle.includes('·')
      ? heroTitle.split('·').map((s) => s.trim())
      : [heroTitle, 'Radiant Skin.']
    : HERO.title;

  return (
    <section className="relative overflow-hidden bg-bg" aria-label="Introduction">
      <div className="container-luxe grid min-h-[calc(100dvh-7.5rem)] items-center gap-10 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-0">
        {/* Copy */}
        <div className="relative z-10 max-w-xl pb-6 pt-8 lg:py-20">
          <p className="eyebrow mb-7 flex items-center gap-3 text-gold">
            <span className="h-px w-10 bg-gold/60" />
            {HERO.eyebrow}
          </p>
          <h1 className="font-serif text-[clamp(3.2rem,7.5vw,5.75rem)] leading-[0.98] tracking-tight text-ink">
            <span className="block">{titleParts[0]}</span>
            <span className="block italic text-bronze">{titleParts[1] || ''}</span>
          </h1>
          <p className="mt-8 max-w-md text-[0.95rem] leading-relaxed text-smoke">
            {heroSubtitle || HERO.text}
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Button
              size="lg"
              onClick={() => navigateToShop()}
            >
              {ctaText}
            </Button>
            <a
              href="#ritual"
              className="group inline-flex items-center gap-3 eyebrow text-ink transition-colors hover:text-gold"
            >
              Explore Our Rituals
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
                className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8m0 0 3-3m-3 3-3-3" />
              </svg>
            </a>
          </div>

          <dl className="mt-14 flex flex-wrap gap-x-12 gap-y-6 hairline-t pt-8">
            <div>
              <dt className="sr-only">saw visible radiance*</dt>
              <dd className="font-serif text-3xl text-ink">97%</dd>
              <dd className="mt-1 text-xs tracking-wide text-stone">saw visible radiance*</dd>
            </div>
            <div>
              <dt className="sr-only">average rating</dt>
              <dd className="font-serif text-3xl text-ink">4.9</dd>
              <dd className="mt-1 text-xs tracking-wide text-stone">average rating</dd>
            </div>
            <div>
              <dt className="sr-only">radiance guarantee</dt>
              <dd className="font-serif text-3xl text-ink">30-day</dd>
              <dd className="mt-1 text-xs tracking-wide text-stone">radiance guarantee</dd>
            </div>
          </dl>
        </div>

        {/* Imagery */}
        <div className="relative h-[52vh] min-h-[420px] self-end overflow-hidden rounded-tl-[10rem] lg:h-auto lg:min-h-[calc(100dvh-7rem)] lg:self-stretch lg:rounded-none lg:rounded-tl-[14rem]">
          <div className="img-skeleton absolute inset-0">
            <img
              src={mainImage}
              alt={HERO.imageAlt}
              width={1200}
              height={1500}
              className="h-full w-full object-cover object-top"
            />
          </div>

          {/* Floating product card */}
          <button
            type="button"
            onClick={() => navigateToProduct('nocturne-retinol-elixir')}
            className="group absolute bottom-6 left-4 hidden w-64 items-center gap-4 rounded-md border border-line bg-bg/90 p-3.5 shadow-lifted backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 sm:flex lg:left-8 lg:bottom-16 cursor-pointer text-left"
          >
            <img
              src={secondaryImage}
              alt=""
              width={96}
              height={120}
              className="h-20 w-16 rounded-sm object-cover"
            />
            <span>
              <span className="eyebrow block text-gold">New</span>
              <span className="mt-1 block font-serif text-lg leading-snug group-hover:text-bronze">
                Nocturne Retinol Elixir
              </span>
              <span className="mt-0.5 block text-xs text-stone">From $112</span>
            </span>
          </button>
        </div>
      </div>

      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[0.62rem] uppercase tracking-[0.3em] text-stone">
        *Clinical panel, 2025 · n=214
      </p>
    </section>
  );
};
