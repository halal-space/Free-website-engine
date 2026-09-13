import React, { useState } from 'react';
import { products, money } from '../data/catalog';
import { useUIStore } from '../stores/uiStore';
import { useCartStore } from '../stores/cartStore';
import FlavorRadar from './FlavorRadar';
import Icon from './Icon';

interface ProductDetailPageProps {
  slug: string;
}

export default function ProductDetailPage({ slug }: ProductDetailPageProps) {
  const { setView } = useUIStore();
  const { addToCart, openCart, lines, setQty } = useCartStore();

  const product = products.find((p) => p.slug === slug) || products[0];
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const [mode, setMode] = useState<'once' | 'sub'>('once');
  const [interval, setInterval] = useState('4');
  const price = mode === 'sub' ? +(product.price * 0.9).toFixed(2) : product.price;
  const low = product.stock <= 20;

  const cartItemId = mode === 'sub' ? `${product.id}-sub` : product.id;
  const currentLine = lines.find((l) => l.id === cartItemId);

  const handleBuy = () => {
    addToCart(
      {
        id: cartItemId,
        name: product.name,
        price,
        image: product.image,
        slug: product.slug,
        meta: mode === 'sub' ? `Subscribe · every ${interval} weeks · −10%` : 'One-time',
      },
      1
    );
    openCart();
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#6F7A72]">
        <button
          type="button"
          onClick={() => setView('home')}
          className="hover:text-[#1B241E] cursor-pointer"
        >
          Home
        </button>{' '}
        /{' '}
        <button
          type="button"
          onClick={() => setView('category', product.category)}
          className="hover:text-[#1B241E] cursor-pointer"
        >
          {product.category}
        </button>{' '}
        / <span className="text-[#1B241E] font-medium">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left column: Gallery & Nutrition */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-[20px] border border-[#1B241E]/8 bg-[#F2EFE9]">
            <img
              src={product.image}
              alt={product.alt || product.name}
              className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
              loading="eager"
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="overflow-hidden rounded-2xl border border-[#1B241E]/8">
              <img
                src={product.lifestyle}
                alt={`${product.name} in use`}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center rounded-2xl bg-[#1B241E] p-5 text-[#FBF9F5]">
              <p className="text-[11px] font-bold tracking-[0.12em] uppercase opacity-60">
                Nutrition & label
              </p>
              <p className="mt-1 text-sm leading-relaxed">
                Verified pack · {product.volume} · {product.shelfLife}. Full panel ships on every jar.
              </p>
              <p className="tnum mt-2 text-xs opacity-70">{product.ingredients}</p>
            </div>
          </div>
        </div>

        {/* Right column: Details, BuyBox & Accordions */}
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#C85A32] uppercase">
            {product.category} · {product.origin}
          </p>
          <h1 className="font-display mt-2 text-4xl leading-tight font-semibold sm:text-5xl">
            {product.name}
          </h1>
          <p className="tnum mt-2 text-sm text-[#6F7A72]">
            {product.volume} · ★ {product.rating} ({product.reviews.toLocaleString()} reviews)
          </p>
          <p className="tnum font-display mt-3 text-3xl font-semibold">{money(product.price)}</p>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[#4A554D]">
            {product.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.badges.map((b) => (
              <span key={b} className="rounded-full bg-[#F2EFE9] px-3 py-1 text-xs font-semibold">
                {b}
              </span>
            ))}
          </div>

          {/* Buy Box */}
          <div className="mt-5 rounded-2xl border border-[#1B241E]/10 bg-white p-5">
            <p
              className={`tnum text-[13px] font-bold ${low ? 'text-[#C85A32]' : 'text-[#3B583E]'}`}
              role="status"
            >
              {product.batch} — {low ? `Only ${product.stock} jars remaining` : `${product.stock} in stock`}
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Purchase type">
              <button
                type="button"
                role="radio"
                aria-checked={mode === 'once'}
                onClick={() => setMode('once')}
                className={`cursor-pointer rounded-xl border p-3 text-left transition-all ${
                  mode === 'once'
                    ? 'border-[#1B241E] ring-1 ring-[#1B241E]'
                    : 'border-[#1B241E]/15 hover:border-[#1B241E]/40'
                }`}
              >
                <span className="block text-sm font-bold">One-Time</span>
                <span className="tnum block text-sm">{money(product.price)}</span>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={mode === 'sub'}
                onClick={() => setMode('sub')}
                className={`cursor-pointer rounded-xl border p-3 text-left transition-all ${
                  mode === 'sub'
                    ? 'border-[#3B583E] bg-[#3B583E]/5 ring-1 ring-[#3B583E]'
                    : 'border-[#1B241E]/15 hover:border-[#3B583E]/60'
                }`}
              >
                <span className="block text-sm font-bold">Subscribe −10%</span>
                <span className="tnum block text-sm">{money(product.price * 0.9)}</span>
              </button>
            </div>

            {mode === 'sub' && (
              <label className="mt-3 block">
                <span className="text-xs font-semibold tracking-wide uppercase text-[#6F7A72]">
                  Deliver every
                </span>
                <div className="mt-1.5 grid grid-cols-3 gap-2">
                  {['2', '4', '6'].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setInterval(w)}
                      aria-pressed={interval === w}
                      className={`cursor-pointer rounded-full border py-2 text-sm font-bold ${
                        interval === w
                          ? 'border-[#3B583E] bg-[#3B583E] text-white'
                          : 'border-[#1B241E]/15 hover:border-[#3B583E]'
                      }`}
                    >
                      {w} wks
                    </button>
                  ))}
                </div>
              </label>
            )}

            <div className="mt-4 flex h-12 items-center gap-3">
              <div className="flex-1">
                {currentLine ? (
                  <div
                    className="flex h-10 items-center gap-1 rounded-full border border-[#1B241E]/15 bg-white px-1"
                    role="group"
                    aria-label={`Quantity for ${product.name}`}
                  >
                    <button
                      type="button"
                      onClick={() => setQty(cartItemId, currentLine.qty - 1)}
                      aria-label="Decrease quantity"
                      className="cursor-pointer rounded-full p-2 transition-colors duration-200 hover:bg-black/5"
                    >
                      <Icon name="Minus" size={14} />
                    </button>
                    <span className="tnum min-w-6 text-center text-sm font-bold" aria-live="polite">
                      {currentLine.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(cartItemId, currentLine.qty + 1)}
                      aria-label="Increase quantity"
                      className="cursor-pointer rounded-full p-2 transition-colors duration-200 hover:bg-black/5"
                    >
                      <Icon name="Plus" size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleBuy}
                    className="w-full cursor-pointer rounded-full border border-[#1B241E]/20 py-3 text-sm font-bold transition-colors hover:border-[#1B241E]"
                  >
                    Quick Add
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={handleBuy}
                className="flex-1 cursor-pointer rounded-full bg-[#C85A32] py-3 text-sm font-bold text-white transition-colors hover:bg-[#A84624]"
              >
                Add to cart · {money(price)}
              </button>
            </div>
            <p className="mt-2 text-xs text-[#6F7A72]">
              Free chilled shipping over $65 · 30-day pantry promise
            </p>
          </div>

          {/* Collapsible Accordions */}
          <div className="mt-5 divide-y divide-[#1B241E]/10 rounded-2xl border border-[#1B241E]/10 bg-white">
            <details className="group px-5 py-4" open>
              <summary className="cursor-pointer list-none text-sm font-bold flex items-center justify-between">
                <span>Tasting notes</span>
                <span className="text-[#6F7A72] group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="pt-4">
                <FlavorRadar axes={product.tasting} />
              </div>
            </details>

            <details className="group px-5 py-4">
              <summary className="cursor-pointer list-none text-sm font-bold flex items-center justify-between">
                <span>Harvest & origin</span>
                <span className="text-[#6F7A72] group-open:rotate-45 transition-transform">+</span>
              </summary>
              <dl className="grid gap-2 pt-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#6F7A72]">Producer</dt>
                  <dd className="text-right font-semibold">{product.producer}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#6F7A72]">Region</dt>
                  <dd className="text-right font-semibold">{product.region}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#6F7A72]">Harvest</dt>
                  <dd className="text-right font-semibold">{product.harvest}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#6F7A72]">Shelf life</dt>
                  <dd className="text-right font-semibold">{product.shelfLife}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#6F7A72]">Storage</dt>
                  <dd className="max-w-[60%] text-right font-semibold">{product.storage}</dd>
                </div>
              </dl>
            </details>

            <details className="group px-5 py-4">
              <summary className="cursor-pointer list-none text-sm font-bold flex items-center justify-between">
                <span>Full transparency</span>
                <span className="text-[#6F7A72] group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="pt-3 text-sm leading-relaxed">
                <p>
                  <strong>Ingredients:</strong> {product.ingredients}
                </p>
                <p className="mt-2 rounded-xl bg-[#F3D27A]/25 p-3">
                  <strong>Allergens:</strong> {product.allergens}
                </p>
                <p className="mt-2 text-[#6F7A72]">
                  Third-party lab-tested for purity. Batch {product.batch} report ships in-box + by email.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Pairs well with */}
      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="font-display text-2xl font-semibold">Pairs well with</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setView('product', r.slug)}
                className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-[#1B241E]/8 bg-white p-3 text-left hover:shadow-md transition-shadow"
              >
                <img src={r.image} alt="" className="h-16 w-16 rounded-xl object-cover" loading="lazy" />
                <span>
                  <span className="block text-sm font-bold group-hover:text-[#C85A32] transition-colors">
                    {r.name}
                  </span>
                  <span className="tnum inline-flex items-center gap-1 text-xs text-[#6F7A72]">
                    {money(r.price)} <Icon name="ArrowRight" size={13} />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
