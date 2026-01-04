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
      // Company bilgileri
      company: {
        name: 'Vav İnşaat',
        slogan: 'Güvenilir İnşaat Çözümleri',
        logo: '/themes/construction/logo.svg',
      },
      // İletişim bilgileri
      contact: {
        email: 'info@vavinsaat.com',
        phone: '+90 212 123 4567',
        address: 'Levent, İstanbul, Türkiye',
        mapUrl: '',
      },
      // Sosyal medya
      social: {
        facebook: 'https://facebook.com/vavinsaat',
        instagram: 'https://instagram.com/vavinsaat',
        twitter: '',
        linkedin: 'https://linkedin.com/company/vavinsaat',
        youtube: 'https://youtube.com/@vavinsaat',
      },
      // SEO
      seo: {
        metaTitle: 'Vav İnşaat | İnşaat ve Müteahhitlik',
        metaDescription: 'Güvenilir ve kaliteli inşaat hizmetleri. Konut, ticari ve endüstriyel projeleriniz için profesyonel çözümler.',
        metaKeywords: 'inşaat, müteahhitlik, konut, ticari, endüstriyel',
        googleAnalyticsId: '',
      },
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

