'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  GripVertical, 
  Eye, 
  EyeOff, 
  Settings,
  Trash2,
  Image,
  FileText,
  Video,
  MapPin,
  Images,
  PanelRight,
  MousePointerClick,
  LayoutGrid,
  Star,
  MessageSquare,
  Mail,
  Box,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PageElement, ElementType } from '@/types';

interface DraggableElementProps {
  element: PageElement;
  onToggleVisibility: (id: string) => void;
  onOpenSettings: (element: PageElement) => void;
  onDelete: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (element: PageElement) => void;
}

const ELEMENT_ICONS: Record<ElementType, typeof Image> = {
  'hero': Image,
  'description': FileText,
  'video': Video,
  'map': MapPin,
  'gallery': Images,
  'sidebar': PanelRight,
  'cta': MousePointerClick,
  'info-cards': LayoutGrid,
  'features': Star,
  'testimonials': MessageSquare,
  'contact-form': Mail,
  'custom': Box,
};

export function DraggableElement({
  element,
  onToggleVisibility,
  onOpenSettings,
  onDelete,
  isSelected,
  onSelect,
}: DraggableElementProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Icon = ELEMENT_ICONS[element.type] || Box;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group bg-white dark:bg-gray-800 rounded-xl border-2 transition-all duration-200',
        isDragging 
          ? 'shadow-2xl border-primary-500 scale-105 z-50' 
          : 'shadow-sm border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600',
        !element.visible && 'opacity-50',
        isSelected && 'ring-2 ring-primary-500 border-primary-500'
      )}
      onClick={() => onSelect?.(element)}
    >
      <div className="flex items-center gap-3 p-4">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="touch-none cursor-grab active:cursor-grabbing p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Sürükle"
        >
          <GripVertical className="w-5 h-5 text-gray-400" />
        </button>

        {/* Icon */}
        <div className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center',
          element.visible 
            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
        )}>
          <Icon className="w-5 h-5" />
        </div>

        {/* Label */}
        <div className="flex-1 min-w-0">
          <h4 className={cn(
            'font-medium truncate',
            element.visible 
              ? 'text-gray-900 dark:text-white' 
              : 'text-gray-500 dark:text-gray-400'
          )}>
            {element.label}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {element.settings.width === 'full' ? 'Tam genişlik' :
             element.settings.width === 'half' ? 'Yarım' :
             element.settings.width === 'third' ? '1/3' :
             element.settings.width === 'two-thirds' ? '2/3' :
             element.settings.width === 'quarter' ? '1/4' : 
             element.settings.width === 'three-quarters' ? '3/4' : 'Özel'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleVisibility(element.id);
            }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={element.visible ? 'Gizle' : 'Göster'}
          >
            {element.visible ? (
              <Eye className="w-4 h-4 text-gray-500" />
            ) : (
              <EyeOff className="w-4 h-4 text-gray-400" />
            )}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenSettings(element);
            }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Ayarlar"
          >
            <Settings className="w-4 h-4 text-gray-500" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(element.id);
            }}
            className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            title="Sil"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

