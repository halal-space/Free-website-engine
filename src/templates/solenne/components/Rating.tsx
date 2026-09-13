import React from 'react';

interface RatingProps {
  rating: number;
  count?: number;
  className?: string;
  showValue?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  count,
  className = '',
  showValue = true,
}) => {
  const ratingId = React.useId().replace(/:/g, '');

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      aria-label={`Rated ${rating} out of 5 stars${count ? ` from ${count} reviews` : ''}`}
    >
      <div className="flex items-center gap-[3px]" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          const fill = Math.min(Math.max(rating - i, 0), 1);
          const gradId = `star-${ratingId}-${i}-${Math.round(fill * 100)}`;
          return (
            <svg key={i} width="12" height="12" viewBox="0 0 24 24">
              <defs>
                <linearGradient id={gradId}>
                  <stop offset={`${fill * 100}%`} stopColor="var(--color-gold, #8a6d47)" />
                  <stop offset={`${fill * 100}%`} stopColor="var(--color-sand, #e2d7c5)" />
                </linearGradient>
              </defs>
              <path
                d="M12 2.5 14.9 8.6l6.6.8-4.9 4.5 1.3 6.5L12 17.2l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8L12 2.5z"
                fill={`url(#${gradId})`}
              />
            </svg>
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs tracking-wide text-smoke">
          {rating.toFixed(1)}
          {count !== undefined && <span className="text-stone"> ({count})</span>}
        </span>
      )}
    </div>
  );
};
