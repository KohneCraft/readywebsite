// ============================================
// Kurumsal Tema - İletişim Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const contactPage: ThemePageData = {
    slug: 'contact',
    title: 'İletişim',
    sections: [
        {
            name: 'Contact Hero',
            settings: {
                backgroundColor: '#2563eb',
                padding: { top: 100, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: 'İletişime Geçin',
                                level: 'h1',
                                fontSize: '48px',
                                fontWeight: '700',
                                color: '#ffffff',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Projeleriniz için bizimle iletişime geçin, size nasıl yardımcı olabileceğimizi konuşalım.',
                                fontSize: '20px',
                                color: '#dbeafe',
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'Contact Form',
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
                            props: { content: 'Bilgilerimiz', level: 'h2', fontSize: '28px', fontWeight: '600', color: '#1e293b' },
                        },
                        {
                            type: 'text',
                            props: {
                                content: '📍 Adres\nÇankaya, Kızılay Cad. No: 45\nAnkara, Türkiye',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '1.8',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: '📞 Telefon\n+90 312 456 7890',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '1.8',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: '✉️ Email\ninfo@kurumsal.com',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '1.8',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: '🕒 Çalışma Saatleri\nPazartesi - Cuma: 09:00 - 18:00',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '1.8',
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
                                title: 'Bize Mesaj Gönderin',
                                fields: [
                                    { id: 'name', type: 'text', name: 'name', label: 'Adınız Soyadınız', required: true },
                                    { id: 'company', type: 'text', name: 'company', label: 'Şirket', required: false },
                                    { id: 'email', type: 'email', name: 'email', label: 'Email', required: true },
                                    { id: 'phone', type: 'tel', name: 'phone', label: 'Telefon', required: false },
                                    { id: 'message', type: 'textarea', name: 'message', label: 'Mesajınız', required: true },
                                ],
                                buttonText: 'Gönder',
                                buttonColor: '#2563eb',
                                buttonTextColor: '#ffffff',
                            },
                        },
                    ],
                },
            ],
        },
    ],
};
