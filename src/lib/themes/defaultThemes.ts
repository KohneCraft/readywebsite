// ============================================
// Page Builder - Default Themes
// Örnek tema verileri
// ============================================

import type { ThemeData } from '@/types/theme';

/**
 * Modern Business Teması
 */
export const modernBusinessTheme: ThemeData = {
  metadata: {
    id: 'theme-modern',
    name: 'Modern Business',
    description: 'Modern ve minimal iş web sitesi teması',
    version: '1.0.0',
    thumbnail: '/themes/modern/preview.jpg',
    author: 'Page Builder',
    category: 'business',
    pages: [
      {
        slug: 'home',
        title: 'Ana Sayfa',
        file: 'pages/home.json',
      },
      {
        slug: 'about',
        title: 'Hakkımızda',
        file: 'pages/about.json',
      },
      {
        slug: 'contact',
        title: 'İletişim',
        file: 'pages/contact.json',
      },
    ],
    settings: {
      primaryColor: '#007bff',
      secondaryColor: '#6c757d',
      fontFamily: 'Inter',
    },
  },
  pages: {
    home: {
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
    },
    about: {
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
    },
    contact: {
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
    },
  },
};

/**
 * Minimal Teması
 */
export const minimalTheme: ThemeData = {
  metadata: {
    id: 'theme-minimal',
    name: 'Minimal',
    description: 'Sade ve şık minimal tema',
    version: '1.0.0',
    thumbnail: '/themes/minimal/preview.jpg',
    author: 'Page Builder',
    category: 'portfolio',
    pages: [
      {
        slug: 'home',
        title: 'Ana Sayfa',
        file: 'pages/home.json',
      },
    ],
    settings: {
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      fontFamily: 'Helvetica',
    },
  },
  pages: {
    home: {
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
    },
  },
};

/**
 * Corporate Teması
 */
export const corporateTheme: ThemeData = {
  metadata: {
    id: 'theme-corporate',
    name: 'Corporate',
    description: 'Kurumsal işletmeler için profesyonel tema',
    version: '1.0.0',
    thumbnail: '/themes/corporate/preview.jpg',
    author: 'Page Builder',
    category: 'corporate',
    pages: [
      {
        slug: 'home',
        title: 'Ana Sayfa',
        file: 'pages/home.json',
      },
    ],
    settings: {
      primaryColor: '#1e40af',
      secondaryColor: '#64748b',
      fontFamily: 'Roboto',
    },
  },
  pages: {
    home: {
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
    },
  },
};

/**
 * Tüm temaları getir
 */
export function getDefaultThemes(): ThemeData[] {
  return [modernBusinessTheme, minimalTheme, corporateTheme];
}

