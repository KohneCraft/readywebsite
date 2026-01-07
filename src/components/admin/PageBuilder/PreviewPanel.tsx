'use client';

import { useState } from 'react';
import { Monitor, Tablet, Smartphone, Maximize2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PageElement, ElementWidth, Breakpoint } from '@/types';

interface PreviewPanelProps {
  elements: PageElement[];
  pageType: string;
}

const BREAKPOINT_WIDTHS: Record<Breakpoint, number> = {
  mobile: 375,
  tablet: 768,
  desktop: 1280,
};

function getWidthClass(width: ElementWidth): string {
  switch (width) {
    case 'full': return 'w-full';
    case 'three-quarters': return 'w-3/4';
    case 'two-thirds': return 'w-2/3';
    case 'half': return 'w-1/2';
    case 'third': return 'w-1/3';
    case 'quarter': return 'w-1/4';
    default: return 'w-full';
  }
}

function ElementPreview({ element, breakpoint }: { element: PageElement; breakpoint: Breakpoint }) {
  const responsiveSettings = element.settings.responsive[breakpoint];
  
  if (!element.visible || !responsiveSettings.visible) {
    return null;
  }

  const widthClass = getWidthClass(responsiveSettings.width);
  const { margin, padding, borderRadius, shadow } = element.settings;

  const shadowClass = {
    'none': '',
    'sm': 'shadow-sm',
    'md': 'shadow-md',
    'lg': 'shadow-lg',
    'xl': 'shadow-xl',
  }[shadow || 'none'];

  return (
    <div
      className={cn('flex-shrink-0', widthClass)}
      style={{
        order: responsiveSettings.order,
        marginTop: margin.top,
        marginRight: margin.right,
        marginBottom: margin.bottom,
        marginLeft: margin.left,
      }}
    >
      <div
        className={cn(
          'bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center min-h-[80px] text-gray-500 dark:text-gray-400 text-sm font-medium',
          shadowClass
        )}
        style={{
          paddingTop: padding.top || 16,
          paddingRight: padding.right || 16,
          paddingBottom: padding.bottom || 16,
          paddingLeft: padding.left || 16,
          borderRadius: borderRadius || 8,
        }}
      >
        {element.label}
      </div>
    </div>
  );
}

export function PreviewPanel({ elements, pageType }: PreviewPanelProps) {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const sortedElements = [...elements].sort((a, b) => {
    const orderA = a.settings.responsive[breakpoint].order;
    const orderB = b.settings.responsive[breakpoint].order;
    if (orderA !== orderB) return orderA - orderB;
    return a.order - b.order;
  });

  const previewWidth = BREAKPOINT_WIDTHS[breakpoint];

  const PreviewContent = () => (
    <div
      className={cn(
        'bg-white dark:bg-gray-900 mx-auto transition-all duration-300 rounded-lg shadow-lg overflow-hidden',
        isFullscreen ? 'w-full h-full' : ''
      )}
      style={{ 
        width: isFullscreen ? '100%' : previewWidth,
        minHeight: isFullscreen ? '100%' : 500,
      }}
    >
      {/* Preview Header */}
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white dark:bg-gray-700 rounded-md px-4 py-1 text-xs text-gray-500 dark:text-gray-400">
            {pageType === 'project-detail' ? 'vavyapi.com/projeler/ornek-proje' : 'vavyapi.com'}
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-4">
        <div className="flex flex-wrap gap-4">
          {sortedElements.map((element) => (
            <ElementPreview 
              key={element.id} 
              element={element} 
              breakpoint={breakpoint}
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-100 dark:bg-gray-900 p-4">
        {/* Fullscreen Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-md">
            {([
              { key: 'desktop' as Breakpoint, icon: Monitor, label: 'Masaüstü' },
              { key: 'tablet' as Breakpoint, icon: Tablet, label: 'Tablet' },
              { key: 'mobile' as Breakpoint, icon: Smartphone, label: 'Mobil' },
            ]).map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setBreakpoint(key)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  breakpoint === key
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
                title={label}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsFullscreen(false)}
            className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Fullscreen Content */}
        <div className="h-[calc(100vh-100px)] overflow-auto flex items-start justify-center py-8">
          <PreviewContent />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Önizleme
        </h3>

        <div className="flex items-center gap-2">
          {/* Breakpoint Selector */}
          <div className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            {([
              { key: 'desktop' as Breakpoint, icon: Monitor },
              { key: 'tablet' as Breakpoint, icon: Tablet },
              { key: 'mobile' as Breakpoint, icon: Smartphone },
            ]).map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setBreakpoint(key)}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  breakpoint === key
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Tam ekran"
          >
            <Maximize2 className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="overflow-x-auto pb-4">
        <PreviewContent />
      </div>
    </div>
  );
}

