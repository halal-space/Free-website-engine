'use client';

import React, { useState } from 'react';
import type { Product, ProductColor } from '../types';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useQuickViewStore } from '../stores/quickViewStore';
import { useUIStore } from '../stores/uiStore';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { openQuickView } = useQuickViewStore();

  const wishlisted = isInWishlist(product.id);
  const displayImage = selectedColor?.image || product.images[0];
  const secondaryImage = product.images[1] || displayImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedColor, product.variants?.[0], 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id, product.name);
  };

  return (
    <div
      className="group relative flex flex-col rounded-2xl luxury-card bg-[var(--bg-card)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[var(--border-medium)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges Bar */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 pointer-events-none">
        {product.isNew && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-blue-600 text-white shadow-sm">
            New
          </span>
        )}
        {product.isBestSeller && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 shadow-sm border border-white/10">
            Best Seller
          </span>
        )}
        {product.discountPercent && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            -{product.discountPercent}%
          </span>
        )}
      </div>

      {/* Wishlist Heart Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-red-500 transition-all hover:scale-110 shadow-sm cursor-pointer"
        aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            wishlisted ? 'fill-red-500 text-red-500' : 'text-[var(--text-secondary)]'
          }`}
        />
      </button>

      {/* Image Container with Zoom */}
      <div
        onClick={() => openQuickView(product)}
        className="relative block w-full aspect-square bg-[var(--bg-secondary)] overflow-hidden cursor-pointer"
      >
        <img
          src={isHovered ? secondaryImage : displayImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-mono text-[var(--text-secondary)]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-[var(--text-muted)]">({product.reviewCount})</span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              useUIStore.getState().navigateToProduct(product.slug);
            }}
            className="text-left cursor-pointer w-full group/btn"
          >
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover/btn:text-blue-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </button>

          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Colors and Price */}
        <div className="space-y-3 pt-2 border-t border-[var(--border-subtle)]">
          <div className="flex items-center justify-between">
            {/* Color Swatches */}
            <div className="flex items-center gap-1.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColor(color);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                    selectedColor.name === color.name
                      ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-[var(--bg-primary)] border-transparent scale-110'
                      : 'border-white/20 opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                />
              ))}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-1.5">
              {product.originalPrice && (
                <span className="text-xs font-mono line-through text-[var(--text-muted)]">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-sm sm:text-base font-bold font-mono text-[var(--text-primary)]">
                ${product.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-[var(--bg-secondary)] hover:bg-[var(--text-primary)] text-[var(--text-primary)] hover:text-[var(--text-inverse)]'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Reserved in Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
