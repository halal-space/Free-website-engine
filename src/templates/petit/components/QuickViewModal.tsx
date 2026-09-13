'use client';
import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingBag, ArrowRight, Check, ShieldCheck, Truck } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToast } = useUIStore();
  const addItemToCart = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(quickViewProduct?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(
    quickViewProduct?.sizes ? quickViewProduct.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Sync state when product changes
  useEffect(() => {
    if (quickViewProduct) {
      setActiveImageIndex(0);
      setSelectedColor(quickViewProduct.colors[0]);
      setSelectedSize(quickViewProduct.sizes ? quickViewProduct.sizes[0] : undefined);
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItemToCart(product, quantity, selectedColor, selectedSize);
    addToast('Added to Shopping Bag', `${quantity}× ${product.name}`, 'success');

    setTimeout(() => {
      setIsAdding(false);
      closeQuickView();
    }, 450);
  };

  const handleToggleWishlist = () => {
    const isNowAdded = toggleItem(product);
    addToast(
      isNowAdded ? 'Saved to Wishlist' : 'Removed from Wishlist',
      product.name,
      'favorite'
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1917]/60 backdrop-blur-xs transition-opacity"
        onClick={closeQuickView}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8E2D7] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 text-[#575149] hover:text-[#1C1917] bg-white/80 backdrop-blur-xs rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Col */}
          <div className="bg-[#F2ECE1] p-6 flex flex-col justify-between">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#EAE3D5] border border-[#E8E2D7]">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.isBestSeller && (
                <span className="absolute top-3 left-3 bg-[#1C1917] text-white text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full font-semibold">
                  Bestseller
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#B88B4A] shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Col */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Title */}
              <span className="text-xs uppercase tracking-widest text-[#B88B4A] font-semibold">
                {product.category}
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#1C1917] mt-1">
                {product.name}
              </h3>
              <p className="text-xs text-[#877E73] mt-1">{product.subtitle}</p>

              {/* Price & Rating */}
              <div className="flex items-center justify-between mt-3 pb-3 border-b border-[#E8E2D7]">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-semibold text-[#1C1917] tabular-nums">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-[#877E73] line-through tabular-nums">
                      ${product.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs text-[#575149]">
                  <Star className="w-4 h-4 fill-[#C09553] text-[#C09553]" />
                  <span className="font-semibold text-[#1C1917]">{product.rating}</span>
                  <span className="text-[#877E73]">({product.reviewCount})</span>
                </div>
              </div>

              {/* Description excerpt */}
              <p className="text-xs text-[#575149] leading-relaxed mt-3 line-clamp-3">
                {product.description}
              </p>

              {/* Color Swatches */}
              <div className="mt-4">
                <label className="text-xs font-medium text-[#1C1917] block mb-1.5">
                  Color: <span className="font-normal text-[#575149]">{selectedColor?.name}</span>
                </label>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                        selectedColor?.name === c.name
                          ? 'border-[#1C1917] scale-110'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes if applicable */}
              {product.sizes && product.sizes.length > 1 && (
                <div className="mt-3">
                  <label className="text-xs font-medium text-[#1C1917] block mb-1.5">
                    Option / Size:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1 rounded-md text-xs border transition-colors ${
                          selectedSize === s
                            ? 'border-[#1C1917] bg-[#1C1917] text-white'
                            : 'border-[#E8E2D7] bg-white text-[#575149] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-[#E8E2D7] space-y-3">
              <div className="flex gap-3">
                {/* Qty */}
                <div className="flex items-center border border-[#E8E2D7] rounded-full bg-white px-2 py-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-[#877E73] hover:text-[#1C1917]"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-semibold text-[#1C1917] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-[#877E73] hover:text-[#1C1917]"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag CTA */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#1C1917] hover:bg-[#B88B4A] text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm"
                >
                  {isAdding ? (
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#FAF8F5]" /> Added
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
                    </span>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  className={`p-2.5 rounded-full border transition-colors ${
                    inWishlist
                      ? 'border-[#B66C52] bg-[#F9EFEA] text-[#B66C52]'
                      : 'border-[#E8E2D7] hover:bg-white text-[#575149]'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* View Full Product link */}
              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-[#877E73] flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> Ships in plastic-free packaging
                </span>
                <button
                  type="button"
                  onClick={() => {
                    closeQuickView();
                    useUIStore.getState().navigateToProduct(product.slug);
                  }}
                  className="font-medium text-[#1C1917] hover:text-[#B88B4A] flex items-center gap-1 cursor-pointer"
                >
                  Full Details & Reviews <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
