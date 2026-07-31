import React, { HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'slate';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'accent',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const variantClasses = {
    accent:
      'bg-[var(--color-accent-light)] text-[var(--color-accent-primary)] border border-[var(--color-border-default)]',
    primary:
      'bg-[var(--color-accent-primary)] text-[var(--color-text-inverse)] shadow-[var(--shadow-sm)]',
    secondary:
      'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)]',
    slate:
      'bg-[var(--color-accent-slate-light)] text-[var(--color-accent-secondary)] border border-[var(--color-border-subtle)]',
    outline:
      'bg-transparent text-[var(--color-text-secondary)] border border-[var(--color-border-default)]',
  };

  const sizeClasses = {
    sm: 'text-[11px] px-[var(--space-xs)] py-[2px] font-semibold tracking-wide uppercase',
    md: 'text-xs px-[var(--space-sm)] py-[var(--space-xs)] font-semibold tracking-medium',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[var(--radius-full)] whitespace-nowrap select-none transition-colors duration-[var(--transition-fast)] ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
