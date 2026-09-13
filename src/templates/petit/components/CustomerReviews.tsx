'use client';

import React from 'react';
import { storeReviews } from '../data/reviews';
import { Star, Check } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';

export const CustomerReviews: React.FC = () => {
  const { navigateToProduct } = useUIStore();

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#B88B4A] font-semibold block mb-2">
            Shared Stories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] tracking-tight">
            Words from Our Families
          </h2>
          <p className="text-xs sm:text-sm text-[#877E73] mt-2 font-sans">
            Authentic reflections from parents and caregivers who cherish quality, calm aesthetics, and intentional living.
          </p>
        </div>

        {/* 4 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {storeReviews.map((review) => (
            <div
              key={review.id}
              className="p-8 rounded-3xl bg-white border border-[#E8E2D7] shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Stars & Verified */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#B88B4A]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#3D6B4F] bg-[#EBF4EE] px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium">
                    <Check className="w-3 h-3" /> Verified Patron
                  </span>
                </div>

                {/* Quote */}
                <p className="font-serif text-base sm:text-lg text-[#1C1917] italic leading-relaxed">
                  "{review.quote}"
                </p>
              </div>

              {/* Reviewer Details & Product Reference */}
              <div className="pt-4 border-t border-[#E8E2D7]/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#E8E2D7]"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-[#1C1917] font-sans">
                      {review.author}
                    </h4>
                    <p className="text-[11px] text-[#877E73]">
                      {review.role} • {review.location}
                    </p>
                  </div>
                </div>

                {review.productName && (
                  <button
                    onClick={() => navigateToProduct(review.productSlug)}
                    className="hidden sm:block text-[11px] text-[#877E73] hover:text-[#B88B4A] underline text-right max-w-[160px] truncate cursor-pointer"
                  >
                    Re: {review.productName}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
