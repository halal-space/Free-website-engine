import React from 'react';
import { useUIStore } from '../stores/uiStore';

export default function PantryCtaSection() {
  const { setView } = useUIStore();

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <div className="flex flex-col items-center rounded-[24px] bg-[#3B583E] px-6 py-12 text-center text-[#FBF9F5]">
        <h2 className="font-display max-w-xl text-3xl font-semibold sm:text-4xl">
          Pantry staples, minus the guesswork.
        </h2>
        <p className="mt-3 max-w-md text-sm opacity-80">
          Subscribe to your rituals and save 10%. Pause, swap or cancel anytime.
        </p>
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('bestsellers');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else setView('shop');
          }}
          className="mt-6 cursor-pointer rounded-full bg-[#FBF9F5] px-7 py-3.5 text-sm font-bold text-[#1B241E] transition-colors duration-200 hover:bg-[#F3D27A]"
        >
          Start with best-sellers
        </button>
      </div>
    </section>
  );
}
