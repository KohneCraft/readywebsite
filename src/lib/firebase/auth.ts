// ============================================
// Vav Yapı - Firebase Auth Helper Functions
// Authentication + Firestore role management
// ============================================

import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
  UserCredential,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';
import type { User, UserRole, AuthUser, AuthState } from '@/types';

// ============================================
// AUTH FUNCTIONS
// ============================================

/**
 * E-posta ve şifre ile giriş
 */
export async function signIn(
  email: string,
  password: string
): Promise<{ user: FirebaseUser; profile: User }> {
  const credential: UserCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Firestore'dan kullanıcı profilini al
  const profile = await getUserProfile(credential.user.uid);
  
  if (!profile) {
    throw new Error('Kullanıcı profili bulunamadı');
  }
  
  if (!profile.active) {
    await firebaseSignOut(auth);
    throw new Error('Hesabınız devre dışı bırakılmış');
  }

  // Son giriş zamanını güncelle
  await updateLastLoginTime(credential.user.uid);

  return {
    user: credential.user,
    profile,
  };
}

/**
 * Çıkış yap
 */
export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

/**
 * Şifre sıfırlama e-postası gönder
 */
export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Auth state değişikliklerini dinle
 */
export function onAuthStateChanged(
  callback: (user: FirebaseUser | null) => void
): () => void {
  return firebaseOnAuthStateChanged(auth, callback);
}

/**
 * Mevcut kullanıcıyı al
 */
export function getCurrentUser(): FirebaseUser | null {
  return auth.currentUser;
}

/**
 * Mevcut kullanıcı ID'sini al
 */
export function getCurrentUserId(): string | null {
  return auth.currentUser?.uid || null;
}

// ============================================
// USER PROFILE FUNCTIONS
// ============================================

/**
 * Firestore'dan kullanıcı profili al
 */
export async function getUserProfile(uid: string): Promise<User | null> {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return null;
  }
  
  const data = docSnap.data();
  return {
    id: uid,
    email: data.email,
    displayName: data.displayName,
    photoURL: data.photoURL,
    role: data.role,
    active: data.active,
    lastLoginAt: data.lastLoginAt?.toDate(),
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
    createdBy: data.createdBy,
  };
}

/**
 * Kullanıcı profili oluştur (ilk kayıt için)
 */
export async function createUserProfile(
  uid: string,
  data: {
    email: string;
    displayName: string;
    role: UserRole;
    createdBy?: string;
  }
): Promise<void> {
  const docRef = doc(db, 'users', uid);
  await setDoc(docRef, {
    ...data,
    active: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/**
 * Son giriş zamanını güncelle
 */
async function updateLastLoginTime(uid: string): Promise<void> {
  const docRef = doc(db, 'users', uid);
  await setDoc(
    docRef,
    {
      lastLoginAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Kullanıcı profil fotoğrafını güncelle
 */
export async function updateUserPhoto(
  uid: string,
  photoURL: string
): Promise<void> {
  // Firebase Auth güncelle
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { photoURL });
  }
  
  // Firestore güncelle
  const docRef = doc(db, 'users', uid);
  await setDoc(
    docRef,
    {
      photoURL,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Kullanıcı adını güncelle
 */
export async function updateUserDisplayName(
  uid: string,
  displayName: string
): Promise<void> {
  // Firebase Auth güncelle
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName });
  }
  
  // Firestore güncelle
  const docRef = doc(db, 'users', uid);
  await setDoc(
    docRef,
    {
      displayName,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

// ============================================
// ROLE & PERMISSION FUNCTIONS
// ============================================

/**
 * Kullanıcı rolünü al
 */
export async function getUserRole(uid: string): Promise<UserRole | null> {
  const profile = await getUserProfile(uid);
  return profile?.role || null;
}

/**
 * Admin mi kontrol et
 */
export async function isAdmin(uid: string): Promise<boolean> {
  const role = await getUserRole(uid);
  return role === 'admin' || role === 'superadmin';
}

/**
 * SuperAdmin mi kontrol et
 */
export async function isSuperAdmin(uid: string): Promise<boolean> {
  const role = await getUserRole(uid);
  return role === 'superadmin';
}

/**
 * Belirli bir izne sahip mi kontrol et
 */
export async function hasPermission(
  uid: string,
  permission: string
): Promise<boolean> {
  const role = await getUserRole(uid);
  if (!role) return false;
  
  const { ROLE_PERMISSIONS } = await import('@/types');
  return ROLE_PERMISSIONS[role]?.includes(permission) || false;
}

// ============================================
// AUTH CONTEXT HELPERS
// ============================================

/**
 * Firebase User'ı AuthUser'a çevir
 */
export function firebaseUserToAuthUser(user: FirebaseUser): AuthUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
}

/**
 * Auth state'i al (user + profile)
 */
export async function getAuthState(): Promise<AuthState> {
  const user = auth.currentUser;
  
  if (!user) {
    return {
      user: null,
      userProfile: null,
      loading: false,
      error: null,
    };
  }
  
  try {
    const profile = await getUserProfile(user.uid);
    return {
      user: firebaseUserToAuthUser(user),
      userProfile: profile,
      loading: false,
      error: null,
    };
  } catch (error) {
    return {
      user: firebaseUserToAuthUser(user),
      userProfile: null,
      loading: false,
      error: error instanceof Error ? error.message : 'Profil yüklenemedi',
    };
  }
}

// ============================================
// ADMIN MIDDLEWARE HELPERS
// ============================================

/**
 * Admin erişimi kontrol et
 * Route protection için kullanılır
 */
export async function checkAdminAccess(): Promise<{
  authorized: boolean;
  user: User | null;
  error?: string;
}> {
  const currentUser = auth.currentUser;
  
  if (!currentUser) {
    return {
      authorized: false,
      user: null,
      error: 'Oturum açmanız gerekiyor',
    };
  }
  
  const profile = await getUserProfile(currentUser.uid);
  
  if (!profile) {
    return {
      authorized: false,
      user: null,
      error: 'Kullanıcı profili bulunamadı',
    };
  }
  
  if (!profile.active) {
    return {
      authorized: false,
      user: null,
      error: 'Hesabınız devre dışı bırakılmış',
    };
  }
  
  const isAuthorized = ['admin', 'superadmin', 'editor'].includes(profile.role);
  
  if (!isAuthorized) {
    return {
      authorized: false,
      user: profile,
      error: 'Bu sayfaya erişim yetkiniz yok',
    };
  }
  
  return {
    authorized: true,
    user: profile,
  };
}

/**
 * Belirli bir rol için erişim kontrol et
 */
export async function checkRoleAccess(
  requiredRole: UserRole
): Promise<{
  authorized: boolean;
  user: User | null;
  error?: string;
}> {
  const { authorized, user, error } = await checkAdminAccess();
  
  if (!authorized || !user) {
    return { authorized, user, error };
  }
  
  const roleHierarchy: UserRole[] = ['editor', 'admin', 'superadmin'];
  const userRoleIndex = roleHierarchy.indexOf(user.role);
  const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
  
  if (userRoleIndex < requiredRoleIndex) {
    return {
      authorized: false,
      user,
      error: 'Bu işlem için yetkiniz yok',
    };
  }
  
  return { authorized: true, user };
}
