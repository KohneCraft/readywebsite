// ============================================
// Sade Tema - Ana Tema Dosyası  
// Minimalist portfolyo teması - TR/EN destekli
// ============================================

import type { ThemeData } from '@/types/theme';
import { homePage } from './pages/home';
import { portfolioPage } from './pages/portfolio';
import { aboutPage } from './pages/about';
import { contactPage } from './pages/contact';
import { sadeHeader } from './header';
import { sadeFooter } from './footer';

// Çeviriler
const translations = {
  tr: {
    siteName: 'Sade',
    siteSlogan: 'Az, Çoktur',
    // Navbar
    nav: {
      home: 'Ana Sayfa',
      portfolio: 'Portfolyo',
      about: 'Hakkımda',
      contact: 'İletişim',
      works: 'İşler',
      services: 'Hizmetler',
    },
    // Hero
    heroTitle: 'Minimalizmin Gücü',
    heroSubtitle: 'Sade tasarım, güçlü etki. Gereksiz karmaşıklıktan arındırılmış çözümler.',
    heroCta: 'Portfolyo',
    heroCtaSecondary: 'Hakkımda',
    // Hakkımda
    aboutTitle: 'Hakkımda',
    aboutText: 'Minimalist tasarım felsefesi ile markalar için etkili görsel kimlikler oluşturuyorum.',
    aboutPageTitle: 'Hakkımda',
    myPhilosophy: 'Felsefem',
    myApproach: 'Yaklaşımım',
    experience: 'Deneyim',
    skills: 'Yetenekler',
    // Hizmetler
    servicesTitle: 'Uzmanlık Alanları',
    servicesSubtitle: 'Odaklanmış ve etkili çözümler',
    serviceBranding: 'Marka Kimliği',
    serviceBrandingDesc: 'Markanız için minimal ve etkili görsel kimlik tasarımı.',
    serviceWebDesign: 'Web Tasarımı',
    serviceWebDesignDesc: 'Sade ve kullanıcı odaklı web sitesi tasarımı.',
    servicePrint: 'Baskı Tasarımı',
    servicePrintDesc: 'Kartvizit, broşür ve diğer baskı materyalleri.',
    // Portfolyo
    portfolioTitle: 'Seçilmiş İşler',
    portfolioSubtitle: 'En son projelerimden örnekler',
    portfolioPageTitle: 'Portfolyo',
    viewProject: 'Projeyi Görüntüle',
    allProjects: 'Tüm Projeler',
    projectDetails: 'Proje Detayları',
    projectClient: 'Müşteri',
    projectYear: 'Yıl',
    projectCategory: 'Kategori',
    // CTA
    ctaTitle: 'Birlikte Çalışalım',
    ctaSubtitle: 'Projeniz için iletişime geçin',
    ctaButton: 'İletişim',
    // İletişim
    contactPageTitle: 'İletişim',
    contactName: 'Adınız',
    contactEmail: 'E-posta',
    contactSubject: 'Konu',
    contactMessage: 'Mesajınız',
    contactSubmit: 'Gönder',
    // Footer
    footer: {
      description: 'Minimalist tasarım felsefesi.',
      quickLinks: 'Linkler',
      contact: 'İletişim',
      home: 'Ana Sayfa',
      portfolio: 'Portfolyo',
      about: 'Hakkımda',
      copyright: '© 2026 Sade. Tüm hakları saklıdır.',
      privacyPolicy: 'Gizlilik',
      termsOfUse: 'Şartlar',
    },
  },
  en: {
    siteName: 'Minimal',
    siteSlogan: 'Less is More',
    // Navbar
    nav: {
      home: 'Home',
      portfolio: 'Portfolio',
      about: 'About',
      contact: 'Contact',
      works: 'Works',
      services: 'Services',
    },
    // Hero
    heroTitle: 'The Power of Minimalism',
    heroSubtitle: 'Simple design, powerful impact. Solutions free from unnecessary complexity.',
    heroCta: 'Portfolio',
    heroCtaSecondary: 'About Me',
    // About
    aboutTitle: 'About Me',
    aboutText: 'I create effective visual identities for brands with a minimalist design philosophy.',
    aboutPageTitle: 'About Me',
    myPhilosophy: 'My Philosophy',
    myApproach: 'My Approach',
    experience: 'Experience',
    skills: 'Skills',
    // Services
    servicesTitle: 'Expertise',
    servicesSubtitle: 'Focused and effective solutions',
    serviceBranding: 'Brand Identity',
    serviceBrandingDesc: 'Minimal and effective visual identity design for your brand.',
    serviceWebDesign: 'Web Design',
    serviceWebDesignDesc: 'Simple and user-focused website design.',
    servicePrint: 'Print Design',
    servicePrintDesc: 'Business cards, brochures and other print materials.',
    // Portfolio
    portfolioTitle: 'Selected Works',
    portfolioSubtitle: 'Examples from my latest projects',
    portfolioPageTitle: 'Portfolio',
    viewProject: 'View Project',
    allProjects: 'All Projects',
    projectDetails: 'Project Details',
    projectClient: 'Client',
    projectYear: 'Year',
    projectCategory: 'Category',
    // CTA
    ctaTitle: "Let's Work Together",
    ctaSubtitle: 'Get in touch for your project',
    ctaButton: 'Contact',
    // Contact
    contactPageTitle: 'Contact',
    contactName: 'Your Name',
    contactEmail: 'Email',
    contactSubject: 'Subject',
    contactMessage: 'Your Message',
    contactSubmit: 'Submit',
    // Footer
    footer: {
      description: 'Minimalist design philosophy.',
      quickLinks: 'Links',
      contact: 'Contact',
      home: 'Home',
      portfolio: 'Portfolio',
      about: 'About',
      copyright: '© 2026 Minimal. All rights reserved.',
      privacyPolicy: 'Privacy',
      termsOfUse: 'Terms',
    },
  },
  de: {
    siteName: 'Minimal',
    siteSlogan: 'Weniger ist mehr',
    // Navbar
    nav: {
      home: 'Startseite',
      portfolio: 'Portfolio',
      about: 'Über mich',
      contact: 'Kontakt',
      works: 'Arbeiten',
      services: 'Leistungen',
    },
    // Hero
    heroTitle: 'Die Kraft des Minimalismus',
    heroSubtitle: 'Einfaches Design, kraftvolle Wirkung. Lösungen frei von unnötiger Komplexität.',
    heroCta: 'Portfolio',
    heroCtaSecondary: 'Über mich',
    // Über mich
    aboutTitle: 'Über mich',
    aboutText: 'Ich schaffe effektive visuelle Identitäten für Marken mit einer minimalistischen Design-Philosophie.',
    aboutPageTitle: 'Über mich',
    myPhilosophy: 'Meine Philosophie',
    myApproach: 'Mein Ansatz',
    experience: 'Erfahrung',
    skills: 'Fähigkeiten',
    // Leistungen
    servicesTitle: 'Fachgebiete',
    servicesSubtitle: 'Fokussierte und effektive Lösungen',
    serviceBranding: 'Markenidentität',
    serviceBrandingDesc: 'Minimales und effektives visuelles Identitätsdesign für Ihre Marke.',
    serviceWebDesign: 'Webdesign',
    serviceWebDesignDesc: 'Einfaches und benutzerzentriertes Website-Design.',
    servicePrint: 'Druckdesign',
    servicePrintDesc: 'Visitenkarten, Broschüren und andere Druckmaterialien.',
    // Portfolio
    portfolioTitle: 'Ausgewählte Arbeiten',
    portfolioSubtitle: 'Beispiele aus meinen neuesten Projekten',
    portfolioPageTitle: 'Portfolio',
    viewProject: 'Projekt ansehen',
    allProjects: 'Alle Projekte',
    projectDetails: 'Projektdetails',
    projectClient: 'Kunde',
    projectYear: 'Jahr',
    projectCategory: 'Kategorie',
    // CTA
    ctaTitle: 'Lass uns zusammenarbeiten',
    ctaSubtitle: 'Kontaktieren Sie mich für Ihr Projekt',
    ctaButton: 'Kontakt',
    // Kontakt
    contactPageTitle: 'Kontakt',
    contactName: 'Ihr Name',
    contactEmail: 'E-Mail',
    contactSubject: 'Betreff',
    contactMessage: 'Ihre Nachricht',
    contactSubmit: 'Absenden',
    // Footer
    footer: {
      description: 'Minimalistische Design-Philosophie.',
      quickLinks: 'Links',
      contact: 'Kontakt',
      home: 'Startseite',
      portfolio: 'Portfolio',
      about: 'Über mich',
      copyright: '© 2026 Minimal. Alle Rechte vorbehalten.',
      privacyPolicy: 'Datenschutz',
      termsOfUse: 'AGB',
    },
  },
  fr: {
    siteName: 'Minimal',
    siteSlogan: 'Moins c\'est plus',
    // Navbar
    nav: {
      home: 'Accueil',
      portfolio: 'Portfolio',
      about: 'À propos',
      contact: 'Contact',
      works: 'Travaux',
      services: 'Services',
    },
    // Hero
    heroTitle: 'Le pouvoir du minimalisme',
    heroSubtitle: 'Design simple, impact puissant. Solutions libérées de la complexité inutile.',
    heroCta: 'Portfolio',
    heroCtaSecondary: 'À propos',
    // À propos
    aboutTitle: 'À propos de moi',
    aboutText: 'Je crée des identités visuelles efficaces pour les marques avec une philosophie de design minimaliste.',
    aboutPageTitle: 'À propos de moi',
    myPhilosophy: 'Ma philosophie',
    myApproach: 'Mon approche',
    experience: 'Expérience',
    skills: 'Compétences',
    // Services
    servicesTitle: 'Domaines d\'expertise',
    servicesSubtitle: 'Solutions ciblées et efficaces',
    serviceBranding: 'Identité de marque',
    serviceBrandingDesc: 'Design d\'identité visuelle minimal et efficace pour votre marque.',
    serviceWebDesign: 'Design Web',
    serviceWebDesignDesc: 'Conception de site web simple et centrée sur l\'utilisateur.',
    servicePrint: 'Design Print',
    servicePrintDesc: 'Cartes de visite, brochures et autres supports imprimés.',
    // Portfolio
    portfolioTitle: 'Travaux sélectionnés',
    portfolioSubtitle: 'Exemples de mes derniers projets',
    portfolioPageTitle: 'Portfolio',
    viewProject: 'Voir le projet',
    allProjects: 'Tous les projets',
    projectDetails: 'Détails du projet',
    projectClient: 'Client',
    projectYear: 'Année',
    projectCategory: 'Catégorie',
    // CTA
    ctaTitle: 'Travaillons ensemble',
    ctaSubtitle: 'Contactez-moi pour votre projet',
    ctaButton: 'Contact',
    // Contact
    contactPageTitle: 'Contact',
    contactName: 'Votre nom',
    contactEmail: 'Email',
    contactSubject: 'Sujet',
    contactMessage: 'Votre message',
    contactSubmit: 'Envoyer',
    // Footer
    footer: {
      description: 'Philosophie de design minimaliste.',
      quickLinks: 'Liens',
      contact: 'Contact',
      home: 'Accueil',
      portfolio: 'Portfolio',
      about: 'À propos',
      copyright: '© 2026 Minimal. Tous droits réservés.',
      privacyPolicy: 'Confidentialité',
      termsOfUse: 'Conditions',
    },
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
    portfolio: portfolioPage,
    about: aboutPage,
    contact: contactPage,
  },
};

// Export alias
export { minimalTheme as sadeTheme };
