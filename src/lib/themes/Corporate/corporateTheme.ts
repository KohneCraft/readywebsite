// ============================================
// Kurumsal Tema - Ana Tema Dosyası
// Profesyonel işletmeler için - TR/EN destekli
// ============================================

import type { ThemeData } from '@/types/theme';
import { homePage } from './pages/home';
import { aboutPage } from './pages/about';
import { servicesPage } from './pages/services';
import { portfolioPage } from './pages/portfolio';
import { contactPage } from './pages/contact';
import { kurumsalHeader } from './header';
import { kurumsalFooter } from './footer';

// Çeviriler
const translations = {
  tr: {
    siteName: 'Kurumsal',
    siteSlogan: 'Profesyonel İş Çözümleri',
    heroTitle: 'İşinizi Büyütmenin Akıllı Yolu',
    heroSubtitle: 'Stratejik danışmanlık ve teknoloji çözümleriyle işletmenizi dönüştürün.',
    heroCta: 'Ücretsiz Danışmanlık',
    heroCtaSecondary: 'Hizmetlerimiz',
    servicesTitle: 'Hizmetlerimiz',
    servicesSubtitle: 'İşletmenizin ihtiyaçlarına özel çözümler',
    aboutTitle: 'Neden Biz?',
    aboutText: '15 yılı aşkın tecrübemizle 500\'den fazla projeyi başarıyla tamamladık.',
    statsProjects: 'Tamamlanan Proje',
    statsClients: 'Mutlu Müşteri',
    statsYears: 'Yıllık Tecrübe',
    ctaTitle: 'Birlikte Çalışalım',
    ctaSubtitle: 'İşletmenizi dönüştürmek için ilk adımı atın',
    ctaButton: 'İletişime Geçin',
  },
  en: {
    siteName: 'Corporate',
    siteSlogan: 'Professional Business Solutions',
    heroTitle: 'The Smart Way to Grow Your Business',
    heroSubtitle: 'Transform your business with strategic consulting and technology solutions.',
    heroCta: 'Free Consultation',
    heroCtaSecondary: 'Our Services',
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Custom solutions for your business needs',
    aboutTitle: 'Why Us?',
    aboutText: 'With over 15 years of experience, we have successfully completed more than 500 projects.',
    statsProjects: 'Completed Projects',
    statsClients: 'Happy Clients',
    statsYears: 'Years of Experience',
    ctaTitle: 'Let\'s Work Together',
    ctaSubtitle: 'Take the first step to transform your business',
    ctaButton: 'Contact Us',
  },
};

export const corporateTheme: ThemeData = {
  metadata: {
    id: 'theme-kurumsal',
    name: 'Kurumsal İşletme',
    description: 'Profesyonel işletmeler için modern kurumsal tema - TR/EN destekli',
    version: '2.0.0',
    thumbnail: '/themes/corporate.png',
    author: 'Page Builder',
    category: 'corporate',
    pages: [
      { slug: 'home', title: 'Ana Sayfa', file: 'pages/home.json' },
      { slug: 'about', title: 'Hakkımızda', file: 'pages/about.json' },
      { slug: 'services', title: 'Hizmetler', file: 'pages/services.json' },
      { slug: 'portfolio', title: 'Referanslar', file: 'pages/portfolio.json' },
      { slug: 'contact', title: 'İletişim', file: 'pages/contact.json' },
    ],
    settings: {
      primaryColor: '#2563eb',
      secondaryColor: '#64748b',
      accentColor: '#0ea5e9',
      fontFamily: "'Inter', sans-serif",
      defaultLanguage: 'tr',
      translations: translations,
      header: kurumsalHeader,
      footer: kurumsalFooter,
      company: {
        name: 'Kurumsal',
        slogan: 'Profesyonel İş Çözümleri',
        logo: '/themes/corporate/logo.svg',
      },
      contact: {
        email: 'info@kurumsal.com',
        phone: '+90 312 456 7890',
        address: 'Çankaya, Kızılay Cad. No: 45, Ankara, Türkiye',
        mapUrl: 'https://maps.google.com/?q=39.9208,32.8541',
      },
      social: {
        facebook: 'https://facebook.com/kurumsal',
        instagram: 'https://instagram.com/kurumsal',
        twitter: 'https://twitter.com/kurumsal',
        linkedin: 'https://linkedin.com/company/kurumsal',
        youtube: '',
      },
      seo: {
        metaTitle: 'Kurumsal | Profesyonel İş Çözümleri',
        metaDescription: 'Stratejik danışmanlık, dijital dönüşüm ve kurumsal eğitim hizmetleri. 15 yılı aşkın tecrübe ile yanınızdayız.',
        metaKeywords: 'kurumsal, danışmanlık, strateji, dijital dönüşüm, eğitim',
        googleAnalyticsId: '',
      },
      animations: {
        enabled: true,
        defaultType: 'fadeIn',
        defaultDuration: 500,
        staggerDelay: 80,
      },
    },
  },
  pages: {
    home: homePage,
    about: aboutPage,
    services: servicesPage,
    portfolio: portfolioPage,
    contact: contactPage,
  },
};

// Export alias
export { corporateTheme as kurumsalTheme };
