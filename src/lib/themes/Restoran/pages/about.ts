// ============================================
// Restoran Teması - Hakkımızda Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const aboutPage: ThemePageData = {
    slug: 'about',
    title: 'Hakkımızda',
    sections: [
        // Hero
        {
            name: 'Page Hero',
            settings: {
                backgroundColor: '#1a1a1a',
                backgroundImage: '/themes/restaurant/about-hero.jpg',
                backgroundSize: 'cover',
                padding: { top: 100, right: 40, bottom: 100, left: 40 },
                minHeight: 400,
                overlay: { enabled: true, color: 'rgba(0,0,0,0.7)' },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'Hikayemiz', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Lezzet yolculuğumuz 2010 yılında başladı', fontSize: 20, color: '#e0e0e0' } },
                    ],
                },
            ],
        },
        // Story Section
        {
            name: 'Our Story',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 50,
                    settings: { padding: { top: 20, right: 40, bottom: 20, left: 20 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: 'Tutkumuz: Lezzet', fontSize: 36, color: '#1a1a1a', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Lezzet Mutfağı, 2010 yılında İstanbul\'un kalbinde, Beyoğlu\'nda açıldı. Kurucumuz Şef Ahmet Yılmaz\'ın vizyonu, geleneksel Türk mutfağını modern tekniklerle buluşturmaktı.', fontSize: 16, color: '#666666', lineHeight: 1.8 } },
                        { type: 'text', props: { content: 'Bugün, 15 yılı aşkın deneyimimiz ve tutkulu ekibimizle, her gün yüzlerce misafirimize unutulmaz lezzetler sunuyoruz. Tazelik, kalite ve müşteri memnuniyeti bizim için her şeyden önce gelir.', fontSize: 16, color: '#666666', lineHeight: 1.8 } },
                    ],
                },
                {
                    width: 50,
                    settings: { padding: { top: 20, right: 20, bottom: 20, left: 40 } },
                    blocks: [
                        { type: 'image', props: { src: '/themes/restaurant/chef.jpg', alt: 'Şefimiz', width: '100%', borderRadius: '12px' } },
                    ],
                },
            ],
        },
        // Values
        {
            name: 'Our Values',
            settings: {
                backgroundColor: '#f8f8f8',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 33.33, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🌿', fontSize: 48 } },
                        { type: 'heading', props: { level: 'h4', content: 'Tazelik', fontSize: 22, color: '#1a1a1a', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Her gün taze malzemelerle hazırlanan yemekler', fontSize: 16, color: '#666666' } },
                    ]
                },
                {
                    width: 33.33, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '❤️', fontSize: 48 } },
                        { type: 'heading', props: { level: 'h4', content: 'Tutku', fontSize: 22, color: '#1a1a1a', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Sevgi ile hazırlanan her tabak', fontSize: 16, color: '#666666' } },
                    ]
                },
                {
                    width: 33.33, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🏆', fontSize: 48 } },
                        { type: 'heading', props: { level: 'h4', content: 'Kalite', fontSize: 22, color: '#1a1a1a', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'En yüksek standartlarda hizmet', fontSize: 16, color: '#666666' } },
                    ]
                },
            ],
        },
    ],
};
