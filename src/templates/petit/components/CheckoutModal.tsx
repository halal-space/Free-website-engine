'use client';
import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, CreditCard, Sparkles, ArrowRight, Truck } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';
import { useCartStore } from '../stores/cartStore';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, closeCheckout, addToast } = useUIStore();
  const { items, getSubtotal, getDiscountAmount, getShippingCost, getTotal, clearCart } = useCartStore();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [formData, setFormData] = useState({
    firstName: 'Emma',
    lastName: 'Sinclair',
    email: 'emma.sinclair@example.com',
    address: '45 Sloane Gardens',
    city: 'London',
    postalCode: 'SW1W 8EB',
    country: 'United Kingdom',
    deliveryMethod: 'complimentary',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '08/28',
    cardCvc: '•••',
  });

  const [orderNumber, setOrderNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = formData.deliveryMethod === 'express' ? 18.0 : getShippingCost();
  const total = Math.max(0, subtotal - discount + shipping);

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = `MP-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);
    setStep('confirmation');
    clearCart();
    addToast('Order Confirmed', `Order ${generatedOrderNum} placed successfully!`, 'success');
  };

  const handleClose = () => {
    setStep('shipping');
    closeCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1917]/65 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8E2D7] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E8E2D7] bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-[#B88B4A]" />
            <span className="font-serif text-lg tracking-wider text-[#1C1917]">
              Maison Petit Checkout
            </span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-[#575149] hover:text-[#1C1917] rounded-full"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progression Bar */}
        {step !== 'confirmation' && (
          <div className="flex border-b border-[#E8E2D7] text-xs font-medium bg-[#FDFCFA]">
            <div
              className={`flex-1 py-3 text-center transition-colors ${
                step === 'shipping'
                  ? 'text-[#1C1917] border-b-2 border-[#1C1917] font-semibold'
                  : 'text-[#877E73]'
              }`}
            >
              1. Delivery Address
            </div>
            <div
              className={`flex-1 py-3 text-center transition-colors ${
                step === 'payment'
                  ? 'text-[#1C1917] border-b-2 border-[#1C1917] font-semibold'
                  : 'text-[#877E73]'
              }`}
            >
              2. Payment & Review
            </div>
          </div>
        )}

        {/* Step 1: Shipping Info */}
        {step === 'shipping' && (
          <form onSubmit={handleSubmitShipping} className="p-6 sm:p-8 space-y-4">
            <h3 className="font-serif text-lg text-[#1C1917]">Shipping Destination</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#575149] mb-1">First Name</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8E2D7] rounded-md bg-white focus:border-[#B88B4A] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#575149] mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8E2D7] rounded-md bg-white focus:border-[#B88B4A] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#575149] mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-[#E8E2D7] rounded-md bg-white focus:border-[#B88B4A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#575149] mb-1">Street Address</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-[#E8E2D7] rounded-md bg-white focus:border-[#B88B4A] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#575149] mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8E2D7] rounded-md bg-white focus:border-[#B88B4A] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#575149] mb-1">Postal Code</label>
                <input
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8E2D7] rounded-md bg-white focus:border-[#B88B4A] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#575149] mb-1">Country</label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8E2D7] rounded-md bg-white focus:border-[#B88B4A] focus:outline-none"
                />
              </div>
            </div>

            {/* Delivery Method Choice */}
            <div className="pt-2">
              <label className="block text-xs font-medium text-[#1C1917] mb-2">Delivery Speed</label>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 border border-[#E8E2D7] rounded-lg bg-white cursor-pointer hover:border-[#B88B4A]">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={formData.deliveryMethod === 'complimentary'}
                      onChange={() => setFormData({ ...formData, deliveryMethod: 'complimentary' })}
                      className="accent-[#1C1917]"
                    />
                    <div>
                      <span className="text-xs font-medium text-[#1C1917] block">
                        Standard Carbon-Neutral Delivery (2–4 Business Days)
                      </span>
                      <span className="text-[11px] text-[#877E73]">
                        Packed in recycled luxury tissue and sealed with biodegradable seal
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#3D6B4F]">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </label>

                <label className="flex items-center justify-between p-3 border border-[#E8E2D7] rounded-lg bg-white cursor-pointer hover:border-[#B88B4A]">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={formData.deliveryMethod === 'express'}
                      onChange={() => setFormData({ ...formData, deliveryMethod: 'express' })}
                      className="accent-[#1C1917]"
                    />
                    <div>
                      <span className="text-xs font-medium text-[#1C1917] block">
                        White Glove Express (Next Day by 12 PM)
                      </span>
                      <span className="text-[11px] text-[#877E73]">
                        Courier priority dispatch with real-time SMS tracking
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#1C1917]">$18.00</span>
                </label>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#1C1917] hover:bg-[#B88B4A] text-[#FAF8F5] text-xs font-semibold tracking-widest uppercase transition-colors"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment */}
        {step === 'payment' && (
          <form onSubmit={handleCompleteOrder} className="p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg text-[#1C1917]">Payment Method</h3>
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="text-xs text-[#B88B4A] hover:underline"
              >
                Edit Shipping
              </button>
            </div>

            {/* Payment options banner */}
            <div className="p-3 border border-[#E8E2D7] rounded-lg bg-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#B88B4A]" />
                <span className="text-xs font-medium text-[#1C1917]">Credit / Debit Card</span>
              </div>
              <div className="flex gap-1.5 text-[10px] text-[#877E73]">
                <span className="px-1.5 py-0.5 bg-[#FAF8F5] border rounded">Visa</span>
                <span className="px-1.5 py-0.5 bg-[#FAF8F5] border rounded">Mastercard</span>
                <span className="px-1.5 py-0.5 bg-[#FAF8F5] border rounded">Amex</span>
                <span className="px-1.5 py-0.5 bg-[#FAF8F5] border rounded">Apple Pay</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#575149] mb-1">Card Number</label>
                <input
                  type="text"
                  required
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8E2D7] rounded-md bg-white focus:border-[#B88B4A] focus:outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#575149] mb-1">Expiry Date</label>
                  <input
                    type="text"
                    required
                    value={formData.cardExpiry}
                    onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E8E2D7] rounded-md bg-white focus:border-[#B88B4A] focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#575149] mb-1">Security Code (CVC)</label>
                  <input
                    type="text"
                    required
                    value={formData.cardCvc}
                    onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E8E2D7] rounded-md bg-white focus:border-[#B88B4A] focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary box */}
            <div className="p-4 bg-[#F2ECE1] rounded-xl border border-[#E8E2D7] space-y-2 text-xs">
              <div className="flex justify-between text-[#575149]">
                <span>Items ({items.reduce((acc, i) => acc + i.quantity, 0)})</span>
                <span className="font-medium text-[#1C1917] tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#3D6B4F]">
                  <span>Privilege Discount</span>
                  <span className="tabular-nums">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#575149]">
                <span>Shipping ({formData.deliveryMethod})</span>
                <span className="font-medium text-[#1C1917] tabular-nums">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#DDD5C7] flex justify-between text-sm font-serif font-medium text-[#1C1917]">
                <span>Total Due</span>
                <span className="font-sans font-bold tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="text-xs text-[#575149] hover:underline"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#1C1917] hover:bg-[#B88B4A] text-[#FAF8F5] text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Place Order (${total.toFixed(2)})</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Order Confirmation */}
        {step === 'confirmation' && (
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#EBF4EE] flex items-center justify-center text-[#3D6B4F]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#B88B4A] font-semibold">
                Thank You For Entrusting Us
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1917] mt-1">
                Your Order is Confirmed
              </h3>
              <p className="text-xs text-[#877E73] mt-2 max-w-md mx-auto">
                We are carefully hand-packing your selection in our bespoke linen gift boxes. A confirmation email with receipt and tracking has been sent to <strong>{formData.email}</strong>.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="p-5 bg-white border border-[#E8E2D7] rounded-xl text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between pb-2 border-b border-[#E8E2D7]">
                <span className="text-[#877E73]">Order Reference</span>
                <span className="font-mono font-bold text-[#1C1917]">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#877E73]">Delivery To</span>
                <span className="font-medium text-[#1C1917]">{formData.firstName} {formData.lastName}, {formData.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#877E73]">Estimated Arrival</span>
                <span className="font-medium text-[#3D6B4F]">September 16–18, 2026</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-8 py-3 rounded-full bg-[#1C1917] hover:bg-[#B88B4A] text-[#FAF8F5] text-xs font-semibold tracking-widest uppercase transition-colors"
              >
                Return to Boutique
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
