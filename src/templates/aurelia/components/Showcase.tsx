'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCw, ArrowRight } from 'lucide-react';
import { aureliaProducts } from '../data';
import { buttonClasses } from './ui/Button';
import { formatPrice, cn } from '../lib/utils';

const AUDIO_COLORS = [
  { id: 'obsidian', name: 'Obsidian Black', hex: '#0b0b0d', bgClass: 'bg-[#0b0b0d]' },
  { id: 'silver', name: 'Titanium Silver', hex: '#c9cbd1', bgClass: 'bg-[#c9cbd1]' },
  { id: 'espresso', name: 'Espresso', hex: '#3b2b23', bgClass: 'bg-[#3b2b23]' },
];

export function Showcase() {
  const product = aureliaProducts[1]; // Aura Pro
  const [activeColor, setActiveColor] = useState(AUDIO_COLORS[0]);
  const [soundActive, setSoundActive] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotY, setRotY] = useState(0);

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setRotY((prev) => (prev + 0.6) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [autoRotate]);

  return (
    <section id="showcase" className="relative overflow-hidden py-20 lg:py-28 border-t border-line">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left Column: 3D Interactive Acoustic Studio */}
        <div className="relative order-1">
          <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-accent/15 blur-[90px]" aria-hidden="true" />

          {/* Interactive Headphones Viewport */}
          <div className="relative h-[480px] w-full overflow-hidden rounded-panel border border-white/10 bg-surface-3/40 shadow-panel backdrop-blur-md sm:h-[540px] lg:h-[600px] flex items-center justify-center select-none">
            {/* Top Floating Badge */}
            <div className="pointer-events-none absolute left-5 top-5 z-20 flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-obsidian/75 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-accent backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                3D Acoustic Studio
              </span>
            </div>

            {/* Quick Actions HUD */}
            <div className="absolute right-5 top-5 z-20 flex items-center gap-2">
              <button
                onClick={() => setSoundActive(!soundActive)}
                title={soundActive ? 'Disable Sound Aura' : 'Enable Sound Aura'}
                aria-label="Toggle Sound Aura"
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-btn border backdrop-blur-md transition-all cursor-pointer',
                  soundActive
                    ? 'border-accent bg-accent/20 text-accent ring-1 ring-accent'
                    : 'border-white/10 bg-obsidian/60 text-white/70 hover:border-white/30',
                )}
              >
                {soundActive ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                title="Toggle Auto Rotation"
                aria-label="Toggle Auto Rotation"
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-btn border backdrop-blur-md transition-all cursor-pointer',
                  autoRotate
                    ? 'border-accent bg-accent/20 text-accent ring-1 ring-accent'
                    : 'border-white/10 bg-obsidian/60 text-white/70 hover:border-white/30',
                )}
              >
                <RotateCw className="h-4 w-4" />
              </button>
            </div>

            {/* Acoustic Waves Animation */}
            {soundActive && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="h-72 w-72 rounded-full border border-accent/25 animate-ping opacity-30" />
                <div className="h-56 w-56 rounded-full border border-accent/35 animate-ping opacity-40 delay-300" />
              </div>
            )}

            {/* 3D Visual Stage */}
            <div
              style={{
                transform: `rotateY(${rotY}deg) rotateX(8deg)`,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-64 h-64 flex items-center justify-center transition-transform duration-100"
            >
              <img
                src={product.image}
                alt="AURA PRO Studio Headphones"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              />
            </div>

            {/* Bottom Color Chooser & Drag Guide */}
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between border-t border-white/10 bg-gradient-to-t from-obsidian/90 to-transparent p-5">
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-surface-2/70 p-1.5 backdrop-blur-md">
                {AUDIO_COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveColor(c)}
                    title={c.name}
                    aria-label={`Select ${c.name}`}
                    className={cn(
                      'h-6 w-6 rounded-full border transition-all cursor-pointer',
                      c.bgClass,
                      activeColor.id === c.id
                        ? 'border-white scale-110 ring-2 ring-accent'
                        : 'border-white/20 opacity-70 hover:opacity-100',
                    )}
                  />
                ))}
              </div>
              <p className="text-[11px] font-medium text-white/60 backdrop-blur-xs">
                Interactive 360° Studio
              </p>
            </div>
          </div>

          {/* Floating Studio Badge */}
          <div className="absolute -bottom-6 right-6 z-20 rounded-panel border border-line bg-raised px-5 py-4 shadow-lift">
            <p className="label-caps">In the studio</p>
            <p className="mt-1 font-display text-lg font-semibold text-ink">Editor's Choice 2026</p>
          </div>
        </div>

        {/* Right Column: Specs & Copy */}
        <div className="order-2">
          <p className="label-caps mb-4 flex items-center gap-2.5">
            <span className="h-px w-8 bg-accent" />
            Flagship Audio
          </p>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
            AURA PRO
          </h2>
          <p className="mt-3 font-display text-xl font-medium text-accent">Immersive sound. Reimagined.</p>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink-muted">
            {product.description}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-line pt-8">
            {product.specs.map((s) => (
              <div key={s.label}>
                <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">{s.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <span className="font-display text-3xl font-bold text-ink tabular">{formatPrice(product.price)}</span>
            <a href="#featured" className={buttonClasses({ size: 'lg' })}>
              Explore Product
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
