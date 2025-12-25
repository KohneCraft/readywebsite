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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vavyapi.com'),
  title: {
    default: 'Vav Yapı | İnşaat & Müteahhitlik',
    template: '%s | Vav Yapı',
  },
  description: 'Güvenilir ve kaliteli inşaat hizmetleri. Konut, ticari ve endüstriyel projeleriniz için profesyonel çözümler. 30+ yıllık deneyim ile hayallerinizdeki yapıları gerçeğe dönüştürüyoruz.',
  keywords: ['inşaat', 'müteahhitlik', 'konut', 'ticari', 'endüstriyel', 'proje', 'yapı', 'Vav Yapı', 'İstanbul inşaat', 'müteahhit'],
  authors: [{ name: 'Vav Yapı' }],
  creator: 'Vav Yapı',
  publisher: 'Vav Yapı',
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
    alternateLocale: ['en_US', 'de_DE', 'fr_FR'],
    siteName: 'Vav Yapı',
    title: 'Vav Yapı | İnşaat & Müteahhitlik',
    description: 'Güvenilir ve kaliteli inşaat hizmetleri. Konut, ticari ve endüstriyel projeleriniz için profesyonel çözümler.',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vav Yapı | İnşaat & Müteahhitlik',
    description: 'Güvenilir ve kaliteli inşaat hizmetleri. 30+ yıllık deneyim.',
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
  icons: {
    icon: [
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
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

