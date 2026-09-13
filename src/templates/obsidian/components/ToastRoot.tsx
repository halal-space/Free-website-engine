import React from 'react';
import { useUIStore } from '../stores/uiStore';

export const ToastRoot: React.FC = () => {
  const toasts = useUIStore((s) => s.toasts);
  const removeToast = useUIStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <aside
      aria-live="polite"
      aria-label="Notifications"
      className="pointer-events-none fixed bottom-6 right-6 z-[95] flex w-full max-w-sm flex-col gap-3"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="pointer-events-auto flex items-center justify-between gap-3 rounded-[2px] bg-onyx px-5 py-4 text-cloud border border-line-dark shadow-lg animate-in fade-in slide-in-from-bottom-3 duration-300"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[2px] bg-brass text-onyx text-xs font-bold">
              ✓
            </span>
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="text-cloud/60 hover:text-cloud cursor-pointer p-1 text-xs"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </aside>
  );
};
