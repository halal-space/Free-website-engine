'use client';

import React from 'react';
import { ShieldCheck, Scissors, Award, ArrowLeft } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';

interface AboutViewProps {
  storeName?: string;
  accentColor?: string;
}

export const AboutView: React.FC<AboutViewProps> = ({
  storeName = 'ATELIER VÉLÈNE',
  accentColor = '#C5A880'
}) => {
  const { setActivePageView } = useUIStore();

  return (
    <div className="py-16 sm:py-24 bg-[#FAF8F5] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Sub-Navigation / Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setActivePageView('home')}
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#71717A] hover:text-[#0C0C0D] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Maison Home</span>
          </button>
          <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider">
            Heritage & Provenance
          </span>
        </div>

        {/* Section Header */}
        <div className="mb-16 pb-8 border-b border-[#E8E3DA] text-center max-w-3xl mx-auto space-y-3">
          <span
            className="text-[10px] tracking-ultra-wide uppercase block font-medium"
            style={{ color: accentColor }}
          >
            Maison Heritage & Philosophy
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-light text-[#0C0C0D] tracking-tight">
            Architectural Form in Silence
          </h1>
          <p className="text-xs sm:text-sm text-[#52525B] font-light leading-relaxed">
            Founded upon radical material purity, architectural discipline, and generational European craftsmanship.
          </p>
        </div>

        {/* Main Manifesto Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 aspect-[4/5] bg-[#0C0C0D] overflow-hidden border border-[#E8E3DA] shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop"
              alt="Artisanal tailor chalk lines and shears on wool cloth"
              className="w-full h-full object-cover brightness-90"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span
              className="text-[10px] font-mono tracking-widest uppercase block"
              style={{ color: accentColor }}
            >
              Chapter I • The Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#0C0C0D] leading-tight">
              Rejecting the Ephemeral. Embracing the Monolith.
            </h2>
            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-light">
              {storeName} was established with a singular, uncompromising ambition: to build garments that exist outside the fast-moving cycle of seasonal fashion. We view clothing not as decorative surface, but as wearable architectural structure that alters posture, silhouette, and presence.
            </p>
            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-light">
              Every piece is cut with obsessive mathematical balance—from the 750gsm weight of our double-faced cashmere overcoats to the precision bias drape of our 40-momme silk satin gowns.
            </p>
            <div
              className="p-5 bg-[#F5F2EB] border-l-2 space-y-2"
              style={{ borderColor: accentColor }}
            >
              <span className="text-[10px] tracking-widest uppercase text-[#71717A] block font-mono">
                The Atelier Rule
              </span>
              <p className="text-xs font-serif italic text-[#0C0C0D]">
                “If a seam does not serve structural integrity or natural body movement, it is eliminated.”
              </p>
            </div>
          </div>
        </div>

        {/* Three Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-y border-[#E8E3DA] mb-24">
          <div className="p-6 bg-[#F5F2EB] border border-[#E8E3DA] space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#0C0C0D] flex items-center justify-center" style={{ color: accentColor }}>
              <Scissors className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#0C0C0D]">Generational Sartorial Craft</h3>
            <p className="text-xs text-[#52525B] leading-relaxed font-light">
              Our tailored blazers and overcoats are hand-stitched by master artisans in Biella and Milan, employing floating horsehair canvas that molds organically to the wearer's anatomy over time.
            </p>
          </div>

          <div className="p-6 bg-[#F5F2EB] border border-[#E8E3DA] space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#0C0C0D] flex items-center justify-center" style={{ color: accentColor }}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#0C0C0D]">Radical Fiber Provenance</h3>
            <p className="text-xs text-[#52525B] leading-relaxed font-light">
              We source 14.5µm un-dyed cashmere directly from pastoral cooperatives in the Mongolian steppes. Free from chemical bleaches, preserving the natural tactile resilience of the virgin fiber.
            </p>
          </div>

          <div className="p-6 bg-[#F5F2EB] border border-[#E8E3DA] space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#0C0C0D] flex items-center justify-center" style={{ color: accentColor }}>
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#0C0C0D]">Numbered Archive Editions</h3>
            <p className="text-xs text-[#52525B] leading-relaxed font-light">
              Each limited-run garment is individually stamped with its edition number and accompanied by a physical and digital Certificate of Provenance registered in the Maison archive.
            </p>
          </div>
        </div>

        {/* Flagship Boutiques & Salons */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <span
              className="text-[10px] tracking-ultra-wide uppercase"
              style={{ color: accentColor }}
            >
              Global Salons
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#0C0C0D]">
              Visit The Atelier Salons
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-[#E8E3DA] space-y-3">
              <span className="text-[10px] font-mono uppercase" style={{ color: accentColor }}>
                Flagship 01
              </span>
              <h4 className="font-serif text-base text-[#0C0C0D]">PARIS</h4>
              <p className="text-xs text-[#71717A]">18 Rue du Faubourg Saint-Honoré, 75008 Paris, France</p>
              <p className="text-[11px] text-[#52525B] pt-2 border-t border-[#F5F2EB]">Private fitting salon by appointment</p>
            </div>

            <div className="p-6 bg-white border border-[#E8E3DA] space-y-3">
              <span className="text-[10px] font-mono uppercase" style={{ color: accentColor }}>
                Flagship 02
              </span>
              <h4 className="font-serif text-base text-[#0C0C0D]">MILAN</h4>
              <p className="text-xs text-[#71717A]">Via Montenapoleone 14, 20121 Milano, Italy</p>
              <p className="text-[11px] text-[#52525B] pt-2 border-t border-[#F5F2EB]">Master bespoke tailoring studio</p>
            </div>

            <div className="p-6 bg-white border border-[#E8E3DA] space-y-3">
              <span className="text-[10px] font-mono uppercase" style={{ color: accentColor }}>
                Flagship 03
              </span>
              <h4 className="font-serif text-base text-[#0C0C0D]">NEW YORK</h4>
              <p className="text-xs text-[#71717A]">840 Madison Avenue, New York, NY 10021, USA</p>
              <p className="text-[11px] text-[#52525B] pt-2 border-t border-[#F5F2EB]">Private penthouse archive suite</p>
            </div>

            <div className="p-6 bg-white border border-[#E8E3DA] space-y-3">
              <span className="text-[10px] font-mono uppercase" style={{ color: accentColor }}>
                Flagship 04
              </span>
              <h4 className="font-serif text-base text-[#0C0C0D]">TOKYO</h4>
              <p className="text-xs text-[#71717A]">6-10-1 Ginza, Chuo-ku, Tokyo 104-0061, Japan</p>
              <p className="text-[11px] text-[#52525B] pt-2 border-t border-[#F5F2EB]">Architectural salon & tea room</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
