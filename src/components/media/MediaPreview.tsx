'use client';

// ============================================
// Page Builder - Media Preview Component
// Lightbox önizleme
// ============================================
import Image from 'next/image';
import { X } from 'lucide-react';
import type { Media } from '@/types/media';

interface MediaPreviewProps {
  item: Media;
  onClose: () => void;
}

export function MediaPreview({ item, onClose }: MediaPreviewProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="max-w-7xl max-h-full" onClick={(e) => e.stopPropagation()}>
        {item.type === 'image' ? (
          <Image
            src={item.url}
            alt={item.alt || item.name}
            width={item.dimensions?.width || 1200}
            height={item.dimensions?.height || 800}
            className="max-w-full max-h-[90vh] object-contain"
            style={{
              width: 'auto',
              height: 'auto',
            }}
          />
        ) : (
          <video
            src={item.url}
            controls
            className="max-w-full max-h-[90vh]"
            autoPlay
          />
        )}

        <div className="mt-4 text-center text-white">
          <h3 className="text-lg font-medium">{item.name}</h3>
          <p className="text-sm text-gray-300 mt-1">
            {item.dimensions && `${item.dimensions.width} × ${item.dimensions.height}`}
          </p>
        </div>
      </div>
    </div>
  );
}
