import React, { useState } from 'react';
import { useUIStore } from '../stores/uiStore';

interface FooterProps {
  storeName?: string;
  tagline?: string;
  copyrightNotice?: string;
  newsletterHeading?: string;
  contactEmail?: string;
}

export const Footer: React.FC<FooterProps> = ({
  storeName = 'OBSIDIAN',
  tagline = 'SOLAR',
  copyrightNotice = '© 2026 Obsidian Solar Ltd. All rights reserved.',
  newsletterHeading = 'Stay informed',
  contactEmail = 'quotes@obsidiansolar.example',
}) => {
  const {
    navigateToHome,
    navigateToProducts,
    navigateToServices,
    navigateToAbout,
    navigateToProjects,
    navigateToQuote,
    navigateToFaq,
    navigateToPrivacy,
    navigateToTerms,
    showToast,
  } = useUIStore();

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      showToast('Subscribed. Welcome to the list.');
      setEmail('');
    }
  };

  return (
    <footer className="bg-onyx text-cloud/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand info */}
          <div className="md:col-span-4">
            <button
              type="button"
              onClick={navigateToHome}
              className="flex items-center gap-3 mb-5 cursor-pointer text-left"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-[2px] bg-brass text-onyx font-bold text-lg">
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
            <p className="text-[15px] leading-relaxed max-w-xs">
              Premium equipment. Expert installation. Lifetime support. Engineered energy independence
              for homes and businesses.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase border border-cloud/20 rounded-[2px] px-2.5 py-1.5 text-cloud/70">
                MCS Certified
              </span>
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase border border-cloud/20 rounded-[2px] px-2.5 py-1.5 text-cloud/70">
                NICEIC
              </span>
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase border border-cloud/20 rounded-[2px] px-2.5 py-1.5 text-cloud/70">
                RECC
              </span>
            </div>
          </div>

          {/* Company links */}
          <div className="md:col-span-2">
            <h3 className="eyebrow text-brass mb-5">Company</h3>
            <ul className="space-y-3 text-[15px]">
              <li>
                <button
                  type="button"
                  onClick={navigateToAbout}
                  className="hover:text-cloud transition-colors duration-200 cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={navigateToProjects}
                  className="hover:text-cloud transition-colors duration-200 cursor-pointer"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={navigateToFaq}
                  className="hover:text-cloud transition-colors duration-200 cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateToQuote()}
                  className="hover:text-cloud transition-colors duration-200 cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Systems links */}
          <div className="md:col-span-3">
            <h3 className="eyebrow text-brass mb-5">Systems</h3>
            <ul className="space-y-3 text-[15px]">
              <li>
                <button
                  type="button"
                  onClick={() => navigateToServices('residential')}
                  className="hover:text-cloud transition-colors duration-200 cursor-pointer text-left"
                >
                  Residential install
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateToServices('commercial')}
                  className="hover:text-cloud transition-colors duration-200 cursor-pointer text-left"
                >
                  Commercial install
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateToServices('maintenance')}
                  className="hover:text-cloud transition-colors duration-200 cursor-pointer text-left"
                >
                  Maintenance plans
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateToServices('financing')}
                  className="hover:text-cloud transition-colors duration-200 cursor-pointer text-left"
                >
                  Financing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateToServices('incentives')}
                  className="hover:text-cloud transition-colors duration-200 cursor-pointer text-left"
                >
                  SEG & incentives
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={navigateToProducts}
                  className="hover:text-cloud transition-colors duration-200 cursor-pointer text-left"
                >
                  Equipment
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <h3 className="eyebrow text-brass mb-5">{newsletterHeading}</h3>
            <p className="text-sm leading-relaxed mb-4">
              One email per quarter. Output data, no marketing noise.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2" noValidate>
              <label htmlFor="obsidian-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="obsidian-newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 min-w-0 bg-charcoal border border-line-dark rounded-[2px] px-3.5 py-3 text-sm text-cloud placeholder:text-cloud/40 focus:border-brass outline-none"
              />
              <button
                type="submit"
                className="btn btn-brass !px-4 !py-3 text-sm shrink-0 cursor-pointer"
                aria-label="Subscribe"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>
            {subscribed && (
              <p className="text-sm text-brass mt-3">Subscribed. Welcome to the list.</p>
            )}
            <div className="flex gap-3 mt-6">
              <a
                href={`mailto:${contactEmail}`}
                aria-label="Email"
                className="w-9 h-9 flex items-center justify-center border border-cloud/20 rounded-[2px] hover:border-brass hover:text-brass transition-colors duration-200 cursor-pointer"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center border border-cloud/20 rounded-[2px] hover:border-brass hover:text-brass transition-colors duration-200 cursor-pointer"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v2a6 6 0 0 1 2-2z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="X"
                className="w-9 h-9 flex items-center justify-center border border-cloud/20 rounded-[2px] hover:border-brass hover:text-brass transition-colors duration-200 cursor-pointer"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="4" y1="4" x2="20" y2="20" />
                  <line x1="20" y1="4" x2="4" y2="20" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-line-dark mt-12 pt-8 flex flex-col sm:flex-row justify-between gap-3 text-[13px] text-cloud/40">
          <p>{copyrightNotice}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <button
              type="button"
              onClick={navigateToPrivacy}
              className="hover:text-cloud transition-colors duration-200 cursor-pointer"
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={navigateToTerms}
              className="hover:text-cloud transition-colors duration-200 cursor-pointer"
            >
              Terms
            </button>
            <span>MCS 12345 · NICEIC 67890</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
