import React, { useState } from 'react';
import { SectionWrapper } from '../structural/SectionWrapper';
import { ContentContainer } from '../structural/ContentContainer';
import { Card } from '../structural/Card';
import { Heading } from '../base/Heading';
import { Paragraph } from '../base/Paragraph';
import { Button } from '../base/Button';
import { Link } from '../base/Link';
import { Badge } from '../structural/Badge';
import { Icon } from '../base/Icon';
import { ContactData } from '../../types';
import { decodeValue, formatEmailUrl } from '../../utils/dataUtils';

export interface ContactSectionProps {
  data: ContactData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!data) return null;

  const emailLink = data.links.find((l) => l.icon === 'Mail');
  const decodedEmail = emailLink ? decodeValue(emailLink.value, emailLink.encoded) : '';

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
              <Badge variant="secondary" size="md" className="mt-2">
                <Icon name="MapPin" size={14} className="text-[var(--color-accent-primary)]" />
                {data.location}
              </Badge>
            )}
          </div>

          {/* Contact Information Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.links.map((link, idx) => {
              const isEmail = link.icon === 'Mail';
              const isCv = link.icon === 'Download';
              const isLinkedin = link.icon === 'Linkedin';

              let href = link.href;
              if (isEmail) {
                href = formatEmailUrl(link.value, link.encoded);
              }
              const displayValue = isEmail ? decodeValue(link.value, link.encoded) : link.value;

              return (
                <Card
                  key={idx}
                  variant="default"
                  className="p-5 group hover:border-[var(--color-border-default)] hover:shadow-md transition-all duration-300"
                  contentClassName="flex items-center justify-between"
                >
                  <Link
                    href={href}
                    variant="unstyled"
                    isExternal={isLinkedin || isCv}
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
                  </Link>

                  {isEmail && (
                    <Button
                      variant="ghost"
                      size="sm"
                      magnetic={false}
                      onClick={handleCopyEmail}
                      title="Copy Email Address"
                      aria-label="Copy email address"
                      className="min-h-0 p-2.5 text-[var(--color-text-muted)] shrink-0"
                    >
                      <Icon
                        name={copiedEmail ? 'Check' : 'FileText'}
                        size={18}
                        className={copiedEmail ? 'text-[var(--color-accent-primary)]' : ''}
                      />
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Quick Action CTA Banner */}
          <Card
            hoverEffect={false}
            className="p-6 sm:p-8"
            contentClassName="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] items-center gap-6 text-center sm:text-left"
          >
            <div className="space-y-1">
              <Heading level={3} className="text-lg font-bold">
                Prefer email directly?
              </Heading>
              <Paragraph size="sm" variant="muted">
                Send an email or connect on LinkedIn to start a conversation.
              </Paragraph>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3">
              {decodedEmail && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    window.location.href = `mailto:${decodedEmail}`;
                  }}
                >
                  <Icon
                    name="Mail"
                    size={16}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                  <span>Send Email</span>
                </Button>
              )}
              {decodedEmail && (
                <Button variant="outline" size="md" onClick={handleCopyEmail}>
                  <Icon name={copiedEmail ? 'Check' : 'FileText'} size={16} />
                  <span>{copiedEmail ? 'Copied!' : 'Copy Address'}</span>
                </Button>
              )}
            </div>
          </Card>
        </div>
      </ContentContainer>
    </SectionWrapper>
  );
};
