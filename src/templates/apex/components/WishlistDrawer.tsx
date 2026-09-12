'use client';

import React, { useEffect } from 'react';
import { useWishlistStore } from '../stores/wishlistStore';
import { useCartStore } from '../stores/cartStore';
import { useToastStore } from '../stores/toastStore';
import { useUIStore } from '../stores/uiStore';
import { products } from '../products';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const { isOpen, closeWishlist, wishlistIds, toggleWishlist, clearWishlist } = useWishlistStore();
  const { addItem, openCart } = useCartStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeWishlist();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeWishlist]);

  if (!isOpen) return null;

  const savedProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleMoveToBag = (product: typeof products[0]) => {
    addItem(product, product.colors[0], product.variants?.[0], 1);
    addToast({
      title: 'Added to Bag',
      description: product.name,
      type: 'success'
    });
  };

  const handleMoveAllToBag = () => {
    savedProducts.forEach((p) => {
      addItem(p, p.colors[0], p.variants?.[0], 1);
    });
    addToast({
      title: 'Allocations Transferred',
      description: `Moved ${savedProducts.length} items to your shopping bag.`,
      type: 'success'
    });
    closeWishlist();
    openCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
        onClick={closeWishlist}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md border-l border-[var(--border-subtle)] shadow-2xl flex flex-col justify-between animate-fade-in text-[var(--text-primary)]"
          style={{ backgroundColor: 'var(--bg-elevated, #181822)' }}
        >
          
          {/* Header */}
          <div className="p-6 border-b border-[var(--border-subtle)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-500/10 text-red-500">
                <Heart className="w-5 h-5 fill-red-500" />
              </div>
              <div>
                <h2 className="text-base font-bold tracking-tight text-[var(--text-primary)]">
                  Saved Instruments
                </h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  {savedProducts.length} {savedProducts.length === 1 ? 'model' : 'models'} reserved in private archive
                </p>
              </div>
            </div>

            <button
              onClick={closeWishlist}
              className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors"
              aria-label="Close wishlist drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
                  <Heart className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">Your Archive is Empty</h3>
                  <p className="text-xs text-[var(--text-secondary)] max-w-xs leading-relaxed">
                    Tap the heart on any product card to bookmark acoustic and silicon instruments.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeWishlist();
                    useUIStore.getState().navigateToShop();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
                >
                  <span>Browse Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {savedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-3.5 rounded-2xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center gap-4 group"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[var(--bg-secondary)] shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] line-clamp-1">
                          {product.category}
                        </span>
                        <button
                          onClick={() => toggleWishlist(product.id, product.name)}
                          className="text-[var(--text-muted)] hover:text-red-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate group-hover:text-blue-500 transition-colors">
                        {product.name}
                      </h4>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
                          ${product.price.toLocaleString()} USD
                        </span>
                        <button
                          onClick={() => handleMoveToBag(product)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold transition-all shadow-sm"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {savedProducts.length > 0 && (
            <div className="p-6 border-t border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
              <button
                onClick={handleMoveAllToBag}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Shopping Bag</span>
              </button>

              <button
                onClick={() => {
                  closeWishlist();
                  useUIStore.getState().navigateToWishlist();
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>View Full Wishlist Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={clearWishlist}
                className="w-full py-2.5 px-4 rounded-xl border border-[var(--border-subtle)] hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 text-[var(--text-secondary)] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Wishlist Archive</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
