import React, { useState, useEffect } from 'react';
import { ContentContainer } from './ContentContainer';
import { Button } from '../base/Button';
import { Link } from '../base/Link';
import { Icon } from '../base/Icon';
import { ThemeMode } from '../../types';

export interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  cvUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  cvUrl = '/cv-dev-kabir.pdf',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleThemeToggle = () => {
    setIsSpinning(true);
    onToggleTheme();
    setTimeout(() => {
      setIsSpinning(false);
    }, 500);
  };

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-[var(--color-bg-glass)]/90 backdrop-blur-md border-b border-[var(--color-border-subtle)] shadow-[var(--shadow-sm)] py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <ContentContainer>
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded-[var(--radius-sm)]"
          >
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-accent-primary)] text-[var(--color-text-inverse)] flex items-center justify-center shadow-[var(--shadow-accent)] group-hover:scale-105 transition-transform duration-[var(--transition-fast)]">
              {/* Custom Branded Developer Logo SVG */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Code Brackets */}
                <path d="M7 8L3 12L7 16" />
                <path d="M17 8L21 12L17 16" />
                {/* Center Plugin Connection Node */}
                <circle cx="12" cy="12" r="2.5" fill="currentColor" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-[var(--color-text-primary)] leading-tight group-hover:text-[var(--color-accent-primary)] transition-colors">
                Dev Kabir
              </span>
              <span className="text-[11px] font-medium text-[var(--color-text-muted)] tracking-wide">
                Plugin Developer
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            className={`hidden md:flex items-center gap-1 p-1.5 rounded-[var(--radius-full)] border transition-all duration-300 ${
              isScrolled
                ? 'bg-[var(--color-bg-card)]/90 border-[var(--color-border-subtle)] shadow-[var(--shadow-sm)] backdrop-blur-md'
                : 'bg-[var(--color-bg-card)]/70 border-[var(--color-border-subtle)]/60 shadow-[var(--shadow-sm)] backdrop-blur-sm'
            }`}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-semibold px-3 py-1.5 rounded-[var(--radius-full)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-light)] transition-all duration-[var(--transition-fast)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle Button with 180-deg Spin */}
            <button
              onClick={handleThemeToggle}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2.5 rounded-[var(--radius-md)] bg-[var(--color-bg-card)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-default)] hover:bg-[var(--color-bg-secondary)] active:scale-95 transition-all duration-[var(--transition-fast)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] cursor-pointer overflow-hidden group"
            >
              <div
                className={`transition-transform duration-500 ease-out transform ${
                  isSpinning
                    ? 'rotate-[180deg] scale-125'
                    : 'rotate-0 scale-100 group-hover:rotate-12'
                }`}
              >
                {theme === 'light' ? (
                  <Icon name="Moon" size={18} className="text-[var(--color-accent-secondary)]" />
                ) : (
                  <Icon name="Sun" size={18} className="text-[var(--color-accent-primary)]" />
                )}
              </div>
            </button>

            {/* Quick CTA */}
            <Link href="#contact" variant="button-primary" className="text-xs">
              Get in Touch
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handleThemeToggle}
              aria-label="Toggle Theme"
              className="p-2 rounded-[var(--radius-md)] bg-[var(--color-bg-card)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] active:scale-95 transition-all duration-150"
            >
              <div
                className={`transition-transform duration-500 ease-out transform ${
                  isSpinning ? 'rotate-[180deg] scale-125' : 'rotate-0 scale-100'
                }`}
              >
                {theme === 'light' ? (
                  <Icon name="Moon" size={18} className="text-[var(--color-accent-secondary)]" />
                ) : (
                  <Icon name="Sun" size={18} className="text-[var(--color-accent-primary)]" />
                )}
              </div>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-[var(--radius-md)] bg-[var(--color-bg-card)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-[var(--color-bg-card)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] animate-in fade-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent-primary)] rounded-[var(--radius-md)] transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 mt-1 border-t border-[var(--color-border-subtle)] flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 font-semibold text-sm rounded-[var(--radius-md)] bg-[var(--color-accent-primary)] text-[var(--color-text-inverse)] shadow-[var(--shadow-accent)]"
                >
                  Get in Touch
                </a>
              </div>
            </nav>
          </div>
        )}
      </ContentContainer>
    </header>
  );
};
