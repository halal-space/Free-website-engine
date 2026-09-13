import React from 'react';
import { useUIStore } from '../stores/uiStore';

export default function LegalPage() {
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
        / <span className="font-medium text-[#1B241E]">Privacy & Terms</span>
      </nav>

      <h1 className="font-display text-4xl font-semibold">Privacy & terms</h1>
      <p className="mt-2 text-sm text-[#6F7A72]">
        Last updated September 2026. Plain-language summary of how this demo shop works.
      </p>

      <section className="mt-6 rounded-2xl border border-[#1B241E]/10 bg-white p-6">
        <h2 className="font-display text-2xl font-semibold">Privacy</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[#4A554D]">
          <li>
            Your cart, preferences and demo orders live in your browser's local storage — we never see or
            transmit them.
          </li>
          <li>
            The newsletter form is a placeholder; submitted addresses go nowhere until a provider is
            connected.
          </li>
          <li>Product imagery is served from a stock-photo CDN, which may log standard request data.</li>
          <li>Contact us any time to ask what (little) data exists and have it deleted.</li>
        </ul>
      </section>

      <section className="mt-4 rounded-2xl border border-[#1B241E]/10 bg-white p-6">
        <h2 className="font-display text-2xl font-semibold">Terms</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[#4A554D]">
          <li>Checkout is a demonstration: no payment is processed and no order is fulfilled.</li>
          <li>Prices, availability and batch numbers shown are illustrative of the concept.</li>
          <li>
            Allergen and ingredient panels are representative samples, not medical advice — always read the
            physical label.
          </li>
          <li>Subscriptions described here are mock objects for UX purposes.</li>
        </ul>
      </section>
    </main>
  );
}
