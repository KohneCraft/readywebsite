// ============================================
// Vav Yapı - Firestore Helper Functions
// CRUD operations for all collections
// ============================================

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
  limit,
  startAfter,
  DocumentSnapshot,
  QueryConstraint,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from './config';
import type {
  Project,
  ProjectCreateInput,
  ProjectUpdateInput,
  ProjectSummary,
  ProjectFilters,
  ProjectSort,
  PaginatedProjects,
  ContactForm,
  ContactFormInput,
  ContactFormUpdate,
  ContactFormSummary,
  ContactFormFilters,
  PaginatedContactForms,
  SiteSettings,
  SiteSettingsUpdate,
  User,
  UserCreateInput,
  UserUpdateInput,
  Locale,
  PageLayout,
  PageLayoutCreateInput,
  PageLayoutUpdateInput,
  PageType,
  PageElement,
  PageContent,
  PageContentCreateInput,
  PageContentUpdateInput,
  ContentSection,
} from '@/types';
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
import { DEFAULT_SITE_SETTINGS, getDefaultElementsForPage } from '@/types';

// ============================================
// COLLECTION REFERENCES
// ============================================

const COLLECTIONS = {
  projects: 'projects',
  contactForms: 'contactForms',
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

/**
 * Document data'yı Project'e çevir
 */
function docToProject(doc: DocumentSnapshot): Project | null {
  const data = doc.data();
  if (!data) return null;
  
  return {
    ...data,
    id: doc.id,
    startDate: convertTimestamp(data.startDate),
    endDate: data.endDate ? convertTimestamp(data.endDate) : undefined,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
    coverImage: {
      ...data.coverImage,
      createdAt: convertTimestamp(data.coverImage?.createdAt),
    },
    gallery: data.gallery?.map((img: Record<string, unknown>) => ({
      ...img,
      createdAt: convertTimestamp(img.createdAt as Timestamp),
    })) || [],
  } as Project;
}

/**
 * Project'i ProjectSummary'ye çevir
 */
function projectToSummary(project: Project, locale: Locale): ProjectSummary {
  const translation = project.translations[locale] || project.translations.tr;
  return {
    id: project.id,
    slug: project.slug,
    status: project.status,
    type: project.type,
    featured: project.featured,
    published: project.published,
    coverImage: project.coverImage,
    completionPercentage: project.completionPercentage,
    startDate: project.startDate,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    name: translation.name,
    shortDescription: translation.shortDescription,
    location: {
      city: translation.location.city,
      district: translation.location.district,
    },
  };
}

// ============================================
// PROJECTS CRUD
// ============================================

/**
 * Tüm projeleri getir (sayfalı)
 */
export async function getProjects(
  options: {
    locale?: Locale;
    filters?: ProjectFilters;
    sort?: ProjectSort;
    page?: number;
    limit?: number;
    lastDoc?: DocumentSnapshot;
  } = {}
): Promise<PaginatedProjects> {
  const {
    locale = 'tr',
    filters = {},
    sort = { field: 'createdAt', direction: 'desc' },
    page = 1,
    limit: pageLimit = 12,
    lastDoc,
  } = options;

  // Limit max page size to prevent large queries
  const maxLimit = 100;
  const safeLimit = Math.min(pageLimit, maxLimit);

  const constraints: QueryConstraint[] = [];

  // Filters
  if (filters.status) {
    constraints.push(where('status', '==', filters.status));
  }
  if (filters.type) {
    constraints.push(where('type', '==', filters.type));
  }
  if (filters.featured !== undefined) {
    constraints.push(where('featured', '==', filters.featured));
  }
  if (filters.published !== undefined) {
    constraints.push(where('published', '==', filters.published));
  }

  // Sorting
  constraints.push(orderBy(sort.field, sort.direction));

  // Pagination
  constraints.push(limit(safeLimit + 1)); // +1 to check hasMore
  if (lastDoc) {
    constraints.push(startAfter(lastDoc));
  }

  const q = query(collection(db, COLLECTIONS.projects), ...constraints);
  const snapshot = await getDocs(q);

  const projects: ProjectSummary[] = [];
  let hasMore = false;

  snapshot.docs.forEach((doc, index) => {
    if (index < safeLimit) {
      const project = docToProject(doc);
      if (project) {
        projects.push(projectToSummary(project, locale));
      }
    } else {
      hasMore = true;
    }
  });

  // Total count (ayrı sorgu gerekebilir)
  // Şimdilik basit tutuyoruz
  const total = projects.length;
  const totalPages = Math.ceil(total / safeLimit);

  return {
    projects,
    total,
    page,
    totalPages,
    hasMore,
  };
}

/**
 * Tek proje getir (ID ile)
 */
export async function getProjectById(id: string): Promise<Project | null> {
  const docRef = doc(db, COLLECTIONS.projects, id);
  const docSnap = await getDoc(docRef);
  return docToProject(docSnap);
}

/**
 * Tek proje getir (slug ile)
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const q = query(
    collection(db, COLLECTIONS.projects),
    where('slug', '==', slug),
    limit(1)
  );
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) return null;
  return docToProject(snapshot.docs[0]);
}

/**
 * Featured projeleri getir (anasayfa için)
 */
export async function getFeaturedProjects(
  locale: Locale = 'tr',
  count: number = 6
): Promise<ProjectSummary[]> {
  const q = query(
    collection(db, COLLECTIONS.projects),
    where('published', '==', true),
    where('featured', '==', true),
    orderBy('createdAt', 'desc'),
    limit(count)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(doc => docToProject(doc))
    .filter((p): p is Project => p !== null)
    .map(p => projectToSummary(p, locale));
}

/**
 * Devam eden projeleri getir
 */
export async function getOngoingProjects(
  locale: Locale = 'tr',
  pageLimit: number = 12
): Promise<ProjectSummary[]> {
  const q = query(
    collection(db, COLLECTIONS.projects),
    where('published', '==', true),
    where('status', '==', 'ongoing'),
    orderBy('completionPercentage', 'desc'),
    limit(pageLimit)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(doc => docToProject(doc))
    .filter((p): p is Project => p !== null)
    .map(p => projectToSummary(p, locale));
}

/**
 * Tamamlanan projeleri getir
 */
export async function getCompletedProjects(
  locale: Locale = 'tr',
  pageLimit: number = 12
): Promise<ProjectSummary[]> {
  const q = query(
    collection(db, COLLECTIONS.projects),
    where('published', '==', true),
    where('status', '==', 'completed'),
    orderBy('endDate', 'desc'),
    limit(pageLimit)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(doc => docToProject(doc))
    .filter((p): p is Project => p !== null)
    .map(p => projectToSummary(p, locale));
}

/**
 * Yayınlanmış tüm projeleri getir
 */
export async function getPublishedProjects(
  pageLimit: number = 50
): Promise<Project[]> {
  try {
    // Önce tüm projeleri çek, sonra client-side filtrele
    // Bu yaklaşım index gerektirmez
    const q = query(
      collection(db, COLLECTIONS.projects),
      limit(pageLimit)
    );
    
    const snapshot = await getDocs(q);
    const allProjects = snapshot.docs
      .map(doc => docToProject(doc))
      .filter((p): p is Project => p !== null);
    
    // Client-side: sadece published olanları filtrele ve tarihe göre sırala
    return allProjects
      .filter(p => p.published === true)
      .sort((a, b) => {
        const dateA = a.createdAt?.getTime() || 0;
        const dateB = b.createdAt?.getTime() || 0;
        return dateB - dateA;
      });
  } catch (error) {
    console.error('getPublishedProjects error:', error);
    return [];
  }
}

/**
 * Yeni proje oluştur
 */
export async function createProject(
  data: ProjectCreateInput
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTIONS.projects), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Proje güncelle
 */
export async function updateProject(
  id: string,
  data: ProjectUpdateInput
): Promise<void> {
  const docRef = doc(db, COLLECTIONS.projects, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Proje sil
 */
export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.projects, id);
  await deleteDoc(docRef);
}

/**
 * Toplu proje sil
 */
export async function deleteProjects(ids: string[]): Promise<void> {
  const batch = writeBatch(db);
  ids.forEach(id => {
    const docRef = doc(db, COLLECTIONS.projects, id);
    batch.delete(docRef);
  });
  await batch.commit();
}

// ============================================
// CONTACT FORMS CRUD
// ============================================

/**
 * İletişim formlarını getir (admin için)
 */
export async function getContactForms(
  options: {
    filters?: ContactFormFilters;
    page?: number;
    limit?: number;
  } = {}
): Promise<PaginatedContactForms> {
  const { filters = {}, page = 1, limit: pageLimit = 25 } = options;

  const constraints: QueryConstraint[] = [];

  if (filters.status) {
    constraints.push(where('status', '==', filters.status));
  }
  if (filters.subject) {
    constraints.push(where('subject', '==', filters.subject));
  }

  constraints.push(orderBy('createdAt', 'desc'));
  constraints.push(limit(pageLimit));

  const q = query(collection(db, COLLECTIONS.contactForms), ...constraints);
  const snapshot = await getDocs(q);

  const forms: ContactFormSummary[] = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      status: data.status,
      createdAt: convertTimestamp(data.createdAt),
      locale: data.locale,
    };
  });

  // Stats
  const statsQuery = await getDocs(collection(db, COLLECTIONS.contactForms));
  const stats = { new: 0, read: 0, replied: 0, archived: 0 };
  statsQuery.docs.forEach(doc => {
    const status = doc.data().status as keyof typeof stats;
    if (stats[status] !== undefined) stats[status]++;
  });

  return {
    forms,
    total: statsQuery.size,
    page,
    totalPages: Math.ceil(statsQuery.size / pageLimit),
    hasMore: forms.length === pageLimit,
    stats,
  };
}

/**
 * Tek iletişim formu getir
 */
export async function getContactFormById(id: string): Promise<ContactForm | null> {
  const docRef = doc(db, COLLECTIONS.contactForms, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) return null;
  
  const data = docSnap.data();
  return {
    ...data,
    id: docSnap.id,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
    repliedAt: data.repliedAt ? convertTimestamp(data.repliedAt) : undefined,
  } as ContactForm;
}

/**
 * Yeni iletişim formu oluştur (public)
 */
export async function createContactForm(
  data: ContactFormInput
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTIONS.contactForms), {
    ...data,
    status: 'new',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * İletişim formu güncelle (admin)
 */
export async function updateContactForm(
  id: string,
  data: ContactFormUpdate
): Promise<void> {
  const docRef = doc(db, COLLECTIONS.contactForms, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * İletişim formu sil
 */
export async function deleteContactForm(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.contactForms, id);
  await deleteDoc(docRef);
}

// ============================================
// SETTINGS CRUD
// ============================================

const SITE_SETTINGS_DOC = 'site';

/**
 * Site ayarlarını getir
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const docRef = doc(db, COLLECTIONS.settings, SITE_SETTINGS_DOC);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    // Varsayılan ayarları döndür
    return {
      ...DEFAULT_SITE_SETTINGS,
      updatedAt: new Date(),
      updatedBy: 'system',
    };
  }
  
  const data = docSnap.data();
  return {
    ...data,
    updatedAt: convertTimestamp(data.updatedAt),
    maintenance: {
      ...data.maintenance,
      scheduledStart: data.maintenance?.scheduledStart 
        ? convertTimestamp(data.maintenance.scheduledStart) 
        : undefined,
      scheduledEnd: data.maintenance?.scheduledEnd 
        ? convertTimestamp(data.maintenance.scheduledEnd) 
        : undefined,
    },
    redirects: data.redirects?.map((r: Record<string, unknown>) => ({
      ...r,
      createdAt: convertTimestamp(r.createdAt as Timestamp),
    })) || [],
  } as SiteSettings;
}

/**
 * Site ayarlarını güncelle
 */
export async function updateSiteSettings(
  data: SiteSettingsUpdate,
  userId: string
): Promise<void> {
  const docRef = doc(db, COLLECTIONS.settings, SITE_SETTINGS_DOC);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
    updatedBy: userId,
  });
}

/**
 * Site ayarlarını oluştur (ilk kurulum)
 */
export async function initializeSiteSettings(userId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.settings, SITE_SETTINGS_DOC);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    await updateDoc(docRef, {
      ...DEFAULT_SITE_SETTINGS,
      updatedAt: serverTimestamp(),
      updatedBy: userId,
    }).catch(() => {
      // Document doesn't exist, create it
      return addDoc(collection(db, COLLECTIONS.settings), {
        ...DEFAULT_SITE_SETTINGS,
        updatedAt: serverTimestamp(),
        updatedBy: userId,
      });
    });
  }
}

// ============================================
// USERS CRUD
// ============================================

/**
 * Kullanıcı getir (ID ile)
 */
export async function getUserById(id: string): Promise<User | null> {
  const docRef = doc(db, COLLECTIONS.users, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) return null;
  
  const data = docSnap.data();
  return {
    ...data,
    id: docSnap.id,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
    lastLoginAt: data.lastLoginAt ? convertTimestamp(data.lastLoginAt) : undefined,
  } as User;
}

/**
 * Kullanıcı oluştur
 */
export async function createUser(
  uid: string,
  data: Omit<UserCreateInput, 'password'>
): Promise<void> {
  const docRef = doc(db, COLLECTIONS.users, uid);
  await updateDoc(docRef, {
    ...data,
    id: uid,
    active: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }).catch(() => {
    // Document doesn't exist, set it
    return addDoc(collection(db, COLLECTIONS.users), {
      ...data,
      id: uid,
      active: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });
}

/**
 * Kullanıcı güncelle
 */
export async function updateUser(
  id: string,
  data: UserUpdateInput
): Promise<void> {
  const docRef = doc(db, COLLECTIONS.users, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Son giriş zamanını güncelle
 */
export async function updateLastLogin(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.users, id);
  await updateDoc(docRef, {
    lastLoginAt: serverTimestamp(),
  });
}

/**
 * Tüm kullanıcıları getir (admin için)
 */
export async function getUsers(): Promise<User[]> {
  const q = query(
    collection(db, COLLECTIONS.users),
    orderBy('createdAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      createdAt: convertTimestamp(data.createdAt),
      updatedAt: convertTimestamp(data.updatedAt),
      lastLoginAt: data.lastLoginAt ? convertTimestamp(data.lastLoginAt) : undefined,
    } as User;
  });
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
 * Sayfa düzeni oluştur
 */
export async function createPageLayout(input: PageLayoutCreateInput): Promise<string> {
  const elements: PageElement[] = input.elements.map((el, index) => ({
    ...el,
    id: `element-${Date.now()}-${index}`,
  }));
  
  const docRef = await addDoc(collection(db, COLLECTIONS.pageLayouts), {
    ...input,
    elements,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    isDefault: input.isDefault ?? false,
    isActive: input.isActive ?? true,
  });
  
  return docRef.id;
}

/**
 * Sayfa düzeni ID ile getir
 */
export async function getPageLayoutById(id: string): Promise<PageLayout | null> {
  const docSnap = await getDoc(doc(db, COLLECTIONS.pageLayouts, id));
  return docToPageLayout(docSnap);
}

/**
 * Sayfa tipine göre aktif düzeni getir
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
 * Mevcut layout'un elementlerinin sayfa tipine uygun olup olmadığını kontrol et
 */
function isValidLayoutForPage(layout: PageLayout, pageId: PageType): boolean {
  const defaultElements = getDefaultElementsForPage(pageId);
  
  // Element sayısı eşleşmeli
  if (layout.elements.length !== defaultElements.length) {
    return false;
  }
  
  // Her pozisyondaki element tipi varsayılan elementlerle eşleşmeli
  // (Sıralama önemli değil, sadece tipler ve sayılar eşleşmeli)
  const defaultElementTypeCounts = new Map<string, number>();
  const layoutElementTypeCounts = new Map<string, number>();
  
  // Varsayılan element tiplerini say
  for (const el of defaultElements) {
    defaultElementTypeCounts.set(el.type, (defaultElementTypeCounts.get(el.type) || 0) + 1);
  }
  
  // Layout element tiplerini say
  for (const el of layout.elements) {
    layoutElementTypeCounts.set(el.type, (layoutElementTypeCounts.get(el.type) || 0) + 1);
  }
  
  // Her element tipinin sayısı eşleşmeli
  if (defaultElementTypeCounts.size !== layoutElementTypeCounts.size) {
    return false;
  }
  
  for (const [type, count] of defaultElementTypeCounts) {
    if (layoutElementTypeCounts.get(type) !== count) {
      return false;
    }
  }
  
  return true;
}

/**
 * Sayfa tipine göre varsayılan düzeni getir veya oluştur
 */
export async function getOrCreateDefaultLayout(pageId: PageType, createdBy: string): Promise<PageLayout> {
  // Önce mevcut aktif düzeni kontrol et
  const existing = await getActivePageLayout(pageId);
  
  // Eğer layout varsa ve elementleri doğruysa, onu döndür
  if (existing && isValidLayoutForPage(existing, pageId)) {
    return existing;
  }
  
  // Eğer layout yoksa veya elementleri yanlışsa, eski layout'ları temizle ve yeni oluştur
  if (existing) {
    // Yanlış elementlerle oluşturulmuş layout'u sil
    const existingLayouts = await getPageLayoutsByType(pageId);
    const batch = writeBatch(db);
    
    for (const layout of existingLayouts) {
      const docRef = doc(db, COLLECTIONS.pageLayouts, layout.id);
      batch.delete(docRef);
    }
    
    await batch.commit();
  }
  
  // Sayfa tipine göre varsayılan elementleri al
  const defaultElements = getDefaultElementsForPage(pageId);
  
  const layoutId = await createPageLayout({
    pageId,
    name: `${pageId} - Varsayılan`,
    elements: defaultElements,
    createdBy,
    isDefault: true,
    isActive: true,
  });
  
  const layout = await getPageLayoutById(layoutId);
  if (!layout) throw new Error('Layout oluşturulamadı');
  
  return layout;
}

/**
 * Sayfa düzeni güncelle
 */
export async function updatePageLayout(id: string, input: PageLayoutUpdateInput): Promise<void> {
  const docRef = doc(db, COLLECTIONS.pageLayouts, id);
  await updateDoc(docRef, {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Sayfa düzeni sil
 */
export async function deletePageLayout(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.pageLayouts, id));
}

/**
 * Tüm sayfa düzenlerini getir
 */
export async function getAllPageLayouts(): Promise<PageLayout[]> {
  const q = query(
    collection(db, COLLECTIONS.pageLayouts),
    orderBy('createdAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(doc => docToPageLayout(doc))
    .filter((layout): layout is PageLayout => layout !== null);
}

/**
 * Sayfa tipine göre düzenleri getir
 */
export async function getPageLayoutsByType(pageId: PageType): Promise<PageLayout[]> {
  const q = query(
    collection(db, COLLECTIONS.pageLayouts),
    where('pageId', '==', pageId),
    orderBy('createdAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(doc => docToPageLayout(doc))
    .filter((layout): layout is PageLayout => layout !== null);
}

/**
 * Aktif düzeni değiştir
 */
export async function setActivePageLayout(pageId: PageType, layoutId: string): Promise<void> {
  // Önce aynı sayfa tipindeki tüm düzenleri pasif yap
  const existingLayouts = await getPageLayoutsByType(pageId);
  const batch = writeBatch(db);
  
  for (const layout of existingLayouts) {
    const docRef = doc(db, COLLECTIONS.pageLayouts, layout.id);
    batch.update(docRef, { isActive: false });
  }
  
  // Seçilen düzeni aktif yap
  const targetDocRef = doc(db, COLLECTIONS.pageLayouts, layoutId);
  batch.update(targetDocRef, { isActive: true, updatedAt: serverTimestamp() });
  
  await batch.commit();
}

/**
 * Sayfa düzenini varsayılana sıfırla
 * Mevcut layout'u siler ve varsayılan elementlerle yeniden oluşturur
 */
export async function resetPageLayoutToDefault(pageId: PageType, createdBy: string): Promise<PageLayout> {
  // Mevcut tüm layout'ları bu sayfa için sil
  const existingLayouts = await getPageLayoutsByType(pageId);
  const batch = writeBatch(db);
  
  for (const layout of existingLayouts) {
    const docRef = doc(db, COLLECTIONS.pageLayouts, layout.id);
    batch.delete(docRef);
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
 * Helper: Generate unique ID
 */
function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

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

// ============================================
// PAGE CRUD
// ============================================

/**
 * Yeni sayfa oluştur
 */
export async function createPage(input: PageCreateInput): Promise<string> {
  const pageRef = doc(db, COLLECTIONS.pages, generateId());
  
  await updateDoc(pageRef, {
    id: pageRef.id,
    title: input.title,
    slug: input.slug,
    sections: [],
    settings: input.settings || {},
    status: 'draft',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    author: input.author,
  }).catch(() => {
    // Document doesn't exist, create it
    return addDoc(collection(db, COLLECTIONS.pages), {
      id: pageRef.id,
      title: input.title,
      slug: input.slug,
      sections: [],
      settings: input.settings || {},
      status: 'draft',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      author: input.author,
    });
  });
  
  return pageRef.id;
}

/**
 * Sayfa getir (ID ile)
 */
export async function getPageById(id: string): Promise<Page | null> {
  const docRef = doc(db, COLLECTIONS.pages, id);
  const docSnap = await getDoc(docRef);
  return docToPage(docSnap);
}

/**
 * Sayfa getir (slug ile)
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
  const q = query(
    collection(db, COLLECTIONS.pages),
    orderBy('createdAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(doc => docToPage(doc))
    .filter((page): page is Page => page !== null);
}

/**
 * Sayfa güncelle
 */
export async function updatePage(id: string, input: PageUpdateInput): Promise<void> {
  const docRef = doc(db, COLLECTIONS.pages, id);
  const updates: Record<string, unknown> = {
    ...input,
    updatedAt: serverTimestamp(),
  };
  
  // publishedAt'i ayrı kontrol et (input'ta olabilir ama tip tanımında yok)
  if (input.status === 'published') {
    const pageDoc = await getDoc(docRef);
    const pageData = pageDoc.data();
    if (!pageData?.publishedAt) {
      updates.publishedAt = serverTimestamp();
    }
  }
  
  await updateDoc(docRef, updates);
}

/**
 * Sayfa sil
 */
export async function deletePage(id: string): Promise<void> {
  const batch = writeBatch(db);
  const pageDoc = await getDoc(doc(db, COLLECTIONS.pages, id));
  const pageData = pageDoc.data();
  
  if (!pageData) return;
  
  // Tüm section'ları sil
  for (const sectionId of pageData.sections || []) {
    await deleteSection(sectionId);
  }
  
  batch.delete(doc(db, COLLECTIONS.pages, id));
  await batch.commit();
}

// ============================================
// SECTION CRUD
// ============================================

/**
 * Yeni section oluştur
 */
export async function createSection(input: SectionCreateInput): Promise<string> {
  const sectionRef = doc(db, COLLECTIONS.sections, generateId());
  
  await updateDoc(sectionRef, {
    id: sectionRef.id,
    pageId: input.pageId,
    name: input.name || 'Yeni Bölüm',
    columns: [],
    settings: input.settings || {},
    order: input.order || 0,
    visibility: { desktop: true, tablet: true, mobile: true },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }).catch(() => {
    return addDoc(collection(db, COLLECTIONS.sections), {
      id: sectionRef.id,
      pageId: input.pageId,
      name: input.name || 'Yeni Bölüm',
      columns: [],
      settings: input.settings || {},
      order: input.order || 0,
      visibility: { desktop: true, tablet: true, mobile: true },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });
  
  // Page'e section ID'sini ekle
  const pageRef = doc(db, COLLECTIONS.pages, input.pageId);
  const pageDoc = await getDoc(pageRef);
  const pageData = pageDoc.data();
  const sections = pageData?.sections || [];
  
  await updateDoc(pageRef, {
    sections: [...sections, sectionRef.id],
    updatedAt: serverTimestamp(),
  });
  
  return sectionRef.id;
}

/**
 * Section getir
 */
export async function getSectionById(id: string): Promise<Section | null> {
  const docRef = doc(db, COLLECTIONS.sections, id);
  const docSnap = await getDoc(docRef);
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
  const batch = writeBatch(db);
  const sectionDoc = await getDoc(doc(db, COLLECTIONS.sections, id));
  const sectionData = sectionDoc.data();
  
  if (!sectionData) return;
  
  // Tüm column'ları sil
  for (const columnId of sectionData.columns || []) {
    await deleteColumn(columnId);
  }
  
  // Page'den section ID'sini çıkar
  const pageRef = doc(db, COLLECTIONS.pages, sectionData.pageId);
  const pageDoc = await getDoc(pageRef);
  const pageData = pageDoc.data();
  const sections = (pageData?.sections || []).filter((sid: string) => sid !== id);
  
  batch.update(pageRef, {
    sections,
    updatedAt: serverTimestamp(),
  });
  
  batch.delete(doc(db, COLLECTIONS.sections, id));
  await batch.commit();
}

// ============================================
// COLUMN CRUD
// ============================================

/**
 * Yeni column oluştur
 */
export async function createColumn(input: ColumnCreateInput): Promise<string> {
  const columnRef = doc(db, COLLECTIONS.columns, generateId());
  
  await updateDoc(columnRef, {
    id: columnRef.id,
    sectionId: input.sectionId,
    width: input.width || 100,
    blocks: [],
    settings: input.settings || {},
    order: input.order || 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }).catch(() => {
    return addDoc(collection(db, COLLECTIONS.columns), {
      id: columnRef.id,
      sectionId: input.sectionId,
      width: input.width || 100,
      blocks: [],
      settings: input.settings || {},
      order: input.order || 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });
  
  // Section'a column ID'sini ekle
  const sectionRef = doc(db, COLLECTIONS.sections, input.sectionId);
  const sectionDoc = await getDoc(sectionRef);
  const sectionData = sectionDoc.data();
  const columns = sectionData?.columns || [];
  
  await updateDoc(sectionRef, {
    columns: [...columns, columnRef.id],
    updatedAt: serverTimestamp(),
  });
  
  return columnRef.id;
}

/**
 * Column getir
 */
export async function getColumnById(id: string): Promise<Column | null> {
  const docRef = doc(db, COLLECTIONS.columns, id);
  const docSnap = await getDoc(docRef);
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
  const batch = writeBatch(db);
  const columnDoc = await getDoc(doc(db, COLLECTIONS.columns, id));
  const columnData = columnDoc.data();
  
  if (!columnData) return;
  
  // Tüm block'ları sil
  for (const blockId of columnData.blocks || []) {
    batch.delete(doc(db, COLLECTIONS.blocks, blockId));
  }
  
  // Section'dan column ID'sini çıkar
  const sectionRef = doc(db, COLLECTIONS.sections, columnData.sectionId);
  const sectionDoc = await getDoc(sectionRef);
  const sectionData = sectionDoc.data();
  const columns = (sectionData?.columns || []).filter((cid: string) => cid !== id);
  
  batch.update(sectionRef, {
    columns,
    updatedAt: serverTimestamp(),
  });
  
  batch.delete(doc(db, COLLECTIONS.columns, id));
  await batch.commit();
}

// ============================================
// BLOCK CRUD
// ============================================

/**
 * Yeni block oluştur
 */
export async function createBlock(input: BlockCreateInput): Promise<string> {
  const blockRef = doc(db, COLLECTIONS.blocks, generateId());
  
  // Varsayılan props'u al
  const { getDefaultBlockProps } = await import('@/types/pageBuilder');
  const defaultProps = getDefaultBlockProps(input.type);
  
  await updateDoc(blockRef, {
    id: blockRef.id,
    columnId: input.columnId,
    type: input.type,
    props: { ...defaultProps, ...input.props },
    order: input.order ?? 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }).catch(() => {
    return addDoc(collection(db, COLLECTIONS.blocks), {
      id: blockRef.id,
      columnId: input.columnId,
      type: input.type,
      props: { ...defaultProps, ...input.props },
      order: input.order ?? 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });
  
  // Column'a block ID'sini ekle
  const columnRef = doc(db, COLLECTIONS.columns, input.columnId);
  const columnDoc = await getDoc(columnRef);
  const columnData = columnDoc.data();
  const blocks = columnData?.blocks || [];
  
  await updateDoc(columnRef, {
    blocks: [...blocks, blockRef.id],
    updatedAt: serverTimestamp(),
  });
  
  return blockRef.id;
}

/**
 * Block getir
 */
export async function getBlockById(id: string): Promise<Block | null> {
  const docRef = doc(db, COLLECTIONS.blocks, id);
  const docSnap = await getDoc(docRef);
  return docToBlock(docSnap);
}

/**
 * Block güncelle
 */
export async function updateBlock(id: string, input: BlockUpdateInput): Promise<void> {
  const docRef = doc(db, COLLECTIONS.blocks, id);
  const blockDoc = await getDoc(docRef);
  const currentProps = blockDoc.data()?.props || {};
  
  await updateDoc(docRef, {
    ...input,
    props: input.props ? { ...currentProps, ...input.props } : currentProps,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Block sil
 */
export async function deleteBlock(id: string): Promise<void> {
  const batch = writeBatch(db);
  const blockDoc = await getDoc(doc(db, COLLECTIONS.blocks, id));
  const blockData = blockDoc.data();
  
  if (!blockData) return;
  
  // Column'dan block ID'sini çıkar
  const columnRef = doc(db, COLLECTIONS.columns, blockData.columnId);
  const columnDoc = await getDoc(columnRef);
  const columnData = columnDoc.data();
  const blocks = (columnData?.blocks || []).filter((bid: string) => bid !== id);
  
  batch.update(columnRef, {
    blocks,
    updatedAt: serverTimestamp(),
  });
  
  batch.delete(doc(db, COLLECTIONS.blocks, id));
  await batch.commit();
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
  const oldColumnRef = doc(db, COLLECTIONS.columns, oldColumnId);
  const oldColumnDoc = await getDoc(oldColumnRef);
  const oldColumnData = oldColumnDoc.data();
  const oldBlocks = (oldColumnData?.blocks || []).filter((bid: string) => bid !== blockId);
  
  batch.update(oldColumnRef, {
    blocks: oldBlocks,
    updatedAt: serverTimestamp(),
  });
  
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
