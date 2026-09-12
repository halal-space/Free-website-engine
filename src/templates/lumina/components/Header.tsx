'use client';

import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, Globe } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useUIStore } from '../stores/uiStore';
import { CURRENCIES } from '../products';
import type { CurrencyCode } from '../types';

interface HeaderProps {
  storeName?: string;
  tagline?: string;
  accentColor?: string;
  onNavigateSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  storeName = 'ATELIER VÉLÈNE',
  tagline = 'Paris · Milan · New York',
  accentColor = '#C5A880',
  onNavigateSection
}) => {
  const { currency, setCurrency, getTotalItemsCount, setCartOpen } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const {
    setSearchOpen,
    setMobileNavOpen,
    setWishlistOpen,
    setActivePageView,
    setSelectedCollectionSlug,
    setShopInitialCategory
  } = useUIStore();

  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalCartCount = mounted ? getTotalItemsCount() : 0;
  const totalWishlistCount = mounted ? wishlistItems.length : 0;

  const navLinks: { label: string; view: 'home' | 'shop' | 'collections' | 'lookbook' | 'about' | 'appointments'; category?: string; href: string }[] = [
    { label: 'Arrivals', view: 'shop', category: 'all', href: '#arrivals' },
    { label: 'Collections', view: 'collections', href: '#collections' },
    { label: 'Garments', view: 'shop', category: 'all', href: '#garments' },
    { label: 'Tailoring', view: 'shop', category: 'tailoring', href: '#materiality' },
    { label: 'Dresses', view: 'shop', category: 'dresses', href: '#numbered' },
    { label: 'Lookbook', view: 'lookbook', href: '#lookbook' },
    { label: 'Heritage', view: 'about', href: '#manifesto' }
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: { label: string; view: 'home' | 'shop' | 'collections' | 'lookbook' | 'about' | 'appointments'; category?: string; href: string }
  ) => {
    e.preventDefault();
    if (link.category) {
      setShopInitialCategory(link.category);
    }
    if (link.view === 'collections') {
      setSelectedCollectionSlug(null);
    }
    setActivePageView(link.view);
    onNavigateSection?.(link.label.toLowerCase());
  };

  const handleWordmarkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActivePageView('home');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <aside
        aria-label="Announcement"
        className="bg-[#0C0C0D] text-[#FAF8F5] text-[10px] sm:text-[11px] tracking-ultra-wide uppercase py-2 px-4 text-center border-b border-[#1E1E20] flex items-center justify-center gap-4 transition-colors"
      >
        <span className="hidden sm:inline" style={{ color: accentColor }}>❖</span>
        <span>Complimentary Worldwide Courier on Orders Over $500</span>
        <span className="hidden md:inline text-[#52525B]">•</span>
        <span className="hidden md:inline">2026 Archive Lookbook Now Open</span>
        <span className="hidden sm:inline" style={{ color: accentColor }}>❖</span>
      </aside>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E3DA] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-18 sm:h-20 flex items-center justify-between">
          {/* Brand Wordmark */}
          <div className="flex flex-col">
            <a href="#hero" onClick={handleWordmarkClick} className="group block cursor-pointer">
              <span className="font-serif text-lg sm:text-2xl tracking-[0.25em] text-[#0C0C0D] uppercase font-light group-hover:text-[#C5A880] transition-colors">
                {storeName}
              </span>
              <span className="block text-[8px] sm:text-[9px] tracking-[0.35em] text-[#71717A] uppercase -mt-0.5 font-sans">
                {tagline}
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-9 text-[11px] xl:text-xs tracking-cinematic uppercase text-[#0C0C0D] ml-8 mr-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className="hover:text-[#C5A880] transition-colors relative py-1 group"
              >
                <span>{link.label}</span>
                <span
                  className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: accentColor }}
                />
              </a>
            ))}
          </nav>

          {/* Header Actions (Currency, Search, Wishlist, Cart Drawer, Mobile Menu) */}
          <div className="pl-6 flex items-center gap-3 sm:gap-5">
            {/* Currency Switcher */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-mono text-[#52525B] hover:text-[#0C0C0D] transition-colors py-1 cursor-pointer"
                aria-label="Select currency"
              >
                <Globe className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span>{currency}</span>
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-[#FAF8F5] border border-[#D4CDC3] shadow-xl py-1 z-50 animate-fade-in">
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrency(code);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                        currency === code
                          ? 'bg-[#0C0C0D] text-[#FAF8F5]'
                          : 'text-[#52525B] hover:bg-[#F5F2EB] hover:text-[#0C0C0D]'
                      }`}
                    >
                      <span>{code}</span>
                      <span className="text-[10px] opacity-70">{CURRENCIES[code].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Global Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1.5 text-xs text-[#0C0C0D] hover:text-[#C5A880] transition-colors py-1 cursor-pointer group"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline-block text-[10px] tracking-widest uppercase text-[#71717A] group-hover:text-[#0C0C0D]">
                Search <kbd className="font-mono text-[9px] bg-[#E8E3DA] px-1 py-0.5 ml-1">⌘K</kbd>
              </span>
            </button>

            {/* Wishlist Link with counter */}
            <button
              onClick={() => {
                setActivePageView('wishlist');
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="relative text-[#0C0C0D] hover:text-[#C5A880] transition-colors p-1 cursor-pointer"
              aria-label={`Wishlist with ${totalWishlistCount} items`}
            >
              <Heart className="w-4 h-4" />
              {totalWishlistCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 text-white text-[9px] font-mono rounded-full flex items-center justify-center"
                  style={{ backgroundColor: accentColor }}
                >
                  {totalWishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Trigger with Counter */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-[#0C0C0D] hover:text-[#C5A880] transition-colors p-1 flex items-center gap-1 cursor-pointer group"
              aria-label={`Shopping bag with ${totalCartCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#0C0C0D] text-[#FAF8F5] text-[9px] font-mono rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden text-[#0C0C0D] hover:text-[#C5A880] transition-colors p-1 cursor-pointer"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
