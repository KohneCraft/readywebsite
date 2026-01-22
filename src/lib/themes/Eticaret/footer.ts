// ============================================
// E-Ticaret Teması - Footer Ayarları
// ============================================

export const eticaretFooter = {
    // Logo ve açıklama
    logo: '/themes/eticaret/logo.svg',
    logoText: 'ShopStyle',
    description: '2018\'den beri modanın adresi. En yeni trendleri en uygun fiyatlarla sizlerle buluşturuyoruz.',

    // Hızlı linkler
    quickLinks: [
        { href: '/', label: 'Ana Sayfa' },
        { href: '/about', label: 'Hakkımızda' },
        { href: '/shop', label: 'Mağaza' },
        { href: '/contact', label: 'İletişim' },
    ],

    // Kategori linkleri
    serviceLinks: [
        { href: '/shop/women', label: 'Kadın' },
        { href: '/shop/men', label: 'Erkek' },
        { href: '/shop/kids', label: 'Çocuk' },
        { href: '/shop/accessories', label: 'Aksesuar' },
    ],

    // Müşteri hizmetleri
    supportLinks: [
        { href: '/orders', label: 'Sipariş Takibi' },
        { href: '/returns', label: 'İade Koşulları' },
        { href: '/faq', label: 'SSS' },
        { href: '/size-guide', label: 'Beden Rehberi' },
    ],

    // İletişim bilgileri
    contactInfo: {
        address: 'Nişantaşı, Abdi İpekçi Caddesi No: 78\nİstanbul, Türkiye 34367',
        phone: '0850 123 45 67',
        email: 'destek@shopstyle.com',
        workingHours: 'Her gün: 09:00 - 22:00',
    },

    // Sosyal medya linkleri
    socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com/shopstyle', icon: 'Facebook' },
        { platform: 'instagram', url: 'https://instagram.com/shopstyle', icon: 'Instagram' },
        { platform: 'twitter', url: 'https://twitter.com/shopstyle', icon: 'Twitter' },
        { platform: 'tiktok', url: 'https://tiktok.com/@shopstyle', icon: 'Tiktok' },
    ],

    // Newsletter
    newsletter: {
        enabled: true,
        title: 'İndirimlerden Haberdar Olun',
        subtitle: 'Yeni koleksiyonlar ve özel kampanyalar için kayıt olun.',
        placeholder: 'E-posta adresiniz',
        buttonText: 'Abone Ol',
    },

    // Ödeme ikonları
    paymentIcons: ['visa', 'mastercard', 'amex', 'paypal', 'troy'],

    // Alt kısım
    copyright: '© 2026 ShopStyle. Tüm hakları saklıdır.',
    legalLinks: [
        { href: '/privacy', label: 'Gizlilik Politikası' },
        { href: '/terms', label: 'Kullanım Şartları' },
        { href: '/returns', label: 'İade Politikası' },
        { href: '/kvkk', label: 'KVKK' },
    ],

    // Stil
    backgroundColor: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
    textColor: '#e2e8f0',
    accentColor: '#f472b6',

    // Animasyonlar
    animation: {
        enabled: true,
        type: 'fadeIn',
        staggerDelay: 100,
    },

    // Scroll to top butonu
    scrollToTop: {
        enabled: true,
        className: 'bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110',
    },
};

// İngilizce footer
export const eticaretFooterEN = {
    ...eticaretFooter,
    logoText: 'ShopStyle',
    description: 'The fashion destination since 2018. We bring you the latest trends at the best prices.',
    quickLinks: [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/shop', label: 'Shop' },
        { href: '/contact', label: 'Contact' },
    ],
    serviceLinks: [
        { href: '/shop/women', label: 'Women' },
        { href: '/shop/men', label: 'Men' },
        { href: '/shop/kids', label: 'Kids' },
        { href: '/shop/accessories', label: 'Accessories' },
    ],
    supportLinks: [
        { href: '/orders', label: 'Order Tracking' },
        { href: '/returns', label: 'Return Policy' },
        { href: '/faq', label: 'FAQ' },
        { href: '/size-guide', label: 'Size Guide' },
    ],
    contactInfo: {
        ...eticaretFooter.contactInfo,
        workingHours: 'Everyday: 09:00 - 22:00',
    },
    newsletter: {
        ...eticaretFooter.newsletter,
        title: 'Get Discount Updates',
        subtitle: 'Sign up for new collections and special offers.',
        placeholder: 'Your email address',
        buttonText: 'Subscribe',
    },
    copyright: '© 2026 ShopStyle. All rights reserved.',
    legalLinks: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Use' },
        { href: '/returns', label: 'Return Policy' },
        { href: '/gdpr', label: 'GDPR' },
    ],
};
