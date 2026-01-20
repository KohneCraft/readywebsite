// ============================================
// E-Ticaret Teması - Ana Tema Dosyası
// Online mağaza ve e-ticaret siteleri için - TR/EN destekli
// ============================================

import type { ThemeData, ThemePageData } from '@/types/theme';
import { eticaretHeader } from './header';
import { eticaretFooter } from './footer';

const translations = {
    tr: {
        siteName: 'ShopStyle',
        siteSlogan: 'Tarzını Keşfet',
        heroTitle: 'Yeni Sezon Koleksiyonu',
        heroSubtitle: '%50\'ye varan indirimler! Tarzınızı yansıtan parçalar için alışverişe başlayın.',
        heroCta: 'Alışverişe Başla',
        heroCtaSecondary: 'Koleksiyonu Gör',
        categoriesTitle: 'Kategoriler',
        categoriesSubtitle: 'İhtiyacınız olan her şey bir tık uzağınızda',
        featuredTitle: 'Öne Çıkan Ürünler',
        featuredSubtitle: 'En çok tercih edilen ürünler',
        newArrivalsTitle: 'Yeni Gelenler',
        newArrivalsSubtitle: 'En yeni ürünlerimizi keşfedin',
        saleTitle: 'İndirimli Ürünler',
        saleSubtitle: 'Kaçırılmayacak fırsatlar',
        testimonialsTitle: 'Müşteri Yorumları',
        testimonialsSubtitle: 'Müşterilerimiz ne diyor?',
        cartTitle: 'Sepetim',
        wishlistTitle: 'Favorilerim',
        checkoutTitle: 'Ödeme',
        addToCart: 'Sepete Ekle',
        buyNow: 'Hemen Al',
        viewProduct: 'Ürünü İncele',
        freeShipping: 'Ücretsiz Kargo',
        securePayment: 'Güvenli Ödeme',
        easyReturn: 'Kolay İade',
        support247: '7/24 Destek',
    },
    en: {
        siteName: 'ShopStyle',
        siteSlogan: 'Discover Your Style',
        heroTitle: 'New Season Collection',
        heroSubtitle: 'Up to 50% off! Start shopping for pieces that reflect your style.',
        heroCta: 'Start Shopping',
        heroCtaSecondary: 'View Collection',
        categoriesTitle: 'Categories',
        categoriesSubtitle: 'Everything you need is just a click away',
        featuredTitle: 'Featured Products',
        featuredSubtitle: 'Most preferred products',
        newArrivalsTitle: 'New Arrivals',
        newArrivalsSubtitle: 'Discover our newest products',
        saleTitle: 'Sale Items',
        saleSubtitle: 'Unmissable deals',
        testimonialsTitle: 'Customer Reviews',
        testimonialsSubtitle: 'What our customers say?',
        cartTitle: 'My Cart',
        wishlistTitle: 'Wishlist',
        checkoutTitle: 'Checkout',
        addToCart: 'Add to Cart',
        buyNow: 'Buy Now',
        viewProduct: 'View Product',
        freeShipping: 'Free Shipping',
        securePayment: 'Secure Payment',
        easyReturn: 'Easy Returns',
        support247: '24/7 Support',
    },
};

const homePage: ThemePageData = {
    slug: 'home',
    title: 'Ana Sayfa',
    sections: [
        {
            name: 'Hero',
            settings: {
                backgroundColor: '#0f172a',
                backgroundImage: '/themes/ecommerce/hero-bg.jpg',
                backgroundSize: 'cover',
                padding: { top: 100, right: 40, bottom: 100, left: 40 },
                minHeight: 550,
                overlay: { enabled: true, color: 'rgba(0,0,0,0.4)' },
                animation: { enabled: true, type: 'fadeIn', duration: 700 },
            },
            columns: [
                {
                    width: 50,
                    settings: { padding: { top: 60, right: 40, bottom: 60, left: 40 } },
                    blocks: [
                        { type: 'text', props: { content: 'YENİ SEZON', fontSize: 14, color: '#f472b6', fontWeight: 'bold', letterSpacing: 4 } },
                        { type: 'heading', props: { level: 'h1', content: 'Tarzını Keşfet', fontSize: 56, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '%50\'ye varan indirimlerle alışverişe başlayın!', fontSize: 18, color: '#e2e8f0' } },
                        { type: 'button', props: { text: 'Alışverişe Başla', link: '/shop', style: 'primary', size: 'large', backgroundColor: '#ec4899', className: 'hover:bg-pink-600' } },
                    ],
                },
                { width: 50, settings: {}, blocks: [] },
            ],
        },
        {
            name: 'Features',
            settings: { backgroundColor: '#ffffff', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🚚', fontSize: 36 } },
                        { type: 'heading', props: { level: 'h4', content: 'Ücretsiz Kargo', fontSize: 18, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '500 TL üzeri siparişlerde', fontSize: 14, color: '#64748b' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🔒', fontSize: 36 } },
                        { type: 'heading', props: { level: 'h4', content: 'Güvenli Ödeme', fontSize: 18, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '256-bit SSL şifreleme', fontSize: 14, color: '#64748b' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '↩️', fontSize: 36 } },
                        { type: 'heading', props: { level: 'h4', content: 'Kolay İade', fontSize: 18, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '14 gün içinde ücretsiz iade', fontSize: 14, color: '#64748b' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '📞', fontSize: 36 } },
                        { type: 'heading', props: { level: 'h4', content: '7/24 Destek', fontSize: 18, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Her zaman yanınızdayız', fontSize: 14, color: '#64748b' } },
                    ]
                },
            ],
        },
    ],
};

export const eticaretTheme: ThemeData = {
    metadata: {
        id: 'theme-eticaret',
        name: 'Online Mağaza',
        description: 'E-ticaret ve online mağaza siteleri için zengin tema - TR/EN destekli',
        version: '1.0.0',
        thumbnail: '/themes/ecommerce/preview.jpg',
        author: 'Page Builder',
        category: 'ecommerce',
        pages: [
            { slug: 'home', title: 'Ana Sayfa', file: 'pages/home.json' },
            { slug: 'shop', title: 'Mağaza', file: 'pages/shop.json' },
            { slug: 'categories', title: 'Kategoriler', file: 'pages/categories.json' },
            { slug: 'sale', title: 'İndirimler', file: 'pages/sale.json' },
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
            company: { name: 'ShopStyle', slogan: 'Tarzını Keşfet', logo: '/themes/ecommerce/logo.svg' },
            contact: { email: 'destek@shopstyle.com', phone: '+90 850 123 4567', address: 'Fulya, Büyükdere Cad. No: 300, İstanbul', mapUrl: '' },
            social: { facebook: 'https://facebook.com/shopstyle', instagram: 'https://instagram.com/shopstyle', twitter: 'https://twitter.com/shopstyle' },
            seo: { metaTitle: 'ShopStyle | Online Moda Mağazası', metaDescription: 'En yeni moda trendleri, kaliteli ürünler ve uygun fiyatlarla online alışveriş. Ücretsiz kargo ve kolay iade.', metaKeywords: 'online alışveriş, moda, giyim, aksesuar, e-ticaret', googleAnalyticsId: '' },
            animations: { enabled: true, defaultType: 'zoomIn', defaultDuration: 400, staggerDelay: 50 },
        },
    },
    pages: { home: homePage },
};

export { eticaretTheme as ecommerceTheme };
