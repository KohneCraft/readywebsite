import type { Metadata, Viewport } from 'next';
import './globals.css';

// Root layout sadece temel HTML yapısını içerir
// Locale-specific layout [locale]/layout.tsx'te

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2563eb' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://pagebuilder.com'),
  title: {
    default: 'Page Builder | Modern Web Sayfaları Oluşturun',
    template: '%s | Page Builder',
  },
  description: 'Modern ve esnek web sayfaları oluşturun. Drag & drop ile kolay sayfa tasarımı. Responsive ve SEO uyumlu sayfalar.',
  keywords: ['page builder', 'web sayfası oluştur', 'drag drop', 'sayfa tasarımı', 'responsive', 'SEO', 'web tasarım', 'Page Builder'],
  authors: [{ name: 'Page Builder' }],
  creator: 'Page Builder',
  publisher: 'Page Builder',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Page Builder',
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: ['en_US', 'de_DE', 'fr_FR'],
    siteName: 'Page Builder',
    title: 'Page Builder | Modern Web Sayfaları Oluşturun',
    description: 'Modern ve esnek web sayfaları oluşturun. Drag & drop ile kolay sayfa tasarımı.',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Builder | Modern Web Sayfaları Oluşturun',
    description: 'Modern ve esnek web sayfaları oluşturun. Responsive ve SEO uyumlu sayfalar.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  // Icons artık dinamik - /app/icon.tsx ve /app/apple-icon.tsx tarafından yönetiliyor
  alternates: {
    canonical: '/',
    languages: {
      'tr': '/tr',
      'en': '/en',
      'de': '/de',
      'fr': '/fr',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

