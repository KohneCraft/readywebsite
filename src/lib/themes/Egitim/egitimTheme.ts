// ============================================
// Eğitim Teması - Ana Tema Dosyası
// Okul, üniversite ve kurs merkezleri için - TR/EN destekli
// ============================================

import type { ThemeData, ThemePageData } from '@/types/theme';
import { egitimHeader } from './header';
import { egitimFooter } from './footer';

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

const homePage: ThemePageData = {
    slug: 'home',
    title: 'Ana Sayfa',
    sections: [
        {
            name: 'Hero',
            settings: {
                backgroundColor: '#1e40af',
                backgroundImage: '/themes/education/hero-bg.jpg',
                backgroundSize: 'cover',
                padding: { top: 120, right: 40, bottom: 120, left: 40 },
                minHeight: 600,
                overlay: { enabled: true, color: 'rgba(30, 64, 175, 0.9)' },
                animation: { enabled: true, type: 'fadeIn', duration: 700 },
            },
            columns: [
                {
                    width: 60,
                    settings: { padding: { top: 40, right: 40, bottom: 40, left: 40 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'Hayallerine Ulaşmanın Yolu', fontSize: 52, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Uzman eğitim kadromuz ile kariyer hedeflerinize ulaşın.', fontSize: 20, color: '#dbeafe', lineHeight: 1.6 } },
                        { type: 'button', props: { text: 'Programları İncele', link: '/programs', style: 'primary', size: 'large', backgroundColor: '#f59e0b' } },
                    ],
                },
                { width: 40, settings: { padding: { top: 40, right: 40, bottom: 40, left: 40 } }, blocks: [] },
            ],
        },
        {
            name: 'Stats',
            settings: { backgroundColor: '#f59e0b', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 25, settings: { textAlign: 'center' }, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '50+', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Eğitim Programı', fontSize: 16, color: '#ffffff' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center' }, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '10K+', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Mezun', fontSize: 16, color: '#ffffff' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center' }, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '100+', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Eğitmen', fontSize: 16, color: '#ffffff' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center' }, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '20', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Yıllık Tecrübe', fontSize: 16, color: '#ffffff' } },
                    ]
                },
            ],
        },
    ],
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
            { slug: 'teachers', title: 'Eğitmenler', file: 'pages/teachers.json' },
            { slug: 'about', title: 'Hakkımızda', file: 'pages/about.json' },
            { slug: 'blog', title: 'Blog', file: 'pages/blog.json' },
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
    pages: { home: homePage },
};

export { egitimTheme as educationTheme };
