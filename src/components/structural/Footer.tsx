import React from 'react';
import { ContentContainer } from './ContentContainer';
import { Paragraph } from '../base/Paragraph';
import { Icon } from '../base/Icon';
import { ContactFooter } from '../../types';

export interface FooterProps {
  footerData: ContactFooter;
  location?: string;
}

export const Footer: React.FC<FooterProps> = ({ footerData, location }) => {
  return (
    <footer className="w-full bg-[var(--color-bg-secondary)] border-t border-[var(--color-border-subtle)] py-[var(--space-xl)] transition-colors duration-[var(--transition-normal)]">
      <ContentContainer>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-[var(--color-text-primary)]">
                Dev Kabir
              </span>
              <span className="text-[var(--color-text-muted)]">•</span>
              <span className="text-xs font-semibold text-[var(--color-accent-primary)]">
                WordPress Plugin Developer
              </span>
            </div>
            {location && (
              <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                <Icon name="MapPin" size={12} className="text-[var(--color-accent-primary)]" />
                {location}
              </p>
            )}
          </div>

          <div className="text-center md:text-right space-y-1">
            <Paragraph size="sm" variant="secondary">
              {footerData.tagline}
            </Paragraph>
            <Paragraph size="sm" variant="muted">
              © {new Date().getFullYear()} {footerData.copyright}
            </Paragraph>
          </div>
        </div>
      </ContentContainer>
    </footer>
  );
};
