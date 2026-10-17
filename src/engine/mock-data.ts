import type { Collection, Merchant, Product, SectionConfig, StorefrontConfig, StorefrontSnapshot, ThemeId } from './types';
import { THEME_DEFAULTS } from './theme-registry';

const images = {
  kidsHero: '/storefront-demo/mothercare-journal-hero.png',
  techHero: '/storefront-demo/gadget-lab-hero.png',
  fashionHero: '/storefront-demo/wardrobe-studio-hero.png',
};

function config(storeId: string, themeId: ThemeId, hero: string, title: string, text: string, discoveryTitle: string, heroOptions: Pick<SectionConfig, 'eyebrow' | 'ctaLabel' | 'ctaHref'> = {}): StorefrontConfig {
  const sectionTitles: Record<string, { collections: string; featured: string; story: string }> = {
    'sprout-and-co': { collections: 'For every little moment', featured: 'Newborn essentials', story: 'Made with care' },
    'form-and-function': { collections: 'Find your category', featured: 'Chosen for everyday life', story: 'Behind the edit' },
    'maison-lune': { collections: 'The wardrobe edit', featured: 'Pieces to live in', story: 'Our point of view' },
  };
  const headings = sectionTitles[storeId];
  return {
    schemaVersion: 2, storeId, publishedVersion: 1, themeId,
    tokens: THEME_DEFAULTS[themeId],
    homepage: [
      { id: 'hero', kind: 'hero', enabled: true, title, text, image: hero, ...heroOptions },
      { id: 'discovery', kind: 'discovery', enabled: true, title: discoveryTitle },
      { id: 'collections', kind: 'collections', enabled: true, title: headings.collections },
      { id: 'featured', kind: 'featured', enabled: true, title: headings.featured },
      { id: 'story', kind: 'story', enabled: true, title: headings.story },
    ],
    navigation: [
      { label: 'Shop', href: '/shop' },
      { label: 'Our story', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    seo: { description: text },
  };
}

function product(storeId: string, collectionId: string, id: string, name: string, priceMinor: number, image: string, description: string, collectionIds: string[] = [], currency = 'USD'): Product {
  return { id, storeId, collectionId, collectionIds, slug: id, name, priceMinor, currency, image, images: [image], description, available: true, featured: true };
}

function catalogOnly(item: Product): Product { return { ...item, featured: false }; }

function collection(storeId: string, id: string, name: string, image: string, description: string, placement: Collection['placement'] = 'category'): Collection {
  return { id, storeId, slug: id, name, image, description, placement };
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
    config: config('sprout-and-co', 'm1', images.kidsHero, 'For every\nlittle beginning', 'Thoughtful essentials and gentle guidance for every new chapter.', 'Shop by stage', { eyebrow: 'The Caring Journal', ctaLabel: 'Shop newborn essentials', ctaHref: '/collections/newborn' }),
    collections: [
      collection('sprout-and-co', 'expecting', 'Expecting', '/storefront-demo/stage-expecting.png', 'Thoughtful finds for the start.', 'discovery'),
      collection('sprout-and-co', 'newborn', 'Newborn', '/storefront-demo/stage-newborn.png', 'The earliest essentials.', 'discovery'),
      collection('sprout-and-co', 'baby', '6–12 months', '/storefront-demo/stage-baby.png', 'For growing curiosity.', 'discovery'),
      collection('sprout-and-co', 'toddler', 'Toddler', '/storefront-demo/stage-toddler.png', 'Ready for every adventure.', 'discovery'),
      collection('sprout-and-co', 'newborn-essentials', 'Newborn essentials', '/storefront-demo/product-swaddles.png', 'Soft fabrics and everyday must-haves.'),
      collection('sprout-and-co', 'nursery-sleep', 'Nursery & sleep', '/storefront-demo/stage-newborn.png', 'Calmer nights start here.'),
      collection('sprout-and-co', 'gifts', 'Gifts with meaning', '/storefront-demo/product-bunny.png', 'Thoughtfully chosen for little beginnings.'),
    ],
    products: [
      product('sprout-and-co', 'newborn-essentials', 'muslin-swaddle-set', 'Muslin swaddle set (3 pack)', 3400, '/storefront-demo/product-swaddles.png', 'Three breathable organic cotton muslins in soft, everyday colors.', ['expecting', 'newborn', 'nursery-sleep']),
      product('sprout-and-co', 'gifts', 'cotton-bunny-toy', 'Organic cotton bunny soft toy', 2800, '/storefront-demo/product-bunny.png', 'A soft companion for comforting cuddles and first stories.', ['expecting', 'newborn', 'baby']),
      product('sprout-and-co', 'newborn-essentials', 'cotton-zip-sleepsuit', 'Organic cotton zip sleepsuit', 3200, '/storefront-demo/product-sleepsuit.png', 'A gentle zip layer made for easy changes and peaceful rest.', ['newborn', 'baby', 'nursery-sleep']),
      catalogOnly(product('sprout-and-co', 'gifts', 'woodland-blocks', 'Woodland building blocks', 4200, 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=900&q=85', 'A playful set of wooden shapes for endless imaginative afternoons.', ['baby', 'toddler'])),
      catalogOnly(product('sprout-and-co', 'newborn-essentials', 'soft-knit-cardigan', 'Soft knit cardigan', 5800, 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=900&q=85', 'A cozy layer for little adventures, made to last.', ['expecting', 'newborn', 'baby', 'toddler'])),
      catalogOnly(product('sprout-and-co', 'nursery-sleep', 'little-cloud-lamp', 'Little cloud lamp', 3600, 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=900&q=85', 'A gentle glow for stories and sleepy evenings.', ['expecting', 'newborn', 'baby'])),
      catalogOnly(product('sprout-and-co', 'gifts', 'rainbow-stacker', 'Rainbow stacker', 3900, 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=900&q=85', 'A bright invitation to build, sort, and imagine.', ['baby', 'toddler'])),
    ],
  },
  'form-and-function': {
    merchant: formMerchant,
    config: config('form-and-function', 'g2', images.techHero, 'Find tech that\nfits your life', 'Explore technology chosen for the way you work, create, travel and play.', 'Shop by use', { eyebrow: 'Tech for a more capable you', ctaLabel: 'Shop all products', ctaHref: '/shop' }),
    collections: [
      collection('form-and-function', 'work', 'Work', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=85', 'Tools for focus and flow.', 'discovery'),
      collection('form-and-function', 'create', 'Create', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=85', 'Bring ideas to life.', 'discovery'),
      collection('form-and-function', 'travel', 'Travel', 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=900&q=85', 'Take less. Do more.', 'discovery'),
      collection('form-and-function', 'play', 'Play', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85', 'Explore beyond the everyday.', 'discovery'),
      collection('form-and-function', 'audio', 'Audio', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85', 'Hear every detail.'),
      collection('form-and-function', 'desk', 'The desk', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=85', 'Make space for better work.'),
      collection('form-and-function', 'mobile', 'On the move', 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=900&q=85', 'Built to go further.'),
    ],
    products: [
      product('form-and-function', 'audio', 'arc-headphones', 'Arc wireless headphones', 24900, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85', 'Immersive sound, effortless fit, considered design.', ['work', 'travel', 'play']),
      product('form-and-function', 'desk', 'studio-keyboard', 'Studio mechanical keyboard', 18900, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&q=85', 'A precise tactile experience for focused work.', ['work', 'create', 'play']),
      product('form-and-function', 'mobile', 'everyday-camera', 'Everyday compact camera', 42900, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=85', 'A small camera with a remarkable point of view.', ['create', 'travel']),
      product('form-and-function', 'audio', 'sound-mini', 'Sound Mini speaker', 15900, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=900&q=85', 'Room-filling sound in a beautifully compact form.', ['travel', 'play']),
    ],
  },
  'maison-lune': {
    merchant: maisonMerchant,
    config: config('maison-lune', 'c3', images.fashionHero, 'Dress well,\nevery day', 'Outfit ideas for your life, with pieces that work together.', 'Shop by occasion', { eyebrow: 'The Wardrobe Studio', ctaLabel: 'Explore the collection', ctaHref: '/shop' }),
    collections: [
      collection('maison-lune', 'work', 'Work', 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=900&q=85', 'Considered for the everyday.', 'discovery'),
      collection('maison-lune', 'weekend', 'Weekend', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85', 'Ease beyond the weekday.', 'discovery'),
      collection('maison-lune', 'occasion', 'Occasion', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=85', 'Pieces for memorable moments.', 'discovery'),
      collection('maison-lune', 'everyday', 'Everyday', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=85', 'Wear often, keep longer.', 'discovery'),
      collection('maison-lune', 'ready-to-wear', 'Ready to wear', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=85', 'The everyday edit.'),
      collection('maison-lune', 'accessories', 'Accessories', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=85', 'The finishing touch.'),
      collection('maison-lune', 'essentials', 'Essentials', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85', 'Made to return to.'),
    ],
    products: [
      product('maison-lune', 'ready-to-wear', 'the-atelier-coat', 'The Atelier coat', 32000, 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=900&q=85', 'A softly structured coat with an effortless silhouette.', ['work', 'weekend']),
      product('maison-lune', 'essentials', 'cotton-poplin-shirt', 'Cotton poplin shirt', 12800, 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=900&q=85', 'A crisp wardrobe essential with thoughtful proportions.', ['work', 'everyday']),
      product('maison-lune', 'accessories', 'everyday-tote', 'Everyday leather tote', 21800, 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=85', 'Considered space for everything that matters.', ['work', 'weekend', 'occasion', 'everyday']),
      product('maison-lune', 'ready-to-wear', 'fluid-trouser', 'Fluid wide-leg trouser', 15400, 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=85', 'Easy movement and elegant drape for every day.', ['work', 'occasion', 'everyday']),
    ],
  },
};
