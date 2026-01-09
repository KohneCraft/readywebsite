// ============================================
// Corporate Theme - Home Page
// ============================================

import type { ThemePageData } from '@/types/theme';

export const homePage: ThemePageData = {
  slug: 'home',
  title: 'Ana Sayfa',
  sections: [
    {
      name: 'Hero',
      settings: {
        backgroundColor: '#1e40af',
        padding: { top: 120, right: 40, bottom: 120, left: 40 },
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
                content: 'Kurumsal Çözümler',
                fontSize: 56,
                color: '#ffffff',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Profesyonel iş çözümleri',
                fontSize: 20,
                color: '#e0e7ff',
              },
            },
            {
              type: 'button',
              props: {
                text: 'İletişime Geçin',
                link: '/contact',
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

