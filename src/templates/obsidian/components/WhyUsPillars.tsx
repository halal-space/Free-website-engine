import React from 'react';
import { SectionHeading } from './SectionHeading';
import { useUIStore } from '../stores/uiStore';

export const WhyUsPillars: React.FC = () => {
  const { navigateToProducts, navigateToServices } = useUIStore();

  return (
    <section className="bg-cloud">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <SectionHeading
          eyebrow="Why Obsidian"
          title="Three disciplines. One accountable firm."
          copy="Most solar companies sell equipment or labour. We do both, in-house, to an engineered standard."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          {/* Pillar 1 */}
          <article className="reveal bg-cloud border border-line rounded-[2px] p-8 hover:border-brass transition-colors duration-200">
            <span
              className="inline-flex w-12 h-12 items-center justify-center rounded-[2px] bg-onyx text-brass"
              aria-hidden="true"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="1" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="9" x2="9" y2="21" />
                <line x1="3" y1="14" x2="21" y2="14" />
                <line x1="14" y1="9" x2="14" y2="21" />
              </svg>
            </span>
            <h3 className="font-serif-display text-2xl mt-6">Premium Equipment</h3>
            <p className="text-graphite text-[15px] leading-relaxed mt-3">
              Tier-1 panels, LFP batteries and hybrid inverters we install at volume. Every unit
              batch-tested. Nothing white-labelled.
            </p>
            <button
              type="button"
              onClick={navigateToProducts}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brass-dark mt-5 cursor-pointer hover:underline"
            >
              Browse equipment{' '}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </article>

          {/* Pillar 2 */}
          <article
            className="reveal bg-cloud border border-line rounded-[2px] p-8 hover:border-brass transition-colors duration-200"
            style={{ transitionDelay: '100ms' }}
          >
            <span
              className="inline-flex w-12 h-12 items-center justify-center rounded-[2px] bg-onyx text-brass"
              aria-hidden="true"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
                <path d="M18 8l2 2 3-3" />
              </svg>
            </span>
            <h3 className="font-serif-display text-2xl mt-6">Expert Installation</h3>
            <p className="text-graphite text-[15px] leading-relaxed mt-3">
              Our own MCS and NICEIC crews. No subcontractors. Structural survey, panel-level design
              and commissioning as standard.
            </p>
            <button
              type="button"
              onClick={() => navigateToServices('residential')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brass-dark mt-5 cursor-pointer hover:underline"
            >
              How we install{' '}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </article>

          {/* Pillar 3 */}
          <article
            className="reveal bg-cloud border border-line rounded-[2px] p-8 hover:border-brass transition-colors duration-200"
            style={{ transitionDelay: '200ms' }}
          >
            <span
              className="inline-flex w-12 h-12 items-center justify-center rounded-[2px] bg-onyx text-brass"
              aria-hidden="true"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-3.6 8-10V5l-8-3-8 3v7c0 6.4 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </span>
            <h3 className="font-serif-display text-2xl mt-6">Lifetime Support</h3>
            <p className="text-graphite text-[15px] leading-relaxed mt-3">
              Remote monitoring on every system. We detect faults before you do. Annual service,
              same-week response, 25-year cover.
            </p>
            <button
              type="button"
              onClick={() => navigateToServices('maintenance')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brass-dark mt-5 cursor-pointer hover:underline"
            >
              Service plans{' '}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </article>
        </div>
      </div>
    </section>
  );
};
