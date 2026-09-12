'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Menu, Search, ShoppingBag, User, X, Moon, Sun } from 'lucide-react';
import { aureliaCategories } from '../data';
import { cn } from '../lib/utils';

interface NavbarProps {
  storeName?: string;
  cartCount?: number;
  wishlistCount?: number;
  isInsidePreview?: boolean;
}

export function Navbar({
  storeName = 'AURELIA',
  cartCount = 0,
  wishlistCount = 0,
  isInsidePreview = false,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
  };

  return (
    <>
      <header
        className={cn(
          isInsidePreview ? 'sticky top-0 z-40' : 'fixed inset-x-0 top-0 z-[60]',
          'transition-all duration-300 w-full',
          scrolled || isInsidePreview
            ? 'border-b border-line bg-bg/90 backdrop-blur-xl shadow-xs'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="container-site flex h-16 items-center justify-between gap-4 sm:h-[72px]">
          {/* Mobile Menu & Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMenuOpen(true)}
              className="-ml-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <a href="#" className="group flex items-baseline gap-2" aria-label={`${storeName} home`}>
              <span className="font-display text-xl font-bold tracking-[0.08em] text-ink uppercase">
                {storeName}
              </span>
              <span className="hidden h-1.5 w-1.5 rounded-full bg-accent sm:block" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            <a
              href="#featured"
              className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              Shop
            </a>

            {/* Categories dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoryOpen(true)}
              onMouseLeave={() => setCategoryOpen(false)}
            >
              <button
                className="flex cursor-pointer items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
                aria-expanded={categoryOpen}
              >
                Categories
              </button>

              {categoryOpen && (
                <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
                  <div className="w-[560px] rounded-panel border border-line bg-raised p-5 shadow-panel">
                    <div className="grid grid-cols-2 gap-1">
                      {aureliaCategories.map((c) => (
                        <a
                          key={c.slug}
                          href={`#category-${c.slug}`}
                          className="flex items-center justify-between rounded-btn px-3 py-2.5 text-sm text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
                        >
                          {c.name}
                          <span className="text-xs text-ink-muted">{c.count}</span>
                        </a>
                      ))}
                    </div>
                    <a
                      href="#featured"
                      className="mt-3 block rounded-btn border border-line px-3 py-2.5 text-center text-sm font-medium text-ink transition-colors hover:border-line-strong"
                    >
                      View all products
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#new-arrivals"
              className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              New Arrivals
            </a>
            <a
              href="#best-sellers"
              className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              Best Sellers
            </a>
            <a
              href="#showcase"
              className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              Deals
            </a>
            <a
              href="#story"
              className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              About
            </a>
          </nav>

          {/* Right Chrome Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden h-11 w-11 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink sm:flex"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              onClick={toggleTheme}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <a
              href="#"
              className="hidden h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink md:flex"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </a>

            <a
              href="#"
              className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-ink tabular">
                  {wishlistCount}
                </span>
              )}
            </a>

            <button
              className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-ink tabular">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Search Drawer */}
      {searchOpen && (
        <div className="fixed inset-x-0 top-16 sm:top-[72px] z-50 bg-raised/95 backdrop-blur-xl border-b border-line p-4 shadow-panel">
          <div className="container-site flex items-center gap-3">
            <Search className="h-5 w-5 text-ink-muted shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search flagship phones, audio, smartwatches, laptops..."
              className="w-full bg-transparent text-ink placeholder:text-ink-muted text-base py-2 focus:outline-none"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xs uppercase font-mono px-3 py-1 rounded-btn bg-surface-2 text-ink-soft hover:text-ink"
            >
              ESC
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[65] lg:hidden">
          <div
            className="absolute inset-0 bg-obsidian/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(88vw,380px)] flex-col bg-surface shadow-panel">
            <div className="flex h-16 items-center justify-between border-b border-line px-5">
              <span className="font-display text-xl font-bold tracking-[0.08em] text-ink">{storeName}</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink-soft hover:bg-surface-2 hover:text-ink"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Mobile">
              <div className="space-y-1">
                <a
                  href="#featured"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-btn px-3 py-2.5 text-base font-medium text-ink hover:bg-surface-2"
                >
                  Shop
                </a>
                <a
                  href="#new-arrivals"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-btn px-3 py-2.5 text-base font-medium text-ink hover:bg-surface-2"
                >
                  New Arrivals
                </a>
                <a
                  href="#best-sellers"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-btn px-3 py-2.5 text-base font-medium text-ink hover:bg-surface-2"
                >
                  Best Sellers
                </a>
                <a
                  href="#showcase"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-btn px-3 py-2.5 text-base font-medium text-ink hover:bg-surface-2"
                >
                  Deals
                </a>
                <a
                  href="#story"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-btn px-3 py-2.5 text-base font-medium text-ink hover:bg-surface-2"
                >
                  About
                </a>
              </div>

              <div className="mt-6">
                <p className="label-caps px-3 pb-2">Categories</p>
                <div className="space-y-1">
                  {aureliaCategories.map((c) => (
                    <a
                      key={c.slug}
                      href={`#category-${c.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between rounded-btn px-3 py-2 text-sm text-ink-soft hover:bg-surface-2 hover:text-ink"
                    >
                      {c.name}
                      <span className="text-xs text-ink-muted">{c.count}</span>
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
