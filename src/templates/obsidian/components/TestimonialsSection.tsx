import React from 'react';
import { SectionHeading } from './SectionHeading';
import { testimonials } from '../data/site';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-ivory border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <SectionHeading
          eyebrow="Clients"
          title="Measured output. Kept promises."
          copy="A sample of post-install reviews. Full references available on request."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="reveal flex flex-col bg-cloud border border-line rounded-[2px] p-8"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex gap-1 text-brass" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-[15.5px] leading-relaxed text-onyx mt-5 flex-1">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-line">
                <p className="font-semibold text-[15px]">{t.name}</p>
                <p className="text-sm text-graphite mt-0.5">{t.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
