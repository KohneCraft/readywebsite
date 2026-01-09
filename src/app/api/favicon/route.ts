import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/firebase/firestore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Favicon URL'ini döndürür
 * Önce browserFavicon, yoksa logo URL'ini kullanır
 */
export async function GET() {
  try {
    const settings = await getSiteSettings();
    // Önce browserFavicon kontrol et, yoksa logo kullan
    const faviconUrl = (settings as any).browserFavicon || settings?.logo?.light?.url || settings?.logo?.favicon?.url || null;

    return NextResponse.json({
      faviconUrl
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
