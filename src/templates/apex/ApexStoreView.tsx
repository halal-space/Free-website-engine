'use client';

import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedCategories } from './components/FeaturedCategories';
import { EditorialShowcase } from './components/EditorialShowcase';
import { NewArrivalsCarousel } from './components/NewArrivalsCarousel';
import { BestSellersSection } from './components/BestSellersSection';
import { BrandStorySection } from './components/BrandStorySection';
import { InnovationFeatures } from './components/InnovationFeatures';
import { PromoBanner } from './components/PromoBanner';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/ToastContainer';

// Multi-Page Views
import { ShopCatalogView } from './components/ShopCatalogView';
import { ProductDetailView } from './components/ProductDetailView';
import { CartPageView } from './components/CartPageView';
import { CheckoutView } from './components/CheckoutView';
import { WishlistPageView } from './components/WishlistPageView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { DealsView } from './components/DealsView';

import { useThemeStore } from './stores/themeStore';
import { useUIStore } from './stores/uiStore';
import { getNewArrivals } from './products';
import { ArrowLeft, Sparkles, ShoppingBag, Heart, Shield, Layers, HelpCircle, Tag } from 'lucide-react';

export interface ApexStoreViewProps {
  storeName?: string;
  tagline?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  ctaText?: string;
  accentColor?: string;
  backgroundColor?: string;
  surfaceColor?: string;
  textColor?: string;
  textMutedColor?: string;
  borderColor?: string;
  announcementText?: string;
  heroImages?: string[];
  storyHeadline?: string;
  storyDescription?: string;
  storyQuote?: string;
  featuredProducts?: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    category?: string;
    badge?: string;
  }>;
  newsletterHeading?: string;
  newsletterSubtitle?: string;
  contactEmail?: string;
  locationDetails?: string;
  copyrightNotice?: string;
  isInsidePreview?: boolean;
}

export const ApexStoreView: React.FC<ApexStoreViewProps> = ({
  storeName = 'AETHER',
  tagline = 'LABORATORIES',
  heroTitle = 'Technology,\nRefined.',
  heroSubtitle = 'Precision-engineered gadgets designed for people who expect more from technology. Bespoke acoustics, monolithic titanium, and neural silicon.',
  ctaText = 'Explore Collection',
  accentColor = '#3b82f6',
  backgroundColor,
  surfaceColor,
  textColor,
  textMutedColor,
  borderColor,
  announcementText,
  heroImages,
  storyHeadline,
  storyDescription,
  storyQuote,
  featuredProducts,
  newsletterHeading,
  newsletterSubtitle,
  contactEmail,
  locationDetails,
  copyrightNotice,
  isInsidePreview = false,
}) => {
  const baseArrivals = getNewArrivals();
  const newArrivals = React.useMemo(() => {
    if (!featuredProducts || featuredProducts.length === 0) return baseArrivals;
    return baseArrivals.map((p) => {
      const match = featuredProducts.find((fp) => fp.id === p.id);
      if (match) {
        return {
          ...p,
          name: match.name || p.name,
          price: match.price || p.price,
          images: match.image ? [match.image, ...(p.images.slice(1))] : p.images,
          category: (match.category as any) || p.category,
        };
      }
      return p;
    });
  }, [featuredProducts, baseArrivals]);

  const theme = useThemeStore((s) => s.theme);
  const {
    activePageView,
    navigateToHome,
    navigateToShop,
    navigateToDeals,
    navigateToAbout,
    navigateToContact,
    navigateToCart,
    navigateToWishlist,
  } = useUIStore();

  return (
    <div
      className={`apex-theme ${theme === 'light' ? 'light' : 'dark'} min-h-screen flex flex-col antialiased selection:bg-blue-600 selection:text-white`}
      style={{
        backgroundColor: backgroundColor || 'var(--bg-primary)',
        color: textColor || 'var(--text-primary)',
        '--accent-primary': accentColor,
        '--accent-glow': `${accentColor}33`,
        '--border-focus': accentColor,
        ...(backgroundColor ? { '--bg-primary': backgroundColor } : {}),
        ...(surfaceColor ? { '--bg-card': surfaceColor, '--bg-secondary': surfaceColor } : {}),
        ...(textColor ? { '--text-primary': textColor } : {}),
        ...(textMutedColor ? { '--text-secondary': textMutedColor, '--text-muted': textMutedColor } : {}),
        ...(borderColor ? { '--border-subtle': borderColor } : {}),
      } as React.CSSProperties}
    >
      {/* 1. Glass Navigation Bar */}
      <Navbar
        storeName={storeName}
        tagline={tagline}
        accentColor={accentColor}
        announcementText={announcementText}
      />

      {/* Sub-Page Return Bar (Shown when exploring sub-pages) */}
      {activePageView !== 'home' && (
        <div className="bg-[var(--bg-secondary)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] py-2.5 px-4 sticky top-16 z-30 transition-all">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={navigateToHome}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-blue-500 font-medium transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Storefront</span>
              </button>
              <span className="text-[var(--text-muted)] font-mono text-[10px] hidden sm:inline">
                CURRENT VIEW: <strong className="uppercase text-blue-500">{activePageView}</strong>
              </span>
            </div>

            {/* Quick Navigation Shortcuts */}
            <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-mono">
              <button
                onClick={() => navigateToShop()}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  activePageView === 'shop'
                    ? 'bg-blue-500/10 text-blue-500 font-bold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Catalog
              </button>
              <button
                onClick={navigateToDeals}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  activePageView === 'deals'
                    ? 'bg-blue-500/10 text-blue-500 font-bold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Deals
              </button>
              <button
                onClick={navigateToAbout}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  activePageView === 'about'
                    ? 'bg-blue-500/10 text-blue-500 font-bold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                About
              </button>
              <button
                onClick={navigateToContact}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  activePageView === 'contact'
                    ? 'bg-blue-500/10 text-blue-500 font-bold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Concierge
              </button>
              <button
                onClick={navigateToCart}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  activePageView === 'cart'
                    ? 'bg-blue-500/10 text-blue-500 font-bold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Bag
              </button>
              <button
                onClick={navigateToWishlist}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  activePageView === 'wishlist'
                    ? 'bg-blue-500/10 text-blue-500 font-bold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Wishlist
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 w-full">
        {/* Conditional Multi-Page View Routing */}
        {activePageView === 'shop' && (
          <ShopCatalogView accentColor={accentColor} />
        )}

        {activePageView === 'product' && (
          <ProductDetailView accentColor={accentColor} />
        )}

        {activePageView === 'cart' && (
          <CartPageView accentColor={accentColor} />
        )}

        {activePageView === 'checkout' && (
          <CheckoutView accentColor={accentColor} />
        )}

        {activePageView === 'wishlist' && (
          <WishlistPageView accentColor={accentColor} />
        )}

        {activePageView === 'about' && (
          <AboutView storeName={storeName} accentColor={accentColor} />
        )}

        {activePageView === 'contact' && (
          <ContactView storeName={storeName} accentColor={accentColor} />
        )}

        {activePageView === 'deals' && (
          <DealsView accentColor={accentColor} />
        )}

        {activePageView === 'home' && (
          <>
            {/* 2. Cinematic Hero Section */}
            <HeroSection
              heroTitle={heroTitle}
              heroSubtitle={heroSubtitle}
              ctaText={ctaText}
              accentColor={accentColor}
              heroImages={heroImages}
            />

            {/* 3. Featured Architectural Categories */}
            <FeaturedCategories accentColor={accentColor} />

            {/* 4. Flagship Editorial Showcase (Aura Pro) */}
            <EditorialShowcase accentColor={accentColor} />

            {/* 5. Horizontally Scrollable New Arrivals */}
            <NewArrivalsCarousel
              products={newArrivals}
              accentColor={accentColor}
            />

            {/* 6. Best Sellers Section */}
            <BestSellersSection accentColor={accentColor} />

            {/* 7. Heritage & Brand Story */}
            <BrandStorySection
              accentColor={accentColor}
              storyHeadline={storyHeadline}
              storyDescription={storyDescription}
              storyQuote={storyQuote}
            />

            {/* 8. Innovation Pillars */}
            <InnovationFeatures accentColor={accentColor} />

            {/* 9. Limited Allocation Promo Banner */}
            <PromoBanner accentColor={accentColor} />
          </>
        )}
      </main>

      {/* 10. Luxury Footer */}
      <Footer
        storeName={storeName}
        accentColor={accentColor}
        newsletterHeading={newsletterHeading}
        newsletterSubtitle={newsletterSubtitle}
        contactEmail={contactEmail}
        copyrightNotice={copyrightNotice}
      />

      {/* Interactive Global Portals */}
      <CartDrawer />
      <WishlistDrawer />
      <ProductQuickViewModal />
      <SearchModal />
      <ToastContainer />
    </div>
  );
};
