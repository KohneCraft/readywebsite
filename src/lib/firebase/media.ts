// ============================================
// Page Builder - Media Management
// Firebase Storage ve Firestore işlemleri
// ============================================

import { logger } from '@/lib/logger';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  UploadResult,
} from 'firebase/storage';
import { db, storage } from './config';
import type {
  Media,
  MediaType,
  MediaUpdateInput,
  MediaDimensions,
  MediaSortBy,
} from '@/types/media';

const COLLECTIONS = {
  media: 'media',
} as const;

/**
 * Firestore Timestamp'i Date'e çevir
 */
function convertTimestamp(timestamp: Timestamp | Date | undefined): Date {
  if (!timestamp) return new Date();
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  return timestamp;
}

/**
 * Firestore doc'u Media'ya çevir
 */
function docToMedia(docSnap: any): Media | null {
  if (!docSnap.exists()) return null;
  const data = docSnap.data();
  return {
    id: docSnap.id,
    userId: data.userId || '',
    type: data.type || 'image',
    name: data.name || '',
    originalName: data.originalName || '',
    url: data.url || '',
    storagePath: data.storagePath || '',
    size: data.size || 0,
    dimensions: data.dimensions || null,
    mimeType: data.mimeType || '',
    uploadedAt: convertTimestamp(data.uploadedAt),
    tags: data.tags || [],
    alt: data.alt || '',
    thumbnail: data.thumbnail || undefined,
  };
}

/**
 * Görsel boyutlarını al
 */
function getImageDimensions(file: File): Promise<MediaDimensions | null> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
      URL.revokeObjectURL(url);
    };

    img.onerror = () => {
      resolve(null);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  });
}

/**
 * Dosya adını temizle
 */
function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
}

/**
 * Medya yükle
 */
export async function uploadMedia(
  file: File,
  type: MediaType,
  userId: string
): Promise<Media> {
  try {
    // Dosya adını temizle
    const timestamp = Date.now();
    const sanitizedName = sanitizeFileName(file.name);
    const fileName = `${timestamp}_${sanitizedName}`;

    // Storage path
    const storagePath = `media/${type}s/${userId}/${fileName}`;
    const storageRef = ref(storage, storagePath);

    // Cache-Control metadata (1 yıl cache - bandwidth tasarrufu için)
    const metadata = {
      contentType: file.type,
      cacheControl: 'public, max-age=31536000, immutable',
      customMetadata: {
        uploadedAt: new Date().toISOString(),
        originalName: file.name,
      },
    };

    // Dosyayı yükle (cache metadata ile)
    const uploadResult: UploadResult = await uploadBytes(storageRef, file, metadata);

    // Download URL al
    const downloadURL = await getDownloadURL(uploadResult.ref);

    // Dosya boyutlarını al (sadece image için)
    let dimensions: MediaDimensions | null = null;
    if (type === 'image') {
      dimensions = await getImageDimensions(file);
    }

    // Firestore'a metadata kaydet
    const mediaDoc = await addDoc(collection(db, COLLECTIONS.media), {
      userId,
      type,
      name: fileName,
      originalName: file.name,
      url: downloadURL,
      storagePath,
      size: file.size,
      dimensions,
      mimeType: file.type,
      uploadedAt: serverTimestamp(),
      tags: [],
      alt: '',
    });

    // Yüklenen medyayı döndür
    const docSnap = await getDoc(doc(db, COLLECTIONS.media, mediaDoc.id));
    const media = docToMedia(docSnap);
    if (!media) {
      throw new Error('Medya oluşturulamadı');
    }
    return media;
  } catch (error) {
    logger.storage.error('Upload error:', error);
    throw error;
  }
}

/**
 * Medya listesini getir
 */
export async function getMediaList(
  userId: string,
  type?: MediaType,
  sortBy: MediaSortBy = 'uploadedAt',
  sortOrder: 'asc' | 'desc' = 'desc'
): Promise<Media[]> {
  try {
    let q = query(
      collection(db, COLLECTIONS.media),
      where('userId', '==', userId)
    );

    // Tip filtresi
    if (type) {
      q = query(q, where('type', '==', type));
    }

    // Sıralama
    if (sortBy === 'uploadedAt') {
      q = query(q, orderBy('uploadedAt', sortOrder));
    } else if (sortBy === 'size') {
      q = query(q, orderBy('size', sortOrder));
    } else if (sortBy === 'name') {
      q = query(q, orderBy('name', sortOrder));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => docToMedia(docSnap)!).filter(Boolean);
  } catch (error) {
    logger.storage.error('Get media list error:', error);
    return [];
  }
}

/**
 * Medya getir (ID ile)
 */
export async function getMediaById(mediaId: string): Promise<Media | null> {
  try {
    const docSnap = await getDoc(doc(db, COLLECTIONS.media, mediaId));
    return docToMedia(docSnap);
  } catch (error) {
    logger.storage.error('Get media error:', error);
    return null;
  }
}

/**
 * Medya güncelle
 */
export async function updateMedia(
  mediaId: string,
  input: MediaUpdateInput
): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTIONS.media, mediaId), {
      ...input,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    logger.storage.error('Update media error:', error);
    throw error;
  }
}

/**
 * Medya sil
 */
export async function deleteMedia(mediaId: string): Promise<void> {
  try {
    // Firestore'dan metadata al
    const mediaDoc = await getDoc(doc(db, COLLECTIONS.media, mediaId));

    if (!mediaDoc.exists()) {
      throw new Error('Medya bulunamadı');
    }

    const mediaData = mediaDoc.data();

    // Storage'dan dosyayı sil
    if (mediaData.storagePath) {
      try {
        const storageRef = ref(storage, mediaData.storagePath);
        await deleteObject(storageRef);
      } catch (storageError) {
        logger.storage.warn('Storage silme hatası (devam ediliyor):', storageError);
      }
    }

    // Thumbnail varsa onu da sil
    if (mediaData.thumbnail) {
      try {
        const thumbnailRef = ref(storage, mediaData.thumbnail);
        await deleteObject(thumbnailRef);
      } catch (thumbnailError) {
        logger.storage.warn('Thumbnail silme hatası (devam ediliyor):', thumbnailError);
      }
    }

    // Firestore'dan metadata'yı sil
    await deleteDoc(doc(db, COLLECTIONS.media, mediaId));
  } catch (error) {
    logger.storage.error('Delete media error:', error);
    throw error;
  }
}

/**
 * Çoklu medya sil
 */
export async function deleteMultipleMedia(mediaIds: string[]): Promise<void> {
  const errors: Array<{ id: string; error: string }> = [];

  for (const mediaId of mediaIds) {
    try {
      await deleteMedia(mediaId);
    } catch (error) {
      errors.push({
        id: mediaId,
        error: error instanceof Error ? error.message : 'Bilinmeyen hata',
      });
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `${errors.length} medya silinirken hata oluştu: ${errors.map((e) => e.id).join(', ')}`
    );
  }
}

