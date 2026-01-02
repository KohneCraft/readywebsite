// ============================================
// Page Builder - Firestore Helper Functions
// CRUD operations for all collections
// ============================================

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
 * Site ayarlarını getir
 */
export async function getSiteSettings(): Promise<SiteSettings> {
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
 * Site ayarlarını güncelle
 */
export async function updateSiteSettings(
  input: SiteSettingsUpdate,
  userId: string
): Promise<void> {
  const docRef = doc(db, COLLECTIONS.settings, SITE_SETTINGS_DOC);
  
  await updateDoc(docRef, {
    ...input,
    updatedAt: serverTimestamp(),
    updatedBy: userId,
  });
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
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
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
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
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
export async function getAllPages(): Promise<Page[]> {
  const snapshot = await getDocs(collection(db, COLLECTIONS.pages));
  return snapshot.docs
    .map(docItem => docToPage(docItem))
    .filter((page): page is Page => page !== null);
}

/**
 * Sayfa güncelle
 */
export async function updatePage(id: string, input: PageUpdateInput): Promise<void> {
  const docRef = doc(db, COLLECTIONS.pages, id);
  await updateDoc(docRef, {
    ...input,
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
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  
  // Page'e section ID'sini ekle
  if (input.pageId) {
    const page = await getPageById(input.pageId);
    if (page) {
      await updatePage(input.pageId, {
        sections: [...(page.sections || []), docRef.id],
      });
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
  await updateDoc(docRef, {
    ...input,
    updatedAt: serverTimestamp(),
  });
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
 * Column oluştur
 */
export async function createColumn(input: ColumnCreateInput): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTIONS.columns), {
    ...input,
    blocks: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  
  // Section'a column ID'sini ekle
  if (input.sectionId) {
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
  
  // Block'ları sil
  for (const blockId of column.blocks || []) {
    await deleteBlock(blockId);
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
  await updateDoc(docRef, {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Block sil
 */
export async function deleteBlock(id: string): Promise<void> {
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
  batch.update(doc(db, COLLECTIONS.blocks, blockId), {
    columnId: targetColumnId,
    order: newOrder ?? blockData.order,
    updatedAt: serverTimestamp(),
  });
  
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
  console.log('Mevcut tema tamamen silindi');
}

/**
 * Tema yükleme - Tema verilerini Firebase'e yükle
 */
export async function installTheme(themeData: ThemeData, createdBy: string): Promise<void> {
  const { metadata, pages } = themeData;
  
  if (!metadata || !pages) {
    throw new Error('Geçersiz tema formatı');
  }
  
  console.log(`Tema yükleniyor: ${metadata.name} (${metadata.pages.length} sayfa)`);
  console.log(`Tema pages keys:`, Object.keys(pages));
  
  // Her sayfa için işlem yap
  for (const pageConfig of metadata.pages) {
    const pageData = pages[pageConfig.slug];
    
    if (!pageData) {
      console.warn(`Sayfa bulunamadı: ${pageConfig.slug}`, 'Mevcut sayfalar:', Object.keys(pages));
      continue;
    }
    
    console.log(`Sayfa oluşturuluyor: ${pageConfig.title} (${pageConfig.slug})`);
    console.log(`Sayfa verileri:`, JSON.stringify(pageData, null, 2));
    console.log(`Section sayısı:`, pageData.sections?.length || 0);
    console.log(`Section'lar:`, pageData.sections);
    
    // Yeni sayfa oluştur
    const pageId = await createPage({
      title: pageConfig.title,
      slug: pageConfig.slug,
      settings: metadata.settings || {},
      author: createdBy,
    });
    
    // Sayfayı published olarak işaretle (tema sayfaları otomatik yayınlanır)
    await updatePage(pageId, { status: 'published' });
    
    // Section'ları oluştur
    const sectionIds: string[] = [];
    
    if (!pageData.sections || pageData.sections.length === 0) {
      console.warn(`Sayfa ${pageConfig.slug} için section verisi yok!`);
      continue;
    }
    
    for (let sectionIndex = 0; sectionIndex < pageData.sections.length; sectionIndex++) {
      const sectionData = pageData.sections[sectionIndex];
      const sectionId = await createSection({
        pageId,
        name: sectionData.name,
        order: sectionIndex,
        settings: sectionData.settings || {},
      });
      
      sectionIds.push(sectionId);
      
      // Column'ları oluştur
      for (let columnIndex = 0; columnIndex < sectionData.columns.length; columnIndex++) {
        const columnData = sectionData.columns[columnIndex];
        const columnId = await createColumn({
          sectionId,
          width: columnData.width,
          order: columnIndex, // Column order'ı düzelt
          settings: columnData.settings || {},
        });
        
        // Block'ları oluştur
        for (let blockIndex = 0; blockIndex < columnData.blocks.length; blockIndex++) {
          const blockData = columnData.blocks[blockIndex];
          await createBlock({
            columnId,
            type: blockData.type as any,
            order: blockIndex,
            props: blockData.props || {},
          });
        }
      }
    }
    
    // Page'e section ID'lerini ekle
    await updatePage(pageId, { sections: sectionIds });
    
    console.log(`✓ Sayfa oluşturuldu: ${pageConfig.title} (${sectionIds.length} section)`);
  }
  
  console.log(`✓ Tema başarıyla yüklendi: ${metadata.name}`);
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
    console.error('Firestore\'dan temalar yüklenemedi:', error);
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
