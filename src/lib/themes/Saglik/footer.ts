// ============================================
// Sağlık Teması - Footer Ayarları
// ============================================

export const saglikFooter = {
    type: 'multiColumn',
    backgroundColor: '#0c4a6e',
    textColor: '#e0f2fe',
    columns: [
        {
            title: 'Medikal Sağlık',
            content: 'Modern tıp anlayışı ile hizmetinizdeyiz.',
            type: 'text',
        },
        {
            title: 'Branşlarımız',
            links: [
                { label: 'Kardiyoloji', href: '/departments/cardiology' },
                { label: 'Ortopedi', href: '/departments/orthopedics' },
                { label: 'Nöroloji', href: '/departments/neurology' },
                { label: 'Göz Hastalıkları', href: '/departments/ophthalmology' },
            ],
            type: 'links',
        },
        {
            title: 'Hizmetler',
            links: [
                { label: 'Randevu Al', href: '/appointment' },
                { label: 'Hakkımızda', href: '/about' },
                { label: 'İletişim', href: '/contact' },
            ],
            type: 'links',
        },
        {
            title: 'İletişim',
            content: 'info@medikalsaglik.com\n+90 444 0 123',
            type: 'text',
        },
    ],
    copyright: '© 2024 Medikal Sağlık. Tüm hakları saklıdır.',
    socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com/medikalsaglik' },
        { platform: 'instagram', url: 'https://instagram.com/medikalsaglik' },
        { platform: 'linkedin', url: 'https://linkedin.com/company/medikalsaglik' },
    ],
};
