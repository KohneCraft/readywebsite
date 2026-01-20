// ============================================
// E-Ticaret Teması - Header
// ============================================

import type { NavItem } from '@/types/theme';

export const eticaretHeader = {
    logo: '/themes/ecommerce/logo.svg',
    logoText: 'ShopStyle',
    navItems: [
        { href: '/', label: 'Ana Sayfa' },
        {
            href: '/shop', label: 'Mağaza', children: [
                { href: '/shop/women', label: 'Kadın' },
                { href: '/shop/men', label: 'Erkek' },
                { href: '/shop/kids', label: 'Çocuk' },
                { href: '/shop/accessories', label: 'Aksesuar' },
            ]
        },
        { href: '/categories', label: 'Kategoriler' },
        { href: '/sale', label: 'İndirimler' },
        { href: '/about', label: 'Hakkımızda' },
        { href: '/contact', label: 'İletişim' },
    ] as NavItem[],
    backgroundColor: '#ffffff',
    textColor: '#0f172a',
    sticky: true,
    transparent: false,
    hoverOpenMenu: true,
    animation: { enabled: true, logoAnimation: 'fadeIn', navAnimation: 'slideDown', duration: 300 },
    glassmorphism: { enabled: true, blur: 12, opacity: 0.95 },
    // Sepet ve favoriler
    cartButton: { enabled: true, href: '/cart', icon: 'ShoppingBag', badgeColor: '#ec4899' },
    wishlistButton: { enabled: true, href: '/wishlist', icon: 'Heart' },
    searchButton: { enabled: true, placeholder: 'Ürün ara...' },
    // Promo bar
    promoBar: { enabled: true, text: '🎉 Yeni üyelere özel %15 indirim! Kod: HOSGELDIN', backgroundColor: '#ec4899', textColor: '#ffffff' },
};

export const eticaretHeaderEN = {
    ...eticaretHeader,
    navItems: [
        { href: '/', label: 'Home' },
        {
            href: '/shop', label: 'Shop', children: [
                { href: '/shop/women', label: 'Women' },
                { href: '/shop/men', label: 'Men' },
                { href: '/shop/kids', label: 'Kids' },
                { href: '/shop/accessories', label: 'Accessories' },
            ]
        },
        { href: '/categories', label: 'Categories' },
        { href: '/sale', label: 'Sale' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ] as NavItem[],
    searchButton: { enabled: true, placeholder: 'Search products...' },
    promoBar: { ...eticaretHeader.promoBar, text: '🎉 15% off for new members! Code: WELCOME' },
};
