'use client';

import React from 'react';
import { useUIStore } from '../stores/uiStore';
import { Check, Heart, ShoppingBag, X, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 bg-[#0C0C0D] text-[#FAF8F5] p-4 shadow-2xl border border-[#2A2A2E] animate-fade-in-up transition-all"
        >
          <div className="mt-0.5 shrink-0 text-[#C5A880]">
            {toast.type === 'cart' && <ShoppingBag className="w-4 h-4" />}
            {toast.type === 'wishlist' && <Heart className="w-4 h-4 fill-current text-[#C5A880]" />}
            {toast.type === 'success' && <Check className="w-4 h-4" />}
            {toast.type === 'info' && <Info className="w-4 h-4" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-medium tracking-wider uppercase text-[#FAF8F5]">
              {toast.title}
            </h4>
            {toast.description && (
              <p className="text-xs text-[#A1A1AA] mt-1 line-clamp-2 leading-relaxed">
                {toast.description}
              </p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#71717A] hover:text-[#FAF8F5] transition-colors p-1 -mr-1 -mt-1 cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
