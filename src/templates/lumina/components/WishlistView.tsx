'use client';

import React, { useState, useEffect } from 'react';
import { useWishlistStore } from '../stores/wishlistStore';
import { useCartStore } from '../stores/cartStore';
import { useUIStore } from '../stores/uiStore';
import { Heart, ShoppingBag, Trash2, Share2, ArrowRight, ArrowLeft } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { formatPrice, addItem } = useCartStore();
  const { showToast, setActivePageView, setSelectedProductSlug } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
        description: 'Direct link copied to clipboard.',
        type: 'info'
      });
    }
  };

  const handleOpenProduct = (slug: string) => {
    setSelectedProductSlug(slug);
    setActivePageView('product');
  };

  return (
    <div className="py-12 sm:py-20 bg-[#FAF8F5] min-h-[70vh]">
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
            Private Registry
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-[#E8E3DA] gap-4">
          <div>
            <span className="text-[10px] tracking-ultra-wide uppercase text-[#C5A880] block mb-1">
              Private Curated Registry
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-light text-[#0C0C0D]">
              Saved Wishlist ({items.length})
            </h1>
          </div>

          {items.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleShareWishlist}
                className="flex items-center gap-1.5 px-4 py-2 border border-[#D4CDC3] text-xs text-[#0C0C0D] hover:border-[#0C0C0D] transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="tracking-wider uppercase text-[11px]">Share Registry</span>
              </button>

              <button
                onClick={handleMoveAllToBag}
                className="flex items-center gap-1.5 px-5 py-2 bg-[#0C0C0D] text-[#FAF8F5] text-xs hover:bg-[#2A2A2E] transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="tracking-wider uppercase text-[11px]">Move All to Bag</span>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="text-center py-24 bg-[#F5F2EB] border border-[#E8E3DA] space-y-4">
            <div className="w-12 h-12 rounded-full border border-[#D4CDC3] mx-auto flex items-center justify-center text-[#71717A]">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif text-[#0C0C0D]">Your saved wishlist is empty.</h3>
            <p className="text-xs text-[#71717A] max-w-sm mx-auto">
              Save pieces while browsing the 2026 Archive to compare silhouettes and materials.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActivePageView('shop')}
                className="inline-block bg-[#0C0C0D] text-[#FAF8F5] px-8 py-3.5 text-xs tracking-ultra-wide uppercase hover:bg-[#C5A880] hover:text-[#FAF8F5] transition-colors cursor-pointer"
              >
                Explore Archive
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map(({ product }) => (
              <div
                key={product.id}
                className="group border border-[#E8E3DA] bg-white p-4 flex flex-col justify-between hover:border-[#0C0C0D] transition-all"
              >
                <div>
                  <button
                    onClick={() => handleOpenProduct(product.slug)}
                    className="block w-full aspect-[3/4] bg-[#F5F2EB] overflow-hidden relative mb-3 cursor-pointer text-left"
                  >
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {product.badge && (
                      <span className="absolute top-2 left-2 text-[9px] tracking-widest uppercase px-2 py-0.5 bg-[#0C0C0D] text-white">
                        {product.badge}
                      </span>
                    )}
                  </button>

                  <div className="text-[10px] tracking-widest uppercase text-[#71717A] mb-1">
                    {product.categoryLabel}
                  </div>
                  <button
                    onClick={() => handleOpenProduct(product.slug)}
                    className="font-serif text-base text-[#0C0C0D] hover:text-[#C5A880] transition-colors block line-clamp-1 text-left cursor-pointer"
                  >
                    {product.name}
                  </button>
                  <p className="text-xs text-[#71717A] mt-0.5 line-clamp-1">{product.subtitle}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E3DA] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#0C0C0D] font-medium">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-[#A1A1AA] hover:text-[#B91C1C] transition-colors p-1 cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleMoveToBag(product)}
                    className="w-full bg-[#0C0C0D] hover:bg-[#2A2A2E] text-[#FAF8F5] py-2.5 px-4 text-[10px] tracking-ultra-wide uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
