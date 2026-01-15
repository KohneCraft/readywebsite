'use client';

// ============================================
// useEffects Hook - Firebase Real-time Effects
// ============================================

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Effect } from '@/types/effects';

interface UseEffectsResult {
    activeEffects: Effect[];
    isLoading: boolean;
    error: Error | null;
}

/**
 * Aktif efektleri real-time dinleyen hook
 * @param pageId - Sayfa ID'si (null = anasayfa, undefined = filtreleme yok)
 */
export function useEffects(pageId: string | null = null): UseEffectsResult {
    const [activeEffects, setActiveEffects] = useState<Effect[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Aktif efektleri dinle
        const effectsQuery = query(
            collection(db, 'effects'),
            where('visibility.enabled', '==', true)
        );

        const unsubscribe = onSnapshot(
            effectsQuery,
            (snapshot) => {
                const effects = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate() || new Date(),
                    updatedAt: doc.data().updatedAt?.toDate() || new Date(),
                })) as Effect[];

                // Sayfa bazlı filtreleme
                const filteredEffects = effects.filter((effect) => {
                    const { scope, pages } = effect.visibility;

                    switch (scope) {
                        case 'all':
                            return true;
                        case 'home':
                            return pageId === null;
                        case 'selected':
                            if (pageId === null) {
                                const homeIdentifiers = ['', 'home', 'index', '/'];
                                return pages.some(p => homeIdentifiers.includes(p));
                            }
                            return pages.includes(pageId);
                        case 'exclude':
                            if (pageId === null) {
                                const homeIdentifiers = ['', 'home', 'index', '/'];
                                return !pages.some(p => homeIdentifiers.includes(p));
                            }
                            return !pages.includes(pageId);
                        default:
                            return false;
                    }
                });

                setActiveEffects(filteredEffects);
                setIsLoading(false);
            },
            (err) => {
                console.error('Efektler yüklenemedi:', err);
                setError(err as Error);
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, [pageId]);

    return { activeEffects, isLoading, error };
}
