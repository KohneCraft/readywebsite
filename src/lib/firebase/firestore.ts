// ============================================
// Page Builder - Firestore Helper Functions
// CRUD operations for all collections
// ============================================

import { logger } from '@/lib/logger';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentSnapshot,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { unstable_cache } from 'next/cache';
import { db } from './config';
import type {
  SiteSettings,
  SiteSettingsUpdate,
  User,
  UserCreateInput,
  UserUpdateInput,
  PageLayout,
  PageLayoutCreateInput,
  PageLayoutUpdateInput,
  PageType,
  PageContent,
  PageContentCreateInput,
  PageContentUpdateInput,
  ContentSection,
} from '@/types';
import type { Locale } from '@/i18n';
import type {
  Page,
  Section,
  Column,
  Block,
  PageCreateInput,
  SectionCreateInput,
  ColumnCreateInput,
  BlockCreateInput,
  PageUpdateInput,
  SectionUpdateInput,
  ColumnUpdateInput,
  BlockUpdateInput,
} from '@/types/pageBuilder';
import type {
  ThemeMetadata,
  ThemeData,
  ThemePreview,
  ThemePageData,
} from '@/types/theme';
import type {
  Effect,
  EffectCreateInput,
  EffectUpdateInput,
} from '@/types/effects';
import { DEFAULT_SITE_SETTINGS, getDefaultElementsForPage } from '@/types';

// ============================================
// COLLECTION REFERENCES
// ============================================

const COLLECTIONS = {
  settings: 'settings',
  users: 'users',
  activityLogs: 'activityLogs',
  pageLayouts: 'pageLayouts',
  pageContents: 'pageContents',
  // Page Builder collections
  pages: 'pages',
  sections: 'sections',
  columns: 'columns',
  blocks: 'blocks',
  // Theme collections
  themes: 'themes',
  // Effects collection
  effects: 'effects',
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

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


// ============================================
// SETTINGS CRUD
// ============================================

const SITE_SETTINGS_DOC = 'site';

/**
 * Site ayarlarını getir (Client-side için cache'siz)
 */
export async function getSiteSettingsClient(): Promise<SiteSettings> {
  const docSnap = await getDoc(doc(db, COLLECTIONS.settings, SITE_SETTINGS_DOC));

  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      ...data,
      updatedAt: convertTimestamp(data.updatedAt),
    } as SiteSettings;
  }

  // Varsayılan ayarları döndür
  return DEFAULT_SITE_SETTINGS as SiteSettings;
}

/**
 * Site ayarlarını getir (Server-side için cached)
 */
export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    const docSnap = await getDoc(doc(db, COLLECTIONS.settings, SITE_SETTINGS_DOC));

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        updatedAt: convertTimestamp(data.updatedAt),
      } as SiteSettings;
    }

    // Varsayılan ayarları döndür
    return DEFAULT_SITE_SETTINGS as SiteSettings;
  },
  ['site-settings'],
  {
    revalidate: 3600, // 1 saat cache
    tags: ['settings']
  }
);

/**
 * Site ayarlarını güncelle
 */
export async function updateSiteSettings(
  input: SiteSettingsUpdate,
  userId: string
): Promise<void> {
  const docRef = doc(db, COLLECTIONS.settings, SITE_SETTINGS_DOC);
  const docSnap = await getDoc(docRef);

  // Doküman yoksa varsayılan ayarlarla oluştur, varsa güncelle
  if (!docSnap.exists()) {
    await setDoc(docRef, {
      ...DEFAULT_SITE_SETTINGS,
      ...input,
      updatedAt: serverTimestamp(),
      updatedBy: userId,
    }, { merge: true }); // merge: true ile doküman yoksa oluştur, varsa güncelle
  } else {
    await updateDoc(docRef, {
      ...input,
      updatedAt: serverTimestamp(),
      updatedBy: userId,
    });
  }

  // Site settings güncelleme eventi gönder (Header ve Footer için)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('site-settings-updated'));
  }
}

/**
 * Site ayarlarını başlat (ilk kurulum)
 */
export async function initializeSiteSettings(userId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.settings, SITE_SETTINGS_DOC);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      ...DEFAULT_SITE_SETTINGS,
      updatedAt: serverTimestamp(),
      updatedBy: userId,
    });
  }
}

// ============================================
// USER CRUD
// ============================================

/**
 * Document data'yı User'a çevir
 */
function docToUser(docSnap: DocumentSnapshot): User | null {
  const data = docSnap.data();
  if (!data) return null;

  return {
    ...data,
    id: docSnap.id,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
    lastLogin: convertTimestamp(data.lastLogin),
  } as unknown as User;
}

/**
 * Kullanıcı ID ile getir
 */
export async function getUserById(id: string): Promise<User | null> {
  const docSnap = await getDoc(doc(db, COLLECTIONS.users, id));
  return docToUser(docSnap);
}

/**
 * Yeni kullanıcı oluştur
 */
export async function createUser(input: UserCreateInput): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTIONS.users), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Kullanıcı güncelle
 */
export async function updateUser(id: string, input: UserUpdateInput): Promise<void> {
  const docRef = doc(db, COLLECTIONS.users, id);
  await updateDoc(docRef, {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Son giriş zamanını güncelle
 */
export async function updateLastLogin(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.users, id);
  await updateDoc(docRef, {
    lastLogin: serverTimestamp(),
  });
}

/**
 * Tüm kullanıcıları getir
 */
export async function getUsers(): Promise<User[]> {
  const snapshot = await getDocs(collection(db, COLLECTIONS.users));
  return snapshot.docs
    .map(docItem => docToUser(docItem))
    .filter((user): user is User => user !== null);
}

// ============================================
// PAGE LAYOUT FUNCTIONS
// ============================================

/**
 * Document data'yı PageLayout'a çevir
 */
function docToPageLayout(docSnap: DocumentSnapshot): PageLayout | null {
  const data = docSnap.data();
  if (!data) return null;

  return {
    ...data,
    id: docSnap.id,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
  } as PageLayout;
}

/**
 * Sayfa layout'u oluştur
 */
export async function createPageLayout(input: PageLayoutCreateInput): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTIONS.pageLayouts), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Sayfa layout'u ID ile getir
 */
export async function getPageLayoutById(id: string): Promise<PageLayout | null> {
  const docSnap = await getDoc(doc(db, COLLECTIONS.pageLayouts, id));
  return docToPageLayout(docSnap);
}

/**
 * Aktif sayfa layout'unu getir
 */
export async function getActivePageLayout(pageId: PageType): Promise<PageLayout | null> {
  const q = query(
    collection(db, COLLECTIONS.pageLayouts),
    where('pageId', '==', pageId),
    where('isActive', '==', true),
    limit(1)
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  return docToPageLayout(snapshot.docs[0]);
}

/**
 * Varsayılan layout'u getir veya oluştur
 */
export async function getOrCreateDefaultLayout(pageId: PageType, createdBy: string): Promise<PageLayout> {
  // Önce aktif layout'u kontrol et
  const activeLayout = await getActivePageLayout(pageId);
  if (activeLayout) {
    return activeLayout;
  }

  // Varsayılan layout'u kontrol et
  const q = query(
    collection(db, COLLECTIONS.pageLayouts),
    where('pageId', '==', pageId),
    where('isDefault', '==', true),
    limit(1)
  );

  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const layout = docToPageLayout(snapshot.docs[0]);
    if (layout) {
      // Varsayılan layout'u aktif yap
      await updatePageLayout(layout.id, { isActive: true });
      return layout;
    }
  }

  // Yeni varsayılan layout oluştur
  const defaultElements = getDefaultElementsForPage(pageId);

  const layoutId = await createPageLayout({
    pageId,
    name: `${pageId} - Varsayılan`,
    elements: defaultElements,
    createdBy,
    isDefault: true,
    isActive: true,
  });

  const newLayout = await getPageLayoutById(layoutId);
  if (!newLayout) {
    throw new Error('Layout oluşturulamadı');
  }

  return newLayout;
}

/**
 * Sayfa layout'u güncelle
 */
export async function updatePageLayout(id: string, input: PageLayoutUpdateInput): Promise<void> {
  const docRef = doc(db, COLLECTIONS.pageLayouts, id);
  await updateDoc(docRef, {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Sayfa layout'u sil
 */
export async function deletePageLayout(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.pageLayouts, id));
}

/**
 * Tüm sayfa layout'larını getir
 */
export async function getAllPageLayouts(): Promise<PageLayout[]> {
  const snapshot = await getDocs(collection(db, COLLECTIONS.pageLayouts));
  return snapshot.docs
    .map(docItem => docToPageLayout(docItem))
    .filter((layout): layout is PageLayout => layout !== null);
}

/**
 * Sayfa tipine göre layout'ları getir
 */
export async function getPageLayoutsByType(pageId: PageType): Promise<PageLayout[]> {
  const q = query(
    collection(db, COLLECTIONS.pageLayouts),
    where('pageId', '==', pageId),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(docItem => docToPageLayout(docItem))
    .filter((layout): layout is PageLayout => layout !== null);
}

/**
 * Aktif layout'u ayarla
 */
export async function setActivePageLayout(pageId: PageType, layoutId: string): Promise<void> {
  const batch = writeBatch(db);

  // Önce tüm layout'ları pasif yap
  const layouts = await getPageLayoutsByType(pageId);
  for (const layout of layouts) {
    if (layout.isActive) {
      batch.update(doc(db, COLLECTIONS.pageLayouts, layout.id), {
        isActive: false,
        updatedAt: serverTimestamp(),
      });
    }
  }

  // Yeni layout'u aktif yap
  batch.update(doc(db, COLLECTIONS.pageLayouts, layoutId), {
    isActive: true,
    updatedAt: serverTimestamp(),
  });

  await batch.commit();
}

/**
 * Layout'u varsayılana sıfırla
 */
export async function resetPageLayoutToDefault(pageId: PageType, createdBy: string): Promise<PageLayout> {
  // Mevcut layout'ları sil
  const layouts = await getPageLayoutsByType(pageId);
  const batch = writeBatch(db);

  for (const layout of layouts) {
    batch.delete(doc(db, COLLECTIONS.pageLayouts, layout.id));
  }

  await batch.commit();

  // Kısa bir bekleme süresi - Firebase'in silme işlemini tamamlaması için
  await new Promise(resolve => setTimeout(resolve, 100));

  // Varsayılan elementleri al ve yeni layout oluştur
  const defaultElements = getDefaultElementsForPage(pageId);

  const layoutId = await createPageLayout({
    pageId,
    name: `${pageId} - Varsayılan`,
    elements: defaultElements,
    createdBy,
    isDefault: true,
    isActive: true,
  });

  // Yeni layout'u oku
  const resetLayout = await getPageLayoutById(layoutId);
  if (!resetLayout) throw new Error('Layout oluşturulamadı');

  // Doğrulama: Oluşturulan layout'un elementleri doğru mu?
  if (!isValidLayoutForPage(resetLayout, pageId)) {
    throw new Error('Oluşturulan layout geçersiz elementler içeriyor');
  }

  return resetLayout;
}

// Layout doğrulama fonksiyonu
function isValidLayoutForPage(layout: PageLayout, pageId: PageType): boolean {
  // Basit doğrulama - gerçek uygulamada daha detaylı olabilir
  return layout.pageId === pageId && Array.isArray(layout.elements);
}

// ============================================
// PAGE CONTENT FUNCTIONS
// ============================================

/**
 * Document data'yı PageContent'e çevir
 */
function docToPageContent(docSnap: DocumentSnapshot): PageContent | null {
  const data = docSnap.data();
  if (!data) return null;

  return {
    ...data,
    id: docSnap.id,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
  } as PageContent;
}

/**
 * Sayfa içeriği oluştur
 */
export async function createPageContent(input: PageContentCreateInput): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTIONS.pageContents), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Sayfa içeriği ID ile getir
 */
export async function getPageContentById(id: string): Promise<PageContent | null> {
  const docSnap = await getDoc(doc(db, COLLECTIONS.pageContents, id));
  return docToPageContent(docSnap);
}

/**
 * Belirli bir element için sayfa içeriğini getir
 */
export async function getPageContent(
  pageId: PageType,
  elementId: string,
  locale: Locale
): Promise<PageContent | null> {
  const q = query(
    collection(db, COLLECTIONS.pageContents),
    where('pageId', '==', pageId),
    where('elementId', '==', elementId),
    where('locale', '==', locale),
    limit(1)
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  return docToPageContent(snapshot.docs[0]);
}

/**
 * Sayfa için tüm içerikleri getir
 */
export async function getPageContents(pageId: PageType, locale: Locale): Promise<PageContent[]> {
  const q = query(
    collection(db, COLLECTIONS.pageContents),
    where('pageId', '==', pageId),
    where('locale', '==', locale)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(docItem => docToPageContent(docItem))
    .filter((content): content is PageContent => content !== null);
}

/**
 * Sayfa içeriği güncelle veya oluştur (upsert)
 */
export async function upsertPageContent(
  pageId: PageType,
  elementId: string,
  elementType: string,
  locale: Locale,
  content: Partial<ContentSection>,
  createdBy: string
): Promise<string> {
  // Mevcut içeriği kontrol et
  const existing = await getPageContent(pageId, elementId, locale);

  if (existing) {
    // Güncelle
    const docRef = doc(db, COLLECTIONS.pageContents, existing.id);
    await updateDoc(docRef, {
      content: { ...existing.content, ...content },
      updatedAt: serverTimestamp(),
    });
    return existing.id;
  } else {
    // Yeni oluştur
    return createPageContent({
      pageId,
      elementId,
      elementType: elementType as PageContent['elementType'],
      locale,
      content: content as ContentSection,
      createdBy,
    });
  }
}

/**
 * Sayfa içeriği güncelle
 */
export async function updatePageContentById(
  id: string,
  input: PageContentUpdateInput
): Promise<void> {
  const docRef = doc(db, COLLECTIONS.pageContents, id);
  await updateDoc(docRef, {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Sayfa içeriği sil
 */
export async function deletePageContent(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.pageContents, id));
}

/**
 * Bir sayfanın tüm içeriklerini sil
 */
export async function deletePageContents(pageId: PageType): Promise<void> {
  const q = query(
    collection(db, COLLECTIONS.pageContents),
    where('pageId', '==', pageId)
  );

  const snapshot = await getDocs(q);
  const deleteBatch = writeBatch(db);

  snapshot.docs.forEach(docSnap => {
    deleteBatch.delete(docSnap.ref);
  });

  await deleteBatch.commit();
}

// ============================================
// PAGE BUILDER FUNCTIONS
// ============================================

/**
 * Helper: Convert Firestore document to Page
 */
function docToPage(docSnap: DocumentSnapshot): Page | null {
  const data = docSnap.data();
  if (!data) return null;

  return {
    ...data,
    id: docSnap.id,
    status: data.status || 'published', // Varsayılan status (geriye dönük uyumluluk)
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
    publishedAt: data.publishedAt ? convertTimestamp(data.publishedAt) : undefined,
  } as Page;
}

/**
 * Helper: Convert Firestore document to Section
 */
function docToSection(docSnap: DocumentSnapshot): Section | null {
  const data = docSnap.data();
  if (!data) return null;

  return {
    ...data,
    id: docSnap.id,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
  } as Section;
}

/**
 * Helper: Convert Firestore document to Column
 */
function docToColumn(docSnap: DocumentSnapshot): Column | null {
  const data = docSnap.data();
  if (!data) return null;

  return {
    ...data,
    id: docSnap.id,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
  } as Column;
}

/**
 * Helper: Convert Firestore document to Block
 */
function docToBlock(docSnap: DocumentSnapshot): Block | null {
  const data = docSnap.data();
  if (!data) return null;

  return {
    ...data,
    id: docSnap.id,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
  } as Block;
}

/**
 * Sayfa oluştur
 */
export async function createPage(input: PageCreateInput): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTIONS.pages), {
    ...input,
    sections: [],
    status: 'published', // Varsayılan olarak published (sayfa oluşturulur oluşturulmaz görünür)
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    publishedAt: serverTimestamp(), // Yayınlanma tarihi
  });

  return docRef.id;
}

/**
 * Sayfa ID ile getir
 */
export async function getPageById(id: string): Promise<Page | null> {
  const docSnap = await getDoc(doc(db, COLLECTIONS.pages, id));
  return docToPage(docSnap);
}

/**
 * Sayfa slug ile getir
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const q = query(
    collection(db, COLLECTIONS.pages),
    where('slug', '==', slug),
    limit(1)
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  return docToPage(snapshot.docs[0]);
}

/**
 * Tüm sayfaları getir
 */
/**
 * Tüm sayfaları getir (Client-side için cache'siz)
 */
export async function getAllPagesClient(): Promise<Page[]> {
  const snapshot = await getDocs(collection(db, COLLECTIONS.pages));
  return snapshot.docs
    .map(docItem => docToPage(docItem))
    .filter((page): page is Page => page !== null);
}

/**
 * Tüm sayfaları getir (Server-side için cache'li)
 */
export const getAllPages = unstable_cache(
  async (): Promise<Page[]> => {
    const snapshot = await getDocs(collection(db, COLLECTIONS.pages));
    return snapshot.docs
      .map(docItem => docToPage(docItem))
      .filter((page): page is Page => page !== null);
  },
  ['all-pages'],
  {
    revalidate: 3600, // 1 saat
    tags: ['pages']
  }
);

/**
 * Undefined değerleri temizle (Firestore undefined kabul etmez)
 */
function removeUndefined<T extends Record<string, any>>(obj: T): Partial<T> {
  const cleaned: Partial<T> = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== undefined) {
      // Nested object kontrolü (Date, Array, null hariç)
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        Object.prototype.toString.call(value) !== '[object Date]'
      ) {
        // Nested object - recursive temizle
        const cleanedNested = removeUndefined(value as Record<string, any>);
        if (Object.keys(cleanedNested).length > 0) {
          cleaned[key] = cleanedNested as T[Extract<keyof T, string>];
        }
      } else {
        cleaned[key] = value;
      }
    }
  }
  return cleaned;
}

/**
 * Sayfa güncelle
 */
export async function updatePage(id: string, input: PageUpdateInput): Promise<void> {
  const docRef = doc(db, COLLECTIONS.pages, id);
  // Undefined değerleri temizle
  const cleanedInput = removeUndefined(input);
  await updateDoc(docRef, {
    ...cleanedInput,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Sayfa sil
 */
export async function deletePage(id: string): Promise<void> {
  const page = await getPageById(id);
  if (!page) return;

  // Section'ları sil
  for (const sectionId of page.sections || []) {
    await deleteSection(sectionId);
  }

  // Sayfayı sil
  await deleteDoc(doc(db, COLLECTIONS.pages, id));
}

/**
 * Section oluştur
 */
export async function createSection(input: SectionCreateInput): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTIONS.sections), {
    ...input,
    columns: [],
    rowOrder: input.rowOrder ?? input.order ?? 0,
    columnOrder: input.columnOrder ?? 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // Page'e section ID'sini ekle (sadece pageId varsa)
  // Not: installTheme içinde toplu ekleme yapılıyor, burada sadece tek section eklerken kullanılır
  if (input.pageId) {
    try {
      const page = await getPageById(input.pageId);
      if (page) {
        await updatePage(input.pageId, {
          sections: [...(page.sections || []), docRef.id],
        });
      }
    } catch (error) {
      logger.firestore.warn('Section page\'e eklenirken hata (normal olabilir)', error);
    }
  }

  return docRef.id;
}

/**
 * Section ID ile getir
 */
export async function getSectionById(id: string): Promise<Section | null> {
  const docSnap = await getDoc(doc(db, COLLECTIONS.sections, id));
  return docToSection(docSnap);
}

/**
 * Section güncelle
 */
export async function updateSection(id: string, input: SectionUpdateInput): Promise<void> {
  const docRef = doc(db, COLLECTIONS.sections, id);
  // Undefined field'ları filtrele
  const updateData: Record<string, any> = {
    updatedAt: serverTimestamp(),
  };

  Object.keys(input).forEach(key => {
    const value = (input as any)[key];
    if (value !== undefined) {
      updateData[key] = value;
    }
  });

  await updateDoc(docRef, updateData);
}

/**
 * Section sil
 */
export async function deleteSection(id: string): Promise<void> {
  const section = await getSectionById(id);
  if (!section) return;

  // Column'ları sil
  for (const columnId of section.columns || []) {
    await deleteColumn(columnId);
  }

  // Section'ı sil
  await deleteDoc(doc(db, COLLECTIONS.sections, id));
}

/**
 * Section sırasını değiştir (yukarı/aşağı taşı)
 */
export async function moveSection(sectionId: string, direction: 'up' | 'down'): Promise<void> {
  const section = await getSectionById(sectionId);
  if (!section) return;

  const page = await getPageById(section.pageId);
  if (!page || !page.sections || page.sections.length < 2) return;

  const currentIndex = page.sections.indexOf(sectionId);
  if (currentIndex === -1) return;

  let newIndex: number;
  if (direction === 'up') {
    if (currentIndex === 0) return; // Zaten en üstte
    newIndex = currentIndex - 1;
  } else {
    if (currentIndex === page.sections.length - 1) return; // Zaten en altta
    newIndex = currentIndex + 1;
  }

  // Section'ları yeniden sırala
  const newSections = [...page.sections];
  [newSections[currentIndex], newSections[newIndex]] = [newSections[newIndex], newSections[currentIndex]];

  // Her iki section'ın order'ını güncelle
  const batch = writeBatch(db);
  batch.update(doc(db, COLLECTIONS.sections, sectionId), {
    order: newIndex,
    updatedAt: serverTimestamp(),
  });

  const swappedSection = await getSectionById(newSections[currentIndex]);
  if (swappedSection) {
    batch.update(doc(db, COLLECTIONS.sections, newSections[currentIndex]), {
      order: currentIndex,
      updatedAt: serverTimestamp(),
    });
  }

  // Page'in sections array'ini güncelle
  batch.update(doc(db, COLLECTIONS.pages, section.pageId), {
    sections: newSections,
    updatedAt: serverTimestamp(),
  });

  await batch.commit();
}

/**
 * Section kopyala (duplicate)
 */
export async function duplicateSection(sectionId: string): Promise<string> {
  const originalSection = await getSectionById(sectionId);
  if (!originalSection) {
    throw new Error('Section bulunamadı');
  }

  const page = await getPageById(originalSection.pageId);
  if (!page) {
    throw new Error('Page bulunamadı');
  }

  // Yeni section oluştur
  const newSectionId = await createSection({
    pageId: originalSection.pageId,
    name: `${originalSection.name} (Kopya)`,
    order: originalSection.order + 1,
    settings: { ...originalSection.settings },
  });

  // Column'ları kopyala
  for (const columnId of originalSection.columns || []) {
    const originalColumn = await getColumnById(columnId);
    if (!originalColumn) continue;

    const newColumnId = await createColumn({
      sectionId: newSectionId,
      width: originalColumn.width,
      order: originalColumn.order,
      settings: { ...originalColumn.settings },
    });

    // Block'ları kopyala
    for (const blockId of originalColumn.blocks || []) {
      const originalBlock = await getBlockById(blockId);
      if (!originalBlock) continue;

      await createBlock({
        columnId: newColumnId,
        type: originalBlock.type,
        props: { ...originalBlock.props },
        order: originalBlock.order,
      });
    }
  }

  return newSectionId;
}

/**
 * Column oluştur
 */
export async function createColumn(input: ColumnCreateInput): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTIONS.columns), {
    ...input,
    blocks: [],
    columns: [], // İç içe kolonlar için
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // Eğer parent column varsa, parent column'a ekle
  if (input.parentColumnId) {
    const parentColumn = await getColumnById(input.parentColumnId);
    if (parentColumn) {
      await updateColumn(input.parentColumnId, {
        columns: [...(parentColumn.columns || []), docRef.id],
      });
    }
  } else if (input.sectionId) {
    // Parent column yoksa, section'a ekle
    const section = await getSectionById(input.sectionId);
    if (section) {
      await updateSection(input.sectionId, {
        columns: [...(section.columns || []), docRef.id],
      });
    }
  }

  return docRef.id;
}

/**
 * Column ID ile getir
 */
export async function getColumnById(id: string): Promise<Column | null> {
  const docSnap = await getDoc(doc(db, COLLECTIONS.columns, id));
  return docToColumn(docSnap);
}

/**
 * Column güncelle
 */
export async function updateColumn(id: string, input: ColumnUpdateInput): Promise<void> {
  const docRef = doc(db, COLLECTIONS.columns, id);
  await updateDoc(docRef, {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Column sil
 */
export async function deleteColumn(id: string): Promise<void> {
  const column = await getColumnById(id);
  if (!column) return;

  // Nested column'ları sil (recursive)
  for (const nestedColumnId of column.columns || []) {
    await deleteColumn(nestedColumnId);
  }

  // Block'ları sil
  for (const blockId of column.blocks || []) {
    await deleteBlock(blockId);
  }

  // Parent column'dan veya section'dan column ID'sini çıkar
  if (column.parentColumnId) {
    const parentColumn = await getColumnById(column.parentColumnId);
    if (parentColumn) {
      const updatedColumns = (parentColumn.columns || []).filter(colId => colId !== id);
      await updateColumn(column.parentColumnId, {
        columns: updatedColumns,
      });
    }
  } else if (column.sectionId) {
    const section = await getSectionById(column.sectionId);
    if (section) {
      const updatedColumns = (section.columns || []).filter(colId => colId !== id);
      await updateSection(column.sectionId, {
        columns: updatedColumns,
      });
    }
  }

  // Column'u sil
  await deleteDoc(doc(db, COLLECTIONS.columns, id));
}

/**
 * Block oluştur
 */
export async function createBlock(input: BlockCreateInput): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTIONS.blocks), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // Column'a block ID'sini ekle
  if (input.columnId) {
    const column = await getColumnById(input.columnId);
    if (column) {
      await updateColumn(input.columnId, {
        blocks: [...(column.blocks || []), docRef.id],
      });
    }
  }

  return docRef.id;
}

/**
 * Block ID ile getir
 */
export async function getBlockById(id: string): Promise<Block | null> {
  const docSnap = await getDoc(doc(db, COLLECTIONS.blocks, id));
  return docToBlock(docSnap);
}

/**
 * Block güncelle
 */
export async function updateBlock(id: string, input: BlockUpdateInput): Promise<void> {
  const docRef = doc(db, COLLECTIONS.blocks, id);
  const cleanedInput = removeUndefined(input); // undefined değerleri temizle
  await updateDoc(docRef, {
    ...cleanedInput,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Block kopyala (duplicate)
 * Block'u kopyalar ve aynı column'a ekler
 */
export async function duplicateBlock(blockId: string): Promise<string> {
  // Orijinal block'u getir
  const originalBlock = await getBlockById(blockId);
  if (!originalBlock) {
    throw new Error('Block bulunamadı');
  }

  // Yeni block oluştur (aynı column'a)
  const newBlockId = await createBlock({
    columnId: originalBlock.columnId,
    type: originalBlock.type,
    props: { ...originalBlock.props }, // Props'ları kopyala
    order: (originalBlock.order || 0) + 1, // Orijinal block'un hemen altına ekle
  });

  return newBlockId;
}

/**
 * Block sil
 * Block'u silerken column'dan da çıkarır
 */
export async function deleteBlock(id: string): Promise<void> {
  // Block'u getir
  const blockDoc = await getDoc(doc(db, COLLECTIONS.blocks, id));
  const blockData = blockDoc.data();

  if (!blockData) return;

  const columnId = blockData.columnId;

  // Column'dan block'u çıkar
  if (columnId) {
    const columnRef = doc(db, COLLECTIONS.columns, columnId);
    const columnDoc = await getDoc(columnRef);
    const columnData = columnDoc.data();

    if (columnData) {
      const newBlocks = (columnData.blocks || []).filter((blockId: string) => blockId !== id);
      await updateDoc(columnRef, {
        blocks: newBlocks,
        updatedAt: serverTimestamp(),
      });
    }
  }

  // Block'u sil
  await deleteDoc(doc(db, COLLECTIONS.blocks, id));
}

/**
 * Bloğu taşı (farklı column'a)
 */
export async function moveBlock(blockId: string, targetColumnId: string, newOrder?: number): Promise<void> {
  const batch = writeBatch(db);
  const blockDoc = await getDoc(doc(db, COLLECTIONS.blocks, blockId));
  const blockData = blockDoc.data();

  if (!blockData) return;

  const oldColumnId = blockData.columnId;

  // Block'u güncelle
  const updateData: any = {
    columnId: targetColumnId,
    updatedAt: serverTimestamp(),
  };
  if (newOrder !== undefined) {
    updateData.order = newOrder;
  } else if (blockData.order !== undefined) {
    updateData.order = blockData.order;
  }
  batch.update(doc(db, COLLECTIONS.blocks, blockId), updateData);

  // Eski column'dan çıkar
  if (oldColumnId) {
    const oldColumnRef = doc(db, COLLECTIONS.columns, oldColumnId);
    const oldColumnDoc = await getDoc(oldColumnRef);
    const oldColumnData = oldColumnDoc.data();
    const newBlocks = (oldColumnData?.blocks || []).filter((id: string) => id !== blockId);

    batch.update(oldColumnRef, {
      blocks: newBlocks,
      updatedAt: serverTimestamp(),
    });
  }

  // Yeni column'a ekle
  const newColumnRef = doc(db, COLLECTIONS.columns, targetColumnId);
  const newColumnDoc = await getDoc(newColumnRef);
  const newColumnData = newColumnDoc.data();
  const newBlocks = [...(newColumnData?.blocks || []), blockId];

  batch.update(newColumnRef, {
    blocks: newBlocks,
    updatedAt: serverTimestamp(),
  });

  await batch.commit();
}

// ============================================
// THEME FUNCTIONS
// ============================================

/**
 * Mevcut tüm sayfaları, section'ları, column'ları ve block'ları sil
 * Tema değiştirirken kullanılır
 */
export async function deleteCurrentTheme(): Promise<void> {
  const batch = writeBatch(db);

  // 1. Tüm page'leri getir
  const pagesSnapshot = await getDocs(collection(db, COLLECTIONS.pages));

  for (const pageDoc of pagesSnapshot.docs) {
    const page = pageDoc.data();

    // 2. Her page'in section'larını sil
    for (const sectionId of page.sections || []) {
      const sectionDoc = await getDoc(doc(db, COLLECTIONS.sections, sectionId));

      if (sectionDoc.exists()) {
        const section = sectionDoc.data();

        // 3. Section'ın column'larını sil
        for (const columnId of section.columns || []) {
          const columnDoc = await getDoc(doc(db, COLLECTIONS.columns, columnId));

          if (columnDoc.exists()) {
            const column = columnDoc.data();

            // 4. Column'un block'larını sil
            for (const blockId of column.blocks || []) {
              batch.delete(doc(db, COLLECTIONS.blocks, blockId));
            }

            batch.delete(doc(db, COLLECTIONS.columns, columnId));
          }
        }

        batch.delete(doc(db, COLLECTIONS.sections, sectionId));
      }
    }

    // 5. Page'i sil
    batch.delete(doc(db, COLLECTIONS.pages, pageDoc.id));
  }

  await batch.commit();
  logger.firestore.debug('Mevcut tema tamamen silindi');
}

/**
 * Tema yükleme - Tema verilerini Firebase'e yükle
 * ÖNEMLİ: Tema dosyaları (defaultThemes.ts) hiçbir zaman değişmez.
 * Yapılan değişiklikler Firestore'da tutulur.
 * Tema tekrar yüklendiğinde, Firestore'daki değişiklikler silinir ve orijinal tema dosyasındaki ayarlar yüklenir.
 */
export async function installTheme(themeData: ThemeData, createdBy: string): Promise<void> {
  const { metadata, pages } = themeData;

  if (!metadata || !pages) {
    throw new Error('Geçersiz tema formatı');
  }

  logger.firestore.info(`Tema yükleniyor: ${metadata.name} (${metadata.pages.length} sayfa)`);
  logger.firestore.debug(`Tema pages keys:`, Object.keys(pages));

  // Mevcut temayı kontrol et ve varsa metadata'sını orijinal ayarlarla güncelle
  // Bu sayede header/footer ayarları sıfırlanır
  let existingTheme: { id: string; name: string } | null = null;
  try {
    const existingThemes = await getDocs(collection(db, COLLECTIONS.themes));
    const foundDoc = existingThemes.docs.find(doc => {
      const data = doc.data();
      return data.name === metadata.name || data.id === metadata.id;
    });

    if (foundDoc) {
      existingTheme = { id: foundDoc.id, name: foundDoc.data().name };
    }

    if (existingTheme) {
      logger.firestore.info('Mevcut tema bulundu, metadata orijinal ayarlarla güncelleniyor...');
      logger.firestore.info('Header navItems (önceki):', metadata.settings?.header?.navItems);
      logger.firestore.info('Footer quickLinks (önceki):', metadata.settings?.footer?.quickLinks);

      // Tema metadata'sını TAMAMEN orijinal tema dosyasındaki ayarlarla değiştir
      // setDoc ile merge: false kullanarak tüm dokümanı değiştir
      const themeRef = doc(db, COLLECTIONS.themes, existingTheme.id);

      // ÖNEMLI: settings objesini JSON parse/stringify ile deep clone yap
      // Böylece Firestore nested objeleri de tamamen değiştirir
      const cleanMetadata = JSON.parse(JSON.stringify(metadata));

      await setDoc(themeRef, {
        ...cleanMetadata,
        updatedAt: serverTimestamp(),
      }, { merge: false }); // merge: false = doküman tamamen değiştirilir

      logger.firestore.info('✓ Tema metadata TAMAMEN orijinal ayarlarla güncellendi');
      logger.firestore.info('✓ Header navItems (sonrası):', cleanMetadata.settings?.header?.navItems);
      logger.firestore.info('✓ Footer quickLinks (sonrası):', cleanMetadata.settings?.footer?.quickLinks);
    } else {
      // Tema yoksa yeni oluştur
      logger.firestore.info('Yeni tema oluşturuluyor...');
      logger.firestore.info('Header navItems:', metadata.settings?.header?.navItems);
      logger.firestore.info('Footer quickLinks:', metadata.settings?.footer?.quickLinks);
      await createTheme(metadata);
      logger.firestore.info('✓ Yeni tema oluşturuldu');
    }
  } catch (error) {
    logger.firestore.warn('Tema metadata güncellenirken hata (yeni tema oluşturuluyor):', error);
    // Hata durumunda yeni tema oluştur
    await createTheme(metadata);
  }

  // Her sayfa için işlem yap
  for (const pageConfig of metadata.pages) {
    const pageData = pages[pageConfig.slug];

    if (!pageData) {
      logger.firestore.warn(`Sayfa bulunamadı: ${pageConfig.slug}`, { mevcutSayfalar: Object.keys(pages) });
      continue;
    }

    logger.firestore.debug(`Sayfa oluşturuluyor: ${pageConfig.title} (${pageConfig.slug})`);
    logger.firestore.debug(`Sayfa verileri:`, pageData);
    logger.firestore.debug(`Section sayısı:`, pageData.sections?.length || 0);
    logger.firestore.debug(`Section'lar:`, pageData.sections);

    // Yeni sayfa oluştur
    const pageId = await createPage({
      title: pageConfig.title,
      slug: pageConfig.slug,
      settings: {}, // PageSettings boş olarak başlatılır, tema ayarları siteSettings'te tutulur
      author: createdBy,
    });

    // Sayfayı published olarak işaretle (tema sayfaları otomatik yayınlanır)
    await updatePage(pageId, { status: 'published' });

    // Section'ları oluştur
    const sectionIds: string[] = [];

    if (!pageData.sections || pageData.sections.length === 0) {
      logger.firestore.warn(`Sayfa ${pageConfig.slug} için section verisi yok!`);
      // Section yoksa bile sayfayı oluştur (boş sayfa)
      continue;
    }

    logger.firestore.debug(`Section'lar oluşturuluyor (${pageData.sections.length} adet)...`);

    for (let sectionIndex = 0; sectionIndex < pageData.sections.length; sectionIndex++) {
      const sectionData = pageData.sections[sectionIndex];
      logger.firestore.debug(`Section ${sectionIndex + 1}/${pageData.sections.length} oluşturuluyor: ${sectionData.name}`); const sectionId = await createSection({
        pageId,
        name: sectionData.name,
        order: sectionIndex,
        settings: sectionData.settings || {},
      });

      logger.firestore.debug(`✓ Section oluşturuldu: ${sectionId} (${sectionData.name})`);
      sectionIds.push(sectionId);

      // Column'ları oluştur
      logger.firestore.debug(`  Column'lar oluşturuluyor (${sectionData.columns.length} adet)...`);
      for (let columnIndex = 0; columnIndex < sectionData.columns.length; columnIndex++) {
        const columnData = sectionData.columns[columnIndex];
        logger.firestore.debug(`    Column ${columnIndex + 1}/${sectionData.columns.length} oluşturuluyor: Genişlik ${columnData.width}%`);
        const columnId = await createColumn({
          sectionId,
          width: columnData.width,
          order: columnIndex,
          settings: columnData.settings || {},
        });
        logger.firestore.debug(`    ✓ Column oluşturuldu: ${columnId} (Genişlik: ${columnData.width}%)`);

        // Block'ları oluştur
        logger.firestore.debug(`      Block'lar oluşturuluyor (${columnData.blocks.length} adet)...`);
        for (let blockIndex = 0; blockIndex < columnData.blocks.length; blockIndex++) {
          const blockData = columnData.blocks[blockIndex];
          logger.firestore.debug(`        Block ${blockIndex + 1}/${columnData.blocks.length} oluşturuluyor: ${blockData.type}`);
          await createBlock({
            columnId,
            type: blockData.type as any,
            order: blockIndex,
            props: blockData.props || {},
          });
          logger.firestore.debug(`        ✓ Block oluşturuldu: ${blockData.type}`);
        }
      }
    }

    // Page'e section ID'lerini ekle (tüm section'lar oluşturulduktan sonra)
    // createSection içinde de ekleniyor ama race condition olmaması için burada da ekliyoruz
    await updatePage(pageId, { sections: sectionIds });

    logger.firestore.info(`✓ Sayfa oluşturuldu: ${pageConfig.title} (${sectionIds.length} section)`);
    logger.firestore.debug(`  Section ID'leri:`, sectionIds);
  }

  // Site settings'i tema ayarlarıyla güncelle (Header/Footer özelleştirmeleri + Company/Contact/Social/SEO)
  // Aktif tema bilgisini kaydet ve tema bilgilerini siteSettings'e uygula
  try {
    // Client-safe fonksiyon kullan (unstable_cache client'ta çalışmaz)
    const currentSettings = await getSiteSettingsClient();
    const existingThemeId = existingTheme ? existingTheme.id : null;
    const themeSettings = metadata.settings || {};

    logger.firestore.info(`Aktif tema ayarlanıyor: ${metadata.name} (ID: ${existingThemeId || metadata.id})`);

    // Tema bilgilerini siteSettings formatına çevir
    const themeCompanyInfo = themeSettings.company || {};
    const themeContactInfo = themeSettings.contact || {};
    const themeSocialInfo = themeSettings.social || {};
    const themeSeoInfo = themeSettings.seo || {};

    // Tema değiştiğinde SiteSettings'i TAMAMEN SIFIRLA
    // ESKİ DEĞERLER SPREAD EDİLMEMELİ!
    const settingsToUpdate: any = {
      // Sadece değişmemesi gereken alanları koruyoruz
      maintenance: currentSettings.maintenance,
      homepage: currentSettings.homepage,
      forms: currentSettings.forms,
      redirects: currentSettings.redirects,

      // Aktif tema bilgisini kaydet
      activeThemeId: existingThemeId || metadata.id,
      activeThemeName: metadata.name,

      // Company bilgileri - TEMA'dan tamamen override et
      siteName: {
        tr: themeCompanyInfo.name || 'Page Builder',
        en: themeCompanyInfo.name || 'Page Builder',
        de: themeCompanyInfo.name || 'Page Builder',
        fr: themeCompanyInfo.name || 'Page Builder',
      },
      siteSlogan: {
        tr: themeCompanyInfo.slogan || 'Modern ve Esnek Web Sayfaları',
        en: themeCompanyInfo.slogan || 'Create Modern and Flexible Web Pages',
        de: themeCompanyInfo.slogan || 'Erstellen Sie moderne und flexible Webseiten',
        fr: themeCompanyInfo.slogan || 'Créez des pages Web modernes et flexibles',
      },

      // Logo'yu TAMAMEN sıfırla
      logo: {
        light: { url: themeCompanyInfo.logo || '', path: '', width: 0, height: 0 },
        dark: { url: themeCompanyInfo.logo || '', path: '', width: 0, height: 0 },
        favicon: { url: '', path: '' },
        mobile: { url: '', path: '' },
      },

      // Renk ve font stillerini TAMAMEN sil (tema değiştiğinde sıfırlanmalı)
      companyNameStyle: null,
      sloganStyle: null,
      browserFavicon: null,

      // İletişim bilgileri - TEMA'dan override et
      contact: {
        email: themeContactInfo.email || '',
        phones: themeContactInfo.phone ? [themeContactInfo.phone] : [],
        address: {
          tr: themeContactInfo.address || '',
          en: themeContactInfo.address || '',
          de: themeContactInfo.address || '',
          fr: themeContactInfo.address || '',
        },
        workingHours: {
          tr: '',
          en: '',
          de: '',
          fr: '',
        },
        coordinates: {
          lat: 0,
          lng: 0,
        },
      },

      // Sosyal medya linkleri - TEMA'dan override et
      socialLinks: {
        facebook: themeSocialInfo.facebook || '',
        instagram: themeSocialInfo.instagram || '',
        twitter: themeSocialInfo.twitter || '',
        linkedin: themeSocialInfo.linkedin || '',
        youtube: themeSocialInfo.youtube || '',
      },

      // SEO bilgileri - TEMA'dan override et
      seo: {
        titleTemplate: {
          tr: themeSeoInfo.metaTitle || '%s | Page Builder',
          en: themeSeoInfo.metaTitle || '%s | Page Builder',
          de: themeSeoInfo.metaTitle || '%s | Page Builder',
          fr: themeSeoInfo.metaTitle || '%s | Page Builder',
        },
        defaultDescription: {
          tr: themeSeoInfo.metaDescription || 'Page Builder - Modern ve esnek web sayfaları oluşturun.',
          en: themeSeoInfo.metaDescription || 'Page Builder - Create modern and flexible web pages.',
          de: themeSeoInfo.metaDescription || 'Page Builder - Erstellen Sie moderne und flexible Webseiten.',
          fr: themeSeoInfo.metaDescription || 'Page Builder - Créez des pages Web modernes et flexibles.',
        },
        keywords: themeSeoInfo.metaKeywords
          ? {
            tr: themeSeoInfo.metaKeywords.split(',').map((k: string) => k.trim()),
            en: themeSeoInfo.metaKeywords.split(',').map((k: string) => k.trim()),
            de: themeSeoInfo.metaKeywords.split(',').map((k: string) => k.trim()),
            fr: themeSeoInfo.metaKeywords.split(',').map((k: string) => k.trim()),
          }
          : {
            tr: ['page builder', 'web sayfası', 'tasarım'],
            en: ['page builder', 'website', 'design'],
            de: ['page builder', 'webseite', 'design'],
            fr: ['page builder', 'site web', 'design'],
          },
        googleAnalyticsId: themeSeoInfo.googleAnalyticsId || '',
        googleTagManagerId: currentSettings.seo?.googleTagManagerId || '',
        googleSearchConsoleVerification: currentSettings.seo?.googleSearchConsoleVerification || '',
        facebookPixelId: currentSettings.seo?.facebookPixelId || '',
        robotsTxt: currentSettings.seo?.robotsTxt || 'User-agent: *\nAllow: /',
        sitemapEnabled: currentSettings.seo?.sitemapEnabled ?? true,
        sitemapChangeFrequency: currentSettings.seo?.sitemapChangeFrequency || 'weekly',
        sitemapPriority: currentSettings.seo?.sitemapPriority ?? 0.8,
      },
    };

    // null değerleri temizle (Firestore'a gönderilmemeli)
    Object.keys(settingsToUpdate).forEach(key => {
      if (settingsToUpdate[key] === null) {
        delete settingsToUpdate[key];
      }
    });

    await updateSiteSettings(settingsToUpdate, createdBy);
    logger.firestore.info(`✓ Site settings tema ayarlarıyla güncellendi (aktif tema: ${metadata.name})`);
    logger.firestore.debug('✓ Company, Contact, Social, SEO bilgileri temadan yüklendi');
    logger.firestore.debug('✓ Renk ve font stilleri sıfırlandı (companyNameStyle, sloganStyle temizlendi)');
  } catch (error) {
    logger.firestore.warn('Site settings güncellenirken hata (normal olabilir):', error);
  }

  logger.firestore.info(`✓ Tema başarıyla yüklendi: ${metadata.name}`);

  // ThemeContext'e tema güncellemesi bildir
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('theme-updated'));
    logger.firestore.debug('✓ theme-updated eventi dispatch edildi');
  }
}

/**
 * Mevcut temaları getir (Firestore'dan)
 */
export async function getAvailableThemes(): Promise<ThemePreview[]> {
  try {
    const themesSnapshot = await getDocs(collection(db, COLLECTIONS.themes));

    return themesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || '',
        description: data.description || '',
        thumbnail: data.thumbnail || '',
        category: (data.category || 'business') as ThemePreview['category'],
        version: data.version || '1.0.0',
      };
    });
  } catch (error) {
    logger.firestore.error('Firestore\'dan temalar yüklenemedi:', error);
    // Hata durumunda boş array döndür
    return [];
  }
}

/**
 * Tema metadata'sını getir
 */
export async function getThemeMetadata(themeId: string): Promise<ThemeMetadata | null> {
  const themeDoc = await getDoc(doc(db, COLLECTIONS.themes, themeId));

  if (!themeDoc.exists()) {
    return null;
  }

  return themeDoc.data() as ThemeMetadata;
}

/**
 * Tema verilerini getir (metadata + pages)
 */
export async function getThemeData(themeId: string): Promise<ThemeData | null> {
  const metadata = await getThemeMetadata(themeId);

  if (!metadata) {
    return null;
  }

  // Pages'i metadata'dan al (şimdilik metadata içinde tutuyoruz)
  // İleride ayrı collection'a taşınabilir
  const pages: Record<string, ThemePageData> = {};

  // Metadata içindeki pages array'inden sayfa verilerini oluştur
  // Gerçek uygulamada bu veriler ayrı bir collection'da veya storage'da olabilir
  for (const pageConfig of metadata.pages) {
    // Şimdilik boş sayfa oluştur, gerçek veriler tema dosyalarından gelecek
    pages[pageConfig.slug] = {
      slug: pageConfig.slug,
      title: pageConfig.title,
      sections: [],
    };
  }

  return {
    metadata,
    pages,
  };
}

/**
 * Tema oluştur (admin için)
 */
export async function createTheme(metadata: ThemeMetadata): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTIONS.themes), {
    ...metadata,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Tema metadata'sını güncelle
 */
export async function updateTheme(themeId: string, updates: Partial<ThemeMetadata>): Promise<void> {
  const themeRef = doc(db, COLLECTIONS.themes, themeId);
  await updateDoc(themeRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Aktif temayı bul ve güncelle (tema adına göre)
 * Her temanın kendi header/footer ayarları olmalı
 */
export async function updateActiveThemeSettings(
  themeName: string,
  settings: Partial<ThemeMetadata['settings']>
): Promise<void> {
  try {
    // Firestore'da yüklenmiş temaları bul
    const themesSnapshot = await getDocs(collection(db, COLLECTIONS.themes));

    if (themesSnapshot.empty) {
      logger.firestore.warn('Firestore\'da tema bulunamadı');
      throw new Error('Firestore\'da tema bulunamadı. Lütfen önce bir tema yükleyin.');
    }

    // Tema adına göre aktif temayı bul
    const activeTheme = themesSnapshot.docs.find(doc => {
      const data = doc.data();
      return data.name === themeName || data.id === themeName;
    });

    if (!activeTheme) {
      logger.firestore.warn(`Tema bulunamadı: ${themeName}, ilk temayı kullanıyoruz`);
      // Tema bulunamazsa ilk temayı kullan (fallback)
      const firstTheme = themesSnapshot.docs[0];
      const currentMetadata = firstTheme.data() as ThemeMetadata;

      await updateTheme(firstTheme.id, {
        settings: {
          ...currentMetadata.settings,
          ...settings,
        },
      });
      logger.firestore.info('✓ Tema ayarları güncellendi (fallback: ilk tema)');
      return;
    }

    const currentMetadata = activeTheme.data() as ThemeMetadata;

    // Settings'i güncelle (nested objects için deep merge)
    const updatedSettings = { ...currentMetadata.settings };

    // Header veya footer güncellemesi ise nested merge yap
    if (settings.header) {
      updatedSettings.header = {
        ...updatedSettings.header,
        ...settings.header,
      };
    }
    if (settings.footer) {
      updatedSettings.footer = {
        ...updatedSettings.footer,
        ...settings.footer,
      };
    }

    // Diğer ayarlar için shallow merge
    Object.keys(settings).forEach(key => {
      if (key !== 'header' && key !== 'footer') {
        (updatedSettings as any)[key] = (settings as any)[key];
      }
    });

    await updateTheme(activeTheme.id, {
      settings: updatedSettings,
    });

    logger.firestore.info(`✓ Tema ayarları güncellendi: ${themeName}`);
  } catch (error) {
    logger.firestore.error('Tema ayarları güncellenirken hata:', error);
    throw error;
  }
}

// ============================================
// EFFECTS CRUD
// ============================================

/**
 * Helper: Convert Firestore document to Effect
 */
function docToEffect(docSnap: DocumentSnapshot): Effect | null {
  const data = docSnap.data();
  if (!data) return null;

  return {
    ...data,
    id: docSnap.id,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
  } as Effect;
}

/**
 * Efekt oluştur
 */
export async function createEffect(input: EffectCreateInput): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTIONS.effects), {
    ...input,
    visibility: input.visibility || {
      enabled: true,
      scope: 'all',
      pages: [],
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  logger.firestore.info(`✓ Efekt oluşturuldu: ${input.displayName}`);
  return docRef.id;
}

/**
 * Efekt ID ile getir
 */
export async function getEffectById(id: string): Promise<Effect | null> {
  const docSnap = await getDoc(doc(db, COLLECTIONS.effects, id));
  return docToEffect(docSnap);
}

/**
 * Tüm efektleri getir
 */
export async function getAllEffects(): Promise<Effect[]> {
  const snapshot = await getDocs(collection(db, COLLECTIONS.effects));
  return snapshot.docs
    .map(docItem => docToEffect(docItem))
    .filter((effect): effect is Effect => effect !== null);
}

/**
 * Aktif efektleri getir (visibility.enabled = true)
 */
export async function getActiveEffects(): Promise<Effect[]> {
  const q = query(
    collection(db, COLLECTIONS.effects),
    where('visibility.enabled', '==', true)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(docItem => docToEffect(docItem))
    .filter((effect): effect is Effect => effect !== null);
}

/**
 * Sayfa bazlı aktif efektleri getir
 * @param pageId - Sayfa ID'si (null = anasayfa)
 */
export async function getEffectsForPage(pageId: string | null): Promise<Effect[]> {
  const activeEffects = await getActiveEffects();

  return activeEffects.filter(effect => {
    const { scope, pages } = effect.visibility;

    switch (scope) {
      case 'all':
        return true;
      case 'home':
        return !pageId; // Sadece anasayfa
      case 'selected':
        return pageId ? pages.includes(pageId) : false;
      case 'exclude':
        return pageId ? !pages.includes(pageId) : true;
      default:
        return false;
    }
  });
}

/**
 * Efekt güncelle
 */
export async function updateEffect(id: string, input: EffectUpdateInput): Promise<void> {
  const docRef = doc(db, COLLECTIONS.effects, id);

  // Mevcut efekti al
  const existing = await getEffectById(id);
  if (!existing) {
    throw new Error('Efekt bulunamadı');
  }

  // Güncelleme verisini hazırla
  const updateData: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };

  if (input.settings) {
    updateData.settings = { ...existing.settings, ...input.settings };
  }

  if (input.visibility) {
    updateData.visibility = { ...existing.visibility, ...input.visibility };
  }

  await updateDoc(docRef, updateData);
  logger.firestore.info(`✓ Efekt güncellendi: ${id}`);
}

/**
 * Efekt sil
 */
export async function deleteEffect(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.effects, id));
  logger.firestore.info(`✓ Efekt silindi: ${id}`);
}

// ============================================
// SECTION TEMPLATE FUNCTIONS
// ============================================

import type {
  SectionTemplate
} from '@/types/pageBuilder';

/**
 * Sayfadaki tüm section'ları sil
 */
export async function deleteAllPageSections(pageId: string): Promise<void> {
  const pageDoc = await getDoc(doc(db, COLLECTIONS.pages, pageId));

  if (!pageDoc.exists()) {
    throw new Error('Sayfa bulunamadı');
  }

  const page = pageDoc.data();
  const sectionIds = page.sections || [];

  if (sectionIds.length === 0) return;

  // Her section için cascade delete
  for (const sectionId of sectionIds) {
    const sectionDoc = await getDoc(doc(db, COLLECTIONS.sections, sectionId));

    if (!sectionDoc.exists()) continue;

    const section = sectionDoc.data();
    const columnIds = section.columns || [];

    // Her column'u sil
    for (const columnId of columnIds) {
      const columnDoc = await getDoc(doc(db, COLLECTIONS.columns, columnId));

      if (!columnDoc.exists()) continue;

      const column = columnDoc.data();
      const blockIds = column.blocks || [];

      // Her block'u sil
      for (const blockId of blockIds) {
        await deleteDoc(doc(db, COLLECTIONS.blocks, blockId));
      }

      await deleteDoc(doc(db, COLLECTIONS.columns, columnId));
    }

    await deleteDoc(doc(db, COLLECTIONS.sections, sectionId));
  }

  // Page'den section'ları temizle
  await updateDoc(doc(db, COLLECTIONS.pages, pageId), {
    sections: [],
    updatedAt: serverTimestamp(),
  });

  logger.firestore.info(`✓ Sayfa temizlendi: ${pageId} - ${sectionIds.length} section silindi`);
}

/**
 * Template'i sayfaya ekle
 */
export async function insertTemplate(
  pageId: string,
  template: SectionTemplate,
  mode: 'append' | 'replace'
): Promise<{ success: boolean; addedSections: number }> {
  const batch = writeBatch(db);

  try {
    // 1. Replace modunda mevcut section'ları sil
    if (mode === 'replace') {
      await deleteAllPageSections(pageId);
    }

    // 2. Mevcut section sayısını al (append için sıralama)
    const pageDoc = await getDoc(doc(db, COLLECTIONS.pages, pageId));
    const currentSectionIds = pageDoc.data()?.sections || [];
    let startOrder = currentSectionIds.length;

    // 3. Template section'larını oluştur
    const newSectionIds: string[] = [];

    for (const sectionData of template.sections) {
      // Section oluştur
      const sectionRef = doc(collection(db, COLLECTIONS.sections));
      const sectionId = sectionRef.id;

      const columnIds: string[] = [];

      // Column'ları oluştur
      for (let colIndex = 0; colIndex < sectionData.columns.length; colIndex++) {
        const columnData = sectionData.columns[colIndex];
        const columnRef = doc(collection(db, COLLECTIONS.columns));
        const columnId = columnRef.id;

        const blockIds: string[] = [];

        // Block'ları oluştur
        for (let blockIndex = 0; blockIndex < columnData.blocks.length; blockIndex++) {
          const blockData = columnData.blocks[blockIndex];
          const blockRef = doc(collection(db, COLLECTIONS.blocks));
          const blockId = blockRef.id;

          batch.set(blockRef, {
            id: blockId,
            columnId,
            type: blockData.type,
            props: blockData.props,
            order: blockIndex,
            visibility: { desktop: true, tablet: true, mobile: true },
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });

          blockIds.push(blockId);
        }

        // Column kaydet
        batch.set(columnRef, {
          id: columnId,
          sectionId,
          width: columnData.width,
          settings: columnData.settings || {},
          blocks: blockIds,
          order: colIndex,
          visibility: { desktop: true, tablet: true, mobile: true },
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        columnIds.push(columnId);
      }

      // Section kaydet - Her section farklı bir satırda olmalı (alt alta görünmesi için)
      const currentSectionIndex = newSectionIds.length;
      batch.set(sectionRef, {
        id: sectionId,
        pageId,
        name: sectionData.name,
        settings: sectionData.settings,
        columns: columnIds,
        order: startOrder + currentSectionIndex,
        rowOrder: startOrder + currentSectionIndex, // Her section farklı satırda
        columnOrder: 0,
        visibility: { desktop: true, tablet: true, mobile: true },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      newSectionIds.push(sectionId);
    }

    // 4. Page'i güncelle
    const allSectionIds = mode === 'append'
      ? [...currentSectionIds, ...newSectionIds]
      : newSectionIds;

    batch.update(doc(db, COLLECTIONS.pages, pageId), {
      sections: allSectionIds,
      updatedAt: serverTimestamp(),
    });

    // 5. Batch commit
    await batch.commit();

    logger.firestore.info(
      `✓ Template eklendi: ${template.name} → Sayfa ${pageId} (${mode}, ${newSectionIds.length} section)`
    );

    return {
      success: true,
      addedSections: newSectionIds.length,
    };

  } catch (error) {
    logger.firestore.error('Template insert hatası:', error);
    throw error;
  }
}
