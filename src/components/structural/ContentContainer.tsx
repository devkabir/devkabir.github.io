import React, { HTMLAttributes } from 'react';

export interface ContentContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  narrow?: boolean;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  narrow = false,
  className = '',
  ...props
}) => {
  const maxWidthClass = narrow ? 'max-w-4xl' : 'max-w-[var(--container-max-w)]';

  return (
    <div
      className={`w-full mx-auto px-[var(--space-md)] sm:px-[var(--space-lg)] lg:px-[var(--space-xl)] ${maxWidthClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
