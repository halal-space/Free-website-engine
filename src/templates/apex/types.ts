export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  specsSummary?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  comment: string;
  helpfulCount: number;
}

export interface ProductFeature {
  icon: string;
  title: string;
  description: string;
}

export interface TechnicalSpecCategory {
  category: string;
  items: { name: string; value: string }[];
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  stockCount: number;
  description: string;
  longDescription: string;
  images: string[];
  colors: ProductColor[];
  variants?: ProductVariant[];
  specs: Record<string, string>;
  technicalSpecs?: TechnicalSpecCategory[];
  features: ProductFeature[];
  inTheBox: string[];
  reviews: ProductReview[];
  faqs: ProductFaq[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  productCount: number;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique item id composed of productId + color + variant
  productId: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: ProductColor;
  variant?: ProductVariant;
  quantity: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  trackingNumber: string;
  estimatedDelivery: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
