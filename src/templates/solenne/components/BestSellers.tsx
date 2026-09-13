import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { SectionHeading } from './SectionHeading';
import { useUIStore } from '../stores/uiStore';
import { Product } from '../types';

interface BestSellersProps {
  products?: Product[];
}

export const BestSellers: React.FC<BestSellersProps> = ({
  products: propProducts,
}) => {
  const { navigateToShop } = useUIStore();

  const bestSellers = React.useMemo(() => {
    if (propProducts && propProducts.length > 0) {
      return propProducts.slice(0, 4);
    }
    return PRODUCTS.filter((p) => p.badge === 'Best Seller' || p.rating >= 4.8).slice(0, 4);
  }, [propProducts]);

  return (
    <section className="bg-cream/60 py-20 md:py-28" aria-labelledby="bestsellers-title">
      <div className="container-luxe">
        <SectionHeading
          id="bestsellers-title"
          eyebrow="Most Loved"
          title="The icons of the maison"
          link={{
            label: 'Shop Best Sellers',
            onClick: () => navigateToShop(null, 'rating'),
          }}
        />

        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
          {bestSellers.map((p, i) => (
            <div key={p.slug}>
              <ProductCard product={p} eager={i < 2} />
            </div>
          ))}
        </div>

        <p className="mt-14 text-center sm:hidden">
          <button
            type="button"
            onClick={() => navigateToShop(null, 'rating')}
            className="eyebrow inline-flex items-center gap-2 text-gold cursor-pointer"
          >
            Shop Best Sellers
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </button>
        </p>
      </div>
    </section>
  );
};
