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
  useEffect(() => {
    async function loadCurrentTheme() {
      try {
        // Firestore'dan yüklenmiş temaları kontrol et
        const { getAvailableThemes } = await import('@/lib/firebase/firestore');
        const firestoreThemes = await getAvailableThemes();
        
        if (firestoreThemes.length > 0) {
          // Firestore'da tema varsa, ilk temayı al ve default temalardan eşleştir
          const firstTheme = firestoreThemes[0];
          const defaultThemes = getDefaultThemes();
          const matchedTheme = defaultThemes.find(t => t.metadata.name === firstTheme.name);
          
          if (matchedTheme) {
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
    }
    loadCurrentTheme();
  }, []);

  const themeSettings = currentTheme?.metadata.settings || null;

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

