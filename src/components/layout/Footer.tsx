'use client';

// ============================================
// Vav Yapı - Footer Component
// Site footer with links and info
// ============================================

import { useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
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
    { href: '/', label: tNav('home') },
    { href: '/about', label: tNav('about') },
    { href: '/projects', label: tNav('projects') },
    { href: '/services', label: tNav('services') },
    { href: '/contact', label: tNav('contact') },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company info */}
          <div className="lg:col-span-1">
            <Link href={getLocalizedHref('/')} className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white leading-tight">VAV YAPI</span>
                <span className="text-xs text-gray-400">İnşaat & Müteahhitlik</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              {t('description')}
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

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('contactInfo')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Maslak Mahallesi, AOS 55. Sokak<br />
                  42 Maslak Ofis 3, Kat: 2<br />
                  Sarıyer / İstanbul
                </span>
              </li>
              <li>
                <a
                  href="tel:+902121234567"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  +90 212 123 45 67
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@vavyapi.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  info@vavyapi.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span className="text-gray-400">
                  Pazartesi - Cuma: 09:00 - 18:00
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('newsletter')}</h3>
            <p className="text-gray-400 text-sm mb-4">
              {t('newsletterDesc')}
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                className={cn(
                  'w-full px-4 py-3 rounded-lg',
                  'bg-gray-800 border border-gray-700',
                  'text-white placeholder:text-gray-500',
                  'focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none',
                  'transition-colors'
                )}
              />
              <button
                type="submit"
                className="w-full btn btn-primary"
              >
                {t('subscribe')}
              </button>
            </form>
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
