'use client';

import React, { useState, useEffect } from 'react';
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
  CheckCheck,
  Eye,
  Sliders,
  Palette,
  Type,
  Image as ImageIcon,
  BookOpen,
  Package,
  Mail,
  ChevronDown,
  ChevronUp,
  Sun,
  Wheat,
  Copy,
  ExternalLink,
  Lock,
  RefreshCw,
  Cpu,
  Droplets,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { AureliaStoreView } from '../templates/aurelia/AureliaStoreView';
import { LuminaStoreView } from '../templates/lumina/LuminaStoreView';
import { ApexStoreView } from '../templates/apex/ApexStoreView';
import { PetitStoreView } from '../templates/petit/PetitStoreView';
import { SolenneStoreView } from '../templates/solenne/SolenneStoreView';
import { ObsidianStoreView } from '../templates/obsidian/ObsidianStoreView';
import TerraStoreView from '../templates/terra/TerraStoreView';

type TemplateId = 'aurelia' | 'lumina' | 'savory' | 'apex' | 'petit' | 'solenne' | 'obsidian' | 'terra';
type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export const TEMPLATE_META: Record<
  TemplateId,
  {
    name: string;
    brand: string;
    tagline: string;
    color: string;
    badge: string;
    is1to1: boolean;
    url: string;
    category: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  aurelia: {
    name: 'Aurelia',
    brand: 'AURELIA',
    tagline: 'Technology, Refined',
    color: '#5478FF',
    badge: '1:1 MATCH',
    is1to1: true,
    url: 'https://aurelia.tech/',
    category: 'Consumer Tech',
    icon: Smartphone,
  },
  lumina: {
    name: 'Lumina',
    brand: 'ATELIER VÉLÈNE',
    tagline: 'High Fashion & Quiet Luxury',
    color: '#C5A880',
    badge: '1:1 MATCH',
    is1to1: true,
    url: 'https://velene.luxury/',
    category: 'Luxury Fashion',
    icon: Shirt,
  },
  apex: {
    name: 'Apex',
    brand: 'AETHER LABORATORIES',
    tagline: 'Precision Acoustic Engineering',
    color: '#3B82F6',
    badge: '1:1 MATCH',
    is1to1: true,
    url: 'https://aether-audio.com/',
    category: 'Precision Audio',
    icon: Cpu,
  },
  petit: {
    name: 'Modern-care',
    brand: 'MAISON PETIT',
    tagline: 'Gentle Botanical Babycare',
    color: '#D97706',
    badge: '1:1 MATCH',
    is1to1: true,
    url: 'https://maisonpetit.com/',
    category: 'Babycare',
    icon: Sparkles,
  },
  solenne: {
    name: 'Solenne',
    brand: 'SOLENNE',
    tagline: 'High-Potency Botanical Skincare',
    color: '#C9B489',
    badge: '1:1 MATCH',
    is1to1: true,
    url: 'https://solenne-skincare.com/',
    category: 'Clean Skincare',
    icon: Droplets,
  },
  obsidian: {
    name: 'Obsidian Solar',
    brand: 'OBSIDIAN SOLAR',
    tagline: 'Engineered Energy Independence',
    color: '#B8975A',
    badge: '1:1 MATCH',
    is1to1: true,
    url: 'https://obsidian-solar.com/',
    category: 'Clean Energy',
    icon: Sun,
  },
  terra: {
    name: 'Terra & Cru',
    brand: 'TERRA & CRU',
    tagline: 'Elevated Everyday Pantry Staples',
    color: '#C85A32',
    badge: '1:1 MATCH',
    is1to1: true,
    url: 'https://terra-and-cru.com/',
    category: 'Artisan Food',
    icon: Wheat,
  },
  savory: {
    name: 'Savory',
    brand: 'SAVORY BISTRO',
    tagline: 'Contemporary Culinary & Wine',
    color: '#8B5CF6',
    badge: 'PROTOTYPE',
    is1to1: false,
    url: 'https://savory-bistro.com/',
    category: 'Dining & Wine',
    icon: Utensils,
  },
};

export interface TemplateCustomizationState {
  // Theme Colors
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  textMutedColor: string;
  borderColor: string;

  // Branding & Announcement
  storeName: string;
  tagline: string;
  announcementText: string;

  // Hero Section & Media
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  heroImages: string[];

  // Brand Story / Manifesto
  storyHeadline: string;
  storyDescription: string;
  storyQuote: string;

  // Featured Products (Dynamic Catalog Overrides)
  featuredProducts: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    category?: string;
    badge?: string;
  }>;

  // Footer & Contact
  newsletterHeading: string;
  newsletterSubtitle: string;
  contactEmail: string;
  locationDetails: string;
  copyrightNotice: string;
}

const DEFAULT_AURELIA_CONFIG: TemplateCustomizationState = {
  accentColor: '#5478ff',
  backgroundColor: '#0a0b10',
  surfaceColor: '#12141c',
  textColor: '#f1f5f9',
  textMutedColor: '#8b92a5',
  borderColor: 'rgba(255, 255, 255, 0.08)',
  storeName: 'AURELIA',
  tagline: 'Technology, Refined.',
  announcementText: 'Next-Generation Engineering • Worldwide Express Delivery Available',
  heroTitle: 'Technology,\nRefined.',
  heroSubtitle: 'Precision-engineered gadgets designed for people who expect more from technology.',
  ctaText: 'Explore Collection',
  heroImages: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1600&h=900&q=80',
  ],
  storyHeadline: 'Designed for the next generation.',
  storyDescription: 'AURELIA was founded on a simple dissatisfaction: that flagship technology kept choosing performance over taste. We set out to build a studio where engineering, design, and craftsmanship answer to the same standard.',
  storyQuote: 'Grade 5 Titanium • Haptic Ceramic • Quantum Acoustic Cores',
  featuredProducts: [
    {
      id: 'aur-01',
      name: 'Aurelia Horizon ANC Headphones',
      price: 499,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      category: 'Audio',
      badge: 'Flagship',
    },
    {
      id: 'aur-02',
      name: 'Aurelia Chronos Smartwatch',
      price: 699,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      category: 'Wearables',
      badge: 'Titanium',
    },
    {
      id: 'aur-03',
      name: 'Aurelia Pulse Earbuds Pro',
      price: 279,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
      category: 'Audio',
      badge: 'ANC',
    },
  ],
  newsletterHeading: "Stay ahead of what's next.",
  newsletterSubtitle: 'Get early access to new products, exclusive releases, and special offers — delivered before anyone else sees them.',
  contactEmail: 'concierge@aurelia.tech',
  locationDetails: 'Aurelia Design Studio, San Francisco & Tokyo',
  copyrightNotice: '© 2026 AURELIA Technology. All rights reserved.',
};

const DEFAULT_LUMINA_CONFIG: TemplateCustomizationState = {
  accentColor: '#C5A880',
  backgroundColor: '#FAF8F5',
  surfaceColor: '#FFFFFF',
  textColor: '#0C0C0D',
  textMutedColor: '#71717A',
  borderColor: '#E8E3DA',
  storeName: 'ATELIER VÉLÈNE',
  tagline: 'Paris · Milan · New York',
  announcementText: 'Complimentary Worldwide Courier on Orders Over $500 • 2026 Archive Lookbook Now Open',
  heroTitle: 'Defined by Detail.',
  heroSubtitle: 'Masterfully sculpted from 750gsm double-faced Mongolian cashmere and precision-tailored with architectural peak lapels. A study in silent luxury and structural permanence.',
  ctaText: 'Inspect Garment',
  heroImages: [
    'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1800&auto=format&fit=crop',
  ],
  storyHeadline: '“We do not design for the season. We engineer permanent monolithic forms in silence.”',
  storyDescription: 'Founded upon architectural restraint and radical material purity, Atelier Vélène eliminates superfluous ornament in favor of sculptural volume, un-dyed virgin fibers, and generational European hand-craftsmanship.',
  storyQuote: 'Paris Salons • Biella Weaving • Como Silks • Florence Leather',
  featuredProducts: [
    {
      id: 'prod-01',
      name: 'The Monolith Double-Breasted Coat',
      price: 3450,
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1800&auto=format&fit=crop',
      category: 'Outerwear',
      badge: 'Limited Archive',
    },
    {
      id: 'prod-02',
      name: 'The Column Silk Satin Evening Gown',
      price: 3890,
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1800&auto=format&fit=crop',
      category: 'Eveningwear',
      badge: 'Bespoke Order',
    },
    {
      id: 'prod-03',
      name: 'The Sculpted Peak-Lapel Blazer',
      price: 2150,
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1800&auto=format&fit=crop',
      category: 'Tailoring',
      badge: 'Super 150s Wool',
    },
  ],
  newsletterHeading: 'Receive Private Access to Numbered Archive Releases & Salon Previews.',
  newsletterSubtitle: 'Subscribers receive invitations to seasonal atelier trunk shows in Paris and Milan, priority access to limited numbered pieces, and bespoke client concierge consultations.',
  contactEmail: 'concierge@atelier-velene.com',
  locationDetails: '18 Rue du Faubourg Saint-Honoré, Paris',
  copyrightNotice: '© 2026 ATELIER VÉLÈNE. All Rights Reserved.',
};

const DEFAULT_APEX_CONFIG: TemplateCustomizationState = {
  accentColor: '#3b82f6',
  backgroundColor: '#070709',
  surfaceColor: '#121219',
  textColor: '#fcfcfd',
  textMutedColor: '#9ca3af',
  borderColor: 'rgba(255, 255, 255, 0.08)',
  storeName: 'AETHER',
  tagline: 'LABORATORIES',
  announcementText: 'Complimentary Global Overnight Courier on Orders Above $500',
  heroTitle: 'Technology,\nRefined.',
  heroSubtitle: 'Precision-engineered gadgets designed for people who expect more from technology. Bespoke acoustics, monolithic titanium, and neural silicon.',
  ctaText: 'Explore Collection',
  heroImages: [
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
  ],
  storyHeadline: 'Designed for the next generation.',
  storyDescription: 'At AETHER, we believe consumer electronics should not be disposable commodities. We engineer our acoustic systems, computing architecture, and timepieces with the same reverence, tolerances, and timelessness as haute horlogerie and bespoke acoustic instruments.',
  storyQuote: 'Titanium Unibody • Neural Silicon • Bespoke Transducers',
  featuredProducts: [
    {
      id: 'apex-01',
      name: 'Aura Pro Wireless Headphones',
      price: 549,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop',
      category: 'Audio',
      badge: 'Flagship',
    },
    {
      id: 'apex-02',
      name: 'Pulse Watch Series 9 Ultra',
      price: 899,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
      category: 'Wearables',
      badge: 'Titanium',
    },
    {
      id: 'apex-03',
      name: 'Vortex Studio ANC Earbuds',
      price: 299,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop',
      category: 'Audio',
      badge: 'New',
    },
  ],
  newsletterHeading: "Stay ahead of what's next.",
  newsletterSubtitle: 'Receive private allocations, advance engineering journals, and bespoke invitations to limited acoustic releases.',
  contactEmail: 'support@aether-laboratories.com',
  locationDetails: 'AETHER R&D Campus, Silicon Valley & Zürich',
  copyrightNotice: '© 2026 AETHER Laboratories Inc. All rights reserved.',
};

const DEFAULT_PETIT_CONFIG: TemplateCustomizationState = {
  accentColor: '#B88B4A',
  backgroundColor: '#FAF8F5',
  surfaceColor: '#FFFFFF',
  textColor: '#1C1917',
  textMutedColor: '#877E73',
  borderColor: '#E8E2D7',
  storeName: 'Maison Petit',
  tagline: 'L’Art de L’Enfance',
  announcementText: 'Thoughtfully chosen essentials for little ones.',
  heroTitle: 'Beautiful essentials for every little adventure.',
  heroSubtitle: "Discover thoughtfully selected baby and children's essentials designed to bring comfort, joy, and style to everyday moments.",
  ctaText: 'Shop the collection',
  heroImages: [
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=2200&q=88',
    'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=2000&q=85',
  ],
  storyHeadline: 'Made for little moments that matter.',
  storyDescription: 'From their first essentials to their biggest little adventures, we make it easier to find beautiful, practical products for every stage of childhood.',
  storyQuote: '',
  featuredProducts: [
    {
      id: 'heirloom-organic-muslin-swaddle-blanket',
      name: 'The Heirloom Muslin Swaddle Blanket',
      price: 48,
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=85',
      category: 'Baby Essentials',
      badge: 'Bestseller',
    },
    {
      id: 'pure-silicone-toddler-mealtime-feeding-set',
      name: 'Minimalist Silicone Mealtime & Feeding Set',
      price: 52,
      image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=85',
      category: 'Nursery & Feeding',
      badge: 'Bestseller',
    },
    {
      id: 'fsc-beechwood-forest-stacking-puzzle',
      name: 'FSC Beechwood Forest Animal Stacking Puzzle',
      price: 64,
      image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=1200&q=85',
      category: 'Toys & Play',
      badge: 'Bestseller',
    },
    {
      id: 'insulated-stainless-steel-bento-lunchbox',
      name: 'Insulated Stainless Steel Bento Lunchbox',
      price: 46,
      image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1200&q=85',
      category: 'School Essentials',
      badge: 'Bestseller',
    },
  ],
  newsletterHeading: 'Stay close to the little things.',
  newsletterSubtitle: 'Sign up for new arrivals, thoughtful finds, and occasional offers.',
  contactEmail: 'concierge@maisonpetit.com',
  locationDetails: '42 Rue de l’Université, 75007 Paris, France',
  copyrightNotice: '© 2026 Maison Petit Inc. All rights reserved. Crafted with care for little moments.',
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

const PETIT_COLOR_PRESETS = [
  { label: 'Warm Honey Gold', hex: '#B88B4A' },
  { label: 'Muted French Sage', hex: '#5B6E5B' },
  { label: 'Warm Terracotta', hex: '#B66C52' },
  { label: 'Chambray Blue', hex: '#5F738A' },
  { label: 'Dusty Rose', hex: '#D8A499' },
  { label: 'Charcoal Espresso', hex: '#1C1917' },
];

const DEFAULT_SOLENNE_CONFIG: TemplateCustomizationState = {
  // Theme Colors
  accentColor: '#8A6D47',
  backgroundColor: '#FAF7F2',
  surfaceColor: '#FFFFFF',
  textColor: '#1B1917',
  textMutedColor: '#55504A',
  borderColor: 'rgba(27, 25, 23, 0.09)',

  // Branding & Announcement
  storeName: 'SOLENNE',
  tagline: 'Skin · Rituals',
  announcementText: 'Complimentary shipping on orders over $100',

  // Hero Section & Media
  heroTitle: 'Rituals for · Radiant Skin.',
  heroSubtitle:
    'Considered skincare distilled to its purest form. Clinically proven actives, botanical intelligence, and the quiet luxury of a ritual that belongs entirely to you.',
  ctaText: 'Shop Collection',
  heroImages: [
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=800&auto=format&fit=crop',
  ],

  // Brand Story / Manifesto
  storyHeadline: 'Beauty, distilled to its essentials.',
  storyDescription:
    'We believe skincare should be an act of intention, not accumulation. Every SOLENNE formula begins with a single question — what does skin truly need? — and ends only when the answer is inevitable.',
  storyQuote: 'Clean, proven formulation • Single-origin botanicals • Refillable by design',

  // Featured Products
  featuredProducts: [
    {
      id: 'velour-cleansing-balm',
      name: 'Velour Cleansing Balm',
      price: 54,
      image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=1200&auto=format&fit=crop',
      category: 'cleansers',
      badge: 'Best Seller',
    },
    {
      id: 'lumiere-vitamin-c-serum',
      name: 'Lumière Vitamin C Serum',
      price: 94,
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1200&auto=format&fit=crop',
      category: 'serums',
      badge: 'Best Seller',
    },
    {
      id: 'nocturne-retinol-elixir',
      name: 'Nocturne Retinol Elixir',
      price: 112,
      image: 'https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?q=80&w=1200&auto=format&fit=crop',
      category: 'serums',
      badge: 'New',
    },
    {
      id: 'creme-de-lune',
      name: 'Crème de Lune',
      price: 88,
      image: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=1200&auto=format&fit=crop',
      category: 'moisturizers',
      badge: 'Best Seller',
    },
  ],
  newsletterHeading: 'Enter our world of beauty.',
  newsletterSubtitle: 'Ritual notes, ingredient essays and first access to limited editions — one considered letter a month.',
  contactEmail: 'atelier@solenne.com',
  locationDetails: 'Lyon, France',
  copyrightNotice: '© 2026 Maison Solenne SAS · All rights reserved',
};

const SOLENNE_COLOR_PRESETS = [
  { label: 'Champagne Gold', hex: '#8A6D47' },
  { label: 'Deep Bronze', hex: '#755A38' },
  { label: 'Terracotta Clay', hex: '#6B5D4D' },
  { label: 'Olive Sage', hex: '#5B6E5B' },
  { label: 'Charcoal Espresso', hex: '#2A2724' },
  { label: 'Ivory Stone', hex: '#6E675D' },
];

const DEFAULT_OBSIDIAN_CONFIG: TemplateCustomizationState = {
  // Theme Colors
  accentColor: '#B8975A',
  backgroundColor: '#FAFAF8',
  surfaceColor: '#1C1C1E',
  textColor: '#0B0B0C',
  textMutedColor: '#3A3A3C',
  borderColor: '#E4DFD4',

  // Branding & Announcement
  storeName: 'OBSIDIAN',
  tagline: 'SOLAR',
  announcementText: 'MCS Certified • 25-Year In-House Output Guarantee • Zero Subcontractors',

  // Hero Section & Media
  heroTitle: 'Power, engineered for the next 30 years.',
  heroSubtitle:
    'Premium equipment, installed by our own certified crews, monitored for life. No subcontractors. No estimates presented as quotes.',
  ctaText: 'Get a Free Quote',
  heroImages: [
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?q=80&w=1600&auto=format&fit=crop',
  ],

  // Brand Story / Manifesto
  storyHeadline: 'No salesmen. No subcontractors. Only certified engineers.',
  storyDescription:
    'Founded in 2009 by electrical engineers who believed solar deserved precision engineering instead of door-to-door sales. Today we design, install, and warrant high-output solar arrays across the UK.',
  storyQuote: 'MCS Certified • NICEIC Approved Contractor • RECC Member • TrustMark Registered',

  // Featured Products
  featuredProducts: [
    {
      id: 'obsidian-440-mono',
      name: 'Obsidian 440W N-Type All-Black',
      price: 285,
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop',
      category: 'panel',
      badge: 'Bestseller',
    },
    {
      id: 'solaredge-home-hub-6kw',
      name: 'SolarEdge Home Hub 6.0kW Inverter',
      price: 1890,
      image: 'https://images.unsplash.com/photo-1558441719-8b489c63f7d1?q=80&w=1200&auto=format&fit=crop',
      category: 'inverter',
      badge: 'Recommended',
    },
    {
      id: 'tesla-powerwall-3',
      name: 'Tesla Powerwall 3 (13.5 kWh)',
      price: 8900,
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop',
      category: 'battery',
      badge: 'High Demand',
    },
    {
      id: 'zappi-v2-7kw',
      name: 'myenergi zappi 7kW EV Charger (Tethered)',
      price: 945,
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1200&auto=format&fit=crop',
      category: 'ev',
      badge: 'Eco Smart',
    },
  ],
  newsletterHeading: 'Receive our quarterly energy independence briefing.',
  newsletterSubtitle: 'Grid policy updates, battery economics, and microgeneration engineering insights.',
  contactEmail: 'quotes@obsidiansolar.example',
  locationDetails: '14 Ironworks Lane, London EC2A 3BP',
  copyrightNotice: '© 2026 Obsidian Solar Ltd. All rights reserved.',
};

const OBSIDIAN_COLOR_PRESETS = [
  { label: 'Signature Brass', hex: '#B8975A' },
  { label: 'Solar Flare Amber', hex: '#D97706' },
  { label: 'Nordic Teal', hex: '#0D9488' },
  { label: 'Cobalt Electric', hex: '#2563EB' },
  { label: 'Pure Platinum', hex: '#94A3B8' },
  { label: 'Verdant Eco', hex: '#16A34A' },
];

const DEFAULT_TERRA_CONFIG: TemplateCustomizationState = {
  accentColor: '#C85A32',
  backgroundColor: '#FBF9F5',
  surfaceColor: '#F2EFE9',
  textColor: '#1B241E',
  textMutedColor: '#6F7A72',
  borderColor: 'rgba(27, 36, 30, 0.08)',
  storeName: 'TERRA & CRU',
  tagline: 'Elevated Everyday Staples',
  announcementText: 'Complimentary chilled shipping over $65 · Free artisanal butter tier unlocked at $79',
  heroTitle: 'Elevated everyday staples from regenerative smallholders.',
  heroSubtitle:
    'Single-estate oils, line-caught tins, stone-milled grains. Transparent sourcing, harvest dates on every jar, carbon-neutral chill delivery.',
  ctaText: 'Explore the Pantry',
  heroImages: [
    'https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=1200&auto=format&fit=crop',
  ],
  storyHeadline: '42 families, zero mysteries.',
  storyDescription:
    'Every product names its maker, harvest and batch. We pay above-market prices on multi-year contracts, publish lab tests, and visit every farm at least once a year.',
  storyQuote: 'Regenerative • Single-Estate • Lab-Tested • Chilled Carbon-Neutral',
  featuredProducts: [
    {
      id: 'p1',
      name: 'Koroneiki Early-Harvest Olive Oil',
      price: 28,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=900&auto=format&fit=crop',
      category: 'oils-vinegars',
      badge: 'Single-Estate',
    },
    {
      id: 'p4',
      name: 'Smoked Ventresca Tuna in Arbequina',
      price: 40,
      image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?q=80&w=900&auto=format&fit=crop',
      category: 'tinned-delicacies',
      badge: 'Line-Caught',
    },
    {
      id: 'p5',
      name: 'Senatore Cappelli Bronze-Cut Rigatoni',
      price: 14,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=900&auto=format&fit=crop',
      category: 'heritage-grains',
      badge: 'Stone-Milled',
    },
    {
      id: 'p8',
      name: 'Smoked Sun-Dried Urfa Chili Flakes',
      price: 16,
      image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=900&auto=format&fit=crop',
      category: 'spices-pastes',
      badge: 'Wild-Harvested',
    },
  ],
  newsletterHeading: 'Get the harvest letter.',
  newsletterSubtitle: 'One email per harvest. Lab reports, new pressings, and smallholder stories.',
  contactEmail: 'hello@terraandcru.shop',
  locationDetails: 'Cold Cellar & Pantry, Portland OR',
  copyrightNotice: '© 2026 TERRA & CRU. All rights reserved.',
};

const TERRA_COLOR_PRESETS = [
  { label: 'Terracotta & Rosemary', hex: '#C85A32' },
  { label: 'Rosemary Orchard', hex: '#3B583E' },
  { label: 'Golden Saffron', hex: '#C9A227' },
  { label: 'Aged Balsamic', hex: '#4A2E2B' },
  { label: 'Mediterranean Azure', hex: '#1E4D6B' },
  { label: 'Raw Linen & Olive', hex: '#6B705C' },
];

export default function StorefrontEnginePage() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>('aurelia');
  const [isGoLive, setIsGoLive] = useState(false);
  const [viewport, setViewport] = useState<ViewportMode>('desktop');

  // Unified Customization State
  const [config, setConfig] = useState<TemplateCustomizationState>(DEFAULT_AURELIA_CONFIG);

  // Accordion active sections
  const [openSection, setOpenSection] = useState<string | null>('colors');

  // Interactive UI feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [isReloading, setIsReloading] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 2400);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isGoLive) {
        setIsGoLive(false);
        showToast('Exited fullscreen preview');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGoLive]);

  const handleReloadPreview = () => {
    setIsReloading(true);
    setTimeout(() => {
      setIsReloading(false);
      showToast('Live preview refreshed');
    }, 350);
  };

  const handleCopyUrl = () => {
    const url = TEMPLATE_META[activeTemplate]?.url || 'https://storefront-engine.local';
    navigator.clipboard?.writeText(url);
    setCopiedUrl(true);
    showToast(`Copied ${url} to clipboard`);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const updateField = <K extends keyof TemplateCustomizationState>(
    field: K,
    value: TemplateCustomizationState[K]
  ) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const updateProduct = (index: number, patch: Partial<TemplateCustomizationState['featuredProducts'][number]>) => {
    setConfig((prev) => {
      const updated = [...prev.featuredProducts];
      updated[index] = { ...updated[index], ...patch };
      return { ...prev, featuredProducts: updated };
    });
  };

  const updateHeroImage = (index: number, url: string) => {
    setConfig((prev) => {
      const updated = [...prev.heroImages];
      updated[index] = url;
      return { ...prev, heroImages: updated };
    });
  };

  const handleSwitchTemplate = (template: TemplateId) => {
    setActiveTemplate(template);
    if (template === 'aurelia') {
      setConfig(DEFAULT_AURELIA_CONFIG);
    } else if (template === 'lumina') {
      setConfig(DEFAULT_LUMINA_CONFIG);
    } else if (template === 'apex') {
      setConfig(DEFAULT_APEX_CONFIG);
    } else if (template === 'petit') {
      setConfig(DEFAULT_PETIT_CONFIG);
    } else if (template === 'solenne') {
      setConfig(DEFAULT_SOLENNE_CONFIG);
    } else if (template === 'obsidian') {
      setConfig(DEFAULT_OBSIDIAN_CONFIG);
    } else if (template === 'terra') {
      setConfig(DEFAULT_TERRA_CONFIG);
    }
    showToast(`Loaded ${TEMPLATE_META[template]?.brand || template}`);
  };

  const resetDefaults = () => {
    if (activeTemplate === 'lumina') {
      setConfig(DEFAULT_LUMINA_CONFIG);
    } else if (activeTemplate === 'apex') {
      setConfig(DEFAULT_APEX_CONFIG);
    } else if (activeTemplate === 'petit') {
      setConfig(DEFAULT_PETIT_CONFIG);
    } else if (activeTemplate === 'solenne') {
      setConfig(DEFAULT_SOLENNE_CONFIG);
    } else if (activeTemplate === 'obsidian') {
      setConfig(DEFAULT_OBSIDIAN_CONFIG);
    } else if (activeTemplate === 'terra') {
      setConfig(DEFAULT_TERRA_CONFIG);
    } else {
      setConfig(DEFAULT_AURELIA_CONFIG);
    }
    showToast(`Restored 1:1 default settings for ${TEMPLATE_META[activeTemplate]?.brand || activeTemplate}`);
  };

  const currentPresets =
    activeTemplate === 'lumina'
      ? LUMINA_COLOR_PRESETS
      : activeTemplate === 'apex'
      ? APEX_COLOR_PRESETS
      : activeTemplate === 'petit'
      ? PETIT_COLOR_PRESETS
      : activeTemplate === 'solenne'
      ? SOLENNE_COLOR_PRESETS
      : activeTemplate === 'obsidian'
      ? OBSIDIAN_COLOR_PRESETS
      : activeTemplate === 'terra'
      ? TERRA_COLOR_PRESETS
      : AURELIA_COLOR_PRESETS;

  // 1. Full-screen "Go Live" mode
  if (isGoLive) {
    const meta = TEMPLATE_META[activeTemplate];
    return (
      <div className="relative min-h-screen bg-[#090a0f]">
        {/* Floating Exit Go-Live Action Bar */}
        <div className="fixed top-5 right-5 z-[999] flex items-center gap-2 rounded-full border border-white/20 bg-[#0f121a]/90 p-1.5 shadow-2xl backdrop-blur-xl transition-all hover:bg-[#151924]">
          <span className="flex items-center gap-2 pl-3 pr-2 text-xs font-semibold" style={{ color: meta?.color || '#10b981' }}>
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: meta?.color || '#10b981' }} />
            <span>GO LIVE PREVIEW • {meta?.brand || activeTemplate.toUpperCase()}</span>
          </span>
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-mono text-white/60">ESC</span>
          <button
            onClick={() => {
              setIsGoLive(false);
              showToast('Exited fullscreen preview');
            }}
            className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-white/30 cursor-pointer"
          >
            <Minimize2 className="h-3.5 w-3.5" />
            <span>Exit Fullscreen</span>
          </button>
        </div>

        {activeTemplate === 'aurelia' && (
          <AureliaStoreView
            storeName={config.storeName}
            tagline={config.tagline}
            heroTitle={config.heroTitle}
            heroSubtitle={config.heroSubtitle}
            ctaText={config.ctaText}
            accentColor={config.accentColor}
            backgroundColor={config.backgroundColor}
            surfaceColor={config.surfaceColor}
            textColor={config.textColor}
            textMutedColor={config.textMutedColor}
            borderColor={config.borderColor}
            announcementText={config.announcementText}
            heroImages={config.heroImages}
            storyHeadline={config.storyHeadline}
            storyDescription={config.storyDescription}
            storyQuote={config.storyQuote}
            featuredProducts={config.featuredProducts}
            newsletterHeading={config.newsletterHeading}
            newsletterSubtitle={config.newsletterSubtitle}
            contactEmail={config.contactEmail}
            locationDetails={config.locationDetails}
            copyrightNotice={config.copyrightNotice}
            isInsidePreview={false}
          />
        )}

        {activeTemplate === 'lumina' && (
          <LuminaStoreView
            storeName={config.storeName}
            tagline={config.tagline}
            heroTitle={config.heroTitle}
            heroSubtitle={config.heroSubtitle}
            ctaText={config.ctaText}
            accentColor={config.accentColor}
            backgroundColor={config.backgroundColor}
            surfaceColor={config.surfaceColor}
            textColor={config.textColor}
            textMutedColor={config.textMutedColor}
            borderColor={config.borderColor}
            announcementText={config.announcementText}
            heroImages={config.heroImages}
            storyHeadline={config.storyHeadline}
            storyDescription={config.storyDescription}
            storyQuote={config.storyQuote}
            featuredProducts={config.featuredProducts}
            newsletterHeading={config.newsletterHeading}
            newsletterSubtitle={config.newsletterSubtitle}
            contactEmail={config.contactEmail}
            locationDetails={config.locationDetails}
            copyrightNotice={config.copyrightNotice}
            isInsidePreview={false}
          />
        )}

        {activeTemplate === 'apex' && (
          <ApexStoreView
            storeName={config.storeName}
            tagline={config.tagline}
            heroTitle={config.heroTitle}
            heroSubtitle={config.heroSubtitle}
            ctaText={config.ctaText}
            accentColor={config.accentColor}
            backgroundColor={config.backgroundColor}
            surfaceColor={config.surfaceColor}
            textColor={config.textColor}
            textMutedColor={config.textMutedColor}
            borderColor={config.borderColor}
            announcementText={config.announcementText}
            heroImages={config.heroImages}
            storyHeadline={config.storyHeadline}
            storyDescription={config.storyDescription}
            storyQuote={config.storyQuote}
            featuredProducts={config.featuredProducts}
            newsletterHeading={config.newsletterHeading}
            newsletterSubtitle={config.newsletterSubtitle}
            contactEmail={config.contactEmail}
            locationDetails={config.locationDetails}
            copyrightNotice={config.copyrightNotice}
            isInsidePreview={false}
          />
        )}

        {activeTemplate === 'petit' && (
          <PetitStoreView
            storeName={config.storeName}
            tagline={config.tagline}
            heroTitle={config.heroTitle}
            heroSubtitle={config.heroSubtitle}
            ctaText={config.ctaText}
            accentColor={config.accentColor}
            backgroundColor={config.backgroundColor}
            surfaceColor={config.surfaceColor}
            textColor={config.textColor}
            textMutedColor={config.textMutedColor}
            borderColor={config.borderColor}
            announcementText={config.announcementText}
            heroImages={config.heroImages}
            storyHeadline={config.storyHeadline}
            storyDescription={config.storyDescription}
            storyQuote={config.storyQuote}
            featuredProducts={config.featuredProducts}
            newsletterHeading={config.newsletterHeading}
            newsletterSubtitle={config.newsletterSubtitle}
            contactEmail={config.contactEmail}
            locationDetails={config.locationDetails}
            copyrightNotice={config.copyrightNotice}
            isInsidePreview={false}
          />
        )}

        {activeTemplate === 'solenne' && (
          <SolenneStoreView
            storeName={config.storeName}
            tagline={config.tagline}
            heroTitle={config.heroTitle}
            heroSubtitle={config.heroSubtitle}
            ctaText={config.ctaText}
            accentColor={config.accentColor}
            backgroundColor={config.backgroundColor}
            surfaceColor={config.surfaceColor}
            textColor={config.textColor}
            textMutedColor={config.textMutedColor}
            borderColor={config.borderColor}
            announcementText={config.announcementText}
            heroImages={config.heroImages}
            storyHeadline={config.storyHeadline}
            storyDescription={config.storyDescription}
            featuredProducts={config.featuredProducts}
            newsletterHeading={config.newsletterHeading}
            newsletterSubtitle={config.newsletterSubtitle}
            contactEmail={config.contactEmail}
            copyrightNotice={config.copyrightNotice}
            isInsidePreview={false}
          />
        )}

        {activeTemplate === 'obsidian' && (
          <ObsidianStoreView
            storeName={config.storeName}
            tagline={config.tagline}
            heroTitle={config.heroTitle}
            heroSubtitle={config.heroSubtitle}
            ctaText={config.ctaText}
            accentColor={config.accentColor}
            backgroundColor={config.backgroundColor}
            surfaceColor={config.surfaceColor}
            textColor={config.textColor}
            heroImages={config.heroImages}
            contactEmail={config.contactEmail}
            locationDetails={config.locationDetails}
            copyrightNotice={config.copyrightNotice}
            isInsidePreview={false}
          />
        )}

        {activeTemplate === 'terra' && (
          <TerraStoreView
            primaryColor={config.accentColor}
            secondaryColor="#3B583E"
            accentColor="#C9A227"
            surfaceColor={config.surfaceColor}
            backgroundColor={config.backgroundColor}
            textColor={config.textColor}
          />
        )}

        {activeTemplate !== 'aurelia' && activeTemplate !== 'lumina' && activeTemplate !== 'apex' && activeTemplate !== 'petit' && activeTemplate !== 'solenne' && activeTemplate !== 'obsidian' && activeTemplate !== 'terra' && (
          <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center text-white">
            <h2 className="text-2xl font-bold uppercase tracking-wider">{activeTemplate} Template</h2>
            <p className="mt-2 text-white/60">Currently focusing 1:1 on Aurelia, Lumina, Apex, Petit & Solenne. Click below to return.</p>
            <button
              onClick={() => handleSwitchTemplate('solenne')}
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
  const currentMeta = TEMPLATE_META[activeTemplate];

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#090a0f] text-[#f8fafc] font-sans antialiased select-none">
      {/* Dynamic Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[120] pointer-events-none transition-all duration-300">
          <div className="flex items-center gap-2.5 rounded-full border border-indigo-500/30 bg-[#121624]/95 px-4 py-2 text-xs font-medium text-white shadow-2xl shadow-indigo-500/10 backdrop-blur-xl">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Header Bar (h-14) */}
      <header className="flex h-14 shrink-0 items-center justify-between studio-header-glass px-4 sm:px-6 z-30">
        <div className="flex items-center gap-3">
          {/* Studio Brand Mark */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20 border border-indigo-400/20">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-white">Storefront Studio</span>
              <span className="rounded bg-indigo-500/15 border border-indigo-500/25 px-1.5 py-0.5 text-[9px] font-mono font-semibold text-indigo-300">
                v2.4 PRO
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#94a3b8]">
              <span>Active Template:</span>
              <span className="font-semibold" style={{ color: currentMeta.color }}>
                {currentMeta.brand}
              </span>
              <span className="text-[#64748b]">•</span>
              <span className="text-[10px] text-emerald-400 font-medium">1:1 Verified</span>
            </div>
          </div>
        </div>

        {/* Viewport Width Segmented Controls */}
        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-[#121520] p-1 shadow-inner">
          <button
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
              viewport === 'desktop'
                ? 'bg-[#222738] text-white shadow-sm border border-white/15'
                : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>Desktop</span>
            <span className="text-[9px] font-mono text-[#64748b]">1440px</span>
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
              viewport === 'tablet'
                ? 'bg-[#222738] text-white shadow-sm border border-white/15'
                : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Tablet className="h-3.5 w-3.5" />
            <span>Tablet</span>
            <span className="text-[9px] font-mono text-[#64748b]">768px</span>
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
              viewport === 'mobile'
                ? 'bg-[#222738] text-white shadow-sm border border-white/15'
                : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Mobile</span>
            <span className="text-[9px] font-mono text-[#64748b]">390px</span>
          </button>
        </div>

        {/* Studio Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Copy Link */}
          <button
            onClick={handleCopyUrl}
            className="hidden md:flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#161a26] px-3 py-1.5 text-xs text-[#94a3b8] hover:text-white hover:border-white/20 transition-all cursor-pointer"
            title="Copy store URL"
          >
            {copiedUrl ? <CheckCheck className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedUrl ? 'Copied' : 'Share'}</span>
          </button>

          {/* Quick Reset Defaults */}
          <button
            onClick={resetDefaults}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#161a26] px-3 py-1.5 text-xs text-[#94a3b8] hover:text-white hover:border-white/20 transition-all cursor-pointer"
            title="Reset to 1:1 default settings"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          {/* Go Live Fullscreen CTA */}
          <button
            onClick={() => {
              setIsGoLive(true);
              showToast('Entered fullscreen live preview');
            }}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span>Go Live</span>
            <span className="hidden lg:inline-block rounded bg-white/20 px-1 py-0.2 text-[9px] font-mono">⌘P</span>
          </button>
        </div>
      </header>

      {/* Main Workspace: Left Controls (scrollable) + Right Preview (scrollable) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Studio Customizer Drawer Panel */}
        <aside className="w-80 sm:w-[26rem] shrink-0 h-full overflow-y-auto studio-sidebar-panel p-4 space-y-3.5 select-none studio-scrollbar">
          {/* Panel Header */}
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Sliders className="h-3.5 w-3.5" />
              </div>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-white">Live Customizer</h2>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>REACTIVE ENGINE</span>
                </div>
              </div>
            </div>
            <button
              onClick={resetDefaults}
              title="Reset to template 1:1 defaults"
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset All</span>
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* 1. Theme Colors Accordion */}
            <div className="studio-accordion-card">
              <button
                type="button"
                onClick={() => toggleSection('colors')}
                className="w-full flex items-center justify-between p-3 text-left font-semibold text-white hover:bg-[#161a27] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-amber-400" />
                  <span>Palette & Theme Colors</span>
                </div>
                {openSection === 'colors' ? (
                  <ChevronUp className="h-4 w-4 text-[#94a3b8]" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-[#94a3b8]" />
                )}
              </button>

              {openSection === 'colors' && (
                <div className="p-3.5 pt-1 space-y-4 border-t border-[rgba(255,255,255,0.06)]">
                  {/* Accent Color */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] font-medium text-[#94a3b8]">Brand Accent / Glow</label>
                      <span className="text-[10px] font-mono text-[#64748b]">Reactive CSS Var</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="relative h-8 w-8 rounded-lg overflow-hidden border border-white/20 shrink-0 shadow-inner">
                        <input
                          type="color"
                          value={config.accentColor}
                          onChange={(e) => updateField('accentColor', e.target.value)}
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        />
                        <div className="h-full w-full" style={{ backgroundColor: config.accentColor }} />
                      </div>
                      <input
                        type="text"
                        value={config.accentColor}
                        onChange={(e) => updateField('accentColor', e.target.value)}
                        className="w-28 studio-input px-2.5 py-1.5 font-mono text-xs text-white uppercase"
                      />
                      <span className="text-[11px] text-[#64748b]">Primary highlight</span>
                    </div>

                    {/* Curated Color Presets */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#64748b] block">
                        Template Color Presets:
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {currentPresets.map((preset) => {
                          const isSelected = config.accentColor.toLowerCase() === preset.hex.toLowerCase();
                          return (
                            <button
                              key={preset.hex}
                              type="button"
                              onClick={() => {
                                updateField('accentColor', preset.hex);
                                showToast(`Applied ${preset.label}`);
                              }}
                              className={`flex items-center justify-between rounded-lg border px-2.5 py-1.5 text-[11px] transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-indigo-400/60 bg-indigo-500/15 text-white shadow-xs font-semibold'
                                  : 'border-white/10 bg-[#121520] text-[#94a3b8] hover:border-white/20 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span
                                  className="h-3 w-3 rounded-full shrink-0 shadow-xs border border-white/20"
                                  style={{ backgroundColor: preset.hex }}
                                />
                                <span className="truncate">{preset.label}</span>
                              </div>
                              {isSelected && <Check className="h-3 w-3 text-indigo-400 shrink-0 ml-1" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Canvas Background & Card Surface */}
                  <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-[rgba(255,255,255,0.06)]">
                    <div>
                      <label className="block text-[11px] font-medium text-[#94a3b8] mb-1">Canvas Background</label>
                      <div className="flex items-center gap-2">
                        <div className="relative h-7 w-7 rounded-md overflow-hidden border border-white/20 shrink-0">
                          <input
                            type="color"
                            value={config.backgroundColor.startsWith('#') ? config.backgroundColor : '#090a0f'}
                            onChange={(e) => updateField('backgroundColor', e.target.value)}
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          />
                          <div
                            className="h-full w-full"
                            style={{
                              backgroundColor: config.backgroundColor.startsWith('#')
                                ? config.backgroundColor
                                : '#090a0f',
                            }}
                          />
                        </div>
                        <input
                          type="text"
                          value={config.backgroundColor}
                          onChange={(e) => updateField('backgroundColor', e.target.value)}
                          className="w-full studio-input px-2 py-1 font-mono text-[11px] text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#94a3b8] mb-1">Card / Surface</label>
                      <div className="flex items-center gap-2">
                        <div className="relative h-7 w-7 rounded-md overflow-hidden border border-white/20 shrink-0">
                          <input
                            type="color"
                            value={config.surfaceColor.startsWith('#') ? config.surfaceColor : '#121520'}
                            onChange={(e) => updateField('surfaceColor', e.target.value)}
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          />
                          <div
                            className="h-full w-full"
                            style={{
                              backgroundColor: config.surfaceColor.startsWith('#')
                                ? config.surfaceColor
                                : '#121520',
                            }}
                          />
                        </div>
                        <input
                          type="text"
                          value={config.surfaceColor}
                          onChange={(e) => updateField('surfaceColor', e.target.value)}
                          className="w-full studio-input px-2 py-1 font-mono text-[11px] text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text Colors */}
                  <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-[rgba(255,255,255,0.06)]">
                    <div>
                      <label className="block text-[11px] font-medium text-[#94a3b8] mb-1">Primary Text</label>
                      <div className="flex items-center gap-2">
                        <div className="relative h-7 w-7 rounded-md overflow-hidden border border-white/20 shrink-0">
                          <input
                            type="color"
                            value={config.textColor.startsWith('#') ? config.textColor : '#ffffff'}
                            onChange={(e) => updateField('textColor', e.target.value)}
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          />
                          <div
                            className="h-full w-full"
                            style={{
                              backgroundColor: config.textColor.startsWith('#') ? config.textColor : '#ffffff',
                            }}
                          />
                        </div>
                        <input
                          type="text"
                          value={config.textColor}
                          onChange={(e) => updateField('textColor', e.target.value)}
                          className="w-full studio-input px-2 py-1 font-mono text-[11px] text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#94a3b8] mb-1">Muted Text</label>
                      <div className="flex items-center gap-2">
                        <div className="relative h-7 w-7 rounded-md overflow-hidden border border-white/20 shrink-0">
                          <input
                            type="color"
                            value={config.textMutedColor.startsWith('#') ? config.textMutedColor : '#888888'}
                            onChange={(e) => updateField('textMutedColor', e.target.value)}
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          />
                          <div
                            className="h-full w-full"
                            style={{
                              backgroundColor: config.textMutedColor.startsWith('#')
                                ? config.textMutedColor
                                : '#888888',
                            }}
                          />
                        </div>
                        <input
                          type="text"
                          value={config.textMutedColor}
                          onChange={(e) => updateField('textMutedColor', e.target.value)}
                          className="w-full studio-input px-2 py-1 font-mono text-[11px] text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Border Color */}
                  <div className="pt-2.5 border-t border-[rgba(255,255,255,0.06)]">
                    <label className="block text-[11px] font-medium text-[#94a3b8] mb-1">Border / Dividers</label>
                    <input
                      type="text"
                      value={config.borderColor}
                      onChange={(e) => updateField('borderColor', e.target.value)}
                      className="w-full studio-input px-3 py-1.5 font-mono text-xs text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 2. Store Branding & Announcement Accordion */}
            <div className="studio-accordion-card">
              <button
                type="button"
                onClick={() => toggleSection('branding')}
                className="w-full flex items-center justify-between p-3 text-left font-semibold text-white hover:bg-[#161a27] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4 text-blue-400" />
                  <span>Store Branding & Announcement</span>
                </div>
                {openSection === 'branding' ? (
                  <ChevronUp className="h-4 w-4 text-[#94a3b8]" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-[#94a3b8]" />
                )}
              </button>

              {openSection === 'branding' && (
                <div className="p-3.5 pt-1 space-y-3.5 border-t border-[rgba(255,255,255,0.06)]">
                  <div>
                    <label className="block text-[11px] font-medium text-[#94a3b8] mb-1">Store Brand Name</label>
                    <input
                      type="text"
                      value={config.storeName}
                      onChange={(e) => updateField('storeName', e.target.value)}
                      className="w-full studio-input px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#94a3b8] mb-1">Brand Tagline</label>
                    <input
                      type="text"
                      value={config.tagline}
                      onChange={(e) => updateField('tagline', e.target.value)}
                      className="w-full studio-input px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#94a3b8] mb-1">
                      Top Announcement Bar Text
                    </label>
                    <input
                      type="text"
                      value={config.announcementText}
                      onChange={(e) => updateField('announcementText', e.target.value)}
                      className="w-full studio-input px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 3. Hero Section & Media Accordion */}
            <div className="studio-accordion-card">
              <button
                type="button"
                onClick={() => toggleSection('hero')}
                className="w-full flex items-center justify-between p-3 text-left font-semibold text-white hover:bg-[#161a27] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-emerald-400" />
                  <span>Hero Stage & Images</span>
                </div>
                {openSection === 'hero' ? (
                  <ChevronUp className="h-4 w-4 text-[#94a3b8]" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-[#94a3b8]" />
                )}
              </button>

              {openSection === 'hero' && (
                <div className="p-3.5 pt-1 space-y-3.5 border-t border-[rgba(255,255,255,0.06)]">
                  <div>
                    <label className="block text-[11px] font-medium text-[#94a3b8] mb-1">Hero Headline</label>
                    <textarea
                      rows={2}
                      value={config.heroTitle}
                      onChange={(e) => updateField('heroTitle', e.target.value)}
                      className="w-full studio-input px-3 py-1.5 text-xs text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#94a3b8] mb-1">Hero Subtitle</label>
                    <textarea
                      rows={3}
                      value={config.heroSubtitle}
                      onChange={(e) => updateField('heroSubtitle', e.target.value)}
                      className="w-full studio-input px-3 py-1.5 text-xs text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#94a3b8] mb-1">CTA Button Text</label>
                    <input
                      type="text"
                      value={config.ctaText}
                      onChange={(e) => updateField('ctaText', e.target.value)}
                      className="w-full studio-input px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  {/* Hero Images Editor */}
                  <div className="space-y-2 pt-2.5 border-t border-[rgba(255,255,255,0.06)]">
                    <label className="block text-[11px] font-medium text-[#94a3b8]">
                      Hero Slide / Flagship Images
                    </label>
                    {config.heroImages.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-2 rounded-lg border border-white/10 bg-[#10131d]"
                      >
                        <img
                          src={imgUrl}
                          alt={`Hero ${idx + 1}`}
                          className="h-10 w-10 rounded-md object-cover shrink-0 border border-white/15"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-mono text-[#94a3b8] block mb-0.5">
                            Slide {idx + 1} Image URL
                          </span>
                          <input
                            type="text"
                            value={imgUrl}
                            onChange={(e) => updateHeroImage(idx, e.target.value)}
                            className="w-full studio-input px-2 py-0.5 text-[11px] text-white font-mono truncate"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Brand Story / Manifesto Accordion */}
            <div className="studio-accordion-card">
              <button
                type="button"
                onClick={() => toggleSection('story')}
                className="w-full flex items-center justify-between p-3 text-left font-semibold text-white hover:bg-[#161a27] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-purple-400" />
                  <span>Brand Story & Manifesto</span>
                </div>
                {openSection === 'story' ? (
                  <ChevronUp className="h-4 w-4 text-[#94a3b8]" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-[#94a3b8]" />
                )}
              </button>

              {openSection === 'story' && (
                <div className="p-3.5 pt-1 space-y-3.5 border-t border-[rgba(255,255,255,0.06)]">
                  <div>
                    <label className="block text-[11px] font-medium text-[#94a3b8] mb-1">Story Headline / Quote</label>
                    <textarea
                      rows={2}
                      value={config.storyHeadline}
                      onChange={(e) => updateField('storyHeadline', e.target.value)}
                      className="w-full studio-input px-3 py-1.5 text-xs text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#94a3b8] mb-1">Narrative Description</label>
                    <textarea
                      rows={3}
                      value={config.storyDescription}
                      onChange={(e) => updateField('storyDescription', e.target.value)}
                      className="w-full studio-input px-3 py-1.5 text-xs text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#94a3b8] mb-1">
                      Locations / Sub-Quote Line
                    </label>
                    <input
                      type="text"
                      value={config.storyQuote}
                      onChange={(e) => updateField('storyQuote', e.target.value)}
                      className="w-full studio-input px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 5. Featured Catalog Quick Edit Accordion */}
            <div className="studio-accordion-card">
              <button
                type="button"
                onClick={() => toggleSection('products')}
                className="w-full flex items-center justify-between p-3 text-left font-semibold text-white hover:bg-[#161a27] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-cyan-400" />
                  <span>Featured Products (Quick Edit)</span>
                </div>
                {openSection === 'products' ? (
                  <ChevronUp className="h-4 w-4 text-[#94a3b8]" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-[#94a3b8]" />
                )}
              </button>

              {openSection === 'products' && (
                <div className="p-3.5 pt-1 space-y-3 border-t border-[rgba(255,255,255,0.06)]">
                  <p className="text-[11px] text-[#94a3b8]">
                    Update top featured items live (names, prices, and image URLs):
                  </p>
                  {config.featuredProducts.map((p, idx) => (
                    <div
                      key={p.id}
                      className="p-2.5 rounded-lg border border-white/10 bg-[#10131d] space-y-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-12 w-12 rounded-lg object-cover border border-white/15 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <input
                            type="text"
                            value={p.name}
                            onChange={(e) => updateProduct(idx, { name: e.target.value })}
                            className="w-full font-semibold text-xs text-white bg-transparent border-b border-white/15 pb-0.5 focus:border-indigo-400 outline-none truncate"
                            placeholder="Product Name"
                          />
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[11px] text-[#94a3b8]">$</span>
                            <input
                              type="number"
                              value={p.price}
                              onChange={(e) => updateProduct(idx, { price: Number(e.target.value) })}
                              className="w-20 studio-input px-1.5 py-0.5 text-xs text-white font-mono"
                            />
                            <input
                              type="text"
                              value={p.category || ''}
                              onChange={(e) => updateProduct(idx, { category: e.target.value })}
                              className="w-24 studio-input px-1.5 py-0.5 text-[11px] text-[#94a3b8] truncate"
                              placeholder="Category"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-[#64748b] block mb-0.5">Image URL:</span>
                        <input
                          type="text"
                          value={p.image}
                          onChange={(e) => updateProduct(idx, { image: e.target.value })}
                          className="w-full studio-input px-2 py-1 text-[10px] text-white font-mono truncate"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 6. Footer & Concierge Accordion */}
            <div className="studio-accordion-card">
              <button
                type="button"
                onClick={() => toggleSection('footer')}
                className="w-full flex items-center justify-between p-3 text-left font-semibold text-white hover:bg-[#161a27] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-rose-400" />
                  <span>Footer & Salon Concierge</span>
                </div>
                {openSection === 'footer' ? (
                  <ChevronUp className="h-4 w-4 text-[#94a3b8]" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-[#94a3b8]" />
                )}
              </button>

              {openSection === 'footer' && (
                <div className="p-3.5 pt-1 space-y-3.5 border-t border-[rgba(255,255,255,0.06)]">
                  <div>
                    <label className="block text-[11px] font-medium text-[#94a3b8] mb-1">Newsletter Headline</label>
                    <input
                      type="text"
                      value={config.newsletterHeading}
                      onChange={(e) => updateField('newsletterHeading', e.target.value)}
                      className="w-full studio-input px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#94a3b8] mb-1">Newsletter Subtitle</label>
                    <textarea
                      rows={2}
                      value={config.newsletterSubtitle}
                      onChange={(e) => updateField('newsletterSubtitle', e.target.value)}
                      className="w-full studio-input px-3 py-1.5 text-xs text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#94a3b8] mb-1">
                      Concierge / Support Email
                    </label>
                    <input
                      type="email"
                      value={config.contactEmail}
                      onChange={(e) => updateField('contactEmail', e.target.value)}
                      className="w-full studio-input px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#94a3b8] mb-1">
                      Location Details / Headquarters
                    </label>
                    <input
                      type="text"
                      value={config.locationDetails}
                      onChange={(e) => updateField('locationDetails', e.target.value)}
                      className="w-full studio-input px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#94a3b8] mb-1">Copyright Notice</label>
                    <input
                      type="text"
                      value={config.copyrightNotice}
                      onChange={(e) => updateField('copyrightNotice', e.target.value)}
                      className="w-full studio-input px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Right Side: Live Store Preview Viewport */}
        <main className="flex-1 h-full overflow-hidden studio-canvas-bg p-4 sm:p-6 flex flex-col items-center justify-center">
          {/* Simulated Browser or Mobile Frame Container */}
          <div
            className={`flex flex-col transition-all duration-300 h-full ${
              viewport === 'mobile'
                ? 'studio-device-mobile'
                : viewport === 'tablet'
                ? 'studio-device-tablet'
                : 'studio-device-desktop'
            }`}
          >
            {/* Desktop macOS Browser Header Bar */}
            {viewport === 'desktop' && (
              <div className="shrink-0 flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] bg-[#11141e] px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-[#ff5f57] border border-[#e0443e] cursor-pointer" />
                    <div className="h-3 w-3 rounded-full bg-[#febc2e] border border-[#d89e24] cursor-pointer" />
                    <div className="h-3 w-3 rounded-full bg-[#28c840] border border-[#1aab29] cursor-pointer" />
                  </div>
                  <button
                    onClick={handleReloadPreview}
                    className={`ml-2 text-[#94a3b8] hover:text-white transition-all cursor-pointer ${
                      isReloading ? 'animate-spin text-indigo-400' : ''
                    }`}
                    title="Reload preview"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Centered URL Address Bar */}
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#090b10] px-3.5 py-1 text-xs text-[#94a3b8] shadow-inner max-w-md w-full justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <Lock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate font-mono text-[11px] text-white/90">
                      {currentMeta?.url || 'https://storefront-engine.local/'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>200 OK</span>
                    </span>
                  </div>
                </div>

                {/* Right Header Actions */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#64748b]">1440 × 900</span>
                  <button
                    onClick={() => {
                      setIsGoLive(true);
                      showToast('Entered fullscreen live preview');
                    }}
                    className="text-xs text-[#94a3b8] hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    title="Open full view"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Full View</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Dynamic Island Top Notch */}
            {viewport === 'mobile' && (
              <div className="studio-dynamic-island">
                <div className="studio-sensor" />
                <div className="studio-camera-lens" />
              </div>
            )}

            {/* Rendered Template View */}
            <div
              id="store-preview-scroll"
              className={`relative flex-1 overflow-y-auto overflow-x-hidden scroll-smooth ${
                viewport === 'mobile'
                  ? 'studio-screen-inner-mobile'
                  : viewport === 'tablet'
                  ? 'studio-screen-inner'
                  : ''
              }`}
            >
              {activeTemplate === 'aurelia' && (
                <AureliaStoreView
                  storeName={config.storeName}
                  tagline={config.tagline}
                  heroTitle={config.heroTitle}
                  heroSubtitle={config.heroSubtitle}
                  ctaText={config.ctaText}
                  accentColor={config.accentColor}
                  backgroundColor={config.backgroundColor}
                  surfaceColor={config.surfaceColor}
                  textColor={config.textColor}
                  textMutedColor={config.textMutedColor}
                  borderColor={config.borderColor}
                  announcementText={config.announcementText}
                  heroImages={config.heroImages}
                  storyHeadline={config.storyHeadline}
                  storyDescription={config.storyDescription}
                  storyQuote={config.storyQuote}
                  featuredProducts={config.featuredProducts}
                  newsletterHeading={config.newsletterHeading}
                  newsletterSubtitle={config.newsletterSubtitle}
                  contactEmail={config.contactEmail}
                  locationDetails={config.locationDetails}
                  copyrightNotice={config.copyrightNotice}
                  isInsidePreview={true}
                />
              )}

              {activeTemplate === 'lumina' && (
                <LuminaStoreView
                  storeName={config.storeName}
                  tagline={config.tagline}
                  heroTitle={config.heroTitle}
                  heroSubtitle={config.heroSubtitle}
                  ctaText={config.ctaText}
                  accentColor={config.accentColor}
                  backgroundColor={config.backgroundColor}
                  surfaceColor={config.surfaceColor}
                  textColor={config.textColor}
                  textMutedColor={config.textMutedColor}
                  borderColor={config.borderColor}
                  announcementText={config.announcementText}
                  heroImages={config.heroImages}
                  storyHeadline={config.storyHeadline}
                  storyDescription={config.storyDescription}
                  storyQuote={config.storyQuote}
                  featuredProducts={config.featuredProducts}
                  newsletterHeading={config.newsletterHeading}
                  newsletterSubtitle={config.newsletterSubtitle}
                  contactEmail={config.contactEmail}
                  locationDetails={config.locationDetails}
                  copyrightNotice={config.copyrightNotice}
                  isInsidePreview={true}
                />
              )}

              {activeTemplate === 'apex' && (
                <ApexStoreView
                  storeName={config.storeName}
                  tagline={config.tagline}
                  heroTitle={config.heroTitle}
                  heroSubtitle={config.heroSubtitle}
                  ctaText={config.ctaText}
                  accentColor={config.accentColor}
                  backgroundColor={config.backgroundColor}
                  surfaceColor={config.surfaceColor}
                  textColor={config.textColor}
                  textMutedColor={config.textMutedColor}
                  borderColor={config.borderColor}
                  announcementText={config.announcementText}
                  heroImages={config.heroImages}
                  storyHeadline={config.storyHeadline}
                  storyDescription={config.storyDescription}
                  storyQuote={config.storyQuote}
                  featuredProducts={config.featuredProducts}
                  newsletterHeading={config.newsletterHeading}
                  newsletterSubtitle={config.newsletterSubtitle}
                  contactEmail={config.contactEmail}
                  locationDetails={config.locationDetails}
                  copyrightNotice={config.copyrightNotice}
                  isInsidePreview={true}
                />
              )}

              {activeTemplate === 'petit' && (
                <PetitStoreView
                  storeName={config.storeName}
                  tagline={config.tagline}
                  heroTitle={config.heroTitle}
                  heroSubtitle={config.heroSubtitle}
                  ctaText={config.ctaText}
                  accentColor={config.accentColor}
                  backgroundColor={config.backgroundColor}
                  surfaceColor={config.surfaceColor}
                  textColor={config.textColor}
                  textMutedColor={config.textMutedColor}
                  borderColor={config.borderColor}
                  announcementText={config.announcementText}
                  heroImages={config.heroImages}
                  storyHeadline={config.storyHeadline}
                  storyDescription={config.storyDescription}
                  storyQuote={config.storyQuote}
                  featuredProducts={config.featuredProducts}
                  newsletterHeading={config.newsletterHeading}
                  newsletterSubtitle={config.newsletterSubtitle}
                  contactEmail={config.contactEmail}
                  locationDetails={config.locationDetails}
                  copyrightNotice={config.copyrightNotice}
                  isInsidePreview={true}
                />
              )}

              {activeTemplate === 'solenne' && (
                <SolenneStoreView
                  storeName={config.storeName}
                  tagline={config.tagline}
                  heroTitle={config.heroTitle}
                  heroSubtitle={config.heroSubtitle}
                  ctaText={config.ctaText}
                  accentColor={config.accentColor}
                  backgroundColor={config.backgroundColor}
                  surfaceColor={config.surfaceColor}
                  textColor={config.textColor}
                  textMutedColor={config.textMutedColor}
                  borderColor={config.borderColor}
                  announcementText={config.announcementText}
                  heroImages={config.heroImages}
                  storyHeadline={config.storyHeadline}
                  storyDescription={config.storyDescription}
                  featuredProducts={config.featuredProducts}
                  newsletterHeading={config.newsletterHeading}
                  newsletterSubtitle={config.newsletterSubtitle}
                  contactEmail={config.contactEmail}
                  copyrightNotice={config.copyrightNotice}
                  isInsidePreview={true}
                />
              )}

              {activeTemplate === 'obsidian' && (
                <ObsidianStoreView
                  storeName={config.storeName}
                  tagline={config.tagline}
                  heroTitle={config.heroTitle}
                  heroSubtitle={config.heroSubtitle}
                  ctaText={config.ctaText}
                  accentColor={config.accentColor}
                  backgroundColor={config.backgroundColor}
                  surfaceColor={config.surfaceColor}
                  textColor={config.textColor}
                  heroImages={config.heroImages}
                  contactEmail={config.contactEmail}
                  locationDetails={config.locationDetails}
                  copyrightNotice={config.copyrightNotice}
                  isInsidePreview={true}
                />
              )}

              {activeTemplate === 'terra' && (
                <TerraStoreView
                  primaryColor={config.accentColor}
                  secondaryColor="#3B583E"
                  accentColor="#C9A227"
                  surfaceColor={config.surfaceColor}
                  backgroundColor={config.backgroundColor}
                  textColor={config.textColor}
                />
              )}

              {activeTemplate !== 'aurelia' &&
                activeTemplate !== 'lumina' &&
                activeTemplate !== 'apex' &&
                activeTemplate !== 'petit' &&
                activeTemplate !== 'solenne' &&
                activeTemplate !== 'obsidian' &&
                activeTemplate !== 'terra' && (
                  <div className="flex min-h-[600px] flex-col items-center justify-center p-8 text-center text-white">
                    <div className="rounded-full bg-indigo-500/10 p-4 text-indigo-400 mb-4">
                      <Sparkles className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-wider">{activeTemplate} Storefront</h3>
                    <p className="mt-2 max-w-md text-sm text-[#94a3b8]">
                      Select any of the 7 completed 1:1 match templates below to inspect them live.
                    </p>
                    <button
                      onClick={() => handleSwitchTemplate('terra')}
                      className="mt-6 rounded-lg bg-indigo-600 px-5 py-2 text-xs font-semibold text-white cursor-pointer hover:bg-indigo-500 transition-colors"
                    >
                      View Terra & Cru (Artisan Groceries)
                    </button>
                  </div>
                )}
            </div>
          </div>
        </main>
      </div>

      {/* Underneath Store Switcher Bar (Elevated Single-Row Dock) */}
      <footer id="template-switcher-bar" className="flex h-16 shrink-0 items-center justify-between studio-dock-glass px-4 sm:px-6 z-30">
        {/* Left Status Indicator */}
        <div className="hidden xl:flex items-center gap-3 shrink-0 pr-4 border-r border-white/10">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          <div>
            <div className="text-[11px] font-bold tracking-wider uppercase text-white">Templates</div>
            <div className="text-[10px] text-emerald-400 font-medium">7 of 8 1:1 Verified</div>
          </div>
        </div>

        {/* Center: Horizontal Scrollable Segmented Dock */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-1 no-scrollbar flex-1 justify-start xl:justify-center">
          {(
            [
              'aurelia',
              'lumina',
              'apex',
              'petit',
              'solenne',
              'obsidian',
              'terra',
              'savory',
            ] as TemplateId[]
          ).map((tId) => {
            const item = TEMPLATE_META[tId];
            const isActive = activeTemplate === tId;
            const IconComponent = item.icon;

            return (
              <button
                key={tId}
                onClick={() => handleSwitchTemplate(tId)}
                className={`group flex items-center gap-2 rounded-xl border px-3 py-2 text-xs transition-all cursor-pointer shrink-0 studio-dock-btn ${
                  isActive
                    ? 'border-white/30 bg-[#1e2436] text-white shadow-lg studio-dock-btn-active'
                    : 'border-white/5 bg-[#121520]/80 text-[#94a3b8] hover:border-white/15 hover:bg-[#161a27] hover:text-white'
                }`}
                style={isActive ? { color: item.color } : {}}
              >
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-lg shrink-0 transition-colors"
                  style={{
                    backgroundColor: isActive ? `${item.color}25` : 'rgba(255,255,255,0.05)',
                    color: isActive ? item.color : '#94a3b8',
                  }}
                >
                  <IconComponent className="h-3.5 w-3.5" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-white leading-none">{item.name}</span>
                    <span
                      className="rounded px-1.5 py-0.2 text-[8px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${item.color}20`,
                        color: item.color,
                        border: `1px solid ${item.color}40`,
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#64748b] block leading-none mt-0.5">{item.category}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Status Pill */}
        <div className="hidden md:flex items-center gap-2 shrink-0 pl-4 border-l border-white/10">
          <div className="text-right">
            <span className="text-[11px] text-[#94a3b8] block leading-tight">Active Engine</span>
            <span className="text-xs font-semibold text-white" style={{ color: currentMeta.color }}>
              {currentMeta.brand}
            </span>
          </div>
          <button
            onClick={() => {
              setIsGoLive(true);
              showToast('Entered fullscreen live preview');
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white cursor-pointer transition-colors"
            title="Go live preview"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
