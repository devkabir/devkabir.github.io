import React, { HTMLAttributes } from 'react';

export interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'card';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  variant = 'primary',
  padding = 'lg',
  className = '',
  children,
  ...props
}) => {
  const bgClasses = {
    primary: 'bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]',
    secondary:
      'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border-y border-[var(--color-border-subtle)]',
    tertiary: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]',
    card: 'bg-[var(--color-bg-card)] text-[var(--color-text-primary)]',
  };

  const paddingClasses = {
    none: 'py-0',
    sm: 'py-[var(--space-lg)]',
    md: 'py-[var(--space-xl)]',
    lg: 'py-[var(--space-xl)] md:py-[var(--space-2xl)]',
  };

  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden transition-colors duration-[var(--transition-normal)] ${bgClasses[variant]} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};
