// ============================================
// Sağlık Teması - Randevu Al Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const appointmentPage: ThemePageData = {
    slug: 'appointment',
    title: 'Randevu Al',
    sections: [
        {
            name: 'Appointment Hero',
            settings: {
                backgroundColor: '#0891b2',
                padding: { top: 100, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: 'Online Randevu Al',
                                level: 'h1',
                                fontSize: '48px',
                                fontWeight: '700',
                                color: '#ffffff',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Uzman doktorlarımızdan randevu almak için formu doldurun',
                                fontSize: '20px',
                                color: '#cffafe',
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'Appointment Form',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 50,
                    settings: { textAlign: 'left' },
                    blocks: [
                        {
                            type: 'heading',
                            props: { content: 'Neden Bizi Tercih Etmelisiniz?', level: 'h2', fontSize: '28px', fontWeight: '600', color: '#0e7490' },
                        },
                        {
                            type: 'text',
                            props: {
                                content: '✓ 50+ Uzman Doktor\n✓ 7/24 Acil Servis\n✓ Modern Tıbbi Cihazlar\n✓ Konforlu Odalar\n✓ Online Sonuç Takibi\n✓ Ücretsiz Otopark',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '2',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: '📞 Acil Durum: 0850 123 4567',
                                fontSize: '18px',
                                color: '#0891b2',
                            },
                        },
                    ],
                },
                {
                    width: 50,
                    settings: { textAlign: 'left' },
                    blocks: [
                        {
                            type: 'form',
                            props: {
                                title: 'Randevu Formu',
                                fields: [
                                    { id: 'name', type: 'text', name: 'name', label: 'Adınız Soyadınız', required: true },
                                    { id: 'phone', type: 'tel', name: 'phone', label: 'Telefon', required: true },
                                    { id: 'email', type: 'email', name: 'email', label: 'Email', required: false },
                                    {
                                        id: 'department', type: 'select', name: 'department', label: 'Bölüm', required: true, options: [
                                            { value: 'cardiology', label: 'Kardiyoloji' },
                                            { value: 'orthopedics', label: 'Ortopedi' },
                                            { value: 'neurology', label: 'Nöroloji' },
                                            { value: 'ophthalmology', label: 'Göz Hastalıkları' },
                                        ]
                                    },
                                    { id: 'message', type: 'textarea', name: 'message', label: 'Şikayetiniz', required: false },
                                ],
                                buttonText: 'Randevu Oluştur',
                                buttonColor: '#0891b2',
                                buttonTextColor: '#ffffff',
                            },
                        },
                    ],
                },
            ],
        },
    ],
};
