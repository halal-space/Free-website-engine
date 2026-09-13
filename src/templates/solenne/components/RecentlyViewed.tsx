import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useUIStore } from '../stores/uiStore';

interface RecentlyViewedProps {
  exclude?: string;
  title?: string;
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  exclude,
  title = 'Recently viewed',
}) => {
  const recentlyViewedSlugs = useUIStore((s) => s.recentlyViewedSlugs);

  const recentProducts = recentlyViewedSlugs
    .filter((s) => s !== exclude)
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <section className="container-luxe pb-20 md:pb-28" aria-labelledby="recently-title">
      <div className="mb-12 flex items-end justify-between md:mb-16">
        <div>
          <p className="eyebrow mb-4 flex items-center gap-3 text-gold">
            <span className="h-px w-10 bg-gold/60" />
            Continue Exploring
          </p>
          <h2 id="recently-title" className="font-serif text-[clamp(1.9rem,3.5vw,2.8rem)]">
            {title}
          </h2>
        </div>
      </div>

      {recentProducts.length === 0 ? (
        <div className="rounded-md border border-dashed border-line-strong px-8 py-14 text-center">
          <p className="font-serif text-2xl italic text-espresso">Nothing viewed yet.</p>
          <p className="mt-2 text-sm text-stone">Products you explore will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
          {recentProducts.map((p) => {
            if (!p) return null;
            return <ProductCard key={p.slug} product={p} />;
          })}
        </div>
      )}
    </section>
  );
};
