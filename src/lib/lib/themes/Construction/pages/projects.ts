// ============================================
// Construction Theme - Projects Page
// ============================================

import type { ThemePageData } from '@/types/theme';

export const constructionProjectsPage: ThemePageData = {
  slug: 'projects',
  title: 'Projelerimiz',
  sections: [
    {
      name: 'Projects Hero',
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
                content: 'Projelerimiz',
                fontSize: 56,
                color: '#ffffff',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Tamamladığımız başarılı projelerden örnekler',
                fontSize: 20,
                color: '#e0e0e0',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Projects Grid',
      settings: {
        backgroundColor: '#ffffff',
        padding: { top: 100, right: 40, bottom: 100, left: 40 },
      },
      columns: [
        {
          width: 33.33,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
          },
          blocks: [
            {
              type: 'image',
              props: {
                src: '/themes/construction/projects/project-1.jpg',
                alt: 'Lüks Villa Projesi',
                width: '100%',
                borderRadius: '8px',
              },
            },
            {
              type: 'heading',
              props: {
                level: 'h3',
                content: 'Lüks Villa Projesi',
                fontSize: 24,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Bodrum - 450m² villa inşaatı',
                fontSize: 16,
                color: '#666666',
              },
            },
          ],
        },
        {
          width: 33.33,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
          },
          blocks: [
            {
              type: 'image',
              props: {
                src: '/themes/construction/projects/project-2.jpg',
                alt: 'Modern Apartman Kompleksi',
                width: '100%',
                borderRadius: '8px',
              },
            },
            {
              type: 'heading',
              props: {
                level: 'h3',
                content: 'Modern Apartman Kompleksi',
                fontSize: 24,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'İstanbul - 24 daireli rezidans',
                fontSize: 16,
                color: '#666666',
              },
            },
          ],
        },
        {
          width: 33.33,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
          },
          blocks: [
            {
              type: 'image',
              props: {
                src: '/themes/construction/projects/project-3.jpg',
                alt: 'Ticari Kompleks',
                width: '100%',
                borderRadius: '8px',
              },
            },
            {
              type: 'heading',
              props: {
                level: 'h3',
                content: 'Ticari Kompleks',
                fontSize: 24,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Ankara - Ofis ve mağaza kompleksi',
                fontSize: 16,
                color: '#666666',
              },
            },
          ],
        },
      ],
    },
  ],
};

