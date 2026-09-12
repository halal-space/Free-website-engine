'use client';

import React, { useState } from 'react';
import { Scissors, Sparkles, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';

interface AppointmentsViewProps {
  accentColor?: string;
}

export const AppointmentsView: React.FC<AppointmentsViewProps> = ({
  accentColor = '#C5A880'
}) => {
  const { setActivePageView, showToast } = useUIStore();

  const [formData, setFormData] = useState({
    location: 'paris',
    service: 'bespoke',
    date: '',
    time: '11:00',
    name: '',
    phone: '',
    requests: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast({
      title: 'Salon Consultation Requested',
      description: 'A Maison concierge will contact you within 2 hours.',
      type: 'success'
    });
  };

  return (
    <div className="py-16 sm:py-24 bg-[#FAF8F5] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Sub-Navigation / Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setActivePageView('home')}
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#71717A] hover:text-[#0C0C0D] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Maison Home</span>
          </button>
          <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider">
            Bespoke Services
          </span>
        </div>

        {/* Header */}
        <div className="mb-16 pb-8 border-b border-[#E8E3DA] text-center max-w-3xl mx-auto space-y-3">
          <span
            className="text-[10px] tracking-ultra-wide uppercase block font-medium"
            style={{ color: accentColor }}
          >
            Haute Couture & Sartorial Services
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-light text-[#0C0C0D] tracking-tight">
            Private Salon Consultations
          </h1>
          <p className="text-xs sm:text-sm text-[#52525B] font-light leading-relaxed">
            Reserve an uninterrupted salon consultation with our master pattern-makers. Experience bespoke measurements, private archive previews, and cloth curation.
          </p>
        </div>

        {/* Main Booking Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Interactive Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-[#E8E3DA] shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div
                  className="w-12 h-12 rounded-full border mx-auto flex items-center justify-center"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-light text-[#0C0C0D]">
                  Consultation Request Registered
                </h3>
                <p className="text-xs text-[#52525B] max-w-md mx-auto leading-relaxed">
                  Thank you, {formData.name || 'valued client'}. Your confidential fitting consultation request has been forwarded to our head concierge in {formData.location.toUpperCase()}. A senior atelier liaison will reach out shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-[#0C0C0D] text-[#FAF8F5] px-6 py-3 text-xs tracking-ultra-wide uppercase hover:bg-[#2A2A2E] transition-colors cursor-pointer"
                  >
                    Modify Request
                  </button>
                </div>
              </div>
            ) : (
              <form className="space-y-6 text-xs" onSubmit={handleSubmit}>
                <div>
                  <span
                    className="text-[10px] font-mono tracking-widest uppercase block mb-1"
                    style={{ color: accentColor }}
                  >
                    Consultation Details
                  </span>
                  <h3 className="text-lg font-serif font-light text-[#0C0C0D]">
                    Reserve Your Appointment
                  </h3>
                </div>

                {/* Salon Location Selector */}
                <div>
                  <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                    Select Salon Location *
                  </label>
                  <select
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                  >
                    <option value="paris">Paris — 18 Rue du Faubourg Saint-Honoré</option>
                    <option value="milan">Milan — Via Montenapoleone 14</option>
                    <option value="ny">New York — 840 Madison Avenue</option>
                    <option value="tokyo">Tokyo — 6-10-1 Ginza, Chuo-ku</option>
                    <option value="virtual">Digital VIP Master Tailor Consultation</option>
                  </select>
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                    Service Type *
                  </label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                  >
                    <option value="bespoke">Bespoke Architectural Tailoring Commission</option>
                    <option value="eveningwear">Couture Eveningwear & Silk Gown Fitting</option>
                    <option value="archive">2026 Archive Private Viewing & Sizing</option>
                    <option value="wardrobe">Seasonal Wardrobe Curation with Senior Stylist</option>
                  </select>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                      Preferred Time *
                    </label>
                    <select
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                    >
                      <option value="11:00">11:00 AM — Morning Salon</option>
                      <option value="14:00">02:00 PM — Afternoon Salon</option>
                      <option value="16:30">04:30 PM — Late Afternoon Suite</option>
                      <option value="18:30">06:30 PM — Private Nocturne Salon</option>
                    </select>
                  </div>
                </div>

                {/* Client Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jean Vélène"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                      Confidential Telephone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+33 1 42 68 55 00"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs text-[#0C0C0D] focus:outline-none focus:border-[#0C0C0D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] tracking-wider uppercase text-[#71717A] mb-1.5">
                    Special Requests or Garment Inquiries
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mention specific garments from the 2026 Archive you wish to inspect..."
                    value={formData.requests}
                    onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D4CDC3] p-3 text-xs text-[#0C0C0D] placeholder-[#A1A1AA] focus:outline-none focus:border-[#0C0C0D]"
                  />
                </div>

                <div className="pt-4 border-t border-[#F5F2EB]">
                  <button
                    type="submit"
                    className="w-full bg-[#0C0C0D] hover:bg-[#2A2A2E] text-[#FAF8F5] py-4 px-8 text-xs tracking-ultra-wide uppercase transition-colors font-medium cursor-pointer"
                  >
                    Confirm Appointment Request
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Salon Privileges (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 bg-[#F5F2EB] border border-[#E8E3DA] space-y-6">
              <h3 className="font-serif text-lg text-[#0C0C0D] font-light pb-4 border-b border-[#D4CDC3]">
                The Salon Experience
              </h3>

              <div className="space-y-4 text-xs text-[#52525B]">
                <div className="flex items-start gap-3">
                  <Scissors className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accentColor }} />
                  <div>
                    <strong className="text-[#0C0C0D] block font-medium">Anatomical 32-Point Measurements</strong>
                    <span>Recorded and archived in your confidential client profile for future commissions.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accentColor }} />
                  <div>
                    <strong className="text-[#0C0C0D] block font-medium">Bespoke Cloth Swatches</strong>
                    <span>Direct access to unreleased bolts of Mongolian cashmere, Biellese fresco wools, and Como silks.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accentColor }} />
                  <div>
                    <strong className="text-[#0C0C0D] block font-medium">Private Suite Guarantee</strong>
                    <span>Each appointment is hosted in a closed private suite with personal refreshment and styling staff.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#D4CDC3] space-y-1">
                <span className="text-[10px] tracking-wider uppercase text-[#71717A] block font-mono">Concierge Direct</span>
                <p className="text-xs text-[#0C0C0D] font-mono font-medium">+33 1 42 68 55 00 • concierge@atelier-velene.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
