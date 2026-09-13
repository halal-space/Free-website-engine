import React from 'react';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'outline' | 'outline-light' | 'ghost';
  size?: 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit';
  onClick?: (e: React.MouseEvent) => void;
  ariaLabel?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  onClick,
  ariaLabel,
  children,
}) => {
  const base =
    'group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium transition-colors duration-500 ease-lux cursor-pointer select-none whitespace-nowrap';

  const sizes = {
    md: 'px-7 py-3 text-[0.8rem] tracking-[0.14em]',
    lg: 'px-9 py-4 text-[0.82rem] tracking-[0.16em]',
  };

  const variants = {
    primary: 'bg-ink text-ivory hover:text-ink',
    outline: 'border border-line-strong bg-transparent text-ink hover:border-ink',
    'outline-light': 'border border-white/30 bg-transparent text-ivory hover:border-ivory hover:text-ink',
    ghost: 'bg-transparent text-ink px-0',
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} aria-label={ariaLabel} className={classes}>
        {variant === 'primary' && (
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-y-full rounded-full bg-champagne transition-transform duration-600 ease-lux group-hover/btn:translate-y-0"
          />
        )}
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
    >
      {variant === 'primary' && (
        <span
          aria-hidden="true"
          className="absolute inset-0 translate-y-full rounded-full bg-champagne transition-transform duration-600 ease-lux group-hover/btn:translate-y-0"
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};
