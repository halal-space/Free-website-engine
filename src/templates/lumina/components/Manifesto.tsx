'use client';

import React from 'react';

interface ManifestoProps {
  accentColor?: string;
}

export const Manifesto: React.FC<ManifestoProps> = ({ accentColor = '#C5A880' }) => {
  return (
    <section id="manifesto" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E3DA]">
      <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-[10px] tracking-ultra-wide uppercase font-medium">
          <span style={{ color: accentColor }}>Maison Manifesto</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-light text-[#0C0C0D] leading-snug tracking-tight">
          “We do not design for the season. We engineer permanent monolithic forms in silence.”
        </h2>
        <p className="text-xs sm:text-sm text-[#52525B] max-w-2xl mx-auto leading-relaxed font-light">
          Founded upon architectural restraint and radical material purity, Atelier Vélène eliminates superfluous ornament in favor of sculptural volume, un-dyed virgin fibers, and generational European hand-craftsmanship.
        </p>

        <div className="pt-6 flex items-center justify-center gap-8 text-[11px] font-mono uppercase text-[#71717A] tracking-wider flex-wrap">
          <span>Paris Salons</span>
          <span style={{ color: accentColor }}>•</span>
          <span>Biella Weaving</span>
          <span style={{ color: accentColor }}>•</span>
          <span>Como Silks</span>
          <span style={{ color: accentColor }}>•</span>
          <span>Florence Leather</span>
        </div>
      </div>
    </section>
  );
};
