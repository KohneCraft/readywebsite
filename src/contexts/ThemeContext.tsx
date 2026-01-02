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
      // Firestore'dan yüklenmiş temaları kontrol et
      const { getAvailableThemes, getThemeMetadata } = await import('@/lib/firebase/firestore');
      const firestoreThemes = await getAvailableThemes();
      
      if (firestoreThemes.length > 0) {
        // Firestore'da tema varsa, ilk temayı al ve default temalardan eşleştir
        const firstTheme = firestoreThemes[0];
        const defaultThemes = getDefaultThemes();
        let matchedTheme = defaultThemes.find(t => t.metadata.name === firstTheme.name);
        
        if (matchedTheme) {
          // Firestore'dan güncel metadata'yı al (header/footer ayarları için)
          try {
            const firestoreMetadata = await getThemeMetadata(firstTheme.id);
            if (firestoreMetadata && firestoreMetadata.settings) {
              console.log('Firestore metadata settings:', JSON.stringify(firestoreMetadata.settings, null, 2));
              console.log('Firestore header navItems:', firestoreMetadata.settings?.header?.navItems);
              console.log('Firestore footer quickLinks:', firestoreMetadata.settings?.footer?.quickLinks);
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
              console.log('Birleştirilmiş theme settings:', JSON.stringify(matchedTheme.metadata.settings, null, 2));
            }
          } catch (metaError) {
            console.warn('Tema metadata yüklenirken hata:', metaError);
          }
          setCurrentTheme(matchedTheme);
          return;
        }
      }
      
      // Firestore'da tema yoksa varsayılan temalardan ilkini kullan
      const themes = getDefaultThemes();
      if (themes.length > 0) {
        setCurrentTheme(themes[0]);
      }
    } catch (error) {
      console.error('Tema yükleme hatası:', error);
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

