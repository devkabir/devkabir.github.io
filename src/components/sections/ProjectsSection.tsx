import React, { useState } from 'react';
import { SectionWrapper } from '../structural/SectionWrapper';
import { ContentContainer } from '../structural/ContentContainer';
import { Card, CardHeader, CardBody, CardFooter } from '../structural/Card';
import { Heading } from '../base/Heading';
import { Paragraph } from '../base/Paragraph';
import { Badge } from '../structural/Badge';
import { Icon } from '../base/Icon';
import { Link } from '../base/Link';
import { Button } from '../base/Button';
import { ProjectItem } from '../../types';

export interface ProjectsSectionProps {
  data: ProjectItem[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ data }) => {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  if (!data || data.length === 0) return null;

  const displayedProjects = filter === 'featured' ? data.filter((p) => p.featured) : data;

  return (
    <SectionWrapper id="projects" padding="lg">
      <ContentContainer>
        <div className="space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <Badge variant="accent" size="sm">
                Portfolio Showcase
              </Badge>
              <Heading level={2}>Featured Projects & Plugins</Heading>
              <Paragraph size="md" variant="secondary" className="max-w-xl">
                A selection of high-impact plugins, migrations, and custom WooCommerce extensions
                built for thousands of websites.
              </Paragraph>
            </div>

            {/* Filter Toggle Pills */}
            <div className="flex items-center gap-1.5 bg-[var(--color-bg-secondary)] p-1.5 rounded-[var(--radius-full)] border border-[var(--color-border-subtle)] shrink-0 self-start md:self-auto shadow-xs">
              <Button
                variant={filter === 'all' ? 'primary' : 'ghost'}
                size="sm"
                magnetic={false}
                onClick={() => setFilter('all')}
                aria-pressed={filter === 'all'}
                className={`!rounded-[var(--radius-full)] !px-4 !py-2 font-bold duration-300 ease-out ${
                  filter === 'all'
                    ? ''
                    : '!text-[var(--color-text-secondary)] hover:!text-[var(--color-text-primary)] hover:!bg-[var(--color-bg-card)]'
                }`}
              >
                All Projects ({data.length})
              </Button>
              <Button
                variant={filter === 'featured' ? 'primary' : 'ghost'}
                size="sm"
                magnetic={false}
                onClick={() => setFilter('featured')}
                aria-pressed={filter === 'featured'}
                className={`!rounded-[var(--radius-full)] !px-4 !py-2 font-bold duration-300 ease-out ${
                  filter === 'featured'
                    ? ''
                    : '!text-[var(--color-text-secondary)] hover:!text-[var(--color-text-primary)] hover:!bg-[var(--color-bg-card)]'
                }`}
              >
                Featured ({data.filter((p) => p.featured).length})
              </Button>
            </div>
          </div>

          {/* Project Grid with smooth entry transition */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project) => (
              <div
                key={project.title}
                className="transition-all duration-300 ease-out animate-in fade-in-50 zoom-in-95"
              >
                <Card
                  variant="default"
                  hoverEffect
                  className="h-full"
                  contentClassName="flex h-full flex-col"
                >
                  <div className="pb-6">
                    <CardHeader className="flex items-center justify-between gap-2">
                      <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-accent-light)] text-[var(--color-accent-primary)] flex items-center justify-center shrink-0 group-hover/card:bg-[var(--color-accent-primary)] group-hover/card:text-[var(--color-text-inverse)] group-hover/card:scale-110 transition-all duration-300">
                        <Icon name={project.icon} size={24} />
                      </div>
                      {project.featured && (
                        <Badge variant="accent" size="sm">
                          <Icon name="Star" size={12} />
                          Featured
                        </Badge>
                      )}
                    </CardHeader>

                    <CardBody>
                      <div className="flex items-start justify-between gap-2">
                        <Heading
                          level={3}
                          className="text-lg font-bold group-hover/card:text-[var(--color-accent-primary)] transition-colors duration-300"
                        >
                          {project.title}
                        </Heading>
                        {project.url && (
                          <Link
                            href={project.url}
                            variant="unstyled"
                            isExternal
                            className="text-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary-hover)] transition-colors p-1"
                            title="View on WordPress.org"
                            aria-label={`View ${project.title} on WordPress.org`}
                          >
                            <Icon
                              name="ExternalLink"
                              size={18}
                              className="transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                            />
                          </Link>
                        )}
                      </div>

                      <Paragraph size="sm" variant="secondary" className="line-clamp-3 mt-1">
                        {project.description}
                      </Paragraph>
                    </CardBody>
                  </div>

                  <CardFooter className="!mt-auto !pt-4 space-y-3">
                    {/* Stats Pill */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent-secondary)]">
                      <Icon name="Zap" size={14} className="text-[var(--color-accent-primary)]" />
                      {project.stats}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </ContentContainer>
    </SectionWrapper>
  );
};
