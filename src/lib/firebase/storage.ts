// ============================================
// Page Builder - Firebase Storage Helper Functions
// Image upload, delete, and URL management
// ============================================

import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  UploadMetadata,
  UploadTaskSnapshot,
} from 'firebase/storage';
import { storage } from './config';
import type { UploadResult } from '@/types';

// ============================================
// STORAGE PATHS
// ============================================

export const STORAGE_PATHS = {
  logos: 'logos',
  settings: 'settings',
  temp: (userId: string) => `temp/${userId}`,
  pageBuilder: (pageId: string) => `page-builder/${pageId}`,
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Unique dosya adı oluştur
 */
function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop()?.toLowerCase() || 'jpg';
  return `${timestamp}-${randomStr}.${extension}`;
}

/**
 * Content type belirle
 */
function getContentType(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase();
  const types: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    ico: 'image/x-icon',
  };
  return types[extension || ''] || 'application/octet-stream';
}

// ============================================
// UPLOAD FUNCTIONS
// ============================================

/**
 * Tek dosya yükle
 */
export async function uploadFile(
  file: File | Blob,
  path: string,
  fileName?: string
): Promise<UploadResult> {
  const name = fileName || (file instanceof File ? generateFileName(file.name) : generateFileName('image.jpg'));
  const fullPath = `${path}/${name}`;
  const storageRef = ref(storage, fullPath);
  
  const metadata: UploadMetadata = {
    contentType: file instanceof File ? file.type : getContentType(name),
    cacheControl: 'public, max-age=31536000, immutable',
    customMetadata: {
      uploadedAt: new Date().toISOString(),
    },
  };

  const snapshot = await uploadBytes(storageRef, file, metadata);
  const url = await getDownloadURL(snapshot.ref);

  return {
    url,
    path: fullPath,
    filename: name,
    size: snapshot.metadata.size || 0,
    contentType: snapshot.metadata.contentType || '',
  };
}

/**
 * Progress callback ile dosya yükle
 */
export function uploadFileWithProgress(
  file: File | Blob,
  path: string,
  onProgress: (progress: number) => void,
  fileName?: string
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const name = fileName || (file instanceof File ? generateFileName(file.name) : generateFileName('image.jpg'));
    const fullPath = `${path}/${name}`;
    const storageRef = ref(storage, fullPath);
    
    const metadata: UploadMetadata = {
      contentType: file instanceof File ? file.type : getContentType(name),
      cacheControl: 'public, max-age=31536000, immutable',
    };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      'state_changed',
      (snapshot: UploadTaskSnapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          url,
          path: fullPath,
          filename: name,
          size: uploadTask.snapshot.metadata.size || 0,
          contentType: uploadTask.snapshot.metadata.contentType || '',
        });
      }
    );
  });
}


// ============================================
// LOGO FUNCTIONS
// ============================================

/**
 * Site logosu yükle
 */
export async function uploadLogo(
  file: File | Blob,
  type: 'light' | 'dark' | 'mobile' | 'favicon'
): Promise<UploadResult> {
  const extension = type === 'favicon' ? 'ico' : 
    (file instanceof File ? file.name.split('.').pop() : 'svg');
  const fileName = `${type}.${extension}`;
  
  return uploadFile(file, STORAGE_PATHS.logos, fileName);
}

// ============================================
// DELETE FUNCTIONS
// ============================================

/**
 * Tek dosya sil
 */
export async function deleteFile(path: string): Promise<void> {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
}


/**
 * Temp klasörünü temizle
 */
export async function clearTempFolder(userId: string): Promise<void> {
  try {
    const tempRef = ref(storage, STORAGE_PATHS.temp(userId));
    const tempList = await listAll(tempRef);
    await Promise.all(tempList.items.map(item => deleteObject(item)));
  } catch {
    // Temp klasörü yoksa devam et
  }
}

// ============================================
// URL FUNCTIONS
// ============================================

/**
 * Storage path'ten download URL al
 */
export async function getFileUrl(path: string): Promise<string> {
  const storageRef = ref(storage, path);
  return getDownloadURL(storageRef);
}

/**
 * Klasördeki tüm dosyaların URL'lerini al
 */
export async function getFolderUrls(
  folderPath: string
): Promise<Array<{ path: string; url: string }>> {
  const folderRef = ref(storage, folderPath);
  const list = await listAll(folderRef);
  
  return Promise.all(
    list.items.map(async (item) => ({
      path: item.fullPath,
      url: await getDownloadURL(item),
    }))
  );
}

// ============================================
// VALIDATION
// ============================================

/**
 * Dosya boyutu kontrolü (MB cinsinden)
 */
export function isValidFileSize(file: File | Blob, maxSizeMB: number = 5): boolean {
  return file.size <= maxSizeMB * 1024 * 1024;
}

/**
 * Dosya tipi kontrolü
 */
export function isValidImageType(file: File | Blob): boolean {
  const validTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
  ];
  
  const type = file instanceof File ? file.type : '';
  return validTypes.includes(type);
}

/**
 * Favicon tipi kontrolü
 */
export function isValidFaviconType(file: File | Blob): boolean {
  const validTypes = ['image/x-icon', 'image/png', 'image/ico'];
  const type = file instanceof File ? file.type : '';
  return validTypes.includes(type);
}

/**
 * Genel dosya validasyonu
 */
export function validateImageFile(
  file: File | Blob,
  options: { maxSizeMB?: number; allowFavicon?: boolean } = {}
): { valid: boolean; error?: string } {
  const { maxSizeMB = 5, allowFavicon = false } = options;

  if (!isValidFileSize(file, maxSizeMB)) {
    return {
      valid: false,
      error: `Dosya boyutu ${maxSizeMB}MB'dan küçük olmalıdır`,
    };
  }

  const isValid = allowFavicon
    ? isValidImageType(file) || isValidFaviconType(file)
    : isValidImageType(file);

  if (!isValid) {
    return {
      valid: false,
      error: 'Geçersiz dosya formatı. JPG, PNG, WebP veya SVG kullanın.',
    };
  }

  return { valid: true };
}

// ============================================
// MEDYA LİMİTLERİ VE SABİTLERİ
// Bandwidth tasarrufu için sıkı limitler
// ============================================

/**
 * Maksimum dosya boyutları (MB cinsinden)
 * Bu limitler kesin, aşılamaz!
 */
export const FILE_SIZE_LIMITS = {
  // Görseller
  image: {
    max: 2,          // 2MB - Maksimum görsel boyutu
    recommended: 0.5, // 500KB - Önerilen
    warning: 1,      // 1MB - Uyarı eşiği
  },
  // Videolar
  video: {
    max: 50,         // 50MB - Maksimum video boyutu
    recommended: 20, // 20MB - Önerilen
    warning: 30,     // 30MB - Uyarı eşiği
  },
  // Logo/Favicon
  logo: {
    max: 0.5,        // 500KB - Logo maksimum
    recommended: 0.1, // 100KB - Önerilen
    warning: 0.2,    // 200KB - Uyarı
  },
  // Favicon
  favicon: {
    max: 0.1,        // 100KB
    recommended: 0.02, // 20KB
    warning: 0.05,   // 50KB
  },
} as const;

/**
 * Önerilen görsel boyutları (KB)
 * Bu değerlerin altında tutmaya çalışın
 */
export const RECOMMENDED_SIZES = {
  thumbnail: 50,   // 50KB - küçük önizleme
  small: 100,      // 100KB - liste görünümü
  medium: 300,     // 300KB - kart görünümü
  large: 500,      // 500KB - tam ekran
  hero: 800,       // 800KB - hero banner
} as const;

/**
 * Desteklenen dosya formatları
 */
export const SUPPORTED_FORMATS = {
  image: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],
  video: ['video/mp4', 'video/webm', 'video/quicktime'],
  logo: ['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp'],
  favicon: ['image/x-icon', 'image/png', 'image/ico', 'image/svg+xml'],
} as const;

/**
 * Bandwidth tasarrufu ipuçları
 */
export const OPTIMIZATION_TIPS = {
  tr: {
    useWebP: 'WebP formatı kullanın - %25-50 daha küçük',
    compressFirst: 'Yüklemeden önce görseli sıkıştırın',
    rightSize: 'Görseli kullanılacak boyutta yükleyin',
    avoidLarge: 'Gereksiz büyük görseller bandwidth maliyetini artırır',
    useThumbnail: 'Listelerde küçük resim (thumbnail) kullanın',
  },
  en: {
    useWebP: 'Use WebP format - 25-50% smaller',
    compressFirst: 'Compress image before uploading',
    rightSize: 'Upload image at the size it will be used',
    avoidLarge: 'Unnecessarily large images increase bandwidth costs',
    useThumbnail: 'Use thumbnails in lists',
  },
} as const;

// ============================================
// VALIDASYON FONKSİYONLARI
// ============================================

export type FileCategory = 'image' | 'video' | 'logo' | 'favicon';

export interface ValidationResult {
  valid: boolean;
  error?: string;
  warning?: string;
  sizeKB: number;
  sizeMB: number;
  maxMB: number;
  recommendedMB: number;
}

/**
 * Kapsamlı dosya validasyonu
 * Hem format hem boyut kontrolü yapar
 */
export function validateFile(
  file: File | Blob,
  category: FileCategory = 'image',
  locale: 'tr' | 'en' = 'tr'
): ValidationResult {
  const sizeBytes = file.size;
  const sizeKB = Math.round(sizeBytes / 1024);
  const sizeMB = sizeBytes / (1024 * 1024);
  
  const limits = FILE_SIZE_LIMITS[category];
  const formats = SUPPORTED_FORMATS[category];
  const mimeType = file instanceof File ? file.type : '';
  
  const result: ValidationResult = {
    valid: true,
    sizeKB,
    sizeMB: Math.round(sizeMB * 100) / 100,
    maxMB: limits.max,
    recommendedMB: limits.recommended,
  };
  
  // Format kontrolü
  if (mimeType && !(formats as readonly string[]).includes(mimeType)) {
    result.valid = false;
    result.error = locale === 'tr'
      ? `Geçersiz format. Desteklenen: ${formats.map(f => f.split('/')[1]).join(', ')}`
      : `Invalid format. Supported: ${formats.map(f => f.split('/')[1]).join(', ')}`;
    return result;
  }
  
  // Boyut kontrolü - kesin limit
  if (sizeMB > limits.max) {
    result.valid = false;
    result.error = locale === 'tr'
      ? `Dosya çok büyük (${result.sizeMB}MB). Maksimum: ${limits.max}MB`
      : `File too large (${result.sizeMB}MB). Maximum: ${limits.max}MB`;
    return result;
  }
  
  // Uyarı eşiği
  if (sizeMB > limits.warning) {
    result.warning = locale === 'tr'
      ? `Dosya büyük (${result.sizeMB}MB). Önerilen: ${limits.recommended}MB altı. Bandwidth maliyetini artırabilir.`
      : `File is large (${result.sizeMB}MB). Recommended: under ${limits.recommended}MB. May increase bandwidth costs.`;
  } else if (sizeMB > limits.recommended) {
    result.warning = locale === 'tr'
      ? `Dosya optimize edilebilir (${result.sizeMB}MB → ${limits.recommended}MB önerilir)`
      : `File can be optimized (${result.sizeMB}MB → ${limits.recommended}MB recommended)`;
  }
  
  return result;
}

/**
 * Görsel boyutu uyarısı
 */
export function checkImageSize(
  sizeBytes: number,
  type: keyof typeof RECOMMENDED_SIZES = 'medium'
): { ok: boolean; message?: string } {
  const recommendedKB = RECOMMENDED_SIZES[type];
  const actualKB = Math.round(sizeBytes / 1024);
  
  if (actualKB > recommendedKB * 2) {
    return {
      ok: false,
      message: `Görsel çok büyük (${actualKB}KB). Önerilen: ${recommendedKB}KB altı. Bandwidth maliyetini artırır.`,
    };
  }
  
  if (actualKB > recommendedKB) {
    return {
      ok: true,
      message: `Görsel optimize edilebilir (${actualKB}KB). Önerilen: ${recommendedKB}KB altı.`,
    };
  }
  
  return { ok: true };
}

/**
 * İnsan okunabilir boyut formatı
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
