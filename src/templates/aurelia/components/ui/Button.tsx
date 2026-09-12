import * as React from 'react';
import { cn } from '../../lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'link' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'icon' | 'icon-sm';

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-accent-ink hover:bg-accent-strong shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_20px_-8px_var(--accent)]',
  secondary:
    'bg-surface text-ink border border-line hover:border-line-strong hover:bg-surface-2 shadow-soft',
  ghost: 'text-ink-soft hover:text-ink hover:bg-surface-2',
  outline:
    'border border-line-strong text-ink hover:border-ink hover:bg-surface-2',
  link: 'text-accent hover:text-accent-strong underline-offset-4 hover:underline px-0',
  danger: 'bg-danger text-white hover:opacity-90',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-[13px] rounded-btn',
  md: 'h-11 px-6 text-sm rounded-btn',
  lg: 'h-12 px-7 text-[15px] rounded-btn',
  xl: 'h-14 px-9 text-base rounded-btn',
  icon: 'h-11 w-11 rounded-full',
  'icon-sm': 'h-9 w-9 rounded-full',
};

export function buttonClasses(opts: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, variants[opts.variant ?? 'primary'], sizes[opts.size ?? 'md'], opts.className);
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...props}
    />
  ),
);
Button.displayName = 'Button';
