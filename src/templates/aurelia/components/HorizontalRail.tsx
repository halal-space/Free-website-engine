'use client';

import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { AureliaProduct } from '../data';
import { ProductCard } from './ProductCard';
import { cn } from '../lib/utils';

export interface HorizontalRailProps {
  products: AureliaProduct[];
  itemWidth?: string;
  className?: string;
  onAddToCart?: (product: AureliaProduct) => void;
}

export function HorizontalRail({
  products,
  itemWidth = 'w-[240px] sm:w-[280px]',
  className,
  onAddToCart,
}: HorizontalRailProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const update = () => {
    const el = scroller.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div className={cn('relative', className)}>
      <div
        ref={scroller}
        onScroll={update}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
      >
        {products.map((p) => (
          <div key={p.id} className={cn('shrink-0 snap-start', itemWidth)}>
            <ProductCard product={p} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
      <div className="mt-4 hidden items-center justify-end gap-2 lg:flex">
        <button
          onClick={() => scrollBy(-1)}
          disabled={!canLeft}
          aria-label="Scroll left"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => scrollBy(1)}
          disabled={!canRight}
          aria-label="Scroll right"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
