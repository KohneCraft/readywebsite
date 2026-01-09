'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import { useHistory } from '@/hooks/useHistory';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { 
  Save, 
  RotateCcw, 
  Plus,
  Undo2,
  Redo2,
  Eye,
} from 'lucide-react';
import { DraggableElement } from './DraggableElement';
import { ElementSettings } from './ElementSettings';
import { PreviewPanel } from './PreviewPanel';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/lib/utils';
import type { PageElement, PageLayout, ElementType, PageType } from '@/types';
import { DEFAULT_ELEMENT_SETTINGS, ELEMENT_TYPE_LABELS } from '@/types';

interface PageBuilderProps {
  layout: PageLayout;
  onSave: (elements: PageElement[]) => Promise<void>;
  onReset: () => void;
}

export function PageBuilder({ layout, onSave, onReset }: PageBuilderProps) {
  const { present: elements, set: setElements, undo, redo, canUndo, canRedo, reset: resetHistory } = useHistory<PageElement[]>(layout.elements, { maxHistory: 50 });
  const [selectedElement, setSelectedElement] = useState<PageElement | null>(null);
  const [settingsElement, setSettingsElement] = useState<PageElement | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Sürükle-bırak
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = elements.findIndex((item) => item.id === active.id);
      const newIndex = elements.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(elements, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index,
      }));
      setElements(newItems);
    }
  };

  // Element işlemleri
  const toggleVisibility = (id: string) => {
    const newElements = elements.map((el) =>
      el.id === id ? { ...el, visible: !el.visible } : el
    );
    setElements(newElements);
  };

  const updateElement = (updatedElement: PageElement) => {
    const newElements = elements.map((el) =>
      el.id === updatedElement.id ? updatedElement : el
    );
    setElements(newElements);
    setSelectedElement(updatedElement);
  };

  const deleteElement = (id: string) => {
    const newElements = elements.filter((el) => el.id !== id);
    setElements(newElements);
    if (selectedElement?.id === id) {
      setSelectedElement(null);
    }
  };

  const addElement = (type: ElementType) => {
    const newElement: PageElement = {
      id: `element-${Date.now()}`,
      type,
      label: ELEMENT_TYPE_LABELS[type],
      order: elements.length,
      visible: true,
      settings: { ...DEFAULT_ELEMENT_SETTINGS },
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
  };

  // Kaydet
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(elements);
    } finally {
      setIsSaving(false);
    }
  };

  // Sıfırla
  const handleReset = () => {
    if (confirm('Tüm değişiklikler kaybolacak. Devam etmek istiyor musunuz?')) {
      resetHistory(layout.elements);
      onReset();
    }
  };

  const hasChanges = JSON.stringify(elements) !== JSON.stringify(layout.elements);

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {layout.name}
          </h2>
          {hasChanges && (
            <span className="px-2 py-0.5 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full">
              Kaydedilmemiş değişiklikler
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Undo/Redo */}
          <button
            onClick={undo}
            disabled={!canUndo}
            className={cn(
              'p-2 rounded-lg transition-colors',
              canUndo 
                ? 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400' 
                : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
            )}
            title="Geri Al (Ctrl+Z)"
          >
            <Undo2 className="w-5 h-5" />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className={cn(
              'p-2 rounded-lg transition-colors',
              canRedo 
                ? 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400' 
                : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
            )}
            title="İleri Al (Ctrl+Y)"
          >
            <Redo2 className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

          {/* Preview Toggle */}
          <Button
            variant={showPreview ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Önizleme
          </Button>

          {/* Reset */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={!hasChanges}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Sıfırla
          </Button>

          {/* Save */}
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            disabled={isSaving || !hasChanges}
          >
            {isSaving ? (
              <Spinner size="sm" className="mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Kaydet
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Elements List */}
        <div className={cn(
          'flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900',
          showPreview && 'w-1/2'
        )}>
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Sayfa Elementleri
              </h3>
              
              {/* Add Element Dropdown */}
              <div className="relative group">
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Element Ekle
                </Button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                  {(Object.keys(ELEMENT_TYPE_LABELS) as ElementType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => addElement(type)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {ELEMENT_TYPE_LABELS[type]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sortable List */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={elements.map((el) => el.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {elements
                    .sort((a, b) => a.order - b.order)
                    .map((element) => (
                      <DraggableElement
                        key={element.id}
                        element={element}
                        onToggleVisibility={toggleVisibility}
                        onOpenSettings={setSettingsElement}
                        onDelete={deleteElement}
                        isSelected={selectedElement?.id === element.id}
                        onSelect={setSelectedElement}
                      />
                    ))}
                </div>
              </SortableContext>
            </DndContext>

            {elements.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p>Henüz element eklenmemiş.</p>
                <p className="text-sm mt-1">Yukarıdaki &quot;Element Ekle&quot; butonunu kullanarak başlayın.</p>
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="w-1/2 border-l border-gray-200 dark:border-gray-700 overflow-y-auto p-6">
            <PreviewPanel elements={elements} pageType={layout.pageId as PageType} />
          </div>
        )}
      </div>

      {/* Element Settings Modal */}
      {settingsElement && (
        <ElementSettings
          element={settingsElement}
          onSave={updateElement}
          onClose={() => setSettingsElement(null)}
        />
      )}
    </div>
  );
}

