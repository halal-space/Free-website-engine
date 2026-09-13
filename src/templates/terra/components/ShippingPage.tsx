import React from 'react';
import { useUIStore } from '../stores/uiStore';
import Icon from './Icon';

export default function ShippingPage() {
  const { setView } = useUIStore();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-[#6F7A72]">
        <button
          type="button"
          onClick={() => setView('home')}
          className="hover:text-[#1B241E] cursor-pointer"
        >
          Home
        </button>{' '}
        / <span className="font-medium text-[#1B241E]">Shipping & Returns</span>
      </nav>

      <h1 className="font-display text-4xl font-semibold">Shipping & returns</h1>

      <div className="mt-6 space-y-3">
        <div className="flex gap-4 rounded-2xl border border-[#1B241E]/10 bg-white p-5">
          <span className="shrink-0 text-[#3B583E]">
            <Icon name="Truck" size={22} />
          </span>
          <div>
            <h2 className="font-bold">Standard chilled — $6.95, free over $65</h2>
            <p className="mt-1 text-sm text-[#4A554D]">
              2–4 business days in insulated, recyclable chill packaging. Carbon-neutral on every route.
            </p>
          </div>
        </div>

        <div className="flex gap-4 rounded-2xl border border-[#1B241E]/10 bg-white p-5">
          <span className="shrink-0 text-[#3B583E]">
            <Icon name="Snowflake" size={22} />
          </span>
          <div>
            <h2 className="font-bold">Express chilled — $12.95</h2>
            <p className="mt-1 text-sm text-[#4A554D]">
              1–2 business days. Order by noon for same-day dispatch from the cellar, Monday to Thursday.
            </p>
          </div>
        </div>

        <div className="flex gap-4 rounded-2xl border border-[#1B241E]/10 bg-white p-5">
          <span className="shrink-0 text-[#C85A32]">
            <Icon name="Gift" size={22} />
          </span>
          <div>
            <h2 className="font-bold">30-day pantry promise</h2>
            <p className="mt-1 text-sm text-[#4A554D]">
              Opened it and don't love it? Tell us within 30 days for a replacement or refund — no return
              shipping, keep the jar.
            </p>
          </div>
        </div>
      </div>

      <h2 className="font-display mt-8 text-2xl font-semibold">Good to know</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] text-[#4A554D]">
        <li>We ship Monday–Thursday so nothing sits in a depot over the weekend.</li>
        <li>Complimentary artisanal butter unlocks at $79 per order.</li>
        <li>Subscriptions pause, swap or cancel anytime from your account.</li>
        <li>Gift notes are hand-written; crates ship ready to give.</li>
      </ul>
    </main>
  );
}
