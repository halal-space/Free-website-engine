export type ProductType = 'panel' | 'battery' | 'inverter' | 'ev';

export interface Product {
  slug: string;
  name: string;
  brand: string;
  type: ProductType;
  tagline: string;
  specs: string[];
  specLine: string;
  price: number;
  unit: string;
  wattage?: number;
  capacityKwh?: number;
  warranty: string;
  image: string;
  badge?: string;
  description: string;
}

export interface Project {
  name: string;
  location: string;
  size: string;
  duration: string;
  output: string;
  billCut: string;
  image: string;
  summary: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
  system: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export interface CalculationResult {
  kw: number;
  gen: number;
  cost: number;
  yr1: number;
  payback: number;
  save25: number;
}

export interface QuoteFormData {
  name: string;
  phone: string;
  email: string;
  ptype: string;
  address: string;
  bill: string;
  billFile?: string;
  message: string;
}

export type ObsidianView =
  | 'home'
  | 'products'
  | 'product'
  | 'services'
  | 'projects'
  | 'about'
  | 'quote'
  | 'faq'
  | 'privacy'
  | 'terms';
