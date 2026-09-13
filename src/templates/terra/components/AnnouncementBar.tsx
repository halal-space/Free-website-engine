import React from 'react';
import { useCartStore } from '../stores/cartStore';
import { FREE_SHIPPING_THRESHOLD, money } from '../data/catalog';

interface AnnouncementBarProps {
  announcementText?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  announcementText = 'Free chilled carbon-neutral delivery over $65 · Harvest 2026 just landed · Regenerative smallholders only',
}) => {
  const lines = useCartStore((s) => s.lines);
  const subtotal = lines.reduce((acc, l) => acc + l.qty * l.price, 0);
  const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const parts = announcementText.split('·').map((p) => p.trim());

  return (
    <div className="bg-[#1B241E] text-[#FBF9F5]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center gap-4 py-2">
          <div className="relative flex-1 overflow-hidden" aria-hidden="true">
            <div className="animate-ticker flex w-max gap-8 whitespace-nowrap text-[11px] font-medium tracking-[0.14em] uppercase">
              {[0, 1].map((k) => (
                <span key={k} className="flex gap-8">
                  {parts.map((part, idx) => (
                    <React.Fragment key={idx}>
                      <span>{part}</span>
                      {idx < parts.length - 1 && <span className="opacity-40">·</span>}
                    </React.Fragment>
                  ))}
                  <span className="opacity-40">·</span>
                </span>
              ))}
            </div>
          </div>
          <div
            className="hidden sm:flex min-w-[240px] items-center gap-3"
            role="status"
            aria-live="polite"
          >
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-[#F3D27A] transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="tnum text-[11px] font-medium whitespace-nowrap">
              {remaining > 0 ? `${money(remaining)} to free ship` : 'Free shipping unlocked'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
