// ============================================
// Restoran Teması - Header
// Sıcak ve davetkar navigasyon
// ============================================

import type { NavItem } from '@/types/theme';

export const restoranHeader = {
    logo: '/themes/restaurant/logo.svg',
    logoText: 'Lezzet Mutfağı',
    navItems: [
        { href: '/', label: 'Ana Sayfa' },
        {
            href: '/menu',
            label: 'Menü',
            children: [
                { href: '/menu#starters', label: 'Başlangıçlar' },
                { href: '/menu#mains', label: 'Ana Yemekler' },
                { href: '/menu#desserts', label: 'Tatlılar' },
                { href: '/menu#drinks', label: 'İçecekler' },
            ]
        },
        { href: '/about', label: 'Hakkımızda' },
        { href: '/gallery', label: 'Galeri' },
        { href: '/contact', label: 'İletişim' },
    ] as NavItem[],
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
    sticky: true,
    transparent: false,
    hoverOpenMenu: true,
    animation: {
        enabled: true,
        logoAnimation: 'fadeIn',
        navAnimation: 'slideDown',
        duration: 400,
    },
    glassmorphism: {
        enabled: true,
        blur: 12,
        opacity: 0.85,
    },
    ctaButton: {
        enabled: true,
        text: 'Rezervasyon',
        href: '/reservation',
        className: 'bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg',
    },
    topBar: {
        enabled: true,
        phone: '+90 212 345 6789',
        hours: 'Her gün 11:00 - 23:00',
    },
};

export const restoranHeaderEN = {
    ...restoranHeader,
    logoText: 'Taste Kitchen',
    navItems: [
        { href: '/', label: 'Home' },
        {
            href: '/menu',
            label: 'Menu',
            children: [
                { href: '/menu#starters', label: 'Starters' },
                { href: '/menu#mains', label: 'Main Courses' },
                { href: '/menu#desserts', label: 'Desserts' },
                { href: '/menu#drinks', label: 'Drinks' },
            ]
        },
        { href: '/about', label: 'About' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/contact', label: 'Contact' },
    ] as NavItem[],
    ctaButton: {
        ...restoranHeader.ctaButton,
        text: 'Reservation',
    },
    topBar: {
        enabled: true,
        phone: '+90 212 345 6789',
        hours: 'Daily 11:00 - 23:00',
    },
};
