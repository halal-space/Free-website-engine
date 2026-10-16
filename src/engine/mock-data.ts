import type { Collection, Merchant, Product, StorefrontConfig, StorefrontSnapshot, ThemeId } from './types';
import { THEME_DEFAULTS } from './theme-registry';

const images = {
  kidsHero: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1800&q=85',
  techHero: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1800&q=85',
  fashionHero: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1800&q=85',
};

function config(storeId: string, themeId: ThemeId, hero: string, title: string, text: string): StorefrontConfig {
  return {
    schemaVersion: 1, storeId, publishedVersion: 1, themeId,
    tokens: THEME_DEFAULTS[themeId],
    homepage: [
      { id: 'hero', kind: 'hero', enabled: true, title, text, image: hero },
      { id: 'collections', kind: 'collections', enabled: true, title: 'Find your favourite' },
      { id: 'featured', kind: 'featured', enabled: true, title: 'Thoughtfully chosen' },
      { id: 'story', kind: 'story', enabled: true, title: 'A little more about us' },
    ],
    navigation: [
      { label: 'Shop', href: '/shop' },
      { label: 'Our story', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    seo: { description: text },
  };
}

function product(storeId: string, collectionId: string, id: string, name: string, priceMinor: number, image: string, description: string, currency = 'USD'): Product {
  return { id, storeId, collectionId, slug: id, name, priceMinor, currency, image, images: [image], description, available: true, featured: true };
}

function collection(storeId: string, id: string, name: string, image: string, description: string): Collection {
  return { id, storeId, slug: id, name, image, description };
}

const sproutMerchant: Merchant = {
  id: 'sprout-and-co', name: 'Sprout & Co.', tagline: 'Little things, big wonder.', logoText: 'sprout & co.',
  email: 'hello@sprout.example', location: 'Made for curious little lives', currency: 'USD',
  domains: ['sprout.localhost', 'sprout.example.com'],
  about: 'We believe childhood should be full of discovery. Our collection brings together beautiful, useful things that make everyday moments feel special.',
  policies: { privacy: 'We only use customer information to serve and support orders. This demo does not collect real customer data.', terms: 'All products and orders on this demo storefront are illustrative.', shipping: 'Shipping options and charges will be confirmed by the merchant backend at checkout.', returns: 'Return eligibility and timelines will be confirmed by the merchant backend.' },
};

const formMerchant: Merchant = {
  id: 'form-and-function', name: 'Form & Function', tagline: 'Technology worth living with.', logoText: 'FORM / FUNCTION',
  email: 'support@form.example', location: 'Designed for what comes next', currency: 'USD',
  domains: ['form.localhost', 'form.example.com'],
  about: 'We curate useful technology with exceptional attention to detail: considered materials, enduring performance, and a quieter approach to innovation.',
  policies: { privacy: 'We only use customer information to serve and support orders. This demo does not collect real customer data.', terms: 'All products and orders on this demo storefront are illustrative.', shipping: 'Shipping options and charges will be confirmed by the merchant backend at checkout.', returns: 'Return eligibility and timelines will be confirmed by the merchant backend.' },
};

const maisonMerchant: Merchant = {
  id: 'maison-lune', name: 'Maison Lune', tagline: 'An edit of modern essentials.', logoText: 'MAISON LUNE',
  email: 'concierge@maison.example', location: 'Paris · Everywhere', currency: 'USD',
  domains: ['maison.localhost', 'maison.example.com'],
  about: 'A contemporary wardrobe defined by ease, shape, and longevity. Pieces to wear often, keep longer, and make your own.',
  policies: { privacy: 'We only use customer information to serve and support orders. This demo does not collect real customer data.', terms: 'All products and orders on this demo storefront are illustrative.', shipping: 'Shipping options and charges will be confirmed by the merchant backend at checkout.', returns: 'Return eligibility and timelines will be confirmed by the merchant backend.' },
};

export const MOCK_STORES: Record<string, StorefrontSnapshot> = {
  'sprout-and-co': {
    merchant: sproutMerchant,
    config: config('sprout-and-co', 'playful', images.kidsHero, 'Room to grow.\nSpace to wonder.', 'Beautiful everyday discoveries for the little people who make life extraordinary.'),
    collections: [
      collection('sprout-and-co', 'play', 'Playtime', 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=900&q=85', 'Curiosity starts here.'),
      collection('sprout-and-co', 'wear', 'Little wardrobe', 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=900&q=85', 'Comfort made for adventure.'),
      collection('sprout-and-co', 'room', 'Their space', 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&q=85', 'A world of their own.'),
    ],
    products: [
      product('sprout-and-co', 'play', 'woodland-blocks', 'Woodland building blocks', 4200, 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=900&q=85', 'A playful set of wooden shapes for endless imaginative afternoons.'),
      product('sprout-and-co', 'wear', 'soft-knit-cardigan', 'Soft knit cardigan', 5800, 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=900&q=85', 'A cozy layer for little adventures, made to last.'),
      product('sprout-and-co', 'room', 'little-cloud-lamp', 'Little cloud lamp', 3600, 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=900&q=85', 'A gentle glow for stories and sleepy evenings.'),
      product('sprout-and-co', 'play', 'rainbow-stacker', 'Rainbow stacker', 3900, 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=900&q=85', 'A bright invitation to build, sort, and imagine.'),
    ],
  },
  'form-and-function': {
    merchant: formMerchant,
    config: config('form-and-function', 'precision', images.techHero, 'Objects for\nthe next era.', 'Technology selected for clarity, capability, and lasting appeal.'),
    collections: [
      collection('form-and-function', 'audio', 'Audio', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85', 'Hear every detail.'),
      collection('form-and-function', 'desk', 'The desk', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=85', 'Make space for better work.'),
      collection('form-and-function', 'mobile', 'On the move', 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=900&q=85', 'Built to go further.'),
    ],
    products: [
      product('form-and-function', 'audio', 'arc-headphones', 'Arc wireless headphones', 24900, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85', 'Immersive sound, effortless fit, considered design.'),
      product('form-and-function', 'desk', 'studio-keyboard', 'Studio mechanical keyboard', 18900, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&q=85', 'A precise tactile experience for focused work.'),
      product('form-and-function', 'mobile', 'everyday-camera', 'Everyday compact camera', 42900, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=85', 'A small camera with a remarkable point of view.'),
      product('form-and-function', 'audio', 'sound-mini', 'Sound Mini speaker', 15900, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=900&q=85', 'Room-filling sound in a beautifully compact form.'),
    ],
  },
  'maison-lune': {
    merchant: maisonMerchant,
    config: config('maison-lune', 'editorial', images.fashionHero, 'A wardrobe\nfor living.', 'Modern pieces with a quiet confidence. Designed to be worn your way.'),
    collections: [
      collection('maison-lune', 'ready-to-wear', 'Ready to wear', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=85', 'The everyday edit.'),
      collection('maison-lune', 'accessories', 'Accessories', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=85', 'The finishing touch.'),
      collection('maison-lune', 'essentials', 'Essentials', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85', 'Made to return to.'),
    ],
    products: [
      product('maison-lune', 'ready-to-wear', 'the-atelier-coat', 'The Atelier coat', 32000, 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=900&q=85', 'A softly structured coat with an effortless silhouette.'),
      product('maison-lune', 'essentials', 'cotton-poplin-shirt', 'Cotton poplin shirt', 12800, 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=900&q=85', 'A crisp wardrobe essential with thoughtful proportions.'),
      product('maison-lune', 'accessories', 'everyday-tote', 'Everyday leather tote', 21800, 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=85', 'Considered space for everything that matters.'),
      product('maison-lune', 'ready-to-wear', 'fluid-trouser', 'Fluid wide-leg trouser', 15400, 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=85', 'Easy movement and elegant drape for every day.'),
    ],
  },
};
