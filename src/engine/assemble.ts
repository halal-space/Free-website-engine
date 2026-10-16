import type { PagePlan, PageRoute, SectionConfig, StorefrontSnapshot } from './types';

const POLICY_SLUGS = new Set(['privacy', 'terms', 'shipping', 'returns']);

export function parseStorefrontRoute(segments: string[], query = ''): PageRoute | null {
  if (segments.length === 0) return { kind: 'home' };
  const [head, slug] = segments;
  if (segments.length === 1) {
    if (head === 'shop') return { kind: 'shop' };
    if (head === 'about') return { kind: 'about' };
    if (head === 'contact') return { kind: 'contact' };
    if (head === 'search') return { kind: 'search', query };
    if (head === 'cart') return { kind: 'cart' };
    if (head === 'checkout') return { kind: 'checkout' };
    if (head === 'track-order') return { kind: 'tracking' };
  }
  if (segments.length === 2 && slug) {
    if (head === 'collections') return { kind: 'collection', slug };
    if (head === 'products') return { kind: 'product', slug };
    if (head === 'policies' && POLICY_SLUGS.has(slug)) return { kind: 'policy', slug };
    if (head === 'order' && slug === 'confirmation') return { kind: 'confirmation' };
  }
  return null;
}

export function assemblePage(snapshot: StorefrontSnapshot, route: PageRoute): PagePlan | null {
  const { merchant, config, products, collections } = snapshot;
  if (merchant.id !== config.storeId || products.some(p => p.storeId !== merchant.id) || collections.some(c => c.storeId !== merchant.id)) {
    throw new Error('Storefront data crossed a tenant boundary');
  }

  const product = route.kind === 'product' ? products.find(p => p.slug === route.slug) : undefined;
  const collection = route.kind === 'collection' ? collections.find(c => c.slug === route.slug) : undefined;
  if ((route.kind === 'product' && !product) || (route.kind === 'collection' && !collection)) return null;

  const policy = route.kind === 'policy'
    ? merchant.policies[route.slug as keyof MerchantPolicy]
    : undefined;
  if (route.kind === 'policy' && !policy) return null;

  const pageProducts = route.kind === 'collection' && collection
    ? products.filter(p => p.collectionId === collection.id)
    : route.kind === 'home' ? products.filter(p => p.featured) : products;

  const sectionList: SectionConfig[] = route.kind === 'home'
    ? config.homepage.filter(s => s.enabled)
    : [];
  const title = product?.name ?? collection?.name ?? ({
    home: merchant.name, shop: 'Shop', about: 'Our story', contact: 'Contact',
    search: 'Search', cart: 'Your bag', checkout: 'Checkout', confirmation: 'Order confirmation',
    tracking: 'Track an order', policy: route.slug ? titleCase(route.slug) : 'Policy',
    collection: 'Collection', product: 'Product',
  } satisfies Record<PageRoute['kind'], string>)[route.kind];

  return {
    route, storeId: merchant.id, themeId: config.themeId, title,
    description: product?.description ?? collection?.description ?? config.seo.description,
    sections: sectionList, products: pageProducts, collections, product, collection, policy,
  };
}

type MerchantPolicy = { privacy: string; terms: string; shipping: string; returns: string };

function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
