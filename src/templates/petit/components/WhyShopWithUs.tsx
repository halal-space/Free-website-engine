'use client';

import React from 'react';
import { CheckCircle2, ShieldCheck, HeartHandshake, PackageCheck } from 'lucide-react';

const BENEFITS = [
  {
    title: 'Carefully selected products',
    description: 'Every article undergoes rigorous scrutiny for developmental ergonomics, non-toxic purity, and heirloom beauty before joining our boutique.',
    icon: CheckCircle2,
  },
  {
    title: 'Quality you can trust',
    description: 'Crafted exclusively from GOTS organic textiles, FSC European woods, and surgical stainless steel engineered to outlast early childhood.',
    icon: ShieldCheck,
  },
  {
    title: 'Easy and convenient shopping',
    description: 'Complimentary shipping over $75, seamless mobile ordering, and 30-day effortless doorstep returns so you can focus on family.',
    icon: PackageCheck,
  },
  {
    title: 'Thoughtful customer care',
    description: 'Our knowledgeable concierge team consists of parents who personally understand every feeding phase, nap transition, and milestone.',
    icon: HeartHandshake,
  },
];

export const WhyShopWithUs: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#F5F2EB]/60 border-y border-[#E8E2D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#B88B4A] font-semibold block mb-1">
            The Maison Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] tracking-tight">
            Why Shop With Us
          </h2>
          <p className="text-xs sm:text-sm text-[#877E73] mt-2">
            A quiet sanctuary of quality and trust in a world of fast retail.
          </p>
        </div>

        {/* 4 Clean Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {BENEFITS.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="p-6 sm:p-7 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D7] shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8E2D7] flex items-center justify-center text-[#1C1917] shadow-xs">
                  <Icon className="w-5 h-5 text-[#B88B4A] stroke-[1.75]" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-base font-semibold text-[#1C1917]">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-[#575149] leading-relaxed font-sans font-light">
                    {benefit.description}
                  </p>
                </div>

                <div className="text-[10px] text-[#877E73] font-mono">
                  0{idx + 1} / STANDARD
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
