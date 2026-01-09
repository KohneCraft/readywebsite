'use client';

// ============================================
// Page Builder - Media Uploader Component
// Drag & drop destekli dosya yükleme
// ============================================

import { useRef, useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaUploaderProps {
  accept: string;
  onUpload: (files: File[]) => void;
  multiple?: boolean;
  disabled?: boolean;
}

export function MediaUploader({
  accept,
  onUpload,
  multiple = true,
  disabled = false,
}: MediaUploaderProps) {
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
          Dosya sürükleyin veya tıklayın
        </p>
        <small className="text-gray-500 dark:text-gray-400 text-sm">
          {accept === 'image/*' 
            ? 'Desteklenen formatlar: JPG, PNG, WebP, GIF, SVG'
            : 'Desteklenen formatlar: MP4, WebM, MOV'}
        </small>
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

