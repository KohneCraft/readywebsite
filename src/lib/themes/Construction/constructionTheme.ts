// ============================================
// İnşaat Teması - Ana Tema Dosyası
// Gelişmiş inşaat firma teması - TR/EN destekli
// ============================================

import type { ThemeData } from '@/types/theme';
import { constructionHomePage } from './pages/home';
import { constructionAboutPage } from './pages/about';
import { constructionServicesPage } from './pages/services';
import { constructionProjectsPage } from './pages/projects';
import { constructionContactPage } from './pages/contact';
import { insaatHeader } from './header';
import { insaatFooter } from './footer';

// Çeviriler
const translations = {
  tr: {
    // Genel
    siteName: 'Vav İnşaat',
    siteSlogan: 'Güvenilir İnşaat Çözümleri',
    // Hero
    heroTitle: 'Güvenilir İnşaat Çözümleri',
    heroSubtitle: '20 yılı aşkın tecrübemizle, hayalinizdeki projeleri gerçeğe dönüştürüyoruz.',
    heroCta: 'Projelerimizi İnceleyin',
    heroCtaSecondary: 'İletişime Geçin',
    // İstatistikler
    statsProjects: 'Tamamlanan Proje',
    statsYears: 'Yıllık Tecrübe',
    statsClients: 'Mutlu Müşteri',
    statsTeam: 'Uzman Ekip',
    // Hizmetler
    servicesTitle: 'Hizmetlerimiz',
    servicesSubtitle: 'Geniş hizmet yelpazemiz ile inşaat ihtiyaçlarınızı karşılıyoruz',
    serviceResidential: 'Konut İnşaatı',
    serviceCommercial: 'Ticari İnşaat',
    serviceRenovation: 'Renovasyon & Tadilat',
    serviceIndustrial: 'Endüstriyel Yapılar',
    // Hakkımızda
    aboutTitle: 'Hakkımızda',
    aboutText: 'Vav İnşaat olarak 2003 yılından bu yana inşaat sektöründe faaliyet gösteriyoruz.',
    // Projeler
    projectsTitle: 'Son Projelerimiz',
    projectsSubtitle: 'Tamamladığımız başarılı projelerden örnekler',
    projectsViewAll: 'Tüm Projeleri Görüntüle',
    // Referanslar
    testimonialsTitle: 'Müşteri Yorumları',
    testimonialsSubtitle: 'Müşterilerimizin bizimle çalışma deneyimleri',
    // CTA
    ctaTitle: 'Projeniz İçin Ücretsiz Keşif',
    ctaSubtitle: 'Uzman ekibimiz ile projenizi değerlendirelim',
    ctaButton: 'Hemen Teklif Alın',
    // Footer
    footerDesc: 'Güvenilir, kaliteli ve modern inşaat çözümleri.',
    footerQuickLinks: 'Hızlı Linkler',
    footerServices: 'Hizmetlerimiz',
    footerContact: 'İletişim',
    footerNewsletter: 'Bültenimize Abone Olun',
    footerCopyright: '© 2026 Vav İnşaat. Tüm hakları saklıdır.',
  },
  en: {
    // General
    siteName: 'Vav Construction',
    siteSlogan: 'Reliable Construction Solutions',
    // Hero
    heroTitle: 'Reliable Construction Solutions',
    heroSubtitle: 'With over 20 years of experience, we turn your dream projects into reality.',
    heroCta: 'View Our Projects',
    heroCtaSecondary: 'Contact Us',
    // Statistics
    statsProjects: 'Completed Projects',
    statsYears: 'Years of Experience',
    statsClients: 'Happy Clients',
    statsTeam: 'Expert Team',
    // Services
    servicesTitle: 'Our Services',
    servicesSubtitle: 'We meet your construction needs with our wide range of services',
    serviceResidential: 'Residential Construction',
    serviceCommercial: 'Commercial Construction',
    serviceRenovation: 'Renovation & Remodeling',
    serviceIndustrial: 'Industrial Buildings',
    // About
    aboutTitle: 'About Us',
    aboutText: 'Vav Construction has been operating in the construction sector since 2003.',
    // Projects
    projectsTitle: 'Our Recent Projects',
    projectsSubtitle: 'Examples of our successfully completed projects',
    projectsViewAll: 'View All Projects',
    // Testimonials
    testimonialsTitle: 'Customer Reviews',
    testimonialsSubtitle: 'Our clients\' experiences working with us',
    // CTA
    ctaTitle: 'Free Site Survey for Your Project',
    ctaSubtitle: 'Let our expert team evaluate your project',
    ctaButton: 'Get a Quote Now',
    // Footer
    footerDesc: 'Reliable, quality, and modern construction solutions.',
    footerQuickLinks: 'Quick Links',
    footerServices: 'Our Services',
    footerContact: 'Contact',
    footerNewsletter: 'Subscribe to Our Newsletter',
    footerCopyright: '© 2026 Vav Construction. All rights reserved.',
  },
};

export const constructionTheme: ThemeData = {
  metadata: {
    id: 'theme-insaat',
    name: 'İnşaat Firması',
    description: 'Gelişmiş inşaat firma teması - Modern, profesyonel ve kapsamlı, TR/EN destekli',
    version: '2.0.0',
    thumbnail: '/themes/construction/preview.jpg',
    author: 'Page Builder',
    category: 'construction',
    pages: [
      { slug: 'home', title: 'Ana Sayfa', file: 'pages/home.json' },
      { slug: 'about', title: 'Hakkımızda', file: 'pages/about.json' },
      { slug: 'services', title: 'Hizmetlerimiz', file: 'pages/services.json' },
      { slug: 'projects', title: 'Projelerimiz', file: 'pages/projects.json' },
      { slug: 'contact', title: 'İletişim', file: 'pages/contact.json' },
    ],
    settings: {
      primaryColor: '#f97316', // Orange-500
      secondaryColor: '#0f172a', // Slate-900
      accentColor: '#ef4444', // Red-500
      fontFamily: "'Inter', sans-serif",
      // Default language
      defaultLanguage: 'tr',
      translations: translations,
      // Header/Footer
      header: insaatHeader,
      footer: insaatFooter,
      // Firma bilgileri
      company: {
        name: 'Vav İnşaat',
        slogan: 'Güvenilir İnşaat Çözümleri',
        logo: '/themes/construction/logo.svg',
      },
      // İletişim bilgileri
      contact: {
        email: 'info@vavinsaat.com',
        phone: '+90 212 123 4567',
        address: 'Levent, Büyükdere Cad. No: 123, İstanbul, Türkiye',
        mapUrl: 'https://maps.google.com/?q=41.0827,29.0127',
      },
      // Sosyal medya
      social: {
        facebook: 'https://facebook.com/vavinsaat',
        instagram: 'https://instagram.com/vavinsaat',
        twitter: 'https://twitter.com/vavinsaat',
        linkedin: 'https://linkedin.com/company/vavinsaat',
        youtube: 'https://youtube.com/@vavinsaat',
      },
      // SEO
      seo: {
        metaTitle: 'Vav İnşaat | Güvenilir İnşaat Çözümleri',
        metaDescription: '20 yılı aşkın tecrübesiyle konut, ticari ve endüstriyel inşaat projeleri. Kaliteli malzeme, uzman ekip ve zamanında teslimat garantisi.',
        metaKeywords: 'inşaat, müteahhitlik, konut inşaatı, ticari inşaat, renovasyon, İstanbul',
        googleAnalyticsId: '',
      },
      // Animasyon ayarları
      animations: {
        enabled: true,
        defaultType: 'fadeIn',
        defaultDuration: 600,
        staggerDelay: 100,
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

// Eski export (geriye uyumluluk için)
export { constructionTheme as insaatTheme };
