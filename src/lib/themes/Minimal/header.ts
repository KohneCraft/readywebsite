// ============================================
// Sade Tema - Header
// Minimalist navigasyon - Çoklu dil desteği
// ============================================

import type { NavItem } from '@/types/theme';

export const sadeHeader = {
  logo: '/themes/minimal/logo.svg',
  logoText: 'Sade',
  logoTexts: {
    tr: 'Sade',
    en: 'Minimal',
    de: 'Minimal',
    fr: 'Minimal'
  },
  navItems: [
    { href: '/', label: 'Ana Sayfa', labels: { tr: 'Ana Sayfa', en: 'Home', de: 'Startseite', fr: 'Accueil' } },
    { href: '/portfolio', label: 'Portfolyo', labels: { tr: 'Portfolyo', en: 'Portfolio', de: 'Portfolio', fr: 'Portfolio' } },
    { href: '/about', label: 'Hakkımda', labels: { tr: 'Hakkımda', en: 'About', de: 'Über mich', fr: 'À propos' } },
    { href: '/contact', label: 'İletişim', labels: { tr: 'İletişim', en: 'Contact', de: 'Kontakt', fr: 'Contact' } },
  ] as NavItem[],
  backgroundColor: '#fafafa',
  textColor: '#0a0a0a',
  sticky: true,
  transparent: false,
  hoverOpenMenu: false,
  animation: {
    enabled: true,
    logoAnimation: 'fadeIn',
    navAnimation: 'fadeIn',
    duration: 600,
  },
  // Minimal style - glassmorphism kapalı
  glassmorphism: {
    enabled: false,
  },
  // CTA yok - minimal tutuyoruz
  ctaButton: {
    enabled: false,
  },
  // Minimal padding
  style: {
    paddingY: 24,
    borderBottom: '1px solid #e5e5e5',
  },
};

// Geriye uyumluluk
export const headerConfig = sadeHeader;
