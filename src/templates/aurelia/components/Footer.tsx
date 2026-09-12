'use client';

import React, { useState } from 'react';
import { Truck, RefreshCcw, ShieldCheck, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { aureliaCategories, aureliaSiteMeta } from '../data';
import { buttonClasses } from './ui/Button';
import { cn } from '../lib/utils';

export function Footer({ storeName = 'AURELIA' }: { storeName?: string }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setDone(true);
  };

  return (
    <footer id="footer" className="border-t border-line bg-surface-2">
      <div className="container-site py-16 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr] lg:gap-20">
          <div>
            <p className="font-display text-2xl font-bold tracking-[0.06em] text-ink uppercase">{storeName}</p>
            <h2 className="mt-6 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Stay ahead of what's next.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
              Get early access to new products, exclusive releases, and special offers — delivered
              before anyone else sees them.
            </p>
            <div className="mt-6">
              {done ? (
                <div className="flex items-center gap-3 rounded-btn border border-line bg-surface px-4 py-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[color:var(--success)]" />
                  <p className="text-sm text-ink-soft">
                    Thank you. You are on the list for early access and exclusive releases.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="flex max-w-md gap-2">
                    <label className="sr-only" htmlFor="footer-email">
                      Email address
                    </label>
                    <input
                      id="footer-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Enter your email"
                      className="h-12 w-full rounded-btn border border-line bg-surface px-4 text-sm text-ink placeholder:text-ink-muted transition-colors focus:border-accent focus:outline-none"
                    />
                    <button type="submit" className={buttonClasses({ size: 'lg' })}>
                      Subscribe
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  {error && <p className="mt-2 text-xs text-danger">{error}</p>}
                </form>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <div>
              <p className="label-caps mb-4">Shop</p>
              <ul className="space-y-2.5">
                {aureliaSiteMeta.footerLinks.shop.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="link-underline text-sm text-ink-soft transition-colors hover:text-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label-caps mb-4">Categories</p>
              <ul className="space-y-2.5">
                {aureliaCategories.map((c) => (
                  <li key={c.slug}>
                    <a href={`#category-${c.slug}`} className="link-underline text-sm text-ink-soft transition-colors hover:text-ink">
                      {c.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label-caps mb-4">Support</p>
              <ul className="space-y-2.5">
                {aureliaSiteMeta.footerLinks.support.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="link-underline text-sm text-ink-soft transition-colors hover:text-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label-caps mb-4">Company</p>
              <ul className="space-y-2.5">
                {aureliaSiteMeta.footerLinks.company.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="link-underline text-sm text-ink-soft transition-colors hover:text-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2 text-xs text-ink-muted">
                  {aureliaSiteMeta.contact.email}
                  <br />
                  {aureliaSiteMeta.contact.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              <li className="flex items-center gap-2 text-xs text-ink-muted">
                <Truck className="h-4 w-4" /> Free 2-day shipping over $499
              </li>
              <li className="flex items-center gap-2 text-xs text-ink-muted">
                <RefreshCcw className="h-4 w-4" /> 30-day free returns
              </li>
              <li className="flex items-center gap-2 text-xs text-ink-muted">
                <ShieldCheck className="h-4 w-4" /> 2-year warranty
              </li>
              <li className="flex items-center gap-2 text-xs text-ink-muted">
                <Lock className="h-4 w-4" /> Secure checkout
              </li>
            </ul>

            <div className="flex items-center gap-4">
              {aureliaSiteMeta.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  <span className="text-xs font-semibold">{s.name[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="text-xs text-ink-muted">
              © {new Date().getFullYear()} {storeName} Technology. All rights reserved.
            </p>
            <div className="flex gap-6">
              {aureliaSiteMeta.footerLinks.legal.map((l) => (
                <a key={l.label} href={l.href} className="text-xs text-ink-muted transition-colors hover:text-ink">
                  {l.label}
                </a>
              ))}
            </div>
            <p className="text-xs text-ink-muted">Design concept — {storeName} Studio</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
