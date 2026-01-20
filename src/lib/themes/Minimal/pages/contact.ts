// ============================================
// Minimal Tema - İletişim Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const contactPage: ThemePageData = {
    slug: 'contact',
    title: 'İletişim',
    sections: [
        {
            name: 'Contact Hero',
            settings: {
                backgroundColor: '#0a0a0a',
                padding: { top: 120, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: 'Birlikte Çalışalım',
                                level: 'h1',
                                fontSize: '56px',
                                fontWeight: '300',
                                color: '#fafafa',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Projeniz için iletişime geçin',
                                fontSize: '20px',
                                color: '#737373',
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'Contact Info',
            settings: {
                backgroundColor: '#fafafa',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 50,
                    settings: { textAlign: 'left' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: 'İletişim Bilgileri',
                                level: 'h2',
                                fontSize: '32px',
                                fontWeight: '400',
                                color: '#0a0a0a',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Email\nmerhaba@sade.design',
                                fontSize: '18px',
                                color: '#525252',
                                lineHeight: '1.8',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Telefon\n+90 212 123 4567',
                                fontSize: '18px',
                                color: '#525252',
                                lineHeight: '1.8',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Adres\nBeyoğlu, İstanbul',
                                fontSize: '18px',
                                color: '#525252',
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
                                title: '',
                                fields: [
                                    { id: 'name', type: 'text', name: 'name', label: 'Adınız', required: true },
                                    { id: 'email', type: 'email', name: 'email', label: 'Email', required: true },
                                    { id: 'message', type: 'textarea', name: 'message', label: 'Mesajınız', required: true },
                                ],
                                buttonText: 'Gönder',
                                buttonColor: '#0a0a0a',
                                buttonTextColor: '#fafafa',
                            },
                        },
                    ],
                },
            ],
        },
    ],
};
