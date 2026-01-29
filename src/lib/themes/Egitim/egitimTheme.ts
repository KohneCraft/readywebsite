// ============================================
// Eğitim Teması - Ana Tema Dosyası
// Okul, üniversite ve kurs merkezleri için - TR/EN destekli
// ============================================

import type { ThemeData } from '@/types/theme';
import { egitimHeader } from './header';
import { egitimFooter } from './footer';
import { homePage } from './pages/home';
import { aboutPage } from './pages/about';
import { contactPage } from './pages/contact';
import { programsPage } from './pages/programs';
import { enrollPage } from './pages/enroll';
import { languagesPage } from './pages/languages';
import { technologyPage } from './pages/technology';
import { businessPage } from './pages/business';
import { designPage } from './pages/design';

const translations = {
    tr: {
        siteName: 'Bilgi Akademi',
        siteSlogan: 'Geleceğe Hazırlık',
        // Navbar
        nav: {
            home: 'Ana Sayfa',
            programs: 'Programlar',
            instructors: 'Eğitmenler',
            enroll: 'Kayıt Ol',
            about: 'Hakkımızda',
            contact: 'İletişim',
            blog: 'Blog',
            languages: 'Dil Eğitimleri',
            technology: 'Teknoloji',
            business: 'İşletme',
            design: 'Tasarım',
        },
        // Hero
        heroTitle: 'Hayallerine Ulaşmanın Yolu',
        heroSubtitle: 'Uzman eğitim kadromuz ile kariyer hedeflerinize ulaşın. 50+ program, 10.000+ mezun.',
        heroCta: 'Programları İncele',
        heroCtaSecondary: 'Kayıt Ol',
        // Programlar
        programsTitle: 'Eğitim Programları',
        programsSubtitle: 'İhtiyacınıza uygun eğitim seçenekleri',
        programLanguages: 'Dil Eğitimleri',
        programLanguagesDesc: 'İngilizce, Almanca, Fransızca ve daha fazlası',
        programTechnology: 'Teknoloji',
        programTechnologyDesc: 'Yazılım, veri bilimi, siber güvenlik',
        programBusiness: 'İşletme',
        programBusinessDesc: 'MBA, pazarlama, finans',
        programDesign: 'Tasarım',
        programDesignDesc: 'Grafik, UI/UX, 3D modelleme',
        viewAllPrograms: 'Tüm Programları Görüntüle',
        programDuration: 'Süre',
        programLevel: 'Seviye',
        programCertificate: 'Sertifika',
        // Eğitmenler
        teachersTitle: 'Eğitmenlerimiz',
        teachersSubtitle: 'Alanında uzman akademisyenler',
        viewAllInstructors: 'Tüm Eğitmenleri Görüntüle',
        // Hakkımızda
        aboutTitle: 'Hakkımızda',
        aboutText: '2005 yılından bu yana binlerce öğrenciye kaliteli eğitim veriyoruz.',
        aboutPageTitle: 'Hakkımızda',
        ourMission: 'Misyonumuz',
        ourVision: 'Vizyonumuz',
        ourValues: 'Değerlerimiz',
        // Referanslar
        testimonialsTitle: 'Öğrenci Yorumları',
        testimonialsSubtitle: 'Mezunlarımız ne diyor?',
        // Kayıt
        enrollTitle: 'Kayıt Ol',
        enrollSubtitle: 'Geleceğine yatırım yap',
        enrollName: 'Ad Soyad',
        enrollEmail: 'E-posta',
        enrollPhone: 'Telefon',
        enrollProgram: 'Program',
        enrollMessage: 'Mesajınız',
        enrollSubmit: 'Kayıt Ol',
        // SSS
        faqTitle: 'Sık Sorulan Sorular',
        // Blog
        blogTitle: 'Blog',
        blogSubtitle: 'Eğitim dünyasından haberler',
        readMore: 'Devamını Oku',
        // Etkinlikler
        eventsTitle: 'Etkinlikler',
        eventsSubtitle: 'Yaklaşan etkinlikler',
        viewAllEvents: 'Tüm Etkinlikleri Görüntüle',
        // İletişim
        contactPageTitle: 'İletişim',
        contactName: 'Ad Soyad',
        contactEmail: 'E-posta',
        contactPhone: 'Telefon',
        contactMessage: 'Mesajınız',
        contactSubmit: 'Gönder',
        contactAddress: 'Adres',
        // Footer
        footer: {
            description: 'Kaliteli eğitimle geleceğe hazırlık.',
            quickLinks: 'Hızlı Linkler',
            programs: 'Programlar',
            contact: 'İletişim',
            home: 'Ana Sayfa',
            about: 'Hakkımızda',
            enroll: 'Kayıt Ol',
            blog: 'Blog',
            events: 'Etkinlikler',
            copyright: '© 2026 Bilgi Akademi. Tüm hakları saklıdır.',
            privacyPolicy: 'Gizlilik Politikası',
            termsOfUse: 'Kullanım Şartları',
        },
    },
    en: {
        siteName: 'Knowledge Academy',
        siteSlogan: 'Preparing for the Future',
        // Navbar
        nav: {
            home: 'Home',
            programs: 'Programs',
            instructors: 'Instructors',
            enroll: 'Enroll',
            about: 'About',
            contact: 'Contact',
            blog: 'Blog',
            languages: 'Languages',
            technology: 'Technology',
            business: 'Business',
            design: 'Design',
        },
        // Hero
        heroTitle: 'The Path to Your Dreams',
        heroSubtitle: 'Reach your career goals with our expert education team. 50+ programs, 10,000+ graduates.',
        heroCta: 'View Programs',
        heroCtaSecondary: 'Enroll Now',
        // Programs
        programsTitle: 'Educational Programs',
        programsSubtitle: 'Education options tailored to your needs',
        programLanguages: 'Language Training',
        programLanguagesDesc: 'English, German, French and more',
        programTechnology: 'Technology',
        programTechnologyDesc: 'Software, data science, cybersecurity',
        programBusiness: 'Business',
        programBusinessDesc: 'MBA, marketing, finance',
        programDesign: 'Design',
        programDesignDesc: 'Graphic, UI/UX, 3D modeling',
        viewAllPrograms: 'View All Programs',
        programDuration: 'Duration',
        programLevel: 'Level',
        programCertificate: 'Certificate',
        // Instructors
        teachersTitle: 'Our Instructors',
        teachersSubtitle: 'Expert academics in their fields',
        viewAllInstructors: 'View All Instructors',
        // About
        aboutTitle: 'About Us',
        aboutText: 'We have been providing quality education to thousands of students since 2005.',
        aboutPageTitle: 'About Us',
        ourMission: 'Our Mission',
        ourVision: 'Our Vision',
        ourValues: 'Our Values',
        // Testimonials
        testimonialsTitle: 'Student Reviews',
        testimonialsSubtitle: 'What do our graduates say?',
        // Enroll
        enrollTitle: 'Enroll',
        enrollSubtitle: 'Invest in your future',
        enrollName: 'Full Name',
        enrollEmail: 'Email',
        enrollPhone: 'Phone',
        enrollProgram: 'Program',
        enrollMessage: 'Your Message',
        enrollSubmit: 'Enroll',
        // FAQ
        faqTitle: 'FAQ',
        // Blog
        blogTitle: 'Blog',
        blogSubtitle: 'News from the education world',
        readMore: 'Read More',
        // Events
        eventsTitle: 'Events',
        eventsSubtitle: 'Upcoming events',
        viewAllEvents: 'View All Events',
        // Contact
        contactPageTitle: 'Contact',
        contactName: 'Full Name',
        contactEmail: 'Email',
        contactPhone: 'Phone',
        contactMessage: 'Your Message',
        contactSubmit: 'Submit',
        contactAddress: 'Address',
        // Footer
        footer: {
            description: 'Preparing for the future with quality education.',
            quickLinks: 'Quick Links',
            programs: 'Programs',
            contact: 'Contact',
            home: 'Home',
            about: 'About Us',
            enroll: 'Enroll',
            blog: 'Blog',
            events: 'Events',
            copyright: '© 2026 Knowledge Academy. All rights reserved.',
            privacyPolicy: 'Privacy Policy',
            termsOfUse: 'Terms of Use',
        },
    },
    de: {
        siteName: 'Wissen Akademie',
        siteSlogan: 'Vorbereitung auf die Zukunft',
        // Navbar
        nav: {
            home: 'Startseite',
            programs: 'Programme',
            instructors: 'Dozenten',
            enroll: 'Einschreiben',
            about: 'Über uns',
            contact: 'Kontakt',
            blog: 'Blog',
            languages: 'Sprachen',
            technology: 'Technologie',
            business: 'Business',
            design: 'Design',
        },
        // Hero
        heroTitle: 'Der Weg zu Ihren Träumen',
        heroSubtitle: 'Erreichen Sie Ihre Karriereziele mit unserem Expertenteam. 50+ Programme, 10.000+ Absolventen.',
        heroCta: 'Programme ansehen',
        heroCtaSecondary: 'Jetzt einschreiben',
        // Programme
        programsTitle: 'Bildungsprogramme',
        programsSubtitle: 'Bildungsoptionen für Ihre Bedürfnisse',
        programLanguages: 'Sprachkurse',
        programLanguagesDesc: 'Englisch, Deutsch, Französisch und mehr',
        programTechnology: 'Technologie',
        programTechnologyDesc: 'Software, Datenwissenschaft, Cybersicherheit',
        programBusiness: 'Business',
        programBusinessDesc: 'MBA, Marketing, Finanzen',
        programDesign: 'Design',
        programDesignDesc: 'Grafik, UI/UX, 3D-Modellierung',
        viewAllPrograms: 'Alle Programme anzeigen',
        programDuration: 'Dauer',
        programLevel: 'Niveau',
        programCertificate: 'Zertifikat',
        // Dozenten
        teachersTitle: 'Unsere Dozenten',
        teachersSubtitle: 'Experten-Akademiker in ihren Fachgebieten',
        viewAllInstructors: 'Alle Dozenten anzeigen',
        // Über uns
        aboutTitle: 'Über uns',
        aboutText: 'Wir bieten seit 2005 Tausenden von Studenten qualitativ hochwertige Bildung.',
        aboutPageTitle: 'Über uns',
        ourMission: 'Unsere Mission',
        ourVision: 'Unsere Vision',
        ourValues: 'Unsere Werte',
        // Testimonials
        testimonialsTitle: 'Studentenbewertungen',
        testimonialsSubtitle: 'Was sagen unsere Absolventen?',
        // Einschreiben
        enrollTitle: 'Einschreiben',
        enrollSubtitle: 'Investieren Sie in Ihre Zukunft',
        enrollName: 'Vollständiger Name',
        enrollEmail: 'E-Mail',
        enrollPhone: 'Telefon',
        enrollProgram: 'Programm',
        enrollMessage: 'Ihre Nachricht',
        enrollSubmit: 'Einschreiben',
        // FAQ
        faqTitle: 'Häufige Fragen',
        // Blog
        blogTitle: 'Blog',
        blogSubtitle: 'Neuigkeiten aus der Bildungswelt',
        readMore: 'Weiterlesen',
        // Veranstaltungen
        eventsTitle: 'Veranstaltungen',
        eventsSubtitle: 'Kommende Veranstaltungen',
        viewAllEvents: 'Alle Veranstaltungen anzeigen',
        // Kontakt
        contactPageTitle: 'Kontakt',
        contactName: 'Vollständiger Name',
        contactEmail: 'E-Mail',
        contactPhone: 'Telefon',
        contactMessage: 'Ihre Nachricht',
        contactSubmit: 'Absenden',
        contactAddress: 'Adresse',
        // Footer
        footer: {
            description: 'Vorbereitung auf die Zukunft mit qualitativ hochwertiger Bildung.',
            quickLinks: 'Schnelllinks',
            programs: 'Programme',
            contact: 'Kontakt',
            home: 'Startseite',
            about: 'Über uns',
            enroll: 'Einschreiben',
            blog: 'Blog',
            events: 'Veranstaltungen',
            copyright: '© 2026 Wissen Akademie. Alle Rechte vorbehalten.',
            privacyPolicy: 'Datenschutzrichtlinie',
            termsOfUse: 'Nutzungsbedingungen',
        },
    },
    fr: {
        siteName: 'Académie du Savoir',
        siteSlogan: 'Préparer l\'avenir',
        // Navbar
        nav: {
            home: 'Accueil',
            programs: 'Programmes',
            instructors: 'Instructeurs',
            enroll: 'S\'inscrire',
            about: 'À propos',
            contact: 'Contact',
            blog: 'Blog',
            languages: 'Langues',
            technology: 'Technologie',
            business: 'Business',
            design: 'Design',
        },
        // Hero
        heroTitle: 'Le chemin vers vos rêves',
        heroSubtitle: 'Atteignez vos objectifs de carrière avec notre équipe d\'experts. 50+ programmes, 10 000+ diplômés.',
        heroCta: 'Voir les programmes',
        heroCtaSecondary: 'S\'inscrire',
        // Programmes
        programsTitle: 'Programmes éducatifs',
        programsSubtitle: 'Options d\'éducation adaptées à vos besoins',
        programLanguages: 'Formation linguistique',
        programLanguagesDesc: 'Anglais, allemand, français et plus',
        programTechnology: 'Technologie',
        programTechnologyDesc: 'Logiciel, science des données, cybersécurité',
        programBusiness: 'Business',
        programBusinessDesc: 'MBA, marketing, finance',
        programDesign: 'Design',
        programDesignDesc: 'Graphique, UI/UX, modélisation 3D',
        viewAllPrograms: 'Voir tous les programmes',
        programDuration: 'Durée',
        programLevel: 'Niveau',
        programCertificate: 'Certificat',
        // Instructeurs
        teachersTitle: 'Nos instructeurs',
        teachersSubtitle: 'Académiciens experts dans leurs domaines',
        viewAllInstructors: 'Voir tous les instructeurs',
        // À propos
        aboutTitle: 'À propos de nous',
        aboutText: 'Nous offrons une éducation de qualité à des milliers d\'étudiants depuis 2005.',
        aboutPageTitle: 'À propos de nous',
        ourMission: 'Notre mission',
        ourVision: 'Notre vision',
        ourValues: 'Nos valeurs',
        // Témoignages
        testimonialsTitle: 'Avis étudiants',
        testimonialsSubtitle: 'Que disent nos diplômés?',
        // Inscription
        enrollTitle: 'S\'inscrire',
        enrollSubtitle: 'Investissez dans votre avenir',
        enrollName: 'Nom complet',
        enrollEmail: 'Email',
        enrollPhone: 'Téléphone',
        enrollProgram: 'Programme',
        enrollMessage: 'Votre message',
        enrollSubmit: 'S\'inscrire',
        // FAQ
        faqTitle: 'FAQ',
        // Blog
        blogTitle: 'Blog',
        blogSubtitle: 'Nouvelles du monde de l\'éducation',
        readMore: 'Lire la suite',
        // Événements
        eventsTitle: 'Événements',
        eventsSubtitle: 'Événements à venir',
        viewAllEvents: 'Voir tous les événements',
        // Contact
        contactPageTitle: 'Contact',
        contactName: 'Nom complet',
        contactEmail: 'Email',
        contactPhone: 'Téléphone',
        contactMessage: 'Votre message',
        contactSubmit: 'Envoyer',
        contactAddress: 'Adresse',
        // Footer
        footer: {
            description: 'Préparer l\'avenir avec une éducation de qualité.',
            quickLinks: 'Liens rapides',
            programs: 'Programmes',
            contact: 'Contact',
            home: 'Accueil',
            about: 'À propos',
            enroll: 'S\'inscrire',
            blog: 'Blog',
            events: 'Événements',
            copyright: '© 2026 Académie du Savoir. Tous droits réservés.',
            privacyPolicy: 'Politique de confidentialité',
            termsOfUse: 'Conditions d\'utilisation',
        },
    },
};

export const egitimTheme: ThemeData = {
    metadata: {
        id: 'theme-egitim',
        name: 'Eğitim Kurumu',
        description: 'Okul, üniversite ve kurs merkezleri için profesyonel tema - TR/EN destekli',
        version: '1.0.0',
        thumbnail: '/themes/education/preview.jpg',
        author: 'Page Builder',
        category: 'education',
        pages: [
            { slug: 'home', title: 'Ana Sayfa', file: 'pages/home.json' },
            { slug: 'programs', title: 'Programlar', file: 'pages/programs.json' },
            { slug: 'enroll', title: 'Kayıt Ol', file: 'pages/enroll.json' },
            { slug: 'programs/languages', title: 'Dil Eğitimleri', file: 'pages/languages.json' },
            { slug: 'programs/technology', title: 'Teknoloji', file: 'pages/technology.json' },
            { slug: 'programs/business', title: 'İşletme', file: 'pages/business.json' },
            { slug: 'programs/design', title: 'Tasarım', file: 'pages/design.json' },
            { slug: 'about', title: 'Hakkımızda', file: 'pages/about.json' },
            { slug: 'contact', title: 'İletişim', file: 'pages/contact.json' },
        ],
        settings: {
            primaryColor: '#1e40af',
            secondaryColor: '#f59e0b',
            accentColor: '#3b82f6',
            fontFamily: "'Inter', sans-serif",
            defaultLanguage: 'tr',
            translations: translations,
            header: egitimHeader,
            footer: egitimFooter,
            company: { name: 'Bilgi Akademi', slogan: 'Geleceğe Hazırlık', logo: '/themes/education/logo.svg' },
            contact: { email: 'info@bilgiakademi.com', phone: '+90 212 567 8901', address: 'Kadıköy, Bağdat Cad. No: 200, İstanbul', mapUrl: '' },
            social: { facebook: 'https://facebook.com/bilgiakademi', instagram: 'https://instagram.com/bilgiakademi', youtube: 'https://youtube.com/@bilgiakademi', linkedin: 'https://linkedin.com/company/bilgiakademi' },
            seo: { metaTitle: 'Bilgi Akademi | Eğitim Kurumu - İstanbul', metaDescription: '50+ eğitim programı, 100+ uzman eğitmen. Kariyerinize yatırım yapın.', metaKeywords: 'eğitim, kurs, akademi, kariyer, sertifika, istanbul', googleAnalyticsId: '' },
            animations: { enabled: true, defaultType: 'slideUp', defaultDuration: 500, staggerDelay: 100 },
        },
    },
    pages: {
        home: homePage,
        about: aboutPage,
        contact: contactPage,
        programs: programsPage,
        enroll: enrollPage,
        'programs/languages': languagesPage,
        'programs/technology': technologyPage,
        'programs/business': businessPage,
        'programs/design': designPage,
    },
};

export { egitimTheme as educationTheme };
