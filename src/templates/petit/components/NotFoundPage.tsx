'use client';

import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';

export const NotFoundPage: React.FC = () => {
  const { navigateToHome, navigateToShop } = useUIStore();

  return (
    <div className="bg-[#FAF8F5] min-h-[70vh] flex items-center justify-center py-16 px-4 font-sans">
      <div className="text-center max-w-md mx-auto space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#F2ECE1] border border-[#E8E2D7] mx-auto flex items-center justify-center text-[#B88B4A]">
          <Compass className="w-8 h-8 stroke-[1.5]" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-[#B88B4A] font-semibold">
            404 • Missing Passage
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] mt-1">
            A Gentle Detour
          </h1>
          <p className="text-xs sm:text-sm text-[#877E73] mt-2 font-sans">
            The sanctuary page you sought may have wandered away into our archives. Let us guide you back to our curated boutique collections.
          </p>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={navigateToHome}
            className="px-6 py-3 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs font-semibold tracking-widest uppercase hover:bg-[#B88B4A] transition-colors cursor-pointer"
          >
            Return Home
          </button>
          <button
            onClick={() => navigateToShop()}
            className="px-6 py-3 rounded-full border border-[#E8E2D7] bg-white text-[#1C1917] text-xs font-semibold tracking-widest uppercase hover:bg-[#FAF8F5] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Browse Shop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
