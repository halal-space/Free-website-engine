import React from 'react';
import { useUIStore } from '../stores/uiStore';

export default function NotFoundPage() {
  const { setView } = useUIStore();

  return (
    <main className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-[#C85A32] uppercase">Error 404</p>
      <h1 className="font-display mt-2 text-5xl font-semibold">This shelf is empty.</h1>
      <p className="mt-3 text-[15px] text-[#4A554D]">
        The page you're looking for moved, sold out, or never existed. The pantry, however, is fully
        stocked.
      </p>
      <div className="mt-6 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setView('home')}
          className="cursor-pointer rounded-full bg-[#1B241E] px-7 py-3 text-sm font-bold text-white hover:bg-[#3B583E] transition-colors"
        >
          Back home
        </button>
        <button
          type="button"
          onClick={() => setView('shop')}
          className="cursor-pointer rounded-full border border-[#1B241E]/20 px-7 py-3 text-sm font-bold hover:border-[#1B241E] transition-colors"
        >
          Shop all
        </button>
      </div>
    </main>
  );
}
