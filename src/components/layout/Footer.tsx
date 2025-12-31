'use client';

// ============================================
// Page Builder - Footer Component
// Site footer with links and info
// ============================================

import { useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { 
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;

  const getLocalizedHref = useCallback((href: string) => {
    if (locale === 'tr') return href;
    return `/${locale}${href}`;
  }, [locale]);

  const quickLinks = useMemo(() => [
    { href: '/admin/page-builder', label: tNav('home') },
  ], [tNav]);

  const socialLinks = useMemo(() => [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ], []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Company info */}
          <div className="lg:col-span-1">
            <Link href={getLocalizedHref('/admin/page-builder')} className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PB</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white leading-tight">Page Builder</span>
                <span className="text-xs text-gray-400">Visual Page Editor</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Kod bilgisi olmadan profesyonel web sayfaları oluşturun.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    'bg-gray-800 hover:bg-primary-600 transition-colors'
                  )}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getLocalizedHref(link.href)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 text-primary-500 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              {t('copyright', { year: currentYear })}
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href={getLocalizedHref('/privacy')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t('privacyPolicy')}
              </Link>
              <Link
                href={getLocalizedHref('/terms')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
