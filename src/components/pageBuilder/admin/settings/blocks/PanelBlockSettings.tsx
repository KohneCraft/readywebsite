'use client';

// ============================================
// Panel Block Settings
// Panel bloğu ayarları
// ============================================

import { DualColorPicker } from '../../controls/DualColorPicker';
import { cn } from '@/lib/utils';
import type { Block } from '@/types/pageBuilder';

interface PanelBlockSettingsProps {
    block: Block;
    activeTab: 'style' | 'settings' | 'advanced';
    onUpdate: (updates: Partial<Block['props']>) => void;
}

export function PanelBlockSettings({ block, activeTab, onUpdate }: PanelBlockSettingsProps) {
    const props = block.props || {};
    const panelPosition = props.panelPosition || 'right';
    const panelDimensions = props.panelDimensions || { width: 320, height: 'auto' };
    const panelPositioning = props.panelPositioning || { type: 'fixed', zIndex: 1000 };
    const panelAppearance = props.panelAppearance || {};
    const panelBehavior = props.panelBehavior || {};
    const panelAnimation = props.panelAnimation || { enabled: true, type: 'slide', duration: 0.3 };
    const panelResponsive = props.panelResponsive || {};

    if (activeTab === 'style') {
        return (
            <div className="space-y-4">
                {/* Panel Pozisyonu */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Panel Pozisyonu
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { value: 'right', label: 'Sağ', icon: '→' },
                            { value: 'left', label: 'Sol', icon: '←' },
                            { value: 'top', label: 'Üst', icon: '↑' },
                            { value: 'bottom', label: 'Alt', icon: '↓' },
                        ].map((pos) => (
                            <button
                                key={pos.value}
                                onClick={() => onUpdate({ panelPosition: pos.value as any })}
                                className={cn(
                                    'flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg transition-all',
                                    panelPosition === pos.value
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                )}
                            >
                                <span>{pos.icon}</span>
                                <span>{pos.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Genişlik */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Genişlik
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={typeof panelDimensions.width === 'number' ? panelDimensions.width : 320}
                            onChange={(e) => {
                                const value = parseInt(e.target.value) || 320;
                                onUpdate({
                                    panelDimensions: { ...panelDimensions, width: value },
                                });
                            }}
                            min={50}
                            max={800}
                            className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        />
                        <span className="flex items-center text-xs text-gray-500">px</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {panelPosition === 'top' || panelPosition === 'bottom'
                            ? '(Üst/Alt panelde %100 kullanılır)'
                            : 'Sağ/Sol panelin genişliği'}
                    </p>
                </div>

                {/* Yükseklik */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Yükseklik
                    </label>
                    <select
                        value={
                            panelDimensions.height === 'auto' || panelDimensions.height === undefined
                                ? 'auto'
                                : panelDimensions.height === '100vh' || panelDimensions.height === 'full'
                                    ? 'full'
                                    : 'custom'
                        }
                        onChange={(e) => {
                            if (e.target.value === 'auto') {
                                onUpdate({ panelDimensions: { ...panelDimensions, height: 'auto' } });
                            } else if (e.target.value === 'full') {
                                onUpdate({ panelDimensions: { ...panelDimensions, height: '100vh' } });
                            } else {
                                onUpdate({ panelDimensions: { ...panelDimensions, height: 400 } });
                            }
                        }}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white mb-2"
                    >
                        <option value="auto">Otomatik (İçerik Yüksekliği)</option>
                        <option value="full">Tam Ekran (100vh)</option>
                        <option value="custom">Özel (px)</option>
                    </select>

                    {typeof panelDimensions.height === 'number' && (
                        <div className="flex gap-2">
                            <input
                                type="number"
                                value={panelDimensions.height}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value) || 400;
                                    onUpdate({
                                        panelDimensions: { ...panelDimensions, height: value },
                                    });
                                }}
                                min={50}
                                max={2000}
                                className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            />
                            <span className="flex items-center text-xs text-gray-500">px</span>
                        </div>
                    )}

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        💡 "Otomatik" seçeneği panelin içeriğine göre yükseklik ayarlar
                    </p>
                </div>

                {/* Arkaplan Rengi */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Arka Plan Rengi
                    </label>
                    <DualColorPicker
                        lightColor={panelAppearance.backgroundColor || '#ffffff'}
                        darkColor={panelAppearance.backgroundColorDark || '#1f2937'}
                        onLightChange={(color) =>
                            onUpdate({
                                panelAppearance: { ...panelAppearance, backgroundColor: color },
                            })
                        }
                        onDarkChange={(colorDark) =>
                            onUpdate({
                                panelAppearance: { ...panelAppearance, backgroundColorDark: colorDark },
                            })
                        }
                    />
                </div>

                {/* Kenarlık Rengi */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Kenarlık Rengi
                    </label>
                    <input
                        type="color"
                        value={panelAppearance.borderColor || '#e5e7eb'}
                        onChange={(e) =>
                            onUpdate({
                                panelAppearance: { ...panelAppearance, borderColor: e.target.value },
                            })
                        }
                        className="w-full h-10 rounded-lg cursor-pointer"
                    />
                </div>

                {/* Kenarlık Kalınlığı */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Kenarlık Kalınlığı (px)
                    </label>
                    <input
                        type="number"
                        value={panelAppearance.borderWidth || 1}
                        onChange={(e) =>
                            onUpdate({
                                panelAppearance: { ...panelAppearance, borderWidth: parseInt(e.target.value) || 0 },
                            })
                        }
                        min={0}
                        max={10}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                </div>

                {/* Köşe Yuvarlaklığı */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Köşe Yuvarlaklığı (px)
                    </label>
                    <input
                        type="number"
                        value={panelAppearance.borderRadius || 0}
                        onChange={(e) =>
                            onUpdate({
                                panelAppearance: { ...panelAppearance, borderRadius: parseInt(e.target.value) || 0 },
                            })
                        }
                        min={0}
                        max={50}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                </div>

                {/* Gölge */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Gölge
                    </label>
                    <select
                        value={panelAppearance.boxShadow || 'none'}
                        onChange={(e) =>
                            onUpdate({
                                panelAppearance: { ...panelAppearance, boxShadow: e.target.value },
                            })
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    >
                        <option value="none">Yok</option>
                        <option value="0 1px 3px rgba(0,0,0,0.1)">Hafif</option>
                        <option value="0 4px 6px -1px rgba(0,0,0,0.1)">Normal</option>
                        <option value="0 10px 15px -3px rgba(0,0,0,0.1)">Orta</option>
                        <option value="0 20px 25px -5px rgba(0,0,0,0.1)">Büyük</option>
                        <option value="0 25px 50px -12px rgba(0,0,0,0.25)">Çok Büyük</option>
                    </select>
                </div>
            </div>
        );
    }

    if (activeTab === 'settings') {
        return (
            <div className="space-y-4">
                {/* Davranış Ayarları */}
                <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Davranış
                    </h4>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={panelBehavior.closeable ?? true}
                            onChange={(e) =>
                                onUpdate({
                                    panelBehavior: { ...panelBehavior, closeable: e.target.checked },
                                })
                            }
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Kapatılabilir</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={panelBehavior.defaultOpen ?? true}
                            onChange={(e) =>
                                onUpdate({
                                    panelBehavior: { ...panelBehavior, defaultOpen: e.target.checked },
                                })
                            }
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Varsayılan Olarak Açık</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={panelBehavior.overlay ?? false}
                            onChange={(e) =>
                                onUpdate({
                                    panelBehavior: { ...panelBehavior, overlay: e.target.checked },
                                })
                            }
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Arka Plan Overlay</span>
                    </label>

                    {panelBehavior.overlay && (
                        <div className="ml-6">
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Overlay Rengi
                            </label>
                            <input
                                type="text"
                                value={panelBehavior.overlayColor || 'rgba(0, 0, 0, 0.5)'}
                                onChange={(e) =>
                                    onUpdate({
                                        panelBehavior: { ...panelBehavior, overlayColor: e.target.value },
                                    })
                                }
                                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                                placeholder="rgba(0, 0, 0, 0.5)"
                            />
                        </div>
                    )}

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={panelBehavior.closeOnEscape ?? true}
                            onChange={(e) =>
                                onUpdate({
                                    panelBehavior: { ...panelBehavior, closeOnEscape: e.target.checked },
                                })
                            }
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">ESC ile Kapat</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={panelBehavior.closeOnClickOutside ?? false}
                            onChange={(e) =>
                                onUpdate({
                                    panelBehavior: { ...panelBehavior, closeOnClickOutside: e.target.checked },
                                })
                            }
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Dışarı Tıkla Kapat</span>
                    </label>
                </div>

                {/* Scroll Davranışı */}
                <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Scroll Davranışı
                    </h4>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={panelBehavior.showOnScroll ?? false}
                            onChange={(e) =>
                                onUpdate({
                                    panelBehavior: {
                                        ...panelBehavior,
                                        showOnScroll: e.target.checked,
                                        hideOnScroll: e.target.checked ? false : panelBehavior.hideOnScroll,
                                    },
                                })
                            }
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Scroll'da Göster</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={panelBehavior.hideOnScroll ?? false}
                            onChange={(e) =>
                                onUpdate({
                                    panelBehavior: {
                                        ...panelBehavior,
                                        hideOnScroll: e.target.checked,
                                        showOnScroll: e.target.checked ? false : panelBehavior.showOnScroll,
                                    },
                                })
                            }
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Scroll'da Gizle</span>
                    </label>

                    {(panelBehavior.showOnScroll || panelBehavior.hideOnScroll) && (
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Scroll Eşiği (px)
                            </label>
                            <input
                                type="number"
                                value={panelBehavior.scrollThreshold || 100}
                                onChange={(e) =>
                                    onUpdate({
                                        panelBehavior: { ...panelBehavior, scrollThreshold: parseInt(e.target.value) || 100 },
                                    })
                                }
                                min={0}
                                max={1000}
                                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            />
                        </div>
                    )}
                </div>

                {/* Z-Index */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Z-Index
                    </label>
                    <input
                        type="number"
                        value={panelPositioning.zIndex || 1000}
                        onChange={(e) =>
                            onUpdate({
                                panelPositioning: { ...panelPositioning, zIndex: parseInt(e.target.value) || 1000 },
                            })
                        }
                        min={1}
                        max={9999}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                </div>

                {/* Pozisyon Tipi */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Pozisyon Tipi
                    </label>
                    <select
                        value={panelPositioning.type || 'fixed'}
                        onChange={(e) =>
                            onUpdate({
                                panelPositioning: { ...panelPositioning, type: e.target.value as any },
                            })
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    >
                        <option value="fixed">Fixed (Sabit)</option>
                        <option value="sticky">Sticky (Yapışkan)</option>
                        <option value="absolute">Absolute</option>
                    </select>
                </div>
            </div>
        );
    }

    if (activeTab === 'advanced') {
        return (
            <div className="space-y-4">
                {/* Animasyon */}
                <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Animasyon
                    </h4>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={panelAnimation.enabled ?? true}
                            onChange={(e) =>
                                onUpdate({
                                    panelAnimation: { ...panelAnimation, enabled: e.target.checked },
                                })
                            }
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Animasyon Aktif</span>
                    </label>

                    {panelAnimation.enabled && (
                        <>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Animasyon Tipi
                                </label>
                                <select
                                    value={panelAnimation.type || 'slide'}
                                    onChange={(e) =>
                                        onUpdate({
                                            panelAnimation: { ...panelAnimation, type: e.target.value as any },
                                        })
                                    }
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                                >
                                    <option value="slide">Kayma (Slide)</option>
                                    <option value="fade">Solma (Fade)</option>
                                    <option value="scale">Büyüme (Scale)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Süre (saniye)
                                </label>
                                <input
                                    type="number"
                                    value={panelAnimation.duration || 0.3}
                                    onChange={(e) =>
                                        onUpdate({
                                            panelAnimation: { ...panelAnimation, duration: parseFloat(e.target.value) || 0.3 },
                                        })
                                    }
                                    step={0.1}
                                    min={0.1}
                                    max={2}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Easing
                                </label>
                                <select
                                    value={panelAnimation.easing || 'ease-in-out'}
                                    onChange={(e) =>
                                        onUpdate({
                                            panelAnimation: { ...panelAnimation, easing: e.target.value },
                                        })
                                    }
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                                >
                                    <option value="ease">Ease</option>
                                    <option value="ease-in">Ease In</option>
                                    <option value="ease-out">Ease Out</option>
                                    <option value="ease-in-out">Ease In Out</option>
                                    <option value="linear">Linear</option>
                                </select>
                            </div>
                        </>
                    )}
                </div>

                {/* Responsive - Mobil */}
                <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Mobil Ayarları
                    </h4>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={panelResponsive.mobile?.enabled ?? true}
                            onChange={(e) =>
                                onUpdate({
                                    panelResponsive: {
                                        ...panelResponsive,
                                        mobile: { ...panelResponsive.mobile, enabled: e.target.checked },
                                    },
                                })
                            }
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Mobilde Göster</span>
                    </label>

                    {panelResponsive.mobile?.enabled !== false && (
                        <>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={panelResponsive.mobile?.showAsModal ?? true}
                                    onChange={(e) =>
                                        onUpdate({
                                            panelResponsive: {
                                                ...panelResponsive,
                                                mobile: { ...panelResponsive.mobile, showAsModal: e.target.checked },
                                            },
                                        })
                                    }
                                    className="w-4 h-4 rounded border-gray-300"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Modal Olarak Göster</span>
                            </label>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Mobil Pozisyon
                                </label>
                                <select
                                    value={panelResponsive.mobile?.position || 'bottom'}
                                    onChange={(e) =>
                                        onUpdate({
                                            panelResponsive: {
                                                ...panelResponsive,
                                                mobile: { ...panelResponsive.mobile, position: e.target.value as any },
                                            },
                                        })
                                    }
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                                >
                                    <option value="right">Sağ</option>
                                    <option value="left">Sol</option>
                                    <option value="top">Üst</option>
                                    <option value="bottom">Alt</option>
                                </select>
                            </div>
                        </>
                    )}
                </div>

                {/* Responsive - Tablet */}
                <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Tablet Ayarları
                    </h4>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={panelResponsive.tablet?.enabled ?? true}
                            onChange={(e) =>
                                onUpdate({
                                    panelResponsive: {
                                        ...panelResponsive,
                                        tablet: { ...panelResponsive.tablet, enabled: e.target.checked },
                                    },
                                })
                            }
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Tablette Göster</span>
                    </label>

                    {panelResponsive.tablet?.enabled !== false && (
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tablet Genişliği (px)
                            </label>
                            <input
                                type="number"
                                value={(panelResponsive.tablet?.width as number) || 280}
                                onChange={(e) =>
                                    onUpdate({
                                        panelResponsive: {
                                            ...panelResponsive,
                                            tablet: { ...panelResponsive.tablet, width: parseInt(e.target.value) || 280 },
                                        },
                                    })
                                }
                                min={100}
                                max={500}
                                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            />
                        </div>
                    )}
                </div>

                {/* İçerik Blokları Bilgisi */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                        Panel İçeriği
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Bu panelin içinde {props.panelBlocks?.length || 0} blok bulunuyor.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Panel içine blok eklemek için yapı ekranındaki Panel düzenleyicisini kullanın.
                    </p>
                </div>

                {/* Özel CSS */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Özel CSS
                    </label>
                    <textarea
                        value={props.customCSS || ''}
                        onChange={(e) => onUpdate({ customCSS: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
                        placeholder=".panel-block { ... }"
                    />
                </div>
            </div>
        );
    }

    return null;
}
