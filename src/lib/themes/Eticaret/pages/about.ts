// ============================================
// E-Ticaret Teması - Hakkımızda Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const aboutPage: ThemePageData = {
    slug: 'about',
    title: 'Hakkımızda',
    sections: [
        {
            name: 'Page Hero',
            settings: { backgroundColor: '#0f172a', padding: { top: 100, right: 40, bottom: 100, left: 40 } },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'Hakkımızda', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Tarzınızı keşfedin, kendinizi ifade edin', fontSize: 20, color: '#f472b6' } },
                    ],
                },
            ],
        },
        {
            name: 'About Content',
            settings: { backgroundColor: '#ffffff', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 50,
                    settings: { padding: { top: 20, right: 40, bottom: 20, left: 20 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: 'ShopStyle', fontSize: 36, color: '#ec4899', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'ShopStyle, 2018 yılında moda tutkusu ile kuruldu. Amacımız, herkesin kendi tarzını keşfetmesine ve uygun fiyatlarla kaliteli ürünlere ulaşmasına yardımcı olmak.', fontSize: 16, color: '#666666', lineHeight: 1.8 } },
                        { type: 'text', props: { content: 'Bugün, Türkiye\'nin dört bir yanına hizmet veren, 100.000\'den fazla müşteriye ulaşan güvenilir bir e-ticaret platformuyuz.', fontSize: 16, color: '#666666', lineHeight: 1.8 } },
                    ],
                },
                {
                    width: 50,
                    settings: { padding: { top: 20, right: 20, bottom: 20, left: 40 } },
                    blocks: [
                        { type: 'image', props: { src: '/themes/ecommerce/team.jpg', alt: 'Ekibimiz', width: '100%', borderRadius: '12px' } },
                    ],
                },
            ],
        },
        {
            name: 'Features',
            settings: { backgroundColor: '#fdf2f8', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🚚', fontSize: 42 } },
                        { type: 'heading', props: { level: 'h4', content: 'Hızlı Teslimat', fontSize: 18, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '1-3 iş günü içinde kapınızda', fontSize: 14, color: '#64748b' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '💰', fontSize: 42 } },
                        { type: 'heading', props: { level: 'h4', content: 'En İyi Fiyat', fontSize: 18, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Kaliteli ürünler, uygun fiyatlar', fontSize: 14, color: '#64748b' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🔄', fontSize: 42 } },
                        { type: 'heading', props: { level: 'h4', content: 'Kolay İade', fontSize: 18, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '14 gün içinde ücretsiz iade', fontSize: 14, color: '#64748b' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '💳', fontSize: 42 } },
                        { type: 'heading', props: { level: 'h4', content: 'Güvenli Ödeme', fontSize: 18, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'SSL ile korunan alışveriş', fontSize: 14, color: '#64748b' } },
                    ]
                },
            ],
        },
    ],
};
