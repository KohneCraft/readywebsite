// ============================================
// Minimal Theme - Home Page
// Çoklu dil desteği ile (TR/EN/DE/FR)
// ============================================

import type { ThemePageData } from '@/types/theme';

export const homePage: ThemePageData = {
  slug: 'home',
  title: 'Ana Sayfa',
  titles: { tr: 'Ana Sayfa', en: 'Home', de: 'Startseite', fr: 'Accueil' },
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
                content: {
                  tr: 'Minimal Tasarım',
                  en: 'Minimal Design',
                  de: 'Minimalistisches Design',
                  fr: 'Design Minimal'
                },
                fontSize: 64,
                color: '#000000',
              },
            },
            {
              type: 'text',
              props: {
                content: {
                  tr: 'Sade ve etkili',
                  en: 'Simple and effective',
                  de: 'Schlicht und effektiv',
                  fr: 'Simple et efficace'
                },
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

