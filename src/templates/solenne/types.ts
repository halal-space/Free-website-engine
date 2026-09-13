export type Category =
  | 'cleansers'
  | 'serums'
  | 'moisturizers'
  | 'face-oils'
  | 'masks'
  | 'body-care';

export interface ProductSize {
  label: string;
  modifier: number;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: Category;
  price: number;
  rating: number;
  reviewCount: number;
  sizes: ProductSize[];
  badge?: 'New' | 'Best Seller' | 'Limited';
  description: string;
  benefits: string[];
  howToUse: string;
  heroIngredients: string[];
  inci: string;
  skinTypes: string[];
  concern: string;
  images: [string, string];
}

export interface CategoryItem {
  id: Category;
  label: string;
  blurb: string;
  image: string;
}

export interface HeroContent {
  eyebrow: string;
  title: [string, string];
  text: string;
  image: string;
  imageAlt: string;
  secondaryImage: string;
  secondaryImageAlt: string;
}

export interface EditorialContent {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  imageMain: string;
  imageMainAlt: string;
  imageSecondary: string;
  imageSecondaryAlt: string;
}

export interface FeaturedCollectionContent {
  eyebrow: string;
  title: string;
  text: string;
  imageWide: string;
  imageWideAlt: string;
  slugs: string[];
}

export interface Ingredient {
  name: string;
  origin: string;
  role: string;
  text: string;
}

export interface RitualStep {
  step: string;
  name: string;
  title: string;
  text: string;
  productSlug: string;
  image: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  rating: number;
  product: string;
}

export interface ManifestoContent {
  eyebrow: string;
  title: string;
  points: Array<{ title: string; text: string }>;
  image: string;
  imageAlt: string;
}

export interface JournalPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
  imageAlt: string;
}

export interface AboutContent {
  heroTitle: string;
  intro: string;
  story: string[];
  values: Array<{ title: string; text: string }>;
  images: {
    portrait: string;
    lab: string;
    wide: string;
  };
}

export interface CartItem {
  slug: string;
  sizeIndex: number;
  qty: number;
}

export interface CartLine {
  item: CartItem;
  product: Product;
  unitPrice: number;
  lineTotal: number;
}

export interface ProductReview {
  author: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  verified: boolean;
}
