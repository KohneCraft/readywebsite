// ============================================
// Sağlık Teması - Branşlar Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const departmentsPage: ThemePageData = {
    slug: 'departments',
    title: 'Branşlar',
    sections: [
        {
            name: 'Page Hero',
            settings: { backgroundColor: '#0369a1', padding: { top: 100, right: 40, bottom: 100, left: 40 } },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'Branşlarımız', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Uzman ekibimizle geniş hizmet yelpazesi', fontSize: 20, color: '#e0f2fe' } },
                    ],
                },
            ],
        },
        {
            name: 'Departments Grid',
            settings: { backgroundColor: '#ffffff', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 30, right: 20, bottom: 30, left: 20 }, backgroundColor: '#f8fafc', borderRadius: '12px' }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '❤️', fontSize: 42 } },
                        { type: 'heading', props: { level: 'h4', content: 'Kardiyoloji', fontSize: 20, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Kalp ve damar sağlığı', fontSize: 14, color: '#64748b' } },
                        { type: 'button', props: { text: 'Detay', link: '/departments/cardiology', style: 'outline', size: 'small' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 30, right: 20, bottom: 30, left: 20 }, backgroundColor: '#f8fafc', borderRadius: '12px' }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🦴', fontSize: 42 } },
                        { type: 'heading', props: { level: 'h4', content: 'Ortopedi', fontSize: 20, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Kemik ve eklem sağlığı', fontSize: 14, color: '#64748b' } },
                        { type: 'button', props: { text: 'Detay', link: '/departments/orthopedics', style: 'outline', size: 'small' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 30, right: 20, bottom: 30, left: 20 }, backgroundColor: '#f8fafc', borderRadius: '12px' }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🧠', fontSize: 42 } },
                        { type: 'heading', props: { level: 'h4', content: 'Nöroloji', fontSize: 20, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Sinir sistemi sağlığı', fontSize: 14, color: '#64748b' } },
                        { type: 'button', props: { text: 'Detay', link: '/departments/neurology', style: 'outline', size: 'small' } },
                    ]
                },
                {
                    width: 25, settings: { textAlign: 'center', padding: { top: 30, right: 20, bottom: 30, left: 20 }, backgroundColor: '#f8fafc', borderRadius: '12px' }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '👁️', fontSize: 42 } },
                        { type: 'heading', props: { level: 'h4', content: 'Göz Hastalıkları', fontSize: 20, color: '#1e293b', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Göz sağlığı ve cerrahi', fontSize: 14, color: '#64748b' } },
                        { type: 'button', props: { text: 'Detay', link: '/departments/ophthalmology', style: 'outline', size: 'small' } },
                    ]
                },
            ],
        },
        {
            name: 'CTA',
            settings: { backgroundColor: '#16a34a', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 100, settings: { textAlign: 'center' }, blocks: [
                        { type: 'heading', props: { level: 'h3', content: 'Randevu Almak İster misiniz?', fontSize: 32, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'button', props: { text: 'Online Randevu', link: '/contact', style: 'primary', size: 'large', backgroundColor: '#ffffff', textColor: '#16a34a' } },
                    ]
                },
            ],
        },
    ],
};
