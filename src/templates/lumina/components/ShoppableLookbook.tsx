'use client';

import React, { useState } from 'react';
import { LOOKBOOK_ITEMS } from '../editorial';
import { getProductById } from '../products';
import { useCartStore } from '../stores/cartStore';
import { useUIStore } from '../stores/uiStore';
import { Plus, ArrowRight, Eye, ShoppingBag, X } from 'lucide-react';
import type { Product } from '../types';

interface ShoppableLookbookProps {
  accentColor?: string;
}

export const ShoppableLookbook: React.FC<ShoppableLookbookProps> = ({ accentColor = '#C5A880' }) => {
  const { formatPrice, addItem } = useCartStore();
  const { openQuickView, showToast } = useUIStore();

  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [selectedHotspotProduct, setSelectedHotspotProduct] = useState<Product | null>(null);

  const currentLook = LOOKBOOK_ITEMS[activeLookIndex];

  const handleHotspotClick = (productId: string) => {
    const prod = getProductById(productId);
    if (prod) {
      setSelectedHotspotProduct(prod);
    }
  };

  const handleQuickAdd = (product: Product) => {
    const defaultColor = product.colors[0]?.name || 'Standard';
    const defaultSize = product.sizes.find((s) => s.inStock)?.name || product.sizes[0]?.name || 'Standard';
    addItem(product, defaultColor, defaultSize, 1);
    showToast({
      title: 'Added to Atelier Bag',
      description: `${product.name} (${defaultSize})`,
      type: 'cart'
    });
    setSelectedHotspotProduct(null);
  };

  return (
    <section id="lookbook" className="py-24 bg-[#0C0C0D] text-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#2A2A2E] gap-6">
          <div>
            <div
              className="flex items-center gap-2 text-[10px] tracking-ultra-wide uppercase mb-2 font-medium"
              style={{ color: accentColor }}
            >
              <span>Haute Couture Editorial</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#FAF8F5]">
              Shoppable Runway Lookbook
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {LOOKBOOK_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveLookIndex(idx);
                  setSelectedHotspotProduct(null);
                }}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeLookIndex === idx
                    ? 'bg-[#FAF8F5] text-[#0C0C0D]'
                    : 'bg-[#18181B] text-[#A1A1AA] hover:text-[#FAF8F5]'
                }`}
              >
                {item.lookNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Main Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Center: Interactive Lookbook Image with Shoppable Hotspots */}
          <div className="lg:col-span-8 relative aspect-[4/5] sm:aspect-[16/11] bg-[#141416] overflow-hidden border border-[#2A2A2E] group">
            <img
              src={currentLook.image}
              alt={currentLook.title}
              className="w-full h-full object-cover brightness-95"
            />

            {/* Look Tag */}
            <div
              className="absolute top-4 left-4 z-10 bg-[#0C0C0D]/80 backdrop-blur-md px-3 py-1.5 text-xs font-mono border"
              style={{ color: accentColor, borderColor: `${accentColor}4D` }}
            >
              {currentLook.lookNumber} • {currentLook.season}
            </div>

            {/* Interactive Pins / Hotspots */}
            {currentLook.hotspots.map((spot, idx) => {
              const product = getProductById(spot.productId);
              if (!product) return null;
              const isSelected = selectedHotspotProduct?.id === product.id;

              return (
                <div
                  key={idx}
                  className="absolute z-20"
                  style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <button
                    onClick={() => handleHotspotClick(product.id)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xl relative ${
                      isSelected
                        ? 'bg-[#C5A880] text-black scale-125 ring-4 ring-[#C5A880]/40'
                        : 'bg-[#FAF8F5] text-[#0C0C0D] hover:scale-125 hover:bg-[#C5A880]'
                    }`}
                    style={isSelected ? { backgroundColor: accentColor } : undefined}
                    aria-label={`Inspect ${product.name}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span className="absolute inset-0 rounded-full animate-ping bg-white/30 pointer-events-none" />
                  </button>
                </div>
              );
            })}

            {/* Mobile/inline tooltip popup if hotspot clicked */}
            {selectedHotspotProduct && (
              <div
                className="absolute bottom-4 left-4 right-4 z-30 bg-[#0C0C0D]/95 backdrop-blur-xl border p-4 flex items-center justify-between gap-4 animate-fade-in-up sm:hidden"
                style={{ borderColor: accentColor }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 bg-black overflow-hidden shrink-0">
                    <img
                      src={selectedHotspotProduct.images[0].url}
                      alt={selectedHotspotProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="text-xs font-serif text-[#FAF8F5] line-clamp-1">{selectedHotspotProduct.name}</h5>
                    <p className="text-xs font-mono" style={{ color: accentColor }}>
                      {formatPrice(selectedHotspotProduct.price)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openQuickView(selectedHotspotProduct)}
                    className="p-2 bg-[#FAF8F5] text-[#0C0C0D] text-[10px] uppercase"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setSelectedHotspotProduct(null)}
                    className="p-2 text-[#71717A]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Look Breakdown & Garment List */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span
                className="text-[9px] font-mono tracking-widest uppercase block mb-1"
                style={{ color: accentColor }}
              >
                {currentLook.season} Archive
              </span>
              <h3 className="text-xl font-serif text-[#FAF8F5] font-light leading-snug">
                {currentLook.title}
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed mt-2">
                {currentLook.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#2A2A2E]">
              <span className="text-[10px] tracking-ultra-wide uppercase text-[#71717A] block mb-3">
                Garments in this Look ({currentLook.hotspots.length})
              </span>

              <div className="space-y-3">
                {currentLook.hotspots.map((spot, idx) => {
                  const product = getProductById(spot.productId);
                  if (!product) return null;
                  const isSelected = selectedHotspotProduct?.id === product.id;

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedHotspotProduct(product)}
                      className={`p-3 border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-[#C5A880] bg-[#1E1E20]'
                          : 'border-[#2A2A2E] bg-[#141416] hover:border-[#52525B]'
                      }`}
                      style={isSelected ? { borderColor: accentColor } : undefined}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-12 bg-black shrink-0 overflow-hidden">
                          <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-serif text-[#FAF8F5] truncate">{product.name}</h5>
                          <span className="text-xs font-mono text-[#D4CDC3] block">{formatPrice(product.price)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openQuickView(product);
                          }}
                          className="p-1.5 bg-[#2A2A2E] hover:bg-[#FAF8F5] hover:text-[#0C0C0D] text-[#FAF8F5] transition-colors cursor-pointer"
                          title="Quick View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickAdd(product);
                          }}
                          className="p-1.5 hover:opacity-90 text-black transition-colors cursor-pointer"
                          style={{ backgroundColor: accentColor }}
                          title="Quick Add to Bag"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#collections"
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase hover:text-[#FAF8F5] transition-colors"
                style={{ color: accentColor }}
              >
                <span>View Full Editorial Lookbook Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
