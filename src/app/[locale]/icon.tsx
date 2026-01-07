import { ImageResponse } from 'next/og';
import { getSiteSettings } from '@/lib/firebase/firestore';

// Route segment config
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Bu route her locale için ayrı çalışır
export default async function Icon() {
  try {
    const settings = await getSiteSettings();
    // Önce browser favicon'u kontrol et, yoksa logo kullan
    const iconUrl = (settings as any).browserFavicon || settings?.logo?.light?.url;

    if (iconUrl) {
      const response = await fetch(iconUrl);
      const buffer = await response.arrayBuffer();
      return new Response(buffer, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }

    // Fallback: Varsayılan icon oluştur
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 24,
            background: '#2563eb',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          P
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error('Icon generation error:', error);
    // Fallback icon
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 24,
            background: '#2563eb',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          P
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
