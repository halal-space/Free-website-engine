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

export const storeReviews: StoreReview[] = [
  {
    id: 'rev-store-1',
    author: 'Clara Beaumont',
    role: 'Mother of two (4mo & 3yo)',
    location: 'Kensington, London',
    rating: 5,
    productName: 'The Heirloom Muslin Swaddle Blanket',
    productSlug: 'heirloom-organic-muslin-swaddle-blanket',
    quote: 'Everything feels so thoughtfully selected. I found beautiful essentials for my baby without having to search through dozens of stores. The muslin swaddle is softer than anything we’ve owned.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'rev-store-2',
    author: 'Julian & Sophia Vance',
    role: 'First-time parents',
    location: 'Stockholm, Sweden',
    rating: 5,
    productName: 'Minimalist Silicone Mealtime & Feeding Set',
    productSlug: 'pure-silicone-toddler-mealtime-feeding-set',
    quote: 'Maison Petit has transformed our daily routines. The silicone feeding set actually sticks to high-chair trays, and the aesthetic complements our calm home perfectly. True luxury for modern parents.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'rev-store-3',
    author: 'Genevieve Moreau',
    role: 'Architect & Mother of three',
    location: 'Paris, France',
    rating: 5,
    productName: "Children's Recycled Canvas Explorer Backpack",
    productSlug: 'ergonomic-recycled-canvas-explorer-backpack',
    quote: 'The craftsmanship is impeccable. In a market flooded with garish plastic, discovering heirloom beechwood toys and ergonomic backpacks made with certified organic materials feels like a breath of fresh air.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'rev-store-4',
    author: 'Dr. Marcus Thorne',
    role: 'Pediatric specialist & Father',
    location: 'Seattle, WA',
    rating: 5,
    productName: 'Architectural Montessori Wooden Abacus',
    productSlug: 'architectural-montessori-wooden-abacus',
    quote: 'From safety certifications to ergonomic considerations, you can tell the creators genuinely understand child development. The packaging was immaculate and zero-plastic.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  }
];
