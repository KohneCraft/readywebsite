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
  title: {
    default: 'Vav Yapı | İnşaat & Müteahhitlik',
    template: '%s | Vav Yapı',
  },
  description: 'Güvenilir ve kaliteli inşaat hizmetleri. Konut, ticari ve endüstriyel projeleriniz için profesyonel çözümler.',
  keywords: ['inşaat', 'müteahhitlik', 'konut', 'ticari', 'endüstriyel', 'proje', 'yapı', 'Vav Yapı'],
  authors: [{ name: 'Vav Yapı' }],
  creator: 'Vav Yapı',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Vav Yapı',
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Vav Yapı',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

