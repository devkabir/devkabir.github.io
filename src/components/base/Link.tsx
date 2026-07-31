import React, { AnchorHTMLAttributes, forwardRef, useState, useRef } from 'react';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'inline' | 'nav' | 'button-primary' | 'button-secondary' | 'button-outline';
  isExternal?: boolean;
  magnetic?: boolean;
  children: React.ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = 'inline',
      isExternal = false,
      magnetic = true,
      href,
      className = '',
      children,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const internalRef = useRef<HTMLAnchorElement | null>(null);

    const setRefs = (element: HTMLAnchorElement | null) => {
      internalRef.current = element;
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLAnchorElement | null>).current = element;
      }
    };

    const isButtonVariant = variant.startsWith('button-');
    const isMagnetic = magnetic && isButtonVariant;

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onMouseMove) onMouseMove(e);
      if (!isMagnetic || !internalRef.current) return;
      const rect = internalRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setPos({
        x: (e.clientX - centerX) * 0.25,
        y: (e.clientY - centerY) * 0.25,
      });
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onMouseEnter) onMouseEnter(e);
      setIsHovered(true);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onMouseLeave) onMouseLeave(e);
      setIsHovered(false);
      setPos({ x: 0, y: 0 });
    };

    const externalAttrs = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

    const variantClasses = {
      inline:
        'text-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary-hover)] underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors duration-[var(--transition-fast)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded-[var(--radius-sm)]',
      nav: 'text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] font-medium text-sm transition-colors duration-[var(--transition-fast)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] py-[var(--space-xs)] px-[var(--space-sm)] rounded-[var(--radius-sm)]',
      'button-primary':
        'group/btn relative inline-flex items-center justify-center gap-2 font-semibold text-sm px-[var(--space-md)] py-[var(--space-sm)] rounded-[var(--radius-md)] bg-[var(--color-accent-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-accent-primary-hover)] shadow-[var(--shadow-accent)] hover:shadow-lg hover:shadow-[var(--color-accent-primary)]/30 active:scale-[0.98] transition-all duration-[var(--transition-normal)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] min-h-[44px]',
      'button-secondary':
        'group/btn relative inline-flex items-center justify-center gap-2 font-semibold text-sm px-[var(--space-md)] py-[var(--space-sm)] rounded-[var(--radius-md)] bg-[var(--color-accent-secondary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-accent-secondary-hover)] shadow-[var(--shadow-sm)] hover:shadow-md hover:shadow-[var(--color-accent-secondary)]/25 active:scale-[0.98] transition-all duration-[var(--transition-normal)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] min-h-[44px]',
      'button-outline':
        'group/btn relative inline-flex items-center justify-center gap-2 font-semibold text-sm px-[var(--space-md)] py-[var(--space-sm)] rounded-[var(--radius-md)] bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-default)] hover:bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-accent)] hover:shadow-md active:scale-[0.98] transition-all duration-[var(--transition-normal)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] min-h-[44px]',
    };

    return (
      <a
        ref={setRefs}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={
          isMagnetic && isHovered
            ? {
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0px) scale(1.04)`,
                transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s ease',
              }
            : isMagnetic
              ? {
                  transform: 'translate3d(0px, 0px, 0px) scale(1)',
                  transition:
                    'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s ease',
                }
              : undefined
        }
        className={`${variantClasses[variant]} ${className}`}
        {...externalAttrs}
        {...props}
      >
        {children}
      </a>
    );
  },
);

Link.displayName = 'Link';
