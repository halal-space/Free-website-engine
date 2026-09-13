import React from 'react';
import { useUIStore } from '../stores/uiStore';

export const ToastRoot: React.FC = () => {
  const toasts = useUIStore((s) => s.toasts);
  const dismissToast = useUIStore((s) => s.dismissToast);

  if (toasts.length === 0) return null;

  return (
    <div
      id="toast-root"
      className="fixed bottom-6 right-6 z-[90] flex flex-col gap-3 pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex w-full max-w-sm items-center gap-4 border border-line-strong bg-surface/95 px-5 py-4 shadow-lifted backdrop-blur-md transition-all duration-500 ease-lux"
          role="status"
        >
          {toast.image && (
            <img
              src={toast.image}
              alt=""
              width={52}
              height={64}
              className="h-16 w-[3.25rem] object-cover rounded-xs"
              loading="lazy"
            />
          )}
          <p className="flex-1 font-serif text-lg leading-snug">{toast.message}</p>
          {toast.action && (
            <button
              type="button"
              onClick={toast.action.onClick}
              className="eyebrow shrink-0 text-gold transition-colors hover:text-ink cursor-pointer"
            >
              {toast.action.label}
            </button>
          )}
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
            className="shrink-0 text-stone transition-colors hover:text-ink cursor-pointer p-1"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};
