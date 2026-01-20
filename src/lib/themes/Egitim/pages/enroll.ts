// ============================================
// Eğitim Teması - Kayıt Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const enrollPage: ThemePageData = {
    slug: 'enroll',
    title: 'Kayıt Ol',
    sections: [
        {
            name: 'Enroll Hero',
            settings: {
                backgroundColor: '#7c3aed',
                padding: { top: 100, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: { content: 'Kayıt Ol', level: 'h1', fontSize: '48px', fontWeight: '700', color: '#ffffff' },
                        },
                        {
                            type: 'text',
                            props: { content: 'Geleceğinize yatırım yapın', fontSize: '20px', color: '#ddd6fe' },
                        },
                    ],
                },
            ],
        },
        {
            name: 'Enroll Form',
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
                            props: { content: 'Neden Bizi Seçmelisiniz?', level: 'h2', fontSize: '28px', fontWeight: '600', color: '#7c3aed' },
                        },
                        {
                            type: 'text',
                            props: {
                                content: '✓ Deneyimli Eğitmenler\n✓ Uluslararası Geçerli Sertifikalar\n✓ Modern Eğitim Metodları\n✓ Esnek Ders Programı\n✓ Kariyer Danışmanlığı\n✓ %95 İş Bulma Oranı',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '2',
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
                                title: 'Ön Kayıt Formu',
                                fields: [
                                    { id: 'name', type: 'text', name: 'name', label: 'Adınız Soyadınız', required: true },
                                    { id: 'email', type: 'email', name: 'email', label: 'Email', required: true },
                                    { id: 'phone', type: 'tel', name: 'phone', label: 'Telefon', required: true },
                                    {
                                        id: 'program', type: 'select', name: 'program', label: 'İlgilendiğiniz Program', required: true, options: [
                                            { value: 'languages', label: 'Yabancı Diller' },
                                            { value: 'technology', label: 'Teknoloji' },
                                            { value: 'business', label: 'İşletme' },
                                            { value: 'design', label: 'Tasarım' },
                                        ]
                                    },
                                    { id: 'message', type: 'textarea', name: 'message', label: 'Notlarınız', required: false },
                                ],
                                buttonText: 'Ön Kayıt Yap',
                                buttonColor: '#7c3aed',
                                buttonTextColor: '#ffffff',
                            },
                        },
                    ],
                },
            ],
        },
    ],
};
