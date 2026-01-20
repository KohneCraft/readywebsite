// ============================================
// Sağlık Teması - Header Ayarları
// ============================================

export const saglikHeader = {
    type: 'standard',
    backgroundColor: '#0369a1',
    textColor: '#ffffff',
    sticky: true,
    logoText: 'Medikal Sağlık',
    logoImage: '/themes/healthcare/logo.svg',
    navItems: [
        { label: 'Ana Sayfa', href: '/home' },
        { label: 'Branşlar', href: '/departments' },
        { label: 'Hakkımızda', href: '/about' },
        { label: 'İletişim', href: '/contact' },
    ],
    ctaButton: {
        text: 'Randevu Al',
        href: '/contact',
        style: 'solid',
    },
    topBar: {
        enabled: true,
        content: '7/24 Acil: +90 444 0 123',
        backgroundColor: '#0c4a6e',
    },
    animation: {
        type: 'fadeIn',
        duration: 400,
    },
};
