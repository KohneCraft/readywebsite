// ============================================
// Restoran Teması - Ana Sayfa
// ============================================

import type { ThemePageData } from '@/types/theme';

export const homePage: ThemePageData = {
    slug: 'home',
    title: 'Ana Sayfa',
    sections: [
        // Hero
        {
            name: 'Hero',
            settings: {
                backgroundColor: '#1a1a1a',
                backgroundImage: '/themes/restaurant/hero-bg.jpg',
                backgroundSize: 'cover',
                padding: { top: 150, right: 40, bottom: 150, left: 40 },
                minHeight: 700,
                overlay: { enabled: true, color: 'rgba(0,0,0,0.6)' },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center', padding: { top: 0, right: 0, bottom: 0, left: 0 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'Damağınıza Layık Lezzetler', fontSize: 56, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Geleneksel tatların modern yorumu. Taze malzemeler, ustalık ve sevgi ile hazırlanan yemekler.', fontSize: 22, color: '#e0e0e0', lineHeight: 1.6 } },
                        { type: 'button', props: { text: 'Menümüzü İnceleyin', link: '/menu', style: 'primary', size: 'large', backgroundColor: '#d97706' } },
                        { type: 'button', props: { text: 'Rezervasyon Yap', link: '/reservation', style: 'outline', size: 'large', borderColor: '#ffffff', textColor: '#ffffff' } },
                    ],
                },
            ],
        },
        // Özellikler
        {
            name: 'Features',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 33.33,
                    settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🍳', fontSize: 48, color: '#d97706' } },
                        { type: 'heading', props: { level: 'h4', content: 'Taze Malzemeler', fontSize: 22, color: '#1a1a1a', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Her gün özenle seçilen en taze malzemelerle hazırlanan lezzetler', fontSize: 16, color: '#666666' } },
                    ],
                },
                {
                    width: 33.33,
                    settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '👨‍🍳', fontSize: 48, color: '#d97706' } },
                        { type: 'heading', props: { level: 'h4', content: 'Uzman Şefler', fontSize: 22, color: '#1a1a1a', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Yılların tecrübesiyle hazırlanan özel tarifler ve lezzetler', fontSize: 16, color: '#666666' } },
                    ],
                },
                {
                    width: 33.33,
                    settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🍽️', fontSize: 48, color: '#d97706' } },
                        { type: 'heading', props: { level: 'h4', content: 'Sıcak Atmosfer', fontSize: 22, color: '#1a1a1a', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Keyifli anlar için özenle tasarlanmış mekan ve ambiyans', fontSize: 16, color: '#666666' } },
                    ],
                },
            ],
        },
        // CTA
        {
            name: 'CTA',
            settings: {
                backgroundColor: '#d97706',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: 'Özel Anlarınız İçin Rezervasyon', fontSize: 36, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Doğum günleri, yıldönümleri veya iş yemekleri için masanızı hemen ayırtın', fontSize: 18, color: '#ffffff' } },
                        { type: 'button', props: { text: 'Hemen Rezervasyon Yap', link: '/reservation', style: 'primary', size: 'large', backgroundColor: '#1a1a1a' } },
                    ],
                },
            ],
        },
    ],
};
