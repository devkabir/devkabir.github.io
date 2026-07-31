import React, { useState, useEffect, useRef } from 'react';
import { SectionWrapper } from '../structural/SectionWrapper';
import { ContentContainer } from '../structural/ContentContainer';
import { Card, CardHeader, CardBody } from '../structural/Card';
import { Heading } from '../base/Heading';
import { Paragraph } from '../base/Paragraph';
import { Badge } from '../structural/Badge';
import { Icon } from '../base/Icon';
import { ExperienceItem } from '../../types';

export interface ExperienceSectionProps {
  data: ExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ data }) => {
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineContainerRef.current) return;
      const rect = timelineContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start filling line when top of timeline container reaches 65% down viewport
      const startPoint = windowHeight * 0.65;
      const distanceFromStart = startPoint - rect.top;
      const totalScrollableHeight = rect.height;

      const progress = distanceFromStart / totalScrollableHeight;
      const clampedProgress = Math.min(Math.max(progress, 0), 1);
      setLineProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!data || data.length === 0) return null;

  return (
    <SectionWrapper id="experience" padding="lg">
      <ContentContainer>
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="accent" size="sm">
              Career Timeline
            </Badge>
            <Heading level={2}>Work Experience</Heading>
          </div>

          {/* Timeline Cards */}
          <div ref={timelineContainerRef} className="relative space-y-8 sm:space-y-10">
            {/* Timeline Vertical Track & Animated Drawing Line */}
            <div className="absolute left-3 sm:left-4 top-[30px] sm:top-[38px] bottom-[30px] sm:bottom-[38px] w-1 -translate-x-1/2 pointer-events-none z-0">
              {/* Base Track Line */}
              <div className="absolute inset-0 bg-[var(--color-border-subtle)]/60 rounded-full" />

              {/* Active Fill Line */}
              <div
                className="w-full bg-gradient-to-b from-[var(--color-accent-primary)] via-[var(--color-accent-vibrant)] to-[var(--color-accent-secondary)] shadow-[0_0_12px_var(--color-accent-vibrant)] transition-all duration-150 ease-out rounded-full"
                style={{ height: `${lineProgress * 100}%` }}
              />

              {/* Glowing Leading Pulse Tip */}
              {lineProgress > 0 && lineProgress < 1 && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-accent-primary)] shadow-[0_0_12px_var(--color-accent-primary)] z-10 transition-all duration-150 ease-out animate-pulse"
                  style={{ top: `${lineProgress * 100}%` }}
                />
              )}
            </div>

            {data.map((item, idx) => {
              // Calculate if line has reached or passed this card node
              const threshold = (idx + 0.2) / data.length;
              const isNodeReached = lineProgress >= threshold || item.current;

              return (
                <div key={idx} className="relative group pl-9 sm:pl-12">
                  {/* Timeline Node Dot */}
                  <div
                    className={`absolute left-3 sm:left-4 top-[30px] sm:top-[38px] -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 transition-all duration-300 group-hover:scale-125 z-10 ${
                      item.current
                        ? 'bg-[var(--color-accent-primary)] border-[var(--color-bg-primary)] ring-4 ring-[var(--color-accent-light)] shadow-[0_0_14px_var(--color-accent-primary)]'
                        : isNodeReached
                          ? 'bg-[var(--color-accent-primary)] border-[var(--color-bg-primary)] scale-110 shadow-[0_0_8px_var(--color-accent-primary)]'
                          : 'bg-[var(--color-accent-secondary)]/50 border-[var(--color-bg-primary)]'
                    }`}
                  />

                  <Card variant="default" className="relative">
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Heading level={3} className="text-lg sm:text-xl font-bold">
                            {item.role}
                          </Heading>
                          {item.current && (
                            <Badge variant="accent" size="sm">
                              Present
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-[var(--color-accent-secondary)] flex items-center gap-1.5 mt-0.5">
                          {item.company}
                          {item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-[var(--color-accent-primary)] hover:underline ml-1"
                              aria-label={`View ${item.company} plugin page`}
                            >
                              <Icon name="ExternalLink" size={12} />
                              <span>WordPress.org</span>
                            </a>
                          )}
                        </p>
                      </div>

                      <div className="text-xs font-mono font-medium text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-3 py-1 rounded-[var(--radius-full)] w-fit">
                        {item.period}
                      </div>
                    </CardHeader>

                    <CardBody>
                      <Paragraph size="md" variant="secondary">
                        {item.description}
                      </Paragraph>

                      {/* Highlights Badges */}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-2">
                          {item.highlights.map((highlight) => (
                            <Badge key={highlight} variant="secondary" size="sm">
                              <Icon
                                name="Check"
                                size={12}
                                className="text-[var(--color-accent-primary)]"
                              />
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </ContentContainer>
    </SectionWrapper>
  );
};
