import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'

// Validate environment variables
const requiredEnvVars = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
} as const;

// Check for missing environment variables in development
if (process.env.NODE_ENV === 'development') {
  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => `NEXT_PUBLIC_FIREBASE_${key.toUpperCase()}`);
  
  if (missingVars.length > 0) {
    console.warn('⚠️ Missing Firebase environment variables:', missingVars.join(', '));
  }
}

const firebaseConfig = {
  apiKey: requiredEnvVars.apiKey || '',
  authDomain: requiredEnvVars.authDomain || '',
  projectId: requiredEnvVars.projectId || '',
  storageBucket: requiredEnvVars.storageBucket || '',
  messagingSenderId: requiredEnvVars.messagingSenderId || '',
  appId: requiredEnvVars.appId || '',
};

// Initialize Firebase app (singleton pattern)
let app: FirebaseApp | undefined;
let authInstance: Auth | undefined;
let dbInstance: Firestore | undefined;
let storageInstance: FirebaseStorage | undefined;

function initializeFirebase() {
  if (app) {
    // Already initialized
    return;
  }
  
  try {
    app = getApps().length === 0
      ? initializeApp(firebaseConfig)
      : getApp();
    
    authInstance = getAuth(app);
    dbInstance = getFirestore(app);
    storageInstance = getStorage(app);
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
    // Don't throw, allow graceful degradation
  }
}

// Initialize Firebase (works for both client and server)
initializeFirebase();

// Export Firebase services with lazy initialization
export const auth: Auth = (() => {
  if (!authInstance) initializeFirebase();
  return authInstance as Auth;
})();

export const db: Firestore = (() => {
  if (!dbInstance) initializeFirebase();
  return dbInstance as Firestore;
})();

export const storage: FirebaseStorage = (() => {
  if (!storageInstance) initializeFirebase();
  return storageInstance as FirebaseStorage;
})();

export default (() => {
  if (!app) initializeFirebase();
  return app;
})();
