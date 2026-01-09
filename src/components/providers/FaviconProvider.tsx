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

  useEffect(() => {
    async function updateFavicon() {
      try {
        const settings = await getSiteSettingsClient();
        // Önce browserFavicon'u kontrol et, yoksa logo kullan
        const logoUrl = (settings as any).browserFavicon || settings?.logo?.light?.url || settings?.logo?.favicon?.url;

        // Eğer aynı logo zaten favicon olarak yüklüyse, hiçbir şey yapma
        if (logoUrl === currentFaviconRef.current) {
          return;
        }

        if (logoUrl) {
          currentFaviconRef.current = logoUrl;

          // Cache busting: URL'e timestamp ekle
          const cacheBustedUrl = `${logoUrl}?v=${Date.now()}`;

          // Tüm mevcut favicon linklerini kaldır
          const allFavicons = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]');
          allFavicons.forEach(link => {
            link.remove();
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
        }
      } catch (error) {
        logger.ui.error('Favicon güncelleme hatası', error);
      }
    }

    // İlk yükleme
    updateFavicon();

    // Site settings güncellemelerini dinle
    const handleSettingsUpdate = () => {
      currentFaviconRef.current = ''; // Cache'i temizle
      updateFavicon();
    };

    window.addEventListener('site-settings-updated', handleSettingsUpdate);

    return () => {
      window.removeEventListener('site-settings-updated', handleSettingsUpdate);
    };
  }, []); // Boş dependency array - sadece mount'ta çalış

  return null;
}

