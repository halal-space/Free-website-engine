import React, { useState } from 'react';
import { CATEGORIES } from '../data/products';
import { useUIStore } from '../stores/uiStore';

interface FooterProps {
  storeName?: string;
  contactEmail?: string;
  copyrightNotice?: string;
  newsletterHeading?: string;
  newsletterSubtitle?: string;
}

export const Footer: React.FC<FooterProps> = ({
  storeName = 'SOLENNE',
  copyrightNotice,
  newsletterHeading = 'Enter our world of beauty.',
  newsletterSubtitle = 'Ritual notes, ingredient essays and first access to limited editions — one considered letter a month.',
}) => {
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('By subscribing you agree to our privacy policy.');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const {
    navigateToShop,
    navigateToAbout,
    navigateToJournal,
    showToast,
  } = useUIStore();

  const year = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setNote('Please enter a valid email address.');
      return;
    }
    setNote('Welcome to the maison — your first letter is on its way.');
    setIsSubscribed(true);
    setEmail('');
    showToast('Welcome to our world of beauty.');
  };

  const socials = [
    {
      label: 'Instagram',
      d: 'M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
    },
    {
      label: 'Pinterest',
      d: 'M12 2C6.48 2 2 6.48 2 12c0 4.08 2.46 7.58 5.99 9.13-.09-.78-.16-1.97.03-2.82.18-.77 1.15-4.87 1.15-4.87s-.29-.59-.29-1.46c0-1.37.79-2.39 1.78-2.39.84 0 1.25.63 1.25 1.39 0 .85-.54 2.11-.82 3.28-.23.98.49 1.78 1.46 1.78 1.75 0 3.1-1.85 3.1-4.52 0-2.36-1.7-4.01-4.12-4.01-2.81 0-4.46 2.11-4.46 4.28 0 .85.33 1.76.73 2.26.08.1.09.18.07.28l-.27 1.11c-.04.18-.14.22-.33.13-1.25-.58-2.03-2.4-2.03-3.87 0-3.15 2.29-6.04 6.6-6.04 3.47 0 6.16 2.47 6.16 5.77 0 3.45-2.17 6.22-5.19 6.22-1.01 0-1.96-.53-2.29-1.15l-.62 2.37c-.22.87-.83 1.96-1.24 2.62.93.29 1.92.45 2.95.45 5.52 0 10-4.48 10-10S17.52 2 12 2Z',
    },
    {
      label: 'TikTok',
      d: 'M16.6 3c.36 1.98 1.73 3.42 3.9 3.56v2.86c-1.43.06-2.76-.34-3.9-1.12v5.9c0 3.75-2.51 5.8-5.55 5.8C8.35 20 6 17.9 6 14.94c0-2.9 2.32-5.02 5.44-4.84v2.95c-1.5-.26-2.6.62-2.6 1.86 0 1.31 1.05 2.19 2.38 2.19 1.44 0 2.48-1 2.48-2.72V3h2.9Z',
    },
  ];

  return (
    <footer className="bg-ink text-ivory">
      {/* Newsletter */}
      <div className="hairline-b border-white/10">
        <div className="container-luxe grid gap-10 py-16 md:grid-cols-[1fr_1fr] md:items-center md:py-20">
          <div>
            <p className="eyebrow mb-4 text-champagne">The Solenne Letter</p>
            <h2 className="max-w-md font-serif text-4xl text-ivory md:text-5xl">
              {newsletterHeading}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {newsletterSubtitle}
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="md:justify-self-end md:w-full md:max-w-md" noValidate>
            <label htmlFor="footer-email" className="eyebrow mb-3 block text-white/50">
              Email Address
            </label>
            <div className="flex items-center gap-4 border-b border-white/25 pb-3 transition-colors focus-within:border-champagne">
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full bg-transparent text-lg font-serif italic text-ivory placeholder:text-white/30 focus:outline-none"
              />
              <button
                type="submit"
                className="group flex shrink-0 items-center gap-2 eyebrow text-champagne transition-colors hover:text-ivory cursor-pointer"
              >
                Subscribe
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="transition-transform duration-500 group-hover:translate-x-1"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </button>
            </div>
            <p className={`mt-3 text-xs ${isSubscribed ? 'text-champagne' : 'text-white/55'}`}>
              {note}
            </p>
          </form>
        </div>
      </div>

      {/* Link columns */}
      <div className="container-luxe grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">
        <div>
          <button
            type="button"
            onClick={() => useUIStore.getState().navigateToHome()}
            className="inline-block font-serif text-2xl font-medium tracking-[0.3em] pl-[0.3em] text-ivory cursor-pointer text-left"
          >
            {storeName}
          </button>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
            Considered skincare distilled to its purest form. Formulated in Lyon, made for rituals everywhere.
          </p>
          <div className="mt-7 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  showToast(`${s.label} profile simulated in preview.`);
                }}
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-champagne hover:text-champagne cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Shop links */}
        <nav aria-label="Shop">
          <h3 className="eyebrow mb-6 text-white/60">Shop</h3>
          <ul className="space-y-3.5">
            {CATEGORIES.slice(0, 4).map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => navigateToShop(c.id)}
                  className="text-sm text-white/70 transition-colors duration-300 hover:text-champagne cursor-pointer text-left"
                >
                  {c.label}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => navigateToShop(null, 'rating')}
                className="text-sm text-white/70 transition-colors duration-300 hover:text-champagne cursor-pointer text-left"
              >
                Best Sellers
              </button>
            </li>
          </ul>
        </nav>

        {/* Customer Care */}
        <nav aria-label="Customer Care">
          <h3 className="eyebrow mb-6 text-white/60">Customer Care</h3>
          <ul className="space-y-3.5">
            <li>
              <button
                type="button"
                onClick={() => navigateToAbout()}
                className="text-sm text-white/70 transition-colors duration-300 hover:text-champagne cursor-pointer text-left"
              >
                Contact
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => navigateToAbout()}
                className="text-sm text-white/70 transition-colors duration-300 hover:text-champagne cursor-pointer text-left"
              >
                Shipping & Returns
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => navigateToAbout()}
                className="text-sm text-white/70 transition-colors duration-300 hover:text-champagne cursor-pointer text-left"
              >
                FAQ
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => showToast('Track Order concierge simulated in preview mode.')}
                className="text-sm text-white/70 transition-colors duration-300 hover:text-champagne cursor-pointer text-left"
              >
                Track Order
              </button>
            </li>
          </ul>
        </nav>

        {/* Maison */}
        <nav aria-label="Maison">
          <h3 className="eyebrow mb-6 text-white/60">Maison</h3>
          <ul className="space-y-3.5">
            <li>
              <button
                type="button"
                onClick={() => navigateToAbout()}
                className="text-sm text-white/70 transition-colors duration-300 hover:text-champagne cursor-pointer text-left"
              >
                About
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => navigateToJournal()}
                className="text-sm text-white/70 transition-colors duration-300 hover:text-champagne cursor-pointer text-left"
              >
                Journal
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => navigateToAbout()}
                className="text-sm text-white/70 transition-colors duration-300 hover:text-champagne cursor-pointer text-left"
              >
                Ingredients Glossary
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => navigateToAbout()}
                className="text-sm text-white/70 transition-colors duration-300 hover:text-champagne cursor-pointer text-left"
              >
                Sustainability
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-luxe flex flex-col items-center justify-between gap-6 py-7 md:flex-row">
          <p className="text-xs tracking-wide text-white/55">
            {copyrightNotice || `© ${year} Maison Solenne SAS · All rights reserved`}
          </p>

          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/50">
            <li>
              <button
                type="button"
                onClick={() => showToast('Privacy policy simulated in preview mode.')}
                className="transition-colors hover:text-white cursor-pointer"
              >
                Privacy
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => showToast('Terms simulated in preview mode.')}
                className="transition-colors hover:text-white cursor-pointer"
              >
                Terms
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => showToast('Accessibility statement simulated in preview mode.')}
                className="transition-colors hover:text-white cursor-pointer"
              >
                Accessibility
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => showToast('Cookies preferences simulated in preview mode.')}
                className="transition-colors hover:text-white cursor-pointer"
              >
                Cookies
              </button>
            </li>
          </ul>

          <div className="flex items-center gap-2" aria-label="Accepted payment methods">
            <span
              className="grid h-7 w-11 place-items-center rounded-[4px] bg-white/95 text-[0.5rem] font-black italic tracking-tight text-[#1a1f71]"
              title="Visa"
            >
              VISA
            </span>
            <span
              className="grid h-7 w-11 place-items-center rounded-[4px] bg-white/95"
              title="Mastercard"
            >
              <svg width="22" height="14" viewBox="0 0 24 14" aria-hidden="true">
                <circle cx="8.5" cy="7" r="5.5" fill="#eb001b" />
                <circle cx="15.5" cy="7" r="5.5" fill="#f79e1b" fillOpacity=".9" />
              </svg>
            </span>
            <span
              className="grid h-7 w-11 place-items-center rounded-[4px] bg-white/95 text-[0.5rem] font-bold tracking-tight text-[#006fcf]"
              title="American Express"
            >
              AMEX
            </span>
            <span
              className="grid h-7 w-11 place-items-center rounded-[4px] bg-white/95 font-semibold text-black"
              title="Apple Pay"
            >
              <svg width="12" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.05 12.54c-.03-2.89 2.36-4.28 2.47-4.35-1.35-1.97-3.44-2.24-4.18-2.27-1.78-.18-3.47 1.05-4.37 1.05-.9 0-2.29-1.02-3.77-1-1.94.03-3.72 1.13-4.72 2.86-2.01 3.49-.51 8.66 1.45 11.5.96 1.39 2.1 2.95 3.6 2.9 1.44-.06 1.99-.93 3.73-.93s2.23.93 3.76.9c1.55-.03 2.53-1.41 3.48-2.81 1.1-1.61 1.55-3.17 1.58-3.25-.04-.02-3.02-1.16-3.05-4.6ZM14.16 4c.79-.96 1.33-2.29 1.18-3.62-1.14.05-2.53.76-3.35 1.72-.74.85-1.38 2.21-1.21 3.51 1.28.1 2.58-.65 3.38-1.61Z" />
              </svg>
            </span>
            <span
              className="grid h-7 w-11 place-items-center rounded-[4px] bg-white/95 text-[0.5rem] font-extrabold italic tracking-tight text-[#003087]"
              title="PayPal"
            >
              <span className="italic">
                Pay<span className="text-[#009cde]">Pal</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
