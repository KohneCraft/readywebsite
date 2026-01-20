// ============================================
// Kurumsal Tema - Gelişmiş Header
// Profesyonel ve modern görünüm
// ============================================

import type { NavItem } from '@/types/theme';

export const kurumsalHeader = {
  logo: '/themes/corporate/logo.svg',
  logoText: 'Kurumsal',
  navItems: [
    { href: '/', label: 'Ana Sayfa' },
    {
      href: '/about',
      label: 'Kurumsal',
      children: [
        { href: '/about#vision', label: 'Vizyon & Misyon' },
        { href: '/about#team', label: 'Yönetim Ekibi' },
        { href: '/about#history', label: 'Tarihçe' },
      ]
    },
    {
      href: '/services',
      label: 'Hizmetler',
      children: [
        { href: '/services#consulting', label: 'Danışmanlık' },
        { href: '/services#strategy', label: 'Strateji' },
        { href: '/services#technology', label: 'Teknoloji' },
      ]
    },
    { href: '/portfolio', label: 'Referanslar' },
    { href: '/contact', label: 'İletişim' },
  ] as NavItem[],
  backgroundColor: '#ffffff',
  textColor: '#0f172a',
  sticky: true,
  transparent: false,
  hoverOpenMenu: true,
  animation: {
    enabled: true,
    logoAnimation: 'fadeIn',
    navAnimation: 'slideDown',
    duration: 400,
  },
  glassmorphism: {
    enabled: true,
    blur: 10,
    opacity: 0.95,
  },
  ctaButton: {
    enabled: true,
    text: 'Görüşme Talep Et',
    href: '/contact',
    className: 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg',
  },
};

// English header
export const kurumsalHeaderEN = {
  ...kurumsalHeader,
  logoText: 'Corporate',
  navItems: [
    { href: '/', label: 'Home' },
    {
      href: '/about',
      label: 'About',
      children: [
        { href: '/about#vision', label: 'Vision & Mission' },
        { href: '/about#team', label: 'Management Team' },
        { href: '/about#history', label: 'History' },
      ]
    },
    {
      href: '/services',
      label: 'Services',
      children: [
        { href: '/services#consulting', label: 'Consulting' },
        { href: '/services#strategy', label: 'Strategy' },
        { href: '/services#technology', label: 'Technology' },
      ]
    },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
  ] as NavItem[],
  ctaButton: {
    ...kurumsalHeader.ctaButton,
    text: 'Schedule a Meeting',
  },
};

// Geriye uyumluluk
export const headerConfig = kurumsalHeader;
