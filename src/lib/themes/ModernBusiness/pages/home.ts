// ============================================
// Modern Business Theme - Home Page
// ============================================

import type { ThemePageData } from '@/types/theme';

export const homePage: ThemePageData = {
  slug: 'home',
  title: 'Ana Sayfa',
  sections: [
    {
      name: 'Hero Section',
      settings: {
        backgroundColor: '#ffffff',
        padding: { top: 80, right: 40, bottom: 80, left: 40 },
        minHeight: 600,
      },
      columns: [
        {
          width: 50,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
          },
          blocks: [
            {
              type: 'heading',
              props: {
                level: 'h1',
                content: 'Modern İş Çözümleri',
                fontSize: 48,
                color: '#1a1a1a',
              },
            },
            {
              type: 'text',
              props: {
                content: 'İşinizi büyütmek için ihtiyacınız olan her şey',
                fontSize: 18,
                color: '#666',
              },
            },
            {
              type: 'button',
              props: {
                text: 'Başlayın',
                link: '/contact',
                style: 'primary',
                size: 'large',
              },
            },
          ],
        },
        {
          width: 50,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
          },
          blocks: [
            {
              type: 'image',
              props: {
                src: '/themes/modern/images/hero.jpg',
                alt: 'Hero Image',
                width: '100%',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Features Section',
      settings: {
        backgroundColor: '#f8f9fa',
        padding: { top: 80, right: 40, bottom: 80, left: 40 },
      },
      columns: [
        {
          width: 33.33,
          settings: {},
          blocks: [
            {
              type: 'heading',
              props: { level: 'h3', content: 'Hızlı' },
            },
            {
              type: 'text',
              props: { content: 'Lightning fast performance' },
            },
          ],
        },
        {
          width: 33.33,
          settings: {},
          blocks: [
            {
              type: 'heading',
              props: { level: 'h3', content: 'Güvenli' },
            },
            {
              type: 'text',
              props: { content: 'Enterprise-grade security' },
            },
          ],
        },
        {
          width: 33.33,
          settings: {},
          blocks: [
            {
              type: 'heading',
              props: { level: 'h3', content: 'Ölçeklenebilir' },
            },
            {
              type: 'text',
              props: { content: 'Grows with your business' },
            },
          ],
        },
      ],
    },
  ],
};

