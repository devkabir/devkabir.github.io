import React, { HTMLAttributes } from 'react';

export interface ListProps extends HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  ordered?: boolean;
  inline?: boolean;
  children: React.ReactNode;
}

export const List: React.FC<ListProps> = ({
  ordered = false,
  inline = false,
  className = '',
  children,
  ...props
}) => {
  const Tag = ordered ? 'ol' : 'ul';
  const layoutClasses = inline
    ? 'flex flex-wrap items-center gap-[var(--space-sm)]'
    : 'flex flex-col gap-[var(--space-sm)]';

  return (
    <Tag className={`${layoutClasses} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

export const ListItem: React.FC<ListItemProps> = ({ className = '', children, ...props }) => {
  return (
    <li
      className={`text-sm sm:text-base text-[var(--color-text-secondary)] ${className}`}
      {...props}
    >
      {children}
    </li>
  );
};
