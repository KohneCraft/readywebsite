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
  selectedElement?: { type: 'section' | 'column' | 'block' | 'page' | 'header' | 'footer'; id: string } | null;
  onSelectElement?: (element: { type: 'section' | 'column' | 'block' | 'page' | 'header' | 'footer'; id: string } | null) => void;
  onMove?: (sectionId: string, direction: 'up' | 'down') => Promise<void>;
  onDuplicate?: (sectionId: string) => Promise<void>;
  onDelete?: (sectionId: string) => Promise<void>;
}

export function SectionEditor({
  section,
  index,
  isSelected,
  onSelect,
  selectedElement,
  onSelectElement,
  onMove,
  onDuplicate,
  onDelete,
}: SectionEditorProps) {
  const [isMoving, setIsMoving] = useState(false);
  const [isDuplicating, setIsDuplicating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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
              className={cn(
                'p-1 hover:bg-primary-700 rounded transition-colors',
                (isMoving || index === 0) && 'opacity-50 cursor-not-allowed'
              )}
              title="Yukarı Taşı"
              onClick={async (e) => {
                e.stopPropagation();
                if (onMove && !isMoving && index > 0) {
                  setIsMoving(true);
                  try {
                    await onMove(section.id, 'up');
                    window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                  } catch (error) {
                    console.error('Section taşıma hatası:', error);
                    alert('Section taşınırken bir hata oluştu.');
                  } finally {
                    setIsMoving(false);
                  }
                }
              }}
              disabled={isMoving || index === 0}
            >
              <ArrowUp className="w-3 h-3" />
            </button>
            <button
              className={cn(
                'p-1 hover:bg-primary-700 rounded transition-colors',
                isMoving && 'opacity-50 cursor-not-allowed'
              )}
              title="Aşağı Taşı"
              onClick={async (e) => {
                e.stopPropagation();
                if (onMove && !isMoving) {
                  setIsMoving(true);
                  try {
                    await onMove(section.id, 'down');
                    window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                  } catch (error) {
                    console.error('Section taşıma hatası:', error);
                    alert('Section taşınırken bir hata oluştu.');
                  } finally {
                    setIsMoving(false);
                  }
                }
              }}
              disabled={isMoving}
            >
              <ArrowDown className="w-3 h-3" />
            </button>
            <button
              className={cn(
                'p-1 hover:bg-primary-700 rounded transition-colors',
                isDuplicating && 'opacity-50 cursor-not-allowed'
              )}
              title="Kopyala"
              onClick={async (e) => {
                e.stopPropagation();
                if (onDuplicate && !isDuplicating) {
                  setIsDuplicating(true);
                  try {
                    await onDuplicate(section.id);
                    window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                  } catch (error) {
                    console.error('Section kopyalama hatası:', error);
                    alert('Section kopyalanırken bir hata oluştu.');
                  } finally {
                    setIsDuplicating(false);
                  }
                }
              }}
              disabled={isDuplicating || !onDuplicate}
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
              className={cn(
                'p-1 hover:bg-red-600 rounded transition-colors',
                isDeleting && 'opacity-50 cursor-not-allowed'
              )}
              title="Sil"
              onClick={async (e) => {
                e.stopPropagation();
                if (onDelete && !isDeleting && confirm('Bu section\'ı silmek istediğinizden emin misiniz?')) {
                  setIsDeleting(true);
                  try {
                    await onDelete(section.id);
                    window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                  } catch (error) {
                    console.error('Section silme hatası:', error);
                    alert('Section silinirken bir hata oluştu.');
                  } finally {
                    setIsDeleting(false);
                  }
                }
              }}
              disabled={isDeleting || !onDelete}
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
                onAddColumn={async (afterColumnId) => {
                  try {
                    const { createColumn, getSectionById } = await import('@/lib/firebase/firestore');
                    const currentSection = await getSectionById(section.id);
                    if (!currentSection) return;
                    
                    // Mevcut kolon sayısını al
                    const currentColumns = currentSection.columns || [];
                    const afterIndex = currentColumns.indexOf(afterColumnId);
                    
                    // Yeni kolon genişliğini hesapla (mevcut kolonların genişliklerini eşit dağıt)
                    const numColumns = currentColumns.length + 1;
                    const equalWidth = 100 / numColumns;
                    
                    // Yeni kolon oluştur
                    await createColumn({
                      sectionId: section.id,
                      width: equalWidth,
                      order: afterIndex + 1,
                    });
                    
                    // Mevcut kolonların genişliklerini güncelle
                    const { updateColumn, getColumnById } = await import('@/lib/firebase/firestore');
                    for (const colId of currentColumns) {
                      const col = await getColumnById(colId);
                      if (col) {
                        await updateColumn(colId, { width: equalWidth });
                      }
                    }
                    
                    window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: section.id } }));
                  } catch (error) {
                    console.error('Yeni kolon ekleme hatası:', error);
                    alert('Yeni kolon eklenirken bir hata oluştu.');
                  }
                }}
                onDeleteColumn={async (columnId) => {
                  try {
                    const { deleteColumn } = await import('@/lib/firebase/firestore');
                    await deleteColumn(columnId);
                    window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: section.id } }));
                  } catch (error) {
                    console.error('Kolon silme hatası:', error);
                    throw error;
                  }
                }}
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

