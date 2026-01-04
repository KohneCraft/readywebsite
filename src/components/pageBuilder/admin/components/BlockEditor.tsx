'use client';

// ============================================
// Vav Yapı - Block Editor
// Block düzenleme componenti - önizleme gösterir
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { GripVertical, Settings, Copy, Trash2, Loader2 } from 'lucide-react';
import { BlockRenderer } from '@/components/pageBuilder/renderers/BlockRenderer';
import { cn } from '@/lib/utils';
import type { Block } from '@/types/pageBuilder';

interface BlockEditorProps {
  block: Block;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onDelete?: () => void;
  onDuplicate?: (blockId: string) => Promise<void>;
}

export function BlockEditor({
  block,
  index,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
}: BlockEditorProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDuplicating, setIsDuplicating] = useState(false);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: block.id,
    data: {
      type: 'block',
      id: block.id,
      source: 'canvas',
    },
    disabled: isDeleting || isDuplicating, // İşlem sırasında drag'ı devre dışı bırak
  });

  const handleDelete = useCallback(async () => {
    if (isDeleting) return;
    
    if (!confirm('Bu bloğu silmek istediğinizden emin misiniz?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const { deleteBlock } = await import('@/lib/firebase/firestore');
      await deleteBlock(block.id);
      // Sayfayı yeniden yükle
      window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error('Block silme hatası:', error);
      alert('Block silinirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsDeleting(false);
    }
  }, [block.id, isDeleting, onDelete]);

  const handleDuplicate = useCallback(async () => {
    if (isDuplicating || !onDuplicate) return;

    setIsDuplicating(true);
    try {
      await onDuplicate(block.id);
    } catch (error) {
      console.error('Block kopyalama hatası:', error);
      alert('Block kopyalanırken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsDuplicating(false);
    }
  }, [block.id, isDuplicating, onDuplicate]);

  // Keyboard shortcuts (Delete tuşu ile silme)
  useEffect(() => {
    if (!isSelected) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete veya Backspace tuşu
      if ((e.key === 'Delete' || e.key === 'Backspace') && !isDeleting) {
        // Input, textarea veya contentEditable içinde değilse
        const target = e.target as HTMLElement;
        if (
          target.tagName !== 'INPUT' &&
          target.tagName !== 'TEXTAREA' &&
          !target.isContentEditable
        ) {
          e.preventDefault();
          handleDelete();
        }
      }
      // Ctrl/Cmd + D ile kopyalama
      if ((e.ctrlKey || e.metaKey) && e.key === 'd' && !isDuplicating) {
        e.preventDefault();
        handleDuplicate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSelected, isDeleting, isDuplicating, handleDelete, handleDuplicate]);

  // Block validation (hook'lardan sonra)
  if (!block || !block.id || !block.type) {
    console.error('Geçersiz block:', block);
    return null;
  }

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'relative group border-2 transition-all rounded-lg',
        isSelected
          ? 'border-primary-500 shadow-lg ring-2 ring-primary-200 dark:ring-primary-800'
          : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600',
        isDragging && 'opacity-50',
        (isDeleting || isDuplicating) && 'opacity-50 pointer-events-none'
      )}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`${block.type} bloğu, ${isSelected ? 'seçili' : 'seçili değil'}`}
      data-selected={isSelected}
    >
      {/* Block Toolbar */}
      {(isHovered || isSelected) && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-gray-800 text-white px-2 py-1 flex items-center justify-between text-xs rounded-t-lg">
          <div
            {...listeners}
            {...attributes}
            className="flex items-center gap-1 cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="w-3 h-3" />
            <span className="capitalize">{block.type}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="p-1 hover:bg-gray-700 rounded transition-colors"
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
                'p-1 hover:bg-gray-700 rounded transition-colors',
                isDuplicating && 'opacity-50 cursor-not-allowed'
              )}
              title={isDuplicating ? 'Kopyalanıyor...' : 'Kopyala (Ctrl+D)'}
              onClick={(e) => {
                e.stopPropagation();
                handleDuplicate();
              }}
              disabled={isDuplicating || !onDuplicate}
              aria-label="Bloğu kopyala"
            >
              {isDuplicating ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
            <button
              className={cn(
                'p-1 hover:bg-red-600 rounded transition-colors',
                isDeleting && 'opacity-50 cursor-not-allowed'
              )}
              title={isDeleting ? 'Siliniyor...' : 'Sil (Delete)'}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              disabled={isDeleting}
              aria-label="Bloğu sil"
            >
              {isDeleting ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Trash2 className="w-3 h-3" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Block Preview */}
      <div className="pt-6">
        <BlockRenderer blockId={block.id} index={index} />
      </div>
    </div>
  );
}

