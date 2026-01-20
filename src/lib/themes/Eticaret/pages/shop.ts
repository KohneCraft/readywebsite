// ============================================
// E-Ticaret Teması - Mağaza Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const shopPage: ThemePageData = {
    slug: 'shop',
    title: 'Mağaza',
    sections: [
        {
            name: 'Page Hero',
            settings: {
                backgroundColor: '#0f172a',
                backgroundImage: '/themes/ecommerce/shop-hero.jpg',
                backgroundSize: 'cover',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
                overlay: { enabled: true, color: 'rgba(0,0,0,0.5)' },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'Mağaza', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Binlerce ürün, tek tıkla kapınızda', fontSize: 20, color: '#f472b6' } },
                    ],
                },
            ],
        },
        {
            name: 'Categories',
            settings: { backgroundColor: '#ffffff', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 10, bottom: 20, left: 10 } }, blocks: [
                        { type: 'image', props: { src: '/themes/ecommerce/women.jpg', alt: 'Kadın', width: '100%', borderRadius: '12px', height: '200px', objectFit: 'cover' } },
                        { type: 'heading', props: { level: 'h4', content: 'Kadın', fontSize: 20, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'button', props: { text: 'İncele', link: '/shop/women', style: 'outline', size: 'small' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 10, bottom: 20, left: 10 } }, blocks: [
                        { type: 'image', props: { src: '/themes/ecommerce/men.jpg', alt: 'Erkek', width: '100%', borderRadius: '12px', height: '200px', objectFit: 'cover' } },
                        { type: 'heading', props: { level: 'h4', content: 'Erkek', fontSize: 20, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'button', props: { text: 'İncele', link: '/shop/men', style: 'outline', size: 'small' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 10, bottom: 20, left: 10 } }, blocks: [
                        { type: 'image', props: { src: '/themes/ecommerce/kids.jpg', alt: 'Çocuk', width: '100%', borderRadius: '12px', height: '200px', objectFit: 'cover' } },
                        { type: 'heading', props: { level: 'h4', content: 'Çocuk', fontSize: 20, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'button', props: { text: 'İncele', link: '/shop/kids', style: 'outline', size: 'small' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 10, bottom: 20, left: 10 } }, blocks: [
                        { type: 'image', props: { src: '/themes/ecommerce/accessories.jpg', alt: 'Aksesuar', width: '100%', borderRadius: '12px', height: '200px', objectFit: 'cover' } },
                        { type: 'heading', props: { level: 'h4', content: 'Aksesuar', fontSize: 20, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'button', props: { text: 'İncele', link: '/shop/accessories', style: 'outline', size: 'small' } },
                    ]
                },
            ],
        },
        {
            name: 'Featured Products',
            settings: { backgroundColor: '#fdf2f8', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center', padding: { top: 0, right: 0, bottom: 40, left: 0 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '⭐ Öne Çıkan Ürünler', fontSize: 32, color: '#ec4899', fontWeight: 'bold' } },
                    ],
                },
            ],
        },
        {
            name: 'Products Grid',
            settings: { backgroundColor: '#fdf2f8', padding: { top: 0, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 10, right: 10, bottom: 10, left: 10 }, backgroundColor: '#ffffff', borderRadius: '12px' }, blocks: [
                        { type: 'image', props: { src: '/themes/ecommerce/product1.jpg', alt: 'Ürün 1', width: '100%', borderRadius: '8px' } },
                        { type: 'heading', props: { level: 'h5', content: 'Slim Fit Gömlek', fontSize: 16, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '₺349', fontSize: 18, color: '#ec4899', fontWeight: 'bold' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 10, right: 10, bottom: 10, left: 10 }, backgroundColor: '#ffffff', borderRadius: '12px' }, blocks: [
                        { type: 'image', props: { src: '/themes/ecommerce/product2.jpg', alt: 'Ürün 2', width: '100%', borderRadius: '8px' } },
                        { type: 'heading', props: { level: 'h5', content: 'Denim Ceket', fontSize: 16, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '₺599', fontSize: 18, color: '#ec4899', fontWeight: 'bold' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 10, right: 10, bottom: 10, left: 10 }, backgroundColor: '#ffffff', borderRadius: '12px' }, blocks: [
                        { type: 'image', props: { src: '/themes/ecommerce/product3.jpg', alt: 'Ürün 3', width: '100%', borderRadius: '8px' } },
                        { type: 'heading', props: { level: 'h5', content: 'Sneaker Ayakkabı', fontSize: 16, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '₺799', fontSize: 18, color: '#ec4899', fontWeight: 'bold' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 10, right: 10, bottom: 10, left: 10 }, backgroundColor: '#ffffff', borderRadius: '12px' }, blocks: [
                        { type: 'image', props: { src: '/themes/ecommerce/product4.jpg', alt: 'Ürün 4', width: '100%', borderRadius: '8px' } },
                        { type: 'heading', props: { level: 'h5', content: 'Deri Kemer', fontSize: 16, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '₺199', fontSize: 18, color: '#ec4899', fontWeight: 'bold' } },
                    ]
                },
            ],
        },
        {
            name: 'CTA',
            settings: { backgroundColor: '#ec4899', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 100, settings: { textAlign: 'center' }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🎉 Yeni Üyelere %15 İndirim!', fontSize: 28, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Kod: HOSGELDIN', fontSize: 18, color: '#ffffff' } },
                    ]
                },
            ],
        },
    ],
};
