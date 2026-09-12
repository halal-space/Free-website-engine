'use client';

import React from 'react';
import { products } from '../products';
import { useCartStore } from '../stores/cartStore';
import { useUIStore } from '../stores/uiStore';

interface EditorialShowcaseProps {
  accentColor?: string;
}

export const EditorialShowcase: React.FC<EditorialShowcaseProps> = ({
  accentColor = '#3b82f6',
}) => {
  const product = products[0]; // Aura Pro
  const { addItem } = useCartStore();

  const handleQuickBuy = () => {
    addItem(product, product.colors[0], product.variants?.[0], 1);
  };

  return (
    <section id="editorial" className="py-24 border-b border-[var(--border-subtle)] relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Ambient Lighting */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-20"
            style={{ backgroundColor: accentColor }}
          ></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Large Editorial Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black/40 border border-[var(--border-subtle)] shadow-2xl">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full luxury-glass border border-white/20 text-[10px] font-mono uppercase tracking-widest text-white">
                  <span>Titanium & Lambskin</span>
                </div>
              </div>
            </div>

            {/* Right: Editorial Narrative & Specifications */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span
                  className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block mb-2"
                  style={{ color: accentColor }}
                >
                  ENGINEERING SPOTLIGHT
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
                  AURA PRO
                </h2>
                <p className="text-lg sm:text-xl text-[var(--text-secondary)] font-medium mt-1">
                  Immersive sound. Reimagined.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                Forged with bespoke 45mm planar magnetic transducers and custom neural DSP calibration, the Aura Pro renders acoustic recordings with atomic transparency. Real-time acoustic geometry profiling eliminates ambient distortion.
              </p>

              {/* Key Specifications Grid */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-[var(--border-subtle)]">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">Acoustic Drivers</span>
                  <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">45mm Planar Magnetic</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">Frequency Response</span>
                  <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">5Hz – 45,000Hz Ultra-Wide</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">Battery Endurance</span>
                  <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">42 Hours (Neural ANC)</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">Chassis Materials</span>
                  <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">Grade 5 CNC Titanium</span>
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">Investment</span>
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)]">
                    ${product.price.toLocaleString()} USD
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleQuickBuy}
                    className="flex-1 sm:flex-none px-7 py-3.5 rounded-xl text-white text-xs font-bold uppercase tracking-widest shadow-lg transition-all text-center cursor-pointer"
                    style={{
                      backgroundColor: accentColor,
                      boxShadow: `0 10px 25px -5px ${accentColor}40`
                    }}
                  >
                    Add to Bag
                  </button>
                  <button
                    onClick={() => useUIStore.getState().navigateToShop()}
                    className="px-5 py-3.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] text-xs font-bold uppercase tracking-wider transition-colors text-center cursor-pointer"
                  >
                    Full Lineup
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
