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
import { appointmentPage } from './pages/appointment';
import { cardiologyPage } from './pages/cardiology';
import { orthopedicsPage } from './pages/orthopedics';
import { neurologyPage } from './pages/neurology';
import { ophthalmologyPage } from './pages/ophthalmology';

const translations = {
    tr: {
        siteName: 'Medikal Sağlık',
        siteSlogan: 'Sağlığınız Güvende',
        // Navbar
        nav: {
            home: 'Ana Sayfa',
            departments: 'Branşlar',
            doctors: 'Doktorlar',
            appointment: 'Randevu',
            about: 'Hakkımızda',
            contact: 'İletişim',
            emergency: 'Acil',
            cardiology: 'Kardiyoloji',
            orthopedics: 'Ortopedi',
            neurology: 'Nöroloji',
            ophthalmology: 'Göz Hastalıkları',
        },
        // Hero
        heroTitle: 'Profesyonel Sağlık Hizmetleri',
        heroSubtitle: 'Uzman kadromuz ve modern altyapımız ile sağlığınız güvende. 7/24 acil hizmet.',
        heroCta: 'Randevu Al',
        heroCtaSecondary: 'Doktorlarımız',
        // Hizmetler
        servicesTitle: 'Branşlarımız',
        servicesSubtitle: 'Kapsamlı sağlık hizmetleri',
        serviceCardiology: 'Kardiyoloji',
        serviceCardiologyDesc: 'Kalp ve damar sağlığı hizmetleri',
        serviceOrthopedics: 'Ortopedi',
        serviceOrthopedicsDesc: 'Kemik ve eklem tedavisi',
        serviceNeurology: 'Nöroloji',
        serviceNeurologyDesc: 'Sinir sistemi hastalıkları tedavisi',
        serviceOphthalmology: 'Göz Hastalıkları',
        serviceOphthalmologyDesc: 'Göz sağlığı ve tedavisi',
        // Doktorlar
        doctorsTitle: 'Uzman Kadromuz',
        doctorsSubtitle: 'Alanında deneyimli hekimler',
        viewAllDoctors: 'Tüm Doktorları Görüntüle',
        // Hakkımızda
        aboutTitle: 'Hakkımızda',
        aboutText: '2008 yılından bu yana modern tıp anlayışıyla hastalarımıza hizmet veriyoruz.',
        aboutPageTitle: 'Hakkımızda',
        ourMission: 'Misyonumuz',
        ourVision: 'Vizyonumuz',
        ourValues: 'Değerlerimiz',
        // Randevu
        appointmentTitle: 'Online Randevu',
        appointmentSubtitle: 'Hızlı ve kolay randevu sistemi',
        appointmentName: 'Ad Soyad',
        appointmentEmail: 'E-posta',
        appointmentPhone: 'Telefon',
        appointmentDepartment: 'Branş',
        appointmentDoctor: 'Doktor',
        appointmentDate: 'Tarih',
        appointmentTime: 'Saat',
        appointmentNotes: 'Notlar',
        appointmentSubmit: 'Randevu Al',
        // Referanslar
        testimonialsTitle: 'Hasta Yorumları',
        testimonialsSubtitle: 'Hastalarımızın deneyimleri',
        // Acil
        emergencyTitle: 'Acil Hizmet',
        emergencyPhone: '7/24 Acil',
        emergencyDesc: 'Acil durumlar için 7/24 hizmetinizdeyiz.',
        // Sigorta
        insuranceTitle: 'Anlaşmalı Kurumlar',
        insuranceSubtitle: 'Birçok özel sigorta ile anlaşmalıyız',
        // SSS
        faqTitle: 'Sık Sorulan Sorular',
        // İletişim
        contactPageTitle: 'İletişim',
        contactName: 'Ad Soyad',
        contactEmail: 'E-posta',
        contactPhone: 'Telefon',
        contactMessage: 'Mesajınız',
        contactSubmit: 'Gönder',
        contactAddress: 'Adres',
        contactWorkingHours: 'Çalışma Saatleri',
        // Footer
        footer: {
            description: 'Modern tıp anlayışıyla kaliteli sağlık hizmeti.',
            quickLinks: 'Hızlı Linkler',
            departments: 'Branşlarımız',
            contact: 'İletişim',
            home: 'Ana Sayfa',
            about: 'Hakkımızda',
            appointment: 'Randevu',
            emergency: 'Acil Servis',
            copyright: '© 2026 Medikal Sağlık. Tüm hakları saklıdır.',
            privacyPolicy: 'Gizlilik Politikası',
            termsOfUse: 'Kullanım Şartları',
        },
    },
    en: {
        siteName: 'Medical Health',
        siteSlogan: 'Your Health is Safe',
        // Navbar
        nav: {
            home: 'Home',
            departments: 'Departments',
            doctors: 'Doctors',
            appointment: 'Appointment',
            about: 'About',
            contact: 'Contact',
            emergency: 'Emergency',
            cardiology: 'Cardiology',
            orthopedics: 'Orthopedics',
            neurology: 'Neurology',
            ophthalmology: 'Ophthalmology',
        },
        // Hero
        heroTitle: 'Professional Health Services',
        heroSubtitle: 'Your health is safe with our expert staff and modern infrastructure. 24/7 emergency service.',
        heroCta: 'Book Appointment',
        heroCtaSecondary: 'Our Doctors',
        // Services
        servicesTitle: 'Our Departments',
        servicesSubtitle: 'Comprehensive health services',
        serviceCardiology: 'Cardiology',
        serviceCardiologyDesc: 'Heart and vascular health services',
        serviceOrthopedics: 'Orthopedics',
        serviceOrthopedicsDesc: 'Bone and joint treatment',
        serviceNeurology: 'Neurology',
        serviceNeurologyDesc: 'Nervous system disease treatment',
        serviceOphthalmology: 'Ophthalmology',
        serviceOphthalmologyDesc: 'Eye health and treatment',
        // Doctors
        doctorsTitle: 'Our Expert Team',
        doctorsSubtitle: 'Experienced physicians in their fields',
        viewAllDoctors: 'View All Doctors',
        // About
        aboutTitle: 'About Us',
        aboutText: 'We have been serving our patients with modern medical approach since 2008.',
        aboutPageTitle: 'About Us',
        ourMission: 'Our Mission',
        ourVision: 'Our Vision',
        ourValues: 'Our Values',
        // Appointment
        appointmentTitle: 'Online Appointment',
        appointmentSubtitle: 'Quick and easy appointment system',
        appointmentName: 'Full Name',
        appointmentEmail: 'Email',
        appointmentPhone: 'Phone',
        appointmentDepartment: 'Department',
        appointmentDoctor: 'Doctor',
        appointmentDate: 'Date',
        appointmentTime: 'Time',
        appointmentNotes: 'Notes',
        appointmentSubmit: 'Book Appointment',
        // Testimonials
        testimonialsTitle: 'Patient Reviews',
        testimonialsSubtitle: 'Experiences of our patients',
        // Emergency
        emergencyTitle: 'Emergency Service',
        emergencyPhone: '24/7 Emergency',
        emergencyDesc: 'We are at your service 24/7 for emergencies.',
        // Insurance
        insuranceTitle: 'Insurance Partners',
        insuranceSubtitle: 'We work with many private insurance companies',
        // FAQ
        faqTitle: 'FAQ',
        // Contact
        contactPageTitle: 'Contact',
        contactName: 'Full Name',
        contactEmail: 'Email',
        contactPhone: 'Phone',
        contactMessage: 'Your Message',
        contactSubmit: 'Submit',
        contactAddress: 'Address',
        contactWorkingHours: 'Working Hours',
        // Footer
        footer: {
            description: 'Quality healthcare with modern medical approach.',
            quickLinks: 'Quick Links',
            departments: 'Our Departments',
            contact: 'Contact',
            home: 'Home',
            about: 'About Us',
            appointment: 'Appointment',
            emergency: 'Emergency',
            copyright: '© 2026 Medical Health. All rights reserved.',
            privacyPolicy: 'Privacy Policy',
            termsOfUse: 'Terms of Use',
        },
    },
    de: {
        siteName: 'Medizin Gesundheit',
        siteSlogan: 'Ihre Gesundheit ist sicher',
        // Navbar
        nav: {
            home: 'Startseite',
            departments: 'Abteilungen',
            doctors: 'Ärzte',
            appointment: 'Termin',
            about: 'Über uns',
            contact: 'Kontakt',
            emergency: 'Notfall',
            cardiology: 'Kardiologie',
            orthopedics: 'Orthopädie',
            neurology: 'Neurologie',
            ophthalmology: 'Augenheilkunde',
        },
        // Hero
        heroTitle: 'Professionelle Gesundheitsdienste',
        heroSubtitle: 'Ihre Gesundheit ist bei unserem Expertenteam und moderner Infrastruktur sicher. 24/7 Notdienst.',
        heroCta: 'Termin buchen',
        heroCtaSecondary: 'Unsere Ärzte',
        // Dienstleistungen
        servicesTitle: 'Unsere Abteilungen',
        servicesSubtitle: 'Umfassende Gesundheitsdienste',
        serviceCardiology: 'Kardiologie',
        serviceCardiologyDesc: 'Herz- und Gefäßgesundheitsdienste',
        serviceOrthopedics: 'Orthopädie',
        serviceOrthopedicsDesc: 'Knochen- und Gelenkbehandlung',
        serviceNeurology: 'Neurologie',
        serviceNeurologyDesc: 'Behandlung von Erkrankungen des Nervensystems',
        serviceOphthalmology: 'Augenheilkunde',
        serviceOphthalmologyDesc: 'Augengesundheit und Behandlung',
        // Ärzte
        doctorsTitle: 'Unser Expertenteam',
        doctorsSubtitle: 'Erfahrene Ärzte in ihren Fachgebieten',
        viewAllDoctors: 'Alle Ärzte anzeigen',
        // Über uns
        aboutTitle: 'Über uns',
        aboutText: 'Wir betreuen unsere Patienten seit 2008 mit modernem medizinischen Ansatz.',
        aboutPageTitle: 'Über uns',
        ourMission: 'Unsere Mission',
        ourVision: 'Unsere Vision',
        ourValues: 'Unsere Werte',
        // Termin
        appointmentTitle: 'Online-Termin',
        appointmentSubtitle: 'Schnelles und einfaches Terminsystem',
        appointmentName: 'Vollständiger Name',
        appointmentEmail: 'E-Mail',
        appointmentPhone: 'Telefon',
        appointmentDepartment: 'Abteilung',
        appointmentDoctor: 'Arzt',
        appointmentDate: 'Datum',
        appointmentTime: 'Uhrzeit',
        appointmentNotes: 'Notizen',
        appointmentSubmit: 'Termin buchen',
        // Testimonials
        testimonialsTitle: 'Patientenbewertungen',
        testimonialsSubtitle: 'Erfahrungen unserer Patienten',
        // Notfall
        emergencyTitle: 'Notdienst',
        emergencyPhone: '24/7 Notfall',
        emergencyDesc: 'Wir sind 24/7 für Notfälle für Sie da.',
        // Versicherung
        insuranceTitle: 'Versicherungspartner',
        insuranceSubtitle: 'Wir arbeiten mit vielen privaten Versicherungen zusammen',
        // FAQ
        faqTitle: 'Häufige Fragen',
        // Kontakt
        contactPageTitle: 'Kontakt',
        contactName: 'Vollständiger Name',
        contactEmail: 'E-Mail',
        contactPhone: 'Telefon',
        contactMessage: 'Ihre Nachricht',
        contactSubmit: 'Absenden',
        contactAddress: 'Adresse',
        contactWorkingHours: 'Öffnungszeiten',
        // Footer
        footer: {
            description: 'Qualitätsgesundheitsversorgung mit modernem medizinischen Ansatz.',
            quickLinks: 'Schnelllinks',
            departments: 'Unsere Abteilungen',
            contact: 'Kontakt',
            home: 'Startseite',
            about: 'Über uns',
            appointment: 'Termin',
            emergency: 'Notdienst',
            copyright: '© 2026 Medizin Gesundheit. Alle Rechte vorbehalten.',
            privacyPolicy: 'Datenschutzrichtlinie',
            termsOfUse: 'Nutzungsbedingungen',
        },
    },
    fr: {
        siteName: 'Santé Médicale',
        siteSlogan: 'Votre santé est en sécurité',
        // Navbar
        nav: {
            home: 'Accueil',
            departments: 'Départements',
            doctors: 'Médecins',
            appointment: 'Rendez-vous',
            about: 'À propos',
            contact: 'Contact',
            emergency: 'Urgences',
            cardiology: 'Cardiologie',
            orthopedics: 'Orthopédie',
            neurology: 'Neurologie',
            ophthalmology: 'Ophtalmologie',
        },
        // Hero
        heroTitle: 'Services de santé professionnels',
        heroSubtitle: 'Votre santé est en sécurité avec notre équipe d\'experts et notre infrastructure moderne. Service d\'urgence 24h/24.',
        heroCta: 'Prendre rendez-vous',
        heroCtaSecondary: 'Nos médecins',
        // Services
        servicesTitle: 'Nos départements',
        servicesSubtitle: 'Services de santé complets',
        serviceCardiology: 'Cardiologie',
        serviceCardiologyDesc: 'Services de santé cardiaque et vasculaire',
        serviceOrthopedics: 'Orthopédie',
        serviceOrthopedicsDesc: 'Traitement des os et des articulations',
        serviceNeurology: 'Neurologie',
        serviceNeurologyDesc: 'Traitement des maladies du système nerveux',
        serviceOphthalmology: 'Ophtalmologie',
        serviceOphthalmologyDesc: 'Santé et traitement des yeux',
        // Médecins
        doctorsTitle: 'Notre équipe d\'experts',
        doctorsSubtitle: 'Médecins expérimentés dans leurs domaines',
        viewAllDoctors: 'Voir tous les médecins',
        // À propos
        aboutTitle: 'À propos de nous',
        aboutText: 'Nous servons nos patients avec une approche médicale moderne depuis 2008.',
        aboutPageTitle: 'À propos de nous',
        ourMission: 'Notre mission',
        ourVision: 'Notre vision',
        ourValues: 'Nos valeurs',
        // Rendez-vous
        appointmentTitle: 'Rendez-vous en ligne',
        appointmentSubtitle: 'Système de rendez-vous rapide et facile',
        appointmentName: 'Nom complet',
        appointmentEmail: 'Email',
        appointmentPhone: 'Téléphone',
        appointmentDepartment: 'Département',
        appointmentDoctor: 'Médecin',
        appointmentDate: 'Date',
        appointmentTime: 'Heure',
        appointmentNotes: 'Notes',
        appointmentSubmit: 'Prendre rendez-vous',
        // Témoignages
        testimonialsTitle: 'Avis patients',
        testimonialsSubtitle: 'Expériences de nos patients',
        // Urgences
        emergencyTitle: 'Service d\'urgence',
        emergencyPhone: 'Urgences 24h/24',
        emergencyDesc: 'Nous sommes à votre service 24h/24 pour les urgences.',
        // Assurance
        insuranceTitle: 'Partenaires d\'assurance',
        insuranceSubtitle: 'Nous travaillons avec de nombreuses compagnies d\'assurance',
        // FAQ
        faqTitle: 'FAQ',
        // Contact
        contactPageTitle: 'Contact',
        contactName: 'Nom complet',
        contactEmail: 'Email',
        contactPhone: 'Téléphone',
        contactMessage: 'Votre message',
        contactSubmit: 'Envoyer',
        contactAddress: 'Adresse',
        contactWorkingHours: 'Heures d\'ouverture',
        // Footer
        footer: {
            description: 'Soins de santé de qualité avec une approche médicale moderne.',
            quickLinks: 'Liens rapides',
            departments: 'Nos départements',
            contact: 'Contact',
            home: 'Accueil',
            about: 'À propos',
            appointment: 'Rendez-vous',
            emergency: 'Urgences',
            copyright: '© 2026 Santé Médicale. Tous droits réservés.',
            privacyPolicy: 'Politique de confidentialité',
            termsOfUse: 'Conditions d\'utilisation',
        },
    },
};

export const saglikTheme: ThemeData = {
    metadata: {
        id: 'theme-saglik',
        name: 'Sağlık & Klinik',
        description: 'Hastane, klinik ve sağlık kuruluşları için profesyonel tema - TR/EN destekli',
        version: '1.0.0',
        thumbnail: '/themes/saglik.png',
        author: 'Page Builder',
        category: 'medical',
        pages: [
            { slug: 'home', title: 'Ana Sayfa', file: 'pages/home.json' },
            { slug: 'departments', title: 'Branşlar', file: 'pages/departments.json' },
            { slug: 'appointment', title: 'Randevu', file: 'pages/appointment.json' },
            { slug: 'departments/cardiology', title: 'Kardiyoloji', file: 'pages/cardiology.json' },
            { slug: 'departments/orthopedics', title: 'Ortopedi', file: 'pages/orthopedics.json' },
            { slug: 'departments/neurology', title: 'Nöroloji', file: 'pages/neurology.json' },
            { slug: 'departments/ophthalmology', title: 'Göz Hastalıkları', file: 'pages/ophthalmology.json' },
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
        appointment: appointmentPage,
        'departments/cardiology': cardiologyPage,
        'departments/orthopedics': orthopedicsPage,
        'departments/neurology': neurologyPage,
        'departments/ophthalmology': ophthalmologyPage,
    },
};

export { saglikTheme as healthcareTheme };
