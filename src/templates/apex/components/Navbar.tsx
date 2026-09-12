'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useSearchStore } from '../stores/searchStore';
import { useThemeStore } from '../stores/themeStore';
import { useUIStore } from '../stores/uiStore';
import { categories } from '../categories';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight, ChevronDown, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  storeName?: string;
  tagline?: string;
  accentColor?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  storeName = 'AETHER',
  tagline = 'LABORATORIES',
  accentColor = '#3b82f6',
}) => {
  const { openCart, getItemCount } = useCartStore();
  const { getWishlistCount, openWishlist } = useWishlistStore();
  const { openSearch } = useSearchStore();
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const {
    navigateToHome,
    navigateToShop,
    navigateToDeals,
    navigateToAbout,
    navigateToContact,
  } = useUIStore();

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = mounted ? getItemCount() : 0;
  const wishlistCount = mounted ? getWishlistCount() : 0;
  const isDark = mounted ? theme === 'dark' : true;

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 luxury-glass border-b border-[var(--border-subtle)] bg-[var(--bg-glass)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <button
            onClick={navigateToHome}
            className="group flex items-center gap-2.5 focus:outline-none cursor-pointer"
            aria-label={`${storeName} Homepage`}
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--text-primary)] text-[var(--text-inverse)] flex items-center justify-center font-mono font-black text-sm tracking-tighter shadow-md transition-transform duration-300 group-hover:scale-105">
              <span>Æ</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold tracking-[0.25em] text-sm uppercase text-[var(--text-primary)] leading-tight">
                {storeName}
              </span>
              <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-[var(--text-muted)] leading-none">
                {tagline}
              </span>
            </div>
          </button>

          {/* Desktop Main Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => navigateToShop()}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
            >
              Shop
            </button>

            {/* Collections Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <button
                onClick={() => setCollectionsOpen(!collectionsOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
              >
                <span>Collections</span>
                <ChevronDown className={`w-3 h-3 text-[var(--text-muted)] transition-transform duration-200 ${collectionsOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {collectionsOpen && (
                <div className="absolute left-0 top-full pt-2 z-50 animate-fade-in">
                  <div className="w-72 p-3 rounded-2xl luxury-glass border border-[var(--border-medium)] shadow-2xl bg-[var(--bg-elevated)] space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setCollectionsOpen(false);
                          navigateToShop(cat.slug);
                        }}
                        className="w-full text-left flex items-center justify-between p-2 rounded-xl hover:bg-[var(--bg-card-hover)] transition-colors group/item cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-semibold text-[var(--text-primary)] group-hover/item:text-blue-400 transition-colors">
                            {cat.name}
                          </div>
                          <div className="text-[10px] text-[var(--text-secondary)] line-clamp-1">
                            {cat.tagline}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded">
                          {cat.productCount}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateToShop(undefined, 'new')}
              className="relative px-3 py-1.5 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>New Arrivals</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            </button>

            <button
              onClick={() => navigateToShop(undefined, 'bestseller')}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
            >
              Best Sellers
            </button>

            <button
              onClick={() => navigateToDeals()}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
            >
              Deals
            </button>

            <button
              onClick={() => navigateToAbout()}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
            >
              About
            </button>

            <button
              onClick={() => navigateToContact()}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
            >
              Concierge
            </button>
          </nav>
        </div>

        {/* Interactive Actions & Island */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search Button */}
          <button
            onClick={openSearch}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] hover:border-[var(--border-medium)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all text-xs cursor-pointer"
            aria-label="Search collection"
          >
            <Search className="w-4 h-4 text-blue-500" />
            <span className="hidden md:inline font-medium">Search</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] font-mono text-[var(--text-muted)] bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded shadow-sm">
              ⌘K
            </kbd>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={openWishlist}
            className="relative p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
            aria-label="View saved wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-scale-in">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="relative p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-5 h-5 text-[var(--text-primary)]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-lg shadow-blue-500/30 animate-scale-in">
                {cartCount}
              </span>
            )}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
            aria-label="Toggle theme"
            title={isDark ? 'Switch to Ivory Light Mode' : 'Switch to Obsidian Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300" />}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] md:hidden hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-40 bg-[var(--bg-primary)]/95 backdrop-blur-xl border-t border-[var(--border-subtle)] p-6 overflow-y-auto md:hidden animate-fade-in flex flex-col justify-between">
          <div className="space-y-6">
            <div className="space-y-1 font-mono uppercase text-xs tracking-widest text-[var(--text-muted)]">
              Navigation
            </div>
            <nav className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateToShop();
                }}
                className="text-lg font-semibold text-[var(--text-primary)] hover:text-blue-500 transition-colors flex items-center justify-between py-2 border-b border-[var(--border-subtle)] cursor-pointer text-left"
              >
                <span>Full Catalog</span>
                <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateToShop(undefined, 'new');
                }}
                className="text-lg font-semibold text-[var(--text-primary)] hover:text-blue-500 transition-colors flex items-center justify-between py-2 border-b border-[var(--border-subtle)] cursor-pointer text-left"
              >
                <span>New Arrivals</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-mono">NEW</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateToShop(undefined, 'bestseller');
                }}
                className="text-lg font-semibold text-[var(--text-primary)] hover:text-blue-500 transition-colors flex items-center justify-between py-2 border-b border-[var(--border-subtle)] cursor-pointer text-left"
              >
                <span>Best Sellers</span>
                <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateToDeals();
                }}
                className="text-lg font-semibold text-[var(--text-primary)] hover:text-blue-500 transition-colors flex items-center justify-between py-2 border-b border-[var(--border-subtle)] cursor-pointer text-left"
              >
                <span>Deals & Archive</span>
                <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateToAbout();
                }}
                className="text-lg font-semibold text-[var(--text-primary)] hover:text-blue-500 transition-colors flex items-center justify-between py-2 border-b border-[var(--border-subtle)] cursor-pointer text-left"
              >
                <span>Brand Story</span>
                <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateToContact();
                }}
                className="text-lg font-semibold text-[var(--text-primary)] hover:text-blue-500 transition-colors flex items-center justify-between py-2 border-b border-[var(--border-subtle)] cursor-pointer text-left"
              >
                <span>Client Concierge</span>
                <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            </nav>

            <div className="pt-4">
              <div className="font-mono uppercase text-xs tracking-widest text-[var(--text-muted)] mb-3">
                Collections
              </div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateToShop(cat.slug);
                    }}
                    className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs font-medium text-[var(--text-primary)] hover:border-blue-500 transition-colors cursor-pointer text-left"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[var(--border-subtle)]">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span>AETHER Systems International</span>
              <span className="font-mono text-[10px]">v2.6 Precision</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
