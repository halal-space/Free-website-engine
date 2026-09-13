'use client';

import React from 'react';
import { NewsletterForm } from './NewsletterForm';

interface NewsletterProps {
  heading?: string;
  subtitle?: string;
}

export const Newsletter: React.FC<NewsletterProps> = ({
  heading = 'Stay close to the little things.',
  subtitle = 'Sign up for new arrivals, thoughtful finds, and occasional offers.',
}) => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#F5F2EB] border border-[#E8E2D7] p-8 sm:p-14 lg:p-16 text-center overflow-hidden shadow-xs">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#B88B4A] font-semibold block">
              Private Journal & Dispatch
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-4xl font-medium text-[#1C1917] tracking-tight leading-tight">
              {heading}
            </h2>

            <p className="text-xs sm:text-sm text-[#575149] font-light leading-relaxed font-sans max-w-md mx-auto">
              {subtitle}
            </p>

            <div className="pt-4">
              <NewsletterForm />
            </div>

            <p className="text-[11px] text-[#877E73] pt-2">
              We honor your inbox tranquility. No spam, ever. Unsubscribe with a single click at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
