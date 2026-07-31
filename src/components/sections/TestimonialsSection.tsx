import React from 'react';
import { SectionWrapper } from '../structural/SectionWrapper';
import { ContentContainer } from '../structural/ContentContainer';
import { Card, CardBody, CardFooter, CardHeader } from '../structural/Card';
import { Heading } from '../base/Heading';
import { Paragraph } from '../base/Paragraph';
import { Badge } from '../structural/Badge';
import { Icon } from '../base/Icon';
import { TestimonialItem } from '../../types';

export interface TestimonialsSectionProps {
  data: TestimonialItem[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <SectionWrapper id="testimonials" variant="secondary" padding="lg">
      <ContentContainer>
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="accent" size="sm">
              Client & Open Source Impact
            </Badge>
            <Heading level={2}>Recommendations & Impact</Heading>
            <Paragraph size="md" variant="secondary">
              Highlights from team engineering, client projects, and global open-source adoption.
            </Paragraph>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.map((item, idx) => (
              <Card
                key={idx}
                variant="default"
                hoverEffect={false}
                className="h-full p-6 transition-all duration-300 ease-out hover:border-[var(--color-border-default)] hover:shadow-[var(--shadow-md)]"
                contentClassName="grid h-full grid-rows-[auto_1fr_auto]"
              >
                {/* Decorative Quote Mark */}
                <div className="absolute top-4 right-4 text-[var(--color-border-default)] opacity-40 select-none pointer-events-none">
                  <span className="text-6xl font-serif leading-none">“</span>
                </div>

                <CardHeader>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="fill-amber-500" />
                    ))}
                  </div>
                </CardHeader>

                <CardBody className="pb-6">
                  <Paragraph
                    size="md"
                    variant="primary"
                    className="italic leading-relaxed font-medium"
                  >
                    "{item.text}"
                  </Paragraph>
                </CardBody>

                <CardFooter className="!mt-0 !pt-4 flex items-center gap-3">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-[var(--color-accent-primary)] text-[var(--color-text-inverse)] flex items-center justify-center font-bold text-xs shadow-[var(--shadow-accent)]">
                    {item.author.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <Paragraph className="text-sm font-bold text-[var(--color-text-primary)]">
                      {item.author}
                    </Paragraph>
                    <Paragraph size="sm" variant="muted" className="text-xs">
                      Verified Client / Ecosystem
                    </Paragraph>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </ContentContainer>
    </SectionWrapper>
  );
};
