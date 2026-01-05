'use client';

import { useState, useEffect, useMemo } from 'react';
import { ColumnRenderer } from './ColumnRenderer';
import { getSectionById, getColumnById } from '@/lib/firebase/firestore';
import type { Section, Breakpoint, Column } from '@/types/pageBuilder';

interface SectionRendererProps {
  sectionId: string;
}

function getDeviceType(): Breakpoint {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export function SectionRenderer({ sectionId }: SectionRendererProps) {
  const [section, setSection] = useState<Section | null>(null);
  const [columns, setColumns] = useState<Column[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadSection() {
      try {
        setLoading(true);
        const sectionData = await getSectionById(sectionId);
        if (process.env.NODE_ENV === 'development') {
          console.log(`SectionRenderer - Section yüklendi (${sectionId}):`, sectionData);
        }
        if (!sectionData) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Section bulunamadı: ${sectionId}`);
          }
        }
        setSection(sectionData);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`Section yükleme hatası (${sectionId}):`, error);
        }
      } finally {
        setLoading(false);
      }
    }
    loadSection();
  }, [sectionId]);

  // Column'ları yükle (width bilgileri için)
  useEffect(() => {
    async function loadColumns() {
      if (!section?.columns || section.columns.length === 0) {
        setColumns([]);
        return;
      }

      try {
        const columnPromises = section.columns.map(columnId => getColumnById(columnId));
        const loadedColumns = await Promise.all(columnPromises);
        setColumns(loadedColumns.filter(Boolean) as Column[]);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Column yükleme hatası:', error);
        }
        setColumns([]);
      }
    }

    if (section) {
      loadColumns();
    }
  }, [section?.columns, section]);
  
  // TÜM hook'lar en üstte olmalı - early return'lerden ÖNCE
  const deviceType = useMemo(() => getDeviceType(), []);
  
  // Settings ve hesaplamalar - useMemo ile optimize et
  const settings = useMemo(() => {
    const s = section?.settings || {};
    if (process.env.NODE_ENV === 'development') {
      console.log('SectionRenderer - Settings:', {
        maxHeight: s.maxHeight,
        columnLayout: s.columnLayout,
        columnGap: s.columnGap,
        fullSettings: s
      });
    }
    return s;
  }, [section?.settings]);
  const animation = useMemo(() => settings.animation, [settings]);
  
  // Section style - useMemo ile optimize et
  const sectionStyle: React.CSSProperties = useMemo(() => ({
    backgroundColor: settings.backgroundColor,
    backgroundImage: settings.backgroundImage ? `url(${settings.backgroundImage})` : 'none',
    backgroundSize: settings.backgroundSize || 'cover',
    backgroundPosition: settings.backgroundPosition || 'center',
    backgroundRepeat: settings.backgroundRepeat || 'no-repeat',
    backgroundAttachment: settings.backgroundAttachment || 'scroll',
    padding: settings.padding
      ? `${settings.padding.top || 0}px ${settings.padding.right || 0}px ${settings.padding.bottom || 0}px ${settings.padding.left || 0}px`
      : '0',
    margin: settings.margin
      ? `${settings.margin.top || 0}px ${settings.margin.right || 0}px ${settings.margin.bottom || 0}px ${settings.margin.left || 0}px`
      : '0',
    minHeight: settings.minHeight ? `${settings.minHeight}px` : 'auto',
    maxHeight: settings.maxHeight !== undefined && settings.maxHeight !== null ? `${settings.maxHeight}px` : undefined,
    borderTop: settings.borderTop?.width 
      ? `${settings.borderTop.width}px ${settings.borderTop.style} ${settings.borderTop.color}` 
      : 'none',
    borderBottom: settings.borderBottom?.width 
      ? `${settings.borderBottom.width}px ${settings.borderBottom.style} ${settings.borderBottom.color}` 
      : 'none',
    borderRadius: settings.borderRadius ? `${settings.borderRadius}px` : '0',
    boxShadow: settings.boxShadow || 'none',
    position: 'relative',
    overflow: 'hidden',
  }), [settings]);
  
  // Animation class ve style - useMemo ile optimize et
  const animationClass = useMemo(() => 
    animation?.enabled && isVisible 
      ? `animate-${animation.type || 'fadeIn'}` 
      : ''
  , [animation, isVisible]);
  
  const animationStyle = useMemo(() => animation?.enabled ? {
    '--animation-duration': `${animation.duration || 0.8}s`,
    '--animation-delay': `${animation.delay || 0}s`
  } : {}, [animation]);
  
  // Grid template columns - useMemo ile optimize et
  const gridTemplateColumns = useMemo(() => {
    // Alt Alta (column) düzeni için grid kullanma, flex kullanılacak
    if (settings.columnLayout === 'column') return undefined;
    if (columns.length === 0) return '1fr';
    
    // Tüm kolonların birimlerini kontrol et
    const hasPxColumns = columns.some(col => {
      const width = col.width || (100 / columns.length);
      // 0-100 arası % olarak kabul et, değilse px
      return width > 100 || width < 0;
    });
    
    if (process.env.NODE_ENV === 'development') {
      console.log('SectionRenderer - gridTemplateColumns hesaplanıyor:', {
        columnsCount: columns.length,
        columns: columns.map(col => ({ id: col.id, width: col.width })),
        hasPxColumns,
      });
    }
    
    // Eğer px kolonlar varsa, tüm kolonlar için 1fr kullan (width CSS property ile kontrol edilecek)
    if (hasPxColumns) {
      const result = columns.map(() => '1fr').join(' ');
      if (process.env.NODE_ENV === 'development') {
        console.log('SectionRenderer - px kolonlar tespit edildi, grid-template-columns:', result);
      }
      return result;
    }
    
    // Tüm kolonlar % ise, fr kullan
    const result = columns.map(col => {
      const width = col.width || (100 / columns.length);
      return `${width}fr`;
    }).join(' ');
    if (process.env.NODE_ENV === 'development') {
      console.log('SectionRenderer - % kolonlar, grid-template-columns:', result);
    }
    return result;
  }, [settings.columnLayout, columns]);
  
  // Intersection Observer for animations - TÜM hook'lar en üstte
  useEffect(() => {
    if (!animation || !animation.enabled) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      observer.observe(element);
    }
    
    return () => observer.disconnect();
  }, [animation, sectionId]);
  
  // Loading state - skeleton placeholder
  if (loading) {
    return (
      <section className="section-renderer-skeleton animate-pulse py-12">
        <div className="container mx-auto">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </section>
    );
  }
  
  // Error state - section not found
  if (!section) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`SectionRenderer - Section bulunamadı (${sectionId})`);
    }
    return (
      <section className="section-renderer-error text-center py-12 text-gray-500 dark:text-gray-400">
        <p>Section yüklenemedi</p>
      </section>
    );
  }
  
  // Responsive visibility check
  if (section.visibility && !section.visibility[deviceType]) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`SectionRenderer - Section görünür değil (${sectionId}, device: ${deviceType})`);
    }
    return null;
  }
  
  // Column kontrolü - empty state
  if (!section.columns || section.columns.length === 0) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`SectionRenderer - Section'da column yok (${sectionId})`);
    }
    return (
      <section className="section-renderer-empty text-center py-12 text-gray-500 dark:text-gray-400">
        <p>Bu section'da henüz içerik yok.</p>
      </section>
    );
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`SectionRenderer - Section render ediliyor (${sectionId}):`, {
      name: section.name,
      columnsCount: section.columns.length,
    });
  }
  
  return (
    <section 
      id={`section-${sectionId}`}
      className={`section-renderer ${animationClass}`}
      style={{ ...sectionStyle, ...animationStyle } as React.CSSProperties}
      data-section-name={section.name}
    >
      {/* Overlay */}
      {settings.overlay?.enabled && (
        <div 
          className="section-overlay absolute inset-0 z-0"
          style={{
            backgroundColor: settings.overlay.color,
            backdropFilter: settings.overlay.blur ? `blur(${settings.overlay.blur}px)` : 'none'
          }}
        />
      )}
      
      {/* Content Container */}
      <div 
        className={`section-container ${settings.fullWidth ? 'w-full' : 'container mx-auto'}`}
        style={{
          maxWidth: settings.fullWidth ? '100%' : `${settings.maxWidth || 1200}px`,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div 
          className="columns-wrapper"
          style={{
            display: settings.columnLayout === 'column' ? 'flex' : 'grid',
            flexDirection: settings.columnLayout === 'column' ? 'column' : undefined,
            gridTemplateColumns: settings.columnLayout === 'column' ? undefined : gridTemplateColumns,
            gap: settings.columnGap !== undefined && settings.columnGap !== null ? `${settings.columnGap}px` : '30px'
          }}
        >
          {section.columns && section.columns.length > 0 ? (
            section.columns.map((columnId, colIndex) => (
              <ColumnRenderer 
                key={columnId} 
                columnId={columnId}
                index={colIndex}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 p-8">
              <p>Bu section'da henüz içerik yok.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
