import React, { useMemo } from 'react';
import { useUIStore } from './stores/uiStore';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { ToastRoot } from './components/ToastRoot';

// Home sections
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { WhyUsPillars } from './components/WhyUsPillars';
import { FeaturedPackages } from './components/FeaturedPackages';
import { SavingsCalculatorSection } from './components/SavingsCalculatorSection';
import { ProcessStepper } from './components/ProcessStepper';
import { TestimonialsSection } from './components/TestimonialsSection';
import { RecentProjectsSection } from './components/RecentProjectsSection';
import { FaqSection } from './components/FaqSection';
import { FinalQuoteSection } from './components/FinalQuoteSection';

// Sub-pages
import { ProductsCatalogPage } from './components/ProductsCatalogPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ServicesPage } from './components/ServicesPage';
import { ProjectsPage } from './components/ProjectsPage';
import { AboutPage } from './components/AboutPage';
import { QuotePage } from './components/QuotePage';
import { FaqPage } from './components/FaqPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { NotFoundPage } from './components/NotFoundPage';

export interface ObsidianStoreViewProps {
  accentColor?: string;
  backgroundColor?: string;
  surfaceColor?: string;
  textColor?: string;
  storeName?: string;
  tagline?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  ctaText?: string;
  heroImages?: string[];
  contactEmail?: string;
  locationDetails?: string;
  copyrightNotice?: string;
  isInsidePreview?: boolean;
}

export const ObsidianStoreView: React.FC<ObsidianStoreViewProps> = ({
  accentColor = '#B8975A',
  backgroundColor,
  surfaceColor,
  textColor,
  storeName = 'OBSIDIAN',
  tagline = 'SOLAR',
  heroTitle = 'Power, engineered for the next 30 years.',
  heroSubtitle = 'Premium equipment, installed by our own certified crews, monitored for life. No subcontractors. No estimates presented as quotes.',
  ctaText = 'Get a Free Quote',
  heroImages,
  contactEmail = 'quotes@obsidiansolar.example',
  locationDetails = '14 Ironworks Lane, London EC2A 3BP',
  copyrightNotice = '© 2026 Obsidian Solar Ltd. All rights reserved.',
}) => {
  const currentView = useUIStore((s) => s.currentView);
  const selectedProductSlug = useUIStore((s) => s.selectedProductSlug);

  const heroImage =
    heroImages && heroImages.length > 0
      ? heroImages[0]
      : 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2400&auto=format&fit=crop';

  const dynamicStyles = useMemo(() => {
    const s: Record<string, string> = {};
    if (accentColor) {
      s['--color-brass'] = accentColor;
      s['--color-brass-dark'] = accentColor;
      s['--obsidian-accent'] = accentColor;
    }
    if (backgroundColor) {
      s['--color-cloud'] = backgroundColor;
      s['--obsidian-bg'] = backgroundColor;
    }
    if (textColor) {
      s['--color-onyx'] = textColor;
      s['--obsidian-text'] = textColor;
    }
    return s as React.CSSProperties;
  }, [accentColor, backgroundColor, textColor]);

  return (
    <div
      className="obsidian-theme min-h-screen flex flex-col font-sans bg-cloud text-onyx antialiased selection:bg-brass selection:text-onyx"
      style={dynamicStyles}
    >
      <Header
        storeName={storeName}
        tagline={tagline}
        ctaText={ctaText}
      />

      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero
              title={heroTitle}
              subtitle={heroSubtitle}
              ctaText={ctaText}
              heroImage={heroImage}
            />
            <TrustBar />
            <WhyUsPillars />
            <FeaturedPackages />
            <SavingsCalculatorSection />
            <ProcessStepper />
            <TestimonialsSection />
            <RecentProjectsSection />
            <FaqSection />
            <FinalQuoteSection />
          </>
        )}

        {currentView === 'products' && <ProductsCatalogPage />}

        {currentView === 'product' && (
          <ProductDetailPage slug={selectedProductSlug || 'obsidian-440-mono'} />
        )}

        {currentView === 'services' && <ServicesPage />}

        {currentView === 'projects' && <ProjectsPage />}

        {currentView === 'about' && <AboutPage />}

        {currentView === 'quote' && <QuotePage />}

        {currentView === 'faq' && <FaqPage />}

        {currentView === 'privacy' && <PrivacyPage />}

        {currentView === 'terms' && <TermsPage />}

        {![
          'home',
          'products',
          'product',
          'services',
          'projects',
          'about',
          'quote',
          'faq',
          'privacy',
          'terms',
        ].includes(currentView) && <NotFoundPage />}
      </main>

      <Footer
        storeName={storeName}
        tagline={tagline}
        copyrightNotice={copyrightNotice}
        contactEmail={contactEmail}
      />

      <MobileBottomBar ctaText={ctaText} />

      <ToastRoot />
    </div>
  );
};
