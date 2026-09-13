import React from 'react';
import { useUIStore } from '../stores/uiStore';

interface MobileBottomBarProps {
  phone?: string;
  ctaText?: string;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  phone = '+44 20 4577 1200',
  ctaText = 'Get a Free Quote',
}) => {
  const navigateToQuote = useUIStore((s) => s.navigateToQuote);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-onyx border-t border-line-dark grid grid-cols-2">
        <a
          href={`tel:${phone.replace(/\s+/g, '')}`}
          className="flex items-center justify-center gap-2 text-cloud font-semibold text-[15px] py-4 cursor-pointer"
          aria-label={`Call ${phone}`}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Call now
        </a>
        <button
          type="button"
          onClick={() => navigateToQuote()}
          className="flex items-center justify-center gap-2 bg-brass text-onyx font-semibold text-[15px] py-4 cursor-pointer"
        >
          {ctaText}
        </button>
      </div>
      <div className="h-[57px] md:hidden" aria-hidden="true" />
    </>
  );
};
