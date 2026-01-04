'use client';

// ============================================
// Page Builder - Footer Component
// Site footer with links and info
// ============================================

import { useMemo, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { 
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { getSiteSettings } from '@/lib/firebase/firestore';
import type { Locale } from '@/i18n';
import type { SiteSettings } from '@/types/settings';

// Social icon mapping
const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;
  const { themeSettings } = useTheme();
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

  const getLocalizedHref = useCallback((href: string) => {
    if (locale === 'tr') return href;
    return `/${locale}${href}`;
  }, [locale]);

  // Tema ayarlarından quick links'i al
  const quickLinks = useMemo(() => {
    console.log('Footer - themeSettings:', themeSettings);
    console.log('Footer - footer quickLinks:', themeSettings?.footer?.quickLinks);
    if (themeSettings?.footer?.quickLinks && themeSettings.footer.quickLinks.length > 0) {
      console.log('Footer - quickLinks kullanılıyor:', themeSettings.footer.quickLinks);
      return themeSettings.footer.quickLinks;
    }
    // Varsayılan links
    console.log('Footer - varsayılan quickLinks kullanılıyor');
    return [
      { href: '/', label: tNav('home') },
    ];
  }, [themeSettings, tNav]);

  // Site settings'ten social links'i al, yoksa tema ayarlarından
  const socialLinks = useMemo(() => {
    const links: Array<{ icon: React.ComponentType<{ className?: string }>; href: string; label: string }> = [];
    
    // Site settings'ten sosyal medya linklerini al
    if (siteSettings?.socialLinks) {
      if (siteSettings.socialLinks.facebook) {
        links.push({ icon: Facebook, href: siteSettings.socialLinks.facebook, label: 'Facebook' });
      }
      if (siteSettings.socialLinks.instagram) {
        links.push({ icon: Instagram, href: siteSettings.socialLinks.instagram, label: 'Instagram' });
      }
      if (siteSettings.socialLinks.linkedin) {
        links.push({ icon: Linkedin, href: siteSettings.socialLinks.linkedin, label: 'LinkedIn' });
      }
      if (siteSettings.socialLinks.youtube) {
        links.push({ icon: Youtube, href: siteSettings.socialLinks.youtube, label: 'YouTube' });
      }
    }
    
    // Eğer site settings'te link yoksa, tema ayarlarından al
    if (links.length === 0 && themeSettings?.footer?.socialLinks && themeSettings.footer.socialLinks.length > 0) {
      return themeSettings.footer.socialLinks.map(social => {
        const IconComponent = socialIconMap[social.platform.toLowerCase()] || Facebook;
        return {
          icon: IconComponent,
          href: social.url,
          label: social.platform,
        };
      });
    }
    
    // Eğer hiç link yoksa varsayılan linkler
    if (links.length === 0) {
      return [
        { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
        { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
      ];
    }
    
    return links;
  }, [siteSettings, themeSettings]);

  // Site settings'ten footer bilgilerini al, yoksa tema ayarlarından
  const footerLogoText = useMemo(() => {
    if (siteSettings?.siteName?.[locale as keyof typeof siteSettings.siteName]) {
      return siteSettings.siteName[locale as keyof typeof siteSettings.siteName];
    }
    return themeSettings?.footer?.logoText || 'Page Builder';
  }, [siteSettings, themeSettings, locale]);

  const footerLogoUrl = useMemo(() => {
    if (siteSettings?.logo?.light?.url) {
      return siteSettings.logo.light.url;
    }
    return themeSettings?.footer?.logo || '';
  }, [siteSettings, themeSettings]);

  const footerDescription = useMemo(() => {
    return themeSettings?.footer?.description || 'Kod bilgisi olmadan profesyonel web sayfaları oluşturun.';
  }, [themeSettings]);

  const footerCopyright = useMemo(() => {
    return themeSettings?.footer?.copyright || `© ${new Date().getFullYear()} Page Builder. Tüm hakları saklıdır.`;
  }, [themeSettings]);

  const footerBgColor = useMemo(() => {
    return themeSettings?.footer?.backgroundColor || undefined;
  }, [themeSettings]);

  const footerTextColor = useMemo(() => {
    return themeSettings?.footer?.textColor || undefined;
  }, [themeSettings]);

  return (
    <footer 
      className="text-gray-300"
      style={{
        backgroundColor: footerBgColor || undefined,
        color: footerTextColor || undefined,
      }}
    >
      {/* Main footer */}
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Company info */}
          <div className="lg:col-span-1">
            <Link href={getLocalizedHref('/')} className="flex items-center gap-2 mb-4">
              {footerLogoUrl ? (
                <Image
                  src={footerLogoUrl} 
                  alt={footerLogoText}
                  width={160}
                  height={40}
                  className="h-10 w-auto"
                  unoptimized
                />
              ) : (
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PB</span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white leading-tight">{footerLogoText}</span>
                {siteSettings?.siteSlogan?.[locale as keyof typeof siteSettings.siteSlogan] && (
                  <span className="text-xs text-gray-400">
                    {siteSettings.siteSlogan[locale as keyof typeof siteSettings.siteSlogan]}
                  </span>
                )}
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              {footerDescription}
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
              {footerCopyright}
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
