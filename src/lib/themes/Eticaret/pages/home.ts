// ============================================
// E-Ticaret Teması - Ana Sayfa
// ============================================

import type { ThemePageData } from '@/types/theme';

export const homePage: ThemePageData = {
    slug: 'home',
    title: 'Ana Sayfa',
    sections: [
        {
            name: 'Hero',
            settings: {
                backgroundColor: '#0f172a',
                backgroundImage: '/themes/ecommerce/hero-bg.jpg',
                backgroundSize: 'cover',
                padding: { top: 100, right: 40, bottom: 100, left: 40 },
                minHeight: 550,
                overlay: { enabled: true, color: 'rgba(0,0,0,0.4)' },
            },
            columns: [
                {
                    width: 50,
                    settings: { padding: { top: 60, right: 40, bottom: 60, left: 40 } },
                    blocks: [
                        { type: 'text', props: { content: 'YENİ SEZON', fontSize: 14, color: '#f472b6', fontWeight: 'bold' } },
                        { type: 'heading', props: { level: 'h1', content: 'Tarzını Keşfet', fontSize: 56, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '%50\'ye varan indirimlerle alışverişe başlayın!', fontSize: 18, color: '#e2e8f0' } },
                        { type: 'button', props: { text: 'Alışverişe Başla', link: '/shop', style: 'primary', size: 'large', backgroundColor: '#ec4899' } },
                    ],
                },
                { width: 50, settings: {}, blocks: [] },
            ],
        },
        {
            name: 'Features',
            settings: { backgroundColor: '#ffffff', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🚚', fontSize: 36 } },
                        { type: 'heading', props: { level: 'h4', content: 'Ücretsiz Kargo', fontSize: 18, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '500 TL üzeri siparişlerde', fontSize: 14, color: '#64748b' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🔒', fontSize: 36 } },
                        { type: 'heading', props: { level: 'h4', content: 'Güvenli Ödeme', fontSize: 18, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '256-bit SSL şifreleme', fontSize: 14, color: '#64748b' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '↩️', fontSize: 36 } },
                        { type: 'heading', props: { level: 'h4', content: 'Kolay İade', fontSize: 18, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '14 gün içinde ücretsiz iade', fontSize: 14, color: '#64748b' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '📞', fontSize: 36 } },
                        { type: 'heading', props: { level: 'h4', content: '7/24 Destek', fontSize: 18, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Her zaman yanınızdayız', fontSize: 14, color: '#64748b' } },
                    ]
                },
            ],
        },
    ],
};
