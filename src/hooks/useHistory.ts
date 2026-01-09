'use client';

import { useState, useCallback, useEffect } from 'react';

interface UseHistoryOptions {
  maxHistory?: number; // Maksimum geçmiş sayısı (varsayılan: 50)
}

interface UseHistoryReturn<T> {
  present: T;
  set: (newPresent: T) => void;
  undo: () => void;
  redo: () => void;
  reset: (newPresent: T) => void;
  canUndo: boolean;
  canRedo: boolean;
}

/**
 * Undo/Redo işlevselliği sağlayan hook
 * 
 * @param initialPresent - Başlangıç state değeri
 * @param options - Opsiyonel ayarlar (maxHistory)
 * @returns Geçmiş yönetimi fonksiyonları ve durumları
 * 
 * @example
 * const { present, set, undo, redo, canUndo, canRedo } = useHistory(initialState);
 */
export function useHistory<T>(
  initialPresent: T,
  options: UseHistoryOptions = {}
): UseHistoryReturn<T> {
  const { maxHistory = 50 } = options;

  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState<T>(initialPresent);
  const [future, setFuture] = useState<T[]>([]);

  // Yeni state ekle ve geçmişe kaydet
  const set = useCallback(
    (newPresent: T) => {
      if (newPresent === present) return;

      setPast((prevPast) => {
        const newPast = [...prevPast, present];
        // maxHistory limitini aş
        if (newPast.length > maxHistory) {
          return newPast.slice(newPast.length - maxHistory);
        }
        return newPast;
      });
      setPresent(newPresent);
      setFuture([]); // Yeni bir değişiklik yapıldığında future'ı temizle
    },
    [present, maxHistory]
  );

  // Geri al
  const undo = useCallback(() => {
    if (past.length === 0) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setPast(newPast);
    setPresent(previous);
    setFuture((prevFuture) => [present, ...prevFuture]);
  }, [past, present]);

  // İleri al
  const redo = useCallback(() => {
    if (future.length === 0) return;

    const next = future[0];
    const newFuture = future.slice(1);

    setPast((prevPast) => [...prevPast, present]);
    setPresent(next);
    setFuture(newFuture);
  }, [future, present]);

  // Sıfırla - geçmişi tamamen temizle
  const reset = useCallback((newPresent: T) => {
    setPast([]);
    setPresent(newPresent);
    setFuture([]);
  }, []);

  // Klavye kısayolları
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Z veya Cmd+Z (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Ctrl+Y veya Ctrl+Shift+Z (Windows/Linux) veya Cmd+Shift+Z (Mac)
      else if (
        ((e.ctrlKey || e.metaKey) && e.key === 'y') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z')
      ) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]); // Dependencies eklendi

  return {
    present,
    set,
    undo,
    redo,
    reset,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
  };
}
