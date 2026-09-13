import React from 'react';
import { useUIStore } from '../stores/uiStore';

interface HeaderProps {
  storeName?: string;
  tagline?: string;
  phone?: string;
  ctaText?: string;
}

export const Header: React.FC<HeaderProps> = ({
  storeName = 'OBSIDIAN',
  tagline = 'SOLAR',
  phone = '+44 20 4577 1200',
  ctaText = 'Get a Free Quote',
}) => {
  const currentView = useUIStore((s) => s.currentView);
  const isMobileMenuOpen = useUIStore((s) => s.isMobileMenuOpen);
  const toggleMobileMenu = useUIStore((s) => s.toggleMobileMenu);
  const setMobileMenuOpen = useUIStore((s) => s.setMobileMenuOpen);

  const {
    navigateToHome,
    navigateToProducts,
    navigateToServices,
    navigateToAbout,
    navigateToProjects,
    navigateToQuote,
    navigateToFaq,
  } = useUIStore();

  const navItems = [
    { label: 'Home', key: 'home', action: navigateToHome },
    { label: 'Products', key: 'products', action: navigateToProducts },
    { label: 'Services', key: 'services', action: () => navigateToServices() },
    { label: 'About', key: 'about', action: navigateToAbout },
  ];

  return (
    <header className="sticky top-0 z-50 bg-onyx border-b border-line-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <button
            type="button"
            onClick={navigateToHome}
            className="flex items-center gap-3 cursor-pointer text-left"
            aria-label={`${storeName} Solar home`}
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-[2px] bg-brass text-onyx font-bold text-lg leading-none">
              {storeName.charAt(0) || 'O'}
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-cloud font-semibold tracking-[0.14em] text-sm">
                {storeName}
              </span>
              <span className="text-brass text-[11px] tracking-[0.32em] font-medium">
                {tagline}
              </span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {navItems.map((item) => {
              const isActive = currentView === item.key || (item.key === 'products' && currentView === 'product');
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={item.action}
                  className={`nav-link text-sm font-medium tracking-wide cursor-pointer transition-colors duration-200 ${
                    isActive ? 'active text-cloud font-semibold' : 'text-cloud/70 hover:text-cloud'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="text-cloud/70 hover:text-cloud text-sm font-medium transition-colors duration-200 cursor-pointer"
            >
              {phone}
            </a>
            <button
              type="button"
              onClick={() => navigateToQuote()}
              className="btn btn-brass !py-3 !px-5 text-sm"
            >
              {ctaText}
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button
            id="menu-btn"
            type="button"
            onClick={toggleMobileMenu}
            className="md:hidden text-cloud p-2 cursor-pointer"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-line-dark bg-onyx">
          <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Mobile">
            <button
              type="button"
              onClick={() => {
                navigateToHome();
                setMobileMenuOpen(false);
              }}
              className="text-left text-cloud/80 hover:text-cloud hover:bg-charcoal rounded-[2px] px-3 py-3 text-[15px] font-medium transition-colors duration-200 cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => {
                navigateToProducts();
                setMobileMenuOpen(false);
              }}
              className="text-left text-cloud/80 hover:text-cloud hover:bg-charcoal rounded-[2px] px-3 py-3 text-[15px] font-medium transition-colors duration-200 cursor-pointer"
            >
              Products
            </button>
            <button
              type="button"
              onClick={() => {
                navigateToServices();
                setMobileMenuOpen(false);
              }}
              className="text-left text-cloud/80 hover:text-cloud hover:bg-charcoal rounded-[2px] px-3 py-3 text-[15px] font-medium transition-colors duration-200 cursor-pointer"
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => {
                navigateToAbout();
                setMobileMenuOpen(false);
              }}
              className="text-left text-cloud/80 hover:text-cloud hover:bg-charcoal rounded-[2px] px-3 py-3 text-[15px] font-medium transition-colors duration-200 cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => {
                navigateToProjects();
                setMobileMenuOpen(false);
              }}
              className="text-left text-cloud/80 hover:text-cloud hover:bg-charcoal rounded-[2px] px-3 py-3 text-[15px] font-medium transition-colors duration-200 cursor-pointer"
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => {
                navigateToFaq();
                setMobileMenuOpen(false);
              }}
              className="text-left text-cloud/80 hover:text-cloud hover:bg-charcoal rounded-[2px] px-3 py-3 text-[15px] font-medium transition-colors duration-200 cursor-pointer"
            >
              FAQ
            </button>
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="text-brass font-semibold px-3 py-3 text-[15px] cursor-pointer"
            >
              Call {phone}
            </a>
            <button
              type="button"
              onClick={() => {
                navigateToQuote();
                setMobileMenuOpen(false);
              }}
              className="btn btn-brass mt-2 w-full text-center"
            >
              {ctaText}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
