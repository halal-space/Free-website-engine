'use client';

import React, { useState } from 'react';
import { useUIStore } from '../stores/uiStore';
import { Mail, Phone, MapPin, ShieldCheck, Clock, Send, ArrowLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface ContactViewProps {
  storeName?: string;
  accentColor?: string;
}

export const ContactView: React.FC<ContactViewProps> = ({
  storeName = 'AETHER',
  accentColor = '#3b82f6',
}) => {
  const { navigateToHome, navigateToShop } = useUIStore();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Acoustic Consultation & Inquiries',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fade-in text-[var(--text-primary)]">
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
          <span className="text-[var(--text-primary)] font-semibold">Concierge</span>
        </nav>

        <button
          onClick={() => navigateToShop()}
          className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Explore Catalog</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Header */}
      <div className="max-w-2xl space-y-3">
        <span
          className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block"
          style={{ color: accentColor }}
        >
          WHITE-GLOVE CLIENT SERVICE
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Direct Concierge Care
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          Our dedicated specialists in Copenhagen, Tokyo, and New York are available 24/7 for technical consultation, bespoke engraving, and priority warranty service.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 sm:p-8 rounded-3xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">VIP Direct Line</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Direct telephone access to senior acoustic technicians without automated menus.
          </p>
          <div className="pt-2 font-mono text-xs font-bold text-blue-500">
            +1 (800) 924-AETH
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">Encrypted Dispatch</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Guaranteed written response within 60 minutes for technical and order inquiries.
          </p>
          <div className="pt-2 font-mono text-xs font-bold text-blue-500">
            concierge@aetherlabs.com
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4" id="warranty">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">2-Year Bespoke Warranty</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Complimentary courier collection, rapid lab exchange, and battery health protection.
          </p>
          <div className="pt-2 font-mono text-xs font-bold text-emerald-500">
            Worldwide Coverage Active
          </div>
        </div>
      </div>

      {/* Message Form Box */}
      <div className="p-8 sm:p-12 rounded-3xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] max-w-3xl mx-auto space-y-6 shadow-xl">
        <div>
          <h3 className="text-xl font-bold text-[var(--text-primary)]">Initiate Concierge Inquiry</h3>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Please provide your details below and a client advisor from {storeName} will contact you immediately.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-scale-in">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-emerald-400">Inquiry Received</h4>
              <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
                Thank you, {formData.name || 'valued client'}. Your transmission has reached our Copenhagen dispatch desk. A dedicated specialist will reply to {formData.email || 'your email'} within one business hour.
              </p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', subject: 'Acoustic Consultation & Inquiries', message: '' });
              }}
              className="px-6 py-2.5 rounded-xl border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Julian Thorne"
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="julian@company.com"
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                Subject Matter
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:border-blue-500 cursor-pointer transition-colors"
              >
                <option>Acoustic Consultation & Inquiries</option>
                <option>Custom Billet Engraving & Bespoke Request</option>
                <option>White-Glove Courier Dispatch & Tracking</option>
                <option>2-Year Bespoke Warranty Claim</option>
                <option>Corporate & Studio Bulk Allocation</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your inquiry..."
                className="w-full p-4 text-xs rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Dispatch Message to Concierge Desk</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
