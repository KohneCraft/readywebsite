'use client';

// ============================================
// Page Builder - Media Uploader Component
// Drag & drop destekli dosya yükleme
// Bandwidth tasarrufu için boyut limitleri
// ============================================

import { useRef, useState, useCallback } from 'react';
import { Upload, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FILE_SIZE_LIMITS } from '@/lib/firebase/storage';

interface MediaUploaderTranslations {
  dragDropShort: string;
  supportedFormatsImage: string;
  supportedFormatsVideo: string;
  maxFileSize?: string;
  optimizationTip?: string;
  maxSizeLabel?: string;
  recommendedLabel?: string;
  webpTip?: string;
  compressedVideoTip?: string;
}

interface MediaUploaderProps {
  accept: string;
  onUpload: (files: File[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  translations?: MediaUploaderTranslations;
  showLimits?: boolean;
}

export function MediaUploader({
  accept,
  onUpload,
  multiple = true,
  disabled = false,
  translations,
  showLimits = true,
}: MediaUploaderProps) {
  // Dosya tipi belirleme
  const isImage = accept === 'image/*' || accept.includes('image');
  const isVideo = accept === 'video/*' || accept.includes('video');
  
  // Boyut limitleri
  const limits = isVideo ? FILE_SIZE_LIMITS.video : FILE_SIZE_LIMITS.image;

  // Default translations
  const t = translations || {
    dragDropShort: 'Dosya sürükleyin veya tıklayın',
    supportedFormatsImage: 'Desteklenen formatlar: JPG, PNG, WebP, GIF, SVG',
    supportedFormatsVideo: 'Desteklenen formatlar: MP4, WebM, MOV',
    maxFileSize: `Maksimum: ${limits.max}MB`,
    optimizationTip: isImage 
      ? 'Daha hızlı yükleme için WebP formatı önerilir'
      : 'Daha hızlı yükleme için görseli sıkıştırın',
    maxSizeLabel: `Maks: ${limits.max}MB`,
    recommendedLabel: `Önerilen: ${limits.recommended}MB altı`,
    webpTip: 'WebP formatı bandwidth tasarrufu sağlar',
    compressedVideoTip: 'Sıkıştırılmış videolar önerilir',
  };

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onUpload(files);
    }
  }, [disabled, onUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onUpload(files);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [disabled, onUpload]);

  const handleClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  return (
    <div className="media-uploader">
      <div
        className={cn(
          'upload-zone',
          isDragging && 'dragging',
          disabled && 'disabled'
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <Upload className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
          {t.dragDropShort}
        </p>
        <small className="text-gray-500 dark:text-gray-400 text-sm block">
          {isImage ? t.supportedFormatsImage : t.supportedFormatsVideo}
        </small>
        
        {/* Boyut limitleri ve optimizasyon ipuçları */}
        {showLimits && (
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-center gap-1 text-xs text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-3 h-3" />
              <span>{t.maxSizeLabel} | {t.recommendedLabel}</span>
            </div>
            <div className="flex items-center justify-center gap-1 text-xs text-blue-500 dark:text-blue-400">
              <Info className="w-3 h-3" />
              <span>{isImage ? t.webpTip : t.compressedVideoTip}</span>
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        disabled={disabled}
        className="hidden"
      />
    </div>
  );
}

