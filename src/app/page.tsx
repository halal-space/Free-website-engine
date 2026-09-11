'use client';

import React, { useState, useEffect } from 'react';
import { getLocalStorePreset } from '../storefront/config/presets';
import type { StoreConfig, TemplateId } from '../storefront/types/store';

interface StoreOption {
  id: string;
  name: string;
  tagline: string;
  templateId: TemplateId;
  badge: string;
  themeType: string;
}

const STORE_OPTIONS: StoreOption[] = [
  {
    id: 'demo-aurelia',
    name: 'Aurelia',
    tagline: 'Precision instruments for the modern era',
    templateId: 'gadget_aurelia',
    badge: '🚀 Dark Tech 3D',
    themeType: 'Futuristic Dark',
  },
  {
    id: 'demo-aether',
    name: 'Aether Audio',
    tagline: 'Sound, redefined with purist engineering',
    templateId: 'gadget_aether',
    badge: '⚡ Minimal Modern',
    themeType: 'Monochrome Light',
  },
  {
    id: 'demo-atelier',
    name: 'Atelier Vélène',
    tagline: 'Timeless elegance, modern sensibility',
    templateId: 'fashion_atelier',
    badge: '💎 Haute Couture',
    themeType: 'Ivory Editorial',
  },
  {
    id: 'demo-ember-oak',
    name: 'Ember & Oak',
    tagline: 'Fire-kissed flavors, oak-aged traditions',
    templateId: 'dining_ember_oak',
    badge: '🍷 Fine Dining',
    themeType: 'Warm Amber Rustic',
  },
];

export default function StorefrontPreviewPage() {
  const [selectedStoreId, setSelectedStoreId] = useState<string>('demo-aurelia');
  const [config, setConfig] = useState<StoreConfig | null>(null);
  const [isLiveMode, setIsLiveMode] = useState<boolean>(false);

  // Editable content state
  const [storeName, setStoreName] = useState<string>('');
  const [storeTagline, setStoreTagline] = useState<string>('');
  const [heroTitle, setHeroTitle] = useState<string>('');
  const [heroSubtitle, setHeroSubtitle] = useState<string>('');
  const [ctaText, setCtaText] = useState<string>('');
  const [ctaLink, setCtaLink] = useState<string>('/shop');
  const [accentColor, setAccentColor] = useState<string>('#274bff');

  // Load store config when selected store changes
  useEffect(() => {
    const loadedConfig = getLocalStorePreset(selectedStoreId);
    if (loadedConfig) {
      setConfig(loadedConfig);
      setStoreName(loadedConfig.name);
      setStoreTagline(loadedConfig.tagline || '');

      const heroSection = loadedConfig.sections.find((s) => s.blockId.includes('hero'));
      const props = heroSection?.props || {};

      setHeroTitle(typeof props.title === 'string' ? props.title : loadedConfig.name);
      setHeroSubtitle(typeof props.subtitle === 'string' ? props.subtitle : (loadedConfig.tagline || ''));
      setCtaText(typeof props.ctaText === 'string' ? props.ctaText : 'Explore Now');
      setCtaLink(typeof props.ctaLink === 'string' ? props.ctaLink : '/shop');
      setAccentColor(loadedConfig.theme.colorAccent || '#274bff');
    }
  }, [selectedStoreId]);

  if (!config) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#94a3b8' }}>
        Loading storefront preset...
      </div>
    );
  }

  const isDark = config.theme.supportsDarkMode && config.templateId.startsWith('gadget');
  const isEditorial = config.templateId === 'fashion_atelier';
  const isDining = config.templateId === 'dining_ember_oak';

  // Preview container dynamic theme styles
  const previewBg = isDark ? '#0a0a0c' : (isDining ? '#faf6f1' : (isEditorial ? '#faf8f5' : '#ffffff'));
  const previewTextColor = isDark ? '#f8fafc' : (isDining ? '#2c1810' : (isEditorial ? '#1a1a1a' : '#0f172a'));
  const previewCardBg = isDark ? '#141419' : '#ffffff';
  const previewBorderColor = isDark ? 'rgba(255,255,255,0.08)' : (isDining ? '#e6ddd3' : (isEditorial ? '#e8e4de' : '#e2e8f0'));
  const previewFont = isDining
    ? "'Cormorant Garamond', Georgia, serif"
    : (isEditorial ? "'Playfair Display', Georgia, serif" : "'Inter', sans-serif");

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0b0f17' }}>
      {/* Top Header / App Bar */}
      {!isLiveMode && (
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 28px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: '#111726',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '18px',
              }}
            >
              S
            </div>
            <div>
              <h1 style={{ fontSize: '16px', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>
                Storefront Engine Playground
              </h1>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                Active: <span style={{ color: '#38bdf8', fontWeight: 500 }}>{config.name}</span> ({config.templateId})
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsLiveMode(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#ffffff',
                padding: '10px 18px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '13px',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#a7f3d0',
                  boxShadow: '0 0 8px #a7f3d0',
                }}
              />
              Go Live (Full View)
            </button>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Floating Exit Button in Live Mode */}
        {isLiveMode && (
          <div
            style={{
              position: 'fixed',
              top: '20px',
              right: '24px',
              zIndex: 9999,
              animation: 'fadeIn 0.3s ease',
            }}
          >
            <button
              onClick={() => setIsLiveMode(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(15, 23, 42, 0.85)',
                color: '#ffffff',
                backdropFilter: 'blur(12px)',
                padding: '10px 20px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
              }}
            >
              ✏️ Exit Live View (Back to Editor)
            </button>
          </div>
        )}

        {/* Input Editing Panel (Hidden in Live Mode) */}
        {!isLiveMode && (
          <div
            style={{
              margin: '20px 24px 0 24px',
              padding: '20px',
              background: '#151b2e',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '15px' }}>⚡</span>
                <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                  Live Content Editor (Type to see real-time updates below)
                </h2>
              </div>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Products excluded as requested</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px',
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Store Name
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: '#0d1322',
                    border: '1px solid #2d3748',
                    color: '#f8fafc',
                    fontSize: '13px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Store Tagline
                </label>
                <input
                  type="text"
                  value={storeTagline}
                  onChange={(e) => setStoreTagline(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: '#0d1322',
                    border: '1px solid #2d3748',
                    color: '#f8fafc',
                    fontSize: '13px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Hero Title
                </label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: '#0d1322',
                    border: '1px solid #2d3748',
                    color: '#f8fafc',
                    fontSize: '13px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Hero Subtitle
                </label>
                <input
                  type="text"
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: '#0d1322',
                    border: '1px solid #2d3748',
                    color: '#f8fafc',
                    fontSize: '13px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: '#0d1322',
                    border: '1px solid #2d3748',
                    color: '#f8fafc',
                    fontSize: '13px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Accent Color
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    style={{
                      width: '42px',
                      height: '35px',
                      borderRadius: '6px',
                      border: '1px solid #2d3748',
                      background: 'none',
                      cursor: 'pointer',
                    }}
                  />
                  <input
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: '#0d1322',
                      border: '1px solid #2d3748',
                      color: '#f8fafc',
                      fontSize: '13px',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visual UI Store Preview Canvas */}
        <div
          style={{
            flex: 1,
            margin: isLiveMode ? '0' : '20px 24px',
            borderRadius: isLiveMode ? '0' : '14px',
            overflow: 'hidden',
            border: isLiveMode ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: isLiveMode ? 'none' : '0 20px 50px rgba(0, 0, 0, 0.5)',
            background: previewBg,
            color: previewTextColor,
            fontFamily: previewFont,
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Mock Browser Top Bar (Editor Mode Only) */}
          {!isLiveMode && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 16px',
                background: isDark ? '#16161d' : '#f1f5f9',
                borderBottom: `1px solid ${previewBorderColor}`,
              }}
            >
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
              </div>
              <div
                style={{
                  flex: 1,
                  maxWidth: '480px',
                  margin: '0 auto',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  background: isDark ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.85)',
                  fontSize: '11px',
                  color: isDark ? '#94a3b8' : '#64748b',
                  textAlign: 'center',
                  fontFamily: 'monospace',
                }}
              >
                https://{config.domain}.storefront.io/
              </div>
              <span style={{ fontSize: '11px', color: isDark ? '#94a3b8' : '#64748b', fontWeight: 500 }}>
                {config.templateId}
              </span>
            </div>
          )}

          {/* Storefront Header */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 40px',
              borderBottom: `1px solid ${previewBorderColor}`,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: isEditorial || isDining ? '26px' : '20px',
                  fontWeight: isEditorial ? 400 : 700,
                  letterSpacing: isEditorial ? '0.12em' : '-0.02em',
                  textTransform: isEditorial ? 'uppercase' : 'none',
                }}
              >
                {storeName}
              </div>
              {storeTagline && (
                <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '2px', fontWeight: 400 }}>
                  {storeTagline}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '28px', fontSize: '13px', fontWeight: 500 }}>
              {isDining ? (
                <>
                  <span style={{ opacity: 0.85 }}>Menu</span>
                  <span style={{ opacity: 0.85 }}>Our Story</span>
                  <span style={{ opacity: 0.85 }}>Catering</span>
                  <span style={{ opacity: 0.85 }}>Reservations</span>
                </>
              ) : isEditorial ? (
                <>
                  <span style={{ opacity: 0.85, textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.08em' }}>Collections</span>
                  <span style={{ opacity: 0.85, textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.08em' }}>Lookbook</span>
                  <span style={{ opacity: 0.85, textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.08em' }}>Maison</span>
                </>
              ) : (
                <>
                  <span style={{ opacity: 0.85 }}>Shop</span>
                  <span style={{ opacity: 0.85 }}>New Arrivals</span>
                  <span style={{ opacity: 0.85 }}>Audio</span>
                  <span style={{ opacity: 0.85 }}>About</span>
                </>
              )}

              <button
                style={{
                  padding: '8px 16px',
                  borderRadius: config.theme.borderRadius || '8px',
                  background: accentColor,
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: isEditorial ? '0.05em' : 'normal',
                }}
              >
                {isDining ? 'Book Table' : 'Cart (0)'}
              </button>
            </div>
          </nav>

          {/* Storefront Hero Stage */}
          <section
            style={{
              padding: isLiveMode ? '90px 40px' : '64px 40px',
              textAlign: isEditorial ? 'center' : 'left',
              maxWidth: '1200px',
              margin: '0 auto',
              width: '100%',
              display: 'flex',
              flexDirection: isEditorial ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '40px',
            }}
          >
            <div style={{ flex: 1, maxWidth: isEditorial ? '800px' : '580px', margin: isEditorial ? '0 auto' : '0' }}>
              <div
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                  border: `1px solid ${previewBorderColor}`,
                  fontSize: '11px',
                  fontWeight: 600,
                  color: accentColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '18px',
                }}
              >
                {config.templateId.replace('_', ' • ')}
              </div>

              <h1
                style={{
                  fontSize: isDining ? '56px' : (isEditorial ? '52px' : '46px'),
                  fontWeight: isEditorial ? 400 : 800,
                  lineHeight: 1.1,
                  letterSpacing: isEditorial ? '0.04em' : '-0.03em',
                  marginBottom: '18px',
                }}
              >
                {heroTitle}
              </h1>

              <p
                style={{
                  fontSize: isDining ? '20px' : '16px',
                  lineHeight: 1.6,
                  opacity: 0.8,
                  marginBottom: '32px',
                  maxWidth: '520px',
                  margin: isEditorial ? '0 auto 32px auto' : '0 0 32px 0',
                }}
              >
                {heroSubtitle}
              </p>

              <div style={{ display: 'flex', gap: '14px', justifyContent: isEditorial ? 'center' : 'flex-start' }}>
                <button
                  style={{
                    padding: '14px 28px',
                    borderRadius: config.theme.borderRadius || '8px',
                    background: accentColor,
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '14px',
                    letterSpacing: isEditorial ? '0.06em' : 'normal',
                    boxShadow: `0 8px 20px -4px ${accentColor}66`,
                  }}
                >
                  {ctaText} →
                </button>
                <button
                  style={{
                    padding: '14px 24px',
                    borderRadius: config.theme.borderRadius || '8px',
                    background: 'transparent',
                    color: previewTextColor,
                    border: `1px solid ${previewBorderColor}`,
                    fontWeight: 500,
                    fontSize: '14px',
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Visual Media Mock Stage */}
            <div
              style={{
                width: isEditorial ? '100%' : '420px',
                height: isEditorial ? '220px' : '320px',
                borderRadius: config.theme.borderRadius || '16px',
                background: isDark
                  ? `radial-gradient(circle at 50% 50%, ${accentColor}22 0%, #121218 80%)`
                  : (isDining
                    ? 'linear-gradient(135deg, #f4ede1 0%, #e6ddd3 100%)'
                    : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'),
                border: `1px solid ${previewBorderColor}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  fontSize: '44px',
                  marginBottom: '12px',
                  filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))',
                }}
              >
                {isDining ? '🔥' : (isEditorial ? '✨' : (config.templateId === 'gadget_aurelia' ? '🎧' : '🔊'))}
              </div>
              <div style={{ fontWeight: 600, fontSize: '15px' }}>
                {isDining ? 'Primal Flame & Ember' : (isEditorial ? 'Autumn Haute Lookbook' : '3D Acoustic Stage')}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                Dynamic Section: {config.sections[0]?.componentId}
              </div>
            </div>
          </section>

          {/* Composed Sections Preview Strip */}
          <section
            style={{
              padding: '40px',
              borderTop: `1px solid ${previewBorderColor}`,
              background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)',
            }}
          >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: accentColor, marginBottom: '20px' }}>
                Configured Sections ({config.sections.length} blocks mapped in registry)
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '16px',
                }}
              >
                {config.sections.map((section, idx) => (
                  <div
                    key={section.blockId}
                    style={{
                      padding: '18px',
                      borderRadius: config.theme.borderRadius || '8px',
                      background: previewCardBg,
                      border: `1px solid ${previewBorderColor}`,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', opacity: 0.6, marginBottom: '8px' }}>
                      <span>Block #{idx + 1}</span>
                      <span>Order: {section.order}</span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>
                      {String(section.props?.title || section.componentId)}
                    </div>
                    <div style={{ fontSize: '11px', fontFamily: 'monospace', color: accentColor }}>
                      {section.componentId}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Minimal Footer */}
          <footer
            style={{
              marginTop: 'auto',
              padding: '24px 40px',
              borderTop: `1px solid ${previewBorderColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              opacity: 0.7,
            }}
          >
            <div>© 2026 {storeName}. Powered by Storefront Engine.</div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>Privacy</span>
              <span>Terms</span>
              <span>Contact</span>
            </div>
          </footer>
        </div>

        {/* Store Switcher Bar Placed Underneath (Hidden in Live Mode) */}
        {!isLiveMode && (
          <div
            style={{
              margin: '0 24px 28px 24px',
              padding: '20px',
              background: '#151b2e',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ fontSize: '14px' }}>🎛️</span>
              <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Store Switcher (Click below to switch store presets)
              </h3>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '12px',
              }}
            >
              {STORE_OPTIONS.map((store) => {
                const isSelected = store.id === selectedStoreId;
                return (
                  <button
                    key={store.id}
                    onClick={() => setSelectedStoreId(store.id)}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '10px',
                      background: isSelected ? 'rgba(59, 130, 246, 0.15)' : '#0d1322',
                      border: isSelected ? '2px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: isSelected ? '#ffffff' : '#94a3b8',
                      textAlign: 'left',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <span style={{ fontWeight: 700, fontSize: '14px', color: isSelected ? '#ffffff' : '#f1f5f9' }}>
                        {store.name}
                      </span>
                      <span style={{ fontSize: '11px', color: isSelected ? '#38bdf8' : '#64748b', fontWeight: 600 }}>
                        {store.badge}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: isSelected ? '#cbd5e1' : '#64748b', lineHeight: 1.3 }}>
                      {store.themeType}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
