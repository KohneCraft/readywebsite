// ============================================
// Modern Business Theme - Contact Page
// ============================================

import type { ThemePageData } from '@/types/theme';

export const contactPage: ThemePageData = {
  slug: 'contact',
  title: 'İletişim',
  sections: [
    {
      name: 'Contact Section',
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
                content: 'İletişim',
                fontSize: 42,
              },
            },
            {
              type: 'form',
              props: {
                fields: [
                  { type: 'text', name: 'name', label: 'Ad Soyad', required: true },
                  { type: 'email', name: 'email', label: 'E-posta', required: true },
                  { type: 'textarea', name: 'message', label: 'Mesaj', required: true },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};

