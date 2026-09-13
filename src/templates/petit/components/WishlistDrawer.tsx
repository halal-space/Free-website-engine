'use client';
import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '../stores/wishlistStore';
import { useCartStore } from '../stores/cartStore';
import { useUIStore } from '../stores/uiStore';

export const WishlistDrawer: React.FC = () => {
  const { items, isOpen, closeWishlist, removeItem, clearWishlist } = useWishlistStore();
  const addItemToCart = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const addToast = useUIStore((s) => s.addToast);

  if (!isOpen) return null;

  const handleMoveToCart = (product: typeof items[0]) => {
    addItemToCart(product, 1);
    removeItem(product.id);
    addToast('Moved to Shopping Bag', `${product.name} is now in your bag.`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1917]/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeWishlist}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#E8E2D7] animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#E8E2D7] bg-[#FAF8F5]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#B66C52] fill-[#B66C52]/20" />
                <h2 className="font-serif text-xl tracking-wide text-[#1C1917]">
                  Saved Wishlist
                </h2>
                <span className="text-xs font-sans px-2 py-0.5 rounded-full bg-[#EAE3D5] text-[#1C1917] font-medium">
                  {items.length}
                </span>
              </div>
              <button
                type="button"
                onClick={closeWishlist}
                className="p-1.5 text-[#575149] hover:text-[#1C1917] transition-colors rounded-full hover:bg-[#EAE3D5]/50"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-[#877E73] mt-1 font-sans">
              Keep track of cherished items for upcoming milestones, birthdays, or gifting.
            </p>
          </div>

          {/* List or Empty State */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#E8E2D7]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EAE3D5]/60 flex items-center justify-center text-[#877E73]">
                  <Heart className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#1C1917]">Your wishlist is empty</h3>
                  <p className="text-xs text-[#877E73] max-w-xs mt-1">
                    Tap the heart icon on any product to save timeless nursery essentials for later.
                  </p>
                </div>
                <a
                  href="/shop"
                  onClick={closeWishlist}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs font-medium tracking-wider uppercase hover:bg-[#B88B4A] transition-colors"
                >
                  Explore Collection
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((product) => (
                  <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                    {/* Thumbnail */}
                    <button
                      type="button"
                      onClick={() => {
                        closeWishlist();
                        useUIStore.getState().navigateToProduct(product.slug);
                      }}
                      className="w-20 h-24 bg-[#F2ECE1] rounded-lg overflow-hidden shrink-0 border border-[#E8E2D7] cursor-pointer"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </button>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-sm font-medium text-[#1C1917] leading-snug">
                            <button
                              type="button"
                              onClick={() => {
                                closeWishlist();
                                useUIStore.getState().navigateToProduct(product.slug);
                              }}
                              className="hover:text-[#B88B4A] transition-colors text-left cursor-pointer"
                            >
                              {product.name}
                            </button>
                          </h4>
                          <span className="text-sm font-semibold text-[#1C1917] tabular-nums">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#877E73] mt-0.5 line-clamp-1">
                          {product.subtitle}
                        </p>
                        <div className="mt-1">
                          <span className="inline-block text-[10px] px-2 py-0.5 bg-[#EDF3EC] text-[#3D6B4F] rounded-full font-medium">
                            In Stock
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between mt-3 pt-2">
                        <button
                          type="button"
                          onClick={() => handleMoveToCart(product)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C1917] hover:bg-[#B88B4A] text-[#FAF8F5] text-xs font-medium transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Bag</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          className="text-xs text-[#877E73] hover:text-[#A83A32] flex items-center gap-1 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E8E2D7] bg-[#FDFCFA] flex items-center justify-between">
              <button
                type="button"
                onClick={clearWishlist}
                className="text-xs text-[#877E73] hover:text-[#A83A32] underline"
              >
                Clear all items
              </button>

              <button
                type="button"
                onClick={() => {
                  closeWishlist();
                  openCart();
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1C1917] hover:text-[#B88B4A]"
              >
                <span>View Shopping Bag</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
