'use client';

import React from 'react';
import { categories } from '../data/categories';
import { ArrowRight } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';

export const FeaturedCategories: React.FC = () => {
  const { navigateToShop } = useUIStore();

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#E8E2D7] pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B88B4A] font-semibold block mb-1">
              Thoughtful Curation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] tracking-tight">
              Featured Categories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#877E73] max-w-md mt-2 md:mt-0 font-sans">
            Artisanal essentials, heirlooms, and daily provisions thoughtfully arranged for every stage of early childhood.
          </p>
        </div>

        {/* Refined Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => navigateToShop(category.slug)}
              className="group relative block overflow-hidden rounded-2xl bg-[#EAE3D5] border border-[#E8E2D7] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl text-left cursor-pointer focus:outline-none"
            >
              {/* Card Image */}
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                />
                {/* Subtle warm overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/85 via-[#1C1917]/35 to-transparent" />
              </div>

              {/* Card Content Overlay */}
              <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-end text-white">
                <span className="text-[11px] uppercase tracking-widest text-[#C09553] font-semibold mb-1">
                  {category.itemCount} Items
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#FAF8F5] leading-tight group-hover:text-[#FAF8F5] transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-white/80 font-light mt-1.5 line-clamp-2 leading-relaxed">
                  {category.description}
                </p>

                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-medium tracking-wider uppercase text-white/90 group-hover:text-white">
                  <span className="flex items-center gap-1.5">
                    Shop now
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
