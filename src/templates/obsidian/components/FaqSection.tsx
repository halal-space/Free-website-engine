import React from 'react';
import { SectionHeading } from './SectionHeading';
import { FaqAccordion } from './FaqAccordion';
import { useUIStore } from '../stores/uiStore';

export const FaqSection: React.FC = () => {
  const navigateToFaq = useUIStore((s) => s.navigateToFaq);

  return (
    <section className="bg-ivory border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">
        <div className="reveal">
          <SectionHeading eyebrow="Questions" title="Asked on nearly every survey." />
          <button
            type="button"
            onClick={navigateToFaq}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brass-dark mt-6 cursor-pointer hover:underline"
          >
            All 10 questions
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
        </div>
        <div className="reveal" style={{ transitionDelay: '100ms' }}>
          <FaqAccordion limit={6} idPrefix="home-faq" />
        </div>
      </div>
    </section>
  );
};
