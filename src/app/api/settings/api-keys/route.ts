import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// ============================================
// API Keys Settings API
// Manages translation, maps, and other API keys
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

// GET - Retrieve API settings (keys masked)
export async function GET() {
  try {
    const docRef = doc(db, SETTINGS_DOC, API_KEYS_DOC);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return NextResponse.json({
        translationProvider: 'none',
        hasGoogleTranslateKey: false,
        hasDeeplKey: false,
        mapProvider: 'none',
        hasGoogleMapsKey: false,
      });
    }

    const data = docSnap.data() as ApiKeysSettings;
    
    return NextResponse.json({
      translationProvider: data.translationProvider || 'none',
      hasGoogleTranslateKey: !!data.googleTranslateKey,
      hasDeeplKey: !!data.deeplApiKey,
      mapProvider: data.mapProvider || 'none',
      hasGoogleMapsKey: !!data.googleMapsKey,
    });
  } catch (error) {
    console.error('Error fetching API keys settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PUT - Update API settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      translationProvider,
      googleTranslateKey,
      deeplApiKey,
      mapProvider,
      googleMapsKey,
    } = body;

    const docRef = doc(db, SETTINGS_DOC, API_KEYS_DOC);
    const docSnap = await getDoc(docRef);
    const existingData = docSnap.exists() ? docSnap.data() as ApiKeysSettings : {};

    // Build update object - only update provided fields
    const updateData: Partial<ApiKeysSettings> = {
      ...existingData,
      updatedAt: new Date().toISOString(),
    };

    // Translation settings
    if (translationProvider !== undefined) {
      updateData.translationProvider = translationProvider;
    }
    if (googleTranslateKey) {
      updateData.googleTranslateKey = googleTranslateKey;
    }
    if (deeplApiKey) {
      updateData.deeplApiKey = deeplApiKey;
    }

    // Map settings
    if (mapProvider !== undefined) {
      updateData.mapProvider = mapProvider;
    }
    if (googleMapsKey) {
      updateData.googleMapsKey = googleMapsKey;
    }

    await setDoc(docRef, updateData);

    return NextResponse.json({
      success: true,
      translationProvider: updateData.translationProvider,
      hasGoogleTranslateKey: !!updateData.googleTranslateKey,
      hasDeeplKey: !!updateData.deeplApiKey,
      mapProvider: updateData.mapProvider,
      hasGoogleMapsKey: !!updateData.googleMapsKey,
    });
  } catch (error) {
    console.error('Error updating API keys settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

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
