'use client';

import React, { useState } from 'react';
import { useCartStore } from '../stores/cartStore';
import { useUIStore } from '../stores/uiStore';
import { X, Plus, Minus, Trash2, Gift, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeItem,
    formatPrice,
    getSubtotalUSD,
    getDiscountAmountUSD,
    getFinalTotalUSD,
    promoCode,
    applyPromoCode,
    removePromoCode,
    discountPercentage,
    giftPackaging,
    setGiftPackaging,
    giftMessage
  } = useCartStore();

  const { showToast, setActivePageView, setSelectedProductSlug } = useUIStore();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [giftInputMessage, setGiftInputMessage] = useState(giftMessage);

  if (!isCartOpen) return null;

  const subtotal = getSubtotalUSD();
  const discount = getDiscountAmountUSD();
  const finalTotal = getFinalTotalUSD();
  const freeShippingThreshold = 500;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const success = applyPromoCode(promoInput);
    if (success) {
      showToast({
        title: 'VIP Privilege Applied',
        description: `${discountPercentage * 100}% atelier discount activated.`,
        type: 'success'
      });
      setPromoInput('');
    } else {
      setPromoError('Invalid privilege code. Try "ATELIER15" or "ARCHIVE2026".');
    }
  };

  return (
    <div className="fixed inset-0 z-[130] flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF8F5] text-[#0C0C0D] w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[#D4CDC3] animate-scale-in">
        {/* Header */}
        <div className="p-6 border-b border-[#E8E3DA] flex items-center justify-between bg-[#F5F2EB]">
          <div>
            <div className="text-[10px] tracking-ultra-wide uppercase text-[#71717A]">
              Atelier Client Bag
            </div>
            <h3 className="text-xl font-serif font-light text-[#0C0C0D]">
              Shopping Bag ({items.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 text-[#71717A] hover:text-[#0C0C0D] transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-[#FAF8F5] px-6 py-3 border-b border-[#E8E3DA]">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-[#52525B]">
              {subtotal >= freeShippingThreshold ? (
                <strong className="text-[#0C0C0D]">Complimentary Worldwide Courier Active</strong>
              ) : (
                <span>
                  Add <strong className="text-[#0C0C0D]">{formatPrice(freeShippingThreshold - subtotal)}</strong> for complimentary courier
                </span>
              )}
            </span>
            <span className="font-mono text-[11px] text-[#C5A880] font-medium">{progressPercent}%</span>
          </div>
          <div className="w-full h-1 bg-[#E8E3DA] overflow-hidden">
            <div
              className="h-full bg-[#0C0C0D] transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full border border-[#D4CDC3] flex items-center justify-center mb-4 text-[#71717A]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <p className="font-serif text-lg text-[#0C0C0D] mb-1">Your bag is currently empty.</p>
              <p className="text-xs text-[#71717A] max-w-xs mb-6">
                Discover exceptional craftsmanship in our 2026 Archive.
              </p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  setActivePageView('shop');
                }}
                className="bg-[#0C0C0D] text-[#FAF8F5] px-6 py-3 text-xs tracking-ultra-wide uppercase hover:bg-[#2A2A2E] transition-colors cursor-pointer"
              >
                Explore Archive
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-6 border-b border-[#E8E3DA] last:border-b-0"
              >
                <div
                  onClick={() => {
                    setCartOpen(false);
                    setSelectedProductSlug(item.product.slug);
                    setActivePageView('product');
                  }}
                  className="w-20 h-26 shrink-0 bg-[#F5F2EB] overflow-hidden border border-[#E8E3DA] cursor-pointer"
                >
                  <img
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <button
                        onClick={() => {
                          setCartOpen(false);
                          setSelectedProductSlug(item.product.slug);
                          setActivePageView('product');
                        }}
                        className="font-serif text-sm font-light text-[#0C0C0D] hover:text-[#C5A880] transition-colors line-clamp-1 text-left cursor-pointer"
                      >
                        {item.product.name}
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#A1A1AA] hover:text-[#0C0C0D] transition-colors p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#71717A] mt-1 space-x-2">
                      <span>Color: <strong className="text-[#0C0C0D]">{item.selectedColor}</strong></span>
                      <span>•</span>
                      <span>Size: <strong className="text-[#0C0C0D]">{item.selectedSize}</strong></span>
                    </div>

                    <div className="font-mono text-xs text-[#0C0C0D] mt-2">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>

                  {/* Quantity adjustment */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-[#D4CDC3] bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-[#52525B] hover:text-[#0C0C0D] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-mono text-[#0C0C0D]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-[#52525B] hover:text-[#0C0C0D] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-[10px] text-[#A1A1AA]">
                      {item.quantity > 1 ? `@ ${formatPrice(item.price)} ea` : ''}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Complimentary Bespoke Gift Packaging Toggle */}
          {items.length > 0 && (
            <div className="p-4 bg-[#F5F2EB] border border-[#E8E3DA] space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftPackaging}
                  onChange={(e) => setGiftPackaging(e.target.checked, giftInputMessage)}
                  className="accent-[#0C0C0D] w-4 h-4 cursor-pointer"
                />
                <span className="text-xs font-medium text-[#0C0C0D] flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#C5A880]" />
                  Bespoke Gift Packaging & Scent Infusion ($25)
                </span>
              </label>

              {giftPackaging && (
                <div className="animate-fade-in pl-6 space-y-2">
                  <p className="text-[11px] text-[#52525B]">
                    Includes handmade mulberry paper box, silk ribbon, and personalized calligraphy note.
                  </p>
                  <input
                    type="text"
                    value={giftInputMessage}
                    onChange={(e) => {
                      setGiftInputMessage(e.target.value);
                      setGiftPackaging(true, e.target.value);
                    }}
                    placeholder="Enter recipient message for calligraphy card..."
                    className="w-full bg-white border border-[#D4CDC3] p-2 text-xs text-[#0C0C0D] placeholder-[#A1A1AA] focus:outline-none focus:border-[#0C0C0D]"
                  />
                </div>
              )}
            </div>
          )}

          {/* Promo code field */}
          {items.length > 0 && (
            <div className="pt-2">
              {promoCode ? (
                <div className="flex items-center justify-between p-3 bg-[#0C0C0D] text-[#FAF8F5] text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Code <strong className="text-[#C5A880]">{promoCode}</strong> applied ({discountPercentage * 100}% off)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-[#A1A1AA] hover:text-white cursor-pointer underline text-[10px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Privilege code (e.g. ATELIER15)"
                    className="flex-1 bg-white border border-[#D4CDC3] px-3 py-2 text-xs text-[#0C0C0D] placeholder-[#A1A1AA] focus:outline-none focus:border-[#0C0C0D]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0C0C0D] text-[#FAF8F5] text-xs tracking-wider uppercase hover:bg-[#2A2A2E] cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-[#B91C1C] mt-1.5">{promoError}</p>
              )}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-6 bg-[#F5F2EB] border-t border-[#E8E3DA] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#71717A]">
                <span>Archive Subtotal</span>
                <span className="font-mono text-[#0C0C0D]">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#A38356]">
                  <span>Privilege Savings</span>
                  <span className="font-mono">-{formatPrice(discount)}</span>
                </div>
              )}
              {giftPackaging && (
                <div className="flex justify-between text-[#71717A]">
                  <span>Bespoke Presentation</span>
                  <span className="font-mono text-[#0C0C0D]">{formatPrice(25)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#71717A]">
                <span>Courier Delivery</span>
                <span className="font-mono text-[#0C0C0D]">
                  {subtotal >= freeShippingThreshold ? 'Complimentary' : formatPrice(35)}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif text-[#0C0C0D] pt-2 border-t border-[#D4CDC3]">
                <span>Estimated Total</span>
                <span className="font-mono font-medium">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setCartOpen(false);
                setActivePageView('checkout');
              }}
              className="w-full bg-[#0C0C0D] hover:bg-[#2A2A2E] text-[#FAF8F5] py-4 px-6 text-xs tracking-ultra-wide uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer font-medium"
            >
              <span>Proceed to Atelier Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] tracking-wider uppercase text-[#71717A]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Insured Courier • 30-Day Atelier Returns</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
