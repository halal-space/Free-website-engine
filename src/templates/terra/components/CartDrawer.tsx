import React, { useEffect, useRef } from 'react';
import { useCartStore } from '../stores/cartStore';
import { useUIStore } from '../stores/uiStore';
import { addOns, money } from '../data/catalog';
import Icon from './Icon';

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
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
  const panelRef = useRef<HTMLDivElement>(null);

  const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeCart]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const BUTTER_AT = 79;
  const gap = Math.max(0, BUTTER_AT - subtotal);
  const pct = Math.min(100, Math.round((subtotal / BUTTER_AT) * 100));
  const total = subtotal + (carbonNeutral && lines.length ? 1 : 0);

  if (!isCartOpen) return null;

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[90] transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-label={`Cart, ${count} items`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1B241E]/45 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <aside className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-[#FBF9F5] shadow-2xl transition-transform duration-300 transform translate-x-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1B241E]/10 px-5 py-4">
          <h2 className="font-display text-xl font-semibold">Your Pantry ({count})</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="cursor-pointer rounded-full p-2 transition-colors duration-200 hover:bg-black/5"
          >
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Butter Progress Bar */}
        <div className="border-b border-[#1B241E]/10 px-5 py-3">
          <p className="tnum text-[13px] font-medium" aria-live="polite">
            {gap > 0 ? (
              <>
                Add <strong>{money(gap)}</strong> more for complimentary artisanal butter
              </>
            ) : (
              <>Complimentary artisanal butter unlocked</>
            )}
          </p>
          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#1B241E]/10"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progress to complimentary butter"
          >
            <div
              className="h-full rounded-full bg-[#3B583E] transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Cart Items / Body */}
        <div className="flex-1 overflow-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-display text-2xl">Your crate is empty.</p>
              <p className="mt-2 text-sm text-[#6F7A72]">
                Start with best-sellers — oil, chilli crisp, tinned fish.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  setView('shop');
                }}
                className="mt-5 cursor-pointer rounded-full bg-[#1B241E] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#3B583E]"
              >
                Explore the Pantry
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((l) => (
                <li key={l.id} className="flex gap-3">
                  <img
                    src={l.image}
                    alt=""
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-semibold">{l.name}</p>
                      <button
                        type="button"
                        onClick={() => removeLine(l.id)}
                        aria-label={`Remove ${l.name}`}
                        className="inline-flex cursor-pointer items-center gap-1 text-xs text-[#6F7A72] transition-colors duration-200 hover:text-[#C85A32]"
                      >
                        <Icon name="Trash2" size={13} /> Remove
                      </button>
                    </div>
                    {l.meta && <p className="text-xs text-[#6F7A72]">{l.meta}</p>}
                    <div className="mt-2 flex items-center justify-between">
                      <div
                        className="flex h-9 items-center gap-1 rounded-full border border-[#1B241E]/15 bg-white px-1"
                        role="group"
                        aria-label={`Quantity for ${l.name}`}
                      >
                        <button
                          type="button"
                          onClick={() => setQty(l.id, l.qty - 1)}
                          aria-label="Decrease quantity"
                          className="cursor-pointer px-2 py-1 transition-colors duration-200 hover:text-[#C85A32]"
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
                          className="cursor-pointer px-2 py-1 transition-colors duration-200 hover:text-[#C85A32]"
                        >
                          <Icon name="Plus" size={14} />
                        </button>
                      </div>
                      <span className="tnum text-sm font-bold">{money(l.price * l.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Complete your pantry Add-ons */}
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
                  aria-label={`Add ${a.name} for ${money(a.price)}`}
                  className="cursor-pointer rounded-xl border border-[#1B241E]/10 bg-white p-2 text-left transition-all duration-200 hover:border-[#C85A32]/50 hover:shadow-md"
                >
                  <img src={a.image} alt="" className="h-14 w-full rounded-lg object-cover" loading="lazy" />
                  <span className="mt-1.5 block text-[11px] leading-tight font-semibold">{a.name}</span>
                  <span className="tnum inline-flex items-center gap-0.5 text-[11px] text-[#6F7A72]">
                    {money(a.price)} <Icon name="Plus" size={11} />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Carbon-neutral & Gift note */}
          <div className="mt-5 space-y-3 rounded-xl bg-[#F2EFE9] p-3">
            <label className="flex cursor-pointer items-center justify-between gap-3 text-sm font-medium">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="Truck" size={15} /> Carbon-neutral delivery{' '}
                <span className="text-[#3B583E]">+ $1</span>
              </span>
              <input
                type="checkbox"
                checked={carbonNeutral}
                onChange={(e) => setCarbonNeutral(e.target.checked)}
                className="h-5 w-5 accent-[#3B583E]"
              />
            </label>
            <label className="block">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#6F7A72] uppercase">
                <Icon name="Gift" size={12} /> Gift note
              </span>
              <input
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="“For Maya's new kitchen…”"
                className="mt-1 w-full rounded-lg border border-[#1B241E]/10 bg-white px-3 py-2 text-sm outline-none placeholder:text-[#9aa3a0] focus:border-[#3B583E]"
              />
            </label>
          </div>
        </div>

        {/* Bottom checkout summary */}
        <div className="border-t border-[#1B241E]/10 bg-white px-5 py-4">
          <div className="tnum flex justify-between text-sm">
            <span className="text-[#6F7A72]">Subtotal</span>
            <strong>{money(total)}</strong>
          </div>
          <p className="mt-1 text-xs text-[#6F7A72]">Chilled carbon-neutral shipping calculated at checkout.</p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => {
                closeCart();
                setView('cart');
              }}
              className="flex-1 cursor-pointer rounded-full border border-[#1B241E]/20 py-3 text-center text-sm font-bold transition-colors duration-200 hover:border-[#1B241E]"
            >
              View cart
            </button>
            <button
              type="button"
              onClick={() => {
                closeCart();
                setView('checkout');
              }}
              className="flex-[2] cursor-pointer rounded-full bg-[#C85A32] py-3 text-center text-sm font-bold text-white transition-colors duration-200 hover:bg-[#A84624]"
            >
              Checkout · {money(total)}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
