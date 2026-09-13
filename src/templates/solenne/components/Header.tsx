import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/products';
import { useCartStore, computeCartSummary } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useUIStore } from '../stores/uiStore';
import { PRODUCTS } from '../data/products';

interface HeaderProps {
  storeName?: string;
  tagline?: string;
}

export const Header: React.FC<HeaderProps> = ({
  storeName = 'SOLENNE',
  tagline = 'Skin · Rituals',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const cartItems = useCartStore((s) => s.items);
  const promoCode = useCartStore((s) => s.promoCode);
  const openCart = useCartStore((s) => s.openCart);

  const wishlistSlugs = useWishlistStore((s) => s.slugs);
  const openWishlist = useWishlistStore((s) => s.openWishlist);

  const {
    navigateToHome,
    navigateToShop,
    navigateToAbout,
    navigateToJournal,
    openSearch,
  } = useUIStore();

  const cartCount = computeCartSummary(cartItems, PRODUCTS, promoCode).count;
  const wishlistCount = wishlistSlugs.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        id="site-header"
        className={`sticky top-0 z-[50] transition-[transform,background-color,border-color,backdrop-filter] duration-500 ${
          isScrolled ? 'is-scrolled' : ''
        }`}
      >
        <div className="border-b border-line bg-bg/85 backdrop-blur-xl transition-colors duration-500 header-surface">
          <nav
            className="container-luxe relative flex h-[4.5rem] items-center justify-between"
            aria-label="Primary"
          >
            {/* Mobile: Hamburger menu button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="-ml-2 p-2 max-[379px]:p-1 text-ink md:hidden cursor-pointer"
              aria-label="Open menu"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>

            {/* Desktop: primary nav */}
            <div className="hidden items-center gap-8 md:flex">
              {/* Shop Dropdown */}
              <div
                className="group relative"
                onMouseEnter={() => setIsShopDropdownOpen(true)}
                onMouseLeave={() => setIsShopDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => navigateToShop()}
                  className="eyebrow link-underline flex items-center gap-1.5 py-2 text-ink/80 transition-colors hover:text-ink cursor-pointer"
                  aria-expanded={isShopDropdownOpen}
                  aria-haspopup="true"
                >
                  Shop
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-transform duration-300 ${
                      isShopDropdownOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                <div
                  className={`absolute left-1/2 top-full z-10 w-[34rem] -translate-x-1/2 pt-4 transition-all duration-400 ease-lux ${
                    isShopDropdownOpen
                      ? 'visible translate-y-0 opacity-100'
                      : 'invisible translate-y-3 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-x-10 border border-line bg-surface p-8 shadow-lifted">
                    <div>
                      <p className="eyebrow mb-5 text-stone">By Category</p>
                      <ul className="space-y-3">
                        {CATEGORIES.map((c) => (
                          <li key={c.id}>
                            <button
                              type="button"
                              onClick={() => {
                                navigateToShop(c.id);
                                setIsShopDropdownOpen(false);
                              }}
                              className="font-serif text-lg text-espresso transition-colors hover:text-gold cursor-pointer text-left"
                            >
                              {c.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="eyebrow mb-5 text-stone">Featured</p>
                      <ul className="space-y-3">
                        <li>
                          <button
                            type="button"
                            onClick={() => {
                              navigateToShop(null, 'rating');
                              setIsShopDropdownOpen(false);
                            }}
                            className="font-serif text-lg text-espresso transition-colors hover:text-gold cursor-pointer"
                          >
                            Best Sellers
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => {
                              useUIStore.getState().navigateToProduct('nocturne-retinol-elixir');
                              setIsShopDropdownOpen(false);
                            }}
                            className="font-serif text-lg text-espresso transition-colors hover:text-gold cursor-pointer"
                          >
                            The Nocturne Edit
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => {
                              navigateToShop('serums');
                              setIsShopDropdownOpen(false);
                            }}
                            className="font-serif text-lg text-espresso transition-colors hover:text-gold cursor-pointer"
                          >
                            New Arrivals
                          </button>
                        </li>
                      </ul>
                      <button
                        type="button"
                        onClick={() => {
                          navigateToShop();
                          setIsShopDropdownOpen(false);
                        }}
                        className="eyebrow mt-7 inline-flex items-center gap-2 text-gold transition-colors hover:text-ink cursor-pointer"
                      >
                        View all products
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                        >
                          <path d="M5 12h14m-6-6 6 6-6 6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Best Sellers */}
              <button
                type="button"
                onClick={() => navigateToShop(null, 'rating')}
                className="eyebrow link-underline py-2 text-ink/80 transition-colors hover:text-ink cursor-pointer"
              >
                Best Sellers
              </button>

              {/* Collections */}
              <button
                type="button"
                onClick={() => {
                  navigateToShop();
                }}
                className="eyebrow link-underline py-2 text-ink/80 transition-colors hover:text-ink cursor-pointer"
              >
                Collections
              </button>

              {/* About */}
              <button
                type="button"
                onClick={() => navigateToAbout()}
                className="eyebrow link-underline py-2 text-ink/80 transition-colors hover:text-ink cursor-pointer"
              >
                About
              </button>

              {/* Journal */}
              <button
                type="button"
                onClick={() => navigateToJournal()}
                className="eyebrow link-underline py-2 text-ink/80 transition-colors hover:text-ink cursor-pointer"
              >
                Journal
              </button>
            </div>

            {/* Centered Logo */}
            <button
              type="button"
              onClick={() => navigateToHome()}
              className="absolute left-1/2 -translate-x-1/2 text-center cursor-pointer"
              aria-label={`${storeName} — home`}
            >
              <span className="block pl-[0.18em] font-serif text-[0.92rem] font-medium leading-none tracking-[0.16em] min-[380px]:text-[1.02rem] min-[380px]:tracking-[0.18em] min-[380px]:pl-[0.18em] min-[420px]:text-[1.3rem] min-[420px]:tracking-[0.26em] min-[420px]:pl-[0.26em] sm:text-[1.65rem] sm:tracking-[0.32em] sm:pl-[0.32em]">
                {storeName}
              </span>
              {tagline && (
                <span className="mt-1 hidden text-[0.55rem] uppercase tracking-[0.42em] pl-[0.42em] text-stone sm:block">
                  {tagline}
                </span>
              )}
            </button>

            {/* Actions */}
            <div className="flex items-center gap-0.5 md:gap-2">
              <button
                type="button"
                onClick={openSearch}
                className="p-2 max-[379px]:p-1.5 min-[420px]:p-2.5 text-ink/80 transition-colors hover:text-ink cursor-pointer"
                aria-label="Search"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.8-3.8" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => {
                  useUIStore.getState().showToast('Account concierge simulated in preview mode.');
                }}
                className="hidden p-2.5 text-ink/80 transition-colors hover:text-ink md:block cursor-pointer"
                aria-label="Account"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c1.4-3.6 4.4-5.5 8-5.5s6.6 1.9 8 5.5" />
                </svg>
              </button>

              <button
                type="button"
                onClick={openWishlist}
                className="relative p-2 max-[379px]:p-1.5 min-[420px]:p-2.5 text-ink/80 transition-colors hover:text-ink cursor-pointer"
                aria-label="Wishlist"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                >
                  <path d="M12 21C7 16.5 3 13.2 3 9.1 3 6.3 5.2 4 8 4c1.6 0 3.1.8 4 2 0.9-1.2 2.4-2 4-2 2.8 0 5 2.3 5 5.1 0 4.1-4 7.4-9 11.9z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="pointer-events-none absolute -right-0.5 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.58rem] font-semibold tracking-wide text-white">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={openCart}
                className="relative p-2 max-[379px]:p-1.5 min-[420px]:p-2.5 text-ink/80 transition-colors hover:text-ink cursor-pointer"
                aria-label="Shopping bag"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                >
                  <path d="M5 8h14l-1 13H6L5 8Z" />
                  <path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" />
                </svg>
                {cartCount > 0 && (
                  <span className="pointer-events-none absolute -right-0.5 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-ink px-1 text-[0.58rem] font-semibold tracking-wide text-ivory">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="backdrop fixed inset-0 z-[64] bg-ink/45 is-open"
        />
      )}
      <aside
        id="mobile-menu"
        className={`overlay-panel fixed inset-y-0 right-0 z-[65] flex w-full max-w-md flex-col bg-bg shadow-lifted ${
          isMobileMenuOpen ? 'is-open' : ''
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between hairline-b px-6 py-5">
          <span className="font-serif text-xl tracking-[0.28em] pl-[0.28em]">MENU</span>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 -mr-2 text-stone hover:text-ink cursor-pointer"
            aria-label="Close menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 pb-10 pt-6" aria-label="Mobile">
          <ul className="space-y-1">
            <li>
              <button
                type="button"
                onClick={() => {
                  navigateToShop();
                  setIsMobileMenuOpen(false);
                }}
                className="flex w-full items-baseline justify-between py-2.5 font-serif text-3xl text-ink transition-colors hover:text-gold cursor-pointer text-left"
              >
                Shop All
              </button>
            </li>
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => {
                    navigateToShop(c.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-baseline justify-between py-2.5 pl-4 font-sans text-sm text-smoke transition-colors hover:text-gold cursor-pointer text-left"
                >
                  {c.label}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  navigateToShop(null, 'rating');
                  setIsMobileMenuOpen(false);
                }}
                className="flex w-full items-baseline justify-between py-2.5 font-serif text-3xl text-ink transition-colors hover:text-gold cursor-pointer text-left"
              >
                Best Sellers
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  navigateToAbout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex w-full items-baseline justify-between py-2.5 font-serif text-3xl text-ink transition-colors hover:text-gold cursor-pointer text-left"
              >
                About
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  navigateToJournal();
                  setIsMobileMenuOpen(false);
                }}
                className="flex w-full items-baseline justify-between py-2.5 font-serif text-3xl text-ink transition-colors hover:text-gold cursor-pointer text-left"
              >
                Journal
              </button>
            </li>
          </ul>
        </nav>

        <div className="hairline-t px-6 py-6">
          <p className="eyebrow mb-3 text-stone">Complimentary shipping over $100</p>
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => {
                useUIStore.getState().showToast('Account concierge simulated in preview mode.');
                setIsMobileMenuOpen(false);
              }}
              className="eyebrow text-ink/70 hover:text-ink cursor-pointer"
            >
              Account
            </button>
            <button
              type="button"
              onClick={() => {
                openWishlist();
                setIsMobileMenuOpen(false);
              }}
              className="eyebrow text-ink/70 hover:text-ink cursor-pointer"
            >
              Wishlist
            </button>
            <button
              type="button"
              onClick={() => {
                navigateToAbout();
                setIsMobileMenuOpen(false);
              }}
              className="eyebrow text-ink/70 hover:text-ink cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
