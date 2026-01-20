// ============================================
// Eğitim Teması - Header
// ============================================

import type { NavItem } from '@/types/theme';

export const egitimHeader = {
    logo: '/themes/education/logo.svg',
    logoText: 'Bilgi Akademi',
    navItems: [
        { href: '/', label: 'Ana Sayfa' },
        {
            href: '/programs', label: 'Programlar', children: [
                { href: '/programs#language', label: 'Dil Eğitimi' },
                { href: '/programs#technology', label: 'Teknoloji' },
                { href: '/programs#business', label: 'İş Dünyası' },
                { href: '/programs#art', label: 'Sanat & Tasarım' },
            ]
        },
        { href: '/teachers', label: 'Eğitmenler' },
        { href: '/about', label: 'Hakkımızda' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'İletişim' },
    ] as NavItem[],
    backgroundColor: '#ffffff',
    textColor: '#1e293b',
    sticky: true,
    transparent: false,
    hoverOpenMenu: true,
    animation: { enabled: true, logoAnimation: 'fadeIn', navAnimation: 'slideDown', duration: 400 },
    glassmorphism: { enabled: true, blur: 10, opacity: 0.95 },
    ctaButton: { enabled: true, text: 'Kayıt Ol', href: '/enroll', className: 'bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg' },
};

export const egitimHeaderEN = {
    ...egitimHeader,
    logoText: 'Knowledge Academy',
    navItems: [
        { href: '/', label: 'Home' },
        {
            href: '/programs', label: 'Programs', children: [
                { href: '/programs#language', label: 'Language' },
                { href: '/programs#technology', label: 'Technology' },
                { href: '/programs#business', label: 'Business' },
                { href: '/programs#art', label: 'Art & Design' },
            ]
        },
        { href: '/teachers', label: 'Instructors' },
        { href: '/about', label: 'About' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contact' },
    ] as NavItem[],
    ctaButton: { ...egitimHeader.ctaButton, text: 'Enroll Now' },
};
