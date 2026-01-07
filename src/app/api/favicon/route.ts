import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/firebase/firestore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Logo URL'ini favicon olarak döndürür
 * Logo otomatik olarak favicon görevi görür
 */
export async function GET() {
  try {
    const settings = await getSiteSettings();
    // Logo URL'ini favicon olarak kullan
    const logoUrl = settings?.logo?.light?.url || settings?.logo?.favicon?.url;

    return NextResponse.json({ 
      faviconUrl: logoUrl || null 
    }, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Favicon URL fetch error:', error);
    return NextResponse.json({ faviconUrl: null }, { status: 500 });
  }
}
