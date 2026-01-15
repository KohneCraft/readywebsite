// ============================================
// Efektler Sistemi - Type Tanımlamaları
// ============================================

/**
 * Efekt kategorileri
 */
export type EffectCategory = 'seasonal' | 'party' | 'nature' | 'animations';

/**
 * Efekt görünürlük kapsamı
 */
export type EffectScope = 'all' | 'home' | 'selected' | 'exclude';

/**
 * Efekt görünürlük ayarları
 */
export interface EffectVisibility {
    enabled: boolean;
    scope: EffectScope;
    pages: string[]; // Sayfa ID'leri
}

/**
 * Kar efekti ayarları
 */
export interface SnowEffectSettings {
    intensity: number; // Kar tanesi sayısı (20-200)
    speed: number; // Düşüş hızı (0.5-3)
    size: number; // Boyut (2-10)
    wind: number; // Rüzgar etkisi (0-2)
    color: string; // Renk
}

/**
 * Sonbahar yaprakları ayarları
 */
export interface AutumnLeavesSettings {
    intensity: number; // Yaprak sayısı (20-100)
    speed: number; // Düşüş hızı (0.5-3)
    leafTypes: string[]; // Emoji listesi
    wind: number; // Rüzgar etkisi
}

/**
 * Konfeti ayarları
 */
export interface ConfettiSettings {
    intensity: number; // Parça sayısı (50-300)
    speed: number; // Düşüş hızı (1-5)
    colors: string[]; // Renk listesi
    gravity: number; // Yerçekimi (0.1-1)
}

/**
 * Yıldızlar ayarları
 */
export interface StarsSettings {
    intensity: number; // Yıldız sayısı (30-150)
    twinkleSpeed: number; // Parıltı hızı (0.5-3)
    size: number; // Boyut (1-5)
    color: string; // Renk
}

/**
 * Havai fişek ayarları
 */
export interface FireworksSettings {
    frequency: number; // Patlama sıklığı (0.5-5)
    colors: string[]; // Renk listesi
    explosionSize: number; // Patlama boyutu (50-200)
}

/**
 * Kabarcıklar ayarları
 */
export interface BubblesSettings {
    intensity: number; // Kabarcık sayısı (20-100)
    speed: number; // Yükselme hızı (0.5-2)
    size: number; // Boyut (10-50)
    opacity: number; // Şeffaflık (0.2-1)
}

/**
 * Sakura/Kiraz çiçeği ayarları
 */
export interface SakuraSettings {
    intensity: number; // Yaprak sayısı (20-80)
    speed: number; // Düşüş hızı (0.5-3)
    color: string; // Renk
    rotation: boolean; // Döndürme efekti
}

/**
 * Yağmur ayarları
 */
export interface RainSettings {
    intensity: number; // Damla sayısı (100-400)
    speed: number; // Düşüş hızı (3-10)
    color: string; // Renk (rgba)
    wind: number; // Rüzgar
}

/**
 * Parıltılar ayarları (mouse takipli)
 */
export interface SparklesSettings {
    color: string; // Renk
    size: number; // Boyut (2-10)
    lifetime: number; // Ömür (ms)
    trail: boolean; // İz bırakma
}

/**
 * Kalpler ayarları
 */
export interface HeartsSettings {
    intensity: number; // Kalp sayısı (10-50)
    speed: number; // Yükselme hızı (0.5-3)
    colors: string[]; // Renk listesi
}

/**
 * Tüm efekt ayarı tipleri
 */
export type EffectSettings =
    | SnowEffectSettings
    | AutumnLeavesSettings
    | ConfettiSettings
    | StarsSettings
    | FireworksSettings
    | BubblesSettings
    | SakuraSettings
    | RainSettings
    | SparklesSettings
    | HeartsSettings;

/**
 * Efekt tipleri
 */
export type EffectType =
    | 'snow'
    | 'autumn-leaves'
    | 'confetti'
    | 'stars'
    | 'fireworks'
    | 'bubbles'
    | 'sakura'
    | 'rain'
    | 'sparkles'
    | 'hearts';

/**
 * Efekt ana tipi
 */
export interface Effect {
    id: string;
    name: EffectType;
    displayName: string;
    category: EffectCategory;
    icon: string;
    description: string;
    settings: EffectSettings;
    visibility: EffectVisibility;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Efekt oluşturma input tipi
 */
export interface EffectCreateInput {
    name: EffectType;
    displayName: string;
    category: EffectCategory;
    icon: string;
    description: string;
    settings: EffectSettings;
    visibility?: EffectVisibility;
}

/**
 * Efekt güncelleme input tipi
 */
export interface EffectUpdateInput {
    settings?: Partial<EffectSettings>;
    visibility?: Partial<EffectVisibility>;
}

/**
 * Hazır efekt şablonu
 */
export interface EffectTemplate {
    id: EffectType;
    displayName: string;
    category: EffectCategory;
    icon: string;
    description: string;
    defaultSettings: EffectSettings;
}

/**
 * Efekt sınıfı interface'i
 */
export interface IEffectInstance {
    init(): void;
    update(): void;
    render(): void;
    destroy(): void;
}
