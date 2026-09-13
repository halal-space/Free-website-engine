'use client';

import React from 'react';
import { curatedCollections } from '../data/categories';
import { ArrowRight } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';

export const CuratedCollections: React.FC = () => {
  const { navigateToShop } = useUIStore();

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#B88B4A] font-semibold block mb-2">
            Seasonal Editorial
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] tracking-tight">
            Curated Collections
          </h2>
          <p className="text-xs sm:text-sm text-[#877E73] mt-2 font-sans">
            Handpicked capsules coordinated by occasion, milestones, and seasons for seamless, beautiful gifting and family life.
          </p>
        </div>

        {/* Featured Lookbook Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* 1st Card: Large Hero Card (7 Cols) */}
          <button
            onClick={() => navigateToShop(curatedCollections[0].slug)}
            className="md:col-span-7 group relative rounded-3xl overflow-hidden shadow-lg border border-[#E8E2D7] bg-[#EAE3D5] min-h-[360px] flex flex-col justify-end p-8 sm:p-10 transition-transform duration-500 hover:-translate-y-1 text-left cursor-pointer focus:outline-none"
          >
            <img
              src={curatedCollections[0].image}
              alt={curatedCollections[0].title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/90 via-[#1C1917]/40 to-transparent" />

            <div className="relative z-10 text-white space-y-2">
              <span className="inline-block text-[11px] uppercase tracking-widest text-[#C09553] font-semibold">
                {curatedCollections[0].tag} • {curatedCollections[0].itemCount} Items
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                {curatedCollections[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-md font-light leading-relaxed">
                {curatedCollections[0].description}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white group-hover:text-[#C09553] transition-colors">
                  Explore Collection <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </button>

          {/* 2nd Card: Medium Card (5 Cols) */}
          <button
            onClick={() => navigateToShop(curatedCollections[1].slug)}
            className="md:col-span-5 group relative rounded-3xl overflow-hidden shadow-lg border border-[#E8E2D7] bg-[#EAE3D5] min-h-[360px] flex flex-col justify-end p-8 sm:p-10 transition-transform duration-500 hover:-translate-y-1 text-left cursor-pointer focus:outline-none"
          >
            <img
              src={curatedCollections[1].image}
              alt={curatedCollections[1].title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/90 via-[#1C1917]/40 to-transparent" />

            <div className="relative z-10 text-white space-y-2">
              <span className="inline-block text-[11px] uppercase tracking-widest text-[#C09553] font-semibold">
                {curatedCollections[1].tag} • {curatedCollections[1].itemCount} Items
              </span>
              <h3 className="font-serif text-2xl font-medium text-white">
                {curatedCollections[1].title}
              </h3>
              <p className="text-xs text-white/80 font-light leading-relaxed">
                {curatedCollections[1].description}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white group-hover:text-[#C09553] transition-colors">
                  Explore Collection <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </button>

          {/* 3rd, 4th, 5th Cards: 3 Column Row (4 Cols each) */}
          {curatedCollections.slice(2).map((col) => (
            <button
              key={col.id}
              onClick={() => navigateToShop(col.slug)}
              className="md:col-span-4 group relative rounded-3xl overflow-hidden shadow-md border border-[#E8E2D7] bg-[#EAE3D5] min-h-[300px] flex flex-col justify-end p-6 sm:p-7 transition-transform duration-500 hover:-translate-y-1 text-left cursor-pointer focus:outline-none"
            >
              <img
                src={col.image}
                alt={col.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/90 via-[#1C1917]/35 to-transparent" />

              <div className="relative z-10 text-white space-y-1.5">
                <span className="inline-block text-[10px] uppercase tracking-widest text-[#C09553] font-semibold">
                  {col.tag}
                </span>
                <h4 className="font-serif text-xl font-medium text-white">
                  {col.title}
                </h4>
                <p className="text-xs text-white/80 font-light line-clamp-2">
                  {col.description}
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-white group-hover:text-[#C09553] transition-colors">
                    Shop Capsule <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
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
