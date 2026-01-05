'use client';

import { useState, useEffect, useMemo } from 'react';
import { BlockRenderer } from './BlockRenderer';
import { getColumnById } from '@/lib/firebase/firestore';
import type { Column, Breakpoint } from '@/types/pageBuilder';

interface ColumnRendererProps {
  columnId: string;
  index: number;
  isNested?: boolean; // Nested column mu kontrolü için
}

function getDeviceType(): Breakpoint {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export function ColumnRenderer({ columnId, index, isNested = false }: ColumnRendererProps) {
  const [column, setColumn] = useState<Column | null>(null);
  const [nestedColumns, setNestedColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [nestedColumnsLoading, setNestedColumnsLoading] = useState(false);
  
  useEffect(() => {
    async function loadColumn() {
      try {
        setLoading(true);
        const columnData = await getColumnById(columnId);
        if (process.env.NODE_ENV === 'development') {
          console.log(`ColumnRenderer - Column yüklendi (${columnId}):`, columnData);
        }
        if (!columnData) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Column bulunamadı: ${columnId}`);
          }
        }
        setColumn(columnData);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`Column yükleme hatası (${columnId}):`, error);
        }
      } finally {
        setLoading(false);
      }
    }
    loadColumn();
  }, [columnId]);

  // Nested columns'ları yükle
  useEffect(() => {
    async function loadNestedColumns() {
      if (!column?.columns || column.columns.length === 0) {
        setNestedColumns([]);
        setNestedColumnsLoading(false);
        return;
      }

      try {
        setNestedColumnsLoading(true);
        const columnPromises = column.columns.map(nestedColumnId => getColumnById(nestedColumnId));
        const loadedColumns = await Promise.all(columnPromises);
        setNestedColumns(loadedColumns.filter(Boolean) as Column[]);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`Nested column yükleme hatası (${columnId}):`, error);
        }
        setNestedColumns([]);
      } finally {
        setNestedColumnsLoading(false);
      }
    }

    if (column) {
      loadNestedColumns();
    }
  }, [column, columnId]);
  
  const deviceType = useMemo(() => getDeviceType(), []);
  
  // Settings ve hesaplamalar - TÜM hook'lar en üstte olmalı (early return'lerden önce)
  const settings = useMemo(() => column?.settings || {}, [column?.settings]);
  const responsiveSettings = useMemo(() => settings.responsive?.[deviceType] || {}, [settings.responsive, deviceType]);
  const columnWidth = useMemo(() => responsiveSettings.width || column?.width || 100, [responsiveSettings.width, column?.width]);
  const padding = useMemo(() => responsiveSettings.padding || settings.padding || { top: 0, right: 0, bottom: 0, left: 0 }, [responsiveSettings.padding, settings.padding]);
  // Width birim kontrolü: 0-100 arası % olarak, değilse px olarak
  const isWidthPercent = useMemo(() => columnWidth <= 100 && columnWidth >= 0, [columnWidth]);
  const gridColumnSpan = useMemo(() => {
    if (isWidthPercent) {
      return columnWidth ? `span ${Math.round((columnWidth / 100) * 12)}` : 'span 12';
    }
    return undefined; // px kullanılıyorsa grid span kullanma
  }, [columnWidth, isWidthPercent]);
  
  // Nested columns için grid template - useMemo ile optimize et
  const nestedGridTemplate = useMemo(() => {
    if (nestedColumns.length === 0) return '1fr';
    
    // Tüm nested kolonların birimlerini kontrol et
    const hasPxColumns = nestedColumns.some(col => {
      const width = col.width || (100 / nestedColumns.length);
      return width > 100 || width < 0;
    });
    
    // Eğer px kolonlar varsa, tüm kolonlar için 1fr kullan (width CSS property ile kontrol edilecek)
    if (hasPxColumns) {
      return nestedColumns.map(() => '1fr').join(' ');
    }
    
    // Tüm kolonlar % ise, fr kullan
    return nestedColumns.map(col => {
      const width = col.width || (100 / nestedColumns.length);
      return `${width}fr`;
    }).join(' ');
  }, [nestedColumns]);
  
  // Column style - useMemo ile optimize et
  const columnStyle: React.CSSProperties = useMemo(() => ({
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
    justifyContent: settings.verticalAlign || 'flex-start',
    alignItems: settings.horizontalAlign || 'flex-start',
    gridColumn: isNested ? undefined : gridColumnSpan, // Nested column'lar için grid-column kullanma, sadece section seviyesindeki kolonlar için
    // Eğer px kullanılıyorsa ve grid içindeyse, flex-shrink: 0 ekle ki genişlik korunsun
    flexShrink: isWidthPercent ? undefined : 0,
    // Eğer px kullanılıyorsa, min-width de ekle ki küçülmesin
    minWidth: isWidthPercent ? undefined : `${columnWidth}px`,
  }), [settings, padding, gridColumnSpan, isWidthPercent, columnWidth, isNested]);
  
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
    if (process.env.NODE_ENV === 'development') {
      console.warn(`ColumnRenderer - Column bulunamadı (${columnId})`);
    }
    return (
      <div className="column-renderer-error text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
        Kolon yüklenemedi
      </div>
    );
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`ColumnRenderer - Column render ediliyor (${columnId}):`, {
      width: column.width,
      blocksCount: column.blocks?.length || 0,
    });
  }
  
  return (
    <div 
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
          className="nested-columns-wrapper grid gap-2"
          style={{
            gridTemplateColumns: nestedGridTemplate,
            width: '100%', // Parent kolonun genişliğini tam kullan
          }}
        >
          {nestedColumns.map((nestedCol, nestedIndex) => (
            <ColumnRenderer
              key={nestedCol.id}
              columnId={nestedCol.id}
              index={nestedIndex}
              isNested={true} // Nested column olduğunu belirt
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

