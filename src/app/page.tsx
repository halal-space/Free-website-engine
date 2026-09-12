'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Smartphone,
  Shirt,
  Utensils,
  Maximize2,
  Minimize2,
  RotateCcw,
  Monitor,
  Tablet,
  Check,
  Eye,
  Sliders,
} from 'lucide-react';
import { AureliaStoreView } from '../templates/aurelia/AureliaStoreView';
import { LuminaStoreView } from '../templates/lumina/LuminaStoreView';
import { ApexStoreView } from '../templates/apex/ApexStoreView';

type TemplateId = 'aurelia' | 'lumina' | 'savory' | 'apex';
type ViewportMode = 'desktop' | 'tablet' | 'mobile';

const DEFAULT_AURELIA_CONFIG = {
  storeName: 'AURELIA',
  tagline: 'Technology, Refined.',
  heroTitle: 'Technology,\nRefined.',
  heroSubtitle: 'Precision-engineered gadgets designed for people who expect more from technology.',
  ctaText: 'Explore Collection',
  accentColor: '#5478ff',
};

const DEFAULT_LUMINA_CONFIG = {
  storeName: 'ATELIER VÉLÈNE',
  tagline: 'Paris · Milan · New York',
  heroTitle: 'Defined by Detail.',
  heroSubtitle: 'Masterfully sculpted from 750gsm double-faced Mongolian cashmere and precision-tailored with architectural peak lapels. A study in silent luxury and structural permanence.',
  ctaText: 'Inspect Garment',
  accentColor: '#C5A880',
};

const DEFAULT_APEX_CONFIG = {
  storeName: 'AETHER',
  tagline: 'LABORATORIES',
  heroTitle: 'Technology,\nRefined.',
  heroSubtitle: 'Precision-engineered gadgets designed for people who expect more from technology. Bespoke acoustics, monolithic titanium, and neural silicon.',
  ctaText: 'Explore Collection',
  accentColor: '#3b82f6',
};

const AURELIA_COLOR_PRESETS = [
  { label: 'Aurelia Blue', hex: '#5478ff' },
  { label: 'Cyan Glow', hex: '#00e5ff' },
  { label: 'Titanium Purple', hex: '#8b5cf6' },
  { label: 'Emerald Green', hex: '#10b981' },
  { label: 'Amber Gold', hex: '#f59e0b' },
  { label: 'Crimson Red', hex: '#f43f5e' },
];

const LUMINA_COLOR_PRESETS = [
  { label: 'Atelier Gold', hex: '#C5A880' },
  { label: 'Antique Bronze', hex: '#8C7355' },
  { label: 'Obsidian Noir', hex: '#0C0C0D' },
  { label: 'Slate Taupe', hex: '#4A4643' },
  { label: 'Biella Olive', hex: '#7D8471' },
  { label: 'Tuscan Earth', hex: '#8A4B38' },
];

const APEX_COLOR_PRESETS = [
  { label: 'Electric Blue', hex: '#3b82f6' },
  { label: 'Cyan Laser', hex: '#06b6d4' },
  { label: 'Obsidian Violet', hex: '#8b5cf6' },
  { label: 'Titanium Platinum', hex: '#94a3b8' },
  { label: 'Emerald Circuit', hex: '#10b981' },
  { label: 'Crimson Plasma', hex: '#ef4444' },
];

export default function StorefrontEnginePage() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>('aurelia');
  const [isGoLive, setIsGoLive] = useState(false);
  const [viewport, setViewport] = useState<ViewportMode>('desktop');

  // Dynamic Content State
  const [storeName, setStoreName] = useState(DEFAULT_AURELIA_CONFIG.storeName);
  const [tagline, setTagline] = useState(DEFAULT_AURELIA_CONFIG.tagline);
  const [heroTitle, setHeroTitle] = useState(DEFAULT_AURELIA_CONFIG.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(DEFAULT_AURELIA_CONFIG.heroSubtitle);
  const [ctaText, setCtaText] = useState(DEFAULT_AURELIA_CONFIG.ctaText);
  const [accentColor, setAccentColor] = useState(DEFAULT_AURELIA_CONFIG.accentColor);

  const handleSwitchTemplate = (template: TemplateId) => {
    setActiveTemplate(template);
    if (template === 'aurelia') {
      setStoreName(DEFAULT_AURELIA_CONFIG.storeName);
      setTagline(DEFAULT_AURELIA_CONFIG.tagline);
      setHeroTitle(DEFAULT_AURELIA_CONFIG.heroTitle);
      setHeroSubtitle(DEFAULT_AURELIA_CONFIG.heroSubtitle);
      setCtaText(DEFAULT_AURELIA_CONFIG.ctaText);
      setAccentColor(DEFAULT_AURELIA_CONFIG.accentColor);
    } else if (template === 'lumina') {
      setStoreName(DEFAULT_LUMINA_CONFIG.storeName);
      setTagline(DEFAULT_LUMINA_CONFIG.tagline);
      setHeroTitle(DEFAULT_LUMINA_CONFIG.heroTitle);
      setHeroSubtitle(DEFAULT_LUMINA_CONFIG.heroSubtitle);
      setCtaText(DEFAULT_LUMINA_CONFIG.ctaText);
      setAccentColor(DEFAULT_LUMINA_CONFIG.accentColor);
    } else if (template === 'apex') {
      setStoreName(DEFAULT_APEX_CONFIG.storeName);
      setTagline(DEFAULT_APEX_CONFIG.tagline);
      setHeroTitle(DEFAULT_APEX_CONFIG.heroTitle);
      setHeroSubtitle(DEFAULT_APEX_CONFIG.heroSubtitle);
      setCtaText(DEFAULT_APEX_CONFIG.ctaText);
      setAccentColor(DEFAULT_APEX_CONFIG.accentColor);
    }
  };

  const resetDefaults = () => {
    if (activeTemplate === 'lumina') {
      setStoreName(DEFAULT_LUMINA_CONFIG.storeName);
      setTagline(DEFAULT_LUMINA_CONFIG.tagline);
      setHeroTitle(DEFAULT_LUMINA_CONFIG.heroTitle);
      setHeroSubtitle(DEFAULT_LUMINA_CONFIG.heroSubtitle);
      setCtaText(DEFAULT_LUMINA_CONFIG.ctaText);
      setAccentColor(DEFAULT_LUMINA_CONFIG.accentColor);
    } else if (activeTemplate === 'apex') {
      setStoreName(DEFAULT_APEX_CONFIG.storeName);
      setTagline(DEFAULT_APEX_CONFIG.tagline);
      setHeroTitle(DEFAULT_APEX_CONFIG.heroTitle);
      setHeroSubtitle(DEFAULT_APEX_CONFIG.heroSubtitle);
      setCtaText(DEFAULT_APEX_CONFIG.ctaText);
      setAccentColor(DEFAULT_APEX_CONFIG.accentColor);
    } else {
      setStoreName(DEFAULT_AURELIA_CONFIG.storeName);
      setTagline(DEFAULT_AURELIA_CONFIG.tagline);
      setHeroTitle(DEFAULT_AURELIA_CONFIG.heroTitle);
      setHeroSubtitle(DEFAULT_AURELIA_CONFIG.heroSubtitle);
      setCtaText(DEFAULT_AURELIA_CONFIG.ctaText);
      setAccentColor(DEFAULT_AURELIA_CONFIG.accentColor);
    }
  };

  const currentPresets =
    activeTemplate === 'lumina'
      ? LUMINA_COLOR_PRESETS
      : activeTemplate === 'apex'
      ? APEX_COLOR_PRESETS
      : AURELIA_COLOR_PRESETS;

  // 1. Full-screen "Go Live" mode
  if (isGoLive) {
    return (
      <div className="relative min-h-screen bg-[#0a0a0c]">
        {/* Floating Exit Go-Live Action Bar */}
        <div className="fixed top-5 right-5 z-[999] flex items-center gap-2 rounded-full border border-white/20 bg-black/85 p-1.5 shadow-2xl backdrop-blur-xl transition-all hover:bg-black">
          <span className="flex items-center gap-1.5 pl-3 pr-2 text-xs font-medium text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            GO LIVE PREVIEW • {activeTemplate.toUpperCase()}
          </span>
          <button
            onClick={() => setIsGoLive(false)}
            className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-white/30 cursor-pointer"
          >
            <Minimize2 className="h-3.5 w-3.5" />
            Exit Fullscreen
          </button>
        </div>

        {activeTemplate === 'aurelia' && (
          <AureliaStoreView
            storeName={storeName}
            tagline={tagline}
            heroTitle={heroTitle}
            heroSubtitle={heroSubtitle}
            ctaText={ctaText}
            accentColor={accentColor}
            isInsidePreview={false}
          />
        )}

        {activeTemplate === 'lumina' && (
          <LuminaStoreView
            storeName={storeName}
            tagline={tagline}
            heroTitle={heroTitle}
            heroSubtitle={heroSubtitle}
            ctaText={ctaText}
            accentColor={accentColor}
            isInsidePreview={false}
          />
        )}

        {activeTemplate === 'apex' && (
          <ApexStoreView
            storeName={storeName}
            tagline={tagline}
            heroTitle={heroTitle}
            heroSubtitle={heroSubtitle}
            ctaText={ctaText}
            accentColor={accentColor}
            isInsidePreview={false}
          />
        )}

        {activeTemplate !== 'aurelia' && activeTemplate !== 'lumina' && activeTemplate !== 'apex' && (
          <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center text-white">
            <h2 className="text-2xl font-bold uppercase tracking-wider">{activeTemplate} Template</h2>
            <p className="mt-2 text-white/60">Currently focusing 1:1 on Aurelia & Lumina. Click below to return.</p>
            <button
              onClick={() => handleSwitchTemplate('lumina')}
              className="mt-6 rounded-btn bg-accent px-6 py-2.5 text-sm font-semibold text-white cursor-pointer"
            >
              Switch to Lumina
            </button>
          </div>
        )}
      </div>
    );
  }

  // 2. Editor & Preview Workspace Mode (Locked to 100vh with independent scroll areas)
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#0d0e12] text-[#e2e8f0]">
      {/* Top Header Bar (h-14) */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#1f222e] bg-[#11131a] px-6 z-30">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 font-bold text-white shadow-md">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-white">Storefront Engine Studio</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold border ${
                  activeTemplate === 'lumina'
                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}
              >
                1:1 {activeTemplate === 'lumina' ? 'Atelier Vélène (Lumina)' : 'Aurelia'} Active
              </span>
            </div>
          </div>
        </div>

        {/* Viewport Width Controls */}
        <div className="hidden sm:flex items-center gap-1 rounded-lg border border-[#262a38] bg-[#161922] p-1">
          <button
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
              viewport === 'desktop' ? 'bg-[#2b3042] text-white shadow-xs' : 'text-[#8b92a5] hover:text-white'
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            Desktop
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
              viewport === 'tablet' ? 'bg-[#2b3042] text-white shadow-xs' : 'text-[#8b92a5] hover:text-white'
            }`}
          >
            <Tablet className="h-3.5 w-3.5" />
            Tablet
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
              viewport === 'mobile' ? 'bg-[#2b3042] text-white shadow-xs' : 'text-[#8b92a5] hover:text-white'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            Mobile
          </button>
        </div>

        {/* Go Live Fullscreen Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsGoLive(true)}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] hover:shadow-blue-500/40 cursor-pointer"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Go Live Preview
          </button>
        </div>
      </header>

      {/* Main Workspace: Left Controls (scrollable) + Right Preview (scrollable) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Dynamic Content Editor Panel */}
        <aside className="w-80 sm:w-96 shrink-0 h-full overflow-y-auto border-r border-[#1f222e] bg-[#11131a] p-5 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1f222e] pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-blue-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">Live Content Editor</h2>
            </div>
            <button
              onClick={resetDefaults}
              title="Reset to template defaults"
              className="flex items-center gap-1 text-[11px] text-[#8b92a5] hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          </div>

          <div className="space-y-4 text-xs">
            {/* Store Name */}
            <div>
              <label className="block font-medium text-[#9ba3b8] mb-1.5">Store Brand Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full rounded-md border border-[#262a38] bg-[#161922] px-3 py-2 text-sm text-white placeholder-[#5a6275] focus:border-blue-500 transition-colors"
                placeholder={activeTemplate === 'lumina' ? 'ATELIER VÉLÈNE' : 'AURELIA'}
              />
            </div>

            {/* Tagline */}
            <div>
              <label className="block font-medium text-[#9ba3b8] mb-1.5">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full rounded-md border border-[#262a38] bg-[#161922] px-3 py-2 text-sm text-white placeholder-[#5a6275] focus:border-blue-500 transition-colors"
                placeholder={activeTemplate === 'lumina' ? 'Paris · Milan · New York' : 'Technology, Refined.'}
              />
            </div>

            {/* Hero Title */}
            <div>
              <label className="block font-medium text-[#9ba3b8] mb-1.5">Hero Headline (supports newlines)</label>
              <textarea
                rows={2}
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full rounded-md border border-[#262a38] bg-[#161922] px-3 py-2 text-sm text-white placeholder-[#5a6275] focus:border-blue-500 transition-colors resize-none"
                placeholder={activeTemplate === 'lumina' ? 'Defined by Detail.' : 'Technology,\nRefined.'}
              />
            </div>

            {/* Hero Subtitle */}
            <div>
              <label className="block font-medium text-[#9ba3b8] mb-1.5">Hero Subtitle</label>
              <textarea
                rows={3}
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full rounded-md border border-[#262a38] bg-[#161922] px-3 py-2 text-sm text-white placeholder-[#5a6275] focus:border-blue-500 transition-colors resize-none"
                placeholder="Editorial subtitle..."
              />
            </div>

            {/* CTA Button Text */}
            <div>
              <label className="block font-medium text-[#9ba3b8] mb-1.5">CTA Button Label</label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="w-full rounded-md border border-[#262a38] bg-[#161922] px-3 py-2 text-sm text-white placeholder-[#5a6275] focus:border-blue-500 transition-colors"
                placeholder={activeTemplate === 'lumina' ? 'Inspect Garment' : 'Explore Collection'}
              />
            </div>

            {/* Accent Theme Color */}
            <div>
              <label className="block font-medium text-[#9ba3b8] mb-2">Accent Color Palette</label>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="h-8 w-8 cursor-pointer rounded border-0 bg-transparent"
                />
                <input
                  type="text"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-28 rounded-md border border-[#262a38] bg-[#161922] px-2.5 py-1.5 font-mono text-xs text-white"
                />
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {currentPresets.map((preset) => (
                  <button
                    key={preset.hex}
                    onClick={() => setAccentColor(preset.hex)}
                    className={`flex items-center gap-1.5 rounded border px-2 py-1.5 text-[11px] transition-all cursor-pointer ${
                      accentColor === preset.hex
                        ? 'border-white/50 bg-white/10 text-white'
                        : 'border-[#262a38] bg-[#161922] text-[#8b92a5] hover:border-[#383e52]'
                    }`}
                  >
                    <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: preset.hex }} />
                    <span className="truncate">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Side: Live Store Preview Viewport */}
        <main className="flex-1 h-full overflow-hidden bg-[#08090c] p-4 sm:p-6 flex flex-col items-center">
          {/* Simulated Browser Frame */}
          <div
            className={`w-full h-full flex flex-col transition-all duration-300 rounded-xl border border-[#232736] bg-[#0a0a0c] shadow-2xl overflow-hidden ${
              viewport === 'mobile'
                ? 'max-w-[390px]'
                : viewport === 'tablet'
                ? 'max-w-[768px]'
                : 'max-w-full'
            }`}
          >
            {/* Browser Header Bar */}
            <div className="shrink-0 flex items-center justify-between border-b border-[#1f222e] bg-[#12141c] px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#f43f5e]/80" />
                <div className="h-3 w-3 rounded-full bg-[#f59e0b]/80" />
                <div className="h-3 w-3 rounded-full bg-[#10b981]/80" />
              </div>
              <div className="flex items-center gap-2 rounded-md border border-[#232736] bg-[#0a0b10] px-3 py-1 text-xs text-[#8b92a5]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="truncate">
                  {activeTemplate === 'lumina'
                    ? 'https://velene.luxury/'
                    : activeTemplate === 'apex'
                    ? 'https://aether-laboratories.com/'
                    : 'https://aurelia.tech/'}
                </span>
              </div>
              <button
                onClick={() => setIsGoLive(true)}
                className="text-xs text-[#8b92a5] hover:text-white flex items-center gap-1 cursor-pointer"
                title="Open full view"
              >
                <Eye className="h-3.5 w-3.5" />
                Full View
              </button>
            </div>

            {/* Rendered Template View */}
            <div id="store-preview-scroll" className="relative flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
              {activeTemplate === 'aurelia' && (
                <AureliaStoreView
                  storeName={storeName}
                  tagline={tagline}
                  heroTitle={heroTitle}
                  heroSubtitle={heroSubtitle}
                  ctaText={ctaText}
                  accentColor={accentColor}
                  isInsidePreview={true}
                />
              )}

              {activeTemplate === 'lumina' && (
                <LuminaStoreView
                  storeName={storeName}
                  tagline={tagline}
                  heroTitle={heroTitle}
                  heroSubtitle={heroSubtitle}
                  ctaText={ctaText}
                  accentColor={accentColor}
                  isInsidePreview={true}
                />
              )}

              {activeTemplate === 'apex' && (
                <ApexStoreView
                  storeName={storeName}
                  tagline={tagline}
                  heroTitle={heroTitle}
                  heroSubtitle={heroSubtitle}
                  ctaText={ctaText}
                  accentColor={accentColor}
                  isInsidePreview={true}
                />
              )}

              {activeTemplate !== 'aurelia' && activeTemplate !== 'lumina' && activeTemplate !== 'apex' && (
                <div className="flex min-h-[600px] flex-col items-center justify-center p-8 text-center text-white">
                  <div className="rounded-full bg-blue-500/10 p-4 text-blue-400 mb-4">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-wider">{activeTemplate} Storefront</h3>
                  <p className="mt-2 max-w-md text-sm text-[#8b92a5]">
                    We are completing each template 1:1. Select Aurelia, Lumina, or Apex below to view the live 1:1 replicas.
                  </p>
                  <button
                    onClick={() => handleSwitchTemplate('apex')}
                    className="mt-6 rounded-btn bg-accent px-5 py-2 text-xs font-semibold text-white cursor-pointer"
                  >
                    View Apex Template
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Underneath Store Switcher Bar (h-[3.75rem] placed underneath as requested) */}
      <footer id="template-switcher-bar" className="flex h-[3.75rem] shrink-0 items-center justify-between border-t border-[#1f222e] bg-[#11131a] px-6 z-30">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8b92a5]">Switch Store Template:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Aurelia */}
          <button
            onClick={() => handleSwitchTemplate('aurelia')}
            className={`flex items-center gap-2 rounded-lg border px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTemplate === 'aurelia'
                ? 'border-blue-500 bg-blue-500/15 text-white shadow-sm ring-1 ring-blue-500'
                : 'border-[#262a38] bg-[#161922] text-[#8b92a5] hover:border-[#3b4156] hover:text-white'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5 text-blue-400" />
            <span>Aurelia</span>
            <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[9px] font-bold text-blue-300">1:1 MATCH</span>
          </button>

          {/* Lumina */}
          <button
            onClick={() => handleSwitchTemplate('lumina')}
            className={`flex items-center gap-2 rounded-lg border px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTemplate === 'lumina'
                ? 'border-amber-500 bg-amber-500/15 text-white shadow-sm ring-1 ring-amber-500'
                : 'border-[#262a38] bg-[#161922] text-[#8b92a5] hover:border-[#3b4156] hover:text-white'
            }`}
          >
            <Shirt className="h-3.5 w-3.5 text-amber-400" />
            <span>Lumina (Atelier Vélène)</span>
            <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-300">1:1 MATCH</span>
          </button>

          {/* Savory */}
          <button
            onClick={() => handleSwitchTemplate('savory')}
            className={`flex items-center gap-2 rounded-lg border px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTemplate === 'savory'
                ? 'border-amber-500 bg-amber-500/15 text-white shadow-sm ring-1 ring-amber-500'
                : 'border-[#262a38] bg-[#161922] text-[#8b92a5] hover:border-[#3b4156] hover:text-white'
            }`}
          >
            <Utensils className="h-3.5 w-3.5 text-amber-400" />
            <span>Savory</span>
            <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-[#8b92a5]">Restaurant</span>
          </button>

          {/* Apex */}
          <button
            onClick={() => handleSwitchTemplate('apex')}
            className={`flex items-center gap-2 rounded-lg border px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTemplate === 'apex'
                ? 'border-blue-500 bg-blue-500/15 text-white shadow-sm ring-1 ring-blue-500'
                : 'border-[#262a38] bg-[#161922] text-[#8b92a5] hover:border-[#3b4156] hover:text-white'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5 text-blue-400" />
            <span>Apex (AETHER)</span>
            <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[9px] font-bold text-blue-300">1:1 MATCH</span>
          </button>
        </div>

        <div className="text-xs text-[#5a6275]">
          Template {activeTemplate === 'aurelia' ? '1' : activeTemplate === 'lumina' ? '2' : activeTemplate === 'apex' ? '3' : '4'} of 4 •{' '}
          <span className="text-emerald-400 font-medium">
            {activeTemplate === 'apex'
              ? 'Apex (AETHER) Active'
              : activeTemplate === 'lumina'
              ? 'Lumina (Atelier Vélène) Active'
              : 'Aurelia Active'}
          </span>
        </div>
      </footer>
    </div>
  );
}
