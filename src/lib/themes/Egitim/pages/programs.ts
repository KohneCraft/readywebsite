// ============================================
// Eğitim Teması - Programlar Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const programsPage: ThemePageData = {
    slug: 'programs',
    title: 'Programlar',
    sections: [
        {
            name: 'Page Hero',
            settings: { backgroundColor: '#1e40af', padding: { top: 100, right: 40, bottom: 100, left: 40 } },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'Eğitim Programları', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Kariyer hedeflerinize uygun program seçin', fontSize: 20, color: '#dbeafe' } },
                    ],
                },
            ],
        },
        {
            name: 'Programs Grid',
            settings: { backgroundColor: '#ffffff', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 50, settings: { padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🌍 Dil Eğitimi', fontSize: 28, color: '#1e40af', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'İngilizce, Almanca, Fransızca ve daha fazlası. A1\'den C2\'ye tüm seviyeler için dil eğitimi.', fontSize: 16, color: '#666666', lineHeight: 1.6 } },
                        { type: 'text', props: { content: '✓ IELTS / TOEFL Hazırlık\n✓ İş İngilizcesi\n✓ Konuşma Kulüpleri', fontSize: 14, color: '#64748b', lineHeight: 1.8 } },
                        { type: 'button', props: { text: 'Detaylı Bilgi', link: '/programs/languages', style: 'primary', backgroundColor: '#f59e0b' } },
                    ]
                },
                {
                    width: 50, settings: { padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '💻 Teknoloji', fontSize: 28, color: '#1e40af', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Yazılım geliştirme, veri bilimi, siber güvenlik ve daha fazlası.', fontSize: 16, color: '#666666', lineHeight: 1.6 } },
                        { type: 'text', props: { content: '✓ Web & Mobil Geliştirme\n✓ Python & Data Science\n✓ Cloud Computing', fontSize: 14, color: '#64748b', lineHeight: 1.8 } },
                        { type: 'button', props: { text: 'Detaylı Bilgi', link: '/programs/technology', style: 'primary', backgroundColor: '#f59e0b' } },
                    ]
                },
            ],
        },
        {
            name: 'More Programs',
            settings: { backgroundColor: '#f8fafc', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 50, settings: { padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '📊 İş Dünyası', fontSize: 28, color: '#1e40af', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'İşletme, pazarlama, finans ve yönetim eğitimleri.', fontSize: 16, color: '#666666', lineHeight: 1.6 } },
                        { type: 'text', props: { content: '✓ MBA Hazırlık\n✓ Dijital Pazarlama\n✓ Proje Yönetimi (PMP)', fontSize: 14, color: '#64748b', lineHeight: 1.8 } },
                        { type: 'button', props: { text: 'Detaylı Bilgi', link: '/programs/business', style: 'primary', backgroundColor: '#f59e0b' } },
                    ]
                },
                {
                    width: 50, settings: { padding: { top: 20, right: 20, bottom: 20, left: 20 } }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🎨 Sanat & Tasarım', fontSize: 28, color: '#1e40af', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Grafik tasarım, UI/UX, fotoğrafçılık ve görsel sanatlar.', fontSize: 16, color: '#666666', lineHeight: 1.6 } },
                        { type: 'text', props: { content: '✓ Adobe Creative Suite\n✓ UI/UX Design\n✓ 3D Modelleme', fontSize: 14, color: '#64748b', lineHeight: 1.8 } },
                        { type: 'button', props: { text: 'Detaylı Bilgi', link: '/programs/design', style: 'primary', backgroundColor: '#f59e0b' } },
                    ]
                },
            ],
        },
        {
            name: 'CTA',
            settings: { backgroundColor: '#f59e0b', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 100, settings: { textAlign: 'center' }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: 'Geleceğinize Yatırım Yapın', fontSize: 32, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'button', props: { text: 'Hemen Kayıt Ol', link: '/contact', style: 'primary', size: 'large', backgroundColor: '#1e40af' } },
                    ]
                },
            ],
        },
    ],
};
