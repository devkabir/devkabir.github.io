import React from 'react';
import { SectionWrapper } from '../structural/SectionWrapper';
import { ContentContainer } from '../structural/ContentContainer';
import { Badge } from '../structural/Badge';
import { Heading } from '../base/Heading';
import { Paragraph } from '../base/Paragraph';
import { Button } from '../base/Button';
import { Link } from '../base/Link';
import { Icon } from '../base/Icon';
import { HeroData } from '../../types';
import { decodeValue, formatEmailUrl } from '../../utils/dataUtils';

export interface HeroSectionProps {
  data: HeroData;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  if (!data) return null;

  const handleScrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const aboutElement = document.getElementById('about');
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SectionWrapper
      id="hero"
      padding="none"
      className="min-h-screen flex flex-col justify-center relative pt-20 pb-12"
    >
      {/* Subtle Background Accent Pattern matching the palette */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-palette-sand)] via-[var(--color-palette-coral)] to-[var(--color-palette-slate)]" />

      <ContentContainer className="flex-1 flex flex-col justify-center items-center py-12">
        <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto my-auto">
          {/* Badges & Live Availability */}
          <div className="flex flex-col items-center gap-3">
            {data.availability && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 shadow-sm backdrop-blur-sm transition-all hover:border-emerald-500/50">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>{data.availability}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="accent" size="md">
                <Icon name="Puzzle" size={15} />
                {data.badge}
              </Badge>
              {data.highlight && (
                <Badge variant="slate" size="md">
                  <Icon name="Terminal" size={15} />
                  {data.highlight}
                </Badge>
              )}
            </div>
          </div>

          {/* Name Heading */}
          <div className="space-y-4">
            <Heading
              level={1}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
            >
              {data.name.firstName}{' '}
              <span className="text-[var(--color-accent-primary)] font-extrabold">
                {data.name.lastName}
              </span>
            </Heading>
            <Paragraph
              size="lg"
              variant="secondary"
              className="font-medium text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              {data.tagline}
            </Paragraph>
          </div>

          {/* Action Links - Sorted by CTA priority (Primary: Email/Get in Touch -> Secondary: CV -> Outline: LinkedIn) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {[...data.socialLinks]
              .sort((a, b) => {
                const order: Record<string, number> = { email: 1, cv: 2, linkedin: 3 };
                return (order[a.type] || 99) - (order[b.type] || 99);
              })
              .map((link) => {
                const isEmail = link.type === 'email';
                const href = isEmail ? formatEmailUrl(link.url, link.encoded) : link.url;
                const isExternal = link.type === 'linkedin' || link.type === 'cv';

                if (link.type === 'email') {
                  return (
                    <Link key={link.label} href={href} variant="button-primary">
                      <Icon
                        name="Mail"
                        size={16}
                        className="transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                      <span>{link.label}</span>
                    </Link>
                  );
                }

                if (link.type === 'cv') {
                  return (
                    <Link
                      key={link.label}
                      href={href}
                      isExternal={isExternal}
                      variant="button-secondary"
                    >
                      <Icon
                        name="Download"
                        size={16}
                        className="transition-transform duration-300 group-hover/btn:translate-y-1"
                      />
                      <span>{link.label}</span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={href}
                    isExternal={isExternal}
                    variant="button-outline"
                  >
                    <Icon
                      name={link.type === 'linkedin' ? 'Linkedin' : 'ExternalLink'}
                      size={16}
                      className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                    />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="mt-12 pt-2 flex flex-col items-center justify-center gap-2">
          <a
            href="#about"
            onClick={handleScrollToAbout}
            aria-label="Scroll down to About section"
            className="group flex flex-col items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded-full p-1 cursor-pointer"
          >
            <span className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-primary)] transition-colors animate-pulse">
              Scroll Down
            </span>
            <div className="relative flex items-center justify-center">
              {/* Pulse & Glow ring behind indicator */}
              <span className="absolute inset-0 rounded-full bg-[var(--color-accent-primary)]/20 animate-ping opacity-75 group-hover:opacity-100" />

              {/* Floating glassmorphic arrow container with bounce effect */}
              <div className="relative w-11 h-11 rounded-full bg-[var(--color-bg-card)]/90 backdrop-blur-md border border-[var(--color-border-default)] shadow-lg group-hover:shadow-xl group-hover:shadow-[var(--color-accent-primary)]/20 group-hover:border-[var(--color-accent-primary)]/60 flex items-center justify-center transition-all duration-300 group-hover:scale-110 animate-bounce">
                <Icon
                  name="ChevronDown"
                  size={20}
                  className="text-[var(--color-accent-primary)] transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </div>
            </div>
          </a>
        </div>
      </ContentContainer>
    </SectionWrapper>
  );
};
