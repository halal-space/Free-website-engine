'use client';

import React, { useState } from 'react';
import type { Product } from '../types';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useUIStore } from '../stores/uiStore';
import { getProductById, PRODUCTS } from '../products';
import { ProductCard } from './ProductCard';
import {
  Heart,
  ShoppingBag,
  Ruler,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronDown,
  Plus,
  Minus,
  Check,
  Maximize2,
  X,
  ArrowLeft
} from 'lucide-react';

interface ProductDetailViewProps {
  product?: Product;
  accentColor?: string;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product: propProduct,
  accentColor = '#C5A880'
}) => {
  const { formatPrice, addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { setSizeGuideOpen, showToast, selectedProductSlug, setSelectedProductSlug, setActivePageView } = useUIStore();

  const product = propProduct || PRODUCTS.find((p) => p.slug === selectedProductSlug) || PRODUCTS[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.find((s) => s.inStock)?.name || product?.sizes?.[0]?.name || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('materials');
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const currentSizeObj = product.sizes?.find((s) => s.name === selectedSize);
  const completeTheLookProducts = (product.completeTheLookIds || [])
    .map((id) => getProductById(id))
    .filter(Boolean) as Product[];

  const handleAddToCart = () => {
    if (!selectedSize || !currentSizeObj?.inStock) return;
    setIsAdding(true);
    addItem(product, selectedColor, selectedSize, quantity);
    showToast({
      title: 'Added to Atelier Bag',
      description: `${product.name} (${selectedColor}, ${selectedSize})`,
      type: 'cart'
    });
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleToggleWishlist = () => {
    const added = toggleItem(product);
    showToast({
      title: added ? 'Saved to Wishlist' : 'Removed from Wishlist',
      description: product.name,
      type: 'wishlist'
    });
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FAF8F5] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Sub-Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-[#E8E3DA] pb-4">
          <button
            onClick={() => setActivePageView('shop')}
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#71717A] hover:text-[#0C0C0D] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Garments Catalog</span>
          </button>

          <nav className="flex items-center gap-2 text-[10px] tracking-ultra-wide uppercase text-[#71717A]">
            <button onClick={() => setActivePageView('home')} className="hover:text-[#0C0C0D] cursor-pointer">
              Maison
            </button>
            <span>/</span>
            <button onClick={() => setActivePageView('shop')} className="hover:text-[#0C0C0D] cursor-pointer">
              Garments
            </button>
            <span>/</span>
            <span className="text-[#0C0C0D] truncate max-w-xs">{product.name}</span>
          </nav>
        </div>

        {/* Main Product Layout: Left Gallery + Right Specs/Purchase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
          {/* Left Gallery (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-4 sticky top-24">
            {/* Primary Main Image Stage */}
            <div className="relative aspect-[3/4] bg-[#F5F2EB] border border-[#E8E3DA] overflow-hidden group">
              <img
                src={product.images[selectedImageIndex]?.url || product.images[0]?.url}
                alt={product.images[selectedImageIndex]?.alt || product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.badge && (
                  <span className="text-[10px] tracking-ultra-wide uppercase px-3 py-1 bg-[#0C0C0D] text-[#FAF8F5]">
                    {product.badge}
                  </span>
                )}
                {product.editionNumber && (
                  <span className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 bg-[#FAF8F5]/90 text-[#0C0C0D] backdrop-blur-xs">
                    {product.editionNumber}
                  </span>
                )}
              </div>

              {/* Fullscreen Magnifier Trigger */}
              <button
                onClick={() => setIsZoomModalOpen(true)}
                className="absolute bottom-4 right-4 p-2.5 bg-[#FAF8F5]/90 hover:bg-white text-[#0C0C0D] transition-colors shadow-md backdrop-blur-sm cursor-pointer"
                title="View High-Resolution Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* View Label */}
              <div className="absolute bottom-4 left-4 bg-[#0C0C0D]/80 text-[#FAF8F5] text-[10px] font-mono px-3 py-1 backdrop-blur-xs">
                {product.images[selectedImageIndex]?.label || 'Studio Mannequin View'}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`aspect-[3/4] overflow-hidden border transition-all cursor-pointer bg-[#F5F2EB] relative ${
                    selectedImageIndex === idx
                      ? 'border-[#0C0C0D] ring-2 ring-[#0C0C0D]'
                      : 'border-[#E8E3DA] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Product Details & Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Title & Header */}
            <div className="space-y-2 pb-6 border-b border-[#E8E3DA]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-ultra-wide uppercase text-[#71717A]">
                  {product.categoryLabel}
                </span>
                {product.isLimited && (
                  <span
                    className="text-[10px] font-mono tracking-wider uppercase font-medium"
                    style={{ color: accentColor }}
                  >
                    Limited Archive Edition
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-light text-[#0C0C0D] tracking-tight">
                {product.name}
              </h1>

              <p className="text-xs text-[#71717A] leading-relaxed">{product.subtitle}</p>

              <div className="pt-2 flex items-baseline gap-4">
                <span className="text-xl font-mono text-[#0C0C0D] font-medium">
                  {formatPrice(product.price)}
                </span>
                <span className="text-[11px] text-[#71717A]">Taxes & Courier Insured</span>
              </div>
            </div>

            {/* Color Swatches */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] tracking-wider uppercase text-[#71717A]">Color Shade</span>
                <span className="font-mono text-[#0C0C0D]">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-7 h-7 rounded-full transition-all cursor-pointer relative ${
                      selectedColor === c.name
                        ? 'ring-2 ring-offset-2 ring-[#0C0C0D]'
                        : 'border border-[#D4CDC3] hover:scale-110'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector & Size Guide */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] tracking-wider uppercase text-[#71717A]">Atelier Size</span>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="inline-flex items-center gap-1.5 text-[11px] hover:text-[#0C0C0D] transition-colors cursor-pointer underline"
                  style={{ color: accentColor }}
                >
                  <Ruler className="w-3 h-3" />
                  <span>Interactive Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz.name}
                    disabled={!sz.inStock}
                    onClick={() => setSelectedSize(sz.name)}
                    className={`py-3 text-xs font-mono border transition-all cursor-pointer relative ${
                      selectedSize === sz.name
                        ? 'border-[#0C0C0D] bg-[#0C0C0D] text-[#FAF8F5]'
                        : sz.inStock
                        ? 'border-[#D4CDC3] bg-[#FAF8F5] text-[#0C0C0D] hover:border-[#0C0C0D]'
                        : 'border-[#E8E3DA] bg-[#F5F2EB] text-[#A1A1AA] cursor-not-allowed line-through'
                    }`}
                  >
                    <span>{sz.name}</span>
                    {sz.stockCount && sz.stockCount <= 3 && sz.inStock && (
                      <span className="block text-[8px] text-[#B91C1C] mt-0.5">
                        Only {sz.stockCount} left
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Primary Bag Actions */}
            <div className="space-y-4 pt-4 border-t border-[#E8E3DA]">
              <div className="flex gap-4">
                {/* Quantity Counter */}
                <div className="flex items-center border border-[#D4CDC3] bg-[#FAF8F5] px-3 py-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-[#71717A] hover:text-[#0C0C0D] p-1 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-mono text-xs">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-[#71717A] hover:text-[#0C0C0D] p-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add To Bag Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!currentSizeObj?.inStock || isAdding}
                  className="flex-1 bg-[#0C0C0D] hover:bg-[#2A2A2E] text-[#FAF8F5] py-4 px-6 text-xs tracking-ultra-wide uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {isAdding
                      ? 'Securing Piece...'
                      : currentSizeObj?.inStock
                      ? `Add to Atelier Bag • ${formatPrice(product.price * quantity)}`
                      : 'Size Out of Stock'}
                  </span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={handleToggleWishlist}
                  className={`p-4 border transition-colors cursor-pointer flex items-center justify-center ${
                    inWishlist
                      ? 'border-[#B91C1C] text-[#B91C1C] bg-[#FEF2F2]'
                      : 'border-[#D4CDC3] bg-[#FAF8F5] text-[#0C0C0D] hover:border-[#0C0C0D]'
                  }`}
                  title={inWishlist ? 'Saved in Wishlist' : 'Save to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* White Glove Guarantees */}
              <div className="grid grid-cols-2 gap-3 pt-3 text-[11px] text-[#71717A] border-t border-[#F5F2EB]">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5" style={{ color: accentColor }} />
                  <span>Complimentary Insured Courier</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" style={{ color: accentColor }} />
                  <span>Numbered Certificate Included</span>
                </div>
              </div>
            </div>

            {/* Accordion Specs */}
            <div className="border-t border-[#E8E3DA] divide-y divide-[#E8E3DA] pt-2 text-xs">
              {/* Materials */}
              <div>
                <button
                  onClick={() => toggleAccordion('materials')}
                  className="w-full py-4 flex items-center justify-between text-left font-serif text-sm text-[#0C0C0D] cursor-pointer"
                >
                  <span>01. Textile Composition & Provenance</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#71717A] transition-transform ${
                      openAccordion === 'materials' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'materials' && (
                  <div className="pb-4 space-y-2 text-[#52525B] leading-relaxed font-light">
                    <p>
                      <strong>Composition:</strong> {product.composition}
                    </p>
                    <p>
                      <strong>Origin:</strong> {product.origin}
                    </p>
                    <p>{product.description}</p>
                  </div>
                )}
              </div>

              {/* Tailoring & Architecture */}
              <div>
                <button
                  onClick={() => toggleAccordion('tailoring')}
                  className="w-full py-4 flex items-center justify-between text-left font-serif text-sm text-[#0C0C0D] cursor-pointer"
                >
                  <span>02. Pattern Architecture & Details</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#71717A] transition-transform ${
                      openAccordion === 'tailoring' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'tailoring' && (
                  <div className="pb-4 space-y-2 text-[#52525B]">
                    <ul className="list-disc pl-5 space-y-1">
                      {product.details?.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Care & Preservation */}
              <div>
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full py-4 flex items-center justify-between text-left font-serif text-sm text-[#0C0C0D] cursor-pointer"
                >
                  <span>03. Garment Care & Preservation</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#71717A] transition-transform ${
                      openAccordion === 'care' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'care' && (
                  <div className="pb-4 space-y-2 text-[#52525B] leading-relaxed font-light">
                    {Array.isArray(product.careInstructions) ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {product.careInstructions.map((instruction, idx) => (
                          <li key={idx}>{instruction}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{product.careInstructions}</p>
                    )}
                    <p className="text-[11px] text-[#71717A]">
                      Each garment arrives with an organic cedar garment bag and bespoke horn hanger crafted specifically for this silhouette.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Complete The Look Section */}
        {completeTheLookProducts.length > 0 && (
          <div className="mt-28 pt-16 border-t border-[#E8E3DA]">
            <div className="mb-10 text-center space-y-2">
              <span
                className="text-[10px] tracking-ultra-wide uppercase font-medium"
                style={{ color: accentColor }}
              >
                Curated Ensemble
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#0C0C0D]">
                Complete The Silhouette
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {completeTheLookProducts.map((p) => (
                <ProductCard key={p.id} product={p} accentColor={accentColor} />
              ))}
            </div>
          </div>
        )}

        {/* Fullscreen Magnifier Modal */}
        {isZoomModalOpen && (
          <div className="fixed inset-0 z-50 bg-[#0C0C0D]/95 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={() => setIsZoomModalOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-[#C5A880] transition-colors p-2 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-4xl max-h-[85vh] overflow-auto">
              <img
                src={product.images[selectedImageIndex]?.url || product.images[0]?.url}
                alt={product.name}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
