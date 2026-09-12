'use client';

import React from 'react';
import { useUIStore } from '../stores/uiStore';
import { products } from '../products';
import { ProductCard } from './ProductCard';
import { ArrowLeft, ChevronRight, Tag } from 'lucide-react';

interface DealsViewProps {
  accentColor?: string;
}

export const DealsView: React.FC<DealsViewProps> = ({
  accentColor = '#3b82f6',
}) => {
  const { navigateToHome, navigateToShop } = useUIStore();
  const dealProducts = products.filter((p) => p.discountPercent || p.originalPrice);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in text-[var(--text-primary)]">
      {/* Breadcrumbs Navigation */}
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]" aria-label="Breadcrumb">
          <button
            onClick={navigateToHome}
            className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="text-[var(--text-primary)] font-semibold">Deals & Archive</span>
        </nav>

        <button
          onClick={() => navigateToShop()}
          className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Full Catalog</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Header Banner */}
      <div className="max-w-2xl space-y-3">
        <span
          className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block"
          style={{ color: accentColor }}
        >
          CERTIFIED LABORATORY ARCHIVE
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Exclusive Allocations
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          Limited releases, archival collections, and certified refurbished units tested to original factory acoustic tolerances. Backed by our full 2-Year Bespoke Warranty.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dealProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
