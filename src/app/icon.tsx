import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default async function Icon() {
  try {
    // API route'undan favicon URL'ini al (Firebase Node.js runtime kullanır)
    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${apiUrl}/api/favicon`, {
      cache: 'no-store',
    });
    
    if (response.ok) {
      const data = await response.json();
      const faviconUrl = data?.faviconUrl;
      
      // Eğer admin panelden favicon yüklenmişse, onu fetch et
      if (faviconUrl) {
        const iconResponse = await fetch(faviconUrl);
        const buffer = await iconResponse.arrayBuffer();
        return new Response(buffer, {
          headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'no-store, must-revalidate',
          },
        });
      }
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
    // Hata durumunda basit bir icon döndür
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
