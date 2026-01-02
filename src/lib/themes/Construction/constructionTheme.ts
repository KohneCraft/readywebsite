// ============================================
// Construction Theme
// Gelişmiş inşaat firma teması
// ============================================

import type { ThemeData } from '@/types/theme';
import { constructionHomePage } from './pages/home';
import { constructionAboutPage } from './pages/about';
import { constructionServicesPage } from './pages/services';
import { constructionProjectsPage } from './pages/projects';
import { constructionContactPage } from './pages/contact';
import { constructionHeader } from './header';
import { constructionFooter } from './footer';

export const constructionTheme: ThemeData = {
  metadata: {
    id: 'theme-construction',
    name: 'Construction',
    description: 'Gelişmiş inşaat firma teması - Modern, profesyonel ve kapsamlı',
    version: '1.0.0',
    thumbnail: '/themes/construction/preview.jpg',
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
        slug: 'services',
        title: 'Hizmetlerimiz',
        file: 'pages/services.json',
      },
      {
        slug: 'projects',
        title: 'Projelerimiz',
        file: 'pages/projects.json',
      },
      {
        slug: 'contact',
        title: 'İletişim',
        file: 'pages/contact.json',
      },
    ],
    settings: {
      primaryColor: '#ff6b35',
      secondaryColor: '#0a1929',
      fontFamily: 'Inter',
      header: constructionHeader,
      footer: constructionFooter,
    },
  },
  pages: {
    home: constructionHomePage,
    about: constructionAboutPage,
    services: constructionServicesPage,
    projects: constructionProjectsPage,
    contact: constructionContactPage,
  },
};

