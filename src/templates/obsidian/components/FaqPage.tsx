import React from 'react';
import { FaqAccordion } from './FaqAccordion';
import { useUIStore } from '../stores/uiStore';

export const FaqPage: React.FC = () => {
  const navigateToQuote = useUIStore((s) => s.navigateToQuote);

  return (
    <div>
      <section className="bg-onyx">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="eyebrow text-brass flex items-center gap-3">
            <span className="inline-block w-6 h-[2px] bg-brass" />
            FAQ
          </p>
          <h1 className="font-serif-display text-cloud font-medium text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] mt-4 max-w-3xl">
            Straight answers. No sales gloss.
          </h1>
          <p className="text-cloud/70 text-lg mt-4 max-w-xl">
            Still unsure after reading?{' '}
            <button
              type="button"
              onClick={() => navigateToQuote()}
              className="text-brass font-semibold cursor-pointer underline underline-offset-2"
            >
              Ask an engineer
            </button>{' '}
            — one working day response.
          </p>
        </div>
      </section>

      <section className="bg-cloud">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div>
            <FaqAccordion idPrefix="faq-page" />
          </div>
          <div className="mt-10 bg-onyx rounded-[2px] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="font-serif-display text-cloud text-2xl">Question not covered?</h2>
              <p className="text-cloud/70 text-[15px] mt-1.5">
                Call or write. An engineer replies, not a call centre.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                type="button"
                onClick={() => navigateToQuote()}
                className="btn btn-brass cursor-pointer"
              >
                Get a Free Quote
              </button>
              <a
                href="tel:+442045771200"
                className="btn btn-ghost-light cursor-pointer text-center"
              >
                +44 20 4577 1200
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
