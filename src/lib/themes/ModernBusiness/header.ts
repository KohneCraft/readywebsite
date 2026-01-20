// ============================================
// Modern İş Teması - Header
// Gradient efektli modern navigasyon
// ============================================

import type { NavItem } from '@/types/theme';

export const modernIsHeader = {
  logo: '/themes/modern-business/logo.svg',
  logoText: 'Modern İş',
  navItems: [
    { href: '/', label: 'Ana Sayfa' },
    {
      href: '/services',
      label: 'Çözümler',
      children: [
        { href: '/services#saas', label: 'SaaS Platform' },
        { href: '/services#cloud', label: 'Bulut Hizmetleri' },
        { href: '/services#automation', label: 'Otomasyon' },
        { href: '/services#analytics', label: 'Analitik' },
      ]
    },
    { href: '/pricing', label: 'Fiyatlandırma' },
    { href: '/about', label: 'Hakkımızda' },
    { href: '/contact', label: 'İletişim' },
  ] as NavItem[],
  backgroundColor: '#ffffff',
  textColor: '#1e1b4b',
  sticky: true,
  transparent: true,
  hoverOpenMenu: true,
  animation: {
    enabled: true,
    logoAnimation: 'slideDown',
    navAnimation: 'fadeIn',
    duration: 400,
  },
  glassmorphism: {
    enabled: true,
    blur: 16,
    opacity: 0.9,
  },
  ctaButton: {
    enabled: true,
    text: 'Ücretsiz Dene',
    href: '/signup',
    className: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl',
  },
  // Login butonu
  secondaryButton: {
    enabled: true,
    text: 'Giriş Yap',
    href: '/login',
    className: 'text-indigo-600 hover:text-indigo-800 font-medium transition-colors',
  },
};

export const modernIsHeaderEN = {
  ...modernIsHeader,
  logoText: 'Modern Business',
  navItems: [
    { href: '/', label: 'Home' },
    {
      href: '/services',
      label: 'Solutions',
      children: [
        { href: '/services#saas', label: 'SaaS Platform' },
        { href: '/services#cloud', label: 'Cloud Services' },
        { href: '/services#automation', label: 'Automation' },
        { href: '/services#analytics', label: 'Analytics' },
      ]
    },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ] as NavItem[],
  ctaButton: {
    ...modernIsHeader.ctaButton,
    text: 'Try Free',
  },
  secondaryButton: {
    ...modernIsHeader.secondaryButton,
    text: 'Sign In',
  },
};

// Geriye uyumluluk
export const headerConfig = modernIsHeader;
