// ============================================
// Sağlık Teması - Ana Tema Dosyası
// Klinik, hastane ve sağlık kuruluşları için - TR/EN destekli
// ============================================

import type { ThemeData, ThemePageData } from '@/types/theme';
import { saglikHeader } from './header';
import { saglikFooter } from './footer';

// Çeviriler
const translations = {
    tr: {
        siteName: 'Medikal Sağlık',
        siteSlogan: 'Sağlığınız Güvende',
        heroTitle: 'Profesyonel Sağlık Hizmetleri',
        heroSubtitle: 'Uzman kadromuz ve modern altyapımız ile sağlığınız güvende. 7/24 acil hizmet.',
        heroCta: 'Randevu Al',
        heroCtaSecondary: 'Doktorlarımız',
        servicesTitle: 'Branşlarımız',
        servicesSubtitle: 'Kapsamlı sağlık hizmetleri',
        doctorsTitle: 'Uzman Kadromuz',
        doctorsSubtitle: 'Alanında deneyimli hekimler',
        aboutTitle: 'Hakkımızda',
        aboutText: '2008 yılından bu yana modern tıp anlayışıyla hastalarımıza hizmet veriyoruz.',
        appointmentTitle: 'Online Randevu',
        appointmentSubtitle: 'Hızlı ve kolay randevu sistemi',
        testimonialsTitle: 'Hasta Yorumları',
        testimonialsSubtitle: 'Hastalarımızın deneyimleri',
        emergencyTitle: 'Acil Hizmet',
        emergencyPhone: '7/24 Acil',
        insuranceTitle: 'Anlaşmalı Kurumlar',
        faqTitle: 'Sık Sorulan Sorular',
    },
    en: {
        siteName: 'Medical Health',
        siteSlogan: 'Your Health is Safe',
        heroTitle: 'Professional Health Services',
        heroSubtitle: 'Your health is safe with our expert staff and modern infrastructure. 24/7 emergency service.',
        heroCta: 'Book Appointment',
        heroCtaSecondary: 'Our Doctors',
        servicesTitle: 'Our Departments',
        servicesSubtitle: 'Comprehensive health services',
        doctorsTitle: 'Our Expert Team',
        doctorsSubtitle: 'Experienced physicians in their fields',
        aboutTitle: 'About Us',
        aboutText: 'We have been serving our patients with modern medical approach since 2008.',
        appointmentTitle: 'Online Appointment',
        appointmentSubtitle: 'Quick and easy appointment system',
        testimonialsTitle: 'Patient Reviews',
        testimonialsSubtitle: 'Experiences of our patients',
        emergencyTitle: 'Emergency Service',
        emergencyPhone: '24/7 Emergency',
        insuranceTitle: 'Insurance Partners',
        faqTitle: 'FAQ',
    },
};

// Ana Sayfa
const homePage: ThemePageData = {
    slug: 'home',
    title: 'Ana Sayfa',
    sections: [
        {
            name: 'Hero',
            settings: {
                backgroundColor: '#0369a1',
                backgroundImage: '/themes/healthcare/hero-bg.jpg',
                backgroundSize: 'cover',
                padding: { top: 120, right: 40, bottom: 120, left: 40 },
                minHeight: 600,
                overlay: { enabled: true, color: 'rgba(3, 105, 161, 0.85)' },
                animation: { enabled: true, type: 'fadeIn', duration: 700 },
            },
            columns: [
                {
                    width: 60,
                    settings: { padding: { top: 40, right: 40, bottom: 40, left: 40 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'Profesyonel Sağlık Hizmetleri', fontSize: 52, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Uzman kadromuz ve modern altyapımız ile sağlığınız güvende. 7/24 acil hizmet.', fontSize: 20, color: '#e0f2fe', lineHeight: 1.6 } },
                        { type: 'button', props: { text: 'Randevu Al', link: '/appointment', style: 'primary', size: 'large', backgroundColor: '#16a34a' } },
                        { type: 'button', props: { text: 'Acil: 444 0 123', link: 'tel:4440123', style: 'outline', size: 'large', borderColor: '#ffffff', textColor: '#ffffff' } },
                    ],
                },
                {
                    width: 40,
                    settings: { padding: { top: 40, right: 40, bottom: 40, left: 40 } },
                    blocks: [],
                },
            ],
        },
        {
            name: 'Features',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
                animation: { enabled: true, type: 'slideUp', duration: 600 },
            },
            columns: [
                {
                    width: 25,
                    settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🏥', fontSize: 42, color: '#0369a1' } },
                        { type: 'heading', props: { level: 'h4', content: 'Modern Altyapı', fontSize: 20, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Son teknoloji tıbbi cihazlar', fontSize: 15, color: '#64748b' } },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '👨‍⚕️', fontSize: 42, color: '#0369a1' } },
                        { type: 'heading', props: { level: 'h4', content: 'Uzman Kadro', fontSize: 20, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Alanında deneyimli hekimler', fontSize: 15, color: '#64748b' } },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🚑', fontSize: 42, color: '#0369a1' } },
                        { type: 'heading', props: { level: 'h4', content: '7/24 Acil', fontSize: 20, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Kesintisiz acil hizmet', fontSize: 15, color: '#64748b' } },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '💊', fontSize: 42, color: '#0369a1' } },
                        { type: 'heading', props: { level: 'h4', content: 'Eczane', fontSize: 20, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Kapsamlı eczane hizmeti', fontSize: 15, color: '#64748b' } },
                    ],
                },
            ],
        },
    ],
};

export const saglikTheme: ThemeData = {
    metadata: {
        id: 'theme-saglik',
        name: 'Sağlık & Klinik',
        description: 'Hastane, klinik ve sağlık kuruluşları için profesyonel tema - TR/EN destekli',
        version: '1.0.0',
        thumbnail: '/themes/healthcare/preview.jpg',
        author: 'Page Builder',
        category: 'medical',
        pages: [
            { slug: 'home', title: 'Ana Sayfa', file: 'pages/home.json' },
            { slug: 'departments', title: 'Branşlar', file: 'pages/departments.json' },
            { slug: 'doctors', title: 'Doktorlarımız', file: 'pages/doctors.json' },
            { slug: 'appointment', title: 'Randevu', file: 'pages/appointment.json' },
            { slug: 'about', title: 'Hakkımızda', file: 'pages/about.json' },
            { slug: 'contact', title: 'İletişim', file: 'pages/contact.json' },
        ],
        settings: {
            primaryColor: '#0369a1', // Sky-700
            secondaryColor: '#16a34a', // Green-600
            accentColor: '#0ea5e9', // Sky-500
            fontFamily: "'Inter', sans-serif",
            defaultLanguage: 'tr',
            translations: translations,
            header: saglikHeader,
            footer: saglikFooter,
            company: {
                name: 'Medikal Sağlık',
                slogan: 'Sağlığınız Güvende',
                logo: '/themes/healthcare/logo.svg',
            },
            contact: {
                email: 'info@medikalsaglik.com',
                phone: '+90 444 0 123',
                address: 'Şişli, Büyükdere Cad. No: 100, İstanbul',
                mapUrl: 'https://maps.google.com/?q=41.0650,28.9950',
            },
            social: {
                facebook: 'https://facebook.com/medikalsaglik',
                instagram: 'https://instagram.com/medikalsaglik',
                youtube: 'https://youtube.com/@medikalsaglik',
                linkedin: 'https://linkedin.com/company/medikalsaglik',
            },
            seo: {
                metaTitle: 'Medikal Sağlık | Hastane & Klinik - İstanbul',
                metaDescription: 'Modern altyapı, uzman kadro ve 7/24 acil hizmet. Online randevu alın, sağlığınızı güvence altına alın.',
                metaKeywords: 'hastane, klinik, sağlık, doktor, randevu, istanbul, acil',
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
    },
};

export { saglikTheme as healthcareTheme };
