import React, { HTMLAttributes } from 'react';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  className = '',
  children,
  ...props
}) => {
  const levelClasses = {
    1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.1]',
    2: 'text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.2]',
    3: 'text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] leading-[1.25]',
    4: 'text-lg sm:text-xl font-semibold text-[var(--color-text-primary)] leading-[1.3]',
    5: 'text-base sm:text-lg font-semibold text-[var(--color-text-primary)] leading-[1.4]',
    6: 'text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] leading-[1.4]',
  };

  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return (
    <Tag className={`${levelClasses[level]} ${className}`} {...props}>
      {children}
    </Tag>
  );
};
