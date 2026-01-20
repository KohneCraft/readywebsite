// ============================================
// Modern İş Teması - Ana Tema Dosyası
// Dinamik ve modern iş web sitesi - TR/EN destekli
// ============================================

import type { ThemeData } from '@/types/theme';
import { homePage } from './pages/home';
import { aboutPage } from './pages/about';
import { contactPage } from './pages/contact';
import { servicesPage } from './pages/services';
import { pricingPage } from './pages/pricing';
import { modernIsHeader } from './header';
import { modernIsFooter } from './footer';

// Çeviriler
const translations = {
  tr: {
    siteName: 'Modern İş',
    siteSlogan: 'Geleceğin İş Modeli',
    heroTitle: 'Dijital Dünyada Öne Çıkın',
    heroSubtitle: 'Yenilikçi çözümlerle işinizi dijital çağa taşıyoruz. Hız, verimlilik, başarı.',
    heroCta: 'Hemen Başla',
    heroCtaSecondary: 'Demo İzle',
    featuresTitle: 'Özellikler',
    featuresSubtitle: 'İşinizi güçlendiren araçlar',
    aboutTitle: 'Vizyonumuz',
    aboutText: 'İşletmelerin dijital dönüşümüne öncülük ediyoruz.',
    statsProjects: 'Proje',
    statsClients: 'Müşteri',
    statsCountries: 'Ülke',
    testimonialsTitle: 'Müşteri Yorumları',
    testimonialsSubtitle: 'Müşterilerimiz ne diyor?',
    ctaTitle: 'Hazır mısınız?',
    ctaSubtitle: 'Dijital dönüşüme bugün başlayın',
    ctaButton: 'Ücretsiz Deneme',
    pricingTitle: 'Fiyatlandırma',
    pricingSubtitle: 'İhtiyacınıza uygun plan seçin',
  },
  en: {
    siteName: 'Modern Business',
    siteSlogan: 'The Business Model of Tomorrow',
    heroTitle: 'Stand Out in the Digital World',
    heroSubtitle: 'We bring your business to the digital age with innovative solutions. Speed, efficiency, success.',
    heroCta: 'Get Started',
    heroCtaSecondary: 'Watch Demo',
    featuresTitle: 'Features',
    featuresSubtitle: 'Tools that empower your business',
    aboutTitle: 'Our Vision',
    aboutText: 'We lead the digital transformation of businesses.',
    statsProjects: 'Projects',
    statsClients: 'Clients',
    statsCountries: 'Countries',
    testimonialsTitle: 'Testimonials',
    testimonialsSubtitle: 'What our clients say?',
    ctaTitle: 'Ready?',
    ctaSubtitle: 'Start your digital transformation today',
    ctaButton: 'Free Trial',
    pricingTitle: 'Pricing',
    pricingSubtitle: 'Choose the plan that fits your needs',
  },
};

export const modernBusinessTheme: ThemeData = {
  metadata: {
    id: 'theme-modern-is',
    name: 'Modern İş',
    description: 'Dinamik ve modern iş web sitesi teması - TR/EN destekli',
    version: '2.0.0',
    thumbnail: '/themes/modern-business.png',
    author: 'Page Builder',
    category: 'business',
    pages: [
      { slug: 'home', title: 'Ana Sayfa', file: 'pages/home.json' },
      { slug: 'about', title: 'Hakkımızda', file: 'pages/about.json' },
      { slug: 'services', title: 'Hizmetler', file: 'pages/services.json' },
      { slug: 'pricing', title: 'Fiyatlandırma', file: 'pages/pricing.json' },
      { slug: 'contact', title: 'İletişim', file: 'pages/contact.json' },
    ],
    settings: {
      primaryColor: '#6366f1', // Indigo
      secondaryColor: '#8b5cf6', // Violet
      accentColor: '#ec4899', // Pink
      fontFamily: "'Inter', sans-serif",
      defaultLanguage: 'tr',
      translations: translations,
      header: modernIsHeader,
      footer: modernIsFooter,
      company: {
        name: 'Modern İş',
        slogan: 'Geleceğin İş Modeli',
        logo: '/themes/modern-business/logo.svg',
      },
      contact: {
        email: 'info@modernis.com',
        phone: '+90 216 789 0123',
        address: 'Maslak, İstanbul',
        mapUrl: 'https://maps.google.com/?q=41.1086,29.0205',
      },
      social: {
        facebook: 'https://facebook.com/modernis',
        instagram: 'https://instagram.com/modernis',
        twitter: 'https://twitter.com/modernis',
        linkedin: 'https://linkedin.com/company/modernis',
        youtube: 'https://youtube.com/@modernis',
      },
      seo: {
        metaTitle: 'Modern İş | Dijital Dönüşüm Çözümleri',
        metaDescription: 'Yenilikçi dijital çözümlerle işinizi geleceğe taşıyın. SaaS, bulut ve otomasyon hizmetleri.',
        metaKeywords: 'dijital dönüşüm, SaaS, bulut, otomasyon, iş çözümleri',
        googleAnalyticsId: '',
      },
      animations: {
        enabled: true,
        defaultType: 'slideUp',
        defaultDuration: 500,
        staggerDelay: 100,
      },
      // Gradient tema özelliği
      gradients: {
        hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        cta: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        card: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
    },
  },
  pages: {
    home: homePage,
    about: aboutPage,
    services: servicesPage,
    pricing: pricingPage,
    contact: contactPage,
  },
};

// Export alias
export { modernBusinessTheme as modernIsTheme };
