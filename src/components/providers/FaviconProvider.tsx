'use client';

// ============================================
// Favicon Provider
// Logo'yu favicon olarak dinamik günceller
// ============================================

import { useEffect, useRef } from 'react';
import { getSiteSettingsClient } from '@/lib/firebase/firestore';
import { logger } from '@/lib/logger';

export function FaviconProvider() {
  const currentFaviconRef = useRef<string>('');
  const isInitializedRef = useRef(false);

  useEffect(() => {
    async function updateFavicon() {
      try {
        const settings = await getSiteSettingsClient();
        // Önce browserFavicon'u kontrol et, yoksa logo kullan
        const logoUrl = (settings as any).browserFavicon || settings?.logo?.light?.url || settings?.logo?.favicon?.url;

        // Eğer favicon URL'i yoksa veya aynıysa, hiçbir şey yapma
        if (!logoUrl || logoUrl === currentFaviconRef.current) {
          return;
        }

        currentFaviconRef.current = logoUrl;

        // Cache busting: URL'e timestamp ekle
        const cacheBustedUrl = `${logoUrl}?v=${Date.now()}`;

        // SADECE dinamik eklenen favicon'ları kaldır (data-favicon-dynamic attribute'u olan)
        // Next.js tarafından yönetilen favicon'lara dokunma!
        const dynamicFavicons = document.querySelectorAll('link[data-favicon-dynamic="true"]');
        dynamicFavicons.forEach(link => {
          if (link.parentNode) {
            link.parentNode.removeChild(link);
          }
        });

        // Yeni favicon'ları ekle
        // Standard favicon (32x32)
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        link.sizes = '32x32';
        link.href = cacheBustedUrl;
        link.setAttribute('data-favicon-dynamic', 'true');
        document.head.appendChild(link);

        // Shortcut icon (eski tarayıcılar için)
        const shortcutLink = document.createElement('link');
        shortcutLink.rel = 'shortcut icon';
        shortcutLink.href = cacheBustedUrl;
        shortcutLink.setAttribute('data-favicon-dynamic', 'true');
        document.head.appendChild(shortcutLink);

        // Apple touch icon (180x180)
        const appleLink = document.createElement('link');
        appleLink.rel = 'apple-touch-icon';
        appleLink.sizes = '180x180';
        appleLink.href = cacheBustedUrl;
        appleLink.setAttribute('data-favicon-dynamic', 'true');
        document.head.appendChild(appleLink);

        logger.ui.debug('Favicon güncellendi', { url: logoUrl });
      } catch (error) {
        logger.ui.error('Favicon güncelleme hatası', error);
      }
    }

    // Sadece bir kez initialize et
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      updateFavicon();
    }

    // Site settings güncellemelerini dinle
    const handleSettingsUpdate = () => {
      currentFaviconRef.current = ''; // Cache'i temizle
      updateFavicon();
    };

    window.addEventListener('site-settings-updated', handleSettingsUpdate);

    return () => {
      window.removeEventListener('site-settings-updated', handleSettingsUpdate);
    };
  }, []);

  return null;
}
