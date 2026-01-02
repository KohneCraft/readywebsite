'use client';

// ============================================
// Vav Yapı - Block Editor
// Block düzenleme componenti - önizleme gösterir
// ============================================

import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { GripVertical, Settings, Copy, Trash2 } from 'lucide-react';
import { BlockRenderer } from '@/components/pageBuilder/renderers/BlockRenderer';
import { cn } from '@/lib/utils';
import type { Block } from '@/types/pageBuilder';

interface BlockEditorProps {
  block: Block;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

export function BlockEditor({
  block,
  index,
  isSelected,
  onSelect,
}: BlockEditorProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: block.id,
    data: {
      type: 'block',
      id: block.id,
      source: 'canvas',
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'relative group border-2 transition-all rounded-lg',
        isSelected
          ? 'border-primary-500 shadow-lg'
          : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600',
        isDragging && 'opacity-50'
      )}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              title="Kopyala"
              onClick={(e) => {
                e.stopPropagation();
                // Kopyalama işlemi
              }}
            >
              <Copy className="w-3 h-3" />
            </button>
            <button
              className="p-1 hover:bg-red-600 rounded transition-colors"
              title="Sil"
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('Bu bloğu silmek istediğinizden emin misiniz?')) {
                  // Silme işlemi
                }
              }}
            >
              <Trash2 className="w-3 h-3" />
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

