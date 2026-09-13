'use client';

import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Leaf } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';

interface HeroProps {
  heroTitle?: string;
  heroSubtitle?: string;
  ctaText?: string;
  heroImages?: string[];
  accentColor?: string;
}

export const Hero: React.FC<HeroProps> = ({
  heroTitle = 'Beautiful essentials for every little adventure.',
  heroSubtitle = "Discover thoughtfully selected baby and children's essentials designed to bring comfort, joy, and style to everyday moments.",
  ctaText = 'Shop the collection',
  heroImages,
  accentColor = '#B88B4A',
}) => {
  const { navigateToShop } = useUIStore();
  const heroImage =
    heroImages && heroImages.length > 0
      ? heroImages[0]
      : 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=2200&q=88';

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF8F5]">
      {/* Editorial Full-Bleed / Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pb-16 lg:pt-8 lg:pb-20">
        <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl border border-[#E8E2D7]/80 bg-[#EAE3D5]">
          {/* Background Lifestyle Image with warm grading */}
          <div className="relative min-h-[500px] sm:min-h-[440px] lg:min-h-0 lg:aspect-21/9 w-full overflow-hidden">
            <img
              src={heroImage}
              alt="Warmly lit nursery with baby swaddled in natural organic textiles"
              className="absolute inset-0 w-full h-full object-cover object-center transform scale-102 transition-transform duration-1000 ease-out hover:scale-100"
              loading="eager"
            />
            {/* Editorial gradient scrim overlay ensuring 100% legibility */}
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#1C1917]/90 via-[#1C1917]/65 to-black/25 sm:w-2/3 lg:w-3/5" />

            {/* Floating Editorial Text Overlay */}
            <div className="relative z-10 flex items-center min-h-[500px] sm:min-h-[440px] lg:min-h-0 h-full p-6 sm:p-10 lg:p-16">
              <div className="max-w-xl space-y-4 sm:space-y-6 text-[#FAF8F5]">
                {/* Subtle Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs tracking-widest uppercase font-medium text-[#FAF8F5]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C09553]" style={{ color: accentColor }} />
                  <span>Maison Petit • Autumn / Winter Capsule</span>
                </div>

                {/* Heading */}
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
                  {heroTitle}
                </h1>

                {/* Supporting text */}
                <p className="text-sm sm:text-base font-light text-white/90 leading-relaxed font-sans max-w-lg">
                  {heroSubtitle}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    onClick={() => navigateToShop()}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#FAF8F5] text-[#1C1917] hover:bg-[#B88B4A] hover:text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md group cursor-pointer"
                  >
                    <span>{ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => navigateToShop(undefined, 'newest')}
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-black/20 hover:bg-black/35 backdrop-blur-md text-[#FAF8F5] border border-white/30 text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    Explore new arrivals
                  </button>
                </div>

                {/* Micro Trust Indicators */}
                <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-white/80 font-light">
                  <span className="flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-[#8F9E8B]" />
                    100% GOTS Organic Cotton
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C09553]" style={{ color: accentColor }} />
                    FSC Certified Solid Woods
                  </span>
                  <span className="text-white/30">•</span>
                  <span>Plastic-Free Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
