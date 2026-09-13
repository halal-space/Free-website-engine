export interface ProductColor {
  name: string;
  hex: string;
  tailwindClass?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  inStock: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: 'Baby Essentials' | 'Baby Accessories' | 'Nursery & Feeding' | 'Toys & Play' | "Kids' Clothing" | 'School Essentials';
  categorySlug: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: ProductColor[];
  sizes?: string[];
  ageRange: '0-6M' | '6-12M' | '1-3Y' | '3-6Y' | '6Y+';
  ageRangeLabel: string;
  inStock: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isOrganic?: boolean;
  description: string;
  editorialQuote?: string;
  features: string[];
  materials: string;
  careInstructions: string;
  dimensions?: string;
  certifications: string[];
  reviews: ProductReview[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  image: string;
  featured: boolean;
}

export interface CuratedCollection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  slug: string;
  itemCount: number;
  tag: string;
}

export interface CartItem {
  id: string; // product id + color + size
  productId: string;
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  selectedSize?: string;
  price: number;
}

export interface StoreReview {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  productName: string;
  productSlug: string;
  quote: string;
  verified: boolean;
  avatar: string;
}
