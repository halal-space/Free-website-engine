import React from 'react';
import { useUIStore } from '../stores/uiStore';

export const NotFoundPage: React.FC = () => {
  const { navigateToHome, navigateToProducts } = useUIStore();

  return (
    <div className="bg-onyx min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="text-center max-w-md mx-auto">
        <p className="eyebrow text-brass">404 · Page Not Found</p>
        <h1 className="font-serif-display text-cloud font-medium text-4xl sm:text-5xl mt-4">
          Circuit unbroken, but page not found.
        </h1>
        <p className="text-cloud/70 text-base mt-4 leading-relaxed">
          The requested system specification or service page cannot be found. Let us guide you back
          to our primary equipment and energy services.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <button
            type="button"
            onClick={navigateToHome}
            className="btn btn-brass cursor-pointer"
          >
            Return Home
          </button>
          <button
            type="button"
            onClick={navigateToProducts}
            className="btn btn-ghost-light cursor-pointer"
          >
            Browse Systems
          </button>
        </div>
      </div>
    </div>
  );
};
