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

const translations = {
    tr: {
        siteName: 'Bilgi Akademi',
        siteSlogan: 'Geleceğe Hazırlık',
        heroTitle: 'Hayallerine Ulaşmanın Yolu',
        heroSubtitle: 'Uzman eğitim kadromuz ile kariyer hedeflerinize ulaşın. 50+ program, 10.000+ mezun.',
        heroCta: 'Programları İncele',
        heroCtaSecondary: 'Kayıt Ol',
        programsTitle: 'Eğitim Programları',
        programsSubtitle: 'İhtiyacınıza uygun eğitim seçenekleri',
        teachersTitle: 'Eğitmenlerimiz',
        teachersSubtitle: 'Alanında uzman akademisyenler',
        aboutTitle: 'Hakkımızda',
        aboutText: '2005 yılından bu yana binlerce öğrenciye kaliteli eğitim veriyoruz.',
        testimonialsTitle: 'Öğrenci Yorumları',
        testimonialsSubtitle: 'Mezunlarımız ne diyor?',
        enrollTitle: 'Kayıt Ol',
        enrollSubtitle: 'Geleceğine yatırım yap',
        faqTitle: 'Sık Sorulan Sorular',
        blogTitle: 'Blog',
        eventsTitle: 'Etkinlikler',
    },
    en: {
        siteName: 'Knowledge Academy',
        siteSlogan: 'Preparing for the Future',
        heroTitle: 'The Path to Your Dreams',
        heroSubtitle: 'Reach your career goals with our expert education team. 50+ programs, 10,000+ graduates.',
        heroCta: 'View Programs',
        heroCtaSecondary: 'Enroll Now',
        programsTitle: 'Educational Programs',
        programsSubtitle: 'Education options tailored to your needs',
        teachersTitle: 'Our Instructors',
        teachersSubtitle: 'Expert academics in their fields',
        aboutTitle: 'About Us',
        aboutText: 'We have been providing quality education to thousands of students since 2005.',
        testimonialsTitle: 'Student Reviews',
        testimonialsSubtitle: 'What do our graduates say?',
        enrollTitle: 'Enroll',
        enrollSubtitle: 'Invest in your future',
        faqTitle: 'FAQ',
        blogTitle: 'Blog',
        eventsTitle: 'Events',
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
    },
};

export { egitimTheme as educationTheme };
