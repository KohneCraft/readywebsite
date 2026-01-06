import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ThemeProvider as PageBuilderThemeProvider } from '@/contexts/ThemeContext';
import { FaviconProvider } from '@/components/providers/FaviconProvider';
import { TitleProvider } from '@/components/providers/TitleProvider';
import { locales, type Locale } from '@/i18n';
import { PublicLayout } from '@/components/layout/PublicLayout';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <PageBuilderThemeProvider>
          <FaviconProvider />
          <TitleProvider />
          <div className={`${inter.variable} font-sans antialiased`}>
            <PublicLayout>{children}</PublicLayout>
          </div>
        </PageBuilderThemeProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
