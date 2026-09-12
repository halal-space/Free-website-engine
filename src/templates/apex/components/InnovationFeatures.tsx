'use client';

import React from 'react';

const pillars = [
  {
    title: 'Precision Engineering',
    desc: 'CNC-machined from monolithic Grade 5 titanium and aerospace billet aluminum to micron-level tolerances.',
    metric: '0.01mm Fit'
  },
  {
    title: 'Intelligent Neural Silicon',
    desc: 'Custom on-device neural processing engines continuously profile ear geometry and environmental acoustics.',
    metric: '45 TOPS'
  },
  {
    title: 'Aerospace Materials',
    desc: 'Synthetic sapphire crystal, full-grain Scandinavian lambskin, and liquid-metal thermal dissipators.',
    metric: '9 Mohs Hardness'
  },
  {
    title: 'Circular Architecture',
    desc: 'Modular internal components designed for lifelong serviceability and 100% closed-loop recycled metallurgy.',
    metric: '100% Recyclable'
  }
];

interface InnovationFeaturesProps {
  accentColor?: string;
}

export const InnovationFeatures: React.FC<InnovationFeaturesProps> = ({
  accentColor = '#3b82f6',
}) => {
  return (
    <section id="innovation" className="py-24 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span
            className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block"
            style={{ color: accentColor }}
          >
            INNOVATION ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Why AETHER is Different
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            We merge extreme computational science with pure material authenticity to construct objects that elevate daily existence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="p-8 rounded-3xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col justify-between space-y-6 hover:border-[var(--border-medium)]"
            >
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-blue-400">
                  0{idx + 1}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">Benchmark</span>
                <span className="text-xs font-mono font-bold text-[var(--text-primary)]">{pillar.metric}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
