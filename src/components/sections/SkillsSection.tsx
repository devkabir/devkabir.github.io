import React, { useState } from 'react';
import { SectionWrapper } from '../structural/SectionWrapper';
import { ContentContainer } from '../structural/ContentContainer';
import { Card } from '../structural/Card';
import { Heading } from '../base/Heading';
import { Paragraph } from '../base/Paragraph';
import { Badge } from '../structural/Badge';
import { Icon } from '../base/Icon';

export interface SkillsSectionProps {
  skills: string[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Categorize skills cleanly
  const categories = [
    { name: 'All' },
    {
      name: 'Backend & WordPress',
      filter: ['PHP', 'WordPress', 'MySQL', 'Laravel', 'Rust (Learning)'],
    },
    { name: 'Frontend & UI', filter: ['JavaScript', 'Vue.js', 'React', 'HTML', 'CSS'] },
    { name: 'APIs & Ecosystem', filter: ['REST APIs', 'WooCommerce', 'CORS', 'Google Analytics'] },
  ];

  const skillDetailsMap: Record<string, { desc: string; icon: string; category: string }> = {
    PHP: {
      desc: 'Primary language for WordPress core & plugin architecture',
      icon: 'Code2',
      category: 'Backend & WordPress',
    },
    WordPress: {
      desc: 'Hook system, action/filter pipelines, plugin security',
      icon: 'Puzzle',
      category: 'Backend & WordPress',
    },
    MySQL: {
      desc: 'Database query optimization and custom schema creation',
      icon: 'Terminal',
      category: 'Backend & WordPress',
    },
    Laravel: {
      desc: 'Modern MVC framework for standalone web applications',
      icon: 'Layers',
      category: 'Backend & WordPress',
    },
    'Rust (Learning)': {
      desc: 'Deepening systems programming & performance execution',
      icon: 'Zap',
      category: 'Backend & WordPress',
    },
    JavaScript: {
      desc: 'ES6+, Async JS, DOM manipulation, custom plugin UI',
      icon: 'Code2',
      category: 'Frontend & UI',
    },
    'Vue.js': {
      desc: 'Vue 2 & Vue 3 Composition API migration expertise',
      icon: 'Layers',
      category: 'Frontend & UI',
    },
    React: {
      desc: 'Building modern reactive dashboards & Gutenberg blocks',
      icon: 'Layers',
      category: 'Frontend & UI',
    },
    HTML: {
      desc: 'Semantic, accessible structure for web applications',
      icon: 'FileText',
      category: 'Frontend & UI',
    },
    CSS: {
      desc: 'Responsive styling, Tailwind CSS, custom component themes',
      icon: 'FileText',
      category: 'Frontend & UI',
    },
    'REST APIs': {
      desc: 'Endpoints integration, authentication & JSON payloads',
      icon: 'Globe',
      category: 'APIs & Ecosystem',
    },
    WooCommerce: {
      desc: 'Custom payment gateways, shipping rules & extensions',
      icon: 'ShoppingCart',
      category: 'APIs & Ecosystem',
    },
    CORS: {
      desc: 'Cross-origin resource sharing & security header setup',
      icon: 'Shield',
      category: 'APIs & Ecosystem',
    },
    'Google Analytics': {
      desc: 'Event tracking, analytics integration & data insight',
      icon: 'BarChart3',
      category: 'APIs & Ecosystem',
    },
  };

  const filteredSkills = skills.filter((skill) => {
    if (activeCategory === 'All') return true;
    const cat = categories.find((c) => c.name === activeCategory);
    return cat?.filter?.includes(skill);
  });

  return (
    <SectionWrapper id="skills" variant="secondary" padding="lg">
      <ContentContainer>
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="accent" size="sm">
              Technical Expertise
            </Badge>
            <Heading level={2}>Skills & Specialties</Heading>
            <Paragraph size="md" variant="secondary">
              Specialized tools and technologies honed over 150+ custom WordPress plugin builds.
            </Paragraph>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`text-xs font-semibold px-4 py-2 rounded-[var(--radius-full)] transition-all duration-[var(--transition-fast)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] ${
                    isActive
                      ? 'bg-[var(--color-accent-primary)] text-[var(--color-text-inverse)] shadow-[var(--shadow-accent)]'
                      : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-secondary)]'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Skill Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSkills.map((skill) => {
              const info = skillDetailsMap[skill] || {
                desc: 'Specialized WordPress plugin skill',
                icon: 'Code2',
                category: 'General',
              };

              return (
                <Card
                  key={skill}
                  variant="default"
                  className="flex flex-col justify-between p-5 space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-accent-slate-light)] text-[var(--color-accent-secondary)] flex items-center justify-center">
                        <Icon name={info.icon} size={20} />
                      </div>
                      {skill.includes('Rust') && (
                        <Badge variant="accent" size="sm">
                          Learning
                        </Badge>
                      )}
                    </div>
                    <Heading level={4} className="text-base font-bold">
                      {skill}
                    </Heading>
                    <Paragraph size="sm" variant="muted">
                      {info.desc}
                    </Paragraph>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </ContentContainer>
    </SectionWrapper>
  );
};
