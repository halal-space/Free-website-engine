export type ThemeId = 'playful' | 'precision' | 'editorial';

export type PageKind =
  | 'home' | 'shop' | 'collection' | 'product' | 'about' | 'contact'
  | 'search' | 'cart' | 'checkout' | 'confirmation' | 'tracking' | 'policy';

export type SectionKind = 'hero' | 'featured' | 'collections' | 'story' | 'announcement';

export interface DesignTokens {
  primary: string;
  secondary: string;
  accent: string;
  hover: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  displayFont: 'sans' | 'serif' | 'rounded';
  bodyFont: 'sans' | 'serif';
  headingScale: 'standard' | 'large';
  headingWeight: 'regular' | 'bold' | 'heavy';
  bodyLineHeight: 'standard' | 'relaxed';
  letterSpacing: 'tight' | 'normal';
  density: 'comfortable' | 'compact';
  containerWidth: 'standard' | 'wide';
  gridGap: 'compact' | 'standard';
  radius: 'soft' | 'sharp';
  buttonShape: 'rounded' | 'pill' | 'square';
  borderWidth: 'thin' | 'strong';
  shadow: 'none' | 'soft';
  motion: 'full' | 'subtle' | 'none';
}

export interface SectionConfig {
  id: string;
  kind: SectionKind;
  enabled: boolean;
  title?: string;
  text?: string;
  image?: string;
  collectionId?: string;
}

export interface StorefrontConfig {
  schemaVersion: 1;
  storeId: string;
  publishedVersion: number;
  themeId: ThemeId;
  tokens: DesignTokens;
  homepage: SectionConfig[];
  navigation: { label: string; href: string }[];
  seo: { description: string };
}

export interface Product {
  id: string;
  storeId: string;
  slug: string;
  name: string;
  description: string;
  priceMinor: number;
  currency: string;
  image: string;
  images: string[];
  collectionId: string;
  variantLabel?: string;
  available: boolean;
  featured?: boolean;
}

export interface Collection {
  id: string;
  storeId: string;
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface Merchant {
  id: string;
  name: string;
  tagline: string;
  logoText: string;
  email: string;
  phone?: string;
  location?: string;
  about: string;
  currency: string;
  domains: string[];
  social?: { label: string; href: string }[];
  policies: Partial<Record<'privacy' | 'terms' | 'shipping' | 'returns', string>>;
}

export interface StorefrontSnapshot {
  merchant: Merchant;
  config: StorefrontConfig;
  products: Product[];
  collections: Collection[];
}

export interface PageRoute {
  kind: PageKind;
  slug?: string;
  query?: string;
}

export interface PagePlan {
  route: PageRoute;
  storeId: string;
  themeId: ThemeId;
  title: string;
  description: string;
  sections: SectionConfig[];
  products: Product[];
  collections: Collection[];
  product?: Product;
  collection?: Collection;
  policy?: string;
}
