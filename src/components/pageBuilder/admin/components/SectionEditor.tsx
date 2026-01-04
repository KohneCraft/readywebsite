'use client';

// ============================================
// Vav Yapı - Section Editor
// Section düzenleme componenti
// ============================================

import { useState, useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { ColumnEditor } from './ColumnEditor';
import { getColumnById } from '@/lib/firebase/firestore';
import { ArrowUp, ArrowDown, Copy, Trash2, Settings, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Section, Column } from '@/types/pageBuilder';

interface SectionEditorProps {
  section: Section;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  selectedElement?: { type: 'section' | 'column' | 'block'; id: string } | null;
  onSelectElement?: (element: { type: 'section' | 'column' | 'block'; id: string } | null) => void;
}

export function SectionEditor({
  section,
  index,
  isSelected,
  onSelect,
  selectedElement,
  onSelectElement,
}: SectionEditorProps) {
  const [columns, setColumns] = useState<Column[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);

  const { setNodeRef, isOver } = useDroppable({
    id: section.id,
    data: { type: 'section', id: section.id },
  });

  // Column'ları yükle
  useEffect(() => {
    async function loadColumns() {
      if (!section.columns || section.columns.length === 0) {
        setColumns([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const columnPromises = section.columns.map(columnId => getColumnById(columnId));
        const loadedColumns = await Promise.all(columnPromises);
        setColumns(loadedColumns.filter(Boolean) as Column[]);
      } catch (error) {
        console.error('Column yükleme hatası:', error);
        setColumns([]);
      } finally {
        setLoading(false);
      }
    }

    loadColumns();
  }, [section.columns]);

  const settings = section.settings || {};
  const gridTemplate = columns.length > 0
    ? columns.map(col => `${col.width || 100 / columns.length}fr`).join(' ')
    : '1fr';

  return (
    <section
      ref={setNodeRef}
      className={cn(
        'relative border-2 transition-all',
        isSelected
          ? 'border-primary-500 shadow-lg'
          : isOver
          ? 'border-primary-300 dark:border-primary-600'
          : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
      )}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: settings.backgroundColor || 'transparent',
        backgroundImage: settings.backgroundImage ? `url(${settings.backgroundImage})` : 'none',
        backgroundSize: settings.backgroundSize || 'cover',
        backgroundPosition: settings.backgroundPosition || 'center',
        padding: settings.padding
          ? `${settings.padding.top || 0}px ${settings.padding.right || 0}px ${settings.padding.bottom || 0}px ${settings.padding.left || 0}px`
          : '0',
        margin: settings.margin
          ? `${settings.margin.top || 0}px ${settings.margin.right || 0}px ${settings.margin.bottom || 0}px ${settings.margin.left || 0}px`
          : '0',
        minHeight: settings.minHeight ? `${settings.minHeight}px` : 'auto',
      }}
    >
      {/* Section Toolbar */}
      {(isHovered || isSelected) && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-primary-600 text-white px-3 py-1.5 flex items-center justify-between text-xs">
          <span className="font-medium">{section.name || `Section ${index + 1}`}</span>
          <div className="flex items-center gap-1">
            <button
              className="p-1 hover:bg-primary-700 rounded transition-colors"
              title="Yukarı Taşı"
              onClick={(e) => {
                e.stopPropagation();
                // Sıra değiştirme işlemi
              }}
            >
              <ArrowUp className="w-3 h-3" />
            </button>
            <button
              className="p-1 hover:bg-primary-700 rounded transition-colors"
              title="Aşağı Taşı"
              onClick={(e) => {
                e.stopPropagation();
                // Sıra değiştirme işlemi
              }}
            >
              <ArrowDown className="w-3 h-3" />
            </button>
            <button
              className="p-1 hover:bg-primary-700 rounded transition-colors"
              title="Kopyala"
              onClick={(e) => {
                e.stopPropagation();
                // Kopyalama işlemi
              }}
            >
              <Copy className="w-3 h-3" />
            </button>
            <button
              className="p-1 hover:bg-primary-700 rounded transition-colors"
              title="Ayarlar"
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
            >
              <Settings className="w-3 h-3" />
            </button>
            <button
              className="p-1 hover:bg-red-600 rounded transition-colors"
              title="Sil"
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('Bu section\'ı silmek istediğinizden emin misiniz?')) {
                  // Silme işlemi
                }
              }}
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Overlay */}
      {settings.overlay?.enabled && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundColor: settings.overlay.color || 'rgba(0,0,0,0.5)',
            backdropFilter: settings.overlay.blur ? `blur(${settings.overlay.blur}px)` : 'none',
          }}
        />
      )}

      {/* Content Container */}
      <div
        className="relative z-1"
        style={{
          maxWidth: settings.fullWidth ? '100%' : `${settings.maxWidth || 1200}px`,
          margin: '0 auto',
        }}
      >
        {/* Columns Grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: gridTemplate,
            gap: `${settings.columnGap || 30}px`,
          }}
        >
          {loading ? (
            <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
              Yükleniyor...
            </div>
          ) : columns.length > 0 ? (
            columns.map((column, colIndex) => (
              <ColumnEditor
                key={column.id}
                column={column}
                index={colIndex}
                isSelected={selectedElement?.type === 'column' && selectedElement.id === column.id}
                onSelect={() => {
                  if (onSelectElement) {
                    onSelectElement({ type: 'column', id: column.id });
                  }
                }}
                selectedElement={selectedElement}
                onSelectElement={onSelectElement}
              />
            ))
          ) : (
            <div className="col-span-full">
              <EmptySection
                onAddColumn={async () => {
                  // Yeni column ekleme
                  try {
                    const { createColumn } = await import('@/lib/firebase/firestore');
                    await createColumn({
                      sectionId: section.id,
                      width: 100,
                      order: 0,
                    });
                    // Section'ı yeniden yükle
                    const { getSectionById } = await import('@/lib/firebase/firestore');
                    const updatedSection = await getSectionById(section.id);
                    if (updatedSection) {
                      // State güncellemesi için parent component'e bildir
                      window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: section.id } }));
                    }
                  } catch (error) {
                    console.error('Column ekleme hatası:', error);
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function EmptySection({ onAddColumn }: { onAddColumn: () => void }) {
  return (
    <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        Bu section'da henüz kolon yok
      </p>
      <button
        onClick={onAddColumn}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm font-medium"
      >
        <Plus className="w-4 h-4" />
        Kolon Ekle
      </button>
    </div>
  );
}

