'use client';

import React from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';

interface FooterProps {
  storeName?: string;
  accentColor?: string;
  contactEmail?: string;
  locationDetails?: string;
  copyrightNotice?: string;
}

export const Footer: React.FC<FooterProps> = ({
  storeName = 'Maison Petit',
  accentColor = '#B88B4A',
  contactEmail = 'concierge@maisonpetit.com',
  locationDetails = '42 Rue de l’Université, 75007 Paris, France',
  copyrightNotice,
}) => {
  const { navigateToShop, navigateToAbout } = useUIStore();

  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-16 pb-12 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand Col (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] text-[#FAF8F5] uppercase font-medium">
                {storeName}
              </span>
              <span className="block text-[9px] uppercase tracking-[0.38em] text-white/50 font-sans font-light mt-0.5">
                L’Art de L’Enfance • Paris • London • New York
              </span>
            </div>

            <p className="text-xs text-white/70 leading-relaxed max-w-sm font-light">
              A luxury boutique created for discerning parents who believe everyday childhood essentials should be safe, natural, and timelessly beautiful.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#B88B4A] flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#B88B4A] flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#B88B4A] flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Email Concierge"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Links Col (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-medium tracking-wider uppercase text-white/90">
              The Collections
            </h4>
            <ul className="space-y-2 text-xs text-white/70 font-light">
              <li>
                <button onClick={() => navigateToShop('baby-essentials')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Baby Essentials
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop('baby-accessories')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Baby Accessories
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop('nursery-feeding')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Nursery & Feeding
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop('toys-play')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Toys & Play
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop('kids-clothing')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Kids' Clothing
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop('school-essentials')} className="hover:text-white transition-colors cursor-pointer text-left">
                  School Essentials
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop(undefined, 'newest')} className="text-[#C09553] hover:text-white transition-colors font-medium cursor-pointer text-left" style={{ color: accentColor }}>
                  New Arrivals
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care Col (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-medium tracking-wider uppercase text-white/90">
              Client Care & Services
            </h4>
            <ul className="space-y-2 text-xs text-white/70 font-light">
              <li>
                <button onClick={navigateToAbout} className="hover:text-white transition-colors cursor-pointer text-left">
                  Complimentary Delivery & Tracking
                </button>
              </li>
              <li>
                <button onClick={navigateToAbout} className="hover:text-white transition-colors cursor-pointer text-left">
                  30-Day Doorstep Returns
                </button>
              </li>
              <li>
                <button onClick={navigateToAbout} className="hover:text-white transition-colors cursor-pointer text-left">
                  Bespoke Gift Boxes & Handwritten Cards
                </button>
              </li>
              <li>
                <button onClick={navigateToAbout} className="hover:text-white transition-colors cursor-pointer text-left">
                  Our Ethical Sourcing Charter
                </button>
              </li>
              <li>
                <button onClick={navigateToAbout} className="hover:text-white transition-colors cursor-pointer text-left">
                  European Toy & Fabric Certifications
                </button>
              </li>
              <li>
                <button onClick={navigateToAbout} className="hover:text-white transition-colors cursor-pointer text-left">
                  About Maison Petit
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Contact Col (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-medium tracking-wider uppercase text-white/90">
              Atelier Concierge
            </h4>
            <div className="space-y-2 text-xs text-white/70 font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C09553] shrink-0 mt-0.5" style={{ color: accentColor }} />
                <span>{locationDetails}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C09553] shrink-0" style={{ color: accentColor }} />
                <a href={`mailto:${contactEmail}`} className="hover:text-white">{contactEmail}</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C09553] shrink-0" style={{ color: accentColor }} />
                <span>+33 (0) 1 42 68 55 00</span>
              </p>
              <p className="text-[11px] text-white/50 pt-1">
                Monday–Saturday: 9:00 AM – 6:00 PM CET
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-light">
          <p>{copyrightNotice || `© ${new Date().getFullYear()} ${storeName} Inc. All rights reserved. Crafted with care for little moments.`}</p>

          {/* Payment Badges */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/40 uppercase tracking-wider mr-1">Protected by:</span>
            <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-medium text-white/80">Apple Pay</span>
            <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-medium text-white/80">Visa</span>
            <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-medium text-white/80">Mastercard</span>
            <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-medium text-white/80">Amex</span>
            <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-medium text-white/80">Klarna</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
