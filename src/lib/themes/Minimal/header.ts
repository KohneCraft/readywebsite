// ============================================
// Sade Tema - Header
// Minimalist navigasyon
// ============================================

import type { NavItem } from '@/types/theme';

export const sadeHeader = {
  logo: '/themes/minimal/logo.svg',
  logoText: 'Sade',
  navItems: [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/portfolio', label: 'Portfolyo' },
    { href: '/about', label: 'Hakkımda' },
    { href: '/contact', label: 'İletişim' },
  ] as NavItem[],
  backgroundColor: '#fafafa',
  textColor: '#0a0a0a',
  sticky: true,
  transparent: true,
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

export const sadeHeaderEN = {
  ...sadeHeader,
  navItems: [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ] as NavItem[],
};

// Geriye uyumluluk
export const headerConfig = sadeHeader;
