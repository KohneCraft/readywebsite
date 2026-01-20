// ============================================
// Sağlık Teması - Ana Tema Dosyası
// Klinik, hastane ve sağlık kuruluşları için - TR/EN destekli
// ============================================

import type { ThemeData } from '@/types/theme';
import { saglikHeader } from './header';
import { saglikFooter } from './footer';
import { homePage } from './pages/home';
import { aboutPage } from './pages/about';
import { contactPage } from './pages/contact';
import { departmentsPage } from './pages/departments';

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
            { slug: 'about', title: 'Hakkımızda', file: 'pages/about.json' },
            { slug: 'contact', title: 'İletişim', file: 'pages/contact.json' },
        ],
        settings: {
            primaryColor: '#0369a1',
            secondaryColor: '#16a34a',
            accentColor: '#0ea5e9',
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
        about: aboutPage,
        contact: contactPage,
        departments: departmentsPage,
    },
};

export { saglikTheme as healthcareTheme };
