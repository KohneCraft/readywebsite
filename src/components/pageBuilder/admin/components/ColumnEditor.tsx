'use client';

// ============================================
// Vav Yapı - Column Editor
// Column düzenleme componenti
// ============================================

import { useState, useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { BlockEditor } from './BlockEditor';
import { getBlockById } from '@/lib/firebase/firestore';
import { Plus, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Column, Block } from '@/types/pageBuilder';

interface ColumnEditorProps {
  column: Column;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

export function ColumnEditor({
  column,
  index,
  isSelected,
  onSelect,
}: ColumnEditorProps) {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);

  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: 'column', id: column.id },
  });

  // Block'ları yükle
  useEffect(() => {
    async function loadBlocks() {
      if (!column.blocks || column.blocks.length === 0) {
        setBlocks([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const blockPromises = column.blocks.map(blockId => getBlockById(blockId));
        const loadedBlocks = await Promise.all(blockPromises);
        setBlocks(loadedBlocks.filter(Boolean) as Block[]);
      } catch (error) {
        console.error('Block yükleme hatası:', error);
        setBlocks([]);
      } finally {
        setLoading(false);
      }
    }

    loadBlocks();
  }, [column.blocks]);

  const settings = column.settings || {};

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'relative min-h-[100px] border-2 transition-all rounded-lg',
        isSelected
          ? 'border-primary-500 shadow-lg'
          : isOver
          ? 'border-primary-300 dark:border-primary-600 bg-primary-50/50 dark:bg-primary-900/10'
          : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600',
        isHovered && 'bg-gray-50/50 dark:bg-gray-800/50'
      )}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: settings.backgroundColor || 'transparent',
        padding: settings.padding
          ? `${settings.padding.top || 0}px ${settings.padding.right || 0}px ${settings.padding.bottom || 0}px ${settings.padding.left || 0}px`
          : '16px',
        margin: settings.margin
          ? `${settings.margin.top || 0}px ${settings.margin.right || 0}px ${settings.margin.bottom || 0}px ${settings.margin.left || 0}px`
          : '0',
      }}
    >
      {/* Column Header */}
      {(isHovered || isSelected) && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-gray-800 text-white px-2 py-1 flex items-center justify-between text-xs rounded-t-lg">
          <div className="flex items-center gap-1">
            <GripVertical className="w-3 h-3" />
            <span>Kolon {index + 1}</span>
          </div>
          <span className="text-gray-400">{Math.round(column.width || 0)}%</span>
        </div>
      )}

      {/* Blocks */}
      <div className="space-y-2 pt-8">
        {loading ? (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
            Yükleniyor...
          </div>
        ) : blocks.length > 0 ? (
          blocks.map((block, blockIndex) => (
            <BlockEditor
              key={block.id}
              block={block}
              index={blockIndex}
              isSelected={false} // TODO: selectedElement kontrolü
              onSelect={() => {
                // Block seçme
              }}
            />
          ))
        ) : (
          <EmptyColumn />
        )}
      </div>
    </div>
  );
}

function EmptyColumn() {
  return (
    <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
        Buraya blok sürükleyin
      </p>
      <div className="flex items-center justify-center gap-1 text-gray-300 dark:text-gray-600">
        <Plus className="w-3 h-3" />
        <span className="text-xs">Blok ekle</span>
      </div>
    </div>
  );
}

