'use client';

// ============================================
// Effect Settings Modal - Efekt Ayarları
// ============================================

import { useState } from 'react';
import { X } from 'lucide-react';
import type { Effect, EffectSettings, EffectVisibility, EffectScope } from '@/types/effects';

interface PageOption {
    id: string;
    title: string;
}

interface ModalTranslations {
    settingsTitle: string;
    visibility: string;
    enableEffect: string;
    whereToShow: string;
    allPages: string;
    homeOnly: string;
    selectedPages: string;
    excludePages: string;
    pages: string;
    noPages: string;
    effectSettings: string;
    cancel: string;
    save: string;
    intensity: string;
    speed: string;
    size: string;
    wind: string;
    color: string;
    gravity: string;
    starCount: string;
    twinkleSpeed: string;
    transparency: string;
    frequency: string;
    explosionSize: string;
    rotationEffect: string;
    lifetime: string;
    trail: string;
    loadingSettings: string;
}

interface EffectSettingsModalProps {
    effect: Effect;
    pages: PageOption[];
    onClose: () => void;
    onSave: (updates: { settings?: Partial<EffectSettings>; visibility?: Partial<EffectVisibility> }) => void;
    translations: ModalTranslations;
}

export function EffectSettingsModal({ effect, pages, onClose, onSave, translations }: EffectSettingsModalProps) {
    const [settings, setSettings] = useState<EffectSettings>({ ...effect.settings });
    const [visibility, setVisibility] = useState<EffectVisibility>({ ...effect.visibility });

    function handleSave() {
        onSave({ settings, visibility });
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">{effect.icon}</span>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {effect.displayName} {translations.settingsTitle}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Visibility Settings */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            {translations.visibility}
                        </h3>

                        <div className="space-y-4">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={visibility.enabled}
                                    onChange={(e) => setVisibility({ ...visibility, enabled: e.target.checked })}
                                    className="w-5 h-5"
                                />
                                <span className="text-gray-700 dark:text-gray-300">{translations.enableEffect}</span>
                            </label>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {translations.whereToShow}
                                </label>
                                <select
                                    value={visibility.scope}
                                    onChange={(e) => setVisibility({
                                        ...visibility,
                                        scope: e.target.value as EffectScope,
                                        pages: []
                                    })}
                                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                >
                                    <option value="all">{translations.allPages}</option>
                                    <option value="home">{translations.homeOnly}</option>
                                    <option value="selected">{translations.selectedPages}</option>
                                    <option value="exclude">{translations.excludePages}</option>
                                </select>
                            </div>

                            {(visibility.scope === 'selected' || visibility.scope === 'exclude') && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {translations.pages}
                                    </label>
                                    <div className="max-h-48 overflow-y-auto border-2 border-gray-200 dark:border-gray-600 rounded-lg p-2 space-y-1">
                                        {pages.length === 0 ? (
                                            <p className="text-gray-500 text-sm p-2">{translations.noPages}</p>
                                        ) : (
                                            pages.map((page) => (
                                                <label key={page.id} className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={visibility.pages.includes(page.id)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setVisibility({
                                                                    ...visibility,
                                                                    pages: [...visibility.pages, page.id],
                                                                });
                                                            } else {
                                                                setVisibility({
                                                                    ...visibility,
                                                                    pages: visibility.pages.filter((id) => id !== page.id),
                                                                });
                                                            }
                                                        }}
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-gray-700 dark:text-gray-300">{page.title}</span>
                                                </label>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Effect-Specific Settings */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            {translations.effectSettings}
                        </h3>

                        {renderEffectSettings(effect.name, settings as any, setSettings as any, translations)}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        {translations.cancel}
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 py-3 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-white transition-colors"
                    >
                        {translations.save}
                    </button>
                </div>
            </div>
        </div>
    );
}

function renderEffectSettings(
    effectName: string,
    settings: Record<string, any>,
    setSettings: (settings: Record<string, any>) => void,
    translations: ModalTranslations
) {
    const commonSlider = (label: string, key: string, min: number, max: number, step: number = 1) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}: {typeof settings[key] === 'number' ? (step < 1 ? settings[key].toFixed(1) : settings[key]) : settings[key]}
            </label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={settings[key] || min}
                onChange={(e) => setSettings({ ...settings, [key]: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
        </div>
    );

    const colorPicker = (label: string, key: string) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <input
                type="color"
                value={settings[key] || '#ffffff'}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer"
            />
        </div>
    );

    switch (effectName) {
        case 'snow':
            return (
                <div className="space-y-4">
                    {commonSlider(translations.intensity, 'intensity', 20, 200)}
                    {commonSlider(translations.speed, 'speed', 0.5, 3, 0.1)}
                    {commonSlider(translations.size, 'size', 2, 10)}
                    {commonSlider(translations.wind, 'wind', 0, 2, 0.1)}
                    {colorPicker(translations.color, 'color')}
                </div>
            );

        case 'confetti':
            return (
                <div className="space-y-4">
                    {commonSlider(translations.intensity, 'intensity', 50, 300)}
                    {commonSlider(translations.speed, 'speed', 1, 5, 0.1)}
                    {commonSlider(translations.gravity, 'gravity', 0.1, 1, 0.1)}
                </div>
            );

        case 'stars':
            return (
                <div className="space-y-4">
                    {commonSlider(translations.starCount, 'intensity', 30, 150)}
                    {commonSlider(translations.twinkleSpeed, 'twinkleSpeed', 0.5, 3, 0.1)}
                    {commonSlider(translations.size, 'size', 1, 5)}
                    {colorPicker(translations.color, 'color')}
                </div>
            );

        case 'bubbles':
            return (
                <div className="space-y-4">
                    {commonSlider(translations.intensity, 'intensity', 20, 100)}
                    {commonSlider(translations.speed, 'speed', 0.5, 2, 0.1)}
                    {commonSlider(translations.size, 'size', 10, 50)}
                    {commonSlider(translations.transparency, 'opacity', 0.2, 1, 0.1)}
                </div>
            );

        case 'rain':
            return (
                <div className="space-y-4">
                    {commonSlider(translations.intensity, 'intensity', 100, 400)}
                    {commonSlider(translations.speed, 'speed', 3, 10)}
                    {commonSlider(translations.wind, 'wind', -2, 2, 0.1)}
                </div>
            );

        case 'fireworks':
            return (
                <div className="space-y-4">
                    {commonSlider(translations.frequency, 'frequency', 0.5, 5, 0.1)}
                    {commonSlider(translations.explosionSize, 'explosionSize', 50, 200)}
                </div>
            );

        case 'sakura':
            return (
                <div className="space-y-4">
                    {commonSlider(translations.intensity, 'intensity', 20, 80)}
                    {commonSlider(translations.speed, 'speed', 0.5, 3, 0.1)}
                    {colorPicker(translations.color, 'color')}
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={settings.rotation ?? true}
                            onChange={(e) => setSettings({ ...settings, rotation: e.target.checked })}
                            className="w-5 h-5"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{translations.rotationEffect}</span>
                    </label>
                </div>
            );

        case 'sparkles':
            return (
                <div className="space-y-4">
                    {colorPicker(translations.color, 'color')}
                    {commonSlider(translations.size, 'size', 2, 10)}
                    {commonSlider(translations.lifetime, 'lifetime', 500, 2000, 100)}
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={settings.trail ?? true}
                            onChange={(e) => setSettings({ ...settings, trail: e.target.checked })}
                            className="w-5 h-5"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{translations.trail}</span>
                    </label>
                </div>
            );

        case 'hearts':
            return (
                <div className="space-y-4">
                    {commonSlider(translations.intensity, 'intensity', 10, 50)}
                    {commonSlider(translations.speed, 'speed', 0.5, 3, 0.1)}
                </div>
            );

        case 'autumn-leaves':
            return (
                <div className="space-y-4">
                    {commonSlider(translations.intensity, 'intensity', 20, 100)}
                    {commonSlider(translations.speed, 'speed', 0.5, 3, 0.1)}
                    {commonSlider(translations.wind, 'wind', 0, 2, 0.1)}
                </div>
            );

        default:
            return (
                <p className="text-gray-500">{translations.loadingSettings}</p>
            );
    }
}
