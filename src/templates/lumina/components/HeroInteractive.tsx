'use client';

import React, { useState } from 'react';
import { ArrowRight, Sparkles, ChevronRight, Shield, Layers } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useUIStore } from '../stores/uiStore';
import { PRODUCTS } from '../products';

interface HeroInteractiveProps {
  heroTitle?: string;
  heroSubtitle?: string;
  ctaText?: string;
  accentColor?: string;
  onCtaClick?: () => void;
}

export const HeroInteractive: React.FC<HeroInteractiveProps> = ({
  heroTitle,
  heroSubtitle,
  ctaText = 'Inspect Garment',
  accentColor = '#C5A880',
  onCtaClick
}) => {
  const { formatPrice } = useCartStore();
  const { openQuickView, setActivePageView } = useUIStore();

  const heroSlides = [
    {
      id: 'slide-1',
      title: heroTitle || 'Defined by Detail.',
      subhead: 'THE 2026 ARCHIVE: SILHOUETTES IN MONOCHROME',
      description: heroSubtitle || 'Masterfully sculpted from 750gsm double-faced Mongolian cashmere and precision-tailored with architectural peak lapels. A study in silent luxury and structural permanence.',
      garment: 'The Monolith Double-Breasted Coat',
      price: 3450,
      material: '100% Loro Piana Mongolian Cashmere',
      edition: 'Numbered Archive 08 / 50',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1800&auto=format&fit=crop',
      alt: 'The Monolith Double-Breasted Coat displayed on an artisan tailor mannequin in dramatic studio lighting',
      productSlug: 'the-monolith-double-breasted-cashmere-coat',
      tag: 'Couture Mannequin Display'
    },
    {
      id: 'slide-2',
      title: 'Form & Fluidity.',
      subhead: 'NOCTURNE: 40-MOMME LIQUID SILK CHARMEUSE',
      description: 'Sculpted from a single continuous bolt of heavy silk satin on our bespoke couture stand. An arresting bias-cut column silhouette featuring invisible French hand-rolled hems.',
      garment: 'The Column Silk Satin Evening Gown',
      price: 3890,
      material: '100% Mulberry Silk Charmeuse (40 Momme)',
      edition: 'Numbered Edition 04 / 25',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1800&auto=format&fit=crop',
      alt: 'The Column Silk Satin Gown showcased on an elegant couturier tailor stand',
      productSlug: 'the-column-silk-satin-evening-gown',
      tag: 'Atelier Stand Presentation'
    },
    {
      id: 'slide-3',
      title: 'Sartorial Rigor.',
      subhead: 'THE MONOLITH BLAZER & HIGH-TWIST WOOL',
      description: 'Precision-cut from Super 150s high-twist fresco wool. Engineered with concave roped pagoda shoulders and a full floating canvas chest piece for weightless poise.',
      garment: 'The Sculpted Peak-Lapel Blazer',
      price: 2150,
      material: '100% Super 150s Fresco Wool & Silk Lining',
      edition: 'Hand-Tailored in Milan',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1800&auto=format&fit=crop',
      alt: 'The Sculpted Peak Blazer on tailor mannequin with sharp architectural lighting',
      productSlug: 'the-sculpted-peak-lapel-blazer',
      tag: 'Bespoke Tailor Form'
    }
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slide = heroSlides[currentSlideIndex];

  return (
    <section id="hero" className="relative w-full min-h-[85vh] lg:min-h-[92vh] bg-[#0C0C0D] text-[#FAF8F5] overflow-hidden flex items-center">
      {/* Background Image Stage with smooth fade */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlideIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={s.image}
              alt={s.alt}
              className="w-full h-full object-cover object-center brightness-90 filter"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0D] via-[#0C0C0D]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0D] via-transparent to-[#0C0C0D]/40" />
          </div>
        ))}
      </div>

      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Editorial Copy */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 animate-fade-in-up">
          {/* Badge & Edition Tag */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 text-[10px] tracking-ultra-wide uppercase px-3 py-1 bg-[#1E1E20]/90 border backdrop-blur-md"
              style={{ color: accentColor, borderColor: `${accentColor}4D` }}
            >
              <Sparkles className="w-3 h-3" />
              <span>{slide.subhead}</span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#A1A1AA] uppercase">
              {slide.tag}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif font-light text-[#FAF8F5] tracking-tight leading-[1.08]">
            {slide.title}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#D4CDC3] font-light leading-relaxed max-w-xl">
            {slide.description}
          </p>

          {/* Featured Garment Quick Specs Box */}
          <div className="p-4 sm:p-5 bg-[#141416]/80 border border-[#2A2A2E] backdrop-blur-md max-w-lg space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-[#2A2A2E] pb-2">
              <span className="text-[#A1A1AA] font-mono text-[10px] uppercase">Hero Garment</span>
              <span className="font-mono font-medium" style={{ color: accentColor }}>
                {formatPrice(slide.price)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif text-base text-[#FAF8F5]">{slide.garment}</h4>
                <p className="text-[11px] text-[#A1A1AA]">{slide.material}</p>
              </div>
              <span className="text-[9px] font-mono tracking-wider text-[#A1A1AA] uppercase border border-[#2A2A2E] px-2 py-1">
                {slide.edition}
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                if (onCtaClick) {
                  onCtaClick();
                } else {
                  const targetProd = PRODUCTS.find((p) => p.slug === slide.productSlug) || PRODUCTS[0];
                  if (targetProd) openQuickView(targetProd);
                }
              }}
              className="bg-[#FAF8F5] text-[#0C0C0D] hover:bg-[#C5A880] hover:text-[#FAF8F5] py-4 px-8 text-xs tracking-ultra-wide uppercase transition-all duration-300 flex items-center gap-2.5 font-medium shadow-2xl group cursor-pointer"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActivePageView('shop')}
              className="border border-[#FAF8F5]/40 hover:border-[#FAF8F5] text-[#FAF8F5] py-4 px-8 text-xs tracking-ultra-wide uppercase transition-colors flex items-center gap-2 backdrop-blur-xs cursor-pointer"
            >
              <span>Explore Archive</span>
            </button>
          </div>
        </div>

        {/* Right: Interactive Slide Selector / Angle Controls */}
        <div className="lg:col-span-5 flex flex-col justify-end lg:items-end space-y-4">
          <div className="text-[10px] tracking-ultra-wide uppercase text-[#A1A1AA] flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span>Select Perspective ({currentSlideIndex + 1} / {heroSlides.length})</span>
          </div>

          <div className="flex flex-row lg:flex-col gap-3 w-full max-w-sm">
            {heroSlides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`p-3 text-left border transition-all cursor-pointer flex items-center gap-3 backdrop-blur-md ${
                  currentSlideIndex === idx
                    ? 'border-[#C5A880] bg-[#1E1E20]/90 ring-1 ring-[#C5A880]/50'
                    : 'border-[#2A2A2E] bg-[#111112]/60 opacity-60 hover:opacity-100 hover:border-[#52525B]'
                }`}
              >
                <div className="w-12 h-14 bg-black shrink-0 overflow-hidden">
                  <img src={s.image} alt={s.garment} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-mono block" style={{ color: accentColor }}>
                    0{idx + 1} • {s.tag}
                  </span>
                  <h5 className="text-xs font-serif text-[#FAF8F5] truncate">{s.garment}</h5>
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 ${
                    currentSlideIndex === idx ? 'text-[#C5A880]' : 'text-[#52525B]'
                  }`}
                  style={currentSlideIndex === idx ? { color: accentColor } : undefined}
                />
              </button>
            ))}
          </div>

          {/* Pure craftsmanship trust banner */}
          <div className="hidden lg:flex items-center gap-3 text-[10px] text-[#A1A1AA] tracking-wider uppercase pt-4 border-t border-[#2A2A2E]/60">
            <Shield className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span>Certified Ethical Mongolian Cashmere & Como Silk</span>
          </div>
        </div>
      </div>
    </section>
  );
};
