import React from 'react';
import { useUIStore } from '../stores/uiStore';
import BundleBuilderSection from './BundleBuilderSection';

export default function PantryBoxPage() {
  const { setView } = useUIStore();

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <h1 className="sr-only">Build Your Pantry Box</h1>
        <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-[#6F7A72]">
          <button
            type="button"
            onClick={() => setView('home')}
            className="hover:text-[#1B241E] cursor-pointer"
          >
            Home
          </button>{' '}
          / <span className="font-medium text-[#1B241E]">Pantry Box</span>
        </nav>
      </div>

      <BundleBuilderSection />

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#1B241E]/10 bg-white p-5">
            <p className="font-display text-lg font-semibold">How the 15% works</p>
            <p className="mt-1 text-sm text-[#4A554D]">
              Every item in your crate is discounted at checkout. No code, no subscription required.
            </p>
          </div>
          <div className="rounded-2xl border border-[#1B241E]/10 bg-white p-5">
            <p className="font-display text-lg font-semibold">The wooden crate</p>
            <p className="mt-1 text-sm text-[#4A554D]">
              FSC olivewood offcuts, yours to keep. Add a gift note in the cart — we hand-write it.
            </p>
          </div>
          <div className="rounded-2xl border border-[#1B241E]/10 bg-white p-5">
            <p className="font-display text-lg font-semibold">Pause or swap anytime</p>
            <p className="mt-1 text-sm text-[#4A554D]">
              Make it a subscription and save an extra 10%. Skip a month whenever you like.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
