'use client';

import { useState, useEffect, useMemo } from 'react';
import { BlockRenderer } from './BlockRenderer';
import { getColumnById } from '@/lib/firebase/firestore';
import type { Column, Breakpoint } from '@/types/pageBuilder';

interface ColumnRendererProps {
  columnId: string;
  index: number;
}

function getDeviceType(): Breakpoint {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export function ColumnRenderer({ columnId, index }: ColumnRendererProps) {
  const [column, setColumn] = useState<Column | null>(null);
  const [nestedColumns, setNestedColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [nestedColumnsLoading, setNestedColumnsLoading] = useState(false);
  
  useEffect(() => {
    async function loadColumn() {
      try {
        setLoading(true);
        const columnData = await getColumnById(columnId);
        console.log(`ColumnRenderer - Column yüklendi (${columnId}):`, columnData);
        if (!columnData) {
          console.warn(`Column bulunamadı: ${columnId}`);
        }
        setColumn(columnData);
      } catch (error) {
        console.error(`Column yükleme hatası (${columnId}):`, error);
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
        console.error(`Nested column yükleme hatası (${columnId}):`, error);
        setNestedColumns([]);
      } finally {
        setNestedColumnsLoading(false);
      }
    }

    if (column) {
      loadNestedColumns();
    }
  }, [column]);
  
  const deviceType = useMemo(() => getDeviceType(), []);
  
  // Loading durumunda hiçbir şey render etme (null uyarısını önlemek için)
  if (loading) {
    return null;
  }
  
  if (!column) {
    console.warn(`ColumnRenderer - Column bulunamadı (${columnId})`);
    return null;
  }
  
  // Block kontrolü
  if (!column.blocks || column.blocks.length === 0) {
    console.warn(`ColumnRenderer - Column'da block yok (${columnId})`);
    // Boş column'ları da göster (placeholder için)
  }
  
  console.log(`ColumnRenderer - Column render ediliyor (${columnId}):`, {
    width: column.width,
    blocksCount: column.blocks?.length || 0,
    blocks: column.blocks,
  });
  
  const settings = column.settings || {};
  const responsiveSettings = settings.responsive?.[deviceType] || {};
  const columnWidth = responsiveSettings.width || column.width || 100;
  const padding = responsiveSettings.padding || settings.padding || { top: 0, right: 0, bottom: 0, left: 0 };
  
  // Grid column span hesapla (width yüzde olarak geliyor, grid'de fr olarak kullanılacak)
  // NOT: SectionRenderer'da artık gridTemplateColumns kullanılıyor, bu yüzden gridColumnSpan kullanılmıyor
  // Ancak geriye dönük uyumluluk için bırakıyoruz
  const gridColumnSpan = columnWidth ? `span ${Math.round((columnWidth / 100) * 12)}` : 'span 12';
  
  // Nested columns için grid template
  const nestedGridTemplate = nestedColumns.length > 0
    ? nestedColumns.map(col => {
        const width = col.width || (100 / nestedColumns.length);
        return `${width}fr`;
      }).join(' ')
    : '1fr';
  
  const columnStyle: React.CSSProperties = {
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
    height: settings.height 
      ? (typeof settings.height === 'number' ? `${settings.height}px` : settings.height)
      : 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: settings.verticalAlign || 'flex-start',
    alignItems: settings.horizontalAlign || 'flex-start',
    gridColumn: gridColumnSpan, // Grid column span kullan
  };
  
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
          }}
        >
          {nestedColumns.map((nestedCol, nestedIndex) => (
            <ColumnRenderer
              key={nestedCol.id}
              columnId={nestedCol.id}
              index={nestedIndex}
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

