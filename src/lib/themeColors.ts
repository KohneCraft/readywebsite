'use client';

// ============================================
// Vav Yapı - Theme Color Utilities
// Açık/Koyu tema renk dönüşüm fonksiyonları
// ============================================

/**
 * HEX rengi RGB'ye çevirir
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}

/**
 * RGB'yi HEX'e çevirir
 */
export function rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => {
        const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

/**
 * RGB'yi HSL'ye çevirir
 */
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * HSL'yi RGB'ye çevirir
 */
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    };
}

/**
 * Rengin parlaklığını (luminance) hesaplar
 * 0 = siyah, 1 = beyaz
 */
export function getLuminance(hex: string): number {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;

    const { r, g, b } = rgb;
    const rsrgb = r / 255;
    const gsrgb = g / 255;
    const bsrgb = b / 255;

    const rlinear = rsrgb <= 0.03928 ? rsrgb / 12.92 : Math.pow((rsrgb + 0.055) / 1.055, 2.4);
    const glinear = gsrgb <= 0.03928 ? gsrgb / 12.92 : Math.pow((gsrgb + 0.055) / 1.055, 2.4);
    const blinear = bsrgb <= 0.03928 ? bsrgb / 12.92 : Math.pow((bsrgb + 0.055) / 1.055, 2.4);

    return 0.2126 * rlinear + 0.7152 * glinear + 0.0722 * blinear;
}

/**
 * Rengin açık mı koyu mu olduğunu belirler
 */
export function isLightColor(hex: string): boolean {
    return getLuminance(hex) > 0.5;
}

/**
 * Otomatik ters renk hesaplar (koyu tema için)
 * Algoritma:
 * - Beyaz (#fff) → Koyu gri (#1a1a1a)
 * - Siyah (#000) → Beyaz (#ffffff)
 * - Diğer renkler: HSL lightness tersine çevrilir
 */
export function getAutoInvertedColor(hex: string): string {
    if (!hex) return hex;

    // Normalize hex
    const normalizedHex = hex.toLowerCase().replace(/^#/, '');

    // Tam beyaz → Koyu gri
    if (normalizedHex === 'ffffff' || normalizedHex === 'fff') {
        return '#1a1a1a';
    }

    // Tam siyah → Beyaz
    if (normalizedHex === '000000' || normalizedHex === '000') {
        return '#ffffff';
    }

    // Çok açık renkler (near-white) → Koyu versiyonu
    const rgb = hexToRgb('#' + normalizedHex);
    if (!rgb) return hex;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Luminance bazlı dönüşüm
    // Açık renkler için lightness'ı azalt
    // Koyu renkler için lightness'ı artır
    let newLightness: number;

    if (hsl.l > 90) {
        // Çok açık (beyaza yakın) → Çok koyu yap
        newLightness = 10;
    } else if (hsl.l > 70) {
        // Açık → Koyu yap
        newLightness = 100 - hsl.l;
    } else if (hsl.l < 10) {
        // Çok koyu (siyaha yakın) → Çok açık yap
        newLightness = 90;
    } else if (hsl.l < 30) {
        // Koyu → Açık yap
        newLightness = 100 - hsl.l;
    } else {
        // Orta tonlar için hafif ayarlama (renk korunsun)
        // Koyu temada biraz daha açık göster
        newLightness = Math.min(100, hsl.l + 15);
    }

    const newRgb = hslToRgb(hsl.h, hsl.s, newLightness);
    return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

/**
 * Tema moduna göre etkili rengi döndürür
 * @param lightColor Açık tema rengi
 * @param darkColor Koyu tema rengi (opsiyonel, 'auto' veya belirli renk)
 * @param isDarkMode Koyu mod aktif mi
 */
export function getEffectiveColor(
    lightColor: string | undefined,
    darkColor: string | undefined | 'auto',
    isDarkMode: boolean
): string | undefined {
    if (!lightColor) return undefined;

    if (!isDarkMode) {
        return lightColor;
    }

    // Koyu modda
    if (darkColor && darkColor !== 'auto') {
        // Manuel override varsa kullan
        return darkColor;
    }

    // Otomatik dönüşüm
    return getAutoInvertedColor(lightColor);
}

/**
 * Arka plan rengine göre kontrast metin rengi döndürür
 */
export function getContrastTextColor(backgroundColor: string): string {
    return isLightColor(backgroundColor) ? '#1a1a1a' : '#ffffff';
}
