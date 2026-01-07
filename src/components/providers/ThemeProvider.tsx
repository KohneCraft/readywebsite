'use client';

// ============================================
// Vav Yapı - Theme Provider
// next-themes integration with hydration fix
// ============================================

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      disableTransitionOnChange={false}
      storageKey="vavyapi-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
