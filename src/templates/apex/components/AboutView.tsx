'use client';

import React from 'react';
import { useUIStore } from '../stores/uiStore';
import { ArrowLeft, ArrowRight, ChevronRight, Shield, Award, Cpu, Sparkles } from 'lucide-react';

interface AboutViewProps {
  storeName?: string;
  accentColor?: string;
}

export const AboutView: React.FC<AboutViewProps> = ({
  storeName = 'AETHER',
  accentColor = '#3b82f6',
}) => {
  const { navigateToHome, navigateToShop } = useUIStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20 animate-fade-in text-[var(--text-primary)]">
      {/* Breadcrumbs Navigation */}
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]" aria-label="Breadcrumb">
          <button
            onClick={navigateToHome}
            className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="text-[var(--text-primary)] font-semibold">About</span>
        </nav>

        <button
          onClick={() => navigateToShop()}
          className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Explore Collection</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Editorial Hero */}
      <div className="max-w-3xl space-y-6">
        <span
          className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block"
          style={{ color: accentColor }}
        >
          THE {storeName} MANIFESTO
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.08]">
          We refuse to treat technology as a disposable commodity.
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
          Founded in Copenhagen with advanced acoustic facilities in Tokyo and computational labs in San Francisco, {storeName} exists to eliminate the compromise between extreme technological performance and timeless industrial luxury.
        </p>
      </div>

      {/* Large Visual Feature */}
      <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-[var(--border-subtle)] bg-black shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1600&q=85"
          alt={`${storeName} Engineering Laboratory`}
          className="w-full h-full object-cover object-center filter contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between text-white">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold block">
              COPENHAGEN ACOUSTIC LAB
            </span>
            <h3 className="text-lg font-bold">Anechoic Harmonic Precision Testing Facility</h3>
          </div>
          <span className="text-xs font-mono text-zinc-400 hidden sm:inline">0.01mm Tolerance Certified</span>
        </div>
      </div>

      {/* Philosophy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="materials">
        <div className="p-8 rounded-3xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4">
          <span className="text-xs font-mono font-bold text-blue-500">01 / MATERIALITY</span>
          <h3 className="text-xl font-bold text-[var(--text-primary)]">Grade 5 Aerospace Titanium</h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            We carve our housings from solid billets of pure titanium and 6063 aerospace aluminum, creating unyielding structural resonance and generational longevity.
          </p>
        </div>

        <div className="p-8 rounded-3xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4">
          <span className="text-xs font-mono font-bold text-blue-500">02 / ACOUSTICS</span>
          <h3 className="text-xl font-bold text-[var(--text-primary)]">Planar Magnetic Fidelity</h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            Our drivers utilize sub-micron etched diaphragms suspended between neodymium magnetic arrays, reproducing frequencies from 5Hz to 45kHz with zero harmonic distortion.
          </p>
        </div>

        <div className="p-8 rounded-3xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4" id="sustainability">
          <span className="text-xs font-mono font-bold text-blue-500">03 / SUSTAINABILITY</span>
          <h3 className="text-xl font-bold text-[var(--text-primary)]">Closed-Loop Architecture</h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            Every screw and modular battery cell can be serviced by our certified concierge team. 100% of our metals and packaging are sustainably sourced and infinitely recyclable.
          </p>
        </div>
      </div>

      {/* Quotes & Press */}
      <div className="max-w-4xl mx-auto text-center space-y-6 py-8" id="press">
        <span
          className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block"
          style={{ color: accentColor }}
        >
          CRITICAL ACCLAIM
        </span>
        <blockquote className="text-xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight leading-snug">
          "{storeName} has accomplished what the rest of the tech industry thought was impossible: constructing hardware that feels as eternal and coveted as a Patek Philippe."
        </blockquote>
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
          — International Journal of Industrial Design & Architecture
        </p>
      </div>

      {/* Interactive CTA Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-subtle)] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-mono uppercase tracking-widest text-blue-500 font-bold block">
            NEXT-GENERATION CATALOG
          </span>
          <h3 className="text-2xl font-bold text-[var(--text-primary)]">
            Experience {storeName} Instruments Firsthand
          </h3>
          <p className="text-xs text-[var(--text-secondary)] max-w-lg">
            Every model includes complimentary white-glove shipping, an evaluation trial, and a 2-year bespoke warranty.
          </p>
        </div>

        <button
          onClick={() => navigateToShop()}
          className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all cursor-pointer flex-shrink-0"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
