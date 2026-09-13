'use client';
import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Gift, Sparkles, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useUIStore } from '../stores/uiStore';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getShippingCost,
    getDiscountAmount,
    getTotal,
    getProgressToFreeShipping,
    promoCode,
    applyPromoCode,
    removePromoCode,
  } = useCartStore();

  const openCheckout = useUIStore((s) => s.openCheckout);
  const addToast = useUIStore((s) => s.addToast);

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [giftNoteOpen, setGiftNoteOpen] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  if (!isOpen) return null;

  const { amountNeeded, percentage, isFree } = getProgressToFreeShipping();
  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingCost();
  const total = getTotal();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const result = applyPromoCode(promoInput);
    if (result.success) {
      setPromoError('');
      setPromoInput('');
      addToast('Promo Code Applied', result.message, 'success');
    } else {
      setPromoError(result.message);
    }
  };

  const handleProceedToCheckout = () => {
    closeCart();
    openCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1917]/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#E8E2D7] animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#E8E2D7] bg-[#FAF8F5]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#1C1917]" />
                <h2 className="font-serif text-xl tracking-wide text-[#1C1917]">
                  Your Shopping Bag
                </h2>
                <span className="text-xs font-sans px-2 py-0.5 rounded-full bg-[#EAE3D5] text-[#1C1917] font-medium">
                  {items.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="p-1.5 text-[#575149] hover:text-[#1C1917] transition-colors rounded-full hover:bg-[#EAE3D5]/50"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="mt-4 pt-3 border-t border-[#E8E2D7]/60">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-[#1C1917] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#B88B4A]" />
                  {isFree ? (
                    <span className="text-[#3D6B4F] font-semibold">
                      Complimentary Luxury Delivery Unlocked!
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-[#B88B4A] font-semibold">${amountNeeded.toFixed(2)}</strong> for free shipping
                    </span>
                  )}
                </span>
                <span className="text-[#877E73] font-mono">{percentage}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E8E2D7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#B88B4A] transition-all duration-500 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Item List / Empty State */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#E8E2D7]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EAE3D5]/60 flex items-center justify-center text-[#877E73]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#1C1917]">Your bag is empty</h3>
                  <p className="text-xs text-[#877E73] max-w-xs mt-1">
                    Discover our thoughtfully selected baby and children’s essentials designed for everyday wonder.
                  </p>
                </div>
                <a
                  href="/shop"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs font-medium tracking-wider uppercase hover:bg-[#B88B4A] transition-colors"
                >
                  Explore Collection
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                    {/* Thumbnail */}
                    <div className="w-20 h-24 bg-[#EAE3D5] rounded-md overflow-hidden shrink-0 border border-[#E8E2D7]">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-sm font-medium text-[#1C1917] leading-snug">
                            <a
                              href={`/product/${item.product.slug}`}
                              onClick={closeCart}
                              className="hover:text-[#B88B4A] transition-colors"
                            >
                              {item.product.name}
                            </a>
                          </h4>
                          <span className="text-sm font-semibold text-[#1C1917] tabular-nums">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Variant Chips */}
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-[#877E73]">
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                          {item.selectedSize && (
                            <>
                              <span>•</span>
                              <span>{item.selectedSize}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="flex items-center justify-between mt-3 pt-2">
                        <div className="flex items-center border border-[#E8E2D7] rounded-md bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2 text-[#575149] hover:text-[#1C1917] hover:bg-[#FAF8F5] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-[#1C1917] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-2 text-[#575149] hover:text-[#1C1917] hover:bg-[#FAF8F5] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
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

          {/* Footer with Calculations and Checkout CTA */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E8E2D7] bg-[#FDFCFA] space-y-4">
              {/* Gift Wrap Toggle */}
              <div className="border border-[#E8E2D7] rounded-lg p-3 bg-white">
                <button
                  type="button"
                  onClick={() => setGiftNoteOpen(!giftNoteOpen)}
                  className="w-full flex items-center justify-between text-xs text-[#1C1917] font-medium"
                >
                  <span className="flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-[#B88B4A]" />
                    Complimentary Handwritten Gift Card
                  </span>
                  <span className="text-[#877E73]">{giftNoteOpen ? 'Hide' : '+ Add Note'}</span>
                </button>
                {giftNoteOpen && (
                  <textarea
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Write a sweet congratulatory message to include on our letterpress note card..."
                    className="w-full mt-2 p-2 text-xs border border-[#E8E2D7] rounded bg-[#FAF8F5] focus:outline-none focus:border-[#B88B4A]"
                    rows={2}
                  />
                )}
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo code (try WELCOME10)"
                  className="flex-1 px-3 py-2 text-xs uppercase tracking-wider border border-[#E8E2D7] rounded-md bg-white focus:outline-none focus:border-[#B88B4A]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FAF8F5] border border-[#E8E2D7] hover:bg-[#EAE3D5] text-xs font-medium text-[#1C1917] rounded-md transition-colors"
                >
                  Apply
                </button>
              </form>
              {promoError && <p className="text-[11px] text-[#A83A32]">{promoError}</p>}
              {promoCode && (
                <div className="flex items-center justify-between text-xs text-[#3D6B4F] bg-[#EBF4EE] px-2.5 py-1 rounded">
                  <span>Code <strong>{promoCode}</strong> applied</span>
                  <button
                    onClick={removePromoCode}
                    className="underline text-[11px] text-[#877E73] hover:text-[#A83A32]"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Order Calculations */}
              <div className="space-y-1.5 text-xs text-[#575149] pt-2 border-t border-[#E8E2D7]/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1C1917] tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#3D6B4F]">
                    <span>Privilege Discount</span>
                    <span className="tabular-nums">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-[#1C1917] tabular-nums">
                    {shipping === 0 ? (
                      <span className="text-[#3D6B4F] uppercase font-semibold text-[11px]">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-serif font-medium text-[#1C1917] pt-2 border-t border-[#E8E2D7]">
                  <span>Estimated Total</span>
                  <span className="font-sans font-bold tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#1C1917] hover:bg-[#B88B4A] text-[#FAF8F5] text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md focus:outline-none"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-[#877E73] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3D6B4F]" />
                  Secure SSL Checkout
                </span>
                <span>•</span>
                <span>30-Day Effortless Returns</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
