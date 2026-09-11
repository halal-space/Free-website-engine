/**
 * Aurelia (Gadget Store 1) seed preset — dark-mode-first tech storefront.
 *
 * Provides a complete StoreConfig and demo products for local development
 * without a database. Actual production content comes from the backend API.
 *
 * Blueprint note: seed data accuracy is verified visually per-template in
 * Blueprint #4, not via automated tests here. This preset establishes the
 * correct structure and representative content.
 */

import type { StoreConfig } from '../../types/store';
import type { Product } from '../../types/product';

/** Aurelia store configuration — dark techy aesthetic with blue accents. */
export const aureliaConfig: StoreConfig = {
  id: 'demo-aurelia',
  name: 'Tech Haven',
  tagline: 'Precision instruments for the modern era',
  templateId: 'gadget_aurelia',
  domain: 'demo-aurelia',
  customDomain: null,
  theme: {
    fontPrimary: "'Inter Variable', sans-serif",
    fontDisplay: "'Manrope Variable', sans-serif",
    colorBackground: '#f7f6f3',
    colorSurface: '#ffffff',
    colorText: '#121214',
    colorTextMuted: '#6f6f78',
    colorPrimary: '#274bff',
    colorPrimaryForeground: '#ffffff',
    colorSecondary: '#1b38d9',
    colorBorder: '#e4e2dc',
    colorAccent: '#274bff',
    borderRadius: '0.625rem',
    supportsDarkMode: true,
    darkOverrides: {
      colorBackground: '#0a0a0b',
      colorSurface: '#18181b',
      colorText: '#fafafa',
      colorTextMuted: '#a1a1aa',
      colorPrimary: '#4d6fff',
      colorPrimaryForeground: '#ffffff',
      colorBorder: '#27272a',
      colorAccent: '#4d6fff',
    },
  },
  sections: [
    {
      blockId: 'sec_hero_01',
      componentId: 'gadget:hero_3d_stage',
      order: 1,
      hidden: false,
      props: {
        title: 'The Future of Sound',
        subtitle: 'Engineered for perfection',
        ctaText: 'Shop Collection',
        ctaLink: '/shop',
      },
    },
    {
      blockId: 'sec_products_01',
      componentId: 'shared:product_grid',
      order: 2,
      hidden: false,
      props: {
        title: 'Featured Products',
        columns: 4,
      },
      dataSource: {
        type: 'products',
        filter: 'featured',
        limit: 8,
      },
    },
    {
      blockId: 'sec_features_01',
      componentId: 'shared:feature_highlights',
      order: 3,
      hidden: false,
      props: {
        title: 'Why Tech Haven',
        items: [
          { icon: 'Shield', title: '2 Year Warranty', description: 'Every product protected' },
          { icon: 'Truck', title: 'Free Shipping', description: 'On orders over $99' },
          { icon: 'RotateCcw', title: '30-Day Returns', description: 'Hassle-free returns' },
        ],
      },
    },
    {
      blockId: 'sec_newsletter_01',
      componentId: 'shared:newsletter_signup',
      order: 4,
      hidden: false,
      props: {
        title: 'Stay Connected',
        subtitle: 'Get the latest drops and exclusive deals',
        placeholder: 'Enter your email',
        ctaText: 'Subscribe',
      },
    },
  ],
  metadata: {
    favicon: '/favicon.ico',
    seoTitle: 'Tech Haven — Precision Instruments',
    seoDescription: 'Premium technology and audio equipment for discerning enthusiasts',
    ogImage: '/og-image.png',
  },
};

/** Aurelia demo product catalog. */
export const aureliaProducts: Product[] = [
  {
    id: 'aur-001',
    storeId: 'demo-aurelia',
    slug: 'quantum-pro-headphones',
    title: 'Quantum Pro Headphones',
    price: 349,
    currency: 'USD',
    description: 'Active noise cancellation with spatial audio and 40-hour battery life.',
    images: [
      { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', alt: 'Quantum Pro Headphones front view' },
      { url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800', alt: 'Quantum Pro Headphones side view' },
    ],
    category: 'audio',
    categoryLabel: 'Audio',
    availability: 'in-stock',
    stockCount: 42,
    badges: ['best-seller'],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 256,
    brand: 'TechHaven Audio',
    tagline: 'Silence the world. Hear your music.',
    technicalSpecs: [
      {
        category: 'Audio',
        items: [
          { label: 'Driver Size', value: '40mm' },
          { label: 'Frequency Response', value: '20Hz - 40kHz' },
          { label: 'Impedance', value: '32Ω' },
        ],
      },
      {
        category: 'Battery',
        items: [
          { label: 'Battery Life', value: '40 hours' },
          { label: 'Charging', value: 'USB-C, 10 min = 3 hrs' },
        ],
      },
    ],
    features: [
      { icon: 'Headphones', title: 'Spatial Audio', description: 'Immersive 3D soundscape' },
      { icon: 'BatteryFull', title: '40hr Battery', description: 'All-day listening' },
      { icon: 'Mic', title: 'Crystal Calls', description: '6-mic noise cancellation' },
    ],
    inBox: ['Quantum Pro Headphones', 'USB-C Cable', 'Carrying Case', 'Audio Cable 3.5mm'],
    colors: [
      { id: 'c1', name: 'Midnight Black', hex: '#1a1a1a' },
      { id: 'c2', name: 'Arctic White', hex: '#f5f5f5' },
      { id: 'c3', name: 'Navy Blue', hex: '#1e3a5f' },
    ],
  },
  {
    id: 'aur-002',
    storeId: 'demo-aurelia',
    slug: 'nexus-ultra-speaker',
    title: 'Nexus Ultra Speaker',
    price: 199,
    currency: 'USD',
    description: 'Room-filling 360° sound with multi-room sync and voice assistant integration.',
    images: [
      { url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800', alt: 'Nexus Ultra Speaker' },
    ],
    category: 'audio',
    categoryLabel: 'Audio',
    compareAtPrice: 249,
    discountPercent: 20,
    availability: 'in-stock',
    stockCount: 18,
    badges: ['deal'],
    isFeatured: true,
    rating: 4.5,
    reviewCount: 89,
    brand: 'TechHaven Audio',
  },
  {
    id: 'aur-003',
    storeId: 'demo-aurelia',
    slug: 'prism-4k-monitor',
    title: 'Prism 4K Monitor',
    price: 599,
    currency: 'USD',
    description: '32-inch 4K UHD display with HDR1000 and USB-C power delivery.',
    images: [
      { url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800', alt: 'Prism 4K Monitor' },
    ],
    category: 'displays',
    categoryLabel: 'Displays',
    availability: 'in-stock',
    stockCount: 7,
    badges: ['new'],
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 34,
    brand: 'TechHaven Display',
  },
  {
    id: 'aur-004',
    storeId: 'demo-aurelia',
    slug: 'zenith-mechanical-keyboard',
    title: 'Zenith Mechanical Keyboard',
    price: 179,
    currency: 'USD',
    description: 'Hot-swappable switches, per-key RGB, and aircraft-grade aluminum construction.',
    images: [
      { url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800', alt: 'Zenith Mechanical Keyboard' },
    ],
    category: 'peripherals',
    categoryLabel: 'Peripherals',
    availability: 'in-stock',
    stockCount: 23,
    badges: [],
    isFeatured: true,
    rating: 4.7,
    reviewCount: 142,
    brand: 'TechHaven Input',
    variants: [
      { id: 'v1', label: 'Linear Red', inStock: true },
      { id: 'v2', label: 'Tactile Brown', inStock: true },
      { id: 'v3', label: 'Clicky Blue', inStock: false },
    ],
  },
];
