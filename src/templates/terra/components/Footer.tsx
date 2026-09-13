import React, { useState } from 'react';
import { useUIStore } from '../stores/uiStore';

export default function Footer() {
  const { setView } = useUIStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1B241E] text-[#FBF9F5]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <p className="font-display text-2xl font-bold">
              TERRA <span className="text-[#C85A32]">&</span> CRU
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed opacity-70">
              Elevated everyday staples from regenerative smallholders. Chilled, carbon-neutral, transparent to the harvest.
            </p>
            <p className="mt-4 text-xs opacity-50">Batch numbers & lab tests on every label.</p>
          </div>

          <nav aria-label="Shop">
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase opacity-60">Shop</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => setView('category', 'oils-vinegars')}
                  className="hover:text-[#F3D27A] cursor-pointer text-left transition-colors"
                >
                  Oils & Vinegars
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setView('category', 'tinned-delicacies')}
                  className="hover:text-[#F3D27A] cursor-pointer text-left transition-colors"
                >
                  Tinned Delicacies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setView('category', 'heritage-grains')}
                  className="hover:text-[#F3D27A] cursor-pointer text-left transition-colors"
                >
                  Heritage Grains
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setView('box')}
                  className="hover:text-[#F3D27A] cursor-pointer text-left transition-colors"
                >
                  Pantry Box
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setView('shop')}
                  className="hover:text-[#F3D27A] cursor-pointer text-left transition-colors"
                >
                  Shop All
                </button>
              </li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase opacity-60">Company</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => setView('makers')}
                  className="hover:text-[#F3D27A] cursor-pointer text-left transition-colors"
                >
                  Makers & Provenance
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setView('recipes')}
                  className="hover:text-[#F3D27A] cursor-pointer text-left transition-colors"
                >
                  Recipes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setView('about')}
                  className="hover:text-[#F3D27A] cursor-pointer text-left transition-colors"
                >
                  Our Standard
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setView('shipping')}
                  className="hover:text-[#F3D27A] cursor-pointer text-left transition-colors"
                >
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setView('faq')}
                  className="hover:text-[#F3D27A] cursor-pointer text-left transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setView('contact')}
                  className="hover:text-[#F3D27A] cursor-pointer text-left transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase opacity-60">Get the harvest letter</p>
            {subscribed ? (
              <p className="mt-3 text-sm text-[#F3D27A] font-medium">Thank you for joining the harvest letter.</p>
            ) : (
              <form className="mt-3 flex gap-2" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="footer-nl-email">Email</label>
                <input
                  id="footer-nl-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@table.com"
                  className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm outline-none placeholder:text-white/40 focus:border-[#F3D27A]"
                />
                <button
                  type="submit"
                  className="cursor-pointer rounded-full bg-[#C85A32] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#A84624]"
                >
                  Join
                </button>
              </form>
            )}
            <p className="mt-2 text-xs opacity-50">One email per harvest. No spam.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs opacity-60">
          <span>
            © 2026 TERRA & CRU. All rights reserved. ·{' '}
            <button
              type="button"
              onClick={() => setView('legal')}
              className="underline underline-offset-2 hover:text-[#F3D27A] cursor-pointer"
            >
              Privacy & Terms
            </button>
          </span>
          <span>Regenerative · Carbon-neutral · Smallholder-first</span>
        </div>
      </div>
    </footer>
  );
}
