// ============================================
// Minimal Tema - İletişim Sayfası
// Çoklu dil desteği ile (TR/EN/DE/FR)
// ============================================

import type { ThemePageData } from '@/types/theme';

export const contactPage: ThemePageData = {
    slug: 'contact',
    title: 'İletişim',
    titles: { tr: 'İletişim', en: 'Contact', de: 'Kontakt', fr: 'Contact' },
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
                                content: {
                                    tr: 'Birlikte Çalışalım',
                                    en: 'Let\'s Work Together',
                                    de: 'Lassen Sie uns zusammenarbeiten',
                                    fr: 'Travaillons Ensemble'
                                },
                                level: 'h1',
                                fontSize: '56px',
                                fontWeight: '300',
                                color: '#fafafa',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: {
                                    tr: 'Projeniz için iletişime geçin',
                                    en: 'Get in touch for your project',
                                    de: 'Kontaktieren Sie uns für Ihr Projekt',
                                    fr: 'Contactez-nous pour votre projet'
                                },
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
                                content: {
                                    tr: 'İletişim Bilgileri',
                                    en: 'Contact Information',
                                    de: 'Kontaktinformationen',
                                    fr: 'Informations de Contact'
                                },
                                level: 'h2',
                                fontSize: '32px',
                                fontWeight: '400',
                                color: '#0a0a0a',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: {
                                    tr: 'Email\nmerhaba@sade.design',
                                    en: 'Email\nhello@sade.design',
                                    de: 'E-Mail\nhallo@sade.design',
                                    fr: 'Email\nbonjour@sade.design'
                                },
                                fontSize: '18px',
                                color: '#525252',
                                lineHeight: '1.8',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: {
                                    tr: 'Telefon\n+90 212 123 4567',
                                    en: 'Phone\n+90 212 123 4567',
                                    de: 'Telefon\n+90 212 123 4567',
                                    fr: 'Téléphone\n+90 212 123 4567'
                                },
                                fontSize: '18px',
                                color: '#525252',
                                lineHeight: '1.8',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: {
                                    tr: 'Adres\nBeyoğlu, İstanbul',
                                    en: 'Address\nBeyoğlu, Istanbul',
                                    de: 'Adresse\nBeyoğlu, Istanbul',
                                    fr: 'Adresse\nBeyoğlu, Istanbul'
                                },
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
                                    { id: 'name', type: 'text', name: 'name', label: { tr: 'Adınız', en: 'Your Name', de: 'Ihr Name', fr: 'Votre Nom' }, required: true },
                                    { id: 'email', type: 'email', name: 'email', label: 'Email', required: true },
                                    { id: 'message', type: 'textarea', name: 'message', label: { tr: 'Mesajınız', en: 'Your Message', de: 'Ihre Nachricht', fr: 'Votre Message' }, required: true },
                                ],
                                buttonText: { tr: 'Gönder', en: 'Send', de: 'Senden', fr: 'Envoyer' },
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
