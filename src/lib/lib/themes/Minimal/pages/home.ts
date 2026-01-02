// ============================================
// Minimal Theme - Home Page
// ============================================

import type { ThemePageData } from '@/types/theme';

export const homePage: ThemePageData = {
  slug: 'home',
  title: 'Ana Sayfa',
  sections: [
    {
      name: 'Hero',
      settings: {
        backgroundColor: '#ffffff',
        padding: { top: 100, right: 40, bottom: 100, left: 40 },
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
                content: 'Minimal Tasarım',
                fontSize: 64,
                color: '#000000',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Sade ve etkili',
                fontSize: 20,
                color: '#666',
              },
            },
          ],
        },
      ],
    },
  ],
};

