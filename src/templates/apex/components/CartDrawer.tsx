'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '../stores/cartStore';
import { useUIStore } from '../stores/uiStore';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Gift, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    appliedPromo,
    promoDiscountPercent,
    applyPromo,
    removePromo,
    giftPackaging,
    toggleGiftPackaging,
    shippingMethod,
    setShippingMethod,
    getSubtotal,
    getDiscountAmount,
    getShippingCost,
    getGiftPackagingCost,
    getTotal,
    getItemCount
  } = useCartStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingCost();
  const giftCost = getGiftPackagingCost();
  const total = getTotal();
  const count = getItemCount();

  const freeShippingThreshold = 300;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (res.success) {
      setPromoInput('');
      setPromoError('');
    } else {
      setPromoError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
        onClick={closeCart}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-[var(--bg-elevated)] border-l border-[var(--border-subtle)] shadow-2xl flex flex-col transition-transform duration-300 ease-out"
          style={{ backgroundColor: 'var(--bg-elevated)' }}
        >
          {/* Header */}
          <div className="p-6 border-b border-[var(--border-subtle)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-500/15 flex items-center justify-center text-blue-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">Shopping Bag</h2>
                <p className="text-xs text-[var(--text-secondary)] font-mono uppercase tracking-wider">
                  {count} {count === 1 ? 'Item' : 'Items'} Reserved
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress */}
          <div className="px-6 py-3 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[var(--text-secondary)]">
                {subtotal >= freeShippingThreshold
                  ? '✓ Complimentary Global Shipping Unlocked'
                  : `Add $${remainingForFreeShipping} more for complimentary shipping`}
              </span>
              <span className="font-mono font-bold text-blue-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[var(--border-subtle)] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-muted)]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[var(--text-primary)]">Your bag is empty</h3>
                  <p className="text-xs text-[var(--text-secondary)] max-w-xs">
                    Explore our collection of precision acoustics, titanium smartphones, and timepieces.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider hover:bg-blue-500 transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-2xl luxury-card border border-[var(--border-subtle)] bg-[var(--bg-card)]"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[var(--bg-secondary)] flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-[var(--text-primary)] line-clamp-1">{item.name}</h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[var(--text-muted)] hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[var(--text-secondary)]">
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2 h-2 rounded-full inline-block"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          {item.color.name}
                        </span>
                        {item.variant && (
                          <>
                            <span>•</span>
                            <span className="line-clamp-1">{item.variant.name}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Modifier */}
                      <div className="flex items-center border border-[var(--border-subtle)] rounded-lg bg-[var(--bg-secondary)] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-semibold text-[var(--text-primary)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs">
                    <div className="flex items-center gap-2 text-blue-400 font-mono">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{appliedPromo} (-{promoDiscountPercent}%)</span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-xs text-[var(--text-muted)] hover:text-red-400 transition-colors cursor-pointer"
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
                      placeholder="Privilege Code (try AETHER10)"
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] uppercase placeholder:normal-case focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 rounded-xl bg-[var(--text-primary)] text-[var(--text-inverse)] text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="mt-1 text-[11px] text-red-400">{promoError}</p>
                )}
              </div>

              {/* Gift Packaging Toggle */}
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 cursor-pointer text-xs">
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <Gift className="w-4 h-4 text-blue-400" />
                  <span>Monolithic Gift Packaging (+$25)</span>
                </div>
                <input
                  type="checkbox"
                  checked={giftPackaging}
                  onChange={toggleGiftPackaging}
                  className="rounded border-[var(--border-subtle)] text-blue-600 focus:ring-0 cursor-pointer"
                />
              </label>

              {/* Shipping Method Selector */}
              <div className="grid grid-cols-3 gap-1.5 text-[11px] font-medium">
                <button
                  onClick={() => setShippingMethod('standard')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    shippingMethod === 'standard'
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                      : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-medium)]'
                  }`}
                >
                  <div className="font-bold">Standard</div>
                  <div className="text-[9px] font-mono text-[var(--text-muted)]">
                    {subtotal >= freeShippingThreshold ? 'FREE' : '$25'}
                  </div>
                </button>
                <button
                  onClick={() => setShippingMethod('express')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    shippingMethod === 'express'
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                      : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-medium)]'
                  }`}
                >
                  <div className="font-bold">Express</div>
                  <div className="text-[9px] font-mono text-[var(--text-muted)]">$35</div>
                </button>
                <button
                  onClick={() => setShippingMethod('white-glove')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    shippingMethod === 'white-glove'
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                      : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-medium)]'
                  }`}
                >
                  <div className="font-bold">White-Glove</div>
                  <div className="text-[9px] font-mono text-[var(--text-muted)]">$75</div>
                </button>
              </div>

              {/* Order Calculations */}
              <div className="space-y-1.5 text-xs pt-2 border-t border-[var(--border-subtle)]">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Subtotal</span>
                  <span className="font-mono text-[var(--text-primary)]">${subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-blue-400 font-mono">
                    <span>Privilege Savings</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Shipping</span>
                  <span className="font-mono text-[var(--text-primary)]">
                    {shipping === 0 ? 'Complimentary' : `$${shipping}`}
                  </span>
                </div>
                {giftCost > 0 && (
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Gift Packaging</span>
                    <span className="font-mono text-[var(--text-primary)]">${giftCost}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-2 border-t border-[var(--border-subtle)] font-bold text-sm text-[var(--text-primary)]">
                  <span>Total</span>
                  <span className="font-mono text-base sm:text-lg">${total.toLocaleString()} USD</span>
                </div>
              </div>

              {/* Checkout & Full Bag Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    closeCart();
                    useUIStore.getState().navigateToCheckout();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    closeCart();
                    useUIStore.getState().navigateToCart();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-semibold transition-colors cursor-pointer"
                >
                  View Full Shopping Bag
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[var(--text-muted)] font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>256-Bit Encrypted Concierge Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
