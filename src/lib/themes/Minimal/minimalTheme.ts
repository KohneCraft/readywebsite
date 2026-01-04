// ============================================
// Minimal Theme
// Sade ve şık minimal tema
// ============================================

import type { ThemeData } from '@/types/theme';
import { homePage } from './pages/home';
import { headerConfig } from './header';
import { footerConfig } from './footer';

export const minimalTheme: ThemeData = {
  metadata: {
    id: 'theme-minimal',
    name: 'Minimal',
    description: 'Sade ve şık minimal tema',
    version: '1.0.0',
    thumbnail: '/themes/minimal/preview.jpg',
    author: 'Page Builder',
    category: 'portfolio',
    pages: [
      {
        slug: 'home',
        title: 'Ana Sayfa',
        file: 'pages/home.json',
      },
    ],
    settings: {
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      fontFamily: 'Helvetica',
      header: headerConfig,
      footer: footerConfig,
      // Company bilgileri
      company: {
        name: 'Minimal',
        slogan: 'Sade ve Şık',
        logo: headerConfig.logo || '',
      },
      // İletişim bilgileri
      contact: {
        email: 'info@minimal.com',
        phone: '+90 212 123 4567',
        address: 'İstanbul, Türkiye',
        mapUrl: '',
      },
      // Sosyal medya
      social: {
        facebook: '',
        instagram: 'https://instagram.com/minimal',
        twitter: '',
        linkedin: '',
        youtube: '',
      },
      // SEO
      seo: {
        metaTitle: 'Minimal | Sade ve Şık Tasarım',
        metaDescription: 'Sade ve şık tasarım çözümleri. Minimalist yaklaşım ile modern web siteleri.',
        metaKeywords: 'minimal, tasarım, sade, şık',
        googleAnalyticsId: '',
      },
    },
  },
  pages: {
    home: homePage,
  },
};

