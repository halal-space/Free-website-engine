'use client';

import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const addToast = useUIStore((s) => s.addToast);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribed(true);
    addToast(
      'Welcome to Maison Petit',
      'You are now subscribed to our private seasonal dispatch.',
      'success'
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {isSubscribed ? (
        <div className="p-4 bg-[#EBF4EE] border border-[#3D6B4F]/20 rounded-full flex items-center justify-center gap-2 text-[#3D6B4F] text-xs font-medium animate-in zoom-in duration-300">
          <Check className="w-4 h-4" />
          <span>Thank you. Your complimentary welcome code has been sent.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            className="flex-1 px-5 py-3.5 rounded-full text-xs bg-white border border-[#E8E2D7] text-[#1C1917] placeholder-[#877E73] focus:outline-none focus:border-[#B88B4A] shadow-xs"
          />
          <button
            type="submit"
            className="px-8 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#B88B4A] text-[#FAF8F5] text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Join the list</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      )}
    </div>
  );
};
