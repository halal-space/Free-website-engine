'use client';
import React from 'react';
import { CheckCircle2, Heart, Info, X } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';

export const ToastManager: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between p-4 bg-[#1C1917] text-[#FAF8F5] rounded-xl shadow-2xl border border-white/10 animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-center gap-3">
            {toast.type === 'favorite' ? (
              <Heart className="w-5 h-5 text-[#B66C52] fill-[#B66C52] shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 text-[#B88B4A] shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#3D6B4F] shrink-0" />
            )}
            <div>
              <h5 className="text-xs font-serif font-medium tracking-wide text-white">
                {toast.title}
              </h5>
              {toast.message && (
                <p className="text-[11px] text-white/70 mt-0.5 line-clamp-1 font-sans">
                  {toast.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="p-1 text-white/50 hover:text-white transition-colors ml-2"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
