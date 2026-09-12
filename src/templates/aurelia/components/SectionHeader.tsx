import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  label,
  title,
  description,
  href,
  linkLabel = 'View all',
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-10 flex items-end justify-between gap-6 md:mb-14',
        align === 'center' && 'mb-8 flex-col items-center gap-4 text-center md:mb-12',
      )}
    >
      <div className={cn(align === 'center' && 'flex flex-col items-center')}>
        {label && <p className="label-caps mb-3 flex items-center gap-2.5">{label}</p>}
        <h2 className="max-w-2xl font-display text-3xl font-semibold text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              'mt-4 max-w-xl text-[15px] leading-relaxed text-ink-muted',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        )}
      </div>
      {href && (
        <a
          href={href}
          className={cn(
            'group hidden shrink-0 items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink',
            align === 'center' && 'flex',
            'md:inline-flex',
          )}
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      )}
    </div>
  );
}
