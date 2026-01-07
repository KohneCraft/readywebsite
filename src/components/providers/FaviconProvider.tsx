'use client';

// ============================================
// Favicon Provider
// Logo'yu favicon olarak dinamik günceller
// ============================================

import { useEffect, useRef } from 'react';
import { getSiteSettings } from '@/lib/firebase/firestore';
import { logger } from '@/lib/logger';

export function FaviconProvider() {
  const currentFaviconRef = useRef<string>('');
  
  useEffect(() => {
    async function updateFavicon() {
      try {
        const settings = await getSiteSettings();
        // Logo URL'ini favicon olarak kullan
        const logoUrl = settings?.logo?.light?.url || settings?.logo?.favicon?.url;
        
        // Eğer aynı logo zaten favicon olarak yüklüyse, hiçbir şey yapma
        if (logoUrl === currentFaviconRef.current) {
          return;
        }
        
        if (logoUrl) {
          currentFaviconRef.current = logoUrl;
          
          // Sadece bizim eklediğimiz favicon'ları güncelle
          const existingFavicons = document.querySelectorAll('link[data-favicon-dynamic="true"]');
          existingFavicons.forEach(link => {
            link.setAttribute('href', logoUrl);
          });
          
          // Eğer hiç favicon yoksa, yeni ekle
          if (existingFavicons.length === 0) {
            // Standard favicon
            const link = document.createElement('link');
            link.rel = 'icon';
            link.type = 'image/png';
            link.href = logoUrl;
            link.setAttribute('data-favicon-dynamic', 'true');
            document.head.appendChild(link);
            
            // Apple touch icon
            const appleLink = document.createElement('link');
            appleLink.rel = 'apple-touch-icon';
            appleLink.href = logoUrl;
            appleLink.setAttribute('data-favicon-dynamic', 'true');
            document.head.appendChild(appleLink);
          }
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

