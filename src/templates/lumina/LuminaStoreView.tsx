'use client';

import React from 'react';
import { Header } from './components/Header';
import { HeroInteractive } from './components/HeroInteractive';
import { Manifesto } from './components/Manifesto';
import { CapsuleGrid } from './components/CapsuleGrid';
import { ProductCard } from './components/ProductCard';
import { MaterialityZoom } from './components/MaterialityZoom';
import { ShoppableLookbook } from './components/ShoppableLookbook';
import { PrivateAtelier } from './components/PrivateAtelier';
import { PressQuotes } from './components/PressQuotes';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { NavigationDrawer } from './components/NavigationDrawer';

// Multi-page subviews
import { ShopCatalogView } from './components/ShopCatalogView';
import { CollectionsView } from './components/CollectionsView';
import { LookbookView } from './components/LookbookView';
import { AboutView } from './components/AboutView';
import { AppointmentsView } from './components/AppointmentsView';
import { WishlistView } from './components/WishlistView';
import { ProductDetailView } from './components/ProductDetailView';
import { CheckoutView } from './components/CheckoutView';
import { AccountView } from './components/AccountView';

import { PRODUCTS } from './products';
import { useUIStore } from './stores/uiStore';
import { Sparkles, ArrowRight } from 'lucide-react';

export interface LuminaStoreViewProps {
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

export const LuminaStoreView: React.FC<LuminaStoreViewProps> = ({
  storeName = 'ATELIER VÉLÈNE',
  tagline = 'Paris · Milan · New York',
  heroTitle = 'Defined by Detail.',
  heroSubtitle = 'Masterfully sculpted from 750gsm double-faced Mongolian cashmere and precision-tailored with architectural peak lapels. A study in silent luxury and structural permanence.',
  ctaText = 'Inspect Garment',
  accentColor = '#C5A880',
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
  isInsidePreview = false
}) => {
  const { activePageView, setActivePageView } = useUIStore();

  const effectiveProducts = React.useMemo(() => {
    if (!featuredProducts || featuredProducts.length === 0) return PRODUCTS;
    return PRODUCTS.map((p) => {
      const match = featuredProducts.find((fp) => fp.id === p.id);
      if (match) {
        return {
          ...p,
          name: match.name || p.name,
          price: match.price || p.price,
          images: match.image
            ? [{ ...p.images[0], url: match.image }, ...p.images.slice(1)]
            : p.images,
          categoryLabel: match.category || p.categoryLabel,
          badge: match.badge || p.badge,
        };
      }
      return p;
    });
  }, [featuredProducts]);

  const newArrivals = effectiveProducts.filter((p) => p.isNew).slice(0, 6);
  const limitedPieces = effectiveProducts.filter((p) => p.isLimited).slice(0, 4);

  return (
    <div
      className="lumina-theme min-h-screen bg-[#FAF8F5] text-[#0C0C0D] selection:bg-[#0C0C0D] selection:text-[#FAF8F5] flex flex-col antialiased"
      style={{
        backgroundColor: backgroundColor || '#FAF8F5',
        color: textColor || '#0C0C0D',
        '--accent-gold': accentColor,
        '--bg-primary': backgroundColor || '#FAF8F5',
        '--bg-surface': surfaceColor || '#FFFFFF',
        '--text-primary': textColor || '#0C0C0D',
        '--text-muted': textMutedColor || '#71717A',
        '--border-subtle': borderColor || '#E8E3DA',
      } as React.CSSProperties}
    >
      {/* 1. Header with Announcement Bar and Navigation */}
      <Header
        storeName={storeName}
        tagline={tagline}
        accentColor={accentColor}
        announcementText={announcementText}
      />

      <main className="flex-1 w-full">
        {/* Conditional Multi-Page View Routing */}
        {activePageView === 'shop' && (
          <ShopCatalogView accentColor={accentColor} />
        )}

        {activePageView === 'collections' && (
          <CollectionsView accentColor={accentColor} />
        )}

        {activePageView === 'lookbook' && (
          <LookbookView accentColor={accentColor} />
        )}

        {activePageView === 'about' && (
          <AboutView storeName={storeName} accentColor={accentColor} />
        )}

        {activePageView === 'appointments' && (
          <AppointmentsView accentColor={accentColor} />
        )}

        {activePageView === 'wishlist' && (
          <WishlistView />
        )}

        {activePageView === 'product' && (
          <ProductDetailView accentColor={accentColor} />
        )}

        {activePageView === 'checkout' && (
          <CheckoutView accentColor={accentColor} />
        )}

        {activePageView === 'account' && (
          <AccountView accentColor={accentColor} />
        )}

        {activePageView === 'home' && (
          <>
            {/* 2. Full-Width Interactive Hero Section */}
            <HeroInteractive
              heroTitle={heroTitle}
              heroSubtitle={heroSubtitle}
              ctaText={ctaText}
              accentColor={accentColor}
              heroImages={heroImages}
            />

            {/* 3. Editorial Philosophy / Brand Statement */}
            <Manifesto
              accentColor={accentColor}
              storyHeadline={storyHeadline}
              storyDescription={storyDescription}
              storyQuote={storyQuote}
            />

            {/* 4. Curated Capsule Collections Grid */}
            <CapsuleGrid accentColor={accentColor} />

            {/* 5. New Arrivals & Archive Highlights */}
            <section id="arrivals" className="py-24 bg-[#F5F2EB] border-t border-[#E8E3DA]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-[#D4CDC3] gap-4">
                  <div>
                    <div
                      className="inline-flex items-center gap-1.5 text-[10px] tracking-ultra-wide uppercase mb-1 font-medium"
                      style={{ color: accentColor }}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Latest From The Salons</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#0C0C0D]">
                      New 2026 Arrivals
                    </h3>
                  </div>
                  <button
                    onClick={() => setActivePageView('shop')}
                    className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-[#0C0C0D] hover:text-[#C5A880] transition-colors cursor-pointer"
                  >
                    <span>Explore All Garments</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Product Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {newArrivals.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      accentColor={accentColor}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 6. Interactive Materiality & Fiber Magnifier */}
            <MaterialityZoom accentColor={accentColor} />

            {/* 7. Limited Archive & Numbered Pieces Showcase */}
            <section id="numbered" className="py-24 bg-[#FAF8F5]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-[#E8E3DA] gap-4">
                  <div>
                    <span
                      className="text-[10px] tracking-ultra-wide uppercase block mb-1 font-medium"
                      style={{ color: accentColor }}
                    >
                      Rare Archive Editions
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#0C0C0D]">
                      Numbered Limited Releases
                    </h3>
                  </div>
                  <p className="text-xs text-[#71717A] max-w-sm">
                    Pieces produced in small, strictly numbered editions with individually registered provenance certificates.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {limitedPieces.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      accentColor={accentColor}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 8. Shoppable Runway Lookbook with Interactive Hotspots */}
            <ShoppableLookbook accentColor={accentColor} />

            {/* 9. Private VIP Atelier & Salon Fitting Invitation */}
            <PrivateAtelier accentColor={accentColor} />

            {/* 10. Editorial Press & Critical Reviews */}
            <PressQuotes accentColor={accentColor} />
          </>
        )}
      </main>

      {/* 11. Luxury Footer */}
      <Footer
        storeName={storeName}
        accentColor={accentColor}
        newsletterHeading={newsletterHeading}
        newsletterSubtitle={newsletterSubtitle}
        contactEmail={contactEmail}
        locationDetails={locationDetails}
        copyrightNotice={copyrightNotice}
      />

      {/* Global Interactive Portals */}
      <Toast />
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />
      <WishlistDrawer />
      <SizeGuideModal />
      <NavigationDrawer />
    </div>
  );
};
