import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

// ============================================
// Maps API Key Endpoint
// Returns Google Maps API key for client-side use
// ============================================

interface ApiKeysSettings {
  mapProvider: 'google' | 'openstreetmap' | 'none';
  googleMapsKey?: string;
}

// GET - Retrieve Google Maps API key
export async function GET() {
  try {
    const docRef = doc(db, 'settings', 'apiKeys');
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return NextResponse.json({
        mapProvider: 'none',
        googleMapsKey: null,
      });
    }

    const data = docSnap.data() as ApiKeysSettings;
    
    return NextResponse.json({
      mapProvider: data.mapProvider || 'none',
      googleMapsKey: data.mapProvider === 'google' ? (data.googleMapsKey || null) : null,
    });
  } catch (error) {
    console.error('Error fetching maps key:', error);
    return NextResponse.json(
      { error: 'Failed to fetch maps key', mapProvider: 'none', googleMapsKey: null },
      { status: 500 }
    );
  }
}
