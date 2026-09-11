/**
 * Unified product types — merged from the actual data shapes across all 4 templates.
 *
 * Common fields (id, title, price, images, etc.) are required.
 * Template-specific fields (composition, dietaryInfo, technicalSpecs, etc.) are optional.
 * The backend returns this full shape; each template's components access only the
 * subset of fields they need.
 *
 * Also defines CartItem and WishlistItem — the type contracts for client-side
 * Zustand stores implemented in Blueprint #3.
 */

// ── Shared Sub-Types ─────────────────────────────────────

/**
 * A selectable color option for a product.
 * Aurelia uses `id` as the key; other templates key by `name`.
 * `imageIndex` (Atelier) or `image` (Aether) link the color to a specific visual.
 */
export interface ProductColor {
  id?: string;
  name: string;
  hex: string;
  imageIndex?: number;
  image?: string;
}

/**
 * A product variant (e.g. storage capacity, model tier).
 * `price`/`compareAtPrice` override the base product price when present.
 */
export interface ProductVariant {
  id: string;
  label: string;
  price?: number;
  compareAtPrice?: number;
  inStock?: boolean;
  specsSummary?: string;
}

/** A garment size with stock availability — fashion templates (Atelier Vélène). */
export interface ProductSize {
  name: string;
  inStock: boolean;
  stockCount?: number;
}

/** A single key-value specification (flat list format). */
export interface ProductSpec {
  label: string;
  value: string;
}

/** A grouped category of specifications — gadget templates use this for organized spec sheets. */
export interface ProductSpecCategory {
  category: string;
  items: ProductSpec[];
}

/**
 * A product feature highlight.
 * `icon` is a Lucide icon name (Aether uses this); Aurelia uses plain string arrays instead.
 */
export interface ProductFeature {
  icon?: string;
  title: string;
  description?: string;
}

/** A customer review with rating, verification status, and helpfulness count. */
export interface ProductReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  helpfulCount?: number;
}

/** A product FAQ entry — common across gadget templates. */
export interface ProductFAQ {
  question: string;
  answer: string;
}

/**
 * A product image with alt text and optional type classification.
 * Fashion templates use `type` to differentiate mannequin/flatlay/macro shots.
 */
export interface ProductImage {
  url: string;
  alt: string;
  type?: 'primary' | 'gallery' | 'mannequin' | 'flatlay' | 'hanger' | 'macro' | 'detail';
  label?: string;
}

/** Badge types displayed on product cards — union of all template badge systems. */
export type ProductBadge = 'new' | 'best-seller' | 'deal' | 'limited' | 'editor' | 'numbered';

/** Product availability status — drives CTA button state and stock messaging. */
export type Availability = 'in-stock' | 'low-stock' | 'pre-order' | 'sold-out';

/** Supported currency codes — limited to the currencies used across existing templates. */
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY';

// ── Unified Product ──────────────────────────────────────

/**
 * The unified product type returned by GET /api/stores/{storeId}/products.
 * Merges required core fields (common to all templates) with optional
 * template-specific extensions (fashion, dining, gadget).
 *
 * Each template's components consume only the fields they need — they don't
 * need to handle every optional field.
 */
export interface Product {
  // ─ Core (required for all templates) ─
  id: string;
  storeId: string;
  slug: string;
  title: string;
  price: number;
  currency: CurrencyCode;
  description: string;
  images: ProductImage[];
  category: string;
  categoryLabel?: string;

  // ─ Pricing & Status ─
  compareAtPrice?: number;
  discountPercent?: number;
  availability: Availability;
  stockCount: number;
  badges: ProductBadge[];
  isNew?: boolean;
  isFeatured?: boolean;

  // ─ Rating & Social Proof ─
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];

  // ─ Variants & Options ─
  colors?: ProductColor[];
  variants?: ProductVariant[];
  sizes?: ProductSize[];

  // ─ Detail Content ─
  longDescription?: string;
  tagline?: string;
  brand?: string;
  specs?: ProductSpec[];
  technicalSpecs?: ProductSpecCategory[];
  features?: ProductFeature[];
  faqs?: ProductFAQ[];
  inBox?: string[];
  relatedProductIds?: string[];

  // ─ Fashion-Specific (Atelier Vélène) ─
  subtitle?: string;
  composition?: string;
  origin?: string;
  details?: string[];
  careInstructions?: string[];
  collection?: string;
  isLimited?: boolean;
  editionNumber?: string;
  editorialQuote?: string;
  completeTheLookIds?: string[];

  // ─ Restaurant-Specific (Ember & Oak) ─
  menuCategory?: string;
  dietaryInfo?: string[];
}

// ── Cart & Wishlist ──────────────────────────────────────
// Type definitions only — Zustand store implementations live in Blueprint #3.

/**
 * A single item in the shopping cart.
 * `id` is a composite key: `${productId}-${colorId}-${variantId}-${size}`
 * to distinguish the same product in different configurations.
 */
export interface CartItem {
  id: string;
  productId: string;
  storeId: string;
  slug: string;
  title: string;
  brand?: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  selectedColor?: string;
  selectedVariant?: string;
  selectedSize?: string;
  quantity: number;
}

/**
 * A single item in the wishlist.
 * Minimal shape — full product data is re-fetched when the wishlist is displayed.
 */
export interface WishlistItem {
  productId: string;
  storeId: string;
  addedAt: string;
}
