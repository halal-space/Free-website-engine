'use client';

import React from 'react';
import { useWishlistStore } from '../stores/wishlistStore';
import { useCartStore } from '../stores/cartStore';
import { useToastStore } from '../stores/toastStore';
import { useUIStore } from '../stores/uiStore';
import { products } from '../products';
import { ProductCard } from './ProductCard';
import { Heart, Trash2, ShoppingBag, ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';

interface WishlistPageViewProps {
  accentColor?: string;
}

export const WishlistPageView: React.FC<WishlistPageViewProps> = ({
  accentColor = '#3b82f6',
}) => {
  const { wishlistIds, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const { addToast } = useToastStore();
  const { navigateToHome, navigateToShop } = useUIStore();

  const savedProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleMoveAllToBag = () => {
    savedProducts.forEach((p) => {
      addItem(p, p.colors[0], p.variants?.[0], 1);
    });
    addToast({
      title: 'Allocations Transferred',
      description: `Moved ${savedProducts.length} models to your shopping bag.`,
      type: 'success',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in text-[var(--text-primary)]">
      {/* Breadcrumbs Navigation */}
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]" aria-label="Breadcrumb">
          <button
            onClick={navigateToHome}
            className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="text-[var(--text-primary)] font-semibold">Wishlist</span>
        </nav>

        <button
          onClick={() => navigateToShop()}
          className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Explore Catalog</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Header Banner */}
      <div className="space-y-2">
        <span
          className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block"
          style={{ color: accentColor }}
        >
          CURATED SELECTION
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Saved Wishlist
        </h1>
      </div>

      {/* Empty State */}
      {savedProducts.length === 0 ? (
        <div className="py-24 text-center max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto text-[var(--text-muted)] shadow-lg">
            <Heart className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Your Wishlist is Empty</h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              You have not saved any instruments to your private archive yet. Tap the heart icon on any model to reserve it for later.
            </p>
          </div>
          <button
            onClick={() => navigateToShop()}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[var(--border-subtle)] gap-4">
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                Saved Models ({savedProducts.length})
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Private client allocations saved to this browser session.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={clearWishlist}
                className="px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] hover:text-red-500 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Wishlist</span>
              </button>
              <button
                onClick={handleMoveAllToBag}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-500/20 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Bag</span>
              </button>
            </div>
          </div>

          {/* Grid of Saved Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
