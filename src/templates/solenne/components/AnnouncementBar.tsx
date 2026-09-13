import React from 'react';

interface AnnouncementBarProps {
  announcementText?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  announcementText,
}) => {
  const items = announcementText
    ? [announcementText, 'New — The Nocturne Collection', 'Complimentary samples with every order']
    : [
        'Complimentary shipping on orders over $100',
        'New — The Nocturne Collection',
        'Complimentary samples with every order',
      ];

  return (
    <div
      className="relative z-[55] overflow-hidden bg-ink py-2.5 text-ivory"
      role="region"
      aria-label="Announcement"
    >
      <div className="flex w-max animate-marquee gap-16 whitespace-nowrap" aria-hidden="true">
        {Array.from({ length: 2 }).map((_, idx) => (
          <React.Fragment key={idx}>
            <span className="eyebrow text-ivory/85">{items[0]}</span>
            <span className="text-champagne">·</span>
            <span className="eyebrow text-ivory/85">{items[1]}</span>
            <span className="text-champagne">·</span>
            <span className="eyebrow text-ivory/85">{items[2]}</span>
            <span className="text-champagne">·</span>
          </React.Fragment>
        ))}
      </div>
      <p className="sr-only">
        {items.join('. ')}
      </p>
    </div>
  );
};
