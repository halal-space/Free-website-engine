'use client';

import React, { useState } from 'react';
import { footerColumns } from '../navigation';
import { useUIStore } from '../stores/uiStore';

interface FooterProps {
  storeName?: string;
  accentColor?: string;
  newsletterHeading?: string;
  newsletterSubtitle?: string;
  contactEmail?: string;
  copyrightNotice?: string;
}

export const Footer: React.FC<FooterProps> = ({
  storeName = 'AETHER',
  accentColor = '#3b82f6',
  newsletterHeading,
  newsletterSubtitle,
  contactEmail,
  copyrightNotice,
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const {
    navigateToHome,
    navigateToShop,
    navigateToDeals,
    navigateToAbout,
    navigateToContact,
  } = useUIStore();

  const handleLinkClick = (href: string) => {
    if (href.startsWith('/category/')) {
      const slug = href.replace('/category/', '');
      navigateToShop(slug);
    } else if (href === '/deals') {
      navigateToDeals();
    } else if (href.startsWith('/about')) {
      navigateToAbout();
    } else if (href.startsWith('/contact')) {
      navigateToContact();
    } else if (href === '/shop') {
      navigateToShop();
    } else {
      navigateToHome();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[var(--border-subtle)]">
          <div className="lg:col-span-6 space-y-4">
            <button
              onClick={navigateToHome}
              className="flex items-center gap-2.5 cursor-pointer text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-[var(--text-primary)] text-[var(--text-inverse)] flex items-center justify-center font-mono font-black text-xs">
                Æ
              </div>
              <span className="font-bold tracking-[0.25em] text-sm uppercase text-[var(--text-primary)]">
                {storeName}
              </span>
            </button>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] max-w-md">
              Technology, refined to the atomic standard.
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-lg leading-relaxed">
              Crafting ultra-high-performance acoustics, titanium computational devices, and horological timepieces for those who demand unrelenting precision.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-[var(--text-muted)] font-mono">
              <span>COPENHAGEN</span>
              <span>•</span>
              <span>TOKYO</span>
              <span>•</span>
              <span>SAN FRANCISCO</span>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="p-6 sm:p-8 rounded-2xl luxury-card bg-[var(--bg-card)]">
              <span
                className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold block mb-1"
                style={{ color: accentColor }}
              >
                CLIENT DISPATCH
              </span>
              <h4 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2">
                {newsletterHeading || "Stay ahead of what's next."}
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
                {newsletterSubtitle || 'Receive private allocations, advance engineering journals, and bespoke invitations to limited acoustic releases.'}
              </p>

              {submitted ? (
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-400 font-medium animate-fade-in">
                  ✓ Registration confirmed. Your confidential access credentials have been dispatched.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your confidential email"
                    className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--text-inverse)] text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity flex-shrink-0 cursor-pointer"
                  >
                    Request Access
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Columns Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border-b border-[var(--border-subtle)]">
          {footerColumns.map((col) => (
            <div key={col.title} className="space-y-4">
              <h5 className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[var(--text-primary)]">
                {col.title}
              </h5>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.title}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hover:translate-x-0.5 inline-block cursor-pointer text-left"
                    >
                      {link.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar with Trust & Currency */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <div className="flex flex-wrap items-center gap-4">
            <span>{copyrightNotice || `© ${new Date().getFullYear()} ${storeName} Laboratories Inc. All rights reserved.`}</span>
            <span className="hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5 text-[var(--text-secondary)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              All Systems Encrypted & Operational
            </span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span className="text-[var(--text-secondary)]">GLOBAL / USD ($)</span>
            <span>256-BIT ENCRYPTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
