// ============================================
// Eğitim Teması - Footer Ayarları
// ============================================

export const egitimFooter = {
    type: 'multiColumn',
    backgroundColor: '#0f172a',
    textColor: '#e2e8f0',
    columns: [
        {
            title: 'Bilgi Akademi',
            content: '2005\'ten beri kaliteli eğitim.',
            type: 'text',
        },
        {
            title: 'Programlar',
            links: [
                { label: 'Dil Eğitimleri', href: '/programs/languages' },
                { label: 'Teknoloji', href: '/programs/technology' },
                { label: 'İşletme', href: '/programs/business' },
                { label: 'Tasarım', href: '/programs/design' },
            ],
            type: 'links',
        },
        {
            title: 'Hızlı Erişim',
            links: [
                { label: 'Kayıt Ol', href: '/enroll' },
                { label: 'Hakkımızda', href: '/about' },
                { label: 'İletişim', href: '/contact' },
            ],
            type: 'links',
        },
        {
            title: 'İletişim',
            content: 'info@bilgiakademi.com\n+90 212 567 8901',
            type: 'text',
        },
    ],
    copyright: '© 2024 Bilgi Akademi. Tüm hakları saklıdır.',
    socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com/bilgiakademi' },
        { platform: 'instagram', url: 'https://instagram.com/bilgiakademi' },
        { platform: 'linkedin', url: 'https://linkedin.com/company/bilgiakademi' },
    ],
};
