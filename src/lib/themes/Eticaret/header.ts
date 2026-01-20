// ============================================
// E-Ticaret Teması - Header Ayarları
// ============================================

export const eticaretHeader = {
    type: 'ecommerce',
    backgroundColor: '#ffffff',
    textColor: '#0f172a',
    sticky: true,
    logoText: 'ShopStyle',
    logoImage: '/themes/ecommerce/logo.svg',
    navItems: [
        { label: 'Ana Sayfa', href: '/home' },
        { label: 'Mağaza', href: '/shop' },
        { label: 'Hakkımızda', href: '/about' },
        { label: 'İletişim', href: '/contact' },
    ],
    topBar: {
        enabled: true,
        content: '🚚 500₺ üzeri siparişlerde ücretsiz kargo!',
        backgroundColor: '#ec4899',
        textColor: '#ffffff',
    },
    showSearch: true,
    showCart: true,
    showWishlist: true,
    animation: {
        type: 'slideDown',
        duration: 300,
    },
};
