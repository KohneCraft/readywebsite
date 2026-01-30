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
    // Navbar
    nav: {
      home: 'Ana Sayfa',
      services: 'Hizmetler',
      projects: 'Projeler',
      about: 'Hakkımızda',
      contact: 'İletişim',
      getQuote: 'Teklif Al',
      residential: 'Konut İnşaatı',
      commercial: 'Ticari İnşaat',
      renovation: 'Renovasyon',
      industrial: 'Endüstriyel Yapılar',
    },
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
    serviceResidentialDesc: 'Modern ve konforlu yaşam alanları inşa ediyoruz.',
    serviceCommercial: 'Ticari İnşaat',
    serviceCommercialDesc: 'İş merkezleri, AVM ve ofis binaları yapıyoruz.',
    serviceRenovation: 'Renovasyon & Tadilat',
    serviceRenovationDesc: 'Mevcut yapıları yeniliyor ve modernize ediyoruz.',
    serviceIndustrial: 'Endüstriyel Yapılar',
    serviceIndustrialDesc: 'Fabrika, depo ve üretim tesisleri inşa ediyoruz.',
    // Hakkımızda
    aboutTitle: 'Hakkımızda',
    aboutText: 'Vav İnşaat olarak 2003 yılından bu yana inşaat sektöründe faaliyet gösteriyoruz.',
    aboutPageTitle: 'Hakkımızda',
    aboutPageDesc: 'Kalite, güvenilirlik ve müşteri memnuniyeti odaklı çalışıyoruz.',
    ourMission: 'Misyonumuz',
    ourVision: 'Vizyonumuz',
    ourValues: 'Değerlerimiz',
    // Projeler
    projectsTitle: 'Son Projelerimiz',
    projectsSubtitle: 'Tamamladığımız başarılı projelerden örnekler',
    projectsViewAll: 'Tüm Projeleri Görüntüle',
    projectDetails: 'Proje Detayları',
    projectLocation: 'Konum',
    projectYear: 'Yıl',
    projectCategory: 'Kategori',
    // Referanslar
    testimonialsTitle: 'Müşteri Yorumları',
    testimonialsSubtitle: 'Müşterilerimizin bizimle çalışma deneyimleri',
    // CTA
    ctaTitle: 'Projeniz İçin Ücretsiz Keşif',
    ctaSubtitle: 'Uzman ekibimiz ile projenizi değerlendirelim',
    ctaButton: 'Hemen Teklif Alın',
    // İletişim Sayfası
    contactPageTitle: 'İletişim',
    contactPageSubtitle: 'Projeleriniz için bize ulaşın',
    contactName: 'Ad Soyad',
    contactEmail: 'E-posta',
    contactPhone: 'Telefon',
    contactSubject: 'Konu',
    contactMessage: 'Mesajınız',
    contactSubmit: 'Gönder',
    contactAddress: 'Adres',
    contactWorkingHours: 'Çalışma Saatleri',
    // Footer
    footer: {
      description: 'Güvenilir, kaliteli ve modern inşaat çözümleri.',
      quickLinks: 'Hızlı Linkler',
      services: 'Hizmetlerimiz',
      contact: 'İletişim',
      home: 'Ana Sayfa',
      about: 'Hakkımızda',
      projects: 'Projeler',
      newsletterTitle: 'Bültenimize Abone Olun',
      newsletterPlaceholder: 'E-posta adresiniz',
      subscribe: 'Abone Ol',
      copyright: '© 2026 Vav İnşaat. Tüm hakları saklıdır.',
      privacyPolicy: 'Gizlilik Politikası',
      termsOfUse: 'Kullanım Şartları',
    },
  },
  en: {
    // General
    siteName: 'Vav Construction',
    siteSlogan: 'Reliable Construction Solutions',
    // Navbar
    nav: {
      home: 'Home',
      services: 'Services',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      getQuote: 'Get Quote',
      residential: 'Residential',
      commercial: 'Commercial',
      renovation: 'Renovation',
      industrial: 'Industrial',
    },
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
    serviceResidentialDesc: 'We build modern and comfortable living spaces.',
    serviceCommercial: 'Commercial Construction',
    serviceCommercialDesc: 'We build business centers, malls and office buildings.',
    serviceRenovation: 'Renovation & Remodeling',
    serviceRenovationDesc: 'We renovate and modernize existing structures.',
    serviceIndustrial: 'Industrial Buildings',
    serviceIndustrialDesc: 'We build factories, warehouses and production facilities.',
    // About
    aboutTitle: 'About Us',
    aboutText: 'Vav Construction has been operating in the construction sector since 2003.',
    aboutPageTitle: 'About Us',
    aboutPageDesc: 'We focus on quality, reliability and customer satisfaction.',
    ourMission: 'Our Mission',
    ourVision: 'Our Vision',
    ourValues: 'Our Values',
    // Projects
    projectsTitle: 'Our Recent Projects',
    projectsSubtitle: 'Examples of our successfully completed projects',
    projectsViewAll: 'View All Projects',
    projectDetails: 'Project Details',
    projectLocation: 'Location',
    projectYear: 'Year',
    projectCategory: 'Category',
    // Testimonials
    testimonialsTitle: 'Customer Reviews',
    testimonialsSubtitle: 'Our clients\' experiences working with us',
    // CTA
    ctaTitle: 'Free Site Survey for Your Project',
    ctaSubtitle: 'Let our expert team evaluate your project',
    ctaButton: 'Get a Quote Now',
    // Contact Page
    contactPageTitle: 'Contact',
    contactPageSubtitle: 'Reach out to us for your projects',
    contactName: 'Full Name',
    contactEmail: 'Email',
    contactPhone: 'Phone',
    contactSubject: 'Subject',
    contactMessage: 'Your Message',
    contactSubmit: 'Submit',
    contactAddress: 'Address',
    contactWorkingHours: 'Working Hours',
    // Footer
    footer: {
      description: 'Reliable, quality, and modern construction solutions.',
      quickLinks: 'Quick Links',
      services: 'Our Services',
      contact: 'Contact',
      home: 'Home',
      about: 'About Us',
      projects: 'Projects',
      newsletterTitle: 'Subscribe to Our Newsletter',
      newsletterPlaceholder: 'Your email address',
      subscribe: 'Subscribe',
      copyright: '© 2026 Vav Construction. All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      termsOfUse: 'Terms of Use',
    },
  },
  de: {
    // Allgemein
    siteName: 'Vav Bau',
    siteSlogan: 'Zuverlässige Baulösungen',
    // Navbar
    nav: {
      home: 'Startseite',
      services: 'Dienstleistungen',
      projects: 'Projekte',
      about: 'Über uns',
      contact: 'Kontakt',
      getQuote: 'Angebot anfordern',
      residential: 'Wohnungsbau',
      commercial: 'Gewerbebau',
      renovation: 'Renovierung',
      industrial: 'Industriebau',
    },
    // Hero
    heroTitle: 'Zuverlässige Baulösungen',
    heroSubtitle: 'Mit über 20 Jahren Erfahrung verwandeln wir Ihre Traumprojekte in Realität.',
    heroCta: 'Unsere Projekte ansehen',
    heroCtaSecondary: 'Kontaktieren Sie uns',
    // Statistiken
    statsProjects: 'Abgeschlossene Projekte',
    statsYears: 'Jahre Erfahrung',
    statsClients: 'Zufriedene Kunden',
    statsTeam: 'Expertenteam',
    // Dienstleistungen
    servicesTitle: 'Unsere Dienstleistungen',
    servicesSubtitle: 'Wir erfüllen Ihre Bauanforderungen mit unserem breiten Serviceangebot',
    serviceResidential: 'Wohnungsbau',
    serviceResidentialDesc: 'Wir bauen moderne und komfortable Wohnräume.',
    serviceCommercial: 'Gewerbebau',
    serviceCommercialDesc: 'Wir bauen Geschäftszentren, Einkaufszentren und Bürogebäude.',
    serviceRenovation: 'Renovierung & Umbau',
    serviceRenovationDesc: 'Wir renovieren und modernisieren bestehende Strukturen.',
    serviceIndustrial: 'Industriebauten',
    serviceIndustrialDesc: 'Wir bauen Fabriken, Lagerhäuser und Produktionsanlagen.',
    // Über uns
    aboutTitle: 'Über uns',
    aboutText: 'Vav Bau ist seit 2003 in der Baubranche tätig.',
    aboutPageTitle: 'Über uns',
    aboutPageDesc: 'Wir konzentrieren uns auf Qualität, Zuverlässigkeit und Kundenzufriedenheit.',
    ourMission: 'Unsere Mission',
    ourVision: 'Unsere Vision',
    ourValues: 'Unsere Werte',
    // Projekte
    projectsTitle: 'Unsere neuesten Projekte',
    projectsSubtitle: 'Beispiele unserer erfolgreich abgeschlossenen Projekte',
    projectsViewAll: 'Alle Projekte anzeigen',
    projectDetails: 'Projektdetails',
    projectLocation: 'Standort',
    projectYear: 'Jahr',
    projectCategory: 'Kategorie',
    // Testimonials
    testimonialsTitle: 'Kundenbewertungen',
    testimonialsSubtitle: 'Erfahrungen unserer Kunden mit uns',
    // CTA
    ctaTitle: 'Kostenlose Besichtigung für Ihr Projekt',
    ctaSubtitle: 'Lassen Sie unser Expertenteam Ihr Projekt bewerten',
    ctaButton: 'Jetzt Angebot anfordern',
    // Kontaktseite
    contactPageTitle: 'Kontakt',
    contactPageSubtitle: 'Kontaktieren Sie uns für Ihre Projekte',
    contactName: 'Vollständiger Name',
    contactEmail: 'E-Mail',
    contactPhone: 'Telefon',
    contactSubject: 'Betreff',
    contactMessage: 'Ihre Nachricht',
    contactSubmit: 'Absenden',
    contactAddress: 'Adresse',
    contactWorkingHours: 'Öffnungszeiten',
    // Footer
    footer: {
      description: 'Zuverlässige, qualitativ hochwertige und moderne Baulösungen.',
      quickLinks: 'Schnelllinks',
      services: 'Unsere Dienstleistungen',
      contact: 'Kontakt',
      home: 'Startseite',
      about: 'Über uns',
      projects: 'Projekte',
      newsletterTitle: 'Newsletter abonnieren',
      newsletterPlaceholder: 'Ihre E-Mail-Adresse',
      subscribe: 'Abonnieren',
      copyright: '© 2026 Vav Bau. Alle Rechte vorbehalten.',
      privacyPolicy: 'Datenschutzrichtlinie',
      termsOfUse: 'Nutzungsbedingungen',
    },
  },
  fr: {
    // Général
    siteName: 'Vav Construction',
    siteSlogan: 'Solutions de construction fiables',
    // Navbar
    nav: {
      home: 'Accueil',
      services: 'Services',
      projects: 'Projets',
      about: 'À propos',
      contact: 'Contact',
      getQuote: 'Devis gratuit',
      residential: 'Résidentiel',
      commercial: 'Commercial',
      renovation: 'Rénovation',
      industrial: 'Industriel',
    },
    // Hero
    heroTitle: 'Solutions de construction fiables',
    heroSubtitle: 'Avec plus de 20 ans d\'expérience, nous transformons vos projets de rêve en réalité.',
    heroCta: 'Voir nos projets',
    heroCtaSecondary: 'Contactez-nous',
    // Statistiques
    statsProjects: 'Projets réalisés',
    statsYears: 'Années d\'expérience',
    statsClients: 'Clients satisfaits',
    statsTeam: 'Équipe d\'experts',
    // Services
    servicesTitle: 'Nos services',
    servicesSubtitle: 'Nous répondons à vos besoins de construction avec notre large gamme de services',
    serviceResidential: 'Construction résidentielle',
    serviceResidentialDesc: 'Nous construisons des espaces de vie modernes et confortables.',
    serviceCommercial: 'Construction commerciale',
    serviceCommercialDesc: 'Nous construisons des centres d\'affaires, des centres commerciaux et des immeubles de bureaux.',
    serviceRenovation: 'Rénovation & Remodélisation',
    serviceRenovationDesc: 'Nous rénovons et modernisons les structures existantes.',
    serviceIndustrial: 'Bâtiments industriels',
    serviceIndustrialDesc: 'Nous construisons des usines, des entrepôts et des installations de production.',
    // À propos
    aboutTitle: 'À propos de nous',
    aboutText: 'Vav Construction est active dans le secteur de la construction depuis 2003.',
    aboutPageTitle: 'À propos de nous',
    aboutPageDesc: 'Nous nous concentrons sur la qualité, la fiabilité et la satisfaction client.',
    ourMission: 'Notre mission',
    ourVision: 'Notre vision',
    ourValues: 'Nos valeurs',
    // Projets
    projectsTitle: 'Nos projets récents',
    projectsSubtitle: 'Exemples de nos projets réalisés avec succès',
    projectsViewAll: 'Voir tous les projets',
    projectDetails: 'Détails du projet',
    projectLocation: 'Emplacement',
    projectYear: 'Année',
    projectCategory: 'Catégorie',
    // Témoignages
    testimonialsTitle: 'Avis clients',
    testimonialsSubtitle: 'Les expériences de nos clients avec nous',
    // CTA
    ctaTitle: 'Visite gratuite pour votre projet',
    ctaSubtitle: 'Laissez notre équipe d\'experts évaluer votre projet',
    ctaButton: 'Demander un devis',
    // Page Contact
    contactPageTitle: 'Contact',
    contactPageSubtitle: 'Contactez-nous pour vos projets',
    contactName: 'Nom complet',
    contactEmail: 'Email',
    contactPhone: 'Téléphone',
    contactSubject: 'Sujet',
    contactMessage: 'Votre message',
    contactSubmit: 'Envoyer',
    contactAddress: 'Adresse',
    contactWorkingHours: 'Heures d\'ouverture',
    // Footer
    footer: {
      description: 'Solutions de construction fiables, de qualité et modernes.',
      quickLinks: 'Liens rapides',
      services: 'Nos services',
      contact: 'Contact',
      home: 'Accueil',
      about: 'À propos',
      projects: 'Projets',
      newsletterTitle: 'Abonnez-vous à notre newsletter',
      newsletterPlaceholder: 'Votre adresse email',
      subscribe: 'S\'abonner',
      copyright: '© 2026 Vav Construction. Tous droits réservés.',
      privacyPolicy: 'Politique de confidentialité',
      termsOfUse: 'Conditions d\'utilisation',
    },
  },
};

export const constructionTheme: ThemeData = {
  metadata: {
    id: 'theme-insaat',
    name: 'İnşaat Firması',
    description: 'Gelişmiş inşaat firma teması - Modern, profesyonel ve kapsamlı, TR/EN destekli',
    version: '2.0.0',
    thumbnail: '/themes/construction.png',
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
