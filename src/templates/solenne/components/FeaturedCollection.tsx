import React from 'react';
import { FEATURED_COLLECTION } from '../data/content';
import { PRODUCTS, formatPrice } from '../data/products';
import { useUIStore } from '../stores/uiStore';

export const FeaturedCollection: React.FC = () => {
  const { navigateToProduct, navigateToShop } = useUIStore();

  const featured = FEATURED_COLLECTION.slugs
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <section
      id="collections"
      className="relative overflow-hidden bg-ink py-20 text-ivory md:py-28"
      aria-labelledby="collection-title"
    >
      {/* Wide cinematic backdrop */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={FEATURED_COLLECTION.imageWide}
          alt=""
          width={1800}
          height={1000}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-[0.16]"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink"
        aria-hidden="true"
      />

      <div className="container-luxe relative">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5 flex items-center gap-3 text-champagne">
            <span className="h-px w-10 bg-champagne/60" />
            {FEATURED_COLLECTION.eyebrow}
          </p>
          <h2
            id="collection-title"
            className="font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] text-ivory"
          >
            {FEATURED_COLLECTION.title}
          </h2>
          <p className="mt-6 max-w-xl text-[0.95rem] leading-[1.85] text-white/65">
            {FEATURED_COLLECTION.text}
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {featured.map((p) => {
            if (!p) return null;
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => navigateToProduct(p.slug)}
                className="group relative block overflow-hidden rounded-md border border-white/10 text-left cursor-pointer w-full"
              >
                <div className="img-skeleton aspect-[4/5]">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    width={600}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-all duration-[1.1s] ease-lux group-hover:scale-[1.05]"
                  />
                </div>
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <div>
                    {p.badge && (
                      <p className="eyebrow mb-1.5 text-champagne">{p.badge}</p>
                    )}
                    <h3 className="font-serif text-xl text-white md:text-2xl">
                      {p.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 max-w-[24ch] text-xs leading-relaxed text-white/60">
                      {p.tagline}
                    </p>
                  </div>
                  <span className="shrink-0 font-serif text-lg italic text-champagne">
                    {formatPrice(p.price)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => navigateToShop('serums')}
            className="group inline-flex items-center gap-3 rounded-full border border-white/25 px-8 py-4 eyebrow text-ivory transition-all duration-500 hover:border-champagne hover:text-champagne cursor-pointer"
          >
            Discover the Edit
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
            >
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
