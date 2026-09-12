'use client';

import React, { useState, useEffect } from 'react';
import { useQuickViewStore } from '../stores/quickViewStore';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useToastStore } from '../stores/toastStore';
import { useUIStore } from '../stores/uiStore';
import type { ProductColor, ProductVariant } from '../types';
import { X, ShoppingBag, Heart, Star, Plus, Minus, Check, ArrowRight } from 'lucide-react';

export const ProductQuickViewModal: React.FC = () => {
  const { product, isOpen, closeQuickView } = useQuickViewStore();
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { addToast } = useToastStore();

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || null);
      setSelectedVariant(product.variants?.[0] || null);
      setSelectedImage(product.images[0] || '');
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeQuickView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeQuickView]);

  if (!isOpen || !product) return null;

  const wishlisted = isInWishlist(product.id);
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const originalPrice = selectedVariant?.originalPrice || product.originalPrice;

  const handleColorChange = (c: ProductColor) => {
    setSelectedColor(c);
    if (c.image) {
      setSelectedImage(c.image);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor) return;
    addItem(product, selectedColor, selectedVariant || undefined, quantity);
    setAddedAnimation(true);
    addToast({
      title: 'Instrument Reserved',
      description: `${product.name} (${selectedColor.name}) added to bag`,
      type: 'success'
    });
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={closeQuickView}
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-4xl rounded-3xl luxury-glass border border-[var(--border-medium)] shadow-2xl overflow-hidden z-10 animate-scale-in text-[var(--text-primary)] my-auto max-h-[90vh] flex flex-col md:flex-row"
        style={{ backgroundColor: 'var(--bg-elevated, #181822)' }}
      >
        
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[var(--bg-card)]/80 hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-[var(--bg-secondary)] border-b md:border-b-0 md:border-r border-[var(--border-subtle)]">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/40 border border-[var(--border-subtle)]">
            <img
              src={selectedImage || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    selectedImage === img ? 'border-blue-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Configurator */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {product.category}
              </span>
              {product.isNew && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-blue-600 text-white">
                  New
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold font-mono text-[var(--text-primary)]">{product.rating.toFixed(1)}</span>
              </div>
              <span>•</span>
              <span>{product.reviewCount} Certified Client Reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 pt-1">
              {originalPrice && (
                <span className="text-sm font-mono line-through text-[var(--text-muted)]">
                  ${originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-2xl font-mono font-extrabold text-[var(--text-primary)]">
                ${currentPrice.toLocaleString()} USD
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                Finish: <span className="text-[var(--text-primary)] font-semibold">{selectedColor?.name}</span>
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => handleColorChange(c)}
                    className={`px-3 py-1.5 rounded-xl border text-xs flex items-center gap-2 transition-all cursor-pointer ${
                      selectedColor?.name === c.name
                        ? 'border-blue-500 bg-blue-500/10 text-[var(--text-primary)] font-semibold shadow-sm'
                        : 'border-[var(--border-subtle)] hover:border-[var(--border-medium)] text-[var(--text-secondary)]'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Variants if any */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2 pt-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                  Configuration
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                        selectedVariant?.id === v.id
                          ? 'border-blue-500 bg-blue-500/10 text-[var(--text-primary)] font-semibold shadow-sm'
                          : 'border-[var(--border-subtle)] hover:border-[var(--border-medium)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <div className="font-bold">{v.name}</div>
                      <div className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5">${v.price} USD</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specs Highlights */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="pt-3 border-t border-[var(--border-subtle)]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                  Engineering Specs
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {Object.entries(product.specs).slice(0, 4).map(([label, value], i) => (
                    <div key={i} className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                      <span className="text-[var(--text-muted)] block text-[10px]">{label}</span>
                      <span className="font-mono font-semibold text-[var(--text-primary)] truncate block">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-card)]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-mono font-bold text-[var(--text-primary)]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Wishlist Toggle */}
              <button
                onClick={() => toggleWishlist(product.id, product.name)}
                className="p-3 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-red-500 transition-colors cursor-pointer"
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </button>

              {/* Add to Bag */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white shadow-emerald-500/25'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/25'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Allocated in Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Reserve in Bag</span>
                  </>
                )}
              </button>
            </div>

            {/* Inspect Full Specs Button */}
            <button
              onClick={() => {
                closeQuickView();
                useUIStore.getState().navigateToProduct(product.slug);
              }}
              className="w-full py-2.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] text-xs font-semibold text-[var(--text-secondary)] hover:text-blue-400 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Inspect Full Specifications & Narrative</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
