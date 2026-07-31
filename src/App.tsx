import React, { useState, useEffect } from 'react';
import portfolioDataRaw from './data/portfolioData.json';
import { PortfolioData, ThemeMode } from './types';
import { Header } from './components/structural/Header';
import { Footer } from './components/structural/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { ContactSection } from './components/sections/ContactSection';
import { initGA } from './lib/analytics';

const portfolioData = portfolioDataRaw as PortfolioData;

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme-mode');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme-mode', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] transition-colors duration-[var(--transition-normal)] flex flex-col font-sans relative overflow-x-hidden">
      {/* Ambient Floating Orbs Background Lights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-20 -left-20 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full bg-[var(--color-accent-vibrant)]/25 dark:bg-[var(--color-accent-primary)]/15 blur-[120px] animate-orb-1" />
        <div className="absolute top-[35%] -right-20 w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full bg-[var(--color-palette-sand)]/30 dark:bg-[var(--color-accent-secondary)]/15 blur-[130px] animate-orb-2" />
        <div className="absolute bottom-[10%] left-[5%] w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] rounded-full bg-[var(--color-palette-steel)]/20 dark:bg-[var(--color-accent-vibrant)]/10 blur-[140px] animate-orb-3" />
      </div>

      {/* Header & Navigation */}
      <Header theme={theme} onToggleTheme={toggleTheme} cvUrl={portfolioData.hero?.cvUrl} />

      {/* Main Single Page Content */}
      <main className="flex-1">
        {portfolioData.hero && <HeroSection data={portfolioData.hero} />}
        {portfolioData.about && <AboutSection data={portfolioData.about} />}
        {portfolioData.experience && <ExperienceSection data={portfolioData.experience} />}
        {portfolioData.about?.skills && <SkillsSection skills={portfolioData.about.skills} />}
        {portfolioData.projects && <ProjectsSection data={portfolioData.projects} />}
        {portfolioData.testimonials && <TestimonialsSection data={portfolioData.testimonials} />}
        {portfolioData.contact && <ContactSection data={portfolioData.contact} />}
      </main>

      {/* Footer */}
      {portfolioData.contact?.footer && (
        <Footer
          footerData={portfolioData.contact.footer}
          location={portfolioData.contact.location}
        />
      )}
    </div>
  );
}
