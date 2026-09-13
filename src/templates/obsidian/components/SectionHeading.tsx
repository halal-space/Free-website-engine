import React from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  copy?: string;
  dark?: boolean;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  copy,
  dark = false,
  align = 'left',
  className = '',
}) => {
  return (
    <div
      className={`reveal ${align === 'center' ? 'text-center mx-auto' : ''} max-w-2xl ${className}`}
    >
      <p
        className={`eyebrow flex items-center gap-3 ${
          align === 'center' ? 'justify-center' : ''
        } text-brass`}
      >
        <span className="inline-block w-6 h-[2px] bg-brass" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        className={`font-serif-display font-medium mt-4 text-[clamp(2rem,4vw,3.1rem)] leading-[1.08] ${
          dark ? 'text-cloud' : 'text-onyx'
        }`}
      >
        {title}
      </h2>
      {copy && (
        <p
          className={`mt-4 text-[16px] leading-relaxed ${
            dark ? 'text-cloud/70' : 'text-graphite'
          }`}
        >
          {copy}
        </p>
      )}
    </div>
  );
};
