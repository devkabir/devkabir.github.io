import React, { HTMLAttributes } from 'react';

export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'muted';
  children: React.ReactNode;
}

export const Paragraph: React.FC<ParagraphProps> = ({
  size = 'md',
  variant = 'primary',
  className = '',
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-xs sm:text-sm leading-relaxed',
    md: 'text-sm sm:text-base leading-relaxed',
    lg: 'text-base sm:text-lg md:text-xl leading-relaxed',
  };

  const variantClasses = {
    primary: 'text-[var(--color-text-primary)]',
    secondary: 'text-[var(--color-text-secondary)]',
    muted: 'text-[var(--color-text-muted)]',
  };

  return (
    <p className={`${sizeClasses[size]} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </p>
  );
};
