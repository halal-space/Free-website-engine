'use client';

import React from 'react';
import { useUIStore } from '../stores/uiStore';
import { useCartStore } from '../stores/cartStore';
import { CURRENCIES } from '../products';
import type { CurrencyCode } from '../types';
import { X, ArrowRight, Sparkles, MapPin, Phone } from 'lucide-react';

export const NavigationDrawer: React.FC = () => {
  const { isMobileNavOpen, setMobileNavOpen, setSearchOpen, setActivePageView } = useUIStore();
  const { currency, setCurrency } = useCartStore();

  if (!isMobileNavOpen) return null;

  const links = [
    { label: 'New Arrivals', href: '#arrivals', view: 'home' as const },
    { label: 'The 2026 Archive', href: '#collections', view: 'collections' as const },
    { label: 'All Garments', href: '#garments', view: 'shop' as const },
    { label: 'Outerwear', href: '#garments', view: 'shop' as const },
    { label: 'Tailoring', href: '#materiality', view: 'shop' as const },
    { label: 'Dresses & Gowns', href: '#numbered', view: 'shop' as const },
    { label: 'Tactile Knitwear', href: '#garments', view: 'shop' as const },
    { label: 'Leather & Objects', href: '#garments', view: 'shop' as const },
    { label: 'Editorial Lookbook', href: '#lookbook', view: 'lookbook' as const },
    { label: 'The Atelier Heritage', href: '#manifesto', view: 'about' as const },
    { label: 'Private Appointments', href: '#appointments', view: 'appointments' as const },
    { label: 'Client Account', href: '#account', view: 'account' as const },
  ];

  const handleLinkClick = (href: string, view?: 'home' | 'shop' | 'collections' | 'lookbook' | 'about' | 'appointments' | 'wishlist' | 'product' | 'checkout' | 'account') => {
    setMobileNavOpen(false);
    if (view) {
      setActivePageView(view);
    }
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[125] flex bg-black/75 backdrop-blur-md animate-fade-in md:hidden">
      <div className="bg-[#FAF8F5] text-[#0C0C0D] w-4/5 max-w-sm h-full flex flex-col justify-between p-6 shadow-2xl overflow-y-auto animate-fade-in-up">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#E8E3DA]">
            <a
              href="#hero"
              onClick={() => handleLinkClick('#hero', 'home')}
              className="font-serif text-lg tracking-widest uppercase"
            >
              ATELIER VÉLÈNE
            </a>
            <button
              onClick={() => setMobileNavOpen(false)}
              className="p-1 text-[#71717A] hover:text-[#0C0C0D] cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Search Button */}
          <button
            onClick={() => {
              setMobileNavOpen(false);
              setSearchOpen(true);
            }}
            className="w-full mt-4 p-2.5 bg-[#F5F2EB] border border-[#E8E3DA] text-left text-xs tracking-wider text-[#71717A] flex items-center justify-between cursor-pointer"
          >
            <span>Search 2026 Archive...</span>
            <span className="font-mono text-[10px] bg-[#E8E3DA] px-1.5 py-0.5">⌘K</span>
          </button>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href, link.view);
                }}
                className="block text-sm font-light text-[#0C0C0D] hover:text-[#C5A880] py-1 border-b border-[#F5F2EB] transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom / Currency & Salons */}
        <div className="pt-6 border-t border-[#E8E3DA] space-y-4">
          <div>
            <span className="text-[10px] tracking-ultra-wide uppercase text-[#71717A] block mb-2">
              Currency
            </span>
            <div className="grid grid-cols-4 gap-1">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                <button
                  key={code}
                  onClick={() => setCurrency(code)}
                  className={`py-1.5 text-center text-xs font-mono transition-colors cursor-pointer ${
                    currency === code
                      ? 'bg-[#0C0C0D] text-[#FAF8F5]'
                      : 'bg-[#F5F2EB] text-[#52525B]'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-[#71717A] space-y-1">
            <div className="flex items-center gap-1.5 text-[#0C0C0D]">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Salons: Paris • Milan • New York • Tokyo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Concierge: +33 (0)1 42 68 00 00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
