// ============================================
// Vav Yapı - Settings API Route
// Get and update site settings
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { logger } from '@/lib/logger';

// Force dynamic rendering - prevent build-time Firebase initialization
export const dynamic = 'force-dynamic';

const SETTINGS_DOC_ID = 'site-settings';

// GET /api/settings - Get site settings
export async function GET() {
  try {
    const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // Return default settings
      return NextResponse.json({
        success: true,
        data: {
          company: {
            name: 'Vav Yapı',
            slogan: 'Geleceği İnşa Ediyoruz',
          },
          contact: {
            email: 'info@vavyapi.com',
            phone: '+90 212 123 4567',
            address: 'İstanbul, Türkiye',
          },
          social: {},
          seo: {
            title: 'Vav Yapı - İnşaat ve Taahhüt',
            description: 'Modern ve sürdürülebilir inşaat çözümleri',
          },
          maintenance: {
            enabled: false,
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: docSnap.data(),
    });
  } catch (error) {
    logger.api.error('Error fetching settings', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PUT /api/settings - Update site settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const docRef = doc(db, 'settings', SETTINGS_DOC_ID);

    const updateData = {
      ...body,
      updatedAt: Timestamp.now(),
    };

    await setDoc(docRef, updateData, { merge: true });

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
    });
  } catch (error) {
    logger.api.error('Error updating settings', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
