'use client';

import React from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { BestSellers } from './components/BestSellers';
import { EditorialBrand } from './components/EditorialBrand';
import { FeaturedCollection } from './components/FeaturedCollection';
import { Ingredients } from './components/Ingredients';
import { RitualSteps } from './components/RitualSteps';
import { Testimonials } from './components/Testimonials';
import { Manifesto } from './components/Manifesto';
import { JournalCards } from './components/JournalCards';

import { ShopCatalog } from './components/ShopCatalog';
import { ProductDetailView } from './components/ProductDetailView';
import { AboutPage } from './components/AboutPage';
import { JournalPage } from './components/JournalPage';
import { NotFoundPage } from './components/NotFoundPage';

import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { QuickViewModal } from './components/QuickViewModal';
import { ToastRoot } from './components/ToastRoot';

import { useUIStore } from './stores/uiStore';
import { PRODUCTS } from './data/products';
import { Product } from './types';
import { ArrowLeft, Sparkles } from 'lucide-react';

export interface SolenneStoreViewProps {
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
  copyrightNotice?: string;
  isInsidePreview?: boolean;
}

export const SolenneStoreView: React.FC<SolenneStoreViewProps> = ({
  storeName = 'SOLENNE',
  tagline = 'Skin · Rituals',
  heroTitle,
  heroSubtitle,
  ctaText = 'Shop Collection',
  accentColor = '#8A6D47',
  backgroundColor = '#FAF7F2',
  surfaceColor = '#FFFFFF',
  textColor = '#1B1917',
  textMutedColor = '#55504A',
  borderColor = 'rgba(27, 25, 23, 0.09)',
  announcementText,
  heroImages,
  storyHeadline,
  storyDescription,
  featuredProducts,
  newsletterHeading,
  newsletterSubtitle,
  contactEmail,
  copyrightNotice,
  isInsidePreview = false,
}) => {
  const {
    activePageView,
    selectedProductSlug,
    navigateToHome,
    navigateToShop,
    navigateToAbout,
    navigateToJournal,
    navigateTo404,
  } = useUIStore();

  const currentProduct = React.useMemo(() => {
    if (selectedProductSlug) {
      const found = PRODUCTS.find((p) => p.slug === selectedProductSlug);
      if (found) return found;
    }
    return PRODUCTS[0];
  }, [selectedProductSlug]);

  const mappedProducts: Product[] | undefined = React.useMemo(() => {
    if (!featuredProducts || featuredProducts.length === 0) return undefined;
    return featuredProducts.map((fp) => {
      const existing = PRODUCTS.find((p) => p.slug === fp.id || p.name === fp.name);
      if (existing) {
        return {
          ...existing,
          name: fp.name,
          price: fp.price,
          images: [fp.image, existing.images[1]],
          badge: (fp.badge as any) || existing.badge,
        };
      }
      return {
        slug: fp.id,
        name: fp.name,
        tagline: 'A considered botanical ritual formulation.',
        category: 'serums',
        price: fp.price,
        rating: 4.9,
        reviewCount: 120,
        sizes: [{ label: '50 ml', modifier: 0 }],
        description: 'Clinically proven active botanicals formulated for radiance and deep barrier support.',
        benefits: ['Hydrates deeply', 'Reinforces skin barrier', 'Smooths fine lines'],
        howToUse: 'Smooth 2-3 drops over cleansed face and neck morning and evening.',
        heroIngredients: ['Kakadu Plum', 'Hyaluronic Acid'],
        inci: 'Aqua, Glycerin, Sodium Hyaluronate, Terminalia Ferdinandiana Fruit Extract.',
        skinTypes: ['All', 'Sensitive'],
        concern: 'Radiance',
        images: [fp.image, fp.image],
        badge: (fp.badge as any) || 'New',
      };
    });
  }, [featuredProducts]);

  return (
    <div
      className="solenne-theme min-h-screen flex flex-col antialiased selection:bg-[#c9b489] selection:text-[#1b1917] font-sans"
      style={
        {
          backgroundColor: backgroundColor || 'var(--color-bg)',
          color: textColor || 'var(--color-ink)',
          '--color-gold': accentColor,
          '--color-bronze': accentColor,
          '--color-bg': backgroundColor,
          '--color-surface': surfaceColor,
          '--color-ink': textColor,
          '--color-smoke': textMutedColor,
          '--color-line': borderColor,
        } as React.CSSProperties
      }
    >
      {/* 1. Header & Navigation */}
      <AnnouncementBar announcementText={announcementText} />
      <Header storeName={storeName} tagline={tagline} />

      {/* Breadcrumb back banner when on sub-page in preview mode */}
      {activePageView !== 'home' && isInsidePreview && (
        <div className="bg-sand/30 border-b border-line px-4 py-2 flex items-center justify-between text-xs text-smoke">
          <button
            type="button"
            onClick={navigateToHome}
            className="flex items-center gap-1.5 font-medium text-ink hover:text-gold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home View
          </button>
          <span className="flex items-center gap-1 text-[0.68rem] tracking-wider uppercase text-stone">
            <Sparkles className="w-3 h-3 text-gold" />
            Viewing: {activePageView.toUpperCase()}
          </span>
        </div>
      )}

      {/* 2. Page Content based on activePageView */}
      <main id="main" className="flex-1">
        {activePageView === 'home' && (
          <>
            <Hero
              heroTitle={heroTitle}
              heroSubtitle={heroSubtitle}
              ctaText={ctaText}
              heroImages={heroImages}
            />
            <Categories />
            <BestSellers products={mappedProducts} />
            <EditorialBrand
              storyHeadline={storyHeadline}
              storyDescription={storyDescription}
            />
            <FeaturedCollection />
            <Ingredients />
            <RitualSteps />
            <Testimonials />
            <Manifesto />
            <JournalCards />
          </>
        )}

        {activePageView === 'shop' && <ShopCatalog />}

        {activePageView === 'product' && (
          <ProductDetailView product={currentProduct} />
        )}

        {activePageView === 'about' && <AboutPage />}

        {activePageView === 'journal' && <JournalPage />}

        {activePageView === '404' && <NotFoundPage />}
      </main>

      {/* 3. Footer */}
      <Footer
        storeName={storeName}
        copyrightNotice={copyrightNotice}
        newsletterHeading={newsletterHeading}
        newsletterSubtitle={newsletterSubtitle}
        contactEmail={contactEmail}
      />

      {/* 4. Commerce Drawers, Modals & Toasts */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchOverlay />
      <QuickViewModal />
      <ToastRoot />
    </div>
  );
};
