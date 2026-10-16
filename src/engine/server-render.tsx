import { notFound } from 'next/navigation';
import { cache } from 'react';
import { assemblePage, parseStorefrontRoute } from './assemble';
import { getDemoSource, isValidStoreId, normalizeHost } from './data-source';
import { Storefront } from './ui/Storefront';
import type { PageRoute } from './types';

const resolvePublishedHost = cache((host: string) => getDemoSource().resolveHost(host));
const getPublishedSnapshot = cache((storeId: string) => getDemoSource().getPublishedSnapshot(storeId));

export async function loadStorefront(storeId: string, segments: string[], query = '') {
  if (!isValidStoreId(storeId)) notFound();
  const route = parseStorefrontRoute(segments, query);
  if (!route) notFound();
  const snapshot = await getPublishedSnapshot(storeId);
  if (!snapshot) notFound();
  const plan = assemblePage(snapshot, route);
  if (!plan) notFound();
  return { snapshot, plan };
}

export async function loadStorefrontByHost(rawHost: string, segments: string[], query = '') {
  const host = normalizeHost(rawHost);
  if (!host) notFound();
  const storeId = await resolvePublishedHost(host);
  if (!storeId) notFound();
  const loaded = await loadStorefront(storeId, segments, query);
  if (!loaded.snapshot.merchant.domains.includes(host)) notFound();
  return loaded;
}

export function renderStorefront(loaded: Awaited<ReturnType<typeof loadStorefront>>, basePath: string) {
  return <Storefront {...loaded} basePath={basePath} demo={process.env.STOREFRONT_MODE !== 'api'} />;
}

function routePath(route: PageRoute): string {
  switch (route.kind) {
    case 'home': return '/';
    case 'collection': return `/collections/${route.slug}`;
    case 'product': return `/products/${route.slug}`;
    case 'confirmation': return '/order/confirmation';
    case 'tracking': return '/track-order';
    case 'policy': return `/policies/${route.slug}`;
    default: return `/${route.kind}`;
  }
}

export function storefrontMetadata(loaded: Awaited<ReturnType<typeof loadStorefront>>, preview = false) {
  const { snapshot, plan } = loaded;
  const live = !preview && process.env.STOREFRONT_MODE === 'api';
  const indexable = ['home', 'shop', 'collection', 'product', 'about', 'contact', 'policy'].includes(plan.route.kind);
  const primaryDomain = snapshot.merchant.domains[0];
  return {
    title: plan.route.kind === 'home' ? snapshot.merchant.name : `${plan.title} | ${snapshot.merchant.name}`,
    description: plan.description,
    robots: live && indexable ? undefined : { index: false, follow: false },
    alternates: live && indexable && primaryDomain ? { canonical: `https://${primaryDomain}${routePath(plan.route)}` } : undefined,
  };
}
