// ============================================
// Ready CSS Sınıfları - Sabit Listesi
// Blok Ayarları > Ayarlar > CSS Sınıfı dropdown'ı için
// ============================================

export interface ReadyCSSClass {
    name: string;        // CSS sınıf adı
    label: string;       // Kullanıcıya gösterilecek etiket
    category: string;    // Kategori
    description?: string; // Açıklama
}

export const READY_CSS_CLASSES: ReadyCSSClass[] = [
    // Kenarlık ve Çerçeve Stilleri
    { name: 'altin-cerceve', label: 'Altın Çerçeve', category: 'Kenarlık', description: 'Altın kenarlık ve gölge' },
    { name: 'mavi-cerceve', label: 'Mavi Çerçeve', category: 'Kenarlık', description: 'Mavi kenarlık' },
    { name: 'yumusak-golge', label: 'Yumuşak Gölge', category: 'Kenarlık', description: 'Yumuşak gölge efekti' },
    { name: 'keskin-golge', label: 'Keskin Gölge', category: 'Kenarlık', description: 'Keskin gölge efekti' },

    // Cam Efektleri
    { name: 'cam-efekti', label: 'Cam Efekti', category: 'Cam Efekti', description: 'Glassmorphism - açık' },
    { name: 'cam-efekti-koyu', label: 'Cam Efekti (Koyu)', category: 'Cam Efekti', description: 'Glassmorphism - koyu' },

    // Metin Stilleri
    { name: 'gradient-metin', label: 'Gradient Metin', category: 'Metin', description: 'Renk geçişli metin' },
    { name: 'golgeli-metin', label: 'Gölgeli Metin', category: 'Metin', description: 'Alt gölgeli metin' },
    { name: 'parlak-metin', label: 'Parlak Metin', category: 'Metin', description: 'Işıldayan metin' },
    { name: 'vurgulu-metin', label: 'Vurgulu Metin', category: 'Metin', description: 'Alt çizgi vurgulu' },

    // Animasyon Stilleri
    { name: 'hover-buyut', label: 'Hover Büyüt', category: 'Animasyon', description: 'Hover\'da büyüme' },
    { name: 'hover-kaldir', label: 'Hover Kaldır', category: 'Animasyon', description: 'Hover\'da yukarı kaldırma' },
    { name: 'pulse-animasyon', label: 'Pulse Animasyonu', category: 'Animasyon', description: 'Nabız atışı efekti' },
    { name: 'fade-in', label: 'Fade In', category: 'Animasyon', description: 'Görünürken solarak girme' },

    // Arka Plan Stilleri
    { name: 'gradient-arka-plan', label: 'Gradient (Mor)', category: 'Arka Plan', description: 'Gün batımı gradientı' },
    { name: 'gradient-okyanus', label: 'Gradient (Mavi)', category: 'Arka Plan', description: 'Okyanus gradientı' },
    { name: 'gradient-orman', label: 'Gradient (Yeşil)', category: 'Arka Plan', description: 'Orman gradientı' },
    { name: 'desen-noktalar', label: 'Desen (Noktalar)', category: 'Arka Plan', description: 'Noktalı desen' },
    { name: 'desen-cizgiler', label: 'Desen (Çizgiler)', category: 'Arka Plan', description: 'Çizgili desen' },

    // Kart Stilleri
    { name: 'modern-kart', label: 'Modern Kart', category: 'Kart', description: 'Modern kart stili' },
    { name: 'minimal-kart', label: 'Minimal Kart', category: 'Kart', description: 'Minimal kart stili' },
];

// Kategorilere göre grupla
export function getGroupedCSSClasses(): Record<string, ReadyCSSClass[]> {
    const grouped: Record<string, ReadyCSSClass[]> = {};

    for (const cssClass of READY_CSS_CLASSES) {
        if (!grouped[cssClass.category]) {
            grouped[cssClass.category] = [];
        }
        grouped[cssClass.category].push(cssClass);
    }

    return grouped;
}

// Tüm kategorileri al
export function getCSSCategories(): string[] {
    return [...new Set(READY_CSS_CLASSES.map(c => c.category))];
}

// Sınıf adına göre bul
export function findCSSClass(name: string): ReadyCSSClass | undefined {
    return READY_CSS_CLASSES.find(c => c.name === name);
}
