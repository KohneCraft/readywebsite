'use client';

// ============================================
// Title Provider
// Browser tab başlığını dinamik olarak günceller
// ============================================

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { getSiteSettings } from '@/lib/firebase/firestore';
import { logger } from '@/lib/logger';
import type { Locale } from '@/i18n';

export function TitleProvider() {
  const locale = useLocale() as Locale;
  
  useEffect(() => {
    async function updateTitle() {
      try {
        const settings = await getSiteSettings();
        const siteName = settings?.siteName?.[locale] || settings?.siteName?.tr || 'Page Builder';
        const siteSlogan = settings?.siteSlogan?.[locale] || settings?.siteSlogan?.tr || '';
        
        // Browser tab başlığını güncelle
        document.title = siteSlogan ? `${siteName} | ${siteSlogan}` : siteName;
        
        logger.ui.debug('Browser title güncellendi', { siteName, siteSlogan });
      } catch (error) {
        logger.ui.error('Title güncelleme hatası', error);
      }
    }
    
    updateTitle();
    
    // Site settings güncellemelerini dinle
    const handleSettingsUpdate = () => {
      updateTitle();
    };
    
    window.addEventListener('site-settings-updated', handleSettingsUpdate);
    window.addEventListener('theme-updated', handleSettingsUpdate);
    
    return () => {
      window.removeEventListener('site-settings-updated', handleSettingsUpdate);
      window.removeEventListener('theme-updated', handleSettingsUpdate);
    };
  }, [locale]);
  
  return null;
}
