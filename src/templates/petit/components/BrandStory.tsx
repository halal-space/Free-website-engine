'use client';

import React from 'react';
import { ArrowRight, Heart, Feather, ShieldCheck } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';

interface BrandStoryProps {
  storyHeadline?: string;
  storyDescription?: string;
  storyQuote?: string;
  accentColor?: string;
}

export const BrandStory: React.FC<BrandStoryProps> = ({
  storyHeadline = 'Made for little moments that matter.',
  storyDescription = 'From their first essentials to their biggest little adventures, we make it easier to find beautiful, practical products for every stage of childhood.',
  storyQuote,
  accentColor = '#B88B4A',
}) => {
  const { navigateToAbout } = useUIStore();

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Lifestyle Imagery with Layered Editorial Texture (7 Cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#EAE3D5] border border-[#E8E2D7]">
              <div className="aspect-4/3 sm:aspect-16/10 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1600&q=85"
                  alt="Baby resting peacefully on natural organic linen swaddle"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Small floating accent card */}
            <div className="absolute -bottom-6 -right-2 sm:bottom-8 sm:-right-6 bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl shadow-xl border border-[#E8E2D7] max-w-xs hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EDF3EC] flex items-center justify-center text-[#3D6B4F]">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="block text-xs font-serif font-semibold text-[#1C1917]">
                    Generational Heirlooms
                  </span>
                  <span className="text-[11px] text-[#877E73]">
                    Designed to be loved and passed forward
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Editorial Story Text (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B88B4A] font-semibold block mb-2" style={{ color: accentColor }}>
                Our Guiding Purpose
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-4xl font-medium text-[#1C1917] tracking-tight leading-tight">
                {storyHeadline}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#575149] font-light leading-relaxed font-sans">
              {storyDescription}
            </p>

            <p className="text-xs sm:text-sm text-[#877E73] leading-relaxed">
              We founded Maison Petit on the simple conviction that the items closest to our children should be crafted with uncompromising honesty. That means pure natural fibers grown without chemical sprays, certified sustainable alpine woods smoothed by hand, and thoughtful silhouettes that bring calm, warm aesthetic serenity to modern family living.
            </p>

            {storyQuote && (
              <div className="p-3 rounded-lg bg-[#F5F2EB] border border-[#E8E2D7] text-xs font-mono text-[#877E73]">
                {storyQuote}
              </div>
            )}

            {/* 2 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <Feather className="w-5 h-5 text-[#B88B4A] shrink-0 mt-0.5" style={{ color: accentColor }} />
                <div>
                  <h4 className="text-xs font-semibold text-[#1C1917]">Pure Natural Fibers</h4>
                  <p className="text-[11px] text-[#877E73] mt-0.5">100% GOTS organic cotton and French linen.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#3D6B4F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-[#1C1917]">Child-Safe Certified</h4>
                  <p className="text-[11px] text-[#877E73] mt-0.5">Strict European safety and zero toxic fillers.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                onClick={navigateToAbout}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#B88B4A] text-[#FAF8F5] text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-sm group cursor-pointer"
              >
                <span>Discover our story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
