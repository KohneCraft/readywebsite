// ============================================
// Sağlık Teması - Hakkımızda Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const aboutPage: ThemePageData = {
    slug: 'about',
    title: 'Hakkımızda',
    sections: [
        {
            name: 'Page Hero',
            settings: {
                backgroundColor: '#0369a1',
                padding: { top: 100, right: 40, bottom: 100, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'Hakkımızda', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '2008\'den beri sağlığınız için çalışıyoruz', fontSize: 20, color: '#e0f2fe' } },
                    ],
                },
            ],
        },
        {
            name: 'About Content',
            settings: { backgroundColor: '#ffffff', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 60,
                    settings: { padding: { top: 20, right: 40, bottom: 20, left: 20 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: 'Vizyonumuz', fontSize: 36, color: '#0369a1', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Medikal Sağlık olarak, en yüksek kalitede sağlık hizmeti sunarak toplum sağlığına katkıda bulunmayı hedefliyoruz. Modern tıp anlayışı, etik değerler ve hasta odaklı yaklaşımımızla fark yaratıyoruz.', fontSize: 16, color: '#666666', lineHeight: 1.8 } },
                        { type: 'heading', props: { level: 'h2', content: 'Misyonumuz', fontSize: 36, color: '#0369a1', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Hastalarımıza güvenilir, erişilebilir ve kaliteli sağlık hizmeti sunmak. Uzman kadromuz ve son teknoloji ekipmanlarımızla tanı ve tedavi süreçlerinde en iyi sonuçları elde etmek.', fontSize: 16, color: '#666666', lineHeight: 1.8 } },
                    ],
                },
                {
                    width: 40,
                    settings: { padding: { top: 20, right: 20, bottom: 20, left: 40 } },
                    blocks: [
                        { type: 'image', props: { src: '/themes/healthcare/building.jpg', alt: 'Hastanemiz', width: '100%', borderRadius: '12px' } },
                    ],
                },
            ],
        },
        {
            name: 'Stats',
            settings: { backgroundColor: '#0369a1', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 25, settings: { textAlign: 'center' }, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '15+', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Yıllık Deneyim', fontSize: 16, color: '#e0f2fe' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center' }, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '50+', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Uzman Doktor', fontSize: 16, color: '#e0f2fe' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center' }, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '100K+', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Mutlu Hasta', fontSize: 16, color: '#e0f2fe' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center' }, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '20+', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Branş', fontSize: 16, color: '#e0f2fe' } },
                    ]
                },
            ],
        },
    ],
};
