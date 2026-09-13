import React from 'react';
import { useCartStore } from '../stores/cartStore';
import { useUIStore } from '../stores/uiStore';
import { addOns, money } from '../data/catalog';
import Icon from './Icon';

export default function CartPage() {
  const {
    lines,
    setQty,
    removeLine,
    addToCart,
    carbonNeutral,
    setCarbonNeutral,
    giftNote,
    setGiftNote,
  } = useCartStore();
  const { setView } = useUIStore();

  const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0);
  const total = subtotal + (carbonNeutral && lines.length ? 1 : 0);

  if (lines.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-[#1B241E]/10 bg-white p-10 text-center">
          <p className="font-display text-3xl font-semibold">Your crate is empty.</p>
          <p className="mt-2 text-sm text-[#6F7A72]">
            Start with best-sellers — oil, chilli crisp, tinned fish.
          </p>
          <button
            type="button"
            onClick={() => setView('shop')}
            className="mt-6 inline-block cursor-pointer rounded-full bg-[#1B241E] px-7 py-3 text-sm font-bold text-white hover:bg-[#3B583E] transition-colors"
          >
            Explore the Pantry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-[#6F7A72]">
        <button
          type="button"
          onClick={() => setView('home')}
          className="hover:text-[#1B241E] cursor-pointer"
        >
          Home
        </button>{' '}
        / <span className="font-medium text-[#1B241E]">Cart</span>
      </nav>

      <h1 className="font-display text-3xl font-semibold mb-6">Your Pantry Crate</h1>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <ul className="space-y-3">
            {lines.map((l) => (
              <li
                key={l.id}
                className="flex gap-4 rounded-2xl border border-[#1B241E]/10 bg-white p-4"
              >
                <img src={l.image} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[15px] font-bold">{l.name}</p>
                      {l.meta && <p className="text-xs text-[#6F7A72]">{l.meta}</p>}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLine(l.id)}
                      aria-label={`Remove ${l.name}`}
                      className="inline-flex cursor-pointer items-center gap-1 text-xs text-[#6F7A72] hover:text-[#C85A32] transition-colors"
                    >
                      <Icon name="Trash2" size={13} /> Remove
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div
                      className="flex h-9 items-center gap-1 rounded-full border border-[#1B241E]/15 px-1"
                      role="group"
                      aria-label={`Quantity for ${l.name}`}
                    >
                      <button
                        type="button"
                        onClick={() => setQty(l.id, l.qty - 1)}
                        aria-label="Decrease quantity"
                        className="cursor-pointer px-2 py-1 hover:text-[#C85A32] transition-colors"
                      >
                        <Icon name="Minus" size={14} />
                      </button>
                      <span className="tnum min-w-5 text-center text-sm font-bold" aria-live="polite">
                        {l.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(l.id, l.qty + 1)}
                        aria-label="Increase quantity"
                        className="cursor-pointer px-2 py-1 hover:text-[#C85A32] transition-colors"
                      >
                        <Icon name="Plus" size={14} />
                      </button>
                    </div>
                    <span className="tnum text-[15px] font-bold">{money(l.price * l.qty)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-[#6F7A72] uppercase">
              Complete your pantry
            </p>
            <div className="grid grid-cols-3 gap-2">
              {addOns.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => addToCart({ id: a.id, name: a.name, price: a.price, image: a.image })}
                  aria-label={`Add ${a.name}`}
                  className="cursor-pointer rounded-xl border border-[#1B241E]/10 bg-white p-2 text-left hover:border-[#C85A32]/50 transition-colors"
                >
                  <img src={a.image} alt="" className="h-14 w-full rounded-lg object-cover" loading="lazy" />
                  <span className="mt-1.5 block text-[11px] font-semibold">{a.name}</span>
                  <span className="tnum text-[11px] text-[#6F7A72]">{money(a.price)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-[#1B241E]/10 bg-white p-5 lg:sticky lg:top-28">
          <h2 className="font-display text-xl font-semibold">Summary</h2>
          <dl className="tnum mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-[#6F7A72]">Subtotal</dt>
              <dd className="font-bold">{money(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#6F7A72]">Shipping</dt>
              <dd>At checkout</dd>
            </div>
            {carbonNeutral && (
              <div className="flex justify-between">
                <dt className="text-[#6F7A72]">Carbon-neutral</dt>
                <dd className="font-bold">{money(1)}</dd>
              </div>
            )}
          </dl>
          <label className="mt-4 flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-[#F2EFE9] p-3 text-sm font-medium">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="Truck" size={15} /> Carbon-neutral + $1
            </span>
            <input
              type="checkbox"
              checked={carbonNeutral}
              onChange={(e) => setCarbonNeutral(e.target.checked)}
              className="h-5 w-5 accent-[#3B583E]"
            />
          </label>
          <label className="mt-3 block">
            <span className="text-[11px] font-semibold tracking-[0.12em] text-[#6F7A72] uppercase">
              Gift note
            </span>
            <input
              value={giftNote}
              onChange={(e) => setGiftNote(e.target.value)}
              placeholder="“For Maya's new kitchen…”"
              className="mt-1 w-full rounded-lg border border-[#1B241E]/10 bg-white px-3 py-2 text-sm outline-none focus:border-[#3B583E]"
            />
          </label>
          <p className="tnum mt-4 flex justify-between border-t border-[#1B241E]/10 pt-3 text-[15px] font-bold">
            <span>Total</span>
            <span>{money(total)}</span>
          </p>
          <button
            type="button"
            onClick={() => setView('checkout')}
            className="mt-4 block w-full cursor-pointer rounded-full bg-[#C85A32] py-3.5 text-center text-sm font-bold text-white hover:bg-[#A84624] transition-colors"
          >
            Checkout · {money(total)}
          </button>
          <button
            type="button"
            onClick={() => setView('shop')}
            className="mt-2 block w-full text-center text-sm font-semibold underline underline-offset-4 hover:text-[#C85A32] transition-colors cursor-pointer"
          >
            Continue shopping
          </button>
        </aside>
      </div>
    </main>
  );
}
