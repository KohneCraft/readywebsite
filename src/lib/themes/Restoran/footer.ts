// ============================================
// Restoran Teması - Footer
// Zengin iletişim ve çalışma saatleri
// ============================================

export const restoranFooter = {
    logo: '/themes/restaurant/logo.svg',
    logoText: 'Lezzet Mutfağı',
    description: 'Geleneksel Türk mutfağının modern yorumu. Taze malzemeler, uzman şefler ve sıcak atmosfer ile unutulmaz bir lezzet deneyimi.',

    quickLinks: [
        { href: '/', label: 'Ana Sayfa' },
        { href: '/menu', label: 'Menü' },
        { href: '/about', label: 'Hakkımızda' },
        { href: '/gallery', label: 'Galeri' },
        { href: '/reservation', label: 'Rezervasyon' },
        { href: '/contact', label: 'İletişim' },
    ],

    // Çalışma saatleri
    workingHours: {
        enabled: true,
        title: 'Çalışma Saatleri',
        items: [
            { day: 'Pazartesi - Perşembe', hours: '11:00 - 22:00' },
            { day: 'Cuma - Cumartesi', hours: '11:00 - 23:00' },
            { day: 'Pazar', hours: '12:00 - 22:00' },
        ],
    },

    contactInfo: {
        address: 'Beyoğlu, İstiklal Cad. No: 123\nİstanbul, Türkiye 34430',
        phone: '+90 212 345 6789',
        email: 'info@lezzetmutfagi.com',
    },

    socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com/lezzetmutfagi', icon: 'Instagram' },
        { platform: 'facebook', url: 'https://facebook.com/lezzetmutfagi', icon: 'Facebook' },
        { platform: 'tripadvisor', url: 'https://tripadvisor.com/lezzetmutfagi', icon: 'Star' },
    ],

    newsletter: {
        enabled: true,
        title: 'Özel Teklifler',
        subtitle: 'Kampanya ve etkinliklerden haberdar olun',
        placeholder: 'E-posta adresiniz',
        buttonText: 'Abone Ol',
    },

    // Ödeme yöntemleri
    payments: {
        enabled: true,
        title: 'Ödeme Yöntemleri',
        methods: ['visa', 'mastercard', 'amex', 'cash'],
    },

    copyright: '© 2026 Lezzet Mutfağı. Tüm hakları saklıdır.',
    legalLinks: [
        { href: '/privacy', label: 'Gizlilik' },
        { href: '/terms', label: 'Şartlar' },
    ],

    backgroundColor: '#1a1a1a',
    textColor: '#f5f5f5',
    accentColor: '#d97706',

    animation: {
        enabled: true,
        type: 'fadeIn',
        staggerDelay: 100,
    },

    scrollToTop: {
        enabled: true,
        className: 'bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110',
    },
};

export const restoranFooterEN = {
    ...restoranFooter,
    logoText: 'Taste Kitchen',
    description: 'Modern interpretation of traditional Turkish cuisine. An unforgettable taste experience with fresh ingredients, expert chefs, and warm atmosphere.',
    quickLinks: [
        { href: '/', label: 'Home' },
        { href: '/menu', label: 'Menu' },
        { href: '/about', label: 'About' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/reservation', label: 'Reservation' },
        { href: '/contact', label: 'Contact' },
    ],
    workingHours: {
        enabled: true,
        title: 'Opening Hours',
        items: [
            { day: 'Monday - Thursday', hours: '11:00 - 22:00' },
            { day: 'Friday - Saturday', hours: '11:00 - 23:00' },
            { day: 'Sunday', hours: '12:00 - 22:00' },
        ],
    },
    newsletter: {
        ...restoranFooter.newsletter,
        title: 'Special Offers',
        subtitle: 'Stay updated with campaigns and events',
        placeholder: 'Your email address',
        buttonText: 'Subscribe',
    },
    payments: {
        ...restoranFooter.payments,
        title: 'Payment Methods',
    },
    copyright: '© 2026 Taste Kitchen. All rights reserved.',
    legalLinks: [
        { href: '/privacy', label: 'Privacy' },
        { href: '/terms', label: 'Terms' },
    ],
};
