import React from 'react';
import { useUIStore } from '../stores/uiStore';

const faqs = [
  {
    q: 'How fast is delivery?',
    a: 'Standard chilled arrives in 2–4 business days ($6.95, free over $65). Express is 1–2 days for $12.95. We dispatch Monday–Thursday so food never sits in a depot.',
  },
  {
    q: 'How do subscriptions work?',
    a: 'Choose Subscribe & Save on any product for 10% off, delivered every 2, 4 or 6 weeks. Pause, swap or cancel anytime from your account — no emails, no phone calls.',
  },
  {
    q: 'What if I have allergies?',
    a: 'Every product page lists full ingredients and allergens, and every jar carries a batch lab report. Tinned fish contains fish; heritage grains contain gluten; pistachio cream contains tree nuts and milk.',
  },
  {
    q: 'What is the Pantry Box?',
    a: 'Pick 4, 6 or 8 staples and save 15%, shipped in a keepsake wooden crate. Make it a subscription for an extra 10% off.',
  },
  {
    q: 'Can I send a gift?',
    a: 'Yes — add a gift note in the cart and we hand-write it. Crates ship ready to give; prices never appear in the box.',
  },
  {
    q: 'What is your returns policy?',
    a: "Our 30-day pantry promise: if you don't love an opened product, tell us within 30 days for a replacement or refund. Keep the jar.",
  },
  {
    q: 'Where do you deliver?',
    a: 'Nationwide chilled delivery. Remote postcodes may add a day — the checkout shows exact options for your address.',
  },
];

export default function FaqPage() {
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
        / <span className="font-medium text-[#1B241E]">FAQ</span>
      </nav>

      <h1 className="font-display text-4xl font-semibold">Questions, answered</h1>

      <div className="mt-6 divide-y divide-[#1B241E]/10 rounded-2xl border border-[#1B241E]/10 bg-white">
        {faqs.map((f, i) => (
          <details key={i} className="group px-5 py-4">
            <summary className="cursor-pointer list-none text-[15px] font-bold flex items-center justify-between">
              <span>{f.q}</span>
              <span className="text-[#6F7A72] transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pt-2 text-[15px] leading-relaxed text-[#4A554D]">{f.a}</p>
          </details>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-[#4A554D]">
        Still curious?{' '}
        <button
          type="button"
          onClick={() => setView('contact')}
          className="font-bold underline underline-offset-4 hover:text-[#C85A32] cursor-pointer"
        >
          Talk to a human
        </button>
      </p>
    </main>
  );
}
