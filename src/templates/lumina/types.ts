export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
  label: string;
}

export type ProductCategory = 
  | 'outerwear'
  | 'tailoring'
  | 'dresses'
  | 'knitwear'
  | 'leather-accessories';

export interface ProductColor {
  name: string;
  hex: string;
  imageIndex?: number;
}

export interface ProductSize {
  name: string;
  inStock: boolean;
  stockCount?: number;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  categoryLabel: string;
  collection: string;
  price: number; // in USD
  originalPrice?: number;
  isNew?: boolean;
  isLimited?: boolean;
  editionNumber?: string;
  badge?: string;
  description: string;
  editorialQuote?: string;
  composition: string;
  origin: string;
  details: string[];
  careInstructions: string[];
  specs: ProductSpecification[];
  colors: ProductColor[];
  sizes: ProductSize[];
  images: {
    url: string;
    alt: string;
    type: 'mannequin' | 'flatlay' | 'hanger' | 'macro' | 'detail';
    label?: string;
  }[];
  rating: number;
  reviewCount: number;
  completeTheLookIds?: string[];
}

export interface CartItem {
  id: string; // unique item id: product.id + selectedColor + selectedSize
  productId: string;
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  price: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface CollectionItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  season: string;
  year: string;
  description: string;
  heroImage: string;
  secondaryImage: string;
  curatorNote: string;
  featuredProductIds: string[];
}

export interface EditorialArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  image: string;
  date: string;
  quote: string;
  summary: string;
  shoppableProductIds?: string[];
}

export interface LookbookHotspot {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  productId: string;
}

export interface LookbookItem {
  id: string;
  lookNumber: string;
  title: string;
  season: string;
  image: string;
  description: string;
  hotspots: LookbookHotspot[];
}

export interface PressQuote {
  publication: string;
  quote: string;
  issue: string;
  author: string;
}
