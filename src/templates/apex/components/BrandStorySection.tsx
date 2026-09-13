'use client';

import React from 'react';
import { useUIStore } from '../stores/uiStore';
import { ArrowRight } from 'lucide-react';

interface BrandStorySectionProps {
  accentColor?: string;
  storyHeadline?: string;
  storyDescription?: string;
  storyQuote?: string;
}

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({
  accentColor = '#3b82f6',
  storyHeadline,
  storyDescription,
  storyQuote,
}) => {
  return (
    <section id="story" className="py-28 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Editorial Story Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <span
              className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block"
              style={{ color: accentColor }}
            >
              HERITAGE & PHILOSOPHY
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.1]">
              {storyHeadline || 'Designed for the next generation.'}
            </h2>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-normal">
              {storyDescription || 'At AETHER, we believe consumer electronics should not be disposable commodities. We engineer our acoustic systems, computing architecture, and timepieces with the same reverence, tolerances, and timelessness as haute horlogerie and bespoke acoustic instruments.'}
            </p>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {storyQuote || 'Every curve is milled from solid billet aerospace metals. Every transducer is individually laser-measured in our Copenhagen anechoic chambers. Every neural silicon board is thermally optimized using liquid-metal dispersion.'}
            </p>

            {/* Brand Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[var(--border-subtle)]">
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)]">0.01mm</span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">Machining Tolerance</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)]">100%</span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">Recycled Titanium</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)]">48kHz</span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">Neural Calibration</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => useUIStore.getState().navigateToAbout()}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] hover:text-blue-400 transition-colors cursor-pointer"
              >
                <span>Read The Engineering Manifesto</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Immersive Tactile Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-[var(--border-medium)] shadow-2xl bg-black">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85"
                alt="AETHER Craftsmanship and precision engineering"
                className="w-full h-full object-cover object-center filter contrast-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl luxury-glass border border-white/20 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold block mb-1">
                  LABORATORY ETHOS
                </span>
                <p className="text-xs text-zinc-200 leading-relaxed">
                  "We strip away the extraneous until only absolute purity, structural integrity, and acoustic clarity remain."
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
