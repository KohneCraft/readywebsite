// ============================================
// E-Ticaret Teması - Footer Ayarları
// ============================================

export const eticaretFooter = {
    type: 'multiColumn',
    backgroundColor: '#0f172a',
    textColor: '#e2e8f0',
    columns: [
        {
            title: 'ShopStyle',
            content: '2018\'den beri modanın adresi.',
            type: 'text',
        },
        {
            title: 'Kategoriler',
            links: [
                { label: 'Kadın', href: '/shop?category=women' },
                { label: 'Erkek', href: '/shop?category=men' },
                { label: 'Aksesuar', href: '/shop?category=accessories' },
            ],
            type: 'links',
        },
        {
            title: 'Müşteri Hizmetleri',
            links: [
                { label: 'Sipariş Takibi', href: '/orders' },
                { label: 'İade Koşulları', href: '/returns' },
                { label: 'SSS', href: '/faq' },
            ],
            type: 'links',
        },
        {
            title: 'İletişim',
            content: 'destek@shopstyle.com\n0850 123 45 67',
            type: 'text',
        },
    ],
    copyright: '© 2024 ShopStyle. Tüm hakları saklıdır.',
    paymentIcons: ['visa', 'mastercard', 'amex', 'paypal'],
    socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com/shopstyle' },
        { platform: 'instagram', url: 'https://instagram.com/shopstyle' },
        { platform: 'twitter', url: 'https://twitter.com/shopstyle' },
    ],
};
