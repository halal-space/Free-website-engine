import React from 'react';
import { SectionHeading } from './SectionHeading';
import { ProductCard } from './ProductCard';
import { products } from '../data/products';
import { useUIStore } from '../stores/uiStore';

export const FeaturedPackages: React.FC = () => {
  const { navigateToProducts, navigateToServices } = useUIStore();
  const featured = products.filter((p) =>
    ['obsidian-440-mono', 'vault-13-battery', 'obsidian-550-bifacial'].includes(p.slug)
  );

  return (
    <section className="bg-ivory border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow="Systems"
            title="Configured packages. Fixed pricing."
            copy="Residential and commercial starting points. Every proposal is surveyed and priced fixed."
          />
          <button
            type="button"
            onClick={navigateToProducts}
            className="reveal btn btn-ghost-dark shrink-0 cursor-pointer"
          >
            All equipment
          </button>
        </div>

        {/* 3 Featured Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {featured.map((p, i) => (
            <div key={p.slug} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {/* Residential / Commercial split band */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <div
            onClick={() => navigateToServices('residential')}
            className="reveal group relative overflow-hidden rounded-[2px] bg-onyx cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1400&auto=format&fit=crop"
              alt="Modern home with solar"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-45 group-hover:scale-[1.02] transition-all duration-300"
            />
            <div className="relative p-8 md:p-10">
              <p className="eyebrow text-brass">Residential</p>
              <h3 className="font-serif-display text-cloud text-2xl md:text-3xl mt-3">
                Homes, from 4 to 16 kW.
              </h3>
              <p className="text-cloud/70 text-[15px] mt-2 max-w-sm">
                Surveyed, designed and installed in 1–3 days. Battery and EV ready.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-brass mt-5">
                Residential process{' '}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </div>

          <div
            onClick={() => navigateToServices('commercial')}
            className="reveal group relative overflow-hidden rounded-[2px] bg-charcoal cursor-pointer"
            style={{ transitionDelay: '100ms' }}
          >
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop"
              alt="Commercial building"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-[1.02] transition-all duration-300"
            />
            <div className="relative p-8 md:p-10">
              <p className="eyebrow text-brass">Commercial</p>
              <h3 className="font-serif-display text-cloud text-2xl md:text-3xl mt-3">
                Roofs from 30 to 500 kW.
              </h3>
              <p className="text-cloud/70 text-[15px] mt-2 max-w-sm">
                Phased install, yield modelling and board-level reporting.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-brass mt-5">
                Commercial process{' '}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
