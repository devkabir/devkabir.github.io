import React, { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'glass';
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  hoverEffect = true,
  className = '',
  children,
  ...props
}) => {
  const variantClasses = {
    default:
      'bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] shadow-[var(--shadow-sm)]',
    elevated:
      'bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] shadow-[var(--shadow-md)]',
    bordered: 'bg-[var(--color-bg-card)] border-2 border-[var(--color-border-default)] shadow-none',
    glass:
      'bg-[var(--color-bg-glass)] border border-[var(--color-border-subtle)] backdrop-blur-md shadow-[var(--shadow-sm)]',
  };

  const hoverClasses = hoverEffect
    ? 'hover:border-[var(--color-accent-vibrant)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-[var(--transition-normal)]'
    : '';

  return (
    <div
      className={`rounded-[var(--radius-lg)] p-[var(--space-md)] sm:p-[var(--space-lg)] ${variantClasses[variant]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`mb-[var(--space-md)] ${className}`} {...props}>
    {children}
  </div>
);

export const CardBody: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`space-y-[var(--space-sm)] ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div
    className={`mt-[var(--space-md)] pt-[var(--space-sm)] border-t border-[var(--color-border-subtle)] ${className}`}
    {...props}
  >
    {children}
  </div>
);
