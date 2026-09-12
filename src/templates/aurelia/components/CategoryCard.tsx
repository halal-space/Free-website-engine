import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { AureliaCategory } from '../data';
import { Card3DTilt } from './ui/Card3DTilt';

interface CategoryCardProps {
  category: AureliaCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card3DTilt className="h-full">
      <a
        href={`#category-${category.slug}`}
        className="group relative block h-full overflow-hidden rounded-panel bg-surface-2 focus-visible:outline-accent"
      >
        <img
          src={category.image}
          alt={category.name}
          width={900}
          height={1100}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/25 to-transparent transition-opacity duration-500" />
        <div className="absolute inset-0 bg-obsidian/0 transition-colors duration-500 group-hover:bg-obsidian/20" />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/60">
              {category.count} products
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold text-white transition-transform duration-500 group-hover:-translate-y-1">
              {category.name}
            </h3>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </a>
    </Card3DTilt>
  );
}
