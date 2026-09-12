'use client';

import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { buttonClasses } from './ui/Button';
import { Hero3DStage } from './Hero3DStage';
import { u } from '../data';

interface HeroProps {
  storeName?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  ctaText?: string;
}

export function Hero({
  storeName = 'AURELIA',
  heroTitle = 'Technology,\nRefined.',
  heroSubtitle = 'Precision-engineered gadgets designed for people who expect more from technology.',
  ctaText = 'Explore Collection',
}: HeroProps) {
  const bg = u('photo-1511707171634-5f897ff02aa9', { w: 1600, h: 900, q: 60 });

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-obsidian">
      {/* Background Image & Gradient Scrims */}
      <div className="absolute inset-0">
        <img
          src={bg}
          alt=""
          aria-hidden="true"
          width="1600"
          height="900"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/75 to-obsidian/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/60" />
      </div>

      {/* Ambient Glows */}
      <div
        className="animate-drift absolute -right-24 top-24 h-72 w-72 rounded-full bg-accent/20 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="animate-drift absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-accent/10 blur-[120px]"
        style={{ animationDelay: '-9s' }}
        aria-hidden="true"
      />

      <div className="light-sweep" aria-hidden="true" />

      {/* Hero Content Container */}
      <div className="container-site relative z-10 grid items-center gap-10 py-28 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
            <span className="h-px w-8 bg-accent" />
            The {storeName} Collection
          </p>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem] whitespace-pre-line">
            {heroTitle}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
            {heroSubtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#featured" className={buttonClasses({ size: 'xl' })}>
              {ctaText}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#story"
              className="inline-flex h-14 items-center justify-center rounded-btn border border-white/20 px-9 text-base font-medium text-white/90 transition-all duration-200 hover:border-white/50 hover:bg-white/5"
            >
              Discover the Brand
            </a>
          </div>
          <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-3 text-xs text-white/50">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Flagship lineup 2026
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Free 2-day shipping
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> 30-day returns
            </li>
          </ul>
        </div>

        {/* 3D Studio Stage */}
        <Hero3DStage />
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <a
          href="#categories"
          aria-label="Scroll to categories"
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5 transition-colors hover:border-white/40"
        >
          <span className="h-2 w-1 animate-bounce rounded-full bg-white/70" />
        </a>
      </div>
    </section>
  );
}
