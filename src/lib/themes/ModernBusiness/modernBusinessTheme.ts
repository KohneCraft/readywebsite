// ============================================
// Modern Business Theme
// Modern ve minimal iş web sitesi teması
// ============================================

import type { ThemeData } from '@/types/theme';
import { homePage } from './pages/home';
import { aboutPage } from './pages/about';
import { contactPage } from './pages/contact';
import { headerConfig } from './header';
import { footerConfig } from './footer';

export const modernBusinessTheme: ThemeData = {
  metadata: {
    id: 'theme-modern',
    name: 'Modern Business',
    description: 'Modern ve minimal iş web sitesi teması',
    version: '1.0.0',
    thumbnail: '/themes/modern-business.png',
    author: 'Page Builder',
    category: 'business',
    pages: [
      {
        slug: 'home',
        title: 'Ana Sayfa',
        file: 'pages/home.json',
      },
      {
        slug: 'about',
        title: 'Hakkımızda',
        file: 'pages/about.json',
      },
      {
        slug: 'contact',
        title: 'İletişim',
        file: 'pages/contact.json',
      },
    ],
    settings: {
      primaryColor: '#007bff',
      secondaryColor: '#6c757d',
      fontFamily: 'Inter',
      header: headerConfig,
      footer: footerConfig,
      // Company bilgileri
      company: {
        name: 'Modern Business',
        slogan: 'İşinizi Büyütün',
        logo: headerConfig.logo || '',
      },
      // İletişim bilgileri
      contact: {
        email: 'info@modernbusiness.com',
        phone: '+90 212 123 4567',
        address: 'İstanbul, Türkiye',
        mapUrl: '',
      },
      // Sosyal medya
      social: {
        facebook: 'https://facebook.com/modernbusiness',
        instagram: 'https://instagram.com/modernbusiness',
        twitter: '',
        linkedin: 'https://linkedin.com/company/modernbusiness',
        youtube: '',
      },
      // SEO
      seo: {
        metaTitle: 'Modern Business | İş Çözümleri',
        metaDescription: 'Modern iş çözümleri ile işinizi büyütün. Profesyonel hizmetler ve danışmanlık.',
        metaKeywords: 'iş, çözüm, danışmanlık, profesyonel',
        googleAnalyticsId: '',
      },
    },
  },
  pages: {
    home: homePage,
    about: aboutPage,
    contact: contactPage,
  },
};

