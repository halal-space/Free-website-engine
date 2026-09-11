/**
 * Atelier Vélène (Fashion Store) seed preset — luxury fashion with editorial feel.
 *
 * Serif display fonts, warm tones, and fashion-specific fields like
 * composition, origin, and limited-edition numbering.
 */

import type { StoreConfig } from '../../types/store';
import type { Product } from '../../types/product';

/** Atelier Vélène store configuration — warm, editorial, luxury fashion. */
export const atelierVeleneConfig: StoreConfig = {
  id: 'demo-atelier',
  name: 'Atelier Vélène',
  tagline: 'Timeless elegance, modern sensibility',
  templateId: 'fashion_atelier',
  domain: 'demo-atelier',
  customDomain: null,
  theme: {
    fontPrimary: "'Inter Variable', sans-serif",
    fontDisplay: "'Manrope Variable', sans-serif",
    fontEditorial: "'Bodoni Moda', serif",
    colorBackground: '#faf8f5',
    colorSurface: '#ffffff',
    colorText: '#1a1a1a',
    colorTextMuted: '#7a7a7a',
    colorPrimary: '#1a1a1a',
    colorPrimaryForeground: '#ffffff',
    colorBorder: '#e8e4de',
    colorAccent: '#c5a880',
    borderRadius: '0px',
    supportsDarkMode: false,
  },
  sections: [
    {
      blockId: 'sec_hero_01',
      componentId: 'fashion:hero_editorial',
      order: 1,
      hidden: false,
      props: {
        title: 'Autumn Collection',
        subtitle: 'Where tradition meets tomorrow',
        ctaText: 'View Collection',
        ctaLink: '/collection/autumn',
        overlayOpacity: 0.3,
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
      blockId: 'sec_lookbook_01',
      componentId: 'fashion:lookbook_strip',
      order: 3,
      hidden: false,
      props: {
        title: 'The Edit',
        images: [
          { url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600', alt: 'Lookbook shot 1' },
          { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600', alt: 'Lookbook shot 2' },
          { url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600', alt: 'Lookbook shot 3' },
        ],
      },
    },
    {
      blockId: 'sec_products_02',
      componentId: 'shared:product_grid',
      order: 4,
      hidden: false,
      props: {
        title: 'Limited Editions',
        columns: 2,
      },
      dataSource: {
        type: 'products',
        filter: 'featured',
        limit: 4,
      },
    },
  ],
  metadata: {
    favicon: '/favicon.ico',
    seoTitle: 'Atelier Vélène — Timeless Elegance',
    seoDescription: 'Curated luxury fashion for the discerning individual',
    ogImage: '/og-image.png',
  },
};

/** Atelier Vélène demo product catalog — fashion-specific fields populated. */
export const atelierVeleneProducts: Product[] = [
  {
    id: 'atv-001',
    storeId: 'demo-atelier',
    slug: 'cashmere-overcoat',
    title: 'The Cashmere Overcoat',
    subtitle: 'Artisanal outerwear',
    price: 2450,
    currency: 'EUR',
    description: 'Double-faced cashmere overcoat with hand-finished seams and horn buttons.',
    images: [
      { url: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800', alt: 'Cashmere Overcoat front', type: 'primary' },
      { url: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800', alt: 'Cashmere Overcoat detail', type: 'detail' },
    ],
    category: 'outerwear',
    categoryLabel: 'Outerwear',
    availability: 'in-stock',
    stockCount: 8,
    badges: ['editor'],
    isFeatured: true,
    isNew: true,
    rating: 5.0,
    reviewCount: 7,
    brand: 'Atelier Vélène',
    composition: '100% Cashmere',
    origin: 'Woven in Scotland, assembled in Paris',
    details: [
      'Double-faced construction',
      'Horn buttons with leather backing',
      'Hand-stitched lapels',
      'Interior welt pockets with leather trim',
    ],
    careInstructions: [
      'Dry clean only',
      'Store on padded hanger',
      'Use cedar blocks for moth prevention',
    ],
    collection: 'autumn',
    sizes: [
      { name: 'XS', inStock: false },
      { name: 'S', inStock: true, stockCount: 2 },
      { name: 'M', inStock: true, stockCount: 3 },
      { name: 'L', inStock: true, stockCount: 2 },
      { name: 'XL', inStock: true, stockCount: 1 },
    ],
    colors: [
      { name: 'Camel', hex: '#c4a777', imageIndex: 0 },
      { name: 'Charcoal', hex: '#36454f', imageIndex: 1 },
    ],
    editorialQuote: '"The coat that defines a generation of quiet luxury."',
  },
  {
    id: 'atv-002',
    storeId: 'demo-atelier',
    slug: 'silk-midi-dress',
    title: 'Silk Midi Dress',
    subtitle: 'Evening essentials',
    price: 890,
    currency: 'EUR',
    description: 'Bias-cut silk charmeuse dress with adjustable shoulder straps.',
    images: [
      { url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', alt: 'Silk Midi Dress', type: 'primary' },
    ],
    category: 'dresses',
    categoryLabel: 'Dresses',
    availability: 'in-stock',
    stockCount: 12,
    badges: ['new'],
    isNew: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 23,
    brand: 'Atelier Vélène',
    composition: '100% Mulberry Silk',
    origin: 'Made in Italy',
    collection: 'autumn',
    sizes: [
      { name: '34', inStock: true, stockCount: 3 },
      { name: '36', inStock: true, stockCount: 4 },
      { name: '38', inStock: true, stockCount: 3 },
      { name: '40', inStock: true, stockCount: 2 },
    ],
    colors: [
      { name: 'Champagne', hex: '#f7e7ce', imageIndex: 0 },
      { name: 'Noir', hex: '#0a0a0a', imageIndex: 0 },
    ],
    isLimited: true,
    editionNumber: '47 of 100',
  },
  {
    id: 'atv-003',
    storeId: 'demo-atelier',
    slug: 'leather-tote-grand',
    title: 'Le Grand Tote',
    subtitle: 'Timeless accessories',
    price: 1200,
    currency: 'EUR',
    description: 'Full-grain vegetable-tanned leather tote with suede lining.',
    images: [
      { url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800', alt: 'Leather Tote', type: 'primary' },
    ],
    category: 'accessories',
    categoryLabel: 'Accessories',
    availability: 'low-stock',
    stockCount: 2,
    badges: ['limited'],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 41,
    brand: 'Atelier Vélène',
    composition: 'Full-grain calf leather',
    origin: 'Handcrafted in Florence',
    details: [
      'Vegetable-tanned leather',
      'Suede interior lining',
      'Brass hardware',
      'Detachable shoulder strap',
    ],
    careInstructions: [
      'Condition with leather balm twice yearly',
      'Avoid prolonged sun exposure',
      'Store stuffed with tissue paper',
    ],
    isLimited: true,
    editionNumber: '23 of 50',
  },
];
