'use client';

import React from 'react';
import { ShieldCheck, Leaf, Award, ArrowRight } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';

export const AboutPage: React.FC = () => {
  const { navigateToShop } = useUIStore();

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-widest text-[#B88B4A] font-semibold block mb-2">
            The Maison Journey
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[#1C1917] tracking-tight leading-tight">
            Crafted for the Little Moments that Shape a Lifetime
          </h1>
          <p className="text-sm sm:text-base text-[#575149] mt-4 font-light leading-relaxed font-sans">
            Maison Petit was born from a desire shared by modern parents: to find everyday essentials that honor a child’s delicate nature while reflecting a serene, thoughtfully curated home.
          </p>
        </div>

        {/* Hero Lifestyle Photo */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-20 bg-[#EAE3D5] border border-[#E8E2D7]">
          <div className="aspect-16/9 lg:aspect-21/9 w-full">
            <img
              src="https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=2000&q=85"
              alt="Children playing with natural wooden toys in sunlit room"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Brand Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 bg-white rounded-3xl border border-[#E8E2D7] shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EDF3EC] flex items-center justify-center text-[#3D6B4F]">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1C1917]">
              Natural & Organic Sourcing
            </h3>
            <p className="text-xs sm:text-sm text-[#575149] font-light leading-relaxed">
              We partner exclusively with certified organic agricultural growers in Portugal and France. Free from harmful pesticides, harsh bleach, and artificial finishes.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-[#E8E2D7] shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF1E6] flex items-center justify-center text-[#B88B4A]">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1C1917]">
              Generational Craftsmanship
            </h3>
            <p className="text-xs sm:text-sm text-[#575149] font-light leading-relaxed">
              From FSC-certified alpine beechwood to double-stitched cotton hems, our objects are made to be passed down between siblings, cousins, and future generations.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-[#E8E2D7] shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF3F8] flex items-center justify-center text-[#5F738A]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1C1917]">
              Uncompromising Safety
            </h3>
            <p className="text-xs sm:text-sm text-[#575149] font-light leading-relaxed">
              Every product passes independent European EN71 and US ASTM safety trials. Zero BPA, phthalates, lead, PVC, or hormone-disrupting chemicals.
            </p>
          </div>
        </div>

        {/* Sustainable Packaging & Gifting Callout */}
        <div className="bg-[#F5F2EB] border border-[#E8E2D7] rounded-3xl p-8 sm:p-14 mb-20">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#B88B4A] font-semibold block">
              Conscious Packaging
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1917]">
              Zero Plastic, 100% Recyclable Luxury
            </h2>
            <p className="text-xs sm:text-sm text-[#575149] font-light leading-relaxed">
              Your parcel arrives in FSC-certified boxes crafted from post-consumer recycled paper, wrapped with unbleached organic cotton ribbon, and cushioned with biodegradable vegetable starch. Beautiful enough to gift directly without rewrapping.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateToShop()}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1C1917] hover:bg-[#B88B4A] text-white text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer"
              >
                <span>Explore The Boutique</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
