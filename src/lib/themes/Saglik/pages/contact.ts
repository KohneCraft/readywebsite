// ============================================
// Sağlık Teması - İletişim Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const contactPage: ThemePageData = {
    slug: 'contact',
    title: 'İletişim',
    sections: [
        {
            name: 'Page Hero',
            settings: { backgroundColor: '#0369a1', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'İletişim', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Randevu ve bilgi için bize ulaşın', fontSize: 20, color: '#e0f2fe' } },
                    ],
                },
            ],
        },
        {
            name: 'Contact Info',
            settings: { backgroundColor: '#ffffff', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 33.33,
                    settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '📞', fontSize: 48 } },
                        { type: 'heading', props: { level: 'h4', content: 'Telefon', fontSize: 20, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Randevu: 444 0 123\nAcil: 444 0 911', fontSize: 16, color: '#64748b', lineHeight: 1.6 } },
                    ],
                },
                {
                    width: 33.33,
                    settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '📍', fontSize: 48 } },
                        { type: 'heading', props: { level: 'h4', content: 'Adres', fontSize: 20, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Şişli, Büyükdere Cad. No: 100\nİstanbul 34394', fontSize: 16, color: '#64748b', lineHeight: 1.6 } },
                    ],
                },
                {
                    width: 33.33,
                    settings: { textAlign: 'center', padding: { top: 20, right: 20, bottom: 20, left: 20 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '⏰', fontSize: 48 } },
                        { type: 'heading', props: { level: 'h4', content: 'Çalışma Saatleri', fontSize: 20, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Poliklinik: 08:00 - 20:00\nAcil: 7/24 Açık', fontSize: 16, color: '#64748b', lineHeight: 1.6 } },
                    ],
                },
            ],
        },
        {
            name: 'Appointment Form',
            settings: { backgroundColor: '#f1f5f9', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 60,
                    settings: { padding: { top: 20, right: 20, bottom: 20, left: 20 }, backgroundColor: '#ffffff', borderRadius: '12px' },
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: 'Online Randevu', fontSize: 28, color: '#0369a1', fontWeight: 'bold' } },
                        {
                            type: 'form', props: {
                                fields: [
                                    { name: 'name', label: 'Adınız Soyadınız', type: 'text', required: true },
                                    { name: 'phone', label: 'Telefon', type: 'tel', required: true },
                                    { name: 'department', label: 'Branş', type: 'select', options: ['Dahiliye', 'Kardiyoloji', 'Ortopedi', 'Nöroloji', 'Göz'], required: true },
                                    { name: 'date', label: 'Tercih Edilen Tarih', type: 'date', required: true },
                                    { name: 'message', label: 'Notunuz', type: 'textarea' },
                                ],
                                submitText: 'Randevu Al',
                                buttonColor: '#16a34a',
                            }
                        },
                    ],
                },
                {
                    width: 40,
                    settings: { padding: { top: 20, right: 20, bottom: 20, left: 40 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h4', content: 'Neden Bizi Tercih Etmelisiniz?', fontSize: 22, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '✓ Alanında uzman doktorlar\n✓ Modern tıbbi cihazlar\n✓ Hızlı randevu sistemi\n✓ Konforlu hasta odaları\n✓ 7/24 acil hizmet', fontSize: 16, color: '#64748b', lineHeight: 2 } },
                    ],
                },
            ],
        },
    ],
};
