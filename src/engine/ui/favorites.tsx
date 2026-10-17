'use client';

import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { Product } from '../types';
import { StoreImage } from './StoreImage';
import { formatMinorAmount } from '../money';

const eventName = 'rooqx:favorites-updated';
const key = (storeId: string) => `rooqx:favorites:${storeId}:v1`;
const FavoritesContext = createContext<{ storeId: string; ids: string[] } | null>(null);

function read(storeId: string): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key(storeId)) || '[]');
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string').slice(0, 250) : [];
  } catch { return []; }
}

export function FavoritesProvider({ storeId, children }: { storeId: string; children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    const update = () => setIds(read(storeId));
    const onUpdate = (event: Event) => { if ((event as CustomEvent<string>).detail === storeId) update(); };
    update();
    window.addEventListener(eventName, onUpdate);
    window.addEventListener('storage', update);
    return () => { window.removeEventListener(eventName, onUpdate); window.removeEventListener('storage', update); };
  }, [storeId]);
  return <FavoritesContext.Provider value={{ storeId, ids }}>{children}</FavoritesContext.Provider>;
}

function useFavorites(storeId: string): string[] {
  const context = useContext(FavoritesContext);
  if (!context || context.storeId !== storeId) throw new Error('Favorites must be rendered in the matching storefront');
  return context.ids;
}

function toggle(storeId: string, productId: string) {
  const current = read(storeId);
  const next = current.includes(productId) ? current.filter(id => id !== productId) : [...current, productId].slice(-250);
  try {
    localStorage.setItem(key(storeId), JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(eventName, { detail: storeId }));
  } catch { /* Browser storage may be unavailable; the control remains safe. */ }
}

export function FavoriteCount({ storeId }: { storeId: string }) {
  const count = useFavorites(storeId).length;
  return count ? <span className="sf-cart-count" aria-hidden="true">{count}</span> : null;
}

export function FavoriteButton({ storeId, product }: { storeId: string; product: Product }) {
  const saved = useFavorites(storeId).includes(product.id);
  return <button type="button" className={`sf-favorite-button ${saved ? 'is-saved' : ''}`} aria-label={`${saved ? 'Remove' : 'Save'} ${product.name} ${saved ? 'from' : 'to'} Favorites`} aria-pressed={saved} onClick={() => toggle(storeId, product.id)}><Heart size={20} fill={saved ? 'currentColor' : 'none'} /></button>;
}

export function FavoritesPage({ storeId, products, basePath }: { storeId: string; products: Product[]; basePath: string }) {
  const ids = useFavorites(storeId);
  const saved = products.filter(product => ids.includes(product.id));
  return <main className="sf-container sf-functional-page sf-favorites-page"><span className="sf-eyebrow">Saved for later</span><h1>Favorites</h1><p>Keep your shortlist close while you explore.</p>{saved.length ? <div className="sf-product-grid">{saved.map(product => <article key={product.id} className="sf-product-card"><div className="sf-product-image"><Link href={`${basePath}/products/${product.slug}`} aria-label={`View ${product.name}`}><StoreImage src={product.image} alt={product.name} fill sizes="(max-width: 700px) 50vw, 25vw" /></Link><FavoriteButton storeId={storeId} product={product} /></div><div className="sf-product-info"><Link href={`${basePath}/products/${product.slug}`}><h2>{product.name}</h2></Link><strong>{formatMinorAmount(product.priceMinor, product.currency)}</strong></div></article>)}</div> : <div className="sf-empty"><p>Tap the heart on a product to save it here.</p><Link className="sf-button" href={`${basePath}/shop`}>Explore products <ArrowRight size={18} /></Link></div>}</main>;
}
