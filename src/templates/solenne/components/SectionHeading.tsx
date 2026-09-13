import React from 'react';

interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: string;
  link?: { label: string; href?: string; onClick?: () => void };
  center?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  id,
  eyebrow,
  title,
  link,
  center = false,
  className = '',
}) => {
  return (
    <div
      className={`mb-12 flex items-end justify-between gap-8 md:mb-16 ${
        center ? 'flex-col items-center text-center' : ''
      } ${className}`}
    >
      <div className={!center ? 'max-w-xl' : ''}>
        <p className="eyebrow mb-4 flex items-center gap-3 text-gold">
          {!center && <span className="h-px w-10 bg-gold/60" />}
          {eyebrow}
        </p>
        <h2 id={id} className="font-serif text-[clamp(2.1rem,4.5vw,3.4rem)] leading-[1.05]">
          {title}
        </h2>
      </div>
      {link && (
        <button
          type="button"
          onClick={link.onClick}
          className="group hidden shrink-0 items-center gap-2 eyebrow text-ink transition-colors hover:text-gold sm:inline-flex cursor-pointer"
        >
          {link.label}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
          >
            <path d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
};
