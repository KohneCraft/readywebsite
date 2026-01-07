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
