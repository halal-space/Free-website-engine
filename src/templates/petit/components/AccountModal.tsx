'use client';
import React, { useState } from 'react';
import { X, User, Package, Heart, Sparkles, LogIn, ArrowRight } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';
import { useWishlistStore } from '../stores/wishlistStore';

export const AccountModal: React.FC = () => {
  const { isAccountOpen, closeAccount, addToast } = useUIStore();
  const openWishlist = useWishlistStore((s) => s.openWishlist);

  const [activeTab, setActiveTab] = useState<'login' | 'track'>('login');
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');

  if (!isAccountOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Welcome Back', `Signed in as ${email}`, 'success');
    closeAccount();
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Dispatch Tracking', `Order ${orderId} is currently out for courier delivery.`, 'info');
    closeAccount();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-[#1C1917]/60 backdrop-blur-xs transition-opacity"
        onClick={closeAccount}
      />

      <div className="relative w-full max-w-md bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8E2D7] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E8E2D7] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#B88B4A]" />
            <h3 className="font-serif text-xl tracking-wide text-[#1C1917]">
              Maison Member Atelier
            </h3>
          </div>
          <button
            type="button"
            onClick={closeAccount}
            className="p-1.5 text-[#575149] hover:text-[#1C1917]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#E8E2D7] text-xs font-medium bg-[#FDFCFA]">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 text-center transition-colors ${
              activeTab === 'login'
                ? 'text-[#1C1917] border-b-2 border-[#1C1917] font-semibold'
                : 'text-[#877E73]'
            }`}
          >
            Account Access
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('track')}
            className={`flex-1 py-3 text-center transition-colors ${
              activeTab === 'track'
                ? 'text-[#1C1917] border-b-2 border-[#1C1917] font-semibold'
                : 'text-[#877E73]'
            }`}
          >
            Track An Order
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <p className="text-xs text-[#575149] leading-relaxed">
                Access your curated nursery registries, saved preferences, and private family member privileges.
              </p>

              <div>
                <label className="block text-xs font-medium text-[#575149] mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parent@example.com"
                  className="w-full px-3 py-2 text-xs border border-[#E8E2D7] rounded-md bg-white focus:outline-none focus:border-[#B88B4A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#575149] mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-xs border border-[#E8E2D7] rounded-md bg-white focus:outline-none focus:border-[#B88B4A]"
                />
              </div>

              <div className="flex justify-between items-center text-[11px] text-[#877E73]">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#1C1917]" />
                  <span>Remember this device</span>
                </label>
                <a href="#forgot" className="text-[#B88B4A] hover:underline">Forgot?</a>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-full bg-[#1C1917] hover:bg-[#B88B4A] text-[#FAF8F5] text-xs font-semibold tracking-widest uppercase transition-colors"
              >
                Sign In to Maison
              </button>

              <div className="pt-2 text-center text-xs text-[#877E73]">
                <span>New to our boutique? </span>
                <a href="#register" className="text-[#1C1917] font-semibold hover:underline">Create a private account</a>
              </div>
            </form>
          ) : (
            <form onSubmit={handleTrack} className="space-y-4">
              <p className="text-xs text-[#575149] leading-relaxed">
                Enter your order reference number and delivery postal code to inspect live courier progress.
              </p>

              <div>
                <label className="block text-xs font-medium text-[#575149] mb-1">Order Number</label>
                <input
                  type="text"
                  required
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. MP-2026-8492"
                  className="w-full px-3 py-2 text-xs border border-[#E8E2D7] rounded-md bg-white focus:outline-none focus:border-[#B88B4A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#575149] mb-1">Delivery Postal Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SW1W 8EB"
                  className="w-full px-3 py-2 text-xs border border-[#E8E2D7] rounded-md bg-white focus:outline-none focus:border-[#B88B4A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-full bg-[#1C1917] hover:bg-[#B88B4A] text-[#FAF8F5] text-xs font-semibold tracking-widest uppercase transition-colors"
              >
                Locate Dispatch
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
