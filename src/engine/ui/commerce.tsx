'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Product } from '../types';
import { addCartLine, orderKey, readCart, writeCart, type CartLine } from './cart-state';
import { StoreImage } from './StoreImage';
import { formatMinorAmount } from '../money';

type DemoOrder = { id: string; email: string; createdAt: string; totalMinor: number; currency: string; lines: CartLine[] };

function href(base: string, part: string): string { return `${base}${part}`; }
function money(amountMinor: number, currency: string): string {
  return formatMinorAmount(amountMinor, currency);
}
function readDemoOrder(storeId: string): DemoOrder | null {
  try {
    const raw = localStorage.getItem(orderKey(storeId));
    if (!raw) return null;
    const value = JSON.parse(raw) as DemoOrder;
    return value && typeof value.id === 'string' && typeof value.email === 'string' ? value : null;
  } catch { return null; }
}

function useCart(storeId: string) {
  const [lines, setLines] = useState<CartLine[]>([]);
  useEffect(() => {
    const update = () => setLines(readCart(storeId));
    update();
    const handleUpdate = (event: Event) => {
      if ((event as CustomEvent<string>).detail === storeId) update();
    };
    window.addEventListener('rooqx:cart-updated', handleUpdate);
    window.addEventListener('storage', update);
    return () => { window.removeEventListener('rooqx:cart-updated', handleUpdate); window.removeEventListener('storage', update); };
  }, [storeId]);
  return [lines, (next: CartLine[]) => { writeCart(storeId, next); setLines(next); }] as const;
}

export function CartCount({ storeId }: { storeId: string }) {
  const [lines] = useCart(storeId);
  const count = lines.reduce((total, line) => total + line.quantity, 0);
  return count > 0 ? <span className="sf-cart-count" aria-hidden="true">{count}</span> : null;
}

export function AddToCart({ storeId, product, large = false }: { storeId: string; product: Product; large?: boolean }) {
  const [added, setAdded] = useState(false);
  return <button type="button" className={large ? 'sf-button sf-add-large' : 'sf-add-small'} disabled={!product.available} onClick={() => {
    try { addCartLine(storeId, product.id); setAdded(true); window.setTimeout(() => setAdded(false), 1600); }
    catch { setAdded(false); }
  }} aria-label={product.available ? `Add ${product.name} to bag` : `${product.name} is sold out`}>
    {large ? <>{added ? 'Added to bag' : product.available ? 'Add to bag' : 'Sold out'} <ShoppingBag size={18} /></> : <><Plus size={17} /> <span>{product.available ? added ? 'Added' : 'Add' : 'Sold out'}</span></>}
  </button>;
}

function validLines(lines: CartLine[], products: Product[]) {
  return lines.map(line => ({ line, product: products.find(p => p.id === line.productId) })).filter((item): item is { line: CartLine; product: Product } => Boolean(item.product));
}

export function CartPage({ storeId, products, basePath }: { storeId: string; products: Product[]; basePath: string }) {
  const [lines, setLines] = useCart(storeId);
  const items = useMemo(() => validLines(lines, products), [lines, products]);
  const hasUnavailable = items.some(({ product }) => !product.available);
  const subtotal = items.reduce((sum, { line, product }) => sum + product.priceMinor * line.quantity, 0);
  const currency = products[0]?.currency || 'USD';
  const update = (productId: string, quantity: number) => setLines(quantity <= 0 ? lines.filter(l => l.productId !== productId) : lines.map(l => l.productId === productId ? { ...l, quantity: Math.min(quantity, 99) } : l));
  return <main className="sf-container sf-functional-page"><h1>Your bag</h1>{items.length === 0 ? <div className="sf-empty"><p>Your bag is waiting for something lovely.</p><Link className="sf-button" href={href(basePath, '/shop')}>Explore the shop <ArrowRight size={18} /></Link></div> : <div className="sf-cart-layout"><div className="sf-cart-lines">{items.map(({ line, product }) => <div className="sf-cart-line" key={product.id}><Link href={href(basePath, `/products/${product.slug}`)} className="sf-cart-image"><StoreImage src={product.image} alt={product.name} fill sizes="120px" /></Link><div><Link href={href(basePath, `/products/${product.slug}`)} className="sf-cart-name">{product.name}</Link><p>{money(product.priceMinor, currency)}</p>{!product.available && <p className="sf-error">Currently unavailable</p>}<button className="sf-remove" type="button" onClick={() => update(product.id, 0)}>Remove</button></div><div className="sf-quantity"><button type="button" aria-label={`Decrease ${product.name} quantity`} onClick={() => update(product.id, line.quantity - 1)}><span aria-hidden="true"><Minus size={15} /></span></button><span>{line.quantity}</span><button type="button" aria-label={`Increase ${product.name} quantity`} disabled={!product.available} onClick={() => update(product.id, line.quantity + 1)}><Plus size={15} /></button></div></div>)}</div><aside className="sf-order-summary"><h2>Order summary</h2><div><span>Subtotal</span><strong>{money(subtotal, currency)}</strong></div><p>Taxes and shipping are confirmed at checkout.</p>{hasUnavailable ? <p role="alert" className="sf-error">Remove unavailable products before checkout.</p> : <Link className="sf-button" href={href(basePath, '/checkout')}>Continue to checkout <ArrowRight size={18} /></Link>}</aside></div>}</main>;
}

export function CheckoutPage({ storeId, products, basePath, demo }: { storeId: string; products: Product[]; basePath: string; demo: boolean }) {
  const router = useRouter();
  const [lines, setLines] = useCart(storeId);
  const [error, setError] = useState('');
  const items = useMemo(() => validLines(lines, products), [lines, products]);
  const hasUnavailable = items.some(({ product }) => !product.available);
  const subtotal = items.reduce((sum, { line, product }) => sum + product.priceMinor * line.quantity, 0);
  const currency = products[0]?.currency || 'USD';

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!demo) { setError('Live checkout is not connected to the Rooqx backend yet.'); return; }
    if (items.length === 0) { setError('Your bag is empty.'); return; }
    if (hasUnavailable) { setError('Remove unavailable products before checkout.'); return; }
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '').trim();
    if (!email) { setError('Please enter your email.'); return; }
    const order: DemoOrder = { id: `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, email, createdAt: new Date().toISOString(), totalMinor: subtotal, currency, lines };
    try {
      localStorage.setItem(orderKey(storeId), JSON.stringify(order));
      setLines([]);
      router.push(href(basePath, '/order/confirmation'));
    } catch { setError('The demo order could not be saved in this browser.'); }
  }

  return <main className="sf-container sf-functional-page"><h1>Checkout</h1><div className="sf-demo-notice">{demo ? 'Demo checkout: no payment is taken and no real order is created.' : 'Live checkout is pending Rooqx backend integration.'}</div>{items.length === 0 ? <div className="sf-empty"><p>Your bag is empty.</p><Link className="sf-button" href={href(basePath, '/shop')}>Continue shopping <ArrowRight size={18} /></Link></div> : <div className="sf-checkout-layout"><form onSubmit={submit} className="sf-checkout-form"><h2>Contact and delivery</h2>{hasUnavailable && <p role="alert" className="sf-error">Remove unavailable products from your bag before checkout.</p>}<label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label><div className="sf-field-pair"><label>First name<input name="firstName" autoComplete="given-name" required /></label><label>Last name<input name="lastName" autoComplete="family-name" required /></label></div><label>Address<input name="address" autoComplete="street-address" required /></label><div className="sf-field-pair"><label>City<input name="city" autoComplete="address-level2" required /></label><label>Postal code<input name="postalCode" autoComplete="postal-code" required /></label></div>{error && <p role="alert" className="sf-error">{error}</p>}<button className="sf-button" type="submit" disabled={!demo || hasUnavailable}>{demo ? 'Create demo order' : 'Checkout unavailable'} <ArrowRight size={18} /></button></form><aside className="sf-order-summary"><h2>Your order</h2>{items.map(({ line, product }) => <div key={product.id}><span>{product.name} × {line.quantity}</span><span>{money(product.priceMinor * line.quantity, currency)}</span></div>)}<div className="sf-summary-total"><strong>Subtotal</strong><strong>{money(subtotal, currency)}</strong></div><p>Shipping and taxes require backend calculation. This preview does not charge you.</p></aside></div>}</main>;
}

export function ConfirmationPage({ storeId, basePath, demo }: { storeId: string; basePath: string; demo: boolean }) {
  const [order, setOrder] = useState<DemoOrder | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setOrder(demo ? readDemoOrder(storeId) : null); setLoaded(true); }, [storeId, demo]);
  return <main className="sf-container sf-functional-page sf-confirmation"><h1>{!loaded ? 'Checking order' : order ? 'Preview complete' : 'No order to show'}</h1>{order ? <><div className="sf-demo-notice">This is a demonstration only. No payment was taken and no real order was placed.</div><p>Demo reference <strong>{order.id}</strong></p><p>A live storefront will show a confirmation only after backend payment verification.</p></> : loaded ? <p>{demo ? 'Start with the shop to explore this demonstration.' : 'Order confirmation requires backend payment verification.'}</p> : null}<Link className="sf-button" href={href(basePath, '/shop')}>Back to shop <ArrowRight size={18} /></Link></main>;
}

export function TrackingPage({ storeId, demo }: { storeId: string; demo: boolean }) {
  const [result, setResult] = useState<'none' | 'found' | 'missing'>('none');
  return <main className="sf-container sf-functional-page sf-tracking"><h1>Track an order</h1><p>{demo ? 'You can look up a demo reference from this browser.' : 'Live order tracking will be available after backend integration.'}</p><form onSubmit={event => { event.preventDefault(); if (!demo) return; const form = new FormData(event.currentTarget); const order = readDemoOrder(storeId); setResult(order && order.id === String(form.get('reference')).trim() && order.email.toLowerCase() === String(form.get('email')).trim().toLowerCase() ? 'found' : 'missing'); }}><label>Order reference<input name="reference" required placeholder="DEMO-XXXXXXXX" /></label><label>Email address<input name="email" type="email" required placeholder="you@example.com" /></label><button className="sf-button" disabled={!demo} type="submit">Find order <ArrowRight size={18} /></button></form>{result === 'found' && <p role="status" className="sf-demo-notice">Demo reference found. No real order or shipment exists.</p>}{result === 'missing' && <p role="status">No matching demo reference was found in this browser.</p>}</main>;
}
