'use client';

import React, { useState } from 'react';
import { useCartStore } from '../stores/cartStore';
import { useUIStore } from '../stores/uiStore';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  CreditCard,
  Truck,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Printer,
  Home,
  Check,
  ChevronRight
} from 'lucide-react';

interface CheckoutViewProps {
  accentColor?: string;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  accentColor = '#3b82f6',
}) => {
  const {
    items,
    getSubtotal,
    getDiscountAmount,
    getShippingCost,
    getGiftPackagingCost,
    getTotal,
    clearCart,
  } = useCartStore();

  const { navigateToHome, navigateToCart, navigateToShop } = useUIStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [formData, setFormData] = useState({
    email: 'client.vip@aetherlabs.com',
    firstName: 'Alexander',
    lastName: 'Sterling',
    phone: '+1 (555) 234-8900',
    address: '740 Park Avenue',
    apartment: 'Penthouse 14B',
    city: 'New York',
    state: 'NY',
    postalCode: '10021',
    country: 'United States',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '•••',
  });

  const [orderReceipt, setOrderReceipt] = useState<{
    orderId: string;
    date: string;
    total: number;
  } | null>(null);

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingCost();
  const gift = getGiftPackagingCost();
  const total = getTotal();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCompleteOrder = () => {
    const orderId = `AE-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    setOrderReceipt({
      orderId,
      date: now,
      total,
    });

    clearCart();
    setStep(4);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (items.length === 0 && step !== 4) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto text-[var(--text-muted)]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Your bag has no active allocations</h2>
        <p className="text-xs text-[var(--text-secondary)]">Please select models before proceeding to checkout.</p>
        <button
          onClick={() => navigateToShop()}
          className="mt-4 px-6 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in text-[var(--text-primary)]">
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
          <button
            onClick={navigateToCart}
            className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            Shopping Bag
          </button>
          <span>/</span>
          <span className="text-[var(--text-primary)] font-semibold">Checkout</span>
        </nav>

        <button
          onClick={navigateToCart}
          className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Return to Bag</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Header Banner */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span
          className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block"
          style={{ color: accentColor }}
        >
          SECURE PROTOCOL
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Finalize Allocation
        </h1>
        <p className="text-xs text-[var(--text-secondary)]">
          Encrypted authorization. Complimentary White-Glove courier with real-time GPS dispatch.
        </p>
      </div>

      {/* 4-Step Distraction-Free Wizard Navigation */}
      <div className="flex items-center justify-between max-w-2xl mx-auto px-4">
        {[
          { num: 1, label: 'Information' },
          { num: 2, label: 'Shipping' },
          { num: 3, label: 'Payment' },
          { num: 4, label: 'Confirmation' },
        ].map((s, idx) => (
          <React.Fragment key={s.num}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                  step === s.num
                    ? 'bg-blue-600 text-white ring-4 ring-blue-500/20'
                    : step > s.num
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-muted)]'
                }`}
              >
                {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
              </div>
              <span
                className={`text-[10px] font-mono uppercase tracking-wider mt-1.5 ${
                  step === s.num ? 'text-blue-500 font-bold' : 'text-[var(--text-muted)]'
                }`}
              >
                {s.label}
              </span>
            </div>
            {idx < 3 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  step > idx + 1 ? 'bg-emerald-500' : 'bg-[var(--border-subtle)]'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Confirmation Step 4 Screen */}
      {step === 4 && orderReceipt ? (
        <div className="max-w-2xl mx-auto rounded-3xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] p-8 sm:p-12 text-center space-y-8 shadow-2xl animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-blue-500 font-bold block">
              ALLOCATION CONFIRMED
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
              Thank you, {formData.firstName}.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Your bespoke reservation has been cataloged. Our laboratory technicians are preparing your shipment.
            </p>
          </div>

          {/* Receipt Details Box */}
          <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-4 text-left font-mono text-xs">
            <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
              <span className="text-[var(--text-muted)]">ORDER REFERENCE</span>
              <span className="text-[var(--text-primary)] font-bold">{orderReceipt.orderId}</span>
            </div>
            <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
              <span className="text-[var(--text-muted)]">TRANSACTION DATE</span>
              <span className="text-[var(--text-primary)]">{orderReceipt.date}</span>
            </div>
            <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
              <span className="text-[var(--text-muted)]">RECIPIENT DISPATCH</span>
              <span className="text-[var(--text-primary)]">
                {formData.address}, {formData.city}, {formData.state}
              </span>
            </div>
            <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
              <span className="text-[var(--text-muted)]">TOTAL INVESTMENT</span>
              <span className="text-blue-500 font-bold text-sm">
                ${orderReceipt.total.toLocaleString()} USD
              </span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-[var(--text-muted)]">ESTIMATED COURIER ARRIVAL</span>
              <span className="text-emerald-500 font-bold">Within 48 Hours</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') window.print();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[var(--border-subtle)] text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Order Receipt</span>
            </button>
            <button
              onClick={navigateToHome}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Return to Storefront</span>
            </button>
          </div>
        </div>
      ) : (
        /* Steps 1-3 Form + Sticky Summary Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Step Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Information */}
            {step === 1 && (
              <div className="p-6 sm:p-8 rounded-3xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    1. Contact & Dispatch Destination
                  </h3>
                  <span className="text-xs font-mono text-[var(--text-muted)]">Step 1 of 3</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="client@company.com"
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                      Direct Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={navigateToCart}
                    className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Bag
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    <span>Proceed to Shipping</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Shipping Method */}
            {step === 2 && (
              <div className="p-6 sm:p-8 rounded-3xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    2. Select Courier Protocol
                  </h3>
                  <span className="text-xs font-mono text-[var(--text-muted)]">Step 2 of 3</span>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: 'standard',
                      name: 'White-Glove Standard Courier',
                      time: '3–5 Business Days',
                      cost: 0,
                      desc: 'Temperature-regulated GPS-tracked vehicle transport with tamper-evident seal.',
                    },
                    {
                      id: 'express',
                      name: 'Express Armored Transit',
                      time: '1–2 Business Days',
                      cost: 45,
                      desc: 'Dedicated overnight transit with signature-required biometric delivery.',
                    },
                    {
                      id: 'white-glove',
                      name: 'Direct VIP Concierge Flight',
                      time: 'Same-Day / Next-Morning',
                      cost: 120,
                      desc: 'Dedicated courier hand-delivering to your residence or private aviation terminal.',
                    },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleInputChange('shippingMethod', opt.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        formData.shippingMethod === opt.id
                          ? 'border-blue-500 bg-blue-500/10 ring-1 ring-blue-500'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:border-[var(--border-medium)]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[var(--text-primary)]">
                        <span className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-blue-500" />
                          <span>{opt.name}</span>
                        </span>
                        <span className="font-mono">{opt.cost === 0 ? 'COMPLIMENTARY' : `$${opt.cost}`}</span>
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)] mt-1.5">{opt.desc}</p>
                      <span className="text-[10px] font-mono text-blue-400 mt-2 block">{opt.time}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Information
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="p-6 sm:p-8 rounded-3xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    3. Payment Authorization
                  </h3>
                  <span className="text-xs font-mono text-[var(--text-muted)]">Step 3 of 3</span>
                </div>

                <div className="flex gap-2">
                  {[
                    { id: 'card', name: 'Credit Card', icon: CreditCard },
                    { id: 'applepay', name: 'Apple Pay', icon: Sparkles },
                    { id: 'paypal', name: 'PayPal', icon: Lock },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        onClick={() => handleInputChange('paymentMethod', m.id)}
                        className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                          formData.paymentMethod === m.id
                            ? 'border-blue-500 bg-blue-500/10 text-blue-500 ring-1 ring-blue-500'
                            : 'border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{m.name}</span>
                      </button>
                    );
                  })}
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4 p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        placeholder="•••• •••• •••• 4242"
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)] font-mono focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={formData.cardExpiry}
                          onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                          placeholder="MM / YY"
                          className="w-full px-4 py-2.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)] font-mono focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                          Security CVC
                        </label>
                        <input
                          type="text"
                          value={formData.cardCvc}
                          onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                          placeholder="•••"
                          className="w-full px-4 py-2.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)] font-mono focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Shipping
                  </button>
                  <button
                    onClick={handleCompleteOrder}
                    className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Authorize Allocation · ${total.toLocaleString()}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Summary Column */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-6 shadow-2xl">
              <h3 className="text-sm font-bold font-mono uppercase tracking-widest text-[var(--text-primary)] pb-4 border-b border-[var(--border-subtle)]">
                Reserved Allocations ({items.length})
              </h3>

              {/* Items Mini List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map((it) => (
                  <div key={it.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/40 border border-[var(--border-subtle)] flex-shrink-0">
                      <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">{it.name}</h4>
                      <p className="text-[10px] text-[var(--text-muted)] font-mono">
                        {it.color.name} {it.variant ? `· ${it.variant.name}` : ''} × {it.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
                      ${(it.price * it.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2.5 font-mono text-xs">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Subtotal</span>
                  <span className="text-[var(--text-primary)] font-bold">${subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>VIP Privilege</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Courier Transit</span>
                  <span className="text-[var(--text-primary)] font-bold">
                    {shipping === 0 ? 'Complimentary' : `$${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-[var(--border-subtle)] flex justify-between items-baseline text-sm">
                  <span className="font-bold text-[var(--text-primary)] font-sans">Total</span>
                  <span className="text-xl font-black text-blue-500 font-mono">
                    ${total.toLocaleString()} USD
                  </span>
                </div>
              </div>

              {/* Guarantee badge */}
              <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center gap-2.5 text-[11px] text-[var(--text-muted)]">
                <ShieldCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>Protected by AETHER 256-Bit Escrow & Courier Assurance.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
