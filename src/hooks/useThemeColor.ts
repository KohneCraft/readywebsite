'use client';

// ============================================
// Vav Yapı - useThemeColor Hook
// Tema moduna göre renk seçimi hook'u
// ============================================

import { useMemo } from 'react';
import { useTheme } from 'next-themes';
import { getEffectiveColor } from '@/lib/themeColors';

interface UseThemeColorOptions {
    lightColor?: string;
    darkColor?: string | 'auto';
}

/**
 * Tema moduna göre etkili rengi döndüren hook
 * 
 * @example
 * const color = useThemeColor({ lightColor: '#000', darkColor: 'auto' });
 * // Koyu modda otomatik olarak '#ffffff' döner
 */
export function useThemeColor({ lightColor, darkColor }: UseThemeColorOptions): string | undefined {
    const { resolvedTheme } = useTheme();
    const isDarkMode = resolvedTheme === 'dark';

    return useMemo(() => {
        return getEffectiveColor(lightColor, darkColor, isDarkMode);
    }, [lightColor, darkColor, isDarkMode]);
}

/**
 * Birden fazla renk için tema dönüşümü hook'u
 * 
 * @example
 * const colors = useThemeColors({
 *   text: { light: '#000', dark: 'auto' },
 *   bg: { light: '#fff', dark: '#1a1a1a' },
 * });
 */
export function useThemeColors<T extends Record<string, { light?: string; dark?: string | 'auto' }>>(
    colorMap: T
): Record<keyof T, string | undefined> {
    const { resolvedTheme } = useTheme();
    const isDarkMode = resolvedTheme === 'dark';

    return useMemo(() => {
        const result: Record<string, string | undefined> = {};

        for (const [key, { light, dark }] of Object.entries(colorMap)) {
            result[key] = getEffectiveColor(light, dark, isDarkMode);
        }

        return result as Record<keyof T, string | undefined>;
    }, [colorMap, isDarkMode]);
}
