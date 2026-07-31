import React, { useState } from 'react';
import { SectionWrapper } from '../structural/SectionWrapper';
import { ContentContainer } from '../structural/ContentContainer';
import { Card } from '../structural/Card';
import { Heading } from '../base/Heading';
import { Paragraph } from '../base/Paragraph';
import { Button } from '../base/Button';
import { Badge } from '../structural/Badge';
import { Icon } from '../base/Icon';
import { ContactData } from '../../types';
import { decodeValue, formatEmailUrl } from '../../utils/dataUtils';

export interface ContactSectionProps {
  data: ContactData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  if (!data) return null;

  const [copiedEmail, setCopiedEmail] = useState(false);

  const emailLink = data.links.find((l) => l.icon === 'Mail');
  const decodedEmail = emailLink
    ? decodeValue(emailLink.value, emailLink.encoded)
    : '';

  const handleCopyEmail = () => {
    if (decodedEmail) {
      navigator.clipboard.writeText(decodedEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <SectionWrapper id="contact" padding="lg">
      <ContentContainer>
        <div className="space-y-10 max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="accent" size="sm">
              Direct Channels & Reach Out
            </Badge>
            <Heading level={2}>{data.title}</Heading>
            <Paragraph size="md" variant="secondary">
              {data.subtitle}
            </Paragraph>
            {data.location && (
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-3 py-1.5 rounded-[var(--radius-full)] border border-[var(--color-border-subtle)] mt-2">
                <Icon name="MapPin" size={14} className="text-[var(--color-accent-primary)]" />
                {data.location}
              </div>
            )}
          </div>

          {/* Contact Information Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.links.map((link, idx) => {
              const isEmail = link.icon === 'Mail';
              const isPhone = link.icon === 'Phone';
              const isCv = link.icon === 'Download';
              const isLinkedin = link.icon === 'Linkedin';

              let href = link.href;
              if (isEmail) {
                href = formatEmailUrl(link.value, link.encoded);
              }
              const displayValue = isEmail
                ? decodeValue(link.value, link.encoded)
                : link.value;

              return (
                <Card
                  key={idx}
                  variant="default"
                  className="p-5 flex items-center justify-between group hover:border-[var(--color-border-default)] hover:shadow-md transition-all duration-300"
                >
                  <a
                    href={href}
                    target={isLinkedin || isCv ? '_blank' : '_self'}
                    rel={isLinkedin || isCv ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 flex-1 focus:outline-none min-w-0"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-[var(--radius-md)] bg-[var(--color-accent-light)] text-[var(--color-accent-primary)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon name={link.icon} size={22} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                        {link.label}
                      </div>
                      <div className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors truncate">
                        {displayValue}
                      </div>
                    </div>
                  </a>

                  {isEmail && (
                    <button
                      onClick={handleCopyEmail}
                      title="Copy Email Address"
                      className="p-2.5 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] hover:bg-[var(--color-bg-secondary)] active:scale-95 transition-all cursor-pointer shrink-0"
                    >
                      <Icon name={copiedEmail ? 'Check' : 'FileText'} size={18} className={copiedEmail ? 'text-[var(--color-accent-primary)]' : ''} />
                    </button>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Quick Action CTA Banner */}
          <div className="p-6 sm:p-8 rounded-[var(--radius-lg)] bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] shadow-[var(--shadow-sm)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <Heading level={3} className="text-lg font-bold">
                Prefer email directly?
              </Heading>
              <Paragraph size="sm" variant="muted">
                Send an email or connect on LinkedIn to start a conversation.
              </Paragraph>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              {decodedEmail && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    window.location.href = `mailto:${decodedEmail}`;
                  }}
                >
                  <Icon name="Mail" size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                  <span>Send Email</span>
                </Button>
              )}
              {decodedEmail && (
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleCopyEmail}
                >
                  <Icon name={copiedEmail ? 'Check' : 'FileText'} size={16} />
                  <span>{copiedEmail ? 'Copied!' : 'Copy Address'}</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </ContentContainer>
    </SectionWrapper>
  );
};

