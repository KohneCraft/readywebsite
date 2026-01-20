// ============================================
// E-Ticaret Teması - Footer
// ============================================

export const eticaretFooter = {
    logo: '/themes/ecommerce/logo.svg',
    logoText: 'ShopStyle',
    description: 'Tarzını keşfet! En yeni moda trendleri, kaliteli ürünler ve uygun fiyatlarla online alışveriş deneyimi.',

    shopLinks: [
        { href: '/shop/women', label: 'Kadın' },
        { href: '/shop/men', label: 'Erkek' },
        { href: '/shop/kids', label: 'Çocuk' },
        { href: '/shop/accessories', label: 'Aksesuar' },
        { href: '/sale', label: 'İndirimler' },
    ],

    helpLinks: [
        { href: '/help/shipping', label: 'Kargo Bilgileri' },
        { href: '/help/returns', label: 'İade & Değişim' },
        { href: '/help/payment', label: 'Ödeme Yöntemleri' },
        { href: '/help/faq', label: 'Sık Sorulan Sorular' },
        { href: '/help/size-guide', label: 'Beden Rehberi' },
    ],

    companyLinks: [
        { href: '/about', label: 'Hakkımızda' },
        { href: '/careers', label: 'Kariyer' },
        { href: '/contact', label: 'İletişim' },
        { href: '/stores', label: 'Mağazalarımız' },
    ],

    contactInfo: { email: 'destek@shopstyle.com', phone: '0850 123 45 67', workingHours: 'Pazartesi - Cumartesi: 09:00 - 21:00' },

    socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com/shopstyle', icon: 'Instagram' },
        { platform: 'facebook', url: 'https://facebook.com/shopstyle', icon: 'Facebook' },
        { platform: 'twitter', url: 'https://twitter.com/shopstyle', icon: 'Twitter' },
        { platform: 'pinterest', url: 'https://pinterest.com/shopstyle', icon: 'Pinterest' },
        { platform: 'tiktok', url: 'https://tiktok.com/@shopstyle', icon: 'TikTok' },
    ],

    newsletter: { enabled: true, title: 'İndirimlerden Haberdar Ol', subtitle: 'Abone olanlara özel %10 indirim!', placeholder: 'E-posta adresiniz', buttonText: 'Abone Ol', buttonClassName: 'bg-pink-500 hover:bg-pink-600' },

    paymentMethods: { enabled: true, title: 'Güvenli Ödeme', methods: ['visa', 'mastercard', 'amex', 'paypal', 'apple-pay', 'google-pay'] },

    appDownload: { enabled: true, title: 'Mobil Uygulama', appStore: '/images/app-store.png', playStore: '/images/google-play.png' },

    copyright: '© 2026 ShopStyle. Tüm hakları saklıdır.',
    legalLinks: [
        { href: '/privacy', label: 'Gizlilik Politikası' },
        { href: '/terms', label: 'Kullanım Koşulları' },
        { href: '/cookies', label: 'Çerez Politikası' },
        { href: '/kvkk', label: 'KVKK' },
    ],

    backgroundColor: '#0f172a',
    textColor: '#e2e8f0',
    accentColor: '#ec4899',
    animation: { enabled: true, type: 'fadeIn', staggerDelay: 80 },
    scrollToTop: { enabled: true, className: 'bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110' },
};

export const eticaretFooterEN = {
    ...eticaretFooter,
    description: 'Discover your style! Online shopping experience with the latest fashion trends, quality products, and affordable prices.',
    shopLinks: [
        { href: '/shop/women', label: 'Women' },
        { href: '/shop/men', label: 'Men' },
        { href: '/shop/kids', label: 'Kids' },
        { href: '/shop/accessories', label: 'Accessories' },
        { href: '/sale', label: 'Sale' },
    ],
    helpLinks: [
        { href: '/help/shipping', label: 'Shipping Info' },
        { href: '/help/returns', label: 'Returns & Exchange' },
        { href: '/help/payment', label: 'Payment Methods' },
        { href: '/help/faq', label: 'FAQ' },
        { href: '/help/size-guide', label: 'Size Guide' },
    ],
    companyLinks: [
        { href: '/about', label: 'About Us' },
        { href: '/careers', label: 'Careers' },
        { href: '/contact', label: 'Contact' },
        { href: '/stores', label: 'Our Stores' },
    ],
    contactInfo: { ...eticaretFooter.contactInfo, workingHours: 'Monday - Saturday: 09:00 - 21:00' },
    newsletter: { ...eticaretFooter.newsletter, title: 'Stay Updated on Deals', subtitle: '10% off for subscribers!', placeholder: 'Your email address', buttonText: 'Subscribe' },
    paymentMethods: { ...eticaretFooter.paymentMethods, title: 'Secure Payment' },
    appDownload: { ...eticaretFooter.appDownload, title: 'Mobile App' },
    copyright: '© 2026 ShopStyle. All rights reserved.',
    legalLinks: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Use' },
        { href: '/cookies', label: 'Cookie Policy' },
        { href: '/gdpr', label: 'GDPR' },
    ],
};
