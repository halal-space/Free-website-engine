/**
 * Aether (Gadget Store 2) seed preset — minimalist tech with GSAP animations.
 *
 * Cleaner, more whitespace-heavy design compared to Aurelia. This is the
 * template with Three.js/GSAP integration (3D product viewer).
 */

import type { StoreConfig } from '../../types/store';
import type { Product } from '../../types/product';

/** Aether store configuration — minimal, light, modern. */
export const aetherConfig: StoreConfig = {
  id: 'demo-aether',
  name: 'Aether Audio',
  tagline: 'Sound, redefined',
  templateId: 'gadget_aether',
  domain: 'demo-aether',
  customDomain: null,
  theme: {
    fontPrimary: "'Inter Variable', sans-serif",
    fontDisplay: "'Manrope Variable', sans-serif",
    colorBackground: '#ffffff',
    colorSurface: '#f8f8f8',
    colorText: '#111111',
    colorTextMuted: '#666666',
    colorPrimary: '#000000',
    colorPrimaryForeground: '#ffffff',
    colorBorder: '#e5e5e5',
    colorAccent: '#0066ff',
    borderRadius: '0.5rem',
    supportsDarkMode: true,
    darkOverrides: {
      colorBackground: '#050505',
      colorSurface: '#111111',
      colorText: '#f5f5f5',
      colorTextMuted: '#999999',
      colorPrimary: '#ffffff',
      colorPrimaryForeground: '#000000',
      colorBorder: '#222222',
      colorAccent: '#3388ff',
    },
  },
  sections: [
    {
      blockId: 'sec_hero_01',
      componentId: 'gadget:hero_split',
      order: 1,
      hidden: false,
      props: {
        title: 'Pure Sound',
        subtitle: 'Experience audio the way it was meant to be heard',
        ctaText: 'Explore',
        ctaLink: '/shop',
        alignment: 'left',
      },
    },
    {
      blockId: 'sec_products_01',
      componentId: 'shared:product_grid',
      order: 2,
      hidden: false,
      props: {
        title: 'New Arrivals',
        columns: 3,
      },
      dataSource: {
        type: 'products',
        filter: 'new-arrivals',
        limit: 6,
      },
    },
    {
      blockId: 'sec_products_02',
      componentId: 'shared:product_grid',
      order: 3,
      hidden: false,
      props: {
        title: 'Best Sellers',
        columns: 3,
      },
      dataSource: {
        type: 'products',
        filter: 'best-sellers',
        limit: 6,
      },
    },
  ],
  metadata: {
    favicon: '/favicon.ico',
    seoTitle: 'Aether Audio — Sound, Redefined',
    seoDescription: 'Premium audio equipment designed for purists',
    ogImage: '/og-image.png',
  },
};

/** Aether demo product catalog. */
export const aetherProducts: Product[] = [
  {
    id: 'aeth-001',
    storeId: 'demo-aether',
    slug: 'echo-studio-earbuds',
    title: 'Echo Studio Earbuds',
    price: 249,
    currency: 'USD',
    description: 'True wireless earbuds with adaptive noise cancellation and lossless audio.',
    images: [
      { url: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=800', alt: 'Echo Studio Earbuds' },
    ],
    category: 'earbuds',
    categoryLabel: 'Earbuds',
    availability: 'in-stock',
    stockCount: 56,
    badges: ['new', 'best-seller'],
    isNew: true,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 178,
    brand: 'Aether',
    colors: [
      { name: 'Graphite', hex: '#333333', image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400' },
      { name: 'Pearl', hex: '#f0ece2', image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400' },
    ],
    features: [
      { icon: 'Zap', title: 'Adaptive ANC', description: 'Real-time noise adjustment' },
      { icon: 'Music', title: 'Lossless Audio', description: '24-bit/96kHz' },
    ],
  },
  {
    id: 'aeth-002',
    storeId: 'demo-aether',
    slug: 'wave-portable-speaker',
    title: 'Wave Portable Speaker',
    price: 129,
    currency: 'USD',
    description: 'IPX7 waterproof portable speaker with 20-hour battery and multi-connect.',
    images: [
      { url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800', alt: 'Wave Portable Speaker' },
    ],
    category: 'speakers',
    categoryLabel: 'Speakers',
    availability: 'in-stock',
    stockCount: 31,
    badges: ['best-seller'],
    isFeatured: true,
    rating: 4.6,
    reviewCount: 94,
    brand: 'Aether',
  },
  {
    id: 'aeth-003',
    storeId: 'demo-aether',
    slug: 'horizon-over-ear',
    title: 'Horizon Over-Ear',
    price: 399,
    currency: 'USD',
    description: 'Audiophile-grade open-back headphones with planar magnetic drivers.',
    images: [
      { url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800', alt: 'Horizon Over-Ear headphones' },
    ],
    category: 'headphones',
    categoryLabel: 'Headphones',
    availability: 'low-stock',
    stockCount: 3,
    badges: ['new'],
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 12,
    brand: 'Aether',
    variants: [
      { id: 'v1', label: 'Wired', price: 399, inStock: true, specsSummary: '3.5mm + balanced XLR' },
      { id: 'v2', label: 'Wireless', price: 449, inStock: true, specsSummary: 'Bluetooth 5.3 + LDAC' },
    ],
  },
];
