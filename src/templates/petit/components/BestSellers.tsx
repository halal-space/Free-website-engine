'use client';

import React from 'react';
import { products as defaultProducts } from '../data/products';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';
import type { Product } from '../types';

interface BestSellersProps {
  featuredProductsOverride?: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    category?: string;
    badge?: string;
  }>;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  featuredProductsOverride,
}) => {
  const { navigateToShop } = useUIStore();

  const productsToDisplay: Product[] = React.useMemo(() => {
    const baseBestSellers = defaultProducts.filter((p) => p.isBestSeller).slice(0, 4);
    if (!featuredProductsOverride || featuredProductsOverride.length === 0) {
      return baseBestSellers;
    }
    return baseBestSellers.map((prod, idx) => {
      const match = featuredProductsOverride[idx] || featuredProductsOverride.find((fp) => fp.id === prod.id);
      if (match) {
        return {
          ...prod,
          name: match.name || prod.name,
          price: match.price || prod.price,
          images: match.image ? [match.image, ...(prod.images.slice(1))] : prod.images,
          category: (match.category as any) || prod.category,
        };
      }
      return prod;
    });
  }, [featuredProductsOverride]);

  return (
    <section className="py-16 sm:py-20 bg-[#F5F2EB]/50 border-y border-[#E8E2D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B88B4A] font-semibold block mb-1">
              Bestselling Essentials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] tracking-tight">
              Little things, thoughtfully chosen.
            </h2>
          </div>

          <button
            onClick={() => navigateToShop()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#1C1917] hover:text-[#B88B4A] transition-colors mt-3 sm:mt-0 group cursor-pointer"
          >
            <span>View all curated essentials</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 products on desktop, 2 on mobile grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {productsToDisplay.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
