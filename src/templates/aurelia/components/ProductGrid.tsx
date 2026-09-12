import React from 'react';
import type { AureliaProduct } from '../data';
import { ProductCard } from './ProductCard';
import { cn } from '../lib/utils';

export interface ProductGridProps {
  products: AureliaProduct[];
  rank?: boolean;
  eagerCount?: number;
  className?: string;
  onAddToCart?: (product: AureliaProduct) => void;
}

export function ProductGrid({
  products,
  rank = false,
  eagerCount = 2,
  className,
  onAddToCart,
}: ProductGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4',
        className,
      )}
    >
      {products.map((p, i) => (
        <ProductCard
          key={p.id}
          product={p}
          rank={rank ? i : undefined}
          eager={i < eagerCount}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
