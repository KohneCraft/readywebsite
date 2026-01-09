// ============================================
// Modern Business Theme - About Page
// ============================================

import type { ThemePageData } from '@/types/theme';

export const aboutPage: ThemePageData = {
  slug: 'about',
  title: 'Hakkımızda',
  sections: [
    {
      name: 'About Section',
      settings: {
        backgroundColor: '#ffffff',
        padding: { top: 80, right: 40, bottom: 80, left: 40 },
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
                content: 'Hakkımızda',
                fontSize: 42,
              },
            },
            {
              type: 'text',
              props: {
                content: 'Şirketimiz hakkında bilgiler...',
                fontSize: 16,
              },
            },
          ],
        },
      ],
    },
  ],
};

