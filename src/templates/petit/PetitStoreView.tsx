'use client';

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCategories } from './components/FeaturedCategories';
import { BestSellers } from './components/BestSellers';
import { BrandStory } from './components/BrandStory';
import { CuratedCollections } from './components/CuratedCollections';
import { WhyShopWithUs } from './components/WhyShopWithUs';
import { CustomerReviews } from './components/CustomerReviews';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

import { ShopFilter } from './components/ShopFilter';
import { ProductDetailView } from './components/ProductDetailView';
import { AboutPage } from './components/AboutPage';
import { NotFoundPage } from './components/NotFoundPage';

import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AccountModal } from './components/AccountModal';
import { ToastManager } from './components/ToastManager';

import { useUIStore } from './stores/uiStore';
import { useCartStore } from './stores/cartStore';
import { useWishlistStore } from './stores/wishlistStore';
import { products } from './data/products';
import { ArrowLeft, Sparkles } from 'lucide-react';

export interface PetitStoreViewProps {
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

export const PetitStoreView: React.FC<PetitStoreViewProps> = ({
  storeName = 'Maison Petit',
  tagline = 'L’Art de L’Enfance',
  heroTitle = 'Beautiful essentials for every little adventure.',
  heroSubtitle = "Discover thoughtfully selected baby and children's essentials designed to bring comfort, joy, and style to everyday moments.",
  ctaText = 'Shop the collection',
  accentColor = '#B88B4A',
  backgroundColor = '#FAF8F5',
  surfaceColor = '#FFFFFF',
  textColor = '#1C1917',
  textMutedColor = '#877E73',
  borderColor = '#E8E2D7',
  announcementText,
  heroImages,
  storyHeadline = 'Made for little moments that matter.',
  storyDescription = 'From their first essentials to their biggest little adventures, we make it easier to find beautiful, practical products for every stage of childhood.',
  storyQuote = '100% GOTS Organic Cotton • FSC Certified Woods • Plastic-Free Delivery',
  featuredProducts,
  newsletterHeading = 'Stay close to the little things.',
  newsletterSubtitle = 'Sign up for new arrivals, thoughtful finds, and occasional offers.',
  contactEmail = 'concierge@maisonpetit.com',
  locationDetails = '42 Rue de l’Université, 75007 Paris, France',
  copyrightNotice,
  isInsidePreview = false,
}) => {
  const {
    activePageView,
    selectedProductSlug,
    selectedCategorySlug,
    selectedSort,
    navigateToHome,
    navigateToShop,
    navigateToAbout,
  } = useUIStore();

  const openCart = useCartStore((s) => s.openCart);
  const openWishlist = useWishlistStore((s) => s.openWishlist);

  // Active product for detail view
  const currentProduct = React.useMemo(() => {
    if (selectedProductSlug) {
      const found = products.find((p) => p.slug === selectedProductSlug);
      if (found) return found;
    }
    return products[0];
  }, [selectedProductSlug]);

  const relatedProducts = React.useMemo(() => {
    return products
      .filter((p) => p.id !== currentProduct.id && (p.category === currentProduct.category || p.ageRange === currentProduct.ageRange))
      .slice(0, 4);
  }, [currentProduct]);

  return (
    <div
      className="petit-theme min-h-screen flex flex-col antialiased selection:bg-[#EAE3D5] selection:text-[#1C1917] font-sans"
      style={{
        backgroundColor: backgroundColor || 'var(--canvas)',
        color: textColor || 'var(--text-primary)',
        '--accent': accentColor,
        '--border-accent': accentColor,
        '--canvas': backgroundColor,
        '--surface': surfaceColor,
        '--text-primary': textColor,
        '--text-secondary': textMutedColor,
        '--text-tertiary': textMutedColor,
        '--border': borderColor,
      } as React.CSSProperties}
    >
      {/* 1. Header & Navigation */}
      <Navbar
        storeName={storeName}
        tagline={tagline}
        accentColor={accentColor}
        announcementText={announcementText}
      />

      {/* Sub-Page Return Bar (Shown when exploring sub-pages) */}
      {activePageView !== 'home' && (
        <div className="bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D7] py-2.5 px-4 sticky top-16 z-30 transition-all">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={navigateToHome}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E2D7] text-[#1C1917] hover:border-[#B88B4A] font-medium transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Storefront</span>
              </button>
              <span className="text-[#877E73] font-mono text-[10px] hidden sm:inline">
                CURRENT VIEW: <strong className="uppercase text-[#B88B4A]">{activePageView}</strong>
              </span>
            </div>

            {/* Quick Navigation Shortcuts */}
            <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-sans">
              <button
                onClick={() => navigateToShop()}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  activePageView === 'shop'
                    ? 'bg-[#EAE3D5] text-[#1C1917] font-bold'
                    : 'text-[#575149] hover:text-[#1C1917]'
                }`}
              >
                Catalog
              </button>
              <button
                onClick={navigateToAbout}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  activePageView === 'about'
                    ? 'bg-[#EAE3D5] text-[#1C1917] font-bold'
                    : 'text-[#575149] hover:text-[#1C1917]'
                }`}
              >
                Our Story
              </button>
              <button
                onClick={openCart}
                className="px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-[#575149] hover:text-[#1C1917]"
              >
                Shopping Bag
              </button>
              <button
                onClick={openWishlist}
                className="px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-[#575149] hover:text-[#1C1917]"
              >
                Wishlist
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activePageView === 'shop' && (
          <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Editorial Header Banner */}
              <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2ECE1] border border-[#E8E2D7] text-xs uppercase tracking-widest text-[#B88B4A] font-medium mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#B88B4A]" style={{ color: accentColor }} />
                  <span>Curated For Modern Families</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1C1917] tracking-tight">
                  The Boutique Collection
                </h1>
                <p className="text-xs sm:text-sm text-[#877E73] mt-3 font-sans leading-relaxed">
                  From tranquil nursery sanctuaries to school playground discoveries, explore carefully considered essentials made with pure organic fibers and heirloom craftsmanship.
                </p>
              </div>

              {/* Interactive Shop Filter & Grid */}
              <ShopFilter
                initialCategorySlug={selectedCategorySlug || undefined}
                initialSort={selectedSort || 'featured'}
              />
            </div>
          </div>
        )}

        {activePageView === 'product' && (
          <div className="bg-[#FAF8F5] min-h-screen py-6 sm:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProductDetailView
                product={currentProduct}
                relatedProducts={relatedProducts}
              />
            </div>
          </div>
        )}

        {activePageView === 'about' && (
          <AboutPage />
        )}

        {activePageView === '404' && (
          <NotFoundPage />
        )}

        {activePageView === 'home' && (
          <>
            {/* 2. Hero Section */}
            <Hero
              heroTitle={heroTitle}
              heroSubtitle={heroSubtitle}
              ctaText={ctaText}
              heroImages={heroImages}
              accentColor={accentColor}
            />

            {/* 3. Featured Categories */}
            <FeaturedCategories />

            {/* 4. Best Sellers / Featured Products */}
            <BestSellers featuredProductsOverride={featuredProducts} />

            {/* 5. Brand Story */}
            <BrandStory
              storyHeadline={storyHeadline}
              storyDescription={storyDescription}
              storyQuote={storyQuote}
              accentColor={accentColor}
            />

            {/* 6. Curated Collections */}
            <CuratedCollections />

            {/* 7. Why Shop With Us */}
            <WhyShopWithUs />

            {/* 8. Customer Reviews */}
            <CustomerReviews />

            {/* 9. Newsletter */}
            <Newsletter
              heading={newsletterHeading}
              subtitle={newsletterSubtitle}
            />
          </>
        )}
      </main>

      {/* 10. Footer */}
      <Footer
        storeName={storeName}
        accentColor={accentColor}
        contactEmail={contactEmail}
        locationDetails={locationDetails}
        copyrightNotice={copyrightNotice}
      />

      {/* Interactive Global Portals */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <SearchModal />
      <CheckoutModal />
      <AccountModal />
      <ToastManager />
    </div>
  );
};
