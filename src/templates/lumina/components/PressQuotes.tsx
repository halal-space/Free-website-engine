'use client';

import React from 'react';
import { PRESS_QUOTES } from '../editorial';

interface PressQuotesProps {
  accentColor?: string;
}

export const PressQuotes: React.FC<PressQuotesProps> = ({ accentColor = '#C5A880' }) => {
  return (
    <section className="py-24 bg-[#FAF8F5] border-t border-[#E8E3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-16 space-y-2">
          <span
            className="text-[10px] tracking-ultra-wide uppercase font-medium"
            style={{ color: accentColor }}
          >
            Critical Reception
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#0C0C0D]">
            The International Press
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRESS_QUOTES.map((item) => (
            <div key={item.publication} className="p-6 bg-[#F5F2EB] border border-[#E8E3DA] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="font-serif text-sm tracking-widest uppercase font-semibold text-[#0C0C0D] block">
                  {item.publication}
                </span>
                <p className="text-xs text-[#52525B] font-light leading-relaxed italic">
                  {item.quote}
                </p>
              </div>
              <div className="pt-3 border-t border-[#E8E3DA] text-[10px] text-[#71717A] font-mono">
                <span>{item.author}</span> • <span>{item.issue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
