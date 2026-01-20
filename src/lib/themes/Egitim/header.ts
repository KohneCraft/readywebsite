// ============================================
// Eğitim Teması - Header Ayarları
// ============================================

export const egitimHeader = {
    type: 'standard',
    backgroundColor: '#1e40af',
    textColor: '#ffffff',
    sticky: true,
    logoText: 'Bilgi Akademi',
    logoImage: '/themes/education/logo.svg',
    navItems: [
        { label: 'Ana Sayfa', href: '/home' },
        { label: 'Programlar', href: '/programs' },
        { label: 'Hakkımızda', href: '/about' },
        { label: 'İletişim', href: '/contact' },
    ],
    ctaButton: {
        text: 'Kayıt Ol',
        href: '/contact',
        style: 'solid',
    },
    animation: {
        type: 'fadeIn',
        duration: 400,
    },
};
