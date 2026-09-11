/**
 * Ember & Oak (Restaurant) seed preset — warm, inviting dining storefront.
 *
 * Uses dining-specific product fields (menuCategory, dietaryInfo) and
 * section types (menu, reservation). Warm color palette with serif display font.
 */

import type { StoreConfig } from '../../types/store';
import type { Product } from '../../types/product';

/** Ember & Oak store configuration — warm, rustic, upscale dining. */
export const emberOakConfig: StoreConfig = {
  id: 'demo-ember-oak',
  name: 'Ember & Oak',
  tagline: 'Fire-kissed flavors, oak-aged traditions',
  templateId: 'dining_ember_oak',
  domain: 'demo-ember-oak',
  customDomain: null,
  theme: {
    fontPrimary: "'Inter Variable', sans-serif",
    fontDisplay: "'Cormorant Garamond', serif",
    colorBackground: '#faf6f1',
    colorSurface: '#ffffff',
    colorText: '#2c1810',
    colorTextMuted: '#8b7355',
    colorPrimary: '#8b4513',
    colorPrimaryForeground: '#ffffff',
    colorBorder: '#e6ddd3',
    colorAccent: '#c97b3a',
    borderRadius: '0.25rem',
    supportsDarkMode: false,
  },
  sections: [
    {
      blockId: 'sec_hero_01',
      componentId: 'dining:hero_ambiance',
      order: 1,
      hidden: false,
      props: {
        title: 'Ember & Oak',
        subtitle: 'An experience for the senses',
        ctaText: 'View Menu',
        ctaLink: '/menu',
      },
    },
    {
      blockId: 'sec_menu_01',
      componentId: 'dining:menu_showcase',
      order: 2,
      hidden: false,
      props: {
        title: 'Our Menu',
        showDietaryFilters: true,
      },
      dataSource: {
        type: 'menu_items',
        limit: 12,
      },
    },
    {
      blockId: 'sec_about_01',
      componentId: 'dining:story_section',
      order: 3,
      hidden: false,
      props: {
        title: 'Our Story',
        body: 'Born from a passion for open-fire cooking and locally sourced ingredients, Ember & Oak brings the primal art of flame and smoke to fine dining.',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
        imageAlt: 'Restaurant interior with open fire',
      },
    },
    {
      blockId: 'sec_reservation_01',
      componentId: 'dining:reservation_cta',
      order: 4,
      hidden: false,
      props: {
        title: 'Reserve a Table',
        subtitle: 'Join us for an unforgettable evening',
        ctaText: 'Book Now',
        phone: '+1 (555) 234-5678',
      },
    },
  ],
  metadata: {
    favicon: '/favicon.ico',
    seoTitle: 'Ember & Oak — Fire-Kissed Fine Dining',
    seoDescription: 'Upscale restaurant featuring open-fire cooking and locally sourced seasonal ingredients',
    ogImage: '/og-image.png',
  },
};

/** Ember & Oak demo menu items — uses menuCategory and dietaryInfo fields. */
export const emberOakProducts: Product[] = [
  {
    id: 'eo-001',
    storeId: 'demo-ember-oak',
    slug: 'wagyu-tomahawk',
    title: 'Wagyu Tomahawk',
    price: 95,
    currency: 'USD',
    description: 'A5 Wagyu tomahawk steak, 32oz, dry-aged 45 days, finished over oak embers.',
    images: [
      { url: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800', alt: 'Wagyu Tomahawk steak' },
    ],
    category: 'mains',
    categoryLabel: 'From the Fire',
    menuCategory: 'From the Fire',
    availability: 'in-stock',
    stockCount: 99,
    badges: ['best-seller'],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 156,
    dietaryInfo: ['gluten-free'],
  },
  {
    id: 'eo-002',
    storeId: 'demo-ember-oak',
    slug: 'burrata-heirloom',
    title: 'Burrata & Heirloom Tomato',
    price: 22,
    currency: 'USD',
    description: 'Creamy burrata with heritage tomatoes, aged balsamic, and wild basil oil.',
    images: [
      { url: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800', alt: 'Burrata and heirloom tomato' },
    ],
    category: 'starters',
    categoryLabel: 'To Begin',
    menuCategory: 'To Begin',
    availability: 'in-stock',
    stockCount: 99,
    badges: [],
    isFeatured: true,
    rating: 4.7,
    reviewCount: 89,
    dietaryInfo: ['vegetarian', 'gluten-free'],
  },
  {
    id: 'eo-003',
    storeId: 'demo-ember-oak',
    slug: 'oak-smoked-salmon',
    title: 'Oak-Smoked Salmon',
    price: 28,
    currency: 'USD',
    description: 'Wild-caught salmon, cold-smoked over oak chips, served with crème fraîche and capers.',
    images: [
      { url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800', alt: 'Smoked salmon plate' },
    ],
    category: 'starters',
    categoryLabel: 'To Begin',
    menuCategory: 'To Begin',
    availability: 'in-stock',
    stockCount: 99,
    badges: ['new'],
    isNew: true,
    isFeatured: true,
    rating: 4.6,
    reviewCount: 34,
    dietaryInfo: ['gluten-free', 'dairy-free'],
  },
  {
    id: 'eo-004',
    storeId: 'demo-ember-oak',
    slug: 'chocolate-lava-cake',
    title: 'Chocolate Lava Cake',
    price: 18,
    currency: 'USD',
    description: 'Valrhona dark chocolate fondant with salted caramel center and vanilla bean ice cream.',
    images: [
      { url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800', alt: 'Chocolate lava cake' },
    ],
    category: 'desserts',
    categoryLabel: 'To Finish',
    menuCategory: 'To Finish',
    availability: 'in-stock',
    stockCount: 99,
    badges: ['best-seller'],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 201,
    dietaryInfo: ['vegetarian'],
  },
];
