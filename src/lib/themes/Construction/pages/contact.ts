// ============================================
// Construction Theme - Contact Page
// ============================================

import type { ThemePageData } from '@/types/theme';

export const constructionContactPage: ThemePageData = {
  slug: 'contact',
  title: 'İletişim',
  sections: [
    {
      name: 'Contact Hero',
      settings: {
        backgroundColor: '#0a1929',
        padding: { top: 100, right: 40, bottom: 80, left: 40 },
        textAlign: 'center',
      },
      columns: [
        {
          width: 100,
          settings: {},
          blocks: [
            {
              type: 'heading',
              props: {
                level: 'h1',
                content: 'İletişim',
                fontSize: 56,
                color: '#ffffff',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Projeleriniz için bizimle iletişime geçin',
                fontSize: 20,
                color: '#e0e0e0',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Contact Info',
      settings: {
        backgroundColor: '#ffffff',
        padding: { top: 100, right: 40, bottom: 100, left: 40 },
      },
      columns: [
        {
          width: 50,
          settings: {
            padding: { top: 20, right: 40, bottom: 20, left: 20 },
          },
          blocks: [
            {
              type: 'heading',
              props: {
                level: 'h2',
                content: 'İletişim Bilgileri',
                fontSize: 36,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Adres: Atatürk Mah. İnşaat Cad. No:123 İstanbul',
                fontSize: 18,
                color: '#666666',
                lineHeight: 2,
              },
            },
            {
              type: 'text',
              props: {
                content: 'Telefon: +90 (212) 123 45 67',
                fontSize: 18,
                color: '#666666',
                lineHeight: 2,
              },
            },
            {
              type: 'text',
              props: {
                content: 'E-posta: info@vavinsaat.com',
                fontSize: 18,
                color: '#666666',
                lineHeight: 2,
              },
            },
            {
              type: 'text',
              props: {
                content: 'Çalışma Saatleri: Pazartesi - Cuma 09:00 - 18:00',
                fontSize: 18,
                color: '#666666',
                lineHeight: 2,
              },
            },
          ],
        },
        {
          width: 50,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 40 },
          },
          blocks: [
            {
              type: 'heading',
              props: {
                level: 'h2',
                content: 'Bize Ulaşın',
                fontSize: 36,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Projeleriniz için ücretsiz keşif ve fiyat teklifi almak için formu doldurun veya doğrudan iletişime geçin.',
                fontSize: 18,
                color: '#666666',
                lineHeight: 1.8,
              },
            },
            {
              type: 'button',
              props: {
                text: 'Hemen Arayın',
                link: 'tel:+902121234567',
                style: 'primary',
                size: 'large',
              },
            },
          ],
        },
      ],
    },
  ],
};

