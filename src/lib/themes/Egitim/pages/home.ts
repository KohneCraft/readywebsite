// ============================================
// Eğitim Teması - Ana Sayfa
// ============================================

import type { ThemePageData } from '@/types/theme';

export const homePage: ThemePageData = {
    slug: 'home',
    title: 'Ana Sayfa',
    sections: [
        {
            name: 'Hero',
            settings: {
                backgroundColor: '#1e40af',
                backgroundImage: '/themes/education/hero-bg.jpg',
                backgroundSize: 'cover',
                padding: { top: 120, right: 40, bottom: 120, left: 40 },
                minHeight: 600,
                overlay: { enabled: true, color: 'rgba(30, 64, 175, 0.9)' },
            },
            columns: [
                {
                    width: 60,
                    settings: { padding: { top: 40, right: 40, bottom: 40, left: 40 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'Hayallerine Ulaşmanın Yolu', fontSize: 52, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Uzman eğitim kadromuz ile kariyer hedeflerinize ulaşın. 50+ program, 10.000+ mezun.', fontSize: 20, color: '#dbeafe', lineHeight: 1.6 } },
                        { type: 'button', props: { text: 'Programları İncele', link: '/programs', style: 'primary', size: 'large', backgroundColor: '#f59e0b' } },
                        { type: 'button', props: { text: 'Kayıt Ol', link: '/enroll', style: 'outline', size: 'large', borderColor: '#ffffff', textColor: '#ffffff' } },
                    ],
                },
                { width: 40, settings: { padding: { top: 40, right: 40, bottom: 40, left: 40 } }, blocks: [] },
            ],
        },
        {
            name: 'Stats',
            settings: { backgroundColor: '#f59e0b', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 25, settings: { textAlign: 'center' }, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '50+', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Eğitim Programı', fontSize: 16, color: '#ffffff' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center' }, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '10K+', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Mezun', fontSize: 16, color: '#ffffff' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center' }, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '100+', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Eğitmen', fontSize: 16, color: '#ffffff' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center' }, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '20', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Yıllık Tecrübe', fontSize: 16, color: '#ffffff' } },
                    ]
                },
            ],
        },
    ],
};
