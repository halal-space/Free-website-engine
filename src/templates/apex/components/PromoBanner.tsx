'use client';

import React from 'react';
import { useUIStore } from '../stores/uiStore';

interface PromoBannerProps {
  accentColor?: string;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  accentColor = '#3b82f6',
}) => {
  const { navigateToShop } = useUIStore();

  return (
    <section className="py-24 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black min-h-[420px] flex items-center shadow-2xl">
          {/* Background Image with Dark Cinematic Filter */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1600&q=85"
              alt="AETHER Next Generation Flagship"
              className="w-full h-full object-cover object-center filter contrast-110 brightness-75 scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-14 lg:p-20 max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full luxury-glass border border-white/20 text-[10px] font-mono uppercase tracking-widest text-blue-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
              <span>LIMITED ALLOCATION RELEASE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              THE NEXT GENERATION HAS ARRIVED
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              Discover our latest collection of titanium-clad smartphones, micro-LED timepieces, and reference acoustic monitors. Hand-assembled in limited batches.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateToShop(undefined, 'new')}
                className="px-8 py-4 rounded-xl text-white text-xs font-bold uppercase tracking-widest shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 10px 25px -5px ${accentColor}40`
                }}
              >
                Shop New Arrivals
              </button>

              <button
                onClick={() => navigateToShop()}
                className="px-6 py-4 rounded-xl luxury-glass border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors cursor-pointer"
              >
                Explore Archive
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
