'use client';

import React, { useState, useEffect } from 'react';
import { useUIStore } from '../stores/uiStore';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { X, Heart, ShoppingBag, ArrowRight, ShieldCheck, Ruler } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    isQuickViewOpen,
    closeQuickView,
    setSizeGuideOpen,
    showToast,
    setSelectedProductSlug,
    setActivePageView
  } = useUIStore();
  const { formatPrice, addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImageIndex(0);
      setSelectedColor(quickViewProduct.colors[0]?.name || '');
      const firstAvailableSize = quickViewProduct.sizes.find((s) => s.inStock)?.name || quickViewProduct.sizes[0]?.name || '';
      setSelectedSize(firstAvailableSize);
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);
  const currentSizeObj = quickViewProduct.sizes.find((s) => s.name === selectedSize);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setIsAdding(true);
    addItem(quickViewProduct, selectedColor, selectedSize, quantity);
    showToast({
      title: 'Added to Atelier Bag',
      description: `${quickViewProduct.name} (${selectedColor}, ${selectedSize})`,
      type: 'cart'
    });
    setTimeout(() => {
      setIsAdding(false);
      closeQuickView();
    }, 400);
  };

  const handleToggleWishlist = () => {
    const added = toggleItem(quickViewProduct);
    showToast({
      title: added ? 'Saved to Wishlist' : 'Removed from Wishlist',
      description: quickViewProduct.name,
      type: 'wishlist'
    });
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#FAF8F5] text-[#0C0C0D] max-w-4xl w-full border border-[#D4CDC3] shadow-2xl relative max-h-[92vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-10 text-[#0C0C0D] hover:text-[#C5A880] transition-colors p-2 bg-[#FAF8F5]/80 backdrop-blur-sm cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Showcase (Mannequins / Flat-Lays only) */}
        <div className="p-6 md:p-8 bg-[#F5F2EB] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8E3DA]">
          <div className="aspect-[3/4] relative overflow-hidden bg-white mb-4">
            <img
              src={quickViewProduct.images[selectedImageIndex]?.url || quickViewProduct.images[0].url}
              alt={quickViewProduct.images[selectedImageIndex]?.alt || quickViewProduct.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            {quickViewProduct.badge && (
              <span className="absolute top-3 left-3 text-[10px] tracking-ultra-wide uppercase px-2.5 py-1 bg-[#0C0C0D] text-[#FAF8F5]">
                {quickViewProduct.badge}
              </span>
            )}
            {quickViewProduct.editionNumber && (
              <span className="absolute bottom-3 left-3 text-[9px] tracking-widest font-mono uppercase px-2 py-0.5 bg-[#FAF8F5]/90 text-[#0C0C0D]">
                {quickViewProduct.editionNumber}
              </span>
            )}
          </div>

          {/* Thumbnail list */}
          <div className="flex gap-2">
            {quickViewProduct.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`w-14 h-18 overflow-hidden border transition-all cursor-pointer ${
                  selectedImageIndex === idx ? 'border-[#0C0C0D] ring-1 ring-[#0C0C0D]' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.label || 'Thumb'} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details & Actions */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] tracking-ultra-wide uppercase text-[#71717A] mb-1">
              <span>{quickViewProduct.categoryLabel}</span>
              <span>{quickViewProduct.origin}</span>
            </div>

            <h2 className="text-xl md:text-2xl font-serif text-[#0C0C0D] font-light leading-snug">
              {quickViewProduct.name}
            </h2>

            <p className="text-xs text-[#71717A] mt-1 mb-3">
              {quickViewProduct.subtitle}
            </p>

            <div className="text-lg font-mono text-[#0C0C0D] mb-4">
              {formatPrice(quickViewProduct.price)}
            </div>

            <p className="text-xs text-[#52525B] leading-relaxed line-clamp-3 mb-6">
              {quickViewProduct.description}
            </p>

            {/* Color Swatches */}
            <div className="mb-5">
              <div className="text-[11px] tracking-wider uppercase text-[#71717A] mb-2 flex items-center justify-between">
                <span>Color: <strong className="text-[#0C0C0D]">{selectedColor}</strong></span>
              </div>
              <div className="flex gap-2">
                {quickViewProduct.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color.name);
                      if (color.imageIndex !== undefined && quickViewProduct.images[color.imageIndex]) {
                        setSelectedImageIndex(color.imageIndex);
                      }
                    }}
                    className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 cursor-pointer ${
                      selectedColor === color.name ? 'border-[#0C0C0D] scale-110' : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                    title={color.name}
                  >
                    <span
                      className="block w-full h-full rounded-full border border-black/10"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="text-[11px] tracking-wider uppercase text-[#71717A] mb-2 flex items-center justify-between">
                <span>Size: <strong className="text-[#0C0C0D]">{selectedSize}</strong></span>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="flex items-center gap-1 text-[10px] tracking-wider text-[#C5A880] hover:text-[#0C0C0D] transition-colors cursor-pointer"
                >
                  <Ruler className="w-3 h-3" />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {quickViewProduct.sizes.map((size) => (
                  <button
                    key={size.name}
                    disabled={!size.inStock}
                    onClick={() => setSelectedSize(size.name)}
                    className={`py-2 text-xs text-center border font-mono transition-all cursor-pointer ${
                      !size.inStock
                        ? 'border-[#E8E3DA] text-[#A1A1AA] bg-[#F5F2EB] line-through cursor-not-allowed'
                        : selectedSize === size.name
                        ? 'border-[#0C0C0D] bg-[#0C0C0D] text-[#FAF8F5]'
                        : 'border-[#D4CDC3] text-[#0C0C0D] hover:border-[#0C0C0D] bg-transparent'
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>

              {currentSizeObj && currentSizeObj.stockCount !== undefined && currentSizeObj.stockCount <= 3 && currentSizeObj.inStock && (
                <p className="text-[11px] text-[#A38356] mt-2 font-mono">
                  ⚠ Only {currentSizeObj.stockCount} piece{currentSizeObj.stockCount === 1 ? '' : 's'} remaining in this size
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#E8E3DA]">
            <div className="flex gap-3 mb-3">
              <button
                onClick={handleAddToCart}
                disabled={isAdding || !currentSizeObj?.inStock}
                className="flex-1 bg-[#0C0C0D] hover:bg-[#2A2A2E] text-[#FAF8F5] py-3.5 px-6 text-xs tracking-ultra-wide uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAdding ? 'Adding to Bag...' : 'Add to Bag'}</span>
              </button>

              <button
                onClick={handleToggleWishlist}
                className={`p-3.5 border transition-colors cursor-pointer ${
                  inWishlist
                    ? 'border-[#C5A880] bg-[#FAF8F5] text-[#C5A880]'
                    : 'border-[#D4CDC3] text-[#0C0C0D] hover:border-[#0C0C0D]'
                }`}
                title="Add to Wishlist"
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedProductSlug(quickViewProduct.slug);
                  setActivePageView('product');
                  closeQuickView();
                }}
                className="inline-flex items-center gap-1.5 text-xs text-[#0C0C0D] hover:text-[#C5A880] tracking-wider uppercase transition-colors cursor-pointer"
              >
                <span>View Full Editorial Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <span className="flex items-center gap-1 text-[10px] text-[#71717A]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Complimentary Delivery</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
