// ============================================
// Corporate Theme
// Kurumsal işletmeler için profesyonel tema
// ============================================

import type { ThemeData } from '@/types/theme';
import { homePage } from './pages/home';
import { headerConfig } from './header';
import { footerConfig } from './footer';

export const corporateTheme: ThemeData = {
  metadata: {
    id: 'theme-corporate',
    name: 'Corporate',
    description: 'Kurumsal işletmeler için profesyonel tema',
    version: '1.0.0',
    thumbnail: '/themes/corporate.png',
    author: 'Page Builder',
    category: 'corporate',
    pages: [
      {
        slug: 'home',
        title: 'Ana Sayfa',
        file: 'pages/home.json',
      },
    ],
    settings: {
      primaryColor: '#1e40af',
      secondaryColor: '#64748b',
      fontFamily: 'Roboto',
      header: headerConfig,
      footer: footerConfig,
      // Company bilgileri
      company: {
        name: 'Corporate',
        slogan: 'Profesyonel Kurumsal Çözümler',
        logo: headerConfig.logo || '',
      },
      // İletişim bilgileri
      contact: {
        email: 'info@corporate.com',
        phone: '+90 212 123 4567',
        address: 'Ankara, Türkiye',
        mapUrl: '',
      },
      // Sosyal medya
      social: {
        facebook: 'https://facebook.com/corporate',
        instagram: 'https://instagram.com/corporate',
        twitter: 'https://twitter.com/corporate',
        linkedin: 'https://linkedin.com/company/corporate',
        youtube: '',
      },
      // SEO
      seo: {
        metaTitle: 'Corporate | Kurumsal Çözümler',
        metaDescription: 'Profesyonel kurumsal çözümler ve danışmanlık hizmetleri. Güvenilir iş ortağınız.',
        metaKeywords: 'kurumsal, çözüm, danışmanlık, profesyonel',
        googleAnalyticsId: '',
      },
    },
  },
  pages: {
    home: homePage,
  },
};

