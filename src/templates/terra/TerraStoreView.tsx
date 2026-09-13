import React from 'react';
import { useUIStore } from './stores/uiStore';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';

// Home Sections
import Hero from './components/Hero';
import BentoCategories from './components/BentoCategories';
import BestSellersSection from './components/BestSellersSection';
import BundleBuilderSection from './components/BundleBuilderSection';
import MakerSpotlightSection from './components/MakerSpotlightSection';
import RecipeCardsSection from './components/RecipeCardsSection';
import PantryCtaSection from './components/PantryCtaSection';

// Sub-pages
import ShopCatalogPage from './components/ShopCatalogPage';
import ProductDetailPage from './components/ProductDetailPage';
import PantryBoxPage from './components/PantryBoxPage';
import RecipesPage from './components/RecipesPage';
import RecipeDetailPage from './components/RecipeDetailPage';
import MakersPage from './components/MakersPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import CheckoutSuccessPage from './components/CheckoutSuccessPage';
import AboutPage from './components/AboutPage';
import FaqPage from './components/FaqPage';
import ShippingPage from './components/ShippingPage';
import ContactPage from './components/ContactPage';
import AccountPage from './components/AccountPage';
import LegalPage from './components/LegalPage';
import SearchPage from './components/SearchPage';
import NotFoundPage from './components/NotFoundPage';

interface TerraStoreViewProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  surfaceColor?: string;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
}

export default function TerraStoreView({
  primaryColor,
  secondaryColor,
  accentColor,
  surfaceColor,
  backgroundColor,
  textColor,
  fontFamily,
}: TerraStoreViewProps) {
  const { currentView, selectedCategory, selectedProductSlug, selectedRecipeSlug } = useUIStore();

  const customStyle: React.CSSProperties & Record<string, string> = {};
  if (primaryColor) customStyle['--color-terracotta'] = primaryColor;
  if (secondaryColor) customStyle['--color-rosemary'] = secondaryColor;
  if (accentColor) customStyle['--color-gold'] = accentColor;
  if (surfaceColor) customStyle['--color-surface'] = surfaceColor;
  if (backgroundColor) customStyle['--color-canvas'] = backgroundColor;
  if (textColor) customStyle['--color-ink'] = textColor;
  if (fontFamily) {
    customStyle['fontFamily'] = fontFamily;
  }

  return (
    <div
      className="terra-theme min-h-screen bg-[#FBF9F5] text-[#1B241E] font-sans antialiased selection:bg-[#C85A32] selection:text-white"
      style={customStyle}
    >
      <Header />

      {/* Main View Router */}
      {currentView === 'home' && (
        <main>
          <Hero />
          <BentoCategories />
          <BestSellersSection />
          <BundleBuilderSection />
          <MakerSpotlightSection />
          <RecipeCardsSection />
          <PantryCtaSection />
        </main>
      )}

      {currentView === 'shop' && <ShopCatalogPage initialCategory={selectedCategory} />}

      {currentView === 'product' && (
        <ProductDetailPage slug={selectedProductSlug || 'single-estate-koroneiki-olive-oil'} />
      )}

      {currentView === 'box' && <PantryBoxPage />}

      {currentView === 'recipes' && <RecipesPage />}

      {currentView === 'recipe' && (
        <RecipeDetailPage slug={selectedRecipeSlug || 'tinned-ventresca-toast'} />
      )}

      {currentView === 'makers' && <MakersPage />}

      {currentView === 'cart' && <CartPage />}

      {currentView === 'checkout' && <CheckoutPage />}

      {currentView === 'checkout-success' && <CheckoutSuccessPage />}

      {currentView === 'about' && <AboutPage />}

      {currentView === 'faq' && <FaqPage />}

      {currentView === 'shipping' && <ShippingPage />}

      {currentView === 'contact' && <ContactPage />}

      {currentView === 'account' && <AccountPage />}

      {currentView === 'legal' && <LegalPage />}

      {currentView === 'search' && <SearchPage />}

      {currentView === '404' && <NotFoundPage />}

      <Footer />
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
