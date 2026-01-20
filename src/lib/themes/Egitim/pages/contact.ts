// ============================================
// Eğitim Teması - İletişim Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const contactPage: ThemePageData = {
    slug: 'contact',
    title: 'İletişim',
    sections: [
        {
            name: 'Page Hero',
            settings: { backgroundColor: '#1e40af', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'İletişim', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Sorularınız için bize ulaşın', fontSize: 20, color: '#dbeafe' } },
                    ],
                },
            ],
        },
        {
            name: 'Contact Section',
            settings: { backgroundColor: '#ffffff', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 50,
                    settings: { padding: { top: 20, right: 40, bottom: 20, left: 20 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: 'Bize Ulaşın', fontSize: 32, color: '#1e40af', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '📍 Adres', fontSize: 14, color: '#f59e0b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Kadıköy, Bağdat Cad. No: 200\nİstanbul 34710', fontSize: 16, color: '#666666', lineHeight: 1.6 } },
                        { type: 'text', props: { content: '📞 Telefon', fontSize: 14, color: '#f59e0b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '+90 212 567 8901', fontSize: 16, color: '#666666' } },
                        { type: 'text', props: { content: '✉️ E-posta', fontSize: 14, color: '#f59e0b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'info@bilgiakademi.com', fontSize: 16, color: '#666666' } },
                        { type: 'text', props: { content: '⏰ Çalışma Saatleri', fontSize: 14, color: '#f59e0b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Pazartesi - Cumartesi: 09:00 - 21:00\nPazar: Kapalı', fontSize: 16, color: '#666666', lineHeight: 1.6 } },
                    ],
                },
                {
                    width: 50,
                    settings: { padding: { top: 20, right: 20, bottom: 20, left: 40 }, backgroundColor: '#f8fafc', borderRadius: '12px' },
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: 'Bilgi İsteyin', fontSize: 24, color: '#1e40af', fontWeight: 'bold' } },
                        {
                            type: 'form', props: {
                                fields: [
                                    { name: 'name', label: 'Adınız Soyadınız', type: 'text', required: true },
                                    { name: 'email', label: 'E-posta', type: 'email', required: true },
                                    { name: 'phone', label: 'Telefon', type: 'tel', required: true },
                                    { name: 'program', label: 'İlgilendiğiniz Program', type: 'select', options: ['Dil Eğitimi', 'Teknoloji', 'İş Dünyası', 'Sanat & Tasarım'], required: true },
                                    { name: 'message', label: 'Mesajınız', type: 'textarea' },
                                ],
                                submitText: 'Gönder',
                                buttonColor: '#f59e0b',
                            }
                        },
                    ],
                },
            ],
        },
    ],
};
