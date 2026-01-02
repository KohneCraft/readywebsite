'use client';

// ============================================
// Vav Yapı - usePageLayout Hook
// Sayfa layout'unu Firebase'den okur
// ============================================

import { useState, useEffect } from 'react';
import { getActivePageLayout } from '@/lib/firebase/firestore';
import { getDefaultElementsForPage } from '@/types';
import type { PageLayout, PageElement, PageType } from '@/types';

interface UsePageLayoutResult {
  layout: PageLayout | null;
  elements: PageElement[];
  isLoading: boolean;
  error: string | null;
  getElement: (type: string) => PageElement | undefined;
  isElementVisible: (type: string) => boolean;
  getElementSettings: (type: string) => PageElement['settings'] | null;
}

export function usePageLayout(pageType: PageType): UsePageLayoutResult {
  const [layout, setLayout] = useState<PageLayout | null>(null);
  const [elements, setElements] = useState<PageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLayout = async () => {
      try {
        // Firebase'den aktif layout'u al
        const activeLayout = await getActivePageLayout(pageType);
        
        if (activeLayout) {
          setLayout(activeLayout);
          // Element'leri sıraya göre diz
          const sortedElements = [...activeLayout.elements].sort((a, b) => a.order - b.order);
          setElements(sortedElements);
        } else {
          // Layout yoksa varsayılan elementleri kullan
          const defaultElements = getDefaultElementsForPage(pageType);
          const elementsWithId: PageElement[] = defaultElements.map((el, index) => ({
            ...el,
            id: `default-${index}`,
          }));
          setElements(elementsWithId);
        }
      } catch (err) {
        console.error('Failed to load page layout:', err);
        setError('Layout yüklenemedi');
        // Hata durumunda varsayılan elementleri kullan
        const defaultElements = getDefaultElementsForPage(pageType);
        const elementsWithId: PageElement[] = defaultElements.map((el, index) => ({
          ...el,
          id: `default-${index}`,
        }));
        setElements(elementsWithId);
      } finally {
        setIsLoading(false);
      }
    };

    loadLayout();
  }, [pageType]);

  // Belirli bir element tipini getir
  const getElement = (type: string): PageElement | undefined => {
    return elements.find(el => el.type === type);
  };

  // Element görünür mü?
  const isElementVisible = (type: string): boolean => {
    const element = getElement(type);
    return element?.visible ?? true;
  };

  // Element ayarlarını getir
  const getElementSettings = (type: string): PageElement['settings'] | null => {
    const element = getElement(type);
    return element?.settings ?? null;
  };

  return {
    layout,
    elements,
    isLoading,
    error,
    getElement,
    isElementVisible,
    getElementSettings,
  };
}

// Element genişlik class'ını hesapla
export function getWidthClass(width: PageElement['settings']['width']): string {
  const widthClasses: Record<string, string> = {
    'full': 'w-full',
    'half': 'w-full lg:w-1/2',
    'third': 'w-full lg:w-1/3',
    'quarter': 'w-full lg:w-1/4',
    'two-thirds': 'w-full lg:w-2/3',
    'three-quarters': 'w-full lg:w-3/4',
  };
  return widthClasses[width] || 'w-full';
}

// Element grid span class'ını hesapla
export function getGridSpanClass(width: PageElement['settings']['width']): string {
  const spanClasses: Record<string, string> = {
    'full': 'lg:col-span-3',
    'half': 'lg:col-span-1 lg:col-span-half',
    'third': 'lg:col-span-1',
    'quarter': 'lg:col-span-1',
    'two-thirds': 'lg:col-span-2',
    'three-quarters': 'lg:col-span-2',
  };
  return spanClasses[width] || 'lg:col-span-3';
}

// Margin/Padding style objesi oluştur
export function getSpacingStyle(spacing: { top: number; right: number; bottom: number; left: number }, type: 'margin' | 'padding'): React.CSSProperties {
  if (type === 'margin') {
    return {
      marginTop: spacing.top,
      marginRight: spacing.right,
      marginBottom: spacing.bottom,
      marginLeft: spacing.left,
    };
  }
  return {
    paddingTop: spacing.top,
    paddingRight: spacing.right,
    paddingBottom: spacing.bottom,
    paddingLeft: spacing.left,
  };
}

