import React, { useMemo, useState } from 'react';
import { useCartStore } from '../stores/cartStore';
import { useUIStore } from '../stores/uiStore';
import { saveOrder, newOrderId } from '../stores/ordersStore';
import { money } from '../data/catalog';
import Icon from './Icon';

type Fields = {
  email: string;
  first: string;
  last: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  method: 'standard' | 'express';
  card: string;
  expiry: string;
  cvc: string;
};

const EMPTY: Fields = {
  email: '',
  first: '',
  last: '',
  address: '',
  city: '',
  postcode: '',
  country: 'United States',
  method: 'standard',
  card: '',
  expiry: '',
  cvc: '',
};

const STEPS = ['Contact', 'Delivery', 'Payment'] as const;

export default function CheckoutPage() {
  const { lines, carbonNeutral, giftNote, clearCart } = useCartStore();
  const { setView } = useUIStore();

  const [step, setStep] = useState(0);
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<string[]>([]);

  const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0);

  const shipping = useMemo(() => {
    if (f.method === 'express') return 12.95;
    return subtotal >= 65 ? 0 : 6.95;
  }, [f.method, subtotal]);

  const carbonFee = carbonNeutral && lines.length ? 1 : 0;
  const total = subtotal + shipping + carbonFee;

  const set = (k: keyof Fields, v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    setErrors([]);
  };

  const validate = (s: number): string[] => {
    const e: string[] = [];
    if (s === 0) {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) e.push('Enter a valid email address.');
      if (!f.first.trim()) e.push('First name is required.');
      if (!f.last.trim()) e.push('Last name is required.');
    }
    if (s === 1) {
      if (!f.address.trim()) e.push('Street address is required.');
      if (!f.city.trim()) e.push('City is required.');
      if (!f.postcode.trim()) e.push('Postal code is required.');
    }
    if (s === 2) {
      if (f.card.replace(/\D/g, '').length < 15) {
        e.push('Card number looks incomplete (demo — any 15+ digits).');
      }
      if (!/^\d{2}\s?\/\s?\d{2,4}$/.test(f.expiry.trim())) {
        e.push('Expiry must look like MM/YY.');
      }
      if (!/^\d{3,4}$/.test(f.cvc.trim())) {
        e.push('CVC must be 3–4 digits.');
      }
    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    setErrors(e);
    if (e.length === 0) setStep((s) => Math.min(2, s + 1));
  };

  const placeOrder = () => {
    const e = [...validate(0), ...validate(1), ...validate(2)];
    setErrors(e);
    if (e.length > 0) return;
    saveOrder({
      id: newOrderId(),
      date: new Date().toISOString(),
      lines,
      subtotal,
      shipping,
      carbon: carbonFee,
      total,
      email: f.email,
      name: `${f.first} ${f.last}`,
      city: f.city,
      method: f.method === 'express' ? 'Express chilled' : 'Standard chilled',
    });
    clearCart();
    setView('checkout-success');
  };

  if (lines.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-[#1B241E]/10 bg-white p-10 text-center">
          <p className="font-display text-3xl font-semibold">Your crate is empty.</p>
          <p className="mt-2 text-sm text-[#6F7A72]">Add something delicious before checking out.</p>
          <button
            type="button"
            onClick={() => setView('shop')}
            className="mt-6 inline-block cursor-pointer rounded-full bg-[#1B241E] px-7 py-3 text-sm font-bold text-white hover:bg-[#3B583E] transition-colors"
          >
            Shop the pantry
          </button>
        </div>
      </main>
    );
  }

  const bad = (id: keyof Fields) => errors.length > 0 && !String(f[id]).trim();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-[#6F7A72]">
        <button
          type="button"
          onClick={() => setView('cart')}
          className="hover:text-[#1B241E] cursor-pointer"
        >
          Cart
        </button>{' '}
        / <span className="font-medium text-[#1B241E]">Checkout</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <ol className="flex gap-2" aria-label="Checkout steps">
            {STEPS.map((s, i) => (
              <li
                key={s}
                aria-current={i === step ? 'step' : undefined}
                className={`flex-1 rounded-full px-4 py-2 text-center text-[13px] font-bold ${
                  i === step
                    ? 'bg-[#1B241E] text-white'
                    : i < step
                    ? 'bg-[#3B583E]/15 text-[#3B583E]'
                    : 'bg-[#1B241E]/5 text-[#6F7A72]'
                }`}
              >
                {i + 1}. {s}
              </li>
            ))}
          </ol>

          {errors.length > 0 && (
            <div
              id="co-errors"
              role="alert"
              className="mt-4 rounded-xl border border-[#C85A32]/40 bg-[#C85A32]/8 p-4"
            >
              <p className="text-sm font-bold text-[#A84624]">Please fix the following:</p>
              <ul className="mt-1 list-disc pl-5 text-sm text-[#A84624]">
                {errors.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 rounded-2xl border border-[#1B241E]/10 bg-white p-5 sm:p-6">
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-semibold">Where should we send updates?</h2>
                <label className="block">
                  <span className="mb-1 block text-[13px] font-semibold">Email</span>
                  <input
                    id="co-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@table.com"
                    value={f.email}
                    onChange={(e) => set('email', e.target.value)}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-[#9aa3a0] ${
                      bad('email') ? 'border-[#C85A32]' : 'border-[#1B241E]/15 focus:border-[#3B583E]'
                    }`}
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-[13px] font-semibold">First name</span>
                    <input
                      id="co-first"
                      autoComplete="given-name"
                      value={f.first}
                      onChange={(e) => set('first', e.target.value)}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-[#9aa3a0] ${
                        bad('first') ? 'border-[#C85A32]' : 'border-[#1B241E]/15 focus:border-[#3B583E]'
                      }`}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[13px] font-semibold">Last name</span>
                    <input
                      id="co-last"
                      autoComplete="family-name"
                      value={f.last}
                      onChange={(e) => set('last', e.target.value)}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-[#9aa3a0] ${
                        bad('last') ? 'border-[#C85A32]' : 'border-[#1B241E]/15 focus:border-[#3B583E]'
                      }`}
                    />
                  </label>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-semibold">Chilled delivery</h2>
                <label className="block">
                  <span className="mb-1 block text-[13px] font-semibold">Street address</span>
                  <input
                    id="co-address"
                    autoComplete="street-address"
                    placeholder="12 Grove Lane, Apt 4"
                    value={f.address}
                    onChange={(e) => set('address', e.target.value)}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-[#9aa3a0] ${
                      bad('address') ? 'border-[#C85A32]' : 'border-[#1B241E]/15 focus:border-[#3B583E]'
                    }`}
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-[13px] font-semibold">City</span>
                    <input
                      id="co-city"
                      autoComplete="address-level2"
                      value={f.city}
                      onChange={(e) => set('city', e.target.value)}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-[#9aa3a0] ${
                        bad('city') ? 'border-[#C85A32]' : 'border-[#1B241E]/15 focus:border-[#3B583E]'
                      }`}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[13px] font-semibold">Postal code</span>
                    <input
                      id="co-postcode"
                      autoComplete="postal-code"
                      value={f.postcode}
                      onChange={(e) => set('postcode', e.target.value)}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-[#9aa3a0] ${
                        bad('postcode') ? 'border-[#C85A32]' : 'border-[#1B241E]/15 focus:border-[#3B583E]'
                      }`}
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1 block text-[13px] font-semibold">Country</span>
                  <select
                    value={f.country}
                    onChange={(e) => set('country', e.target.value)}
                    className="w-full cursor-pointer rounded-xl border border-[#1B241E]/15 bg-white px-4 py-3 text-[15px] outline-none focus:border-[#3B583E]"
                  >
                    {[
                      'United States',
                      'United Kingdom',
                      'Canada',
                      'Germany',
                      'France',
                      'Spain',
                      'Italy',
                      'Australia',
                    ].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <div role="radiogroup" aria-label="Delivery method" className="grid gap-2 sm:grid-cols-2">
                  {(['standard', 'express'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      role="radio"
                      aria-checked={f.method === m}
                      onClick={() => set('method', m)}
                      className={`cursor-pointer rounded-xl border p-4 text-left transition-all duration-200 ${
                        f.method === m
                          ? 'border-[#1B241E] ring-1 ring-[#1B241E]'
                          : 'border-[#1B241E]/15 hover:border-[#1B241E]/40'
                      }`}
                    >
                      <span className="flex items-center gap-2 text-sm font-bold">
                        <Icon name="Truck" size={15} />{' '}
                        {m === 'standard' ? 'Standard chilled' : 'Express chilled'}
                      </span>
                      <span className="tnum mt-1 block text-sm text-[#4A554D]">
                        {m === 'standard'
                          ? subtotal >= 65
                            ? 'Free over $65'
                            : '$6.95 · free over $65'
                          : '$12.95 · 1–2 days'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-semibold">Payment</h2>
                <p className="inline-flex items-center gap-2 rounded-full bg-[#F3D27A]/30 px-3 py-1.5 text-xs font-bold">
                  <Icon name="Lock" size={13} /> Demo checkout — no charge, no real details leave your
                  browser.
                </p>
                <label className="block">
                  <span className="mb-1 block text-[13px] font-semibold">Card number</span>
                  <input
                    id="co-card"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="4242 4242 4242 4242"
                    value={f.card}
                    onChange={(e) => set('card', e.target.value)}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-[#9aa3a0] ${
                      errors.some((e) => e.startsWith('Card'))
                        ? 'border-[#C85A32]'
                        : 'border-[#1B241E]/15 focus:border-[#3B583E]'
                    }`}
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-[13px] font-semibold">Expiry</span>
                    <input
                      id="co-expiry"
                      placeholder="MM/YY"
                      autoComplete="cc-exp"
                      value={f.expiry}
                      onChange={(e) => set('expiry', e.target.value)}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-[#9aa3a0] ${
                        errors.some((e) => e.startsWith('Expiry'))
                          ? 'border-[#C85A32]'
                          : 'border-[#1B241E]/15 focus:border-[#3B583E]'
                      }`}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[13px] font-semibold">CVC</span>
                    <input
                      id="co-cvc"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="123"
                      value={f.cvc}
                      onChange={(e) => set('cvc', e.target.value)}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-[#9aa3a0] ${
                        errors.some((e) => e.startsWith('CVC'))
                          ? 'border-[#C85A32]'
                          : 'border-[#1B241E]/15 focus:border-[#3B583E]'
                      }`}
                    />
                  </label>
                </div>
                <p className="inline-flex items-center gap-1.5 text-xs text-[#6F7A72]">
                  <Icon name="ShieldCheck" size={13} /> Mock validation only. Connect Stripe/Shopify to
                  go live.
                </p>
              </div>
            )}

            <div className="mt-6 flex gap-2">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setStep((s) => s - 1);
                    setErrors([]);
                  }}
                  className="cursor-pointer rounded-full border border-[#1B241E]/20 px-6 py-3 text-sm font-bold transition-colors duration-200 hover:border-[#1B241E]"
                >
                  Back
                </button>
              )}
              {step < 2 ? (
                <button
                  type="button"
                  onClick={next}
                  className="flex-1 cursor-pointer rounded-full bg-[#1B241E] py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#3B583E]"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={placeOrder}
                  className="flex-1 cursor-pointer rounded-full bg-[#C85A32] py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#A84624]"
                >
                  Place order · {money(total)}
                </button>
              )}
            </div>
          </div>
        </div>

        <aside
          className="h-fit rounded-2xl border border-[#1B241E]/10 bg-white p-5 lg:sticky lg:top-28"
          aria-label="Order summary"
        >
          <h2 className="font-display text-xl font-semibold">Order summary</h2>
          <ul className="mt-3 space-y-2">
            {lines.map((l) => (
              <li key={l.id} className="flex items-center gap-2 text-sm">
                <img src={l.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                <span className="flex-1 truncate font-medium">
                  {l.name} <span className="tnum text-[#6F7A72]">× {l.qty}</span>
                </span>
                <span className="tnum font-bold">{money(l.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="tnum mt-4 space-y-1.5 border-t border-[#1B241E]/10 pt-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-[#6F7A72]">Subtotal</dt>
              <dd className="font-semibold">{money(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#6F7A72]">Shipping</dt>
              <dd className="font-semibold">{shipping === 0 ? 'Free' : money(shipping)}</dd>
            </div>
            {carbonFee > 0 && (
              <div className="flex justify-between">
                <dt className="text-[#6F7A72]">Carbon-neutral</dt>
                <dd className="font-semibold">{money(carbonFee)}</dd>
              </div>
            )}
            {giftNote && (
              <div className="flex justify-between">
                <dt className="text-[#6F7A72]">Gift note</dt>
                <dd className="max-w-[50%] truncate font-semibold">“{giftNote}”</dd>
              </div>
            )}
            <div className="flex justify-between border-t border-[#1B241E]/10 pt-2 text-[15px] font-bold">
              <dt>Total</dt>
              <dd>{money(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </main>
  );
}
