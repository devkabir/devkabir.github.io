import React, { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'glass';
  hoverEffect?: boolean;
  contentClassName?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  hoverEffect = true,
  contentClassName = '',
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
    ? 'hover:border-[var(--color-border-default)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all duration-300 ease-out'
    : '';

  return (
    <div
      className={`group/card relative rounded-[var(--radius-lg)] p-[var(--space-md)] sm:p-[var(--space-lg)] overflow-hidden ${variantClasses[variant]} ${hoverClasses} ${className}`}
      {...props}
    >
      {/* Subtle background ambient highlight on hover */}
      {hoverEffect && (
        <div
          className="absolute inset-0 bg-[var(--color-accent-light)]/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
          aria-hidden="true"
        />
      )}

      <div className={`relative z-0 ${contentClassName}`}>{children}</div>
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
