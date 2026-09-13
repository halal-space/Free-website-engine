import React from 'react';
import { useUIStore } from '../stores/uiStore';

export const NotFoundPage: React.FC = () => {
  const { navigateToHome, navigateToShop } = useUIStore();

  return (
    <section className="container-luxe flex min-h-[70dvh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow mb-6 text-gold">Error 404</p>
      <h1 className="font-serif text-[clamp(3rem,8vw,5.5rem)] leading-none">
        A page, <span className="italic text-bronze">unlike your skin,</span>
        <br />
        was not found.
      </h1>
      <p className="mt-6 max-w-sm text-sm leading-relaxed text-smoke">
        The address you followed may have moved or never existed. Let us guide you back to beauty.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={() => navigateToHome()}
          className="rounded-full bg-ink px-8 py-4 eyebrow text-ivory transition-colors duration-500 hover:bg-champagne hover:text-ink cursor-pointer"
        >
          Return Home
        </button>
        <button
          type="button"
          onClick={() => navigateToShop()}
          className="rounded-full border border-line-strong px-8 py-4 eyebrow transition-all duration-300 hover:border-ink cursor-pointer"
        >
          Shop the Collection
        </button>
      </div>
    </section>
  );
};
