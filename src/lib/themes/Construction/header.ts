// ============================================
// İnşaat Teması - Gelişmiş Header
// Animasyonlu, glassmorphism efektli header
// ============================================

import type { NavItem } from '@/types/theme';

export const insaatHeader = {
  logo: '/themes/construction/logo.svg',
  logoText: 'Vav İnşaat',
  // Gelişmiş navigasyon
  navItems: [
    { href: '/', label: 'Ana Sayfa' },
    {
      href: '/about',
      label: 'Hakkımızda',
      children: [
        { href: '/about#history', label: 'Tarihçemiz' },
        { href: '/about#team', label: 'Ekibimiz' },
        { href: '/about#values', label: 'Değerlerimiz' },
      ]
    },
    {
      href: '/services',
      label: 'Hizmetlerimiz',
      children: [
        { href: '/services#residential', label: 'Konut İnşaatı' },
        { href: '/services#commercial', label: 'Ticari İnşaat' },
        { href: '/services#renovation', label: 'Renovasyon' },
        { href: '/services#consulting', label: 'Danışmanlık' },
      ]
    },
    { href: '/projects', label: 'Projelerimiz' },
    { href: '/contact', label: 'İletişim' },
  ] as NavItem[],
  // Stil ayarları
  backgroundColor: '#ffffff',
  backgroundColorDark: '#0f172a',
  textColor: '#1a1a1a',
  textColorDark: '#f1f5f9',
  sticky: true,
  transparent: true, // Scroll öncesi transparan
  hoverOpenMenu: true,
  // Animasyon ayarları
  animation: {
    enabled: true,
    logoAnimation: 'fadeIn',
    navAnimation: 'slideDown',
    duration: 400,
  },
  // Glassmorphism efekt
  glassmorphism: {
    enabled: true,
    blur: 12,
    opacity: 0.85,
  },
  // CTA butonu
  ctaButton: {
    enabled: true,
    text: 'Teklif Al',
    href: '/contact',
    className: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg',
  },
  // İletişim bilgisi
  topBar: {
    enabled: true,
    phone: '+90 212 123 4567',
    email: 'info@vavinsaat.com',
    social: ['facebook', 'instagram', 'linkedin'],
  },
};

// İngilizce header
export const insaatHeaderEN = {
  ...insaatHeader,
  navItems: [
    { href: '/', label: 'Home' },
    {
      href: '/about',
      label: 'About Us',
      children: [
        { href: '/about#history', label: 'Our History' },
        { href: '/about#team', label: 'Our Team' },
        { href: '/about#values', label: 'Our Values' },
      ]
    },
    {
      href: '/services',
      label: 'Services',
      children: [
        { href: '/services#residential', label: 'Residential' },
        { href: '/services#commercial', label: 'Commercial' },
        { href: '/services#renovation', label: 'Renovation' },
        { href: '/services#consulting', label: 'Consulting' },
      ]
    },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ] as NavItem[],
  ctaButton: {
    ...insaatHeader.ctaButton,
    text: 'Get Quote',
  },
};
