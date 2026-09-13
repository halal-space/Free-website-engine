import React, { useMemo, useState } from 'react';
import { products, money } from '../data/catalog';
import { useCartStore } from '../stores/cartStore';
import Icon from './Icon';

const SIZES = [4, 6, 8] as const;

export default function BundleBuilderSection() {
  const [size, setSize] = useState<(typeof SIZES)[number]>(6);
  const [picked, setPicked] = useState<string[]>(['p1', 'p4']);
  const [step, setStep] = useState(1);
  const { addToCart, openCart } = useCartStore();

  const pickedProducts = useMemo(
    () => picked.map((id) => products.find((p) => p.id === id)!).filter(Boolean),
    [picked]
  );
  const total = pickedProducts.reduce((s, p) => s + p.price, 0);
  const discounted = total * 0.85;

  const toggle = (id: string) => {
    setPicked((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= size) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const addBox = () => {
    pickedProducts.forEach((p) =>
      addToCart(
        {
          id: `box-${p.id}`,
          name: `${p.name} (Box)`,
          price: +(p.price * 0.85).toFixed(2),
          image: p.image,
          slug: p.slug,
          meta: 'Pantry Box · 15% off',
        },
        1
      )
    );
    addToCart(
      {
        id: 'box-crate',
        name: 'Wooden Crate Gift Box',
        price: 0,
        image: products[0].image,
        meta: 'Complimentary',
      },
      1
    );
    openCart();
  };

  return (
    <section id="bundle" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="overflow-hidden rounded-[24px] bg-[#1B241E] p-6 text-[#FBF9F5] sm:p-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#F3D27A] uppercase">
              Save 15% · Wooden crate included
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold sm:text-4xl">Build Your Pantry Box</h2>
          </div>
          <ol className="flex gap-2 text-xs font-semibold" aria-label="Steps">
            {['1 Size', '2 Pick', '3 Gift'].map((s, i) => (
              <li
                key={s}
                className={`rounded-full px-3 py-1.5 ${
                  step === i + 1 ? 'bg-[#C85A32] text-white' : 'bg-white/10'
                }`}
              >
                {s}
              </li>
            ))}
          </ol>
        </div>

        {step === 1 && (
          <div className="mt-6">
            <p className="mb-3 text-sm opacity-80">How many staples?</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSize(s);
                    setStep(2);
                  }}
                  className={`cursor-pointer rounded-2xl border p-5 text-left transition-all duration-200 ${
                    size === s
                      ? 'border-[#C85A32] bg-[#C85A32]/15'
                      : 'border-white/15 bg-white/5 hover:border-white/40'
                  }`}
                >
                  <span className="font-display text-3xl font-semibold">{s}</span>
                  <span className="block text-sm opacity-80">
                    {s === 4 ? 'The Starter' : s === 6 ? 'The Ritual — most popular' : 'The Provision'} · 15% off
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm opacity-80" aria-live="polite">
                {picked.length}/{size} picked ·{' '}
                <span className="tnum font-bold text-white">{money(discounted)}</span>{' '}
                <s className="opacity-60">{money(total)}</s>
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-white/20 px-4 py-2 text-xs font-bold hover:bg-white/10"
                >
                  <Icon name="ArrowLeft" size={13} /> Size
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={picked.length === 0}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-[#C85A32] px-4 py-2 text-xs font-bold text-white hover:bg-[#A84624] disabled:opacity-40"
                >
                  Review <Icon name="ArrowRight" size={13} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {products.slice(0, 8).map((p) => {
                const on = picked.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => toggle(p.id)}
                    aria-pressed={on}
                    className={`cursor-pointer overflow-hidden rounded-2xl border text-left transition-all duration-200 ${
                      on ? 'border-[#F3D27A] ring-2 ring-[#F3D27A]/60' : 'border-white/10 hover:border-white/40'
                    }`}
                  >
                    <img src={p.image} alt="" className="h-24 w-full object-cover" loading="lazy" />
                    <span className="flex items-center gap-1 p-2.5 text-xs font-semibold">
                      {on && <Icon name="Check" size={13} />}
                      {p.name}
                    </span>
                    <span className="tnum block px-2.5 pb-2.5 text-xs opacity-70">{money(p.price)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl bg-white/5 p-5">
              <p className="text-sm font-bold">Your {size}-piece crate</p>
              <ul className="mt-3 space-y-2">
                {pickedProducts.map((p) => (
                  <li key={p.id} className="flex items-center gap-3 text-sm">
                    <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                    <span className="flex-1">{p.name}</span>
                    <span className="tnum opacity-70">{money(p.price)}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="mt-4 cursor-pointer text-xs font-bold underline underline-offset-4"
              >
                Edit picks
              </button>
            </div>
            <div className="flex flex-col justify-center rounded-2xl bg-[#F3D27A] p-6 text-[#1B241E]">
              <p className="font-display text-2xl font-semibold">Crate total: {money(discounted)}</p>
              <p className="tnum text-sm">You save {money(total - discounted)} + free wooden crate</p>
              <button
                type="button"
                onClick={addBox}
                className="mt-4 cursor-pointer rounded-full bg-[#1B241E] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#3B583E]"
              >
                Add box to cart · {money(discounted)}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
