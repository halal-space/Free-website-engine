import * as React from 'react';
import { cn } from '../../lib/utils';

type BadgeTone = 'accent' | 'neutral' | 'success' | 'warning' | 'danger' | 'ink';

const tones: Record<BadgeTone, string> = {
  accent: 'bg-accent-soft text-accent',
  neutral: 'bg-surface-2 text-ink-soft border border-line',
  success: 'bg-[color:var(--success)]/10 text-[color:var(--success)]',
  warning: 'bg-[color:var(--warning)]/10 text-[color:var(--warning)]',
  danger: 'bg-[color:var(--danger)]/10 text-[color:var(--danger)]',
  ink: 'bg-ink text-bg',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export function Badge({ className, tone = 'accent', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]',
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
