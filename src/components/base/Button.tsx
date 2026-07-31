import React, { ButtonHTMLAttributes, forwardRef, useState, useRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  magnetic?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      magnetic = true,
      disabled = false,
      className = '',
      children,
      type = 'button',
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const internalRef = useRef<HTMLButtonElement | null>(null);

    const setRefs = (element: HTMLButtonElement | null) => {
      internalRef.current = element;
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = element;
      }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onMouseMove) onMouseMove(e);
      if (!magnetic || disabled || !internalRef.current) return;
      const rect = internalRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setPos({
        x: (e.clientX - centerX) * 0.25,
        y: (e.clientY - centerY) * 0.25,
      });
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onMouseEnter) onMouseEnter(e);
      if (!disabled) setIsHovered(true);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onMouseLeave) onMouseLeave(e);
      setIsHovered(false);
      setPos({ x: 0, y: 0 });
    };

    // Base styles using design tokens
    const baseClasses =
      'group/btn relative inline-flex items-center justify-center font-semibold rounded-[var(--radius-md)] transition-all duration-[var(--transition-normal)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

    const variantClasses = {
      primary:
        'bg-[var(--color-accent-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-accent-primary-hover)] active:scale-[0.98] shadow-[var(--shadow-accent)] hover:shadow-lg hover:shadow-[var(--color-accent-primary)]/30',
      secondary:
        'bg-[var(--color-accent-secondary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-accent-secondary-hover)] active:scale-[0.98] shadow-[var(--shadow-sm)] hover:shadow-md hover:shadow-[var(--color-accent-secondary)]/25',
      outline:
        'bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-default)] hover:bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-accent)] hover:shadow-md active:scale-[0.98]',
      ghost:
        'bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent-primary)] active:scale-[0.98]',
    };

    const sizeClasses = {
      sm: 'text-xs px-[var(--space-sm)] py-[var(--space-xs)] gap-[var(--space-xs)] min-h-[36px]',
      md: 'text-sm px-[var(--space-md)] py-[var(--space-sm)] gap-[var(--space-sm)] min-h-[44px]',
      lg: 'text-base px-[var(--space-lg)] py-[var(--space-md)] gap-[var(--space-sm)] min-h-[52px]',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={setRefs}
        type={type}
        disabled={disabled}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={
          magnetic && isHovered && !disabled
            ? {
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0px) scale(1.04)`,
                transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s ease',
              }
            : magnetic
              ? {
                  transform: 'translate3d(0px, 0px, 0px) scale(1)',
                  transition:
                    'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s ease',
                }
              : undefined
        }
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
