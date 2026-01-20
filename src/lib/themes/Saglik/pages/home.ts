// ============================================
// Sağlık Teması - Ana Sayfa
// ============================================

import type { ThemePageData } from '@/types/theme';

export const homePage: ThemePageData = {
    slug: 'home',
    title: 'Ana Sayfa',
    sections: [
        {
            name: 'Hero',
            settings: {
                backgroundColor: '#0369a1',
                backgroundImage: '/themes/healthcare/hero-bg.jpg',
                backgroundSize: 'cover',
                padding: { top: 120, right: 40, bottom: 120, left: 40 },
                minHeight: 600,
                overlay: { enabled: true, color: 'rgba(3, 105, 161, 0.85)' },
            },
            columns: [
                {
                    width: 60,
                    settings: { padding: { top: 40, right: 40, bottom: 40, left: 40 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'Profesyonel Sağlık Hizmetleri', fontSize: 52, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Uzman kadromuz ve modern altyapımız ile sağlığınız güvende. 7/24 acil hizmet.', fontSize: 20, color: '#e0f2fe', lineHeight: 1.6 } },
                        { type: 'button', props: { text: 'Randevu Al', link: '/appointment', style: 'primary', size: 'large', backgroundColor: '#16a34a' } },
                        { type: 'button', props: { text: 'Acil: 444 0 123', link: 'tel:4440123', style: 'outline', size: 'large', borderColor: '#ffffff', textColor: '#ffffff' } },
                    ],
                },
                {
                    width: 40,
                    settings: { padding: { top: 40, right: 40, bottom: 40, left: 40 } },
                    blocks: [],
                },
            ],
        },
        {
            name: 'Features',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🏥', fontSize: 42, color: '#0369a1' } },
                        { type: 'heading', props: { level: 'h4', content: 'Modern Altyapı', fontSize: 20, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Son teknoloji tıbbi cihazlar ve ekipmanlar', fontSize: 15, color: '#64748b' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '👨‍⚕️', fontSize: 42, color: '#0369a1' } },
                        { type: 'heading', props: { level: 'h4', content: 'Uzman Kadro', fontSize: 20, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Alanında deneyimli hekimler ve sağlık personeli', fontSize: 15, color: '#64748b' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🚑', fontSize: 42, color: '#0369a1' } },
                        { type: 'heading', props: { level: 'h4', content: '7/24 Acil', fontSize: 20, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Kesintisiz acil sağlık hizmeti', fontSize: 15, color: '#64748b' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '💊', fontSize: 42, color: '#0369a1' } },
                        { type: 'heading', props: { level: 'h4', content: 'Eczane', fontSize: 20, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Kapsamlı eczane hizmeti', fontSize: 15, color: '#64748b' } },
                    ]
                },
            ],
        },
    ],
};
