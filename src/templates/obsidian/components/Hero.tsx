import React from 'react';
import { useUIStore } from '../stores/uiStore';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  heroImage?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title = 'Power, engineered for the next 30 years.',
  subtitle = 'Premium equipment, installed by our own certified crews, monitored for life. No subcontractors. No estimates presented as quotes.',
  ctaText = 'Get a Free Quote',
  heroImage = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2400&auto=format&fit=crop',
}) => {
  const navigateToQuote = useUIStore((s) => s.navigateToQuote);
  const navigateToProducts = useUIStore((s) => s.navigateToProducts);

  const scrollToSavings = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('savings');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split title if it contains <br /> or newlines
  const titleParts = title.includes('\n')
    ? title.split('\n')
    : title.includes('for the next')
    ? [title.replace('for the next 30 years.', '').trim(), 'for the next 30 years.']
    : [title];

  return (
    <section className="relative bg-onyx overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Solar panel array at dusk"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-onyx/60" aria-hidden="true" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-36 md:pb-32">
        <div className="max-w-3xl">
          <p className="eyebrow text-brass flex items-center gap-3">
            <span className="inline-block w-8 h-[2px] bg-brass" aria-hidden="true" />
            Premium solar · Est. 2009
          </p>
          <h1 className="font-serif-display text-cloud font-medium text-[clamp(2.75rem,6vw,5.25rem)] leading-[1.04] mt-6">
            {titleParts.map((part, idx) => (
              <React.Fragment key={idx}>
                {part}
                {idx < titleParts.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p className="text-cloud/70 text-lg md:text-xl leading-relaxed mt-6 max-w-xl">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-9">
            <button
              type="button"
              onClick={() => navigateToQuote()}
              className="btn btn-brass cursor-pointer"
            >
              {ctaText}
            </button>
            <button
              type="button"
              onClick={navigateToProducts}
              className="btn btn-ghost-light cursor-pointer"
            >
              View Systems
            </button>
          </div>
          <a
            href="#savings"
            onClick={scrollToSavings}
            className="inline-flex items-center gap-2 text-brass text-[15px] font-semibold mt-6 cursor-pointer"
          >
            Or estimate your savings in 30 seconds
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </a>
          <dl className="flex flex-wrap gap-x-10 gap-y-4 mt-12 pt-8 border-t border-cloud/15 text-cloud">
            <div>
              <dt className="text-[11px] tracking-[0.18em] uppercase text-cloud/50 font-semibold">
                Warranty
              </dt>
              <dd className="font-serif-display text-2xl mt-1">25 years</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-[0.18em] uppercase text-cloud/50 font-semibold">
                Installed
              </dt>
              <dd className="font-serif-display text-2xl mt-1">4,200+ systems</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-[0.18em] uppercase text-cloud/50 font-semibold">
                Rating
              </dt>
              <dd className="font-serif-display text-2xl mt-1">4.9 / 5</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};
