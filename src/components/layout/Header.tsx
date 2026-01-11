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
import { getSiteSettingsClient } from '@/lib/firebase/firestore';
import { getEffectiveColor } from '@/lib/themeColors';
import { useTheme as useNextTheme } from 'next-themes';
import { logger } from '@/lib/logger';
import { ChevronDown } from 'lucide-react';
import type { Locale } from '@/i18n';
import type { SiteSettings } from '@/types/settings';
import type { NavItem } from '@/types/theme';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const { themeSettings } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Açık dropdown menu
  const [mobileExpandedItems, setMobileExpandedItems] = useState<string[]>([]); // Mobilde açık alt menüler

  // Site settings'i yükle
  useEffect(() => {
    async function loadSiteSettings() {
      try {
        const settings = await getSiteSettingsClient();
        setSiteSettings(settings);
      } catch (error) {
        logger.ui.error('Site settings yükleme hatası', error);
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
    logger.ui.debug('Header themeSettings', { header: themeSettings?.header?.navItems });
    if (themeSettings?.header?.navItems && themeSettings.header.navItems.length > 0) {
      return themeSettings.header.navItems;
    }
    // Varsayılan navigation
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

  // next-themes'den koyu tema durumunu al
  const { resolvedTheme } = useNextTheme();
  const isDarkMode = resolvedTheme === 'dark';

  const headerBgColor = useMemo(() => {
    const lightColor = (themeSettings?.header as any)?.backgroundColor;
    const darkColor = (themeSettings?.header as any)?.backgroundColorDark;
    return getEffectiveColor(lightColor, darkColor, isDarkMode);
  }, [themeSettings, isDarkMode]);

  const headerTextColor = useMemo(() => {
    const lightColor = (themeSettings?.header as any)?.textColor;
    const darkColor = (themeSettings?.header as any)?.textColorDark;
    return getEffectiveColor(lightColor, darkColor, isDarkMode);
  }, [themeSettings, isDarkMode]);

  const isSticky = useMemo(() => {
    return themeSettings?.header?.sticky !== false; // Default true
  }, [themeSettings]);

  const isTransparent = useMemo(() => {
    return themeSettings?.header?.transparent === true;
  }, [themeSettings]);

  // Hover ile menü açma ayarı
  const hoverOpenMenu = useMemo(() => {
    return themeSettings?.header?.hoverOpenMenu !== false; // Default true
  }, [themeSettings]);

  // Firma adı ve slogan renkleri - tema desteği ile
  const effectiveNameColor = useMemo(() => {
    const lightColor = siteSettings?.companyNameStyle?.color || headerTextColor;
    const darkColor = siteSettings?.companyNameStyle?.colorDark;
    return getEffectiveColor(lightColor, darkColor, isDarkMode);
  }, [siteSettings?.companyNameStyle?.color, siteSettings?.companyNameStyle?.colorDark, headerTextColor, isDarkMode]);

  const effectiveSloganColor = useMemo(() => {
    const lightColor = siteSettings?.sloganStyle?.color || (headerTextColor ? `${headerTextColor}CC` : undefined);
    const darkColor = siteSettings?.sloganStyle?.colorDark;
    return getEffectiveColor(lightColor, darkColor, isDarkMode);
  }, [siteSettings?.sloganStyle?.color, siteSettings?.sloganStyle?.colorDark, headerTextColor, isDarkMode]);

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
      {/* Main header */}
      <header
        className={cn(
          'z-50 w-full transition-all duration-300',
          isSticky && 'sticky top-0',
          isScrolled && !isTransparent
            ? 'backdrop-blur-md shadow-md'
            : ''
        )}
        style={{
          backgroundColor: isTransparent
            ? 'transparent'
            : headerBgColor
              ? (isScrolled ? `${headerBgColor}95` : headerBgColor)
              : undefined,
          color: headerTextColor || undefined,
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 xl:h-20 gap-4">
            {/* Logo */}
            <Link href={getLocalizedHref('/')} prefetch={false} className="flex items-center gap-2 flex-shrink-0 min-w-0 max-w-[280px] xl:max-w-none">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={logoText}
                  width={160}
                  height={40}
                  className="h-8 xl:h-10 w-auto flex-shrink-0"
                  unoptimized
                />
              ) : (
                <div className="w-8 h-8 xl:w-10 xl:h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg xl:text-xl">PB</span>
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span
                  className="font-bold leading-tight truncate"
                  style={{
                    color: effectiveNameColor || undefined,
                    fontSize: siteSettings?.companyNameStyle?.fontSize ? `${siteSettings.companyNameStyle.fontSize}px` : undefined,
                  }}
                >
                  {logoText}
                </span>
                {siteSettings?.siteSlogan?.[locale as keyof typeof siteSettings.siteSlogan] && (
                  <span
                    className="hidden sm:block text-xs xl:text-sm truncate"
                    style={{
                      color: effectiveSloganColor || undefined,
                      fontSize: siteSettings?.sloganStyle?.fontSize ? `${siteSettings.sloganStyle.fontSize}px` : undefined,
                    }}
                  >
                    {siteSettings.siteSlogan[locale as keyof typeof siteSettings.siteSlogan]}
                  </span>
                )}
              </div>
            </Link>

            {/* Desktop Navigation - xl (1280px) ve üzerinde görünür */}
            <nav className="hidden xl:flex items-center gap-4 2xl:gap-6 flex-shrink-0">
              {navItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isDropdownOpen = openDropdown === item.href;

                // Alt linki olmayan normal linkler
                if (!hasChildren) {
                  return (
                    <Link
                      key={item.href}
                      href={getLocalizedHref(item.href)}
                      prefetch={false}
                      className={cn(
                        'relative font-medium transition-colors py-2 whitespace-nowrap text-sm 2xl:text-base',
                        isActive(item.href)
                          ? headerTextColor
                            ? ''
                            : 'text-primary-600 dark:text-primary-400'
                          : headerTextColor
                            ? ''
                            : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                      )}
                      style={{
                        color: headerTextColor
                          ? (isActive(item.href) ? headerTextColor : `${headerTextColor}DD`)
                          : undefined,
                      }}
                    >
                      {item.label}
                      {isActive(item.href) && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute -bottom-1 left-0 right-0 h-0.5"
                          style={{
                            backgroundColor: headerTextColor || undefined,
                          }}
                        />
                      )}
                    </Link>
                  );
                }

                // Dropdown menü - alt linki olan
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => hoverOpenMenu && setOpenDropdown(item.href)}
                    onMouseLeave={() => hoverOpenMenu && setOpenDropdown(null)}
                  >
                    <button
                      onClick={() => !hoverOpenMenu && setOpenDropdown(isDropdownOpen ? null : item.href)}
                      className={cn(
                        'flex items-center gap-1 relative font-medium transition-colors py-2 whitespace-nowrap text-sm 2xl:text-base',
                        headerTextColor
                          ? ''
                          : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                      )}
                      style={{
                        color: headerTextColor ? `${headerTextColor}DD` : undefined,
                      }}
                    >
                      {item.label}
                      <ChevronDown className={cn(
                        'w-4 h-4 transition-transform',
                        isDropdownOpen && 'rotate-180'
                      )} />
                    </button>

                    {/* Dropdown Panel */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 py-2 min-w-[180px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                        >
                          {item.children?.map((child) => (
                            <Link
                              key={child.href}
                              href={getLocalizedHref(child.href)}
                              prefetch={false}
                              onClick={() => setOpenDropdown(null)}
                              className={cn(
                                'block px-4 py-2 text-sm transition-colors',
                                isActive(child.href)
                                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <div className="hidden xl:flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>

              {/* Admin Link - Sadece admin sayfalarında göster */}
              {pathname.includes('/admin') && (
                <Link
                  href={getLocalizedHref('/admin')}
                  prefetch={false}
                  className="hidden md:inline-flex btn btn-primary text-sm"
                >
                  Dashboard
                </Link>
              )}

              {/* Mobile menu button - xl altında görünür */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 xl:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[90vw] bg-white dark:bg-gray-900 z-50 xl:hidden overflow-y-auto"
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
                  {navItems.map((item) => {
                    const hasChildren = item.children && item.children.length > 0;
                    const isExpanded = mobileExpandedItems.includes(item.href);

                    // Alt linki olmayan normal linkler
                    if (!hasChildren) {
                      return (
                        <Link
                          key={item.href}
                          href={getLocalizedHref(item.href)}
                          prefetch={false}
                          className={cn(
                            'px-4 py-3 rounded-lg font-medium transition-colors',
                            isActive(item.href)
                              ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                          )}
                        >
                          {item.label}
                        </Link>
                      );
                    }

                    // Accordion menü - alt linki olan
                    return (
                      <div key={item.href} className="rounded-lg overflow-hidden">
                        <button
                          onClick={() => setMobileExpandedItems(prev =>
                            prev.includes(item.href)
                              ? prev.filter(h => h !== item.href)
                              : [...prev, item.href]
                          )}
                          className={cn(
                            'w-full flex items-center justify-between px-4 py-3 font-medium transition-colors',
                            isExpanded
                              ? 'bg-gray-100 dark:bg-gray-800'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                          )}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className={cn(
                            'w-4 h-4 transition-transform',
                            isExpanded && 'rotate-180'
                          )} />
                        </button>

                        {/* Alt linkler */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden bg-gray-50 dark:bg-gray-800/50"
                            >
                              {item.children?.map((child) => (
                                <Link
                                  key={child.href}
                                  href={getLocalizedHref(child.href)}
                                  prefetch={false}
                                  className={cn(
                                    'block px-6 py-2.5 text-sm transition-colors border-l-2 ml-4',
                                    isActive(child.href)
                                      ? 'border-primary-500 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                  )}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
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
