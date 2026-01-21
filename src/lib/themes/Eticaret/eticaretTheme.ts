// ============================================
// E-Ticaret Teması - Ana Tema Dosyası
// Online mağaza ve e-ticaret siteleri için - TR/EN destekli
// ============================================

import type { ThemeData } from '@/types/theme';
import { eticaretHeader } from './header';
import { eticaretFooter } from './footer';
import { homePage } from './pages/home';
import { aboutPage } from './pages/about';
import { contactPage } from './pages/contact';
import { shopPage } from './pages/shop';
import { womenPage } from './pages/women';
import { menPage } from './pages/men';
import { kidsPage } from './pages/kids';
import { accessoriesPage } from './pages/accessories';

const translations = {
    tr: {
        siteName: 'ShopStyle',
        siteSlogan: 'Tarzını Keşfet',
        heroTitle: 'Yeni Sezon Koleksiyonu',
        heroSubtitle: '%50\'ye varan indirimler! Tarzınızı yansıtan parçalar için alışverişe başlayın.',
        heroCta: 'Alışverişe Başla',
        heroCtaSecondary: 'Koleksiyonlar',
        shopTitle: 'Mağaza',
        shopSubtitle: 'Tüm ürünleri keşfedin',
        categoriesTitle: 'Kategoriler',
        newArrivalsTitle: 'Yeni Gelenler',
        bestSellersTitle: 'Çok Satanlar',
        saleTitle: 'İndirimler',
        aboutTitle: 'Hakkımızda',
        aboutText: '2018 yılından bu yana moda tutkusuyla sizlere hizmet veriyoruz.',
        contactTitle: 'İletişim',
        cartTitle: 'Sepet',
        wishlistTitle: 'Favoriler',
        accountTitle: 'Hesabım',
        ordersTitle: 'Siparişlerim',
    },
    en: {
        siteName: 'ShopStyle',
        siteSlogan: 'Discover Your Style',
        heroTitle: 'New Season Collection',
        heroSubtitle: 'Up to 50% off! Start shopping for pieces that reflect your style.',
        heroCta: 'Start Shopping',
        heroCtaSecondary: 'Collections',
        shopTitle: 'Shop',
        shopSubtitle: 'Explore all products',
        categoriesTitle: 'Categories',
        newArrivalsTitle: 'New Arrivals',
        bestSellersTitle: 'Best Sellers',
        saleTitle: 'Sale',
        aboutTitle: 'About Us',
        aboutText: 'We have been serving you with fashion passion since 2018.',
        contactTitle: 'Contact',
        cartTitle: 'Cart',
        wishlistTitle: 'Wishlist',
        accountTitle: 'My Account',
        ordersTitle: 'My Orders',
    },
};

export const eticaretTheme: ThemeData = {
    metadata: {
        id: 'theme-eticaret',
        name: 'Online Mağaza',
        description: 'E-ticaret ve online mağaza siteleri için profesyonel tema - TR/EN destekli',
        version: '1.0.0',
        thumbnail: '/themes/ecommerce/preview.jpg',
        author: 'Page Builder',
        category: 'ecommerce',
        pages: [
            { slug: 'home', title: 'Ana Sayfa', file: 'pages/home.json' },
            { slug: 'shop', title: 'Mağaza', file: 'pages/shop.json' },
            { slug: 'shop/women', title: 'Kadın', file: 'pages/women.json' },
            { slug: 'shop/men', title: 'Erkek', file: 'pages/men.json' },
            { slug: 'shop/kids', title: 'Çocuk', file: 'pages/kids.json' },
            { slug: 'shop/accessories', title: 'Aksesuarlar', file: 'pages/accessories.json' },
            { slug: 'about', title: 'Hakkımızda', file: 'pages/about.json' },
            { slug: 'contact', title: 'İletişim', file: 'pages/contact.json' },
        ],
        settings: {
            primaryColor: '#ec4899',
            secondaryColor: '#0f172a',
            accentColor: '#f472b6',
            fontFamily: "'Inter', sans-serif",
            defaultLanguage: 'tr',
            translations: translations,
            header: eticaretHeader,
            footer: eticaretFooter,
            company: {
                name: 'ShopStyle',
                slogan: 'Tarzını Keşfet',
                logo: '/themes/ecommerce/logo.svg',
            },
            contact: {
                email: 'destek@shopstyle.com',
                phone: '0850 123 45 67',
                address: 'Kadıköy, Moda Cad. No: 50, İstanbul',
                mapUrl: 'https://maps.google.com/?q=40.9876,29.0389',
            },
            social: {
                facebook: 'https://facebook.com/shopstyle',
                instagram: 'https://instagram.com/shopstyle',
                twitter: 'https://twitter.com/shopstyle',
                youtube: 'https://youtube.com/@shopstyle',
            },
            seo: {
                metaTitle: 'ShopStyle | Online Moda Mağazası - Türkiye',
                metaDescription: 'Kadın, erkek, çocuk giyim ve aksesuar. %50\'ye varan indirimler, ücretsiz kargo ve kolay iade.',
                metaKeywords: 'online alışveriş, moda, giyim, aksesuar, indirim, kadın, erkek, çocuk',
                googleAnalyticsId: '',
            },
            animations: {
                enabled: true,
                defaultType: 'fadeIn',
                defaultDuration: 400,
                staggerDelay: 60,
            },
        },
    },
    pages: {
        home: homePage,
        about: aboutPage,
        contact: contactPage,
        shop: shopPage,
        'shop/women': womenPage,
        'shop/men': menPage,
        'shop/kids': kidsPage,
        'shop/accessories': accessoriesPage,
    },
};

export { eticaretTheme as ecommerceTheme };
