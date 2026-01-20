// ============================================
// Sade Tema - Ana Tema Dosyası  
// Minimalist portfolyo teması - TR/EN destekli
// ============================================

import type { ThemeData } from '@/types/theme';
import { homePage } from './pages/home';
import { sadeHeader } from './header';
import { sadeFooter } from './footer';

// Çeviriler
const translations = {
  tr: {
    siteName: 'Sade',
    siteSlogan: 'Az, Çoktur',
    heroTitle: 'Minimalizmin Gücü',
    heroSubtitle: 'Sade tasarım, güçlü etki. Gereksiz karmaşıklıktan arındırılmış çözümler.',
    heroCta: 'Portfolyo',
    heroCtaSecondary: 'Hakkımda',
    aboutTitle: 'Hakkımda',
    aboutText: 'Minimalist tasarım felsefesi ile markalar için etkili görsel kimlikler oluşturuyorum.',
    servicesTitle: 'Uzmanlık Alanları',
    servicesSubtitle: 'Odaklanmış ve etkili çözümler',
    portfolioTitle: 'Seçilmiş İşler',
    portfolioSubtitle: 'En son projelerimden örnekler',
    ctaTitle: 'Birlikte Çalışalım',
    ctaSubtitle: 'Projeniz için iletişime geçin',
    ctaButton: 'İletişim',
  },
  en: {
    siteName: 'Minimal',
    siteSlogan: 'Less is More',
    heroTitle: 'The Power of Minimalism',
    heroSubtitle: 'Simple design, powerful impact. Solutions free from unnecessary complexity.',
    heroCta: 'Portfolio',
    heroCtaSecondary: 'About Me',
    aboutTitle: 'About Me',
    aboutText: 'I create effective visual identities for brands with a minimalist design philosophy.',
    servicesTitle: 'Expertise',
    servicesSubtitle: 'Focused and effective solutions',
    portfolioTitle: 'Selected Works',
    portfolioSubtitle: 'Examples from my latest projects',
    ctaTitle: 'Let\'s Work Together',
    ctaSubtitle: 'Get in touch for your project',
    ctaButton: 'Contact',
  },
};

export const minimalTheme: ThemeData = {
  metadata: {
    id: 'theme-sade',
    name: 'Sade Tasarım',
    description: 'Minimalist ve şık portfolyo teması - TR/EN destekli',
    version: '2.0.0',
    thumbnail: '/themes/minimal.png',
    author: 'Page Builder',
    category: 'portfolio',
    pages: [
      { slug: 'home', title: 'Ana Sayfa', file: 'pages/home.json' },
      { slug: 'portfolio', title: 'Portfolyo', file: 'pages/portfolio.json' },
      { slug: 'about', title: 'Hakkımda', file: 'pages/about.json' },
      { slug: 'contact', title: 'İletişim', file: 'pages/contact.json' },
    ],
    settings: {
      primaryColor: '#0a0a0a',
      secondaryColor: '#fafafa',
      accentColor: '#525252',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      defaultLanguage: 'tr',
      translations: translations,
      header: sadeHeader,
      footer: sadeFooter,
      company: {
        name: 'Sade',
        slogan: 'Az, Çoktur',
        logo: '/themes/minimal/logo.svg',
      },
      contact: {
        email: 'merhaba@sade.design',
        phone: '+90 212 123 4567',
        address: 'Beyoğlu, İstanbul',
        mapUrl: '',
      },
      social: {
        instagram: 'https://instagram.com/sade.design',
        twitter: 'https://twitter.com/sadedesign',
        linkedin: 'https://linkedin.com/in/sadedesign',
      },
      seo: {
        metaTitle: 'Sade | Minimalist Tasarım Stüdyosu',
        metaDescription: 'Minimalist tasarım felsefesi ile markalar için etkili görsel kimlikler. Sade, güçlü, etkileyici.',
        metaKeywords: 'minimal, tasarım, portfolyo, marka, kimlik',
        googleAnalyticsId: '',
      },
      animations: {
        enabled: true,
        defaultType: 'fadeIn',
        defaultDuration: 800,
        staggerDelay: 150,
      },
    },
  },
  pages: {
    home: homePage,
  },
};

// Export alias
export { minimalTheme as sadeTheme };
