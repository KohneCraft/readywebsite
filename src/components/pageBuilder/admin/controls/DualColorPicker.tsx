'use client';

// ============================================
// Vav Yapı - Dual Color Picker Control
// Açık ve koyu tema için ikili renk seçici
// Yatay düzen: Açık tema sol, koyu tema sağ
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
        <div className="space-y-2">
            {/* Ana Etiket */}
            {label && (
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </label>
            )}

            {/* Yatay Düzen: Açık Tema (Sol) + Koyu Tema (Sağ) */}
            <div className="grid grid-cols-2 gap-3">
                {/* SOL: Açık Tema */}
                <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            {t('lightTheme')}
                        </span>
                    </div>
                    <ColorPicker color={lightColor} onChange={onLightChange} />
                </div>

                {/* Dikey Ayırıcı Çizgi */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700 hidden" />

                {/* SAĞ: Koyu Tema */}
                <div className="space-y-1.5 border-l border-gray-200 dark:border-gray-700 pl-3">
                    {/* Koyu tema toggle ve başlık */}
                    <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={useDarkOverride}
                            onChange={(e) => handleDarkOverrideToggle(e.target.checked)}
                            className="w-3.5 h-3.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <Moon className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                            {t('darkTheme')}
                        </span>
                    </label>

                    {/* Koyu Tema Renk Seçici veya Otomatik Önizleme */}
                    {useDarkOverride ? (
                        <ColorPicker
                            color={typeof darkColor === 'string' && darkColor !== 'auto' ? darkColor : autoInvertedColor}
                            onChange={onDarkChange}
                        />
                    ) : (
                        <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg min-h-[36px]">
                            <div
                                className="w-6 h-6 rounded border border-gray-200 dark:border-gray-700 flex-shrink-0"
                                style={{ backgroundColor: autoInvertedColor }}
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                                    {t('autoColor')}: <span className="font-mono">{autoInvertedColor}</span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
