'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { BlockRenderer } from './BlockRenderer';
import { getColumnById } from '@/lib/firebase/firestore';
import { logger } from '@/lib/logger';
import type { Column } from '@/types/pageBuilder';
import { useDeviceType } from '@/hooks/useDeviceType';

interface ColumnRendererProps {
  columnId: string;
  index: number;
  isNested?: boolean; // Nested column mu kontrolü için
  isFlexLayout?: boolean; // Parent section flex layout mu? (columnLayout === 'column')
  depth?: number; // İç içe kolon derinliği (sonsuz döngü önleme)
  initialData?: Column; // Parent'tan gelen veri (double fetch önleme)
}

export function ColumnRenderer({ columnId, index, isNested: _isNested = false, isFlexLayout = false, depth = 0, initialData }: ColumnRendererProps) {
  // TÜM hook'lar en üstte olmalı (early return'lerden önce)
  const columnRef = useRef<HTMLDivElement>(null);
  const deviceType = useDeviceType();
  // State başlangıcında initialData varsa onu kullan, yoksa null
  const [column, setColumn] = useState<Column | null>(initialData || null);
  const [nestedColumns, setNestedColumns] = useState<Column[]>([]);
  // Eğer initialData geldiyse loading false başlasın
  const [loading, setLoading] = useState(!initialData);
  const [nestedColumnsLoading, setNestedColumnsLoading] = useState(false);
  
  useEffect(() => {
    let isMounted = true;

    // Eğer veri dışarıdan (parent'tan) geldiyse tekrar çekme!
    if (initialData) {
      setColumn(initialData);
      setLoading(false);
      return;
    }

    async function loadColumn() {
      try {
        setLoading(true);
        const columnData = await getColumnById(columnId);
        if (!isMounted) return;
        
        logger.pageBuilder.debug(`Column yüklendi (${columnId})`, columnData);
        if (!columnData) {
          logger.pageBuilder.warn(`Column bulunamadı: ${columnId}`);
        }
        setColumn(columnData);
      } catch (error) {
        if (!isMounted) return;
        logger.pageBuilder.error(`Column yükleme hatası (${columnId})`, error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadColumn();

    return () => {
      isMounted = false;
    };
  }, [columnId, initialData]);

  // Nested columns'ları yükle
  useEffect(() => {
    let isMounted = true;

    async function loadNestedColumns() {
      if (!column?.columns || column.columns.length === 0) {
        if (isMounted) {
          setNestedColumns([]);
          setNestedColumnsLoading(false);
        }
        return;
      }

      try {
        setNestedColumnsLoading(true);
        const columnPromises = column.columns.map(nestedColumnId => getColumnById(nestedColumnId));
        const loadedColumns = await Promise.all(columnPromises);
        if (isMounted) {
          setNestedColumns(loadedColumns.filter(Boolean) as Column[]);
        }
      } catch (error) {
        if (!isMounted) return;
        logger.pageBuilder.error(`Nested column yükleme hatası (${columnId})`, error);
        setNestedColumns([]);
      } finally {
        if (isMounted) {
          setNestedColumnsLoading(false);
        }
      }
    }

    if (column) {
      loadNestedColumns();
    }

    return () => {
      isMounted = false;
    };
  }, [column, columnId]);
  
  // Settings ve hesaplamalar - TÜM hook'lar en üstte olmalı (early return'lerden önce)
  const settings = useMemo(() => column?.settings || {}, [column?.settings]);
  const responsiveSettings = useMemo(() => settings.responsive?.[deviceType] || {}, [settings.responsive, deviceType]);
  const columnWidth = useMemo(() => responsiveSettings.width || column?.width || 100, [responsiveSettings.width, column?.width]);
  const padding = useMemo(() => responsiveSettings.padding || settings.padding || { top: 0, right: 0, bottom: 0, left: 0 }, [responsiveSettings.padding, settings.padding]);
  // Width birim kontrolü: 0-100 arası % olarak, değilse px olarak
  const isWidthPercent = useMemo(() => columnWidth <= 100 && columnWidth >= 0, [columnWidth]);
  // gridColumnSpan kaldırıldı - SectionRenderer'daki gridTemplateColumns zaten genişliği kontrol ediyor
  
  // Nested columns için grid template - useMemo ile optimize et
  const nestedGridTemplate = useMemo(() => {
    // Eğer parent section Flex (Column) düzenindeyse, 
    // nested kolonları yan yana değil, alt alta (tek sütun) olarak zorla.
    if (isFlexLayout) return '1fr';
    
    if (nestedColumns.length === 0) return '1fr';
    
    // Tüm nested kolonların birimlerini kontrol et
    const hasPxColumns = nestedColumns.some(col => {
      const width = col.width || (100 / nestedColumns.length);
      return width > 100 || width < 0;
    });
    
    // Eğer px kolonlar varsa, her kolon için doğru değeri kullan (fixed + fluid düzen)
    if (hasPxColumns) {
      return nestedColumns.map(col => {
        const width = col.width || (100 / nestedColumns.length);
        // 100'den büyükse veya 0'dan küçükse px kabul et
        const isPx = width > 100 || width < 0;
        if (isPx) return `${width}px`;
        // Px olmayanlar için kalan alanı paylaştır
        return '1fr';
      }).join(' ');
    }
    
    // Tüm kolonlar % ise, fr kullan
    return nestedColumns.map(col => {
      const width = col.width || (100 / nestedColumns.length);
      return `${width}fr`;
    }).join(' ');
  }, [nestedColumns, isFlexLayout]);
  
  // Column style - useMemo ile optimize et
  const columnStyle: React.CSSProperties = useMemo(() => {
    // Hizalama değerlerini CSS değerlerine dönüştür
    const getVerticalAlign = (align?: string): string => {
      if (!align) return 'flex-start';
      const mapping: Record<string, string> = {
        'top': 'flex-start',
        'center': 'center',
        'bottom': 'flex-end',
      };
      return mapping[align] || 'flex-start';
    };

    const getHorizontalAlign = (align?: string): string => {
      if (!align) return 'flex-start';
      const mapping: Record<string, string> = {
        'left': 'flex-start',
        'center': 'center',
        'right': 'flex-end',
      };
      return mapping[align] || 'flex-start';
    };

    return {
      backgroundColor: settings.backgroundColor,
      backgroundImage: settings.backgroundImage ? `url(${settings.backgroundImage})` : 'none',
      padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
      margin: settings.margin
        ? `${settings.margin.top || 0}px ${settings.margin.right || 0}px ${settings.margin.bottom || 0}px ${settings.margin.left || 0}px`
        : '0',
      borderRadius: settings.borderRadius ? `${settings.borderRadius}px` : '0',
      border: settings.border?.width 
        ? `${settings.border.width}px ${settings.border.style} ${settings.border.color}` 
        : 'none',
      boxShadow: settings.boxShadow || 'none',
      minHeight: settings.minHeight ? `${settings.minHeight}px` : 'auto',
      maxHeight: settings.maxHeight ? `${settings.maxHeight}px` : 'none',
      maxWidth: settings.maxWidth ? `${settings.maxWidth}px` : 'none',
      width: isWidthPercent ? undefined : `${columnWidth}px`, // px ise width kullan
      height: settings.height 
        ? (typeof settings.height === 'number' ? `${settings.height}px` : settings.height)
        : 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: getVerticalAlign(settings.verticalAlign),
      alignItems: getHorizontalAlign(settings.horizontalAlign),
      // gridColumn kaldırıldı - SectionRenderer'daki gridTemplateColumns zaten genişliği kontrol ediyor
      // Eğer px kullanılıyorsa ve grid içindeyse, flex-shrink: 0 ekle ki genişlik korunsun
      flexShrink: isWidthPercent ? undefined : 0,
      // Eğer px kullanılıyorsa, min-width de ekle ki küçülmesin
      minWidth: isWidthPercent ? undefined : `${columnWidth}px`,
    };
  }, [settings, padding, isWidthPercent, columnWidth]);
  
  // Güvenlik kilidi: Maksimum iç içe kolon derinliği (hook'lardan sonra kontrol et)
  if (depth > 5) {
    logger.pageBuilder.warn(`Maksimum iç içe kolon derinliğine ulaşıldı (${depth}). Sonsuz döngü önlendi.`);
    return null;
  }
  
  // Loading state - skeleton placeholder
  if (loading) {
    return (
      <div className="column-renderer-skeleton animate-pulse">
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      </div>
    );
  }
  
  // Error state - column not found
  if (!column) {
    logger.pageBuilder.warn(`Column bulunamadı (${columnId})`);
    return (
      <div className="column-renderer-error text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
        Kolon yüklenemedi
      </div>
    );
  }
  
  logger.pageBuilder.debug(`Column render ediliyor (${columnId})`, {
    width: column.width,
    blocksCount: column.blocks?.length || 0,
  });
  
  return (
    <div 
      ref={columnRef}
      className="column-renderer"
      style={columnStyle}
      data-column-index={index ?? 0}
    >
      {/* Nested columns varsa, onları göster */}
      {nestedColumnsLoading ? (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
          İç kolonlar yükleniyor...
        </div>
      ) : nestedColumns.length > 0 ? (
        <div
          className={`nested-columns-wrapper ${isFlexLayout ? 'flex flex-col' : 'grid'} gap-2`}
          style={{
            gridTemplateColumns: isFlexLayout ? undefined : nestedGridTemplate,
            width: '100%', // Parent kolonun genişliğini tam kullan
          }}
        >
          {nestedColumns.map((nestedCol, nestedIndex) => (
            <ColumnRenderer
              key={nestedCol.id}
              columnId={nestedCol.id}
              index={nestedIndex}
              isNested={true} // Nested column olduğunu belirt
              isFlexLayout={isFlexLayout} // Parent section'ın layout bilgisini nested columns'a da geçir
              depth={depth + 1} // Derinliği artır (sonsuz döngü önleme)
            />
          ))}
        </div>
      ) : null}
      
      {/* Blocks render et (nested column'ların altında veya yanında) */}
      {!nestedColumnsLoading && (
        <>
          {column.blocks?.map((blockId, blockIndex) => (
            <BlockRenderer 
              key={blockId} 
              blockId={blockId}
              index={blockIndex}
            />
          ))}
          
          {column.blocks?.length === 0 && nestedColumns.length === 0 && (
            <div className="empty-column-placeholder">
              {/* Boş kolon - sadece admin görür */}
            </div>
          )}
        </>
      )}
    </div>
  );
}

