import { ImageResponse } from 'next/og';
import { getSiteSettings } from '@/lib/firebase/firestore';

// Route segment config
export const runtime = 'edge';
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Image generation
export default async function AppleIcon() {
  try {
    const settings = await getSiteSettings();
    const faviconUrl = settings?.logo?.favicon?.url;

    // Eğer admin panelden favicon yüklenmişse, onu redirect et
    if (faviconUrl) {
      const response = await fetch(faviconUrl);
      const buffer = await response.arrayBuffer();
      return new Response(buffer, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    // Fallback: Varsayılan icon oluştur
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 96,
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
    // Hata durumunda basit bir icon döndür
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 96,
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
