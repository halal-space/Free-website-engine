'use client';

import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../types';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useUIStore } from '../stores/uiStore';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Default', hex: '#EDE8DF' });
  const [isAdding, setIsAdding] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { openQuickView, addToast, navigateToProduct } = useUIStore();

  const isFavorite = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem(product, 1, selectedColor);
    addToast('Added to Shopping Bag', product.name, 'success');

    setTimeout(() => setIsAdding(false), 600);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleItem(product);
    addToast(
      added ? 'Saved to Wishlist' : 'Removed from Wishlist',
      product.name,
      'favorite'
    );
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateToProduct(product.slug);
  };

  return (
    <div className="group relative flex flex-col bg-[#FAF8F5] rounded-xl overflow-hidden transition-all duration-300">
      {/* Image Container with Hover Shift */}
      <div className="relative aspect-4/5 w-full overflow-hidden bg-[#F2ECE1] rounded-lg border border-[#E8E2D7]/70">
        <a href={`/product/${product.slug}`} onClick={handleCardClick} className="block w-full h-full">
          {/* Primary image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
          />

          {/* Secondary image for hover swap */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} lifestyle view`}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
            />
          )}
        </a>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.isBestSeller && (
            <span className="bg-[#1C1917] text-[#FAF8F5] text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full font-semibold shadow-xs">
              Bestseller
            </span>
          )}
          {product.isOrganic && (
            <span className="bg-[#EBF4EE] text-[#3D6B4F] text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full font-medium border border-[#3D6B4F]/20">
              Organic GOTS
            </span>
          )}
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="bg-[#F9EFEA] text-[#B66C52] text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full font-semibold">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button (Always accessible top right) */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-all duration-200 cursor-pointer ${
            isFavorite
              ? 'bg-[#FAF8F5] text-[#B66C52] shadow-sm'
              : 'bg-[#FAF8F5]/80 text-[#575149] hover:bg-white hover:text-[#1C1917]'
          }`}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Floating Quick Action Bar on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            type="button"
            onClick={handleOpenQuickView}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#FAF8F5]/95 hover:bg-white text-[#1C1917] text-xs font-medium rounded-full shadow-md backdrop-blur-xs transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#877E73]" />
            <span>Quick View</span>
          </button>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#1C1917] hover:bg-[#B88B4A] text-[#FAF8F5] text-xs font-medium rounded-full shadow-md transition-colors cursor-pointer"
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        {/* Category subtitle */}
        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#877E73]">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="font-serif text-sm sm:text-base font-medium text-[#1C1917] mt-0.5 group-hover:text-[#B88B4A] transition-colors leading-snug line-clamp-1">
          <a href={`/product/${product.slug}`} onClick={handleCardClick}>
            {product.name}
          </a>
        </h3>

        {/* Short Subtitle */}
        <p className="text-xs text-[#877E73] mt-0.5 line-clamp-1">
          {product.subtitle}
        </p>

        {/* Bottom Row: Price & Swatches */}
        <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#E8E2D7]/50">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-semibold text-[#1C1917] tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[#877E73] line-through tabular-nums">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Color Swatch Dots */}
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 3).map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`w-3 h-3 rounded-full border transition-transform cursor-pointer ${
                  selectedColor.name === color.name
                    ? 'border-[#1C1917] scale-125'
                    : 'border-black/20 hover:scale-110'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select ${color.name}`}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[10px] text-[#877E73]">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>

        {/* Mobile Quick Add (Visible on touch devices) */}
        <div className="sm:hidden mt-2 pt-1">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs font-medium cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
