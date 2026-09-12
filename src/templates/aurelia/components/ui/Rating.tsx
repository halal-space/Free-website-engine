import { Star, StarHalf } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface RatingProps {
  value: number;
  count?: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}

function starFill(value: number, i: number) {
  const pos = value - i;
  if (pos >= 1) return 'full';
  if (pos > 0) return 'half';
  return 'empty';
}

export function Rating({ value, count, size = 14, className, showValue }: RatingProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-[2px]" aria-label={`Rated ${value} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const fill = starFill(value, i);
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <Star
                className="absolute inset-0 text-line-strong"
                style={{ width: size, height: size }}
                fill="currentColor"
                strokeWidth={0}
              />
              {(fill === 'full' || fill === 'half') && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: fill === 'half' ? '50%' : '100%' }}
                >
                  <Star
                    className="text-warning"
                    style={{ width: size, height: size }}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </span>
              )}
              {fill === 'half' && (
                <StarHalf
                  className="absolute inset-0 text-warning"
                  style={{ width: size, height: size }}
                  fill="currentColor"
                  strokeWidth={0}
                />
              )}
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-medium text-ink-soft tabular">{value.toFixed(1)}</span>
      )}
      {typeof count === 'number' && (
        <span className="text-xs text-ink-muted">
          ({count.toLocaleString('en-US')})
        </span>
      )}
    </div>
  );
}
