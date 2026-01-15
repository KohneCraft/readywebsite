// ============================================
// Effects - Base Effect Interface
// ============================================

export interface IEffectInstance {
    init(): void;
    update(): void;
    render(): void;
    destroy(): void;
}

/**
 * Hex renk kodunu rgba'ya çevir
 */
export function hexToRgba(hex: string, alpha: number): string {
    // rgba formatını destekle
    if (hex.startsWith('rgba')) {
        return hex;
    }

    // Hex olmayan formatları destekle
    if (!hex.startsWith('#')) {
        return hex;
    }

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
