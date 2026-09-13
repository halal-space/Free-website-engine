'use client';

import React from 'react';
import { products } from '../products';
import { useUIStore } from '../stores/uiStore';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  heroTitle?: string;
  heroSubtitle?: string;
  ctaText?: string;
  accentColor?: string;
  heroImages?: string[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroTitle = 'Technology,\nRefined.',
  heroSubtitle = 'Precision-engineered gadgets designed for people who expect more from technology. Bespoke acoustics, monolithic titanium, and neural silicon.',
  ctaText = 'Explore Collection',
  accentColor = '#3b82f6',
  heroImages,
}) => {
  const flagship = products[0]; // Aura Pro

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-12 pb-20 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      {/* Ambient Background Light & Glow Rings */}
      <div className="absolute inset-0 radial-glow pointer-events-none"></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none animate-pulse-glow opacity-30"
        style={{ backgroundColor: accentColor }}
      ></div>
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full luxury-glass border border-[var(--border-medium)] text-xs font-mono uppercase tracking-[0.2em] text-blue-400 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
              <span>Flagship Release 2026</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.05]">
                {heroTitle && heroTitle.includes('\n') ? (
                  <>
                    {heroTitle.split('\n')[0]} <br />
                    <span className="metallic-text">{heroTitle.split('\n').slice(1).join(' ')}</span>
                  </>
                ) : (
                  <>
                    Technology, <br />
                    <span className="metallic-text">Refined.</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {heroSubtitle}
              </p>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => useUIStore.getState().navigateToShop()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-white text-xs font-bold uppercase tracking-widest shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 10px 25px -5px ${accentColor}40`
                }}
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => useUIStore.getState().navigateToAbout()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl luxury-glass border border-[var(--border-subtle)] hover:border-[var(--border-medium)] text-[var(--text-primary)] text-xs font-bold uppercase tracking-widest hover:bg-[var(--bg-card-hover)] transition-all duration-300 text-center cursor-pointer"
              >
                Discover the Brand
              </button>
            </div>

            {/* Specs Ticker */}
            <div className="pt-8 border-t border-[var(--border-subtle)] grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <span className="block text-xl sm:text-2xl font-extrabold font-mono text-[var(--text-primary)]">Grade 5</span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">Aerospace Titanium</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-extrabold font-mono text-[var(--text-primary)]">5Hz - 45kHz</span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">Planar Response</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-extrabold font-mono text-[var(--text-primary)]">3nm NPU</span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">Neural Intelligence</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Flagship Gadget Showcase */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
              {/* Circular Ambient Aura */}
              <div className="absolute inset-4 rounded-full border border-white/10 animate-pulse-glow"></div>
              <div className="absolute inset-16 rounded-full border border-blue-500/20"></div>

              {/* Floating Product Image */}
              <div className="relative z-10 w-4/5 h-4/5 animate-float">
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-black/80 border border-white/15 bg-black/60">
                  <img
                    src={(heroImages && heroImages[0]) || flagship.images[0]}
                    alt={flagship.name}
                    className="w-full h-full object-cover object-center filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Product Badge Card Floating Over Image */}
                  <div className="absolute bottom-6 inset-x-6 p-4 rounded-2xl luxury-glass border border-white/20 text-left flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold block">
                        FEATURED FLAGSHIP
                      </span>
                      <h3 className="text-sm font-bold text-white">
                        {flagship.name}
                      </h3>
                      <p className="text-xs text-zinc-300 font-mono">
                        ${flagship.price.toLocaleString()} USD
                      </p>
                    </div>
                    <button
                      onClick={() => useUIStore.getState().navigateToProduct(flagship.slug)}
                      className="p-2.5 rounded-xl bg-white text-zinc-950 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer"
                      aria-label={`View ${flagship.name} details`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
