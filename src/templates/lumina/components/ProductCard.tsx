'use client';

import React, { useState } from 'react';
import type { Product } from '../types';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useUIStore } from '../stores/uiStore';
import { Heart, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  aspectRatio?: 'portrait' | 'square';
  accentColor?: string;
  onSelectProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  aspectRatio = 'portrait',
  accentColor = '#C5A880',
  onSelectProduct
}) => {
  const { formatPrice, addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { openQuickView, showToast, setSelectedProductSlug, setActivePageView } = useUIStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const primaryImage = product.images[activeImageIndex] || product.images[0];
  const hoverImage = product.images[1] || product.images[0];

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleItem(product);
    showToast({
      title: added ? 'Saved to Wishlist' : 'Removed from Wishlist',
      description: product.name,
      type: 'wishlist'
    });
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultColor = product.colors[0]?.name || 'Standard';
    const firstStockSize = product.sizes.find((s) => s.inStock)?.name || product.sizes[0]?.name || 'Standard';
    addItem(product, defaultColor, firstStockSize, 1);
    showToast({
      title: 'Added to Atelier Bag',
      description: `${product.name} (${firstStockSize})`,
      type: 'cart'
    });
  };

  return (
    <div
      className="group relative flex flex-col transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveImageIndex(0);
      }}
    >
      {/* Product Image Stage */}
      <div
        className={`relative w-full overflow-hidden bg-[#F5F2EB] ${
          aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
        }`}
      >
        <div
          onClick={() => {
            if (onSelectProduct) {
              onSelectProduct(product);
            } else {
              setSelectedProductSlug(product.slug);
              setActivePageView('product');
            }
          }}
          className="block w-full h-full cursor-pointer"
        >
          {/* Primary image */}
          <img
            src={primaryImage.url}
            alt={primaryImage.alt}
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              isHovered && product.images.length > 1 && activeImageIndex === 0 ? 'opacity-0' : 'opacity-100'
            }`}
            loading="lazy"
          />

          {/* Secondary Hover Image (Mannequin alternate angle / flatlay) */}
          {product.images.length > 1 && (
            <img
              src={hoverImage.url}
              alt={hoverImage.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                isHovered && activeImageIndex === 0 ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              loading="lazy"
            />
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
          {product.badge && (
            <span className="text-[9px] tracking-ultra-wide uppercase px-2.5 py-1 bg-[#0C0C0D] text-[#FAF8F5] font-light shadow-sm">
              {product.badge}
            </span>
          )}
          {product.isLimited && product.editionNumber && (
            <span className="text-[8px] font-mono tracking-widest uppercase px-2 py-0.5 bg-[#FAF8F5]/90 text-[#0C0C0D] backdrop-blur-xs">
              {product.editionNumber}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
            inWishlist
              ? 'bg-[#0C0C0D] text-[#C5A880]'
              : 'bg-[#FAF8F5]/90 text-[#0C0C0D] opacity-90 hover:opacity-100 hover:scale-110'
          }`}
          style={inWishlist ? { color: accentColor } : undefined}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto">
          <button
            onClick={handleQuickViewClick}
            className="flex-1 bg-[#FAF8F5]/95 hover:bg-white text-[#0C0C0D] py-2 px-3 text-[10px] tracking-widest uppercase transition-colors shadow-lg flex items-center justify-center gap-1.5 backdrop-blur-sm cursor-pointer border border-[#D4CDC3]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="bg-[#0C0C0D] hover:bg-[#2A2A2E] text-[#FAF8F5] p-2 text-[10px] tracking-widest uppercase transition-colors shadow-lg flex items-center justify-center cursor-pointer"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="pt-4 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between text-[10px] tracking-ultra-wide uppercase text-[#71717A] mb-1">
            <span>{product.categoryLabel}</span>
            <span className="font-mono text-[#A1A1AA]">{product.origin.split(',')[0]}</span>
          </div>

          <h4
            onClick={() => {
              if (onSelectProduct) {
                onSelectProduct(product);
              } else {
                setSelectedProductSlug(product.slug);
                setActivePageView('product');
              }
            }}
            className="font-serif text-base text-[#0C0C0D] hover:text-[#C5A880] transition-colors leading-snug block line-clamp-1 cursor-pointer font-light"
          >
            {product.name}
          </h4>

          <p className="text-xs text-[#71717A] mt-0.5 line-clamp-1 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Bottom row: Color Swatches & Price */}
        <div className="mt-3 pt-2.5 border-t border-[#E8E3DA] flex items-center justify-between">
          {/* Color swatch dots */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.preventDefault();
                  if (color.imageIndex !== undefined && product.images[color.imageIndex]) {
                    setActiveImageIndex(color.imageIndex);
                  }
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-transform cursor-pointer ${
                  activeImageIndex === color.imageIndex
                    ? 'scale-125 border-[#0C0C0D] ring-1 ring-[#0C0C0D]'
                    : 'border-black/20 hover:scale-110'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>

          <div className="font-mono text-xs text-[#0C0C0D] font-medium tracking-tight">
            {formatPrice(product.price)}
          </div>
        </div>
      </div>
    </div>
  );
};
