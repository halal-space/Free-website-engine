'use client';

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SectionHeader } from './components/SectionHeader';
import { CategoryCard } from './components/CategoryCard';
import { ProductGrid } from './components/ProductGrid';
import { Showcase } from './components/Showcase';
import { HorizontalRail } from './components/HorizontalRail';
import { Innovation } from './components/Innovation';
import { BrandStory } from './components/BrandStory';
import { PromoBanner } from './components/PromoBanner';
import { Footer } from './components/Footer';
import {
  aureliaCategories,
  aureliaProducts,
  newArrivalsProducts,
  bestSellersProducts,
  type AureliaProduct,
} from './data';
import { cn } from './lib/utils';

export interface AureliaStoreViewProps {
  storeName?: string;
  tagline?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  ctaText?: string;
  accentColor?: string;
  isInsidePreview?: boolean;
  className?: string;
}

export function AureliaStoreView({
  storeName = 'AURELIA',
  tagline = 'Technology, Refined.',
  heroTitle = 'Technology,\nRefined.',
  heroSubtitle = 'Precision-engineered gadgets designed for people who expect more from technology.',
  ctaText = 'Explore Collection',
  accentColor = '#5478ff',
  isInsidePreview = false,
  className,
}: AureliaStoreViewProps) {
  const [cartCount, setCartCount] = useState(2);
  const [wishlistCount, setWishlistCount] = useState(3);

  const handleAddToCart = (p: AureliaProduct) => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div
      style={
        {
          '--accent': accentColor,
        } as React.CSSProperties
      }
      className={cn(
        'dark min-h-screen bg-bg text-ink font-sans selection:bg-accent selection:text-white',
        className,
      )}
    >
      {/* Top Chrome Navbar */}
      <Navbar
        storeName={storeName}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        isInsidePreview={isInsidePreview}
      />

      <main className="relative">
        {/* 1. Hero Section */}
        <Hero
          storeName={storeName}
          heroTitle={heroTitle}
          heroSubtitle={heroSubtitle}
          ctaText={ctaText}
        />

        {/* 2. Featured Categories Bento Grid */}
        <section id="categories" className="container-site py-20 lg:py-28">
          <SectionHeader
            label="Explore"
            title="Shop by category"
            description={`Seven disciplines, one standard. Every category is engineered in the ${storeName} studio.`}
            href="#categories"
            linkLabel="All categories"
          />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {aureliaCategories.map((c, i) => (
              <div
                key={c.slug}
                id={`category-${c.slug}`}
                className={cn(
                  i === 0 && 'col-span-2 row-span-2',
                  i === 1 && 'col-span-2',
                  i === 2 && 'col-span-2',
                )}
              >
                <CategoryCard category={c} />
              </div>
            ))}
          </div>
        </section>

        {/* 3. Featured Products Grid */}
        <section id="featured" className="border-t border-line py-20 lg:py-28">
          <div className="container-site">
            <SectionHeader
              label="The Collection"
              title="Featured products"
              description="A curated selection of this season's most requested pieces."
              href="#featured"
              linkLabel="Shop all"
            />
            <ProductGrid
              products={aureliaProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        </section>

        {/* 4. Premium Showcase with 3D Acoustic Studio */}
        <Showcase />

        {/* 5. New Arrivals Horizontal Rail */}
        <section id="new-arrivals" className="border-t border-line py-20 lg:py-28">
          <div className="container-site">
            <SectionHeader
              label="Just landed"
              title="New arrivals"
              description="Fresh from the studio — swipe through the latest releases."
              href="#new-arrivals"
              linkLabel="View all"
            />
          </div>
          <div className="container-site">
            <HorizontalRail
              products={newArrivalsProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        </section>

        {/* 6. Best Sellers Ranked Grid */}
        <section id="best-sellers" className="border-t border-line py-20 lg:py-28">
          <div className="container-site">
            <SectionHeader
              label="Proven favorites"
              title="Best sellers"
              description="The pieces our customers keep coming back for, ranked by you."
              href="#best-sellers"
              linkLabel="View all"
            />
            <ProductGrid
              products={bestSellersProducts}
              rank={true}
              onAddToCart={handleAddToCart}
            />
          </div>
        </section>

        {/* 7. Innovation Section */}
        <Innovation />

        {/* 8. Brand Story Section */}
        <BrandStory />

        {/* 9. Promo Banner */}
        <PromoBanner />
      </main>

      {/* Footer */}
      <Footer storeName={storeName} />
    </div>
  );
}
