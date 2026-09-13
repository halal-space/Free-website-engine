import React from 'react';
import { CATEGORIES } from '../data/products';
import { SectionHeading } from './SectionHeading';
import { useUIStore } from '../stores/uiStore';

export const Categories: React.FC = () => {
  const { navigateToShop } = useUIStore();

  return (
    <section className="container-luxe py-20 md:py-28" aria-labelledby="categories-title">
      <SectionHeading
        id="categories-title"
        eyebrow="The Collection"
        title="Curated by category"
        link={{
          label: 'View all',
          onClick: () => navigateToShop(),
        }}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => navigateToShop(cat.id)}
            className="group relative block overflow-hidden rounded-md cursor-pointer text-left w-full"
            aria-label={`Shop ${cat.label} — ${cat.blurb}`}
          >
            <div className="img-skeleton aspect-[3/4.4]">
              <img
                src={cat.image}
                alt=""
                width={450}
                height={600}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-lux group-hover:scale-[1.06]"
              />
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <h3 className="font-serif text-lg leading-tight text-white sm:text-xl">
                {cat.label}
              </h3>
              <p className="mt-1 hidden text-xs tracking-wide text-white/75 transition-all duration-500 sm:block sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                {cat.blurb}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
