export interface SocialLink {
  type: string;
  label: string;
  url: string;
  encoded?: boolean;
}

export interface HeroData {
  badge: string;
  availability?: string;
  name: {
    firstName: string;
    lastName: string;
  };
  tagline: string;
  highlight: string;
  cvUrl: string;
  socialLinks: SocialLink[];
}

export interface StatItem {
  icon: string;
  value: string;
  label: string;
}

export interface AboutData {
  title: string;
  introduction: string[];
  skills: string[];
  stats: StatItem[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  current: boolean;
  url?: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  icon: string;
  stats: string;
  tags: string[];
  featured: boolean;
  url?: string;
}

export interface TestimonialItem {
  text: string;
  author: string;
}

export interface ContactLink {
  icon: string;
  label: string;
  value: string;
  href: string;
  encoded?: boolean;
}

export interface ContactFooter {
  copyright: string;
  tagline: string;
}

export interface ContactData {
  title: string;
  subtitle: string;
  location: string;
  cvUrl: string;
  links: ContactLink[];
  footer: ContactFooter;
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  testimonials: TestimonialItem[];
  contact: ContactData;
}

export type ThemeMode = 'light' | 'dark';
