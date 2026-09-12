'use client';

import React from 'react';
import { COLLECTIONS } from '../collections';
import { PRODUCTS } from '../products';
import { ProductCard } from './ProductCard';
import { useUIStore } from '../stores/uiStore';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

interface CollectionsViewProps {
  accentColor?: string;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  accentColor = '#C5A880'
}) => {
  const { selectedCollectionSlug, setSelectedCollectionSlug, setActivePageView } = useUIStore();

  const selectedCollection = selectedCollectionSlug
    ? COLLECTIONS.find((c) => c.slug === selectedCollectionSlug)
    : null;

  if (selectedCollection) {
    const collectionProducts = PRODUCTS.filter((p) =>
      selectedCollection.featuredProductIds.includes(p.id)
    );

    return (
      <div className="bg-[#FAF8F5] min-h-[70vh]">
        {/* Full-Width Collection Hero Header */}
        <section className="relative w-full min-h-[55vh] bg-[#0C0C0D] text-[#FAF8F5] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={selectedCollection.heroImage}
              alt={selectedCollection.title}
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0D] via-[#0C0C0D]/50 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 w-full space-y-4">
            <button
              onClick={() => setSelectedCollectionSlug(null)}
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase hover:text-[#FAF8F5] transition-colors cursor-pointer"
              style={{ color: accentColor }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Collections</span>
            </button>

            <div className="text-[10px] font-mono tracking-ultra-wide uppercase text-[#A1A1AA]">
              {selectedCollection.season} {selectedCollection.year}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-[#FAF8F5] tracking-tight">
              {selectedCollection.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#D4CDC3] max-w-2xl font-light leading-relaxed">
              {selectedCollection.description}
            </p>
          </div>
        </section>

        {/* Curator Note & Spec Bar */}
        <section className="py-12 bg-[#FAF8F5] border-b border-[#E8E3DA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div
                className="md:col-span-8 p-6 bg-[#F5F2EB] border-l-2"
                style={{ borderColor: accentColor }}
              >
                <span className="text-[9px] font-mono tracking-widest uppercase text-[#71717A] block mb-1">
                  Curator’s Design Intent
                </span>
                <p className="text-xs sm:text-sm font-serif italic text-[#0C0C0D] leading-relaxed">
                  {selectedCollection.curatorNote}
                </p>
              </div>

              <div className="md:col-span-4 space-y-2 text-xs text-[#71717A] border-t md:border-t-0 md:border-l border-[#E8E3DA] md:pl-8">
                <div className="flex justify-between">
                  <span>Garments in Capsule</span>
                  <span className="font-mono text-[#0C0C0D] font-medium">
                    {collectionProducts.length} Pieces
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Provenance</span>
                  <span className="font-mono text-[#0C0C0D]">Italy & France</span>
                </div>
                <div className="flex justify-between">
                  <span>Availability</span>
                  <span className="font-mono" style={{ color: accentColor }}>
                    Archive In Stock
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Garments Grid */}
        <section className="py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="mb-10 pb-4 border-b border-[#E8E3DA] flex items-center justify-between">
              <h3 className="text-xl font-serif font-light text-[#0C0C0D]">
                Capsule Garments ({collectionProducts.length})
              </h3>
              <span className="text-xs font-mono text-[#71717A]">
                Mannequin & Flat Lay Presentations
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {collectionProducts.map((product) => (
                <ProductCard key={product.id} product={product} accentColor={accentColor} />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

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
            Curated Capsules
          </span>
        </div>

        {/* Section Header */}
        <div className="mb-16 pb-8 border-b border-[#E8E3DA] text-center max-w-3xl mx-auto space-y-3">
          <span
            className="text-[10px] tracking-ultra-wide uppercase block font-medium"
            style={{ color: accentColor }}
          >
            Haute Couture & Prêt-à-Porter Capsules
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-light text-[#0C0C0D] tracking-tight">
            Editorial Collections
          </h1>
          <p className="text-xs sm:text-sm text-[#52525B] font-light leading-relaxed">
            Each capsule represents an uninterrupted dialogue between architectural geometry and rare European textiles. Presented in high-resolution studio mannequin editorial photography.
          </p>
        </div>

        {/* Asymmetric Editorial Spreads */}
        <div className="space-y-24">
          {COLLECTIONS.map((col, idx) => (
            <div
              key={col.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Spread (2 images) */}
              <div
                className={`lg:col-span-7 grid grid-cols-12 gap-4 ${
                  idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div
                  onClick={() => setSelectedCollectionSlug(col.slug)}
                  className="col-span-8 aspect-[3/4] bg-[#0C0C0D] overflow-hidden border border-[#E8E3DA] shadow-lg group cursor-pointer"
                >
                  <img
                    src={col.heroImage}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                </div>
                <div
                  onClick={() => setSelectedCollectionSlug(col.slug)}
                  className="col-span-4 aspect-[2/3] self-end bg-[#0C0C0D] overflow-hidden border border-[#E8E3DA] shadow-md group cursor-pointer"
                >
                  <img
                    src={col.secondaryImage}
                    alt={`${col.title} detail view`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                </div>
              </div>

              {/* Text & Curator Notes */}
              <div
                className={`lg:col-span-5 space-y-6 ${
                  idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div>
                  <span
                    className="text-[10px] font-mono tracking-widest uppercase block mb-1"
                    style={{ color: accentColor }}
                  >
                    Capsule 0{idx + 1} • {col.season} {col.year}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#0C0C0D] leading-tight">
                    {col.title}
                  </h2>
                  <p className="text-xs font-mono text-[#71717A] mt-1">{col.tagline}</p>
                </div>

                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-light">
                  {col.description}
                </p>

                <blockquote
                  className="p-4 bg-[#F5F2EB] border-l-2 text-xs italic text-[#0C0C0D] font-serif leading-relaxed"
                  style={{ borderColor: accentColor }}
                >
                  {col.curatorNote}
                </blockquote>

                <div className="pt-2 flex items-center gap-6">
                  <button
                    onClick={() => setSelectedCollectionSlug(col.slug)}
                    className="bg-[#0C0C0D] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#FAF8F5] px-6 py-3.5 text-xs tracking-ultra-wide uppercase transition-colors inline-flex items-center gap-2 font-medium cursor-pointer"
                  >
                    <span>Explore Capsule ({col.featuredProductIds.length} Pieces)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
