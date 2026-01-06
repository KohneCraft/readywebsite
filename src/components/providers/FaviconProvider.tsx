'use client';

// ============================================
// Favicon Provider
// Site favicon'unu dinamik olarak günceller
// ============================================

import { useEffect, useRef } from 'react';
import { getSiteSettings } from '@/lib/firebase/firestore';
import { logger } from '@/lib/logger';

export function FaviconProvider() {
  const isInitializedRef = useRef(false);
  const currentFaviconRef = useRef<string>('');
  
  useEffect(() => {
    // Sadece bir kez çalışsın
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;
    
    async function updateFavicon() {
      try {
        const settings = await getSiteSettings();
        const faviconUrl = settings?.logo?.favicon?.url;
        
        // Eğer aynı favicon zaten yüklüyse, hiçbir şey yapma
        if (faviconUrl === currentFaviconRef.current) {
          return;
        }
        
        if (faviconUrl) {
          currentFaviconRef.current = faviconUrl;
          
          // Mevcut favicon linklerini kaldır (React-safe)
          const existingLinks = Array.from(document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]'));
          existingLinks.forEach(link => {
            try {
              if (link && link.parentNode && document.head.contains(link)) {
                link.parentNode.removeChild(link);
              }
            } catch (error) {
              // Sessizce yoksay
            }
          });
          
          // Yeni favicon ekle
          const link = document.createElement('link');
          link.rel = 'icon';
          link.type = 'image/x-icon';
          link.href = faviconUrl;
          link.setAttribute('data-favicon-provider', 'true');
          document.head.appendChild(link);
          
          // Apple touch icon
          const appleLink = document.createElement('link');
          appleLink.rel = 'apple-touch-icon';
          appleLink.href = faviconUrl;
          appleLink.setAttribute('data-favicon-provider', 'true');
          document.head.appendChild(appleLink);
        }
      } catch (error) {
        logger.ui.error('Favicon güncelleme hatası', error);
      }
    }
    
    updateFavicon();
    
    // Theme güncellemelerini dinle
    const handleThemeUpdate = () => {
      // Theme değiştiğinde favicon'u güncelle
      currentFaviconRef.current = ''; // Reset cache
      updateFavicon();
    };
    
    window.addEventListener('theme-updated', handleThemeUpdate);
    
    return () => {
      window.removeEventListener('theme-updated', handleThemeUpdate);
    };
  }, []); // Boş dependency array - sadece mount'ta çalış
  
  return null;
}

