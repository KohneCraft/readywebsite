// ============================================
// İnşaat Teması - Gelişmiş Header
// Animasyonlu, glassmorphism efektli header
// Çoklu dil desteği ile
// ============================================

import type { NavItem } from '@/types/theme';

export const insaatHeader = {
  logo: '/themes/construction/logo.svg',
  logoText: 'Vav İnşaat',
  logoTexts: {
    tr: 'Vav İnşaat',
    en: 'Vav Construction',
    de: 'Vav Bau',
    fr: 'Vav Construction'
  },
  // Gelişmiş navigasyon - Çoklu dil destekli
  navItems: [
    { 
      href: '/', 
      label: 'Ana Sayfa',
      labels: { tr: 'Ana Sayfa', en: 'Home', de: 'Startseite', fr: 'Accueil' }
    },
    {
      href: '/about',
      label: 'Hakkımızda',
      labels: { tr: 'Hakkımızda', en: 'About Us', de: 'Über uns', fr: 'À propos' },
      children: [
        { href: '/about#history', label: 'Tarihçemiz', labels: { tr: 'Tarihçemiz', en: 'Our History', de: 'Unsere Geschichte', fr: 'Notre histoire' } },
        { href: '/about#team', label: 'Ekibimiz', labels: { tr: 'Ekibimiz', en: 'Our Team', de: 'Unser Team', fr: 'Notre équipe' } },
        { href: '/about#values', label: 'Değerlerimiz', labels: { tr: 'Değerlerimiz', en: 'Our Values', de: 'Unsere Werte', fr: 'Nos valeurs' } },
      ]
    },
    {
      href: '/services',
      label: 'Hizmetlerimiz',
      labels: { tr: 'Hizmetlerimiz', en: 'Services', de: 'Dienstleistungen', fr: 'Services' },
      children: [
        { href: '/services#residential', label: 'Konut İnşaatı', labels: { tr: 'Konut İnşaatı', en: 'Residential', de: 'Wohnungsbau', fr: 'Résidentiel' } },
        { href: '/services#commercial', label: 'Ticari İnşaat', labels: { tr: 'Ticari İnşaat', en: 'Commercial', de: 'Gewerbebau', fr: 'Commercial' } },
        { href: '/services#renovation', label: 'Renovasyon', labels: { tr: 'Renovasyon', en: 'Renovation', de: 'Renovierung', fr: 'Rénovation' } },
        { href: '/services#consulting', label: 'Danışmanlık', labels: { tr: 'Danışmanlık', en: 'Consulting', de: 'Beratung', fr: 'Conseil' } },
      ]
    },
    { 
      href: '/projects', 
      label: 'Projelerimiz',
      labels: { tr: 'Projelerimiz', en: 'Projects', de: 'Projekte', fr: 'Projets' }
    },
    { 
      href: '/contact', 
      label: 'İletişim',
      labels: { tr: 'İletişim', en: 'Contact', de: 'Kontakt', fr: 'Contact' }
    },
  ] as NavItem[],
  // Stil ayarları
  backgroundColor: '#ffffff',
  backgroundColorDark: '#0f172a',
  textColor: '#1a1a1a',
  textColorDark: '#f1f5f9',
  sticky: true,
  transparent: false, // Şeffaf header kapalı
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
  // CTA butonu - çoklu dil desteği
  ctaButton: {
    enabled: true,
    text: 'Teklif Al',
    texts: { tr: 'Teklif Al', en: 'Get Quote', de: 'Angebot anfordern', fr: 'Demander un devis' },
    href: '/contact',
    className: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg',
  },
  // İletişim bilgisi
  topBar: {
    enabled: true,
    phone: '+90 212 123 4567',
    email: 'info@vavinsaat.com',
    social: ['facebook', 'instagram', 'linkedin'],
  },
};
