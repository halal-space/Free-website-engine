'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '../collections';
import { useUIStore } from '../stores/uiStore';

interface CapsuleGridProps {
  accentColor?: string;
  onSelectCapsule?: (slug: string) => void;
}

export const CapsuleGrid: React.FC<CapsuleGridProps> = ({
  accentColor = '#C5A880',
  onSelectCapsule
}) => {
  const { setActivePageView, setSelectedCollectionSlug } = useUIStore();
  return (
    <section id="collections" className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-[#E8E3DA] gap-4">
          <div>
            <span
              className="text-[10px] tracking-ultra-wide uppercase block mb-1 font-medium"
              style={{ color: accentColor }}
            >
              Curated Capsules
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#0C0C0D]">
              The 2026 Collections
            </h3>
          </div>
          <button
            onClick={() => {
              if (onSelectCapsule) onSelectCapsule('all');
              setSelectedCollectionSlug(null);
              setActivePageView('collections');
            }}
            className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-[#0C0C0D] hover:text-[#C5A880] transition-colors cursor-pointer"
          >
            <span>View All Capsules</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLECTIONS.map((col, idx) => (
            <div
              key={col.id}
              onClick={() => {
                if (onSelectCapsule) onSelectCapsule(col.slug);
                setSelectedCollectionSlug(col.slug);
                setActivePageView('collections');
              }}
              className="group relative block aspect-[3/4] bg-[#0C0C0D] overflow-hidden border border-[#E8E3DA] hover:border-[#C5A880] transition-all duration-500 cursor-pointer"
            >
              <img
                src={col.heroImage}
                alt={col.title}
                className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-700 brightness-95"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0D]/90 via-[#0C0C0D]/30 to-transparent" />

              <div className="absolute inset-x-5 bottom-5 text-[#FAF8F5] space-y-1.5">
                <span
                  className="text-[9px] font-mono tracking-widest uppercase block"
                  style={{ color: accentColor }}
                >
                  0{idx + 1} • {col.season}
                </span>
                <h4 className="font-serif text-lg text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors leading-tight">
                  {col.title}
                </h4>
                <p className="text-[11px] text-[#D4CDC3] line-clamp-2 font-light leading-relaxed">
                  {col.tagline}
                </p>
                <div className="pt-2 text-[10px] tracking-widest uppercase text-[#FAF8F5] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explore Capsule</span>
                  <ArrowRight className="w-3 h-3" style={{ color: accentColor }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
