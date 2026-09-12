'use client';

import React from 'react';
import { LOOKBOOK_ITEMS } from '../editorial';
import { ShoppableLookbook } from './ShoppableLookbook';
import { useUIStore } from '../stores/uiStore';
import { ArrowLeft } from 'lucide-react';

interface LookbookViewProps {
  accentColor?: string;
}

export const LookbookView: React.FC<LookbookViewProps> = ({
  accentColor = '#C5A880'
}) => {
  const { setActivePageView } = useUIStore();

  return (
    <div className="py-16 sm:py-24 bg-[#FAF8F5] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Sub-Navigation / Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setActivePageView('home')}
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#71717A] hover:text-[#0C0C0D] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Maison Home</span>
          </button>
          <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider">
            Runway Archive
          </span>
        </div>

        {/* Section Header */}
        <div className="mb-16 pb-8 border-b border-[#E8E3DA] text-center max-w-3xl mx-auto space-y-3">
          <span
            className="text-[10px] tracking-ultra-wide uppercase block font-medium"
            style={{ color: accentColor }}
          >
            Haute Couture Runway Archive
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-light text-[#0C0C0D] tracking-tight">
            2026 Editorial Lookbook
          </h1>
          <p className="text-xs sm:text-sm text-[#52525B] font-light leading-relaxed">
            A visual dissertation on volume, weight, and light. All looks photographed on couturier mannequins and architectural studio installations.
          </p>
        </div>

        {/* Interactive Shoppable Lookbook Module */}
        <ShoppableLookbook accentColor={accentColor} />

        {/* Lookbook Gallery Spreads */}
        <div className="mt-24 space-y-20">
          <div className="text-center space-y-2">
            <span className="text-[10px] tracking-ultra-wide uppercase text-[#71717A]">
              Archival Spreads
            </span>
            <h3 className="text-2xl font-serif font-light text-[#0C0C0D]">
              Look-by-Look Runway Portfolio
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {LOOKBOOK_ITEMS.map((item) => (
              <div key={item.id} className="space-y-4 group">
                <div className="aspect-[4/5] bg-[#0C0C0D] overflow-hidden border border-[#E8E3DA] group-hover:border-[#C5A880] transition-colors duration-500 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                  <span
                    className="absolute top-4 left-4 bg-[#0C0C0D]/85 text-[10px] font-mono px-3 py-1 border backdrop-blur-xs"
                    style={{ color: accentColor, borderColor: `${accentColor}4D` }}
                  >
                    {item.lookNumber}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider block">
                    {item.season}
                  </span>
                  <h4 className="text-lg font-serif font-light text-[#0C0C0D] mt-0.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#52525B] leading-relaxed mt-1 font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
