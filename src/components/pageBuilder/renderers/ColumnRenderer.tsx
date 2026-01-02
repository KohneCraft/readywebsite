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
  
  useEffect(() => {
    async function loadColumn() {
      try {
        const columnData = await getColumnById(columnId);
        console.log(`ColumnRenderer - Column yüklendi (${columnId}):`, columnData);
        if (!columnData) {
          console.warn(`Column bulunamadı: ${columnId}`);
        }
        setColumn(columnData);
      } catch (error) {
        console.error(`Column yükleme hatası (${columnId}):`, error);
      }
    }
    loadColumn();
  }, [columnId]);
  
  const deviceType = useMemo(() => getDeviceType(), []);
  
  if (!column) {
    console.warn(`ColumnRenderer - Column null (${columnId})`);
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
  const gridColumnSpan = columnWidth ? `span ${Math.round((columnWidth / 100) * 12)}` : 'span 12';
  
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
      {column.blocks?.map((blockId, blockIndex) => (
        <BlockRenderer 
          key={blockId} 
          blockId={blockId}
          index={blockIndex}
        />
      ))}
      
      {column.blocks?.length === 0 && (
        <div className="empty-column-placeholder">
          {/* Boş kolon - sadece admin görür */}
        </div>
      )}
    </div>
  );
}

