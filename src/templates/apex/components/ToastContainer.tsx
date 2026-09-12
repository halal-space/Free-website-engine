'use client';

import React from 'react';
import { useToastStore } from '../stores/toastStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none max-w-sm w-full px-4">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl luxury-glass border shadow-2xl transition-all duration-300 transform translate-y-0"
            style={{
              borderColor: isSuccess ? 'rgba(59, 130, 246, 0.4)' : isError ? 'rgba(239, 68, 68, 0.4)' : 'var(--border-medium)',
              backgroundColor: 'var(--bg-card)'
            }}
          >
            <div className="flex-shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
              {isError && <AlertCircle className="w-5 h-5 text-red-500" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-zinc-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-[var(--text-primary)] leading-tight">{toast.title}</h4>
              {toast.description && (
                <p className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
