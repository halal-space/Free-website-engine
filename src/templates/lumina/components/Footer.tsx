'use client';

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';

interface FooterProps {
  storeName?: string;
  accentColor?: string;
}

export const Footer: React.FC<FooterProps> = ({
  storeName = 'ATELIER VÉLÈNE',
  accentColor = '#C5A880'
}) => {
  const { setActivePageView, setSelectedCollectionSlug, setShopInitialCategory, setWishlistOpen } = useUIStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#0C0C0D] text-[#FAF8F5] pt-20 pb-12 border-t border-[#1E1E20] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Top Newsletter / Private Invitation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#2A2A2E]">
          <div className="lg:col-span-6 space-y-4">
            <span
              className="text-[10px] tracking-ultra-wide uppercase block font-medium"
              style={{ color: accentColor }}
            >
              Private Client Services
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#FAF8F5] leading-snug">
              Receive Private Access to Numbered Archive Releases & Salon Previews.
            </h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed max-w-lg">
              Subscribers receive invitations to seasonal atelier trunk shows in Paris and Milan, priority access to limited numbered pieces, and bespoke client concierge consultations.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            {subscribed ? (
              <div className="p-4 border bg-[#18181B] text-xs font-mono text-[#FAF8F5]" style={{ borderColor: accentColor }}>
                ✓ You have been discreetly added to the {storeName} Private Client Registry.
              </div>
            ) : (
              <form className="space-y-3 max-w-md" onSubmit={handleSubmit}>
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your confidential email..."
                    className="flex-1 bg-[#18181B] border border-[#2A2A2E] px-4 py-3 text-xs text-[#FAF8F5] placeholder-[#71717A] focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[#FAF8F5] text-[#0C0C0D] hover:bg-[#C5A880] hover:text-[#FAF8F5] px-6 py-3 text-xs tracking-ultra-wide uppercase transition-colors shrink-0 cursor-pointer font-medium"
                  >
                    Request Entry
                  </button>
                </div>
                <p className="text-[10px] text-[#71717A]">
                  By registering, you consent to receive discreet communications from Maison {storeName}. You may opt out at any salon.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Middle Link Columns & Boutique Salons */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-16 border-b border-[#2A2A2E] text-xs">
          {/* Col 1: Collections */}
          <div className="space-y-3">
            <h4
              className="text-[11px] tracking-ultra-wide uppercase font-medium"
              style={{ color: accentColor }}
            >
              Collections
            </h4>
            <ul className="space-y-2 text-[#A1A1AA]">
              <li><button onClick={() => { setSelectedCollectionSlug('the-2026-archive'); setActivePageView('collections'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left">The 2026 Archive</button></li>
              <li><button onClick={() => { setSelectedCollectionSlug('sculptural-eveningwear'); setActivePageView('collections'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left">Sculptural Eveningwear</button></li>
              <li><button onClick={() => { setSelectedCollectionSlug('tactile-cashmere-series'); setActivePageView('collections'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left">Tactile Cashmere Series</button></li>
              <li><button onClick={() => { setSelectedCollectionSlug('leather-archives'); setActivePageView('collections'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left">Leather Archives</button></li>
              <li><button onClick={() => { setActivePageView('lookbook'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left">Haute Couture Lookbook</button></li>
            </ul>
          </div>

          {/* Col 2: Atelier Garments */}
          <div className="space-y-3">
            <h4
              className="text-[11px] tracking-ultra-wide uppercase font-medium"
              style={{ color: accentColor }}
            >
              Garments
            </h4>
            <ul className="space-y-2 text-[#A1A1AA]">
              <li><button onClick={() => { setShopInitialCategory('outerwear'); setActivePageView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left">Outerwear & Coats</button></li>
              <li><button onClick={() => { setShopInitialCategory('tailoring'); setActivePageView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left">Architectural Tailoring</button></li>
              <li><button onClick={() => { setShopInitialCategory('dresses'); setActivePageView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left">Silk Gowns & Dresses</button></li>
              <li><button onClick={() => { setShopInitialCategory('knitwear'); setActivePageView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left">Mongolian Cashmere</button></li>
              <li><button onClick={() => { setShopInitialCategory('leather-accessories'); setActivePageView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left">Leather Goods & Boots</button></li>
            </ul>
          </div>

          {/* Col 3: Client Services */}
          <div className="space-y-3">
            <h4
              className="text-[11px] tracking-ultra-wide uppercase font-medium"
              style={{ color: accentColor }}
            >
              Client Services
            </h4>
            <ul className="space-y-2 text-[#A1A1AA]">
              <li><button onClick={() => { setActivePageView('appointments'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left">Book Salon Fitting</button></li>
              <li><button onClick={() => { setWishlistOpen(true); }} className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left">Saved Wishlist</button></li>
              <li><button onClick={() => { setActivePageView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left">Garment Preservation & Care</button></li>
              <li><button onClick={() => { setActivePageView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left">Insured White-Glove Courier</button></li>
            </ul>
          </div>

          {/* Col 4: Maison Heritage */}
          <div className="space-y-3">
            <h4
              className="text-[11px] tracking-ultra-wide uppercase font-medium"
              style={{ color: accentColor }}
            >
              The Maison
            </h4>
            <ul className="space-y-2 text-[#A1A1AA]">
              <li><button onClick={() => { setActivePageView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left">Atelier Heritage & Origin</button></li>
              <li><button onClick={() => { setActivePageView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left">Ethical Fiber Provenance</button></li>
              <li><button onClick={() => { setActivePageView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left">Press & Critical Reviews</button></li>
              <li><button onClick={() => { setActivePageView('appointments'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left">Flagship Boutiques</button></li>
            </ul>
          </div>

          {/* Col 5: Global Salons */}
          <div className="col-span-2 sm:col-span-1 space-y-3">
            <h4
              className="text-[11px] tracking-ultra-wide uppercase font-medium"
              style={{ color: accentColor }}
            >
              Flagship Salons
            </h4>
            <div className="space-y-2.5 text-[11px] text-[#A1A1AA]">
              <div>
                <strong className="text-[#FAF8F5] block">PARIS</strong>
                <span>18 Rue du Faubourg Saint-Honoré</span>
              </div>
              <div>
                <strong className="text-[#FAF8F5] block">MILAN</strong>
                <span>Via Montenapoleone 14</span>
              </div>
              <div>
                <strong className="text-[#FAF8F5] block">NEW YORK</strong>
                <span>840 Madison Avenue</span>
              </div>
              <div>
                <strong className="text-[#FAF8F5] block">TOKYO</strong>
                <span>6-10-1 Ginza, Chuo-ku</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#71717A] gap-4">
          <div className="flex items-center gap-6">
            <span>© 2026 {storeName.toUpperCase()}. All Rights Reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Certified Sustainable Haute Couture</span>
          </div>

          <div className="flex items-center space-x-6 text-[10px] tracking-widest uppercase">
            <a href="#hero" className="hover:text-[#FAF8F5] transition-colors">Privacy Policy</a>
            <a href="#hero" className="hover:text-[#FAF8F5] transition-colors">Terms of Service</a>
            <a href="#hero" className="hover:text-[#FAF8F5] transition-colors">Ethical Code</a>
            <a href="#hero" className="hover:text-[#C5A880] transition-colors flex items-center gap-1">
              <span>Private Concierge</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
