// ============================================
// Restoran Teması - Ana Tema Dosyası
// Restoran ve kafe işletmeleri için - TR/EN destekli
// ============================================

import type { ThemeData } from '@/types/theme';
import { restoranHeader } from './header';
import { restoranFooter } from './footer';
import { homePage } from './pages/home';
import { aboutPage } from './pages/about';
import { contactPage } from './pages/contact';
import { menuPage } from './pages/menu';
import { galleryPage } from './pages/gallery';

const translations = {
    tr: {
        siteName: 'Lezzet Mutfağı',
        siteSlogan: 'Unutulmaz Lezzetler',
        heroTitle: 'Damağınıza Layık Lezzetler',
        heroSubtitle: 'Geleneksel tatların modern yorumu. Taze malzemeler, ustalık ve sevgi ile hazırlanan yemekler.',
        heroCta: 'Menümüzü İnceleyin',
        heroCtaSecondary: 'Rezervasyon Yap',
        menuTitle: 'Menümüz',
        menuSubtitle: 'Şeflerimizin özel tarifleri',
        categoryStarters: 'Başlangıçlar',
        categoryMains: 'Ana Yemekler',
        categoryDesserts: 'Tatlılar',
        categoryDrinks: 'İçecekler',
        aboutTitle: 'Hikayemiz',
        aboutText: '2010 yılından bu yana, geleneksel lezzetleri modern sunumlarla buluşturuyoruz.',
        reservationTitle: 'Rezervasyon',
        reservationSubtitle: 'Özel anlarınız için masanızı ayırtın',
        galleryTitle: 'Galeri',
        gallerySubtitle: 'Mekanımız ve lezzetlerimizden kareler',
        testimonialsTitle: 'Misafir Yorumları',
        testimonialsSubtitle: 'Lezzetlerimizi tadanlar ne diyor?',
        contactTitle: 'Bize Ulaşın',
        workingHours: 'Çalışma Saatleri',
        location: 'Konum',
    },
    en: {
        siteName: 'Taste Kitchen',
        siteSlogan: 'Unforgettable Flavors',
        heroTitle: 'Flavors Worthy of Your Palate',
        heroSubtitle: 'Modern interpretation of traditional tastes. Dishes prepared with fresh ingredients, skill, and love.',
        heroCta: 'View Our Menu',
        heroCtaSecondary: 'Make Reservation',
        menuTitle: 'Our Menu',
        menuSubtitle: 'Special recipes from our chefs',
        categoryStarters: 'Starters',
        categoryMains: 'Main Courses',
        categoryDesserts: 'Desserts',
        categoryDrinks: 'Drinks',
        aboutTitle: 'Our Story',
        aboutText: 'Since 2010, we have been combining traditional flavors with modern presentations.',
        reservationTitle: 'Reservation',
        reservationSubtitle: 'Book your table for special moments',
        galleryTitle: 'Gallery',
        gallerySubtitle: 'Shots from our venue and dishes',
        testimonialsTitle: 'Guest Reviews',
        testimonialsSubtitle: 'What our guests say about our flavors?',
        contactTitle: 'Contact Us',
        workingHours: 'Working Hours',
        location: 'Location',
    },
};

export const restoranTheme: ThemeData = {
    metadata: {
        id: 'theme-restoran',
        name: 'Restoran & Kafe',
        description: 'Restoran, kafe ve yeme-içme işletmeleri için profesyonel tema - TR/EN destekli',
        version: '1.0.0',
        thumbnail: '/themes/restaurant/preview.jpg',
        author: 'Page Builder',
        category: 'food',
        pages: [
            { slug: 'home', title: 'Ana Sayfa', file: 'pages/home.json' },
            { slug: 'menu', title: 'Menü', file: 'pages/menu.json' },
            { slug: 'about', title: 'Hakkımızda', file: 'pages/about.json' },
            { slug: 'gallery', title: 'Galeri', file: 'pages/gallery.json' },
            { slug: 'contact', title: 'İletişim', file: 'pages/contact.json' },
        ],
        settings: {
            primaryColor: '#d97706',
            secondaryColor: '#1a1a1a',
            accentColor: '#f59e0b',
            fontFamily: "'Playfair Display', serif",
            defaultLanguage: 'tr',
            translations: translations,
            header: restoranHeader,
            footer: restoranFooter,
            company: {
                name: 'Lezzet Mutfağı',
                slogan: 'Unutulmaz Lezzetler',
                logo: '/themes/restaurant/logo.svg',
            },
            contact: {
                email: 'info@lezzetmutfagi.com',
                phone: '+90 212 345 6789',
                address: 'Beyoğlu, İstiklal Cad. No: 123, İstanbul',
                mapUrl: 'https://maps.google.com/?q=41.0340,28.9770',
            },
            social: {
                facebook: 'https://facebook.com/lezzetmutfagi',
                instagram: 'https://instagram.com/lezzetmutfagi',
                twitter: 'https://twitter.com/lezzetmutfagi',
            },
            seo: {
                metaTitle: 'Lezzet Mutfağı | Restoran & Kafe - İstanbul Beyoğlu',
                metaDescription: 'Geleneksel Türk mutfağının modern yorumu. Taze malzemeler, usta şefler. Rezervasyon için hemen arayın!',
                metaKeywords: 'restoran, kafe, türk mutfağı, beyoğlu, istanbul, yemek, rezervasyon',
                googleAnalyticsId: '',
            },
            animations: {
                enabled: true,
                defaultType: 'fadeIn',
                defaultDuration: 600,
                staggerDelay: 100,
            },
        },
    },
    pages: {
        home: homePage,
        about: aboutPage,
        contact: contactPage,
        menu: menuPage,
        gallery: galleryPage,
    },
};

export { restoranTheme as restaurantTheme };
