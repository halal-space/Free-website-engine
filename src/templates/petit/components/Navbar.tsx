'use client';

import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useUIStore } from '../stores/uiStore';

const DEFAULT_ANNOUNCEMENT_MESSAGES = [
  'Thoughtfully chosen essentials for little ones.',
  'Complimentary gift packaging & handwritten cards on all orders.',
  'Free standard shipping on orders over $75.',
  'Discover the new Autumn / Winter capsule collection.'
];

interface NavbarProps {
  storeName?: string;
  tagline?: string;
  accentColor?: string;
  announcementText?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  storeName = 'Maison Petit',
  tagline = 'L’Art de L’Enfance',
  accentColor,
  announcementText,
}) => {
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  // Store hooks
  const cartItemCount = useCartStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);

  const wishlistItemCount = useWishlistStore((s) => s.getItemCount());
  const openWishlist = useWishlistStore((s) => s.openWishlist);

  const { openSearch, openAccount, navigateToHome, navigateToShop, navigateToAbout } = useUIStore();

  // Rotate announcement bar every 5 seconds if no fixed override is given
  useEffect(() => {
    if (announcementText) return;
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % DEFAULT_ANNOUNCEMENT_MESSAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcementText]);

  // Listen to scroll to elevate sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeAnnouncement = announcementText || DEFAULT_ANNOUNCEMENT_MESSAGES[announcementIndex];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* 1. Announcement Bar */}
      <div className="bg-[#1C1917] text-[#FAF8F5] text-xs py-2 px-3 sm:px-4 border-b border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center space-x-2 text-white/70 text-[11px] tracking-wider uppercase font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#C09553]" style={{ color: accentColor }} />
            <span>Conscious Childhood Luxury</span>
          </div>

          <div className="flex-1 text-center font-light tracking-wide px-2 overflow-hidden">
            <p className="transition-all duration-500 transform inline-block text-[11px] sm:text-xs truncate max-w-[280px] sm:max-w-md md:max-w-none">
              {activeAnnouncement}
            </p>
          </div>

          <div className="hidden md:flex items-center space-x-4 text-[11px] text-white/70">
            <button
              onClick={(e) => {
                e.preventDefault();
                navigateToAbout();
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Our Ethics
            </button>
            <span className="text-white/30">|</span>
            <span className="text-white/80 cursor-pointer">USD ($)</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-b border-[#E8E2D7] py-2.5 lg:py-3'
            : 'bg-[#FAF8F5] border-b border-[#E8E2D7]/80 py-3 lg:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* True 3-Column Grid: Left (1fr), Center (auto), Right (1fr) */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
            {/* Left Column: Mobile Hamburger & Search / Desktop Primary Links */}
            <div className="flex items-center justify-start space-x-1 sm:space-x-3 min-w-0">
              {/* Mobile controls */}
              <div className="flex items-center lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-1.5 sm:p-2 -ml-1 text-[#1C1917] hover:text-[#B88B4A] transition-colors rounded-full focus:outline-none cursor-pointer"
                  aria-label="Open navigation menu"
                >
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <button
                  type="button"
                  onClick={openSearch}
                  className="p-1.5 sm:p-2 text-[#1C1917] hover:text-[#B88B4A] transition-colors rounded-full focus:outline-none cursor-pointer"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Desktop Left Navigation Links */}
              <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-[13px] font-medium tracking-wider uppercase text-[#1C1917]/85 whitespace-nowrap">
                <div
                  className="relative group"
                  onMouseEnter={() => setShopDropdownOpen(true)}
                  onMouseLeave={() => setShopDropdownOpen(false)}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToShop();
                    }}
                    className="flex items-center gap-1 hover:text-[#B88B4A] transition-colors py-1.5 cursor-pointer uppercase font-medium"
                  >
                    <span>Shop All</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-[#877E73] transition-transform duration-200 ${shopDropdownOpen ? 'rotate-180 text-[#B88B4A]' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {shopDropdownOpen && (
                    <div className="absolute top-full left-0 w-60 bg-[#FAF8F5] border border-[#E8E2D7] shadow-xl rounded-b-lg py-2.5 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setShopDropdownOpen(false);
                          navigateToShop();
                        }}
                        className="w-full text-left block px-3 py-2 text-xs uppercase tracking-wider text-[#1C1917] hover:bg-[#F2EBE0] rounded font-semibold cursor-pointer"
                      >
                        All Collections
                      </button>
                      <div className="my-1.5 border-t border-[#E8E2D7]/60" />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setShopDropdownOpen(false);
                          navigateToShop('baby-essentials');
                        }}
                        className="w-full text-left block px-3 py-1.5 text-xs text-[#575149] hover:text-[#1C1917] hover:bg-[#F2EBE0] rounded cursor-pointer"
                      >
                        Baby Essentials
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setShopDropdownOpen(false);
                          navigateToShop('baby-accessories');
                        }}
                        className="w-full text-left block px-3 py-1.5 text-xs text-[#575149] hover:text-[#1C1917] hover:bg-[#F2EBE0] rounded cursor-pointer"
                      >
                        Baby Accessories
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setShopDropdownOpen(false);
                          navigateToShop('nursery-feeding');
                        }}
                        className="w-full text-left block px-3 py-1.5 text-xs text-[#575149] hover:text-[#1C1917] hover:bg-[#F2EBE0] rounded cursor-pointer"
                      >
                        Nursery & Feeding
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setShopDropdownOpen(false);
                          navigateToShop('toys-play');
                        }}
                        className="w-full text-left block px-3 py-1.5 text-xs text-[#575149] hover:text-[#1C1917] hover:bg-[#F2EBE0] rounded cursor-pointer"
                      >
                        Heirloom Toys
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setShopDropdownOpen(false);
                          navigateToShop('kids-clothing');
                        }}
                        className="w-full text-left block px-3 py-1.5 text-xs text-[#575149] hover:text-[#1C1917] hover:bg-[#F2EBE0] rounded cursor-pointer"
                      >
                        Kids' Clothing
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setShopDropdownOpen(false);
                          navigateToShop('school-essentials');
                        }}
                        className="w-full text-left block px-3 py-1.5 text-xs text-[#575149] hover:text-[#1C1917] hover:bg-[#F2EBE0] rounded cursor-pointer"
                      >
                        School Essentials
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToShop(undefined, 'newest');
                  }}
                  className="hover:text-[#B88B4A] transition-colors py-1.5 text-[#B88B4A] flex items-center gap-1 font-semibold cursor-pointer uppercase"
                >
                  New In
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToAbout();
                  }}
                  className="hover:text-[#B88B4A] transition-colors py-1.5 cursor-pointer uppercase"
                >
                  Our Story
                </button>
              </div>
            </div>

            {/* Center Column: Perfectly centered Brand Logo */}
            <div className="flex flex-col items-center justify-center text-center px-1 sm:px-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigateToHome();
                }}
                className="inline-block group focus:outline-none cursor-pointer"
              >
                <span className="block font-serif text-xl sm:text-2xl lg:text-[27px] tracking-[0.18em] sm:tracking-[0.24em] text-[#1C1917] uppercase font-medium group-hover:text-[#B88B4A] transition-colors whitespace-nowrap">
                  {storeName}
                </span>
                <span className="block text-[8px] sm:text-[9px] uppercase tracking-[0.32em] sm:tracking-[0.38em] text-[#877E73] font-sans font-light -mt-0.5 sm:-mt-1 whitespace-nowrap">
                  {tagline}
                </span>
              </button>
            </div>

            {/* Right Column: Desktop Search & Account / Wishlist & Bag */}
            <div className="flex items-center justify-end space-x-1 sm:space-x-3 lg:space-x-4">
              {/* Desktop Quick Search Trigger */}
              <button
                type="button"
                onClick={openSearch}
                className="hidden lg:flex items-center gap-2 text-xs text-[#877E73] hover:text-[#1C1917] bg-[#F2EBE0]/60 hover:bg-[#F2EBE0] border border-[#E8E2D7] px-3 py-1.5 rounded-full transition-all focus:outline-none cursor-pointer"
                aria-label="Open search palette"
                title="Search (Cmd + K)"
              >
                <Search className="w-3.5 h-3.5 text-[#1C1917]/70" />
                <span className="font-light tracking-wide">Search...</span>
                <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#E8E2D7] text-[#877E73]">⌘K</kbd>
              </button>

              {/* Account Icon (Desktop & Tablet) */}
              <button
                type="button"
                onClick={openAccount}
                className="hidden sm:flex items-center justify-center text-[#1C1917]/80 hover:text-[#B88B4A] transition-colors p-2 rounded-full focus:outline-none cursor-pointer"
                aria-label="Customer account"
                title="Account"
              >
                <User className="w-5 h-5 stroke-[1.75]" />
              </button>

              {/* Wishlist Icon with Counter Badge */}
              <button
                type="button"
                onClick={openWishlist}
                className="relative text-[#1C1917]/80 hover:text-[#B88B4A] transition-colors p-1.5 sm:p-2 rounded-full focus:outline-none cursor-pointer"
                aria-label="View wishlist"
                title="Saved Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.75]" />
                {wishlistItemCount > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-semibold text-white bg-[#B66C52] rounded-full border border-[#FAF8F5] animate-in zoom-in duration-200">
                    {wishlistItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Shopping Bag Icon with minimal badge */}
              <button
                type="button"
                onClick={openCart}
                className="relative lg:hidden p-1.5 sm:p-2 text-[#1C1917] hover:text-[#B88B4A] transition-colors focus:outline-none cursor-pointer"
                aria-label="View shopping bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-semibold text-white bg-[#1C1917] rounded-full border border-[#FAF8F5]">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Desktop Shopping Bag Pill Button */}
              <button
                type="button"
                onClick={openCart}
                className="hidden lg:flex items-center gap-2 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#38332F] transition-all px-4 py-2 rounded-full focus:outline-none shadow-xs whitespace-nowrap cursor-pointer"
                aria-label="View shopping bag"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2]" />
                <span className="text-xs font-semibold tracking-wider font-sans">
                  Bag ({cartItemCount})
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Desktop Category Strip */}
        <div className="hidden lg:block border-t border-[#E8E2D7]/70 bg-[#FAF8F5]/80 mt-3 pt-2.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-5 xl:space-x-8 text-xs uppercase tracking-[0.14em] font-medium text-[#575149]">
              <button
                onClick={() => navigateToShop('baby-essentials')}
                className="hover:text-[#1C1917] transition-colors whitespace-nowrap pb-1 hover:border-b-2 hover:border-[#B88B4A] cursor-pointer"
              >
                <span className="xl:hidden">Baby</span>
                <span className="hidden xl:inline">Baby Essentials</span>
              </button>
              <button
                onClick={() => navigateToShop('baby-accessories')}
                className="hover:text-[#1C1917] transition-colors whitespace-nowrap pb-1 hover:border-b-2 hover:border-[#B88B4A] cursor-pointer"
              >
                Accessories
              </button>
              <button
                onClick={() => navigateToShop('kids-clothing')}
                className="hover:text-[#1C1917] transition-colors whitespace-nowrap pb-1 hover:border-b-2 hover:border-[#B88B4A] cursor-pointer"
              >
                <span className="xl:hidden">Clothing</span>
                <span className="hidden xl:inline">Organic Clothing</span>
              </button>
              <button
                onClick={() => navigateToShop('nursery-feeding')}
                className="hover:text-[#1C1917] transition-colors whitespace-nowrap pb-1 hover:border-b-2 hover:border-[#B88B4A] cursor-pointer"
              >
                <span className="xl:hidden">Nursery</span>
                <span className="hidden xl:inline">Nursery & Feeding</span>
              </button>
              <button
                onClick={() => navigateToShop('toys-play')}
                className="hover:text-[#1C1917] transition-colors whitespace-nowrap pb-1 hover:border-b-2 hover:border-[#B88B4A] cursor-pointer"
              >
                <span className="xl:hidden">Toys</span>
                <span className="hidden xl:inline">Heirloom Toys</span>
              </button>
              <button
                onClick={() => navigateToShop('school-essentials')}
                className="hover:text-[#1C1917] transition-colors whitespace-nowrap pb-1 hover:border-b-2 hover:border-[#B88B4A] cursor-pointer"
              >
                <span className="xl:hidden">School</span>
                <span className="hidden xl:inline">School Essentials</span>
              </button>
              <span className="text-[#D8D0C2]">|</span>
              <button
                onClick={() => navigateToShop()}
                className="text-[#B88B4A] hover:text-[#976C32] font-semibold transition-colors whitespace-nowrap pb-1 cursor-pointer"
              >
                Curated Edits
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 4. Mobile Slide-Out Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#1C1917]/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-xs bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between p-6 z-10 animate-in slide-in-from-left duration-300 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#E8E2D7]">
                <div>
                  <span className="font-serif text-xl tracking-[0.18em] uppercase font-medium text-[#1C1917]">
                    {storeName}
                  </span>
                  <span className="block text-[8px] uppercase tracking-[0.3em] text-[#877E73]">
                    {tagline}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#1C1917] hover:text-[#B88B4A] rounded-full focus:outline-none cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="py-5 space-y-3.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateToShop();
                  }}
                  className="w-full flex items-center justify-between text-base font-serif tracking-wide text-[#1C1917] hover:text-[#B88B4A] transition-colors py-1 cursor-pointer"
                >
                  <span>Shop All Collections</span>
                  <ArrowRight className="w-4 h-4 text-[#877E73]" />
                </button>
                <div className="pt-1 pb-1 space-y-2.5 border-b border-[#E8E2D7]/60">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateToShop('baby-essentials');
                    }}
                    className="block text-left text-sm font-sans text-[#575149] hover:text-[#1C1917] py-0.5 cursor-pointer"
                  >
                    Baby Essentials
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateToShop('baby-accessories');
                    }}
                    className="block text-left text-sm font-sans text-[#575149] hover:text-[#1C1917] py-0.5 cursor-pointer"
                  >
                    Baby Accessories
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateToShop('nursery-feeding');
                    }}
                    className="block text-left text-sm font-sans text-[#575149] hover:text-[#1C1917] py-0.5 cursor-pointer"
                  >
                    Nursery & Feeding
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateToShop('toys-play');
                    }}
                    className="block text-left text-sm font-sans text-[#575149] hover:text-[#1C1917] py-0.5 cursor-pointer"
                  >
                    Heirloom Toys & Play
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateToShop('kids-clothing');
                    }}
                    className="block text-left text-sm font-sans text-[#575149] hover:text-[#1C1917] py-0.5 cursor-pointer"
                  >
                    Organic Kids' Clothing
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateToShop('school-essentials');
                    }}
                    className="block text-left text-sm font-sans text-[#575149] hover:text-[#1C1917] py-0.5 cursor-pointer"
                  >
                    School Essentials
                  </button>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateToShop(undefined, 'newest');
                  }}
                  className="block text-left text-sm font-medium text-[#B88B4A] py-1 cursor-pointer"
                >
                  New Arrivals ✨
                </button>
                <div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateToAbout();
                    }}
                    className="block text-left text-sm font-medium text-[#1C1917] hover:text-[#B88B4A] py-1 cursor-pointer"
                  >
                    Our Story & Ethics
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-5 border-t border-[#E8E2D7] space-y-3 text-xs text-[#877E73]">
              <p>Thoughtfully selected for every little adventure.</p>
              <div className="flex gap-4 text-[#1C1917] font-medium">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openWishlist();
                  }}
                  className="hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5" /> Wishlist ({wishlistItemCount})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAccount();
                  }}
                  className="hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" /> Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
