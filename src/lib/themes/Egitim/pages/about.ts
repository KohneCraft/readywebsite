// ============================================
// Eğitim Teması - Hakkımızda Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const aboutPage: ThemePageData = {
    slug: 'about',
    title: 'Hakkımızda',
    sections: [
        {
            name: 'Page Hero',
            settings: { backgroundColor: '#1e40af', padding: { top: 100, right: 40, bottom: 100, left: 40 } },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'Hakkımızda', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '20 yılı aşkın eğitim deneyimi', fontSize: 20, color: '#dbeafe' } },
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
                        { type: 'heading', props: { level: 'h2', content: 'Bilgi Akademi', fontSize: 36, color: '#1e40af', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '2005 yılında kurulan Bilgi Akademi, Türkiye\'nin önde gelen eğitim kurumlarından biridir. Vizyonumuz, öğrencilerimizi geleceğe en iyi şekilde hazırlamak ve kariyer hedeflerine ulaşmalarına yardımcı olmaktır.', fontSize: 16, color: '#666666', lineHeight: 1.8 } },
                        { type: 'text', props: { content: 'Deneyimli eğitmen kadromuz, modern eğitim metodları ve güncel müfredat ile öğrencilerimize en kaliteli eğitimi sunuyoruz.', fontSize: 16, color: '#666666', lineHeight: 1.8 } },
                    ],
                },
                {
                    width: 50,
                    settings: { padding: { top: 20, right: 20, bottom: 20, left: 40 } },
                    blocks: [
                        { type: 'image', props: { src: '/themes/education/campus.jpg', alt: 'Kampüsümüz', width: '100%', borderRadius: '12px' } },
                    ],
                },
            ],
        },
        {
            name: 'Values',
            settings: { backgroundColor: '#f8fafc', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 33.33, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '📚', fontSize: 48 } },
                        { type: 'heading', props: { level: 'h4', content: 'Kaliteli Eğitim', fontSize: 22, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Güncel müfredat ve modern eğitim yöntemleri', fontSize: 16, color: '#666666' } },
                    ]
                },
                {
                    width: 33.33, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '👩‍🏫', fontSize: 48 } },
                        { type: 'heading', props: { level: 'h4', content: 'Uzman Eğitmenler', fontSize: 22, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Alanında deneyimli akademisyen kadrosu', fontSize: 16, color: '#666666' } },
                    ]
                },
                {
                    width: 33.33, settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🎯', fontSize: 48 } },
                        { type: 'heading', props: { level: 'h4', content: 'Kariyer Odaklı', fontSize: 22, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'İş dünyasına hazırlayan pratik eğitimler', fontSize: 16, color: '#666666' } },
                    ]
                },
            ],
        },
    ],
};
