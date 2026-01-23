import { db } from '@/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

// ============================================
// API Keys Helper Functions
// Centralized API key management utilities
// ============================================

interface ApiKeysSettings {
  // Translation API
  translationProvider: 'google' | 'deepl' | 'none';
  googleTranslateKey?: string;
  deeplApiKey?: string;
  
  // Maps API
  mapProvider: 'google' | 'openstreetmap' | 'none';
  googleMapsKey?: string;
  
  // Future APIs can be added here
  updatedAt?: string;
}

const SETTINGS_DOC = 'settings';
const API_KEYS_DOC = 'apiKeys';

// Helper function to get API key for translation (used by translate route)
export async function getTranslationApiKey(): Promise<{
  provider: 'google' | 'deepl' | 'none';
  apiKey?: string;
}> {
  try {
    const docRef = doc(db, SETTINGS_DOC, API_KEYS_DOC);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return { provider: 'none' };
    }

    const data = docSnap.data() as ApiKeysSettings;
    const provider = data.translationProvider || 'none';

    if (provider === 'google' && data.googleTranslateKey) {
      return { provider: 'google', apiKey: data.googleTranslateKey };
    }
    if (provider === 'deepl' && data.deeplApiKey) {
      return { provider: 'deepl', apiKey: data.deeplApiKey };
    }

    return { provider: 'none' };
  } catch (error) {
    console.error('Error getting translation API key:', error);
    return { provider: 'none' };
  }
}

// Helper function to get Google Maps API key
export async function getGoogleMapsApiKey(): Promise<string | null> {
  try {
    const docRef = doc(db, SETTINGS_DOC, API_KEYS_DOC);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data() as ApiKeysSettings;
    
    if (data.mapProvider === 'google' && data.googleMapsKey) {
      return data.googleMapsKey;
    }

    return null;
  } catch (error) {
    console.error('Error getting Google Maps API key:', error);
    return null;
  }
}

// Helper function to get map provider
export async function getMapProvider(): Promise<'google' | 'openstreetmap' | 'none'> {
  try {
    const docRef = doc(db, SETTINGS_DOC, API_KEYS_DOC);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return 'none';
    }

    const data = docSnap.data() as ApiKeysSettings;
    return data.mapProvider || 'none';
  } catch (error) {
    console.error('Error getting map provider:', error);
    return 'none';
  }
}

// Helper function to get all API keys settings
export async function getApiKeysSettings(): Promise<ApiKeysSettings | null> {
  try {
    const docRef = doc(db, SETTINGS_DOC, API_KEYS_DOC);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }

    return docSnap.data() as ApiKeysSettings;
  } catch (error) {
    console.error('Error getting API keys settings:', error);
    return null;
  }
}
