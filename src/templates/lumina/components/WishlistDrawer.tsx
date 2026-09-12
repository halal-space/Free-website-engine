'use client';

import React from 'react';
import { useWishlistStore } from '../stores/wishlistStore';
import { useCartStore } from '../stores/cartStore';
import { useUIStore } from '../stores/uiStore';
import { X, Heart, ShoppingBag, Trash2, Share2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const { isWishlistOpen, setWishlistOpen, showToast, setActivePageView, setSelectedProductSlug } = useUIStore();
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { formatPrice, addItem } = useCartStore();

  if (!isWishlistOpen) return null;

  const handleMoveToBag = (product: any) => {
    const defaultColor = product.colors?.[0]?.name || 'Standard';
    const firstStockSize = product.sizes?.find((s: any) => s.inStock)?.name || product.sizes?.[0]?.name || 'Standard';
    addItem(product, defaultColor, firstStockSize, 1);
    removeItem(product.id);
    showToast({
      title: 'Moved to Atelier Bag',
      description: `${product.name} (${firstStockSize})`,
      type: 'cart'
    });
  };

  const handleMoveAllToBag = () => {
    items.forEach(({ product }) => {
      const defaultColor = product.colors?.[0]?.name || 'Standard';
      const firstStockSize = product.sizes?.find((s: any) => s.inStock)?.name || product.sizes?.[0]?.name || 'Standard';
      addItem(product, defaultColor, firstStockSize, 1);
    });
    clearWishlist();
    showToast({
      title: 'All Garments Moved to Bag',
      description: `${items.length} pieces added to your active shopping bag.`,
      type: 'cart'
    });
  };

  const handleShareWishlist = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast({
        title: 'Curated Wishlist Copied',
        description: 'Direct registry link copied to clipboard.',
        type: 'info'
      });
    }
  };

  const handleOpenProduct = (slug: string) => {
    setSelectedProductSlug(slug);
    setActivePageView('product');
    setWishlistOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0C0C0D]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl border-l border-[#E8E3DA] flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#E8E3DA] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-[#C5A880]" />
              <h2 className="font-serif text-lg font-light text-[#0C0C0D] tracking-wide">
                Saved Wishlist
              </h2>
              <span className="text-[10px] font-mono bg-[#E8E3DA] text-[#0C0C0D] px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            </div>

            <button
              onClick={() => setWishlistOpen(false)}
              className="text-[#71717A] hover:text-[#0C0C0D] transition-colors p-1 cursor-pointer"
              aria-label="Close wishlist drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#E8E3DA]">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-12 h-12 rounded-full border border-[#D4CDC3] mx-auto flex items-center justify-center text-[#71717A]">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-[#0C0C0D]">Your saved wishlist is empty.</h3>
                <p className="text-xs text-[#71717A] max-w-xs mx-auto">
                  Save pieces while exploring the 2026 Archive to compare silhouettes and materials.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setActivePageView('shop');
                      setWishlistOpen(false);
                    }}
                    className="inline-block bg-[#0C0C0D] text-[#FAF8F5] px-6 py-3 text-xs tracking-ultra-wide uppercase hover:bg-[#C5A880] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                  >
                    Explore Archive
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                {items.map(({ product }) => (
                  <div key={product.id} className="flex gap-4 pt-4 first:pt-0">
                    <button
                      onClick={() => handleOpenProduct(product.slug)}
                      className="w-20 aspect-[3/4] bg-[#F5F2EB] border border-[#E8E3DA] overflow-hidden shrink-0 group cursor-pointer"
                    >
                      <img
                        src={product.images[0]?.url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </button>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-mono tracking-widest uppercase text-[#71717A] block">
                          {product.categoryLabel}
                        </span>
                        <button
                          onClick={() => handleOpenProduct(product.slug)}
                          className="text-left font-serif text-sm text-[#0C0C0D] hover:text-[#C5A880] transition-colors line-clamp-1 block cursor-pointer"
                        >
                          {product.name}
                        </button>
                        <p className="text-xs font-mono text-[#0C0C0D] mt-1">
                          {formatPrice(product.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => handleMoveToBag(product)}
                          className="bg-[#0C0C0D] hover:bg-[#2A2A2E] text-[#FAF8F5] py-1.5 px-3 text-[10px] tracking-widest uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Bag</span>
                        </button>

                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-[#A1A1AA] hover:text-[#B91C1C] transition-colors p-1 cursor-pointer"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E8E3DA] bg-[#F5F2EB] space-y-3">
              <button
                onClick={handleMoveAllToBag}
                className="w-full bg-[#0C0C0D] hover:bg-[#2A2A2E] text-[#FAF8F5] py-3.5 px-4 text-xs tracking-ultra-wide uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer font-medium"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Bag ({items.length})</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleShareWishlist}
                  className="flex-1 py-2.5 px-3 border border-[#D4CDC3] bg-[#FAF8F5] hover:border-[#0C0C0D] text-xs text-[#0C0C0D] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="text-[11px] tracking-wider uppercase">Share Registry</span>
                </button>

                <button
                  onClick={() => {
                    setActivePageView('wishlist');
                    setWishlistOpen(false);
                  }}
                  className="flex-1 py-2.5 px-3 border border-[#D4CDC3] bg-[#FAF8F5] hover:border-[#0C0C0D] text-xs text-[#0C0C0D] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[11px] tracking-wider uppercase">Full Registry</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
