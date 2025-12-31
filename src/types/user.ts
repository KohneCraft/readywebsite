// ============================================
// Vav Yapı - User Types
// Firestore Collection: users
// Firebase Auth entegrasyonu
// ============================================

export type UserRole = 'superadmin' | 'admin' | 'editor';

/**
 * Kullanıcı profili
 * Firestore document yapısı
 * Document ID = Firebase Auth UID
 */
export interface User {
  id: string; // Firebase Auth UID
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  
  // Durum
  active: boolean;
  
  // Aktivite
  lastLoginAt?: Date;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string; // İlk admin için undefined
}

/**
 * Kullanıcı oluşturma input
 */
export interface UserCreateInput {
  email: string;
  displayName: string;
  role: UserRole;
  password: string; // Firebase Auth için
}

/**
 * Kullanıcı güncelleme input
 */
export interface UserUpdateInput {
  displayName?: string;
  photoURL?: string;
  role?: UserRole;
  active?: boolean;
}

/**
 * Auth context için kullanıcı bilgisi
 */
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

/**
 * Auth state
 */
export interface AuthState {
  user: AuthUser | null;
  userProfile: User | null;
  loading: boolean;
  error: string | null;
}

/**
 * Rol izinleri
 */
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  superadmin: [
    'projects.read',
    'projects.create',
    'projects.update',
    'projects.delete',
    'contacts.read',
    'contacts.update',
    'contacts.delete',
    'settings.read',
    'settings.update',
    'users.read',
    'users.create',
    'users.update',
    'users.delete',
  ],
  admin: [
    'projects.read',
    'projects.create',
    'projects.update',
    'projects.delete',
    'contacts.read',
    'contacts.update',
    'contacts.delete',
    'settings.read',
    'settings.update',
  ],
  editor: [
    'projects.read',
    'projects.create',
    'projects.update',
    'contacts.read',
  ],
};

/**
 * Rol etiketleri (UI için)
 */
export const ROLE_LABELS: Record<UserRole, { tr: string; en: string; de: string; fr: string; color: string }> = {
  superadmin: {
    tr: 'Süper Admin',
    en: 'Super Admin',
    de: 'Super Admin',
    fr: 'Super Admin',
    color: 'red',
  },
  admin: {
    tr: 'Admin',
    en: 'Admin',
    de: 'Admin',
    fr: 'Admin',
    color: 'blue',
  },
  editor: {
    tr: 'Editör',
    en: 'Editor',
    de: 'Redakteur',
    fr: 'Éditeur',
    color: 'green',
  },
};

/**
 * İzin kontrolü yardımcı fonksiyonu
 */
export function hasPermission(role: UserRole, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/**
 * Minimum rol kontrolü
 */
export function hasMinRole(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy: UserRole[] = ['editor', 'admin', 'superadmin'];
  const userIndex = roleHierarchy.indexOf(userRole);
  const requiredIndex = roleHierarchy.indexOf(requiredRole);
  return userIndex >= requiredIndex;
}

/**
 * Aktivite log entry
 */
export interface ActivityLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string; // 'project.create', 'settings.update', etc.
  resourceType: 'project' | 'contact' | 'settings' | 'user';
  resourceId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}
