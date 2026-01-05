'use client';

// ============================================
// Page Builder - Header Component
// Main navigation header
// ============================================

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useTheme } from '@/contexts/ThemeContext';
import { getSiteSettings } from '@/lib/firebase/firestore';
import type { Locale } from '@/i18n';
import type { SiteSettings } from '@/types/settings';

interface NavItem {
  href: string;
  label: string;
}

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const { themeSettings } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  // Site settings'i yükle
  useEffect(() => {
    async function loadSiteSettings() {
      try {
        const settings = await getSiteSettings();
        setSiteSettings(settings);
      } catch (error) {
        console.error('Site settings yükleme hatası:', error);
      }
    }
    loadSiteSettings();

    // Site settings güncellendiğinde yeniden yükle
    const handleSettingsUpdate = () => {
      loadSiteSettings();
    };
    window.addEventListener('site-settings-updated', handleSettingsUpdate);
    return () => {
      window.removeEventListener('site-settings-updated', handleSettingsUpdate);
    };
  }, []);

  // Tema ayarlarından navigation items'ı al
  const navItems: NavItem[] = useMemo(() => {
    console.log('Header - themeSettings:', themeSettings);
    console.log('Header - header navItems:', themeSettings?.header?.navItems);
    if (themeSettings?.header?.navItems && themeSettings.header.navItems.length > 0) {
      console.log('Header - navItems kullanılıyor:', themeSettings.header.navItems);
      return themeSettings.header.navItems;
    }
    // Varsayılan navigation
    console.log('Header - varsayılan navItems kullanılıyor');
    return [
      { href: '/', label: t('home') },
    ];
  }, [themeSettings, t]);

  // Site settings'ten logo ve firma adını al, yoksa tema ayarlarından
  const logoText = useMemo(() => {
    if (siteSettings?.siteName?.[locale as keyof typeof siteSettings.siteName]) {
      return siteSettings.siteName[locale as keyof typeof siteSettings.siteName];
    }
    return themeSettings?.header?.logoText || 'Page Builder';
  }, [siteSettings, themeSettings, locale]);

  const logoUrl = useMemo(() => {
    if (siteSettings?.logo?.light?.url) {
      return siteSettings.logo.light.url;
    }
    return themeSettings?.header?.logo || '';
  }, [siteSettings, themeSettings]);

  const headerBgColor = useMemo(() => {
    return themeSettings?.header?.backgroundColor || undefined;
  }, [themeSettings]);

  const headerTextColor = useMemo(() => {
    return themeSettings?.header?.textColor || undefined;
  }, [themeSettings]);

  // Generate localized href
  const getLocalizedHref = useCallback((href: string) => {
    if (locale === 'tr') return href;
    return `/${locale}${href}`;
  }, [locale]);

  // Check if link is active
  const isActive = useCallback((href: string) => {
    // Ana sayfa kontrolü
    if (href === '/') {
      return pathname === '/' || pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    
    // Diğer sayfalar için slug karşılaştırması
    // href'den başlangıç "/" işaretini kaldır
    const hrefSlug = href.startsWith('/') ? href.slice(1) : href;
    
    // pathname'den locale prefix'ini çıkar
    // Örnek: "/tr/about" -> "about", "/en/about" -> "about"
    let pathnameSlug = pathname;
    if (pathname.startsWith(`/${locale}/`)) {
      pathnameSlug = pathname.slice(`/${locale}/`.length);
    } else if (pathname.startsWith(`/${locale}`)) {
      pathnameSlug = pathname.slice(`/${locale}`.length);
      if (pathnameSlug.startsWith('/')) {
        pathnameSlug = pathnameSlug.slice(1);
      }
    } else if (pathname.startsWith('/')) {
      pathnameSlug = pathname.slice(1);
    }
    
    // Trailing slash'i kaldır
    if (pathnameSlug.endsWith('/')) {
      pathnameSlug = pathnameSlug.slice(0, -1);
    }
    
    // Slug'lar eşleşiyorsa aktif
    return pathnameSlug === hrefSlug;
  }, [pathname, locale]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-gray-900 dark:bg-gray-950 text-white text-sm py-2">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-6">
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="buttons" />
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'backdrop-blur-md shadow-md'
            : ''
        )}
        style={{
          backgroundColor: headerBgColor 
            ? (isScrolled ? `${headerBgColor}95` : headerBgColor)
            : undefined,
          color: headerTextColor || undefined,
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href={getLocalizedHref('/')} prefetch={false} className="flex items-center gap-2">
              {logoUrl ? (
                <Image
                  src={logoUrl} 
                  alt={logoText}
                  width={160}
                  height={40}
                  className="h-10 w-auto"
                  unoptimized
                />
              ) : (
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">PB</span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">{logoText}</span>
                {siteSettings?.siteSlogan?.[locale as keyof typeof siteSettings.siteSlogan] && (
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    {siteSettings.siteSlogan[locale as keyof typeof siteSettings.siteSlogan]}
                  </span>
                )}
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={getLocalizedHref(item.href)}
                  className={cn(
                    'relative font-medium transition-colors py-2',
                    isActive(item.href)
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>

              {/* Admin Link - Sadece admin sayfalarında göster */}
              {pathname.includes('/admin') && (
                <Link
                  href={getLocalizedHref('/admin')}
                  className="hidden md:inline-flex btn btn-primary text-sm"
                >
                  Dashboard
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[90vw] bg-white dark:bg-gray-900 z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Close button */}
                <div className="flex items-center justify-between mb-8">
                  <Link href={getLocalizedHref('/admin/page-builder')} prefetch={false} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xs">PB</span>
                    </div>
                    <span className="font-bold">Page Builder</span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={getLocalizedHref(item.href)}
                      className={cn(
                        'px-4 py-3 rounded-lg font-medium transition-colors',
                        isActive(item.href)
                          ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                {/* Divider */}
                <hr className="my-6 border-gray-200 dark:border-gray-700" />

                {/* Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Tema</span>
                    <ThemeToggle variant="dropdown" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Dil</span>
                    <LanguageSwitcher variant="buttons" />
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
