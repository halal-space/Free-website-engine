'use client';

import React, { useState } from 'react';
import { useCartStore } from '../stores/cartStore';
import { useUIStore } from '../stores/uiStore';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Gift,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Truck
} from 'lucide-react';

interface CheckoutViewProps {
  accentColor?: string;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  accentColor = '#C5A880'
}) => {
  const {
    items,
    formatPrice,
    getSubtotalUSD,
    getDiscountAmountUSD,
    promoCode,
    applyPromoCode,
    removePromoCode,
    discountPercentage,
    giftPackaging,
    setGiftPackaging,
    giftMessage,
    clearCart
  } = useCartStore();

  const {
    showToast,
    setActivePageView,
    checkoutConfirmation,
    setCheckoutConfirmation
  } = useUIStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [formData, setFormData] = useState({
    email: 'client@atelier-velene.com',
    firstName: 'Jean',
    lastName: 'Vélène',
    phone: '+33 6 12 34 56 78',
    address: '18 Rue du Faubourg Saint-Honoré',
    apartment: 'Private Suite 4',
    city: 'Paris',
    postalCode: '75008',
    country: 'France',
    deliveryMethod: 'courier-complimentary',
    giftBox: giftPackaging,
    customCardMessage: giftMessage || 'With utmost appreciation for the 2026 Archive.',
    paymentMethod: 'card',
    cardNumber: '4242 •••• •••• 9821',
    cardExpiry: '09/28',
    cardCvc: '•••',
    cardName: 'Jean Vélène'
  });

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getSubtotalUSD();
  const discount = getDiscountAmountUSD();
  const deliveryCost = formData.deliveryMethod === 'white-glove-express' ? 45 : 0;
  const giftCost = formData.giftBox ? 25 : 0;
  const totalUSD = Math.max(0, subtotal - discount + deliveryCost + giftCost);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
      setPromoError('Invalid privilege code. Try "ATELIER15".');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const randomOrderNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `AV-2026-${randomOrderNum}`;

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      setCheckoutConfirmation({
        orderId,
        email: formData.email || 'client@atelier-velene.com',
        name: formData.firstName || 'Honored Client'
      });
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 800);
  };

  // 1. ORDER CONFIRMATION VIEW (Matches cloth_store/src/pages/checkout/confirmation.astro)
  if (checkoutConfirmation) {
    const { orderId, email, name } = checkoutConfirmation;

    return (
      <div className="py-16 sm:py-24 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="bg-white border border-[#D4CDC3] p-8 sm:p-14 shadow-xl space-y-8 relative">
            <div className="text-center space-y-3 pb-8 border-b border-[#E8E3DA]">
              <div className="w-12 h-12 rounded-full bg-[#0C0C0D] text-[#C5A880] mx-auto flex items-center justify-center mb-2">
                <CheckCircle2 className="w-6 h-6" style={{ color: accentColor }} />
              </div>

              <span
                className="text-[10px] font-mono tracking-ultra-wide uppercase block"
                style={{ color: accentColor }}
              >
                Maison Atelier Vélène • Paris
              </span>

              <h1 className="text-3xl sm:text-4xl font-serif font-light text-[#0C0C0D]">
                Order & Provenance Confirmed
              </h1>

              <p className="text-xs sm:text-sm text-[#52525B] max-w-lg mx-auto font-light leading-relaxed">
                Thank you, <strong className="text-[#0C0C0D]">{name}</strong>. Your acquisition has been officially registered in the 2026 Maison archive.
              </p>

              <div className="inline-block bg-[#F5F2EB] border border-[#E8E3DA] px-4 py-2 text-xs font-mono text-[#0C0C0D] mt-2">
                Archive Registry Reference: <strong style={{ color: accentColor }}>{orderId}</strong>
              </div>
            </div>

            {/* Real-Time Delivery Timeline */}
            <div className="space-y-6">
              <span className="text-[11px] tracking-wider uppercase text-[#71717A] block font-medium">
                Atelier Preparation & White-Glove Tracking Timeline
              </span>

              <div className="space-y-4 text-xs font-sans">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#0C0C0D] text-[#C5A880] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: accentColor }} />
                  </div>
                  <div className="flex-1 pb-4 border-b border-[#F5F2EB]">
                    <strong className="text-[#0C0C0D] block font-medium">Order Confirmed & Provenance Issued</strong>
                    <span className="text-[11px] text-[#71717A]">
                      Registered in Paris Archive database • Digital certificate dispatched to {email}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-6 h-6 rounded-full text-[#0C0C0D] flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold"
                    style={{ backgroundColor: accentColor }}
                  >
                    2
                  </div>
                  <div className="flex-1 pb-4 border-b border-[#F5F2EB]">
                    <strong className="text-[#0C0C0D] block font-medium">Master Tailor Inspection & Steam Shaping</strong>
                    <span className="text-[11px] text-[#71717A]">In progress at 18 Rue du Faubourg Saint-Honoré salon</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#F5F2EB] border border-[#D4CDC3] text-[#71717A] flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px]">
                    3
                  </div>
                  <div className="flex-1 pb-4 border-b border-[#F5F2EB]">
                    <strong className="text-[#71717A] block font-medium">Hand-Packaging in Mulberry Box & Cedar Shroud</strong>
                    <span className="text-[11px] text-[#A1A1AA]">Infused with signature Maison iris & cedar scent</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#F5F2EB] border border-[#D4CDC3] text-[#71717A] flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px]">
                    4
                  </div>
                  <div className="flex-1">
                    <strong className="text-[#71717A] block font-medium">Insured White-Glove Courier Dispatch</strong>
                    <span className="text-[11px] text-[#A1A1AA]">Estimated courier delivery in 2-3 business days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* VIP Concierge Support Card */}
            <div className="p-6 bg-[#F5F2EB] border border-[#E8E3DA] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <strong className="text-xs font-serif text-[#0C0C0D] block">Need Personal Atelier Assistance?</strong>
                <p className="text-[11px] text-[#71717A]">
                  Your dedicated client concierge is available 24/7 for delivery adjustments or sizing queries.
                </p>
              </div>
              <button
                onClick={() => {
                  setCheckoutConfirmation(null);
                  setActivePageView('appointments');
                }}
                className="px-5 py-2.5 bg-[#0C0C0D] text-[#FAF8F5] text-[10px] tracking-ultra-wide uppercase hover:bg-[#C5A880] transition-colors shrink-0 font-medium cursor-pointer"
              >
                Contact Concierge
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#E8E3DA] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => {
                  setCheckoutConfirmation(null);
                  setActivePageView('account');
                }}
                className="text-xs tracking-wider uppercase text-[#71717A] hover:text-[#0C0C0D] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Client Portal</span>
              </button>

              <button
                onClick={() => {
                  setCheckoutConfirmation(null);
                  setActivePageView('shop');
                }}
                className="px-6 py-3 bg-[#0C0C0D] text-[#FAF8F5] text-xs tracking-ultra-wide uppercase hover:bg-[#2A2A2E] transition-colors cursor-pointer font-medium"
              >
                Continue Browsing Archive
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. EMPTY BAG CHECKOUT VIEW
  if (items.length === 0) {
    return (
      <div className="py-24 bg-[#FAF8F5] text-center">
        <div className="max-w-md mx-auto p-8 border border-[#E8E3DA] bg-white space-y-4">
          <h2 className="text-xl font-serif text-[#0C0C0D]">Your bag is currently empty.</h2>
          <p className="text-xs text-[#71717A]">
            Please select garments from our 2026 Archive before proceeding to atelier checkout.
          </p>
          <button
            onClick={() => setActivePageView('shop')}
            className="inline-block bg-[#0C0C0D] text-[#FAF8F5] px-8 py-3.5 text-xs tracking-ultra-wide uppercase hover:bg-[#C5A880] transition-colors font-medium cursor-pointer"
          >
            Explore Archive
          </button>
        </div>
      </div>
    );
  }

  // 3. MAIN MULTI-STEP LUXURY CHECKOUT FLOW (Matches cloth_store/src/components/CheckoutFlow.tsx)
  return (
    <div className="py-12 sm:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Step Indicator */}
        <div className="mb-12 pb-6 border-b border-[#E8E3DA] flex items-center justify-between">
          <div>
            <span
              className="text-[10px] tracking-ultra-wide uppercase block mb-1"
              style={{ color: accentColor }}
            >
              Encrypted Atelier Checkout
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-[#0C0C0D]">
              Secure Order Placement
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono">
            <span className={step >= 1 ? 'text-[#0C0C0D] font-medium' : 'text-[#A1A1AA]'}>01 Client</span>
            <span className="text-[#D4CDC3]">/</span>
            <span className={step >= 2 ? 'text-[#0C0C0D] font-medium' : 'text-[#A1A1AA]'}>02 Delivery</span>
            <span className="text-[#D4CDC3]">/</span>
            <span className={step >= 3 ? 'text-[#0C0C0D] font-medium' : 'text-[#A1A1AA]'}>03 Packaging</span>
            <span className="text-[#D4CDC3]">/</span>
            <span className={step >= 4 ? 'text-[#0C0C0D] font-medium' : 'text-[#A1A1AA]'}>04 Payment</span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Flow Steps (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-[#E8E3DA] shadow-sm">
            {/* Step 1: Client Information */}
            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-[#F5F2EB]">
                  <h3 className="text-lg font-serif font-light text-[#0C0C0D]">
                    1. Client Identification
                  </h3>
                  <span className="text-[10px] font-mono text-[#71717A] uppercase">Step 1 of 4</span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                      Confidential Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="client@domain.com"
                      className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                    />
                    <p className="text-[10px] text-[#A1A1AA] mt-1">
                      Digital Certificate of Authenticity and courier tracking will be dispatched to this address.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Jean"
                        className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Vélène"
                        className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                      Phone Number (for Courier SMS Notification) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setActivePageView('shop')}
                    className="text-xs tracking-wider uppercase text-[#71717A] hover:text-[#0C0C0D] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Return to Archive</span>
                  </button>

                  <button
                    type="submit"
                    className="bg-[#0C0C0D] hover:bg-[#2A2A2E] text-[#FAF8F5] py-3.5 px-8 text-xs tracking-ultra-wide uppercase transition-colors flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <span>Continue to Delivery</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Shipping & Delivery Method */}
            {step === 2 && (
              <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-[#F5F2EB]">
                  <h3 className="text-lg font-serif font-light text-[#0C0C0D]">
                    2. Atelier Delivery Address
                  </h3>
                  <span className="text-[10px] font-mono text-[#71717A] uppercase">Step 2 of 4</span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="18 Rue du Faubourg Saint-Honoré"
                      className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                        Suite / Penthouse / Floor
                      </label>
                      <input
                        type="text"
                        value={formData.apartment}
                        onChange={(e) => handleInputChange('apartment', e.target.value)}
                        placeholder="Apt 4B"
                        className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Paris"
                        className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        placeholder="75008"
                        className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                        Country / Territory *
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                      >
                        <option value="France">France</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Italy">Italy</option>
                        <option value="Japan">Japan</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Germany">Germany</option>
                      </select>
                    </div>
                  </div>

                  {/* Delivery Selection */}
                  <div className="pt-4 border-t border-[#F5F2EB] space-y-3">
                    <span className="text-[11px] tracking-wider uppercase text-[#71717A] block font-medium">
                      Select Courier Service
                    </span>

                    <label className="flex items-start gap-3 p-3.5 border border-[#D4CDC3] cursor-pointer hover:border-[#0C0C0D] transition-colors">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="courier-complimentary"
                        checked={formData.deliveryMethod === 'courier-complimentary'}
                        onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                        className="mt-0.5 accent-[#0C0C0D]"
                      />
                      <div className="flex-1 flex justify-between">
                        <div>
                          <strong className="text-xs text-[#0C0C0D] block">Complimentary Insured Courier (DHL Express)</strong>
                          <span className="text-[11px] text-[#71717A]">Delivered in 2-3 business days in archival garment shroud.</span>
                        </div>
                        <span className="font-mono text-xs font-medium" style={{ color: accentColor }}>Free</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 border border-[#D4CDC3] cursor-pointer hover:border-[#0C0C0D] transition-colors">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="white-glove-express"
                        checked={formData.deliveryMethod === 'white-glove-express'}
                        onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                        className="mt-0.5 accent-[#0C0C0D]"
                      />
                      <div className="flex-1 flex justify-between">
                        <div>
                          <strong className="text-xs text-[#0C0C0D] block">White-Glove VIP Same-Day Hand Courier ($45)</strong>
                          <span className="text-[11px] text-[#71717A]">Dedicated uniformed atelier courier delivery at specified hour.</span>
                        </div>
                        <span className="font-mono text-xs text-[#0C0C0D]">$45</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 border border-[#D4CDC3] cursor-pointer hover:border-[#0C0C0D] transition-colors">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="salon-pickup"
                        checked={formData.deliveryMethod === 'salon-pickup'}
                        onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                        className="mt-0.5 accent-[#0C0C0D]"
                      />
                      <div className="flex-1 flex justify-between">
                        <div>
                          <strong className="text-xs text-[#0C0C0D] block">Flagship Salon Private Pickup</strong>
                          <span className="text-[11px] text-[#71717A]">Ready within 2 hours at Paris or Milan salons.</span>
                        </div>
                        <span className="font-mono text-xs font-medium" style={{ color: accentColor }}>Free</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs tracking-wider uppercase text-[#71717A] hover:text-[#0C0C0D] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    className="bg-[#0C0C0D] hover:bg-[#2A2A2E] text-[#FAF8F5] py-3.5 px-8 text-xs tracking-ultra-wide uppercase transition-colors flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <span>Continue to Packaging</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Bespoke Presentation & Packaging */}
            {step === 3 && (
              <form onSubmit={(e) => { e.preventDefault(); setStep(4); }} className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-[#F5F2EB]">
                  <h3 className="text-lg font-serif font-light text-[#0C0C0D]">
                    3. Presentation & Signature Packaging
                  </h3>
                  <span className="text-[10px] font-mono text-[#71717A] uppercase">Step 3 of 4</span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-[#FAF8F5] border border-[#E8E3DA] space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.giftBox}
                        onChange={(e) => {
                          handleInputChange('giftBox', e.target.checked);
                          setGiftPackaging(e.target.checked, formData.customCardMessage);
                        }}
                        className="mt-0.5 accent-[#0C0C0D] w-4 h-4"
                      />
                      <div>
                        <strong className="text-xs text-[#0C0C0D] block flex items-center gap-1.5">
                          <Gift className="w-3.5 h-3.5" style={{ color: accentColor }} />
                          Bespoke Mulberry Paper Presentation & Scent Infusion ($25)
                        </strong>
                        <p className="text-[11px] text-[#52525B] mt-1 leading-relaxed">
                          Garments are wrapped in handmade mulberry tissue paper, secured with grosgrain silk ribbon, and sprayed with the Maison’s signature cedar & iris scent.
                        </p>
                      </div>
                    </label>

                    {formData.giftBox && (
                      <div className="pt-3 border-t border-[#E8E3DA] space-y-2">
                        <label className="block text-[11px] tracking-wider uppercase text-[#71717A]">
                          Personalized Calligraphy Card Message
                        </label>
                        <textarea
                          rows={3}
                          value={formData.customCardMessage}
                          onChange={(e) => {
                            handleInputChange('customCardMessage', e.target.value);
                            setGiftPackaging(true, e.target.value);
                          }}
                          placeholder="Write a message to be hand-penned on heavy cotton cardstock..."
                          className="w-full bg-white border border-[#D4CDC3] p-3 text-xs text-[#0C0C0D] placeholder-[#A1A1AA] focus:outline-none focus:border-[#0C0C0D]"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs tracking-wider uppercase text-[#71717A] hover:text-[#0C0C0D] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    className="bg-[#0C0C0D] hover:bg-[#2A2A2E] text-[#FAF8F5] py-3.5 px-8 text-xs tracking-ultra-wide uppercase transition-colors flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 4: Encrypted Payment */}
            {step === 4 && (
              <form onSubmit={handlePlaceOrder} className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-[#F5F2EB]">
                  <h3 className="text-lg font-serif font-light text-[#0C0C0D]">
                    4. Encrypted Settlement
                  </h3>
                  <span className="text-[10px] font-mono text-[#71717A] uppercase">Step 4 of 4</span>
                </div>

                {/* Payment Selection */}
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleInputChange('paymentMethod', 'card')}
                      className={`p-3 text-center border transition-all cursor-pointer ${
                        formData.paymentMethod === 'card'
                          ? 'border-[#0C0C0D] bg-[#0C0C0D] text-white'
                          : 'border-[#D4CDC3] bg-[#FAF8F5] text-[#52525B]'
                      }`}
                    >
                      Credit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange('paymentMethod', 'applepay')}
                      className={`p-3 text-center border transition-all cursor-pointer ${
                        formData.paymentMethod === 'applepay'
                          ? 'border-[#0C0C0D] bg-[#0C0C0D] text-white'
                          : 'border-[#D4CDC3] bg-[#FAF8F5] text-[#52525B]'
                      }`}
                    >
                      Apple Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange('paymentMethod', 'klarna')}
                      className={`p-3 text-center border transition-all cursor-pointer ${
                        formData.paymentMethod === 'klarna'
                          ? 'border-[#0C0C0D] bg-[#0C0C0D] text-white'
                          : 'border-[#D4CDC3] bg-[#FAF8F5] text-[#52525B]'
                      }`}
                    >
                      Klarna Luxury
                    </button>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-4 pt-2">
                      <div>
                        <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          placeholder="Jean Vélène"
                          className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                          Card Number *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs font-mono text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                          />
                          <CreditCard className="w-4 h-4 text-[#A1A1AA] absolute right-3 top-3.5" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                            Expiry (MM/YY) *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.cardExpiry}
                            onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                            className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs font-mono text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                            Security Code (CVC) *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.cardCvc}
                            onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                            className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs font-mono text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'applepay' && (
                    <div className="p-6 bg-[#FAF8F5] border border-[#E8E3DA] text-center space-y-2">
                      <p className="font-serif text-sm text-[#0C0C0D]">Apple Pay Biometric Authorization</p>
                      <p className="text-[11px] text-[#71717A]">Clicking place order will invoke Face ID authentication on your device.</p>
                    </div>
                  )}

                  {formData.paymentMethod === 'klarna' && (
                    <div className="p-6 bg-[#FAF8F5] border border-[#E8E3DA] text-center space-y-2">
                      <p className="font-serif text-sm text-[#0C0C0D]">Klarna Luxury Split Payment</p>
                      <p className="text-[11px] text-[#71717A]">Pay in 4 interest-free installments of {formatPrice(totalUSD / 4)} each month.</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="text-xs tracking-wider uppercase text-[#71717A] hover:text-[#0C0C0D] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#0C0C0D] hover:bg-[#2A2A2E] text-[#FAF8F5] py-4 px-10 text-xs tracking-ultra-wide uppercase transition-colors flex items-center gap-2 cursor-pointer font-medium shadow-2xl disabled:opacity-50"
                  >
                    <Lock className="w-3.5 h-3.5" style={{ color: accentColor }} />
                    <span>{isSubmitting ? 'Authenticating Order...' : `Authorize & Place Order (${formatPrice(totalUSD)})`}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Order Summary Sidebar (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 bg-[#F5F2EB] border border-[#E8E3DA] space-y-6">
              <h3 className="font-serif text-lg text-[#0C0C0D] font-light pb-4 border-b border-[#D4CDC3]">
                Order Summary ({items.length} Items)
              </h3>

              {/* Items List */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-14 h-18 bg-white border border-[#E8E3DA] shrink-0 overflow-hidden">
                      <img
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-serif text-[#0C0C0D] truncate">{item.product.name}</h4>
                      <p className="text-[10px] text-[#71717A] mt-0.5">
                        {item.selectedColor} • Size {item.selectedSize} • Qty {item.quantity}
                      </p>
                      <span className="text-xs font-mono text-[#0C0C0D] block mt-1">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="pt-4 border-t border-[#D4CDC3]">
                {promoCode ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#0C0C0D] text-[#FAF8F5] text-xs">
                    <span>Code <strong style={{ color: accentColor }}>{promoCode}</strong> applied</span>
                    <button onClick={removePromoCode} className="text-xs underline text-[#A1A1AA] cursor-pointer">Remove</button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Privilege Code (ATELIER15)"
                      className="flex-1 bg-white border border-[#D4CDC3] px-3 py-2 text-xs text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-[#0C0C0D] text-[#FAF8F5] text-xs uppercase cursor-pointer hover:bg-[#2A2A2E]"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && <p className="text-[10px] text-[#B91C1C] mt-1">{promoError}</p>}
              </div>

              {/* Totals Table */}
              <div className="pt-4 border-t border-[#D4CDC3] space-y-2 text-xs">
                <div className="flex justify-between text-[#71717A]">
                  <span>Archive Subtotal</span>
                  <span className="font-mono text-[#0C0C0D]">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-[#A38356]">
                    <span>VIP Privilege Savings</span>
                    <span className="font-mono">-{formatPrice(discount)}</span>
                  </div>
                )}

                {formData.deliveryMethod === 'white-glove-express' && (
                  <div className="flex justify-between text-[#71717A]">
                    <span>White-Glove Courier</span>
                    <span className="font-mono text-[#0C0C0D]">{formatPrice(45)}</span>
                  </div>
                )}

                {formData.giftBox && (
                  <div className="flex justify-between text-[#71717A]">
                    <span>Bespoke Presentation</span>
                    <span className="font-mono text-[#0C0C0D]">{formatPrice(25)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#71717A]">
                  <span>Duties & Insured Courier</span>
                  <span className="font-mono text-[#0C0C0D]">Complimentary</span>
                </div>

                <div className="flex justify-between text-base font-serif text-[#0C0C0D] pt-3 border-t border-[#D4CDC3] font-medium">
                  <span>Grand Total</span>
                  <span className="font-mono">{formatPrice(totalUSD)}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-2 text-[10px] uppercase text-[#71717A]">
                <ShieldCheck className="w-4 h-4" style={{ color: accentColor }} />
                <span>256-Bit Encrypted Atelier Bank Vault</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
