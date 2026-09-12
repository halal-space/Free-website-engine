'use client';

import React from 'react';
import { getBestSellers } from '../products';
import { ProductCard } from './ProductCard';

interface BestSellersSectionProps {
  accentColor?: string;
}

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({
  accentColor = '#3b82f6',
}) => {
  const bestSellers = getBestSellers().slice(0, 4);

  return (
    <section id="bestsellers" className="py-24 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span
              className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block mb-1"
              style={{ color: accentColor }}
            >
              GLOBAL RECOGNITION
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Best Sellers
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-sm">
            Our most celebrated acoustic and computational instruments, verified by connoisseurs worldwide.
          </p>
        </div>

        {/* Product Grid with Ranking Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, idx) => (
            <div key={product.id} className="relative group/rank flex flex-col">
              {/* Minimalist 01, 02, 03 Index */}
              <div className="flex items-center justify-between pb-2 mb-1 border-b border-[var(--border-subtle)]">
                <span className="font-mono text-xl font-black tracking-tighter text-[var(--text-muted)] group-hover/rank:text-blue-400 transition-colors">
                  0{idx + 1}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
                  Ranked #{idx + 1}
                </span>
              </div>

              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
