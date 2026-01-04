'use client';

// ============================================
// Favicon Provider
// Site favicon'unu dinamik olarak günceller
// ============================================

import { useEffect } from 'react';
import { getSiteSettings } from '@/lib/firebase/firestore';

export function FaviconProvider() {
  useEffect(() => {
    async function updateFavicon() {
      try {
        const settings = await getSiteSettings();
        const faviconUrl = settings?.logo?.favicon?.url;
        
        if (faviconUrl) {
          // Mevcut favicon linklerini kaldır
          const existingLinks = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
          existingLinks.forEach(link => link.remove());
          
          // Yeni favicon ekle
          const link = document.createElement('link');
          link.rel = 'icon';
          link.type = 'image/x-icon';
          link.href = faviconUrl;
          document.head.appendChild(link);
          
          // Apple touch icon
          const appleLink = document.createElement('link');
          appleLink.rel = 'apple-touch-icon';
          appleLink.href = faviconUrl;
          document.head.appendChild(appleLink);
        }
      } catch (error) {
        console.error('Favicon güncelleme hatası:', error);
      }
    }
    
    updateFavicon();
    
    // Theme güncellemelerini dinle
    const handleThemeUpdate = () => {
      updateFavicon();
    };
    
    window.addEventListener('theme-updated', handleThemeUpdate);
    
    return () => {
      window.removeEventListener('theme-updated', handleThemeUpdate);
    };
  }, []);
  
  return null;
}

