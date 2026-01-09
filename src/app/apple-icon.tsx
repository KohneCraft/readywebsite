import { ImageResponse } from 'next/og';

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
    // API route'undan favicon URL'ini al
    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${apiUrl}/api/favicon`, {
      cache: 'no-store',
    });

    if (response.ok) {
      const data = await response.json();
      const faviconUrl = data?.faviconUrl;

      if (faviconUrl) {
        const iconResponse = await fetch(faviconUrl);
        if (iconResponse.ok) {
          const buffer = await iconResponse.arrayBuffer();
          return new Response(buffer, {
            headers: {
              'Content-Type': 'image/png',
              'Cache-Control': 'no-store, must-revalidate',
            },
          });
        }
      }
    }

    // Fallback: Şeffaf icon oluştur
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
          }}
        >
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error('Apple icon generation error:', error);
    // Hata durumunda şeffaf icon döndür
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
          }}
        >
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
