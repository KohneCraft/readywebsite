'use client';

// ============================================
// Page Builder - Theme Context
// Aktif tema ayarlarını sağlar
// ============================================

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getDefaultThemes } from '@/lib/themes/default/defaultThemes';
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
      console.log('ThemeContext - loadCurrentTheme başlatıldı');
      // Önce siteSettings'ten aktif tema bilgisini al
      const { getSiteSettings, getAvailableThemes, getThemeMetadata } = await import('@/lib/firebase/firestore');
      
      let activeThemeName: string | null = null;
      let activeThemeId: string | null = null;
      
      try {
        const siteSettings = await getSiteSettings();
        activeThemeName = siteSettings.activeThemeName || null;
        activeThemeId = siteSettings.activeThemeId || null;
        console.log('ThemeContext - SiteSettings\'ten aktif tema:', activeThemeName, '(ID:', activeThemeId, ')');
      } catch (error) {
        console.warn('ThemeContext - SiteSettings yüklenirken hata:', error);
      }
      
      // Firestore'dan yüklenmiş temaları kontrol et
      const firestoreThemes = await getAvailableThemes();
      console.log('ThemeContext - Firestore temaları:', firestoreThemes.map(t => ({ id: t.id, name: t.name })));
      
      const defaultThemes = getDefaultThemes();
      console.log('ThemeContext - Varsayılan temalar:', defaultThemes.map(t => t.metadata.name));
      
      // Aktif tema bilgisi varsa, o temayı bul
      if (activeThemeName || activeThemeId) {
        const targetTheme = firestoreThemes.find(t => 
          t.name === activeThemeName || 
          t.id === activeThemeId ||
          (activeThemeId && t.id.includes(activeThemeId.replace('theme-', '')))
        );
        
        if (targetTheme) {
          console.log(`ThemeContext - Aktif tema bulundu: ${targetTheme.name} (ID: ${targetTheme.id})`);
          // Default temalardan eşleştir
          let matchedTheme = defaultThemes.find(t => 
            t.metadata.name === targetTheme.name || 
            t.metadata.id === targetTheme.id ||
            targetTheme.id.includes(t.metadata.id.replace('theme-', ''))
          );
          
          if (matchedTheme) {
            // Firestore'dan güncel metadata'yı al (header/footer ayarları için)
            try {
              const firestoreMetadata = await getThemeMetadata(targetTheme.id);
              if (firestoreMetadata && firestoreMetadata.settings) {
                console.log('ThemeContext - Firestore metadata settings:', JSON.stringify(firestoreMetadata.settings, null, 2));
                console.log('ThemeContext - Firestore header navItems:', firestoreMetadata.settings?.header?.navItems);
                console.log('ThemeContext - Firestore footer quickLinks:', firestoreMetadata.settings?.footer?.quickLinks);
                // Firestore'daki güncel ayarları kullan
                matchedTheme = {
                  ...matchedTheme,
                  metadata: {
                    ...matchedTheme.metadata,
                    settings: {
                      ...matchedTheme.metadata.settings,
                      ...firestoreMetadata.settings,
                    },
                  },
                };
                console.log('ThemeContext - Birleştirilmiş theme settings:', JSON.stringify(matchedTheme.metadata.settings, null, 2));
              }
            } catch (metaError) {
              console.warn('ThemeContext - Tema metadata yüklenirken hata:', metaError);
            }
            setCurrentTheme(matchedTheme);
            return;
          }
        }
      }
      
      // Aktif tema bilgisi yoksa veya bulunamadıysa, ilk Firestore temasını kullan
      if (firestoreThemes.length > 0) {
        console.warn('ThemeContext - Aktif tema bulunamadı, ilk Firestore teması kullanılıyor');
        const firstTheme = firestoreThemes[0];
        const matchedTheme = defaultThemes.find(t => t.metadata.name === firstTheme.name);
        if (matchedTheme) {
          setCurrentTheme(matchedTheme);
          return;
        }
      }
      
      // Firestore'da tema yoksa varsayılan temalardan ilkini kullan
      console.log('ThemeContext - Firestore\'da tema yok, varsayılan temalar kullanılıyor');
      if (defaultThemes.length > 0) {
        setCurrentTheme(defaultThemes[0]);
      }
    } catch (error) {
      console.error('ThemeContext - Tema yükleme hatası:', error);
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
      console.log('Tema güncelleme eventi alındı, tema yeniden yükleniyor...');
      loadCurrentTheme();
    };

    window.addEventListener('theme-updated', handleThemeUpdate);
    return () => window.removeEventListener('theme-updated', handleThemeUpdate);
  }, []);

  const themeSettings = currentTheme?.metadata.settings || null;
  
  // Debug: themeSettings'i logla
  useEffect(() => {
    if (themeSettings) {
      console.log('ThemeContext - themeSettings:', JSON.stringify(themeSettings, null, 2));
      console.log('ThemeContext - header navItems:', themeSettings.header?.navItems);
      console.log('ThemeContext - footer quickLinks:', themeSettings.footer?.quickLinks);
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

