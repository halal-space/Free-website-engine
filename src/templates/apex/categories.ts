import type { Category } from './types';

export const categories: Category[] = [
  {
    id: 'cat-audio',
    slug: 'audio',
    name: 'Acoustic Systems',
    tagline: 'Pure Harmonic Fidelity',
    description: 'Bespoke planar drivers, neural active noise cancellation, and aerospace titanium earcups engineered for purists.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=85',
    productCount: 4,
    featured: true
  },
  {
    id: 'cat-smartphones',
    slug: 'smartphones',
    name: 'Flagship Mobile',
    tagline: 'Titanium Architecture',
    description: 'Grade 5 titanium chassis, computational photonic engines, and edge-to-edge micro-retina panels.',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=85',
    productCount: 3,
    featured: true
  },
  {
    id: 'cat-smartwatches',
    slug: 'smartwatches',
    name: 'Precision Timepieces',
    tagline: 'Biometric Telemetry',
    description: 'Sculpted sapphire crystal, dual-frequency GNSS telemetry, and always-on micro-LED displays.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
    productCount: 3,
    featured: true
  },
  {
    id: 'cat-laptops',
    slug: 'laptops',
    name: 'Studio Computing',
    tagline: 'Uncompromising Power',
    description: 'Liquid metal thermal dissipation, nano-texture glass displays, and monolithic aluminum unibodies.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85',
    productCount: 2,
    featured: true
  },
  {
    id: 'cat-gaming',
    slug: 'gaming',
    name: 'Tactile Gaming',
    tagline: 'Sub-Millisecond Response',
    description: 'Hall-effect magnetic triggers, carbon fiber faceplates, and low-latency lossless wireless transceivers.',
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=1200&q=85',
    productCount: 2,
    featured: true
  },
  {
    id: 'cat-smart-home',
    slug: 'smart-home',
    name: 'Ambient Home',
    tagline: 'Sculptural Intelligence',
    description: 'Seamless Thread & Matter gateways, circadian optical engines, and minimalist interior acoustic hubs.',
    image: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1200&q=85',
    productCount: 3,
    featured: false
  },
  {
    id: 'cat-accessories',
    slug: 'accessories',
    name: 'Refined Accessories',
    tagline: 'Precision Complements',
    description: 'Machined billet wireless charging docks, custom coiled braided cables, and Tuscan leather enclosures.',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=85',
    productCount: 3,
    featured: false
  }
];
