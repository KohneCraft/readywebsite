'use client';

// ============================================
// Vav Yapı - Dual Color Picker Control
// Açık ve koyu tema için ikili renk seçici
// ============================================

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ColorPicker } from './ColorPicker';
import { getAutoInvertedColor } from '@/lib/themeColors';
import { Sun, Moon } from 'lucide-react';

interface DualColorPickerProps {
    /** Açık tema rengi */
    lightColor: string;
    /** Koyu tema rengi ('auto' veya belirli renk) */
    darkColor?: string | 'auto';
    /** Açık tema rengi değiştiğinde */
    onLightChange: (color: string) => void;
    /** Koyu tema rengi değiştiğinde */
    onDarkChange: (color: string | 'auto') => void;
    /** Etiket */
    label?: string;
}

export function DualColorPicker({
    lightColor,
    darkColor = 'auto',
    onLightChange,
    onDarkChange,
    label,
}: DualColorPickerProps) {
    const t = useTranslations('common.colorPicker');
    const [useDarkOverride, setUseDarkOverride] = useState(darkColor !== 'auto');

    // Otomatik hesaplanan koyu renk
    const autoInvertedColor = getAutoInvertedColor(lightColor);

    const handleDarkOverrideToggle = (enabled: boolean) => {
        setUseDarkOverride(enabled);
        if (!enabled) {
            onDarkChange('auto');
        } else {
            // Override aktifleştirildiğinde, otomatik hesaplanan rengi başlangıç değeri olarak kullan
            onDarkChange(autoInvertedColor);
        }
    };

    return (
        <div className="space-y-3">
            {/* Açık Tema Rengi */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {label ? `${label} (${t('lightTheme')})` : t('lightTheme')}
                    </label>
                </div>
                <ColorPicker color={lightColor} onChange={onLightChange} />
            </div>

            {/* Koyu Tema Override Toggle */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={useDarkOverride}
                        onChange={(e) => handleDarkOverrideToggle(e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <Moon className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                        {t('differentColorForDark')}
                    </span>
                </label>
            </div>

            {/* Koyu Tema Renk Seçici veya Otomatik Önizleme */}
            {useDarkOverride ? (
                <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        <span className="flex items-center gap-2">
                            <Moon className="w-3.5 h-3.5 text-blue-500" />
                            {t('darkThemeColor')}
                        </span>
                    </label>
                    <ColorPicker
                        color={typeof darkColor === 'string' && darkColor !== 'auto' ? darkColor : autoInvertedColor}
                        onChange={onDarkChange}
                    />
                </div>
            ) : (
                <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div
                        className="w-8 h-8 rounded border border-gray-200 dark:border-gray-700"
                        style={{ backgroundColor: autoInvertedColor }}
                    />
                    <div className="flex-1">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                            {t('autoColor')}: <span className="font-mono">{autoInvertedColor}</span>
                        </p>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500">
                            {t('autoColorHint')}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
