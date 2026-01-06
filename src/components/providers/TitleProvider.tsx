'use client';

// ============================================
// Title Provider
// Browser tab başlığını dinamik olarak günceller
// ============================================

import { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { getSiteSettings } from '@/lib/firebase/firestore';
import { logger } from '@/lib/logger';
import type { Locale } from '@/i18n';

export function TitleProvider() {
  const locale = useLocale() as Locale;
  const isInitializedRef = useRef(false);
  const currentTitleRef = useRef<string>('');
  
  useEffect(() => {
    async function updateTitle() {
      try {
        const settings = await getSiteSettings();
        const siteName = settings?.siteName?.[locale] || settings?.siteName?.tr || 'Page Builder';
        const siteSlogan = settings?.siteSlogan?.[locale] || settings?.siteSlogan?.tr || '';
        
        const newTitle = siteSlogan ? `${siteName} | ${siteSlogan}` : siteName;
        
        // Eğer title zaten aynıysa, güncelleme yapma
        if (newTitle === currentTitleRef.current) {
          return;
        }
        
        currentTitleRef.current = newTitle;
        
        // Browser tab başlığını güncelle
        document.title = newTitle;
        
        logger.ui.debug('Browser title güncellendi', { siteName, siteSlogan });
      } catch (error) {
        logger.ui.error('Title güncelleme hatası', error);
      }
    }
    
    updateTitle();
    
    // Sadece ilk mount'ta event listener ekle
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      
      // Site settings güncellemelerini dinle
      const handleSettingsUpdate = () => {
        currentTitleRef.current = ''; // Reset cache
        updateTitle();
      };
      
      window.addEventListener('site-settings-updated', handleSettingsUpdate);
      window.addEventListener('theme-updated', handleSettingsUpdate);
      
      return () => {
        window.removeEventListener('site-settings-updated', handleSettingsUpdate);
        window.removeEventListener('theme-updated', handleSettingsUpdate);
      };
    }
  }, [locale]);
  
  return null;
}
