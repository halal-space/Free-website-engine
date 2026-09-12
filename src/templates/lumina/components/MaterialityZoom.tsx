'use client';

import React, { useState } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';
import { getProductById } from '../products';

interface MaterialityZoomProps {
  accentColor?: string;
}

export const MaterialityZoom: React.FC<MaterialityZoomProps> = ({ accentColor = '#C5A880' }) => {
  const { openQuickView } = useUIStore();

  const materials = [
    {
      id: 'cashmere',
      name: 'Mongolian Virgin Cashmere',
      grade: '14.5 µm Superfine · 750gsm Double-Faced',
      origin: 'Pastoral Cooperatives, Alashan Plateau & Biella',
      description: 'Sourced exclusively from spring molting of pastoral herds in the arid Alashan steppes. Spun in Italy without chemical bleaching to preserve the fiber’s natural thermal buoyancy and velvety loft.',
      textureImage: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop',
      garmentImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
      featuredProductId: 'prod-01',
      garmentName: 'The Monolith Double-Breasted Coat'
    },
    {
      id: 'silk',
      name: 'Mulberry Silk Charmeuse',
      grade: '40 Momme Ultra-Heavy Grade · True Bias',
      origin: 'Lake Como, Italy & Lyon Salons',
      description: 'A monolithic 40-momme weight rarely seen in contemporary pret-a-porter. Woven on traditional narrow shuttle looms with high twist warps to create a fluid, liquid drape with pearlescent lustre.',
      textureImage: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1200&auto=format&fit=crop',
      garmentImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop',
      featuredProductId: 'prod-04',
      garmentName: 'The Column Silk Satin Gown'
    },
    {
      id: 'wool',
      name: 'Super 150s High-Twist Fresco',
      grade: '340gsm Breathable 4-Ply Twist',
      origin: 'Biellese Alpine Mills, Northern Italy',
      description: 'Engineered for crisp, wrinkle-resistant architecture. Multiple wool yarns are hard-twisted together, producing an open porous weave that holds razor-sharp creases while breathing effortlessly.',
      textureImage: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1200&auto=format&fit=crop',
      garmentImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop',
      featuredProductId: 'prod-02',
      garmentName: 'The Sculpted Peak-Lapel Blazer'
    },
    {
      id: 'leather',
      name: 'French Box Calfskin',
      grade: 'Full-Grain · Hand-Beveled Edge Varnish',
      origin: 'Generational Tanneries, Alsace & Florence',
      description: 'Tanned using mineral and vegetable agents before being hand-glazed with agate stone rollers. The resulting surface exhibits a fine micro-pore grain that develops a deep patinated lustre over decades.',
      textureImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop',
      garmentImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop',
      featuredProductId: 'prod-10',
      garmentName: 'The Sculptural Calfskin Tote No. 1'
    }
  ];

  const [activeMaterial, setActiveMaterial] = useState(materials[0]);
  const [zoomLevel, setZoomLevel] = useState(false);

  const product = getProductById(activeMaterial.featuredProductId);

  return (
    <section id="materiality" className="py-24 bg-[#F5F2EB] border-y border-[#E8E3DA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#D4CDC3] gap-6">
          <div>
            <span
              className="text-[10px] tracking-ultra-wide uppercase block mb-2 font-medium"
              style={{ color: accentColor }}
            >
              Materiality & Tactility
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#0C0C0D] font-light">
              A Study in Fiber, Weave & Grain.
            </h2>
          </div>
          <p className="text-xs text-[#52525B] max-w-md leading-relaxed">
            Every garment begins with uncompromised materiality. Explore the tactile macro architecture of our 2026 textiles.
          </p>
        </div>

        {/* Material Selection Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {materials.map((mat) => (
            <button
              key={mat.id}
              onClick={() => {
                setActiveMaterial(mat);
                setZoomLevel(false);
              }}
              className={`p-4 text-left border transition-all cursor-pointer ${
                activeMaterial.id === mat.id
                  ? 'border-[#0C0C0D] bg-[#FAF8F5] shadow-md'
                  : 'border-[#D4CDC3] bg-transparent opacity-70 hover:opacity-100 hover:border-[#0C0C0D]'
              }`}
            >
              <span className="text-[9px] font-mono block uppercase mb-1" style={{ color: accentColor }}>
                Material 0{materials.indexOf(mat) + 1}
              </span>
              <h4 className="text-xs font-serif font-medium text-[#0C0C0D] truncate">{mat.name}</h4>
              <p className="text-[10px] text-[#71717A] truncate mt-0.5">{mat.grade.split('·')[0]}</p>
            </button>
          ))}
        </div>

        {/* Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] border border-[#D4CDC3] p-6 sm:p-10 shadow-lg">
          {/* Left: Interactive Fabric Macro View */}
          <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] bg-black overflow-hidden group">
            <img
              src={activeMaterial.textureImage}
              alt={`Macro weave of ${activeMaterial.name}`}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                zoomLevel ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
              }`}
              onClick={() => setZoomLevel(!zoomLevel)}
            />
            <div className="absolute top-4 left-4 z-10 bg-[#0C0C0D]/85 text-[#FAF8F5] px-3 py-1.5 text-[10px] tracking-widest uppercase backdrop-blur-sm">
              <span>{zoomLevel ? '200% Macro Magnification' : 'Click to Magnify Weave'}</span>
            </div>
            <div className="absolute bottom-4 right-4 z-10 bg-[#FAF8F5]/90 text-[#0C0C0D] px-2.5 py-1 text-[9px] font-mono backdrop-blur-sm">
              Macro Resolution 1:1
            </div>
          </div>

          {/* Right: Technical Spec & Garment Pairing */}
          <div className="lg:col-span-6 space-y-6 lg:pl-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] tracking-ultra-wide uppercase text-[#71717A] mb-1">
                <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span>Fiber Specification</span>
              </div>
              <h3 className="text-2xl font-serif font-light text-[#0C0C0D]">
                {activeMaterial.name}
              </h3>
              <p className="text-xs font-mono mt-1" style={{ color: accentColor }}>
                {activeMaterial.grade}
              </p>
            </div>

            <p className="text-xs text-[#52525B] leading-relaxed">
              {activeMaterial.description}
            </p>

            <div className="p-4 bg-[#F5F2EB] border border-[#E8E3DA] space-y-2">
              <div className="text-[10px] tracking-wider uppercase text-[#71717A]">
                Geographic Provenance
              </div>
              <p className="text-xs font-medium text-[#0C0C0D] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" style={{ color: accentColor }} />
                <span>{activeMaterial.origin}</span>
              </p>
            </div>

            {/* Garment realization card */}
            <div className="flex items-center justify-between p-4 border border-[#D4CDC3] bg-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-14 bg-[#F5F2EB] overflow-hidden">
                  <img
                    src={activeMaterial.garmentImage}
                    alt={activeMaterial.garmentName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#71717A]">Showcase Piece</span>
                  <h5 className="text-xs font-serif text-[#0C0C0D]">{activeMaterial.garmentName}</h5>
                </div>
              </div>

              {product && (
                <button
                  onClick={() => openQuickView(product)}
                  className="px-3 py-2 bg-[#0C0C0D] text-[#FAF8F5] text-[10px] tracking-wider uppercase hover:bg-[#C5A880] transition-colors cursor-pointer"
                >
                  Quick Inspect
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
