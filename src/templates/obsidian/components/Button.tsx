import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'brass' | 'onyx' | 'ghost-light' | 'ghost-dark';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'brass',
  className = '',
  children,
  ...props
}) => {
  const variantClass =
    variant === 'brass'
      ? 'btn-brass'
      : variant === 'onyx'
      ? 'btn-onyx'
      : variant === 'ghost-light'
      ? 'btn-ghost-light'
      : 'btn-ghost-dark';

  return (
    <button type="button" className={`btn ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};
