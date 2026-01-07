import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/firebase/firestore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Favicon URL'ini Firebase'den döndürür
 * Edge runtime ile uyumlu değil, Node.js runtime kullanır
 */
export async function GET() {
  try {
    const settings = await getSiteSettings();
    const faviconUrl = settings?.logo?.favicon?.url;

    return NextResponse.json({ 
      faviconUrl: faviconUrl || null 
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
