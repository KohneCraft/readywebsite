'use client';

// ============================================
// Page Builder - Theme Context
// Aktif tema ayarlarını sağlar
// ============================================

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getDefaultThemes } from '@/lib/themes/default/defaultThemes';
import { logger } from '@/lib/logger';
import type { ThemeData, ThemeSettings } from '@/types/theme';

interface ThemeContextType {
  currentTheme: ThemeData | null;
  themeSettings: ThemeSettings | null;
  setCurrentTheme: (theme: ThemeData | null) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);

  // Firestore'dan aktif temayı yükle
  const loadCurrentTheme = async () => {
    try {
      logger.theme.debug('loadCurrentTheme başlatıldı');
      // Önce siteSettings'ten aktif tema bilgisini al
      const { getSiteSettings, getAvailableThemes } = await import('@/lib/firebase/firestore');
      
      let activeThemeName: string | null = null;
      let activeThemeId: string | null = null;
      
      try {
        const siteSettings = await getSiteSettings();
        activeThemeName = siteSettings.activeThemeName || null;
        activeThemeId = siteSettings.activeThemeId || null;
        logger.theme.debug(`SiteSettings'ten aktif tema: ${activeThemeName} (ID: ${activeThemeId})`);
      } catch (error) {
        logger.theme.warn('SiteSettings yüklenirken hata:', error);
      }
      
      // Firestore'dan yüklenmiş temaları kontrol et
      const firestoreThemes = await getAvailableThemes();
      logger.theme.debug('Firestore temaları:', firestoreThemes.map(t => ({ id: t.id, name: t.name })));
      
      const defaultThemes = getDefaultThemes();
      logger.theme.debug('Varsayılan temalar:', defaultThemes.map(t => t.metadata.name));
      
      // Aktif tema bilgisi varsa, o temayı bul
      if (activeThemeName || activeThemeId) {
        const targetTheme = firestoreThemes.find(t => 
          t.name === activeThemeName || 
          t.id === activeThemeId ||
          (activeThemeId && t.id.includes(activeThemeId.replace('theme-', '')))
        );
        
        if (targetTheme) {
          logger.theme.info(`Aktif tema bulundu: ${targetTheme.name} (ID: ${targetTheme.id})`);
          // Default temalardan eşleştir
          let matchedTheme = defaultThemes.find(t => 
            t.metadata.name === targetTheme.name || 
            t.metadata.id === targetTheme.id ||
            targetTheme.id.includes(t.metadata.id.replace('theme-', ''))
          );
          
          if (matchedTheme) {
            // Firestore'dan özel ayarları çek (kullanıcının yaptığı değişiklikler)
            try {
              const { getThemeMetadata } = await import('@/lib/firebase/firestore');
              const firestoreMetadata = await getThemeMetadata(targetTheme.id);
              
              if (firestoreMetadata?.settings) {
                logger.theme.info('Firestore\'dan özel ayarlar yüklendi');
                
                // Firestore ayarlarını TAMAMEN kullan (merge YOK)
                // Tema yüklendiğinde Firestore'a orijinal ayarlar yazılıyor,
                // dolayısıyla Firestore'daki veri zaten complete
                matchedTheme = {
                  ...matchedTheme,
                  metadata: {
                    ...matchedTheme.metadata,
                    settings: firestoreMetadata.settings, // Direkt Firestore'dan al, merge etme
                  },
                };
                logger.theme.info('✓ Tema Firestore ayarlarıyla yüklendi:', matchedTheme.metadata.name);
                logger.theme.info('✓ Header navItems:', firestoreMetadata.settings.header?.navItems?.length || 0);
                logger.theme.info('✓ Footer quickLinks:', firestoreMetadata.settings.footer?.quickLinks?.length || 0);
              } else {
                logger.theme.info('Firestore\'da özel ayar yok, default ayarlar kullanılıyor');
              }
            } catch (metaError) {
              logger.theme.warn('Özel ayarlar yüklenemedi, default ayarlar kullanılıyor:', metaError);
            }
            
            setCurrentTheme(matchedTheme);
            return;
          }
        }
      }
      
      // Aktif tema bilgisi yoksa veya bulunamadıysa, ilk Firestore temasını kullan
      if (firestoreThemes.length > 0) {
        logger.theme.warn('Aktif tema bulunamadı, ilk Firestore teması kullanılıyor');
        const firstTheme = firestoreThemes[0];
        const matchedTheme = defaultThemes.find(t => t.metadata.name === firstTheme.name);
        if (matchedTheme) {
          setCurrentTheme(matchedTheme);
          return;
        }
      }
      
      // Firestore'da tema yoksa varsayılan temalardan ilkini kullan
      logger.theme.debug('Firestore\'da tema yok, varsayılan temalar kullanılıyor');
      if (defaultThemes.length > 0) {
        setCurrentTheme(defaultThemes[0]);
      }
    } catch (error) {
      logger.theme.error('Tema yükleme hatası:', error);
      // Hata durumunda varsayılan temayı kullan
      const themes = getDefaultThemes();
      if (themes.length > 0) {
        setCurrentTheme(themes[0]);
      }
    }
  };

  useEffect(() => {
    loadCurrentTheme();
  }, []);

  // Tema güncellemelerini dinle (custom event ile)
  useEffect(() => {
    const handleThemeUpdate = () => {
      logger.theme.info('Tema güncelleme eventi alındı, tema yeniden yükleniyor...');
      loadCurrentTheme();
    };

    window.addEventListener('theme-updated', handleThemeUpdate);
    return () => window.removeEventListener('theme-updated', handleThemeUpdate);
  }, []);

  const themeSettings = currentTheme?.metadata.settings || null;
  
  // Debug: themeSettings'i logla
  useEffect(() => {
    if (themeSettings) {
      logger.theme.debug('themeSettings:', themeSettings);
      logger.theme.debug('header navItems:', themeSettings.header?.navItems);
      logger.theme.debug('footer quickLinks:', themeSettings.footer?.quickLinks);
    }
  }, [themeSettings]);

  return (
    <ThemeContext.Provider value={{ currentTheme, themeSettings, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

