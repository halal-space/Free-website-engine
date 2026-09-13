import React, { useState } from 'react';
import { faqs } from '../data/faq';

interface FaqAccordionProps {
  limit?: number;
  idPrefix?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  limit = faqs.length,
  idPrefix = 'faq',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = faqs.slice(0, limit);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="divide-y divide-line border-y border-line" data-faq>
      {items.map((f, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="py-1">
            <h3>
              <button
                type="button"
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 text-left py-5 cursor-pointer group"
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-panel-${i}`}
                id={`${idPrefix}-btn-${i}`}
              >
                <span className="font-medium text-[16px] group-hover:text-brass-dark transition-colors duration-200">
                  {f.q}
                </span>
                <span
                  className="shrink-0 w-8 h-8 flex items-center justify-center border border-line rounded-[2px] text-brass-dark transition-transform duration-200"
                  aria-hidden="true"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
            </h3>
            {isOpen && (
              <div
                id={`${idPrefix}-panel-${i}`}
                role="region"
                aria-labelledby={`${idPrefix}-btn-${i}`}
                className="pb-6"
              >
                <p className="text-graphite text-[15px] leading-relaxed max-w-3xl">{f.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
