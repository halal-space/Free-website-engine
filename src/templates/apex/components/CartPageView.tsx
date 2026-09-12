'use client';

import React, { useState } from 'react';
import { useCartStore } from '../stores/cartStore';
import { useUIStore } from '../stores/uiStore';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Gift,
  Truck,
  RotateCcw,
  Tag,
  Lock,
  ChevronRight
} from 'lucide-react';

interface CartPageViewProps {
  accentColor?: string;
}

export const CartPageView: React.FC<CartPageViewProps> = ({
  accentColor = '#3b82f6',
}) => {
  const {
    items,
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
    getItemCount,
  } = useCartStore();

  const { navigateToHome, navigateToShop, navigateToCheckout, navigateToProduct } = useUIStore();

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingCost();
  const gift = getGiftPackagingCost();
  const total = getTotal();
  const count = getItemCount();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    const res = applyPromo(promoCodeInput);
    if (res.success) {
      setPromoCodeInput('');
      setPromoError('');
    } else {
      setPromoError(res.message);
    }
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
          <span className="text-[var(--text-primary)] font-semibold">Shopping Bag</span>
        </nav>

        <button
          onClick={() => navigateToShop()}
          className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Continue Browsing</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Header Banner */}
      <div className="space-y-2">
        <span
          className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block"
          style={{ color: accentColor }}
        >
          CONFIDENTIAL ALLOCATIONS
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Your Shopping Bag
        </h1>
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="py-24 text-center max-w-lg mx-auto space-y-6">
          <div className="w-20 h-20 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto text-[var(--text-muted)] shadow-lg">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Your Shopping Bag is Empty</h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Your collection has no active product reservations. Discover our flagship acoustics, titanium mobile devices, and horological wearables.
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Items Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                Reserved Items ({count})
              </h2>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                Dispatch Guaranteed
              </span>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)]"
                >
                  <div
                    onClick={() => navigateToProduct(item.slug)}
                    className="w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-black/40 border border-[var(--border-subtle)] flex-shrink-0 cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-blue-500">
                            {item.brand}
                          </span>
                          <div
                            onClick={() => navigateToProduct(item.slug)}
                            className="cursor-pointer"
                          >
                            <h3 className="text-base font-bold text-[var(--text-primary)] hover:text-blue-500 transition-colors">
                              {item.name}
                            </h3>
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-[var(--text-muted)] hover:text-red-500 transition-colors rounded-lg cursor-pointer"
                          aria-label={`Remove ${item.name} from bag`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 mt-2 text-xs text-[var(--text-secondary)]">
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className="w-3 h-3 rounded-full border border-white/20"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          {item.color.name}
                        </span>
                        {item.variant && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-xs text-[var(--text-muted)]">
                              {item.variant.name}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                      {/* Stepper */}
                      <div className="flex items-center border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-secondary)] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-mono font-bold text-[var(--text-primary)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-lg font-bold font-mono text-[var(--text-primary)]">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Privilege Promo Code Box */}
            <div className="p-6 rounded-2xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-blue-500" />
                <span>Privilege Authorization Code</span>
              </span>

              {appliedPromo ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold">{appliedPromo}</span>
                    <span>({promoDiscountPercent}% VIP Deduction Applied)</span>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-xs font-mono underline hover:text-white cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Enter code (e.g. AETHER10)"
                    className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] uppercase font-mono placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--text-primary)] text-[var(--text-primary)] hover:text-[var(--text-inverse)] text-xs font-semibold uppercase tracking-wider border border-[var(--border-subtle)] transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-xs text-red-400 font-mono">{promoError}</p>
              )}
            </div>

            {/* Packaging & Shipping Options */}
            <div className="p-6 rounded-2xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-5">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-500" />
                <span>Concierge Courier Options</span>
              </h3>

              {/* Shipping Radio Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'standard', name: 'Standard Courier', time: '3–5 Business Days', cost: 0 },
                  { id: 'express', name: 'Express Armored', time: '1–2 Business Days', cost: 45 },
                  { id: 'white-glove', name: 'Same-Day VIP', time: 'Immediate Delivery', cost: 120 },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setShippingMethod(opt.id as any)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      shippingMethod === opt.id
                        ? 'border-blue-500 bg-blue-500/10 ring-1 ring-blue-500'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-secondary)]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-[var(--text-primary)]">
                      <span>{opt.name}</span>
                      <span className="font-mono">{opt.cost === 0 ? 'FREE' : `$${opt.cost}`}</span>
                    </div>
                    <p className="text-[10px] font-mono text-[var(--text-muted)] mt-1">{opt.time}</p>
                  </button>
                ))}
              </div>

              {/* Gift Packaging Checkbox */}
              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftPackaging}
                    onChange={toggleGiftPackaging}
                    className="mt-0.5 rounded border-[var(--border-medium)] text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-blue-500" />
                      <span>Complimentary White-Glove Gift Presentation ($0)</span>
                    </span>
                    <p className="text-[11px] text-[var(--text-secondary)]">
                      Includes matte black acoustic rigid presentation case, wax-sealed certificate of testing, and personalized engraved gift plaque.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Sticky Summary Column */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-6 shadow-2xl">
              <h2 className="text-base font-bold font-mono uppercase tracking-widest text-[var(--text-primary)] pb-4 border-b border-[var(--border-subtle)]">
                Allocation Summary
              </h2>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Subtotal</span>
                  <span className="text-[var(--text-primary)] font-bold">${subtotal.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>VIP Privilege Discount</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Concierge Courier</span>
                  <span className="text-[var(--text-primary)] font-bold">
                    {shipping === 0 ? 'Complimentary' : `$${shipping.toLocaleString()}`}
                  </span>
                </div>

                {giftPackaging && (
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Bespoke Presentation</span>
                    <span className="text-emerald-400 font-bold">Complimentary</span>
                  </div>
                )}

                <div className="pt-4 border-t border-[var(--border-subtle)] flex justify-between items-baseline text-sm">
                  <span className="font-bold text-[var(--text-primary)] font-sans">Total Investment</span>
                  <span className="text-2xl font-black text-blue-500 font-mono">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={navigateToCheckout}
                  className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Proceed to Secure Checkout</span>
                </button>

                <button
                  onClick={() => navigateToShop()}
                  className="w-full py-3 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>

              {/* Trust Information */}
              <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2 text-[11px] text-[var(--text-muted)]">
                <p className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                  <span>256-Bit SSL Encrypted Protocol</span>
                </p>
                <p className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-blue-500" />
                  <span>Full 30-Day Evaluation Period</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
