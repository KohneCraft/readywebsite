// ============================================
// Restoran Teması - Menü Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const menuPage: ThemePageData = {
    slug: 'menu',
    title: 'Menü',
    sections: [
        // Hero
        {
            name: 'Page Hero',
            settings: {
                backgroundColor: '#1a1a1a',
                backgroundImage: '/themes/restaurant/menu-hero.jpg',
                backgroundSize: 'cover',
                padding: { top: 100, right: 40, bottom: 100, left: 40 },
                minHeight: 350,
                overlay: { enabled: true, color: 'rgba(0,0,0,0.7)' },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'Menümüz', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Şeflerimizin özenle hazırladığı lezzetler', fontSize: 20, color: '#e0e0e0' } },
                    ],
                },
            ],
        },
        // Başlangıçlar
        {
            name: 'Starters',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 40, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center', padding: { top: 0, right: 0, bottom: 40, left: 0 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '🥗 Başlangıçlar', fontSize: 36, color: '#d97706', fontWeight: 'bold' } },
                    ],
                },
            ],
        },
        {
            name: 'Starters Items',
            settings: { backgroundColor: '#ffffff', padding: { top: 0, right: 40, bottom: 40, left: 40 } },
            columns: [
                {
                    width: 50, settings: { padding: { top: 10, right: 20, bottom: 10, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h4', content: 'Meze Tabağı', fontSize: 20, color: '#1a1a1a', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Humus, babaganuş, patlıcan salatası, atom, acılı ezme', fontSize: 14, color: '#666666' } },
                        { type: 'text', props: { content: '₺185', fontSize: 18, color: '#d97706', fontWeight: 'bold' } },
                    ]
                },
                {
                    width: 50, settings: { padding: { top: 10, right: 20, bottom: 10, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h4', content: 'Sigara Böreği', fontSize: 20, color: '#1a1a1a', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Ev yapımı, peynirli, 6 adet', fontSize: 14, color: '#666666' } },
                        { type: 'text', props: { content: '₺95', fontSize: 18, color: '#d97706', fontWeight: 'bold' } },
                    ]
                },
            ],
        },
        // Ana Yemekler
        {
            name: 'Main Courses',
            settings: {
                backgroundColor: '#f8f8f8',
                padding: { top: 60, right: 40, bottom: 40, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center', padding: { top: 0, right: 0, bottom: 40, left: 0 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '🍖 Ana Yemekler', fontSize: 36, color: '#d97706', fontWeight: 'bold' } },
                    ],
                },
            ],
        },
        {
            name: 'Main Items',
            settings: { backgroundColor: '#f8f8f8', padding: { top: 0, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 50, settings: { padding: { top: 10, right: 20, bottom: 10, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h4', content: 'Kuzu Tandır', fontSize: 20, color: '#1a1a1a', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Fırında yavaş pişirilmiş kuzu, pilav ve salata ile', fontSize: 14, color: '#666666' } },
                        { type: 'text', props: { content: '₺385', fontSize: 18, color: '#d97706', fontWeight: 'bold' } },
                    ]
                },
                {
                    width: 50, settings: { padding: { top: 10, right: 20, bottom: 10, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h4', content: 'Levrek Izgara', fontSize: 20, color: '#1a1a1a', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Taze levrek, sebze garnitürü ile', fontSize: 14, color: '#666666' } },
                        { type: 'text', props: { content: '₺345', fontSize: 18, color: '#d97706', fontWeight: 'bold' } },
                    ]
                },
            ],
        },
        // CTA
        {
            name: 'CTA',
            settings: { backgroundColor: '#d97706', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 100, settings: { textAlign: 'center' }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: 'Masanızı Ayırtın', fontSize: 32, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'button', props: { text: 'Rezervasyon Yap', link: '/contact', style: 'primary', size: 'large', backgroundColor: '#1a1a1a' } },
                    ]
                },
            ],
        },
    ],
};
