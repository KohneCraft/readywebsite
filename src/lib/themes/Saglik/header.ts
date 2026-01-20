// ============================================
// Sağlık Teması - Header
// ============================================

import type { NavItem } from '@/types/theme';

export const saglikHeader = {
    logo: '/themes/healthcare/logo.svg',
    logoText: 'Medikal Sağlık',
    navItems: [
        { href: '/', label: 'Ana Sayfa' },
        { href: '/departments', label: 'Branşlar' },
        { href: '/doctors', label: 'Doktorlarımız' },
        { href: '/about', label: 'Hakkımızda' },
        { href: '/contact', label: 'İletişim' },
    ] as NavItem[],
    backgroundColor: '#ffffff',
    textColor: '#0f172a',
    sticky: true,
    transparent: false,
    hoverOpenMenu: true,
    animation: { enabled: true, logoAnimation: 'fadeIn', navAnimation: 'slideDown', duration: 400 },
    glassmorphism: { enabled: true, blur: 10, opacity: 0.95 },
    ctaButton: {
        enabled: true,
        text: 'Online Randevu',
        href: '/appointment',
        className: 'bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg',
    },
    topBar: {
        enabled: true,
        phone: '444 0 123',
        emergency: 'Acil: 444 0 911',
        backgroundColor: '#0369a1',
        textColor: '#ffffff',
    },
};

export const saglikHeaderEN = {
    ...saglikHeader,
    logoText: 'Medical Health',
    navItems: [
        { href: '/', label: 'Home' },
        { href: '/departments', label: 'Departments' },
        { href: '/doctors', label: 'Our Doctors' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ] as NavItem[],
    ctaButton: { ...saglikHeader.ctaButton, text: 'Book Appointment' },
    topBar: { ...saglikHeader.topBar, emergency: 'Emergency: 444 0 911' },
};
