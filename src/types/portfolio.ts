export interface SocialLink {
  type: string;
  label: string;
  url: string;
  encoded?: boolean;
}

export interface HeroData {
  badge: string;
  name: {
    firstName: string;
    lastName: string;
  };
  tagline: string;
  highlight: string;
  cvUrl?: string;
  socialLinks: SocialLink[];
}

export interface Stat {
  icon: string;
  value: string;
  label: string;
}

export interface AboutData {
  title: string;
  introduction: string[];
  skills: string[];
  stats: Stat[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  current: boolean;
}

export interface Project {
  title: string;
  description: string;
  icon: string;
  stats: string;
  tags: string[];
  featured: boolean;
}

export interface Testimonial {
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

export interface ContactData {
  title: string;
  subtitle: string;
  location: string;
  cvUrl?: string;
  links: ContactLink[];
  footer: {
    copyright: string;
    tagline: string;
  };
}

export interface PortfolioContent {
  hero: HeroData;
  about: AboutData;
  experience: Experience[];
  projects: Project[];
  testimonials: Testimonial[];
  contact: ContactData;
}
