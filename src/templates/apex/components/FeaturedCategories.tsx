'use client';

import React from 'react';
import { categories } from '../categories';
import { useUIStore } from '../stores/uiStore';
import { ArrowRight } from 'lucide-react';

interface FeaturedCategoriesProps {
  accentColor?: string;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  accentColor = '#3b82f6',
}) => {
  const { navigateToShop } = useUIStore();

  return (
    <section id="categories" className="py-24 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span
              className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block mb-1"
              style={{ color: accentColor }}
            >
              ARCHITECTURAL DOMAINS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Featured Collections
            </h2>
          </div>
          <button
            onClick={() => navigateToShop()}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-blue-400 transition-colors cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => navigateToShop(cat.slug)}
              className={`group relative rounded-3xl overflow-hidden border border-[var(--border-subtle)] bg-black/40 luxury-card min-h-[340px] flex flex-col justify-end p-6 sm:p-8 transition-all duration-500 hover:border-[var(--border-medium)] hover:shadow-2xl cursor-pointer ${
                idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Background Image with Zoom */}
              <div className="absolute inset-0 z-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-105 brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300"></div>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 space-y-2 transform transition-transform duration-300 group-hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400 font-semibold">
                    {cat.tagline}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-md">
                    {cat.productCount} Models
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {cat.name}
                </h3>

                <p className="text-xs text-zinc-300 max-w-md line-clamp-2 leading-relaxed opacity-90">
                  {cat.description}
                </p>

                <div className="pt-3 flex items-center gap-2 text-xs font-semibold text-white group-hover:text-blue-400 transition-colors uppercase tracking-wider">
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
