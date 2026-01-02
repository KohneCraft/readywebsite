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
    thumbnail: '/themes/corporate/preview.jpg',
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
    },
  },
  pages: {
    home: homePage,
  },
};

