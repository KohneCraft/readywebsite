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
    console.log('API Keys PUT - Received body:', JSON.stringify(body, null, 2));
    
    const {
      translationProvider,
      googleTranslateKey,
      deeplApiKey,
      mapProvider,
      googleMapsKey,
    } = body;

    console.log('API Keys PUT - Connecting to Firestore...');
    const docRef = doc(db, SETTINGS_DOC, API_KEYS_DOC);
    
    console.log('API Keys PUT - Fetching existing document...');
    const docSnap = await getDoc(docRef);
    const existingData = docSnap.exists() ? docSnap.data() as ApiKeysSettings : {};
    console.log('API Keys PUT - Existing data found:', docSnap.exists());

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

    console.log('API Keys PUT - Saving to Firestore...', updateData);
    await setDoc(docRef, updateData);
    console.log('API Keys PUT - Save successful');

    return NextResponse.json({
      success: true,
      translationProvider: updateData.translationProvider,
      hasGoogleTranslateKey: !!updateData.googleTranslateKey,
      hasDeeplKey: !!updateData.deeplApiKey,
      mapProvider: updateData.mapProvider,
      hasGoogleMapsKey: !!updateData.googleMapsKey,
    });
  } catch (error: any) {
    console.error('Error updating API keys settings:', error);
    console.error('Error details:', {
      message: error?.message,
      code: error?.code,
      stack: error?.stack,
    });
    return NextResponse.json(
      { error: 'Failed to update settings', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
