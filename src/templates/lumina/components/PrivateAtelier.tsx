'use client';

import React from 'react';
import { Scissors, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';

interface PrivateAtelierProps {
  accentColor?: string;
  onBookFitting?: () => void;
}

export const PrivateAtelier: React.FC<PrivateAtelierProps> = ({
  accentColor = '#C5A880',
  onBookFitting
}) => {
  const { setActivePageView } = useUIStore();

  return (
    <section className="py-24 bg-[#FAF8F5] border-t border-[#E8E3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="bg-[#0C0C0D] text-[#FAF8F5] p-8 sm:p-14 lg:p-18 border border-[#2A2A2E] relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl">
          <div className="lg:col-span-8 space-y-6 z-10">
            <div
              className="inline-flex items-center gap-2 text-[10px] tracking-ultra-wide uppercase"
              style={{ color: accentColor }}
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Private Atelier Services</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-serif font-light text-[#FAF8F5] leading-tight">
              Schedule a Private Salon Consultation with our Master Tailors.
            </h3>

            <p className="text-xs sm:text-sm text-[#D4CDC3] font-light leading-relaxed max-w-2xl">
              Experience bespoke measurements, personal cloth selection, and private archive previews at our flagship salons in Paris, Milan, London, New York, or via secure digital concierge.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => {
                  if (onBookFitting) {
                    onBookFitting();
                  } else {
                    setActivePageView('appointments');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="bg-[#FAF8F5] text-[#0C0C0D] hover:bg-[#C5A880] hover:text-[#FAF8F5] px-8 py-4 text-xs tracking-ultra-wide uppercase transition-colors font-medium cursor-pointer"
              >
                Book Private Salon Fitting
              </button>
              <button
                onClick={() => {
                  setActivePageView('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="border border-[#FAF8F5]/30 hover:border-[#FAF8F5] text-[#FAF8F5] px-8 py-4 text-xs tracking-ultra-wide uppercase transition-colors cursor-pointer"
              >
                The Atelier Heritage
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4 border-t lg:border-t-0 lg:border-l border-[#2A2A2E] lg:pl-10 text-xs text-[#A1A1AA] z-10">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accentColor }} />
              <div>
                <strong className="text-[#FAF8F5] block text-[11px] uppercase tracking-wider">Paris Haute Salon</strong>
                <span>18 Rue du Faubourg Saint-Honoré</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accentColor }} />
              <div>
                <strong className="text-[#FAF8F5] block text-[11px] uppercase tracking-wider">Salon Hours</strong>
                <span>Tuesday – Saturday • 10:00 – 19:00</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accentColor }} />
              <div>
                <strong className="text-[#FAF8F5] block text-[11px] uppercase tracking-wider">White-Glove Delivery</strong>
                <span>Discreet insured hand delivery worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
