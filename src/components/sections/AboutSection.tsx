import React from 'react';
import { SectionWrapper } from '../structural/SectionWrapper';
import { ContentContainer } from '../structural/ContentContainer';
import { Card } from '../structural/Card';
import { Heading } from '../base/Heading';
import { Paragraph } from '../base/Paragraph';
import { Icon } from '../base/Icon';
import { Badge } from '../structural/Badge';
import { AboutData } from '../../types';

export interface AboutSectionProps {
  data: AboutData;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  if (!data) return null;

  return (
    <SectionWrapper id="about" variant="secondary" padding="lg">
      <ContentContainer>
        <div className="space-y-12">
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="accent" size="sm">
              Overview
            </Badge>
            <Heading level={2}>{data.title}</Heading>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Introduction paragraphs */}
            <div className="lg:col-span-7 space-y-4">
              {data.introduction.map((paragraph, index) => (
                <Paragraph
                  key={index}
                  size="md"
                  variant="secondary"
                  className="text-base sm:text-lg"
                >
                  {paragraph}
                </Paragraph>
              ))}

              {/* Skill pills quick list */}
              <div className="pt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
                  Core Technical Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={skill.includes('Rust') ? 'accent' : 'secondary'}
                      size="md"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {data.stats.map((stat, idx) => (
                <Card key={idx} variant="default" className="flex items-center gap-4 p-5">
                  <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-accent-light)] text-[var(--color-accent-primary)] flex items-center justify-center shrink-0">
                    <Icon name={stat.icon} size={24} />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)]">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-[var(--color-text-secondary)]">
                      {stat.label}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ContentContainer>
    </SectionWrapper>
  );
};
