/// <reference types="vite/client" />

// Google Analytics (GA4) Helper Module

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-MEASUREMENT_ID';

/**
 * Initialize Google Analytics 4 dynamically
 */
export const initGA = (): void => {
  if (typeof window === 'undefined') return;

  // Avoid duplicate script injections
  if (document.getElementById('ga-gtag')) return;

  // Create Google Tag Manager script element
  const script = document.createElement('script');
  script.id = 'ga-gtag';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments as unknown as Record<string, unknown>);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    send_page_view: true,
  });
};

/**
 * Track custom events in Google Analytics
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
): void => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
