import React, { useState } from 'react';
import { SectionWrapper } from '../structural/SectionWrapper';
import { ContentContainer } from '../structural/ContentContainer';
import { Card, CardHeader, CardBody, CardFooter } from '../structural/Card';
import { Heading } from '../base/Heading';
import { Paragraph } from '../base/Paragraph';
import { Badge } from '../structural/Badge';
import { Icon } from '../base/Icon';
import { Link } from '../base/Link';
import { ProjectItem } from '../../types';

export interface ProjectsSectionProps {
  data: ProjectItem[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const displayedProjects = filter === 'featured' ? data.filter((p) => p.featured) : data;

  return (
    <SectionWrapper id="projects" padding="lg">
      <ContentContainer>
        <div className="space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
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
              <button
                onClick={() => setFilter('all')}
                className={`text-xs font-bold px-4 py-2 rounded-[var(--radius-full)] transition-all duration-300 ease-out cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] ${
                  filter === 'all'
                    ? 'bg-[var(--color-accent-primary)] text-[var(--color-text-inverse)] shadow-[var(--shadow-accent)] scale-100'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-card)]'
                }`}
              >
                All Projects ({data.length})
              </button>
              <button
                onClick={() => setFilter('featured')}
                className={`text-xs font-bold px-4 py-2 rounded-[var(--radius-full)] transition-all duration-300 ease-out cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] ${
                  filter === 'featured'
                    ? 'bg-[var(--color-accent-primary)] text-[var(--color-text-inverse)] shadow-[var(--shadow-accent)] scale-100'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-card)]'
                }`}
              >
                Featured ({data.filter((p) => p.featured).length})
              </button>
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
                  className="flex flex-col justify-between h-full"
                >
                  <div>
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
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary-hover)] transition-colors p-1"
                            title="View on WordPress.org"
                            aria-label={`View ${project.title} on WordPress.org`}
                          >
                            <Icon
                              name="ExternalLink"
                              size={18}
                              className="transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                            />
                          </a>
                        )}
                      </div>

                      <Paragraph size="sm" variant="secondary" className="line-clamp-3 mt-1">
                        {project.description}
                      </Paragraph>
                    </CardBody>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--color-border-subtle)] space-y-3">
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
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </ContentContainer>
    </SectionWrapper>
  );
};
