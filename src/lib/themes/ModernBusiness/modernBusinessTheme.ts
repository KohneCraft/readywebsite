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
    thumbnail: '/themes/modern/preview.jpg',
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
    },
  },
  pages: {
    home: homePage,
    about: aboutPage,
    contact: contactPage,
  },
};

