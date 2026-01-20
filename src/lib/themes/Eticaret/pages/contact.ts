// ============================================
// E-Ticaret Teması - İletişim Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const contactPage: ThemePageData = {
    slug: 'contact',
    title: 'İletişim',
    sections: [
        {
            name: 'Page Hero',
            settings: { backgroundColor: '#0f172a', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'İletişim', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Sorularınız için 7/24 yanınızdayız', fontSize: 20, color: '#f472b6' } },
                    ],
                },
            ],
        },
        {
            name: 'Contact Info',
            settings: { backgroundColor: '#ffffff', padding: { top: 80, right: 40, bottom: 40, left: 40 } },
            columns: [
                {
                    width: 33.33, settings: { textAlign: 'center', padding: { top: 30, right: 20, bottom: 30, left: 20 }, backgroundColor: '#fdf2f8', borderRadius: '12px' }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '📞', fontSize: 42 } },
                        { type: 'heading', props: { level: 'h4', content: 'Müşteri Hizmetleri', fontSize: 18, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '0850 123 45 67\n7/24 Destek Hattı', fontSize: 16, color: '#64748b', lineHeight: 1.6 } },
                    ]
                },
                {
                    width: 33.33, settings: { textAlign: 'center', padding: { top: 30, right: 20, bottom: 30, left: 20 }, backgroundColor: '#fdf2f8', borderRadius: '12px' }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '✉️', fontSize: 42 } },
                        { type: 'heading', props: { level: 'h4', content: 'E-posta', fontSize: 18, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'destek@shopstyle.com\ninfo@shopstyle.com', fontSize: 16, color: '#64748b', lineHeight: 1.6 } },
                    ]
                },
                {
                    width: 33.33, settings: { textAlign: 'center', padding: { top: 30, right: 20, bottom: 30, left: 20 }, backgroundColor: '#fdf2f8', borderRadius: '12px' }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '💬', fontSize: 42 } },
                        { type: 'heading', props: { level: 'h4', content: 'Canlı Destek', fontSize: 18, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Web sitemizdeki\ncanlı destek ile ulaşın', fontSize: 16, color: '#64748b', lineHeight: 1.6 } },
                    ]
                },
            ],
        },
        {
            name: 'Contact Form',
            settings: { backgroundColor: '#ffffff', padding: { top: 40, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 60,
                    settings: { padding: { top: 20, right: 20, bottom: 20, left: 20 }, backgroundColor: '#f8fafc', borderRadius: '12px' },
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: 'Bize Yazın', fontSize: 28, color: '#ec4899', fontWeight: 'bold' } },
                        {
                            type: 'form', props: {
                                fields: [
                                    { name: 'name', label: 'Adınız Soyadınız', type: 'text', required: true },
                                    { name: 'email', label: 'E-posta', type: 'email', required: true },
                                    { name: 'order', label: 'Sipariş Numarası (varsa)', type: 'text' },
                                    { name: 'subject', label: 'Konu', type: 'select', options: ['Sipariş Takibi', 'İade Talebi', 'Ürün Bilgisi', 'Şikayet', 'Diğer'], required: true },
                                    { name: 'message', label: 'Mesajınız', type: 'textarea', required: true },
                                ],
                                submitText: 'Gönder',
                                buttonColor: '#ec4899',
                            }
                        },
                    ],
                },
                {
                    width: 40,
                    settings: { padding: { top: 20, right: 20, bottom: 20, left: 40 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h4', content: 'Sıkça Sorulan Sorular', fontSize: 22, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '📦 Siparişim ne zaman gelir?\nStandart teslimat 1-3 iş günüdür.\n\n↩️ İade nasıl yapılır?\n14 gün içinde ücretsiz iade hakkınız var.\n\n💳 Hangi ödeme yöntemlerini kabul ediyorsunuz?\nKredi kartı, banka kartı, havale ve kapıda ödeme.', fontSize: 14, color: '#64748b', lineHeight: 1.8 } },
                    ],
                },
            ],
        },
    ],
};
