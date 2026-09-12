'use client';

import React from 'react';
import { useUIStore } from '../stores/uiStore';
import { Package, Heart, Ruler, Calendar, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AccountViewProps {
  accentColor?: string;
}

export const AccountView: React.FC<AccountViewProps> = ({
  accentColor = '#C5A880'
}) => {
  const { setActivePageView, setWishlistOpen, setCheckoutConfirmation } = useUIStore();

  const handleViewTracking = (orderId: string) => {
    setCheckoutConfirmation({
      orderId,
      email: 'client@atelier-velene.com',
      name: 'Jean Vélène'
    });
    setActivePageView('checkout');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 pb-6 border-b border-[#E8E3DA] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span
              className="text-[10px] tracking-ultra-wide uppercase block mb-1"
              style={{ color: accentColor }}
            >
              Private Client Registry
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-light text-[#0C0C0D]">
              Client Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span
              className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-[#0C0C0D] text-[#C5A880]"
              style={{ color: accentColor }}
            >
              Maison VIP Member • No. 8920
            </span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-white border border-[#E8E3DA] space-y-4 shadow-xs">
              <div className="flex items-center gap-3 pb-4 border-b border-[#F5F2EB]">
                <div className="w-12 h-12 rounded-full bg-[#0C0C0D] text-[#FAF8F5] flex items-center justify-center font-serif text-lg">
                  JV
                </div>
                <div>
                  <h3 className="font-serif text-base text-[#0C0C0D]">Jean Vélène</h3>
                  <span className="text-xs text-[#71717A]">client@atelier-velene.com</span>
                </div>
              </div>

              <nav className="space-y-1 text-xs">
                <a
                  href="#orders"
                  className="flex items-center justify-between p-2.5 bg-[#F5F2EB] text-[#0C0C0D] font-medium"
                >
                  <span className="flex items-center gap-2">
                    <Package className="w-4 h-4" style={{ color: accentColor }} />
                    <span>Order Archive & Tracking</span>
                  </span>
                  <span className="font-mono text-[10px]">2</span>
                </a>

                <button
                  onClick={() => setActivePageView('wishlist')}
                  className="w-full flex items-center justify-between p-2.5 text-[#52525B] hover:bg-[#F5F2EB] hover:text-[#0C0C0D] transition-colors cursor-pointer text-left"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4" style={{ color: accentColor }} />
                    <span>Saved Wishlist</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#A1A1AA]" />
                </button>

                <a
                  href="#sizing"
                  className="flex items-center justify-between p-2.5 text-[#52525B] hover:bg-[#F5F2EB] hover:text-[#0C0C0D] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Ruler className="w-4 h-4" style={{ color: accentColor }} />
                    <span>Bespoke Measurement Profile</span>
                  </span>
                </a>

                <button
                  onClick={() => setActivePageView('appointments')}
                  className="w-full flex items-center justify-between p-2.5 text-[#52525B] hover:bg-[#F5F2EB] hover:text-[#0C0C0D] transition-colors cursor-pointer text-left"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" style={{ color: accentColor }} />
                    <span>Salon Appointments</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#A1A1AA]" />
                </button>
              </nav>
            </div>

            <div className="p-6 bg-[#F5F2EB] border border-[#E8E3DA] text-xs space-y-2">
              <strong className="text-[#0C0C0D] block font-serif">Dedicated Client Concierge</strong>
              <p className="text-[#71717A]">Your personal advisor is Madame Hélène Rousseau at the Paris Salon.</p>
              <p className="text-[#0C0C0D] font-mono text-[11px] pt-1">helene.r@atelier-velene.com</p>
            </div>
          </div>

          {/* Main Content Area (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Recent Orders Section */}
            <div id="orders" className="p-6 sm:p-8 bg-white border border-[#E8E3DA] space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#F5F2EB]">
                <h3 className="font-serif text-lg text-[#0C0C0D] font-light">
                  Acquisition Archive (Recent Orders)
                </h3>
                <span className="text-[10px] font-mono text-[#71717A] uppercase">2 Orders Registered</span>
              </div>

              {/* Order 1 */}
              <div className="p-4 border border-[#E8E3DA] space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-[#F5F2EB] pb-3">
                  <div>
                    <span className="text-[#71717A]">Reference: </span>
                    <strong className="font-mono text-[#0C0C0D]">AV-2026-894210</strong>
                  </div>
                  <div>
                    <span className="text-[#71717A]">Date: </span>
                    <span className="text-[#0C0C0D]">August 21, 2026</span>
                  </div>
                  <div>
                    <span
                      className="px-2.5 py-0.5 bg-[#0C0C0D] text-[10px] font-mono uppercase"
                      style={{ color: accentColor }}
                    >
                      In White-Glove Transit
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-20 bg-[#F5F2EB] border border-[#E8E3DA] shrink-0 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop"
                      alt="The Monolith Coat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <h4 className="font-serif text-sm text-[#0C0C0D]">The Monolith Double-Breasted Coat</h4>
                    <p className="text-[11px] text-[#71717A]">Obsidian Noir • Size 40 FR (M) • Edition 08 / 50</p>
                    <span className="font-mono text-[#0C0C0D] block mt-1 font-medium">$3,450</span>
                  </div>
                  <button
                    onClick={() => handleViewTracking('AV-2026-894210')}
                    className="px-4 py-2 border border-[#D4CDC3] text-[10px] tracking-wider uppercase hover:border-[#0C0C0D] transition-colors cursor-pointer"
                  >
                    View Tracking
                  </button>
                </div>
              </div>

              {/* Order 2 */}
              <div className="p-4 border border-[#E8E3DA] space-y-4 opacity-90">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-[#F5F2EB] pb-3">
                  <div>
                    <span className="text-[#71717A]">Reference: </span>
                    <strong className="font-mono text-[#0C0C0D]">AV-2026-773190</strong>
                  </div>
                  <div>
                    <span className="text-[#71717A]">Date: </span>
                    <span className="text-[#0C0C0D]">July 14, 2026</span>
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 bg-[#F5F2EB] text-[#52525B] text-[10px] font-mono uppercase">
                      Delivered to Residence
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-20 bg-[#F5F2EB] border border-[#E8E3DA] shrink-0 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop"
                      alt="The Sculpted Blazer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <h4 className="font-serif text-sm text-[#0C0C0D]">The Sculpted Peak-Lapel Blazer</h4>
                    <p className="text-[11px] text-[#71717A]">Noir Matte • Size 38 FR (S)</p>
                    <span className="font-mono text-[#0C0C0D] block mt-1 font-medium">$2,150</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#71717A]">Archived</span>
                </div>
              </div>
            </div>

            {/* Saved Anatomical Measurements */}
            <div id="sizing" className="p-6 sm:p-8 bg-white border border-[#E8E3DA] space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#F5F2EB]">
                <h3 className="font-serif text-lg text-[#0C0C0D] font-light">
                  Anatomical Bespoke Profile (32-Point Calibration)
                </h3>
                <span className="text-[10px] font-mono uppercase" style={{ color: accentColor }}>
                  Verified Paris Salon
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 bg-[#F5F2EB] border border-[#E8E3DA]">
                  <span className="text-[10px] uppercase text-[#71717A] block font-mono">Chest</span>
                  <span className="text-sm font-mono font-medium text-[#0C0C0D]">96.5 cm</span>
                </div>
                <div className="p-3 bg-[#F5F2EB] border border-[#E8E3DA]">
                  <span className="text-[10px] uppercase text-[#71717A] block font-mono">Waist</span>
                  <span className="text-sm font-mono font-medium text-[#0C0C0D]">78.0 cm</span>
                </div>
                <div className="p-3 bg-[#F5F2EB] border border-[#E8E3DA]">
                  <span className="text-[10px] uppercase text-[#71717A] block font-mono">Shoulder Span</span>
                  <span className="text-sm font-mono font-medium text-[#0C0C0D]">46.0 cm</span>
                </div>
                <div className="p-3 bg-[#F5F2EB] border border-[#E8E3DA]">
                  <span className="text-[10px] uppercase text-[#71717A] block font-mono">Sleeve Inseam</span>
                  <span className="text-sm font-mono font-medium text-[#0C0C0D]">64.5 cm</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <p className="text-[11px] text-[#71717A] max-w-lg">
                  Your anatomical measurements are automatically matched to garment specs when you browse the collection. To update measurements, schedule a salon fitting.
                </p>
                <button
                  onClick={() => setActivePageView('appointments')}
                  className="px-4 py-2 bg-[#0C0C0D] text-[#FAF8F5] text-[10px] tracking-wider uppercase hover:bg-[#2A2A2E] transition-colors shrink-0 cursor-pointer font-medium"
                >
                  Book Fitting
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
