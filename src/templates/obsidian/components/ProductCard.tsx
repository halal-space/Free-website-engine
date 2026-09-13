import React from 'react';
import { Product } from '../types';
import { TYPE_LABELS, formatPrice } from '../data/products';
import { useUIStore } from '../stores/uiStore';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const navigateToProduct = useUIStore((s) => s.navigateToProduct);

  return (
    <article
      data-product-card
      data-slug={product.slug}
      onClick={() => navigateToProduct(product.slug)}
      className={`group flex flex-col bg-cloud border border-line rounded-[2px] overflow-hidden hover:border-brass transition-colors duration-200 cursor-pointer ${className}`}
    >
      <div className="relative bg-ivory aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-onyx text-cloud text-[11px] font-semibold tracking-[0.1em] uppercase px-2.5 py-1.5 rounded-[2px]">
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-3 left-3 bg-cloud border border-line text-graphite text-[11px] font-semibold tracking-[0.1em] uppercase px-2.5 py-1.5 rounded-[2px]">
          {TYPE_LABELS[product.type]}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-graphite/70">
          {product.brand}
        </p>
        <h3 className="font-serif-display text-xl mt-1 text-onyx group-hover:text-brass-dark transition-colors duration-200">
          {product.name}
        </h3>
        <p className="text-sm text-graphite mt-1.5">{product.specLine}</p>
        <div className="flex items-end justify-between mt-4 pt-4 border-t border-line">
          <p className="text-onyx">
            <span className="text-lg font-semibold">£{formatPrice(product.price)}</span>{' '}
            <span className="text-[13px] text-graphite">{product.unit}</span>
          </p>
          <span className="text-sm font-semibold text-brass-dark inline-flex items-center gap-1.5">
            View Details
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
};
