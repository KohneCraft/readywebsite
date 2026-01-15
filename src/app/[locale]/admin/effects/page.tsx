'use client';

// ============================================
// Admin Effects Page - Efektler Yönetimi
// ============================================

import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { EffectCard } from '@/components/effects/EffectCard';
import { EffectSettingsModal } from '@/components/effects/EffectSettingsModal';
import { Sparkles, Settings, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import type { Effect, EffectTemplate, EffectType } from '@/types/effects';

// Hazır efekt şablonları
const AVAILABLE_EFFECTS: EffectTemplate[] = [
    {
        id: 'snow',
        displayName: 'Kar Yağışı',
        category: 'seasonal',
        icon: '❄️',
        description: 'Gerçekçi kar taneleri',
        defaultSettings: {
            intensity: 100,
            speed: 1.5,
            color: '#ffffff',
            size: 5,
            wind: 0.5,
        },
    },
    {
        id: 'autumn-leaves',
        displayName: 'Sonbahar Yaprakları',
        category: 'seasonal',
        icon: '🍂',
        description: 'Düşen sonbahar yaprakları',
        defaultSettings: {
            intensity: 50,
            speed: 2,
            leafTypes: ['🍂', '🍁'],
            wind: 1,
        },
    },
    {
        id: 'confetti',
        displayName: 'Konfeti',
        category: 'party',
        icon: '🎊',
        description: 'Renkli konfeti yağmuru',
        defaultSettings: {
            intensity: 150,
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'],
            speed: 3,
            gravity: 0.5,
        },
    },
    {
        id: 'stars',
        displayName: 'Parlayan Yıldızlar',
        category: 'nature',
        icon: '⭐',
        description: 'Parlayan yıldız efekti',
        defaultSettings: {
            intensity: 80,
            twinkleSpeed: 1,
            color: '#ffffff',
            size: 3,
        },
    },
    {
        id: 'fireworks',
        displayName: 'Havai Fişek',
        category: 'party',
        icon: '🎆',
        description: 'Patlamalar ve ışık gösterisi',
        defaultSettings: {
            frequency: 2,
            colors: ['#ff0000', '#00ff00', '#0000ff'],
            explosionSize: 100,
        },
    },
    {
        id: 'bubbles',
        displayName: 'Kabarcıklar',
        category: 'animations',
        icon: '🫧',
        description: 'Yüzen sabun köpükleri',
        defaultSettings: {
            intensity: 60,
            speed: 1,
            size: 30,
            opacity: 0.6,
        },
    },
    {
        id: 'sakura',
        displayName: 'Kiraz Çiçekleri',
        category: 'seasonal',
        icon: '🌸',
        description: 'Düşen kiraz çiçek yaprakları',
        defaultSettings: {
            intensity: 40,
            speed: 1.5,
            color: '#ffb7c5',
            rotation: true,
        },
    },
    {
        id: 'rain',
        displayName: 'Yağmur',
        category: 'nature',
        icon: '🌧️',
        description: 'Gerçekçi yağmur efekti',
        defaultSettings: {
            intensity: 200,
            speed: 5,
            color: 'rgba(174, 194, 224, 0.5)',
            wind: 0,
        },
    },
    {
        id: 'sparkles',
        displayName: 'Parıltılar',
        category: 'animations',
        icon: '✨',
        description: 'Mouse takipli parıltı efekti',
        defaultSettings: {
            color: '#ffd700',
            size: 5,
            lifetime: 1000,
            trail: true,
        },
    },
    {
        id: 'hearts',
        displayName: 'Uçan Kalpler',
        category: 'party',
        icon: '❤️',
        description: 'Yükselen kalp emojileri',
        defaultSettings: {
            intensity: 30,
            speed: 2,
            colors: ['#ff0000', '#ff69b4', '#ff1493'],
        },
    },
];

const CATEGORIES = [
    { id: 'all', label: 'Tümü', icon: '🎨' },
    { id: 'seasonal', label: 'Mevsimsel', icon: '🍂' },
    { id: 'party', label: 'Parti', icon: '🎉' },
    { id: 'nature', label: 'Doğa', icon: '🌿' },
    { id: 'animations', label: 'Animasyonlar', icon: '✨' },
];

function getScopeLabel(visibility: Effect['visibility']): string {
    if (!visibility.enabled) return 'Pasif';

    switch (visibility.scope) {
        case 'all':
            return 'Tüm Sayfalarda';
        case 'home':
            return 'Sadece Anasayfada';
        case 'selected':
            return `${visibility.pages.length} Sayfada`;
        case 'exclude':
            return `${visibility.pages.length} Sayfa Hariç`;
        default:
            return 'Bilinmeyen';
    }
}

export default function EffectsPage() {
    const [activeEffects, setActiveEffects] = useState<Effect[]>([]);
    const [availablePages, setAvailablePages] = useState<{ id: string; title: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [editingEffect, setEditingEffect] = useState<Effect | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Aktif efektleri yükle (real-time)
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'effects'), (snapshot) => {
            const effects = snapshot.docs.map((docSnap) => ({
                id: docSnap.id,
                ...docSnap.data(),
                createdAt: docSnap.data().createdAt?.toDate() || new Date(),
                updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
            })) as Effect[];
            setActiveEffects(effects);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Sayfaları yükle
    useEffect(() => {
        async function loadPages() {
            try {
                const snapshot = await getDocs(collection(db, 'pages'));
                const pages = snapshot.docs.map((docSnap) => ({
                    id: docSnap.data().slug || docSnap.id,
                    title: docSnap.data().title || 'İsimsiz Sayfa',
                }));
                setAvailablePages(pages);
            } catch (error) {
                console.error('Sayfalar yüklenemedi:', error);
            }
        }
        loadPages();
    }, []);

    // Efekt ekle
    async function handleAddEffect(effectId: EffectType) {
        const template = AVAILABLE_EFFECTS.find((e) => e.id === effectId);
        if (!template) return;

        try {
            await addDoc(collection(db, 'effects'), {
                name: template.id,
                displayName: template.displayName,
                category: template.category,
                icon: template.icon,
                description: template.description,
                settings: template.defaultSettings,
                visibility: {
                    enabled: true,
                    scope: 'all',
                    pages: [],
                },
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
        } catch (error) {
            console.error('Efekt eklenemedi:', error);
        }
    }

    // Efekt kaldır
    async function handleRemoveEffect(effectId: string) {
        if (!confirm('Bu efekti kaldırmak istediğinizden emin misiniz?')) return;

        try {
            await deleteDoc(doc(db, 'effects', effectId));
        } catch (error) {
            console.error('Efekt kaldırılamadı:', error);
        }
    }

    // Efekt güncelle
    async function handleUpdateEffect(effectId: string, updates: Partial<Effect>) {
        try {
            await updateDoc(doc(db, 'effects', effectId), {
                ...updates,
                updatedAt: serverTimestamp(),
            });
        } catch (error) {
            console.error('Efekt güncellenemedi:', error);
        }
    }

    // Toggle efekt
    async function handleToggleEffect(effect: Effect) {
        await handleUpdateEffect(effect.id, {
            visibility: {
                ...effect.visibility,
                enabled: !effect.visibility.enabled,
            },
        });
    }

    // Efekt aktif mi kontrol et
    function isEffectActive(effectId: EffectType): boolean {
        return activeEffects.some((e) => e.name === effectId);
    }

    // Filtrelenmiş efektler
    const filteredEffects =
        selectedCategory === 'all'
            ? AVAILABLE_EFFECTS
            : AVAILABLE_EFFECTS.filter((e) => e.category === selectedCategory);

    if (isLoading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-8 h-8 text-yellow-500" />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Efektler</h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    Sitenize görsel efektler ekleyin ve özelleştirin
                </p>
            </div>

            {/* Active Effects Section */}
            <div className="mb-12">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Aktif Efektler ({activeEffects.length})
                </h2>

                {activeEffects.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">
                            Henüz aktif efekt yok. Aşağıdan efekt ekleyebilirsiniz.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {activeEffects.map((effect) => (
                            <div
                                key={effect.id}
                                className={`
                  bg-white dark:bg-gray-800 border-2 rounded-xl p-4 transition-all
                  ${effect.visibility.enabled
                                        ? 'border-green-500'
                                        : 'border-gray-200 dark:border-gray-700 opacity-60'
                                    }
                `}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-2xl">{effect.icon}</span>
                                    <h3 className="font-semibold text-gray-900 dark:text-white flex-1">
                                        {effect.displayName}
                                    </h3>
                                    <button
                                        onClick={() => handleToggleEffect(effect)}
                                        className={`p-1 rounded ${effect.visibility.enabled ? 'text-green-500' : 'text-gray-400'}`}
                                        title={effect.visibility.enabled ? 'Pasif Yap' : 'Aktif Yap'}
                                    >
                                        {effect.visibility.enabled ? (
                                            <ToggleRight size={28} />
                                        ) : (
                                            <ToggleLeft size={28} />
                                        )}
                                    </button>
                                </div>

                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                    📍 {getScopeLabel(effect.visibility)}
                                </p>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditingEffect(effect)}
                                        className="flex-1 py-2 px-3 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Settings size={16} /> Ayarlar
                                    </button>
                                    <button
                                        onClick={() => handleRemoveEffect(effect.id)}
                                        className="py-2 px-3 border border-red-200 dark:border-red-800 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Available Effects Section */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Mevcut Efektler
                </h2>

                {/* Categories */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`
                px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all
                ${selectedCategory === cat.id
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }
              `}
                        >
                            {cat.icon} {cat.label}
                        </button>
                    ))}
                </div>

                {/* Effects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredEffects.map((effect) => (
                        <EffectCard
                            key={effect.id}
                            effect={effect}
                            isActive={isEffectActive(effect.id)}
                            onAdd={() => handleAddEffect(effect.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Settings Modal */}
            {editingEffect && (
                <EffectSettingsModal
                    effect={editingEffect}
                    pages={availablePages}
                    onClose={() => setEditingEffect(null)}
                    onSave={(updates) => {
                        handleUpdateEffect(editingEffect.id, updates as Partial<Effect>);
                        setEditingEffect(null);
                    }}
                />
            )}
        </div>
    );
}
