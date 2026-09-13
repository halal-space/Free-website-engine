export interface Category {
  slug: string;
  name: string;
  blurb: string;
  badge: string;
  image: string;
}

export interface TastingAxis {
  label: string;
  value: number; // 0-100
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAt?: number;
  origin: string;
  volume: string;
  badges: string[];
  rating: number;
  reviews: number;
  image: string;
  lifestyle: string;
  alt: string;
  description: string;
  tasting: TastingAxis[];
  batch: string;
  stock: number;
  producer: string;
  region: string;
  harvest: string;
  shelfLife: string;
  storage: string;
  ingredients: string;
  allergens: string;
  bestseller?: boolean;
}

export interface Maker {
  slug: string;
  name: string;
  region: string;
  image: string;
  certs: string[];
  metric: string;
  harvest: string;
  story: string;
  practices: string[];
}

export interface Recipe {
  slug: string;
  title: string;
  time: string;
  servings: string;
  image: string;
  productIds: string[];
  blurb: string;
  intro: string;
  steps: string[];
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartLine {
  id: string;
  name: string;
  price: number;
  image: string;
  slug?: string;
  qty: number;
  meta?: string;
}

export interface ToastNotification {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warning';
}

export type TerraView =
  | 'home'
  | 'shop'
  | 'product'
  | 'box'
  | 'recipes'
  | 'recipe'
  | 'makers'
  | 'cart'
  | 'checkout'
  | 'checkout-success'
  | 'about'
  | 'faq'
  | 'shipping'
  | 'contact'
  | 'account'
  | 'legal'
  | 'search'
  | '404';

export interface OrderRecord {
  ref: string;
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  carbonNeutral: boolean;
  total: number;
  timestamp: string;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
  };
}
