/**
 * Contact Form API Route
 * 
 * Form verilerini Firestore'a kaydeder
 * PageBuilder FormBlock bu endpoint'i kullanır
 */

import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { logger } from '@/lib/logger';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    // Form data veya JSON olarak al
    let data: Record<string, any> = {};
    
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        data[key] = value;
      });
    }

    // Zorunlu alanları kontrol et - en az bir alan olmalı
    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: 'Form verisi boş olamaz' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Firestore'a kaydet
    const messageData = {
      ...data,
      createdAt: serverTimestamp(),
      read: false,
      source: 'form', // PageBuilder formundan geldi
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    await addDoc(collection(db, 'contact-messages'), messageData);

    logger.api.info('Yeni iletişim mesajı alındı', { 
      fields: Object.keys(data),
      email: data.email || data.Email || 'N/A' 
    });

    return NextResponse.json(
      { success: true, message: 'Mesajınız başarıyla gönderildi' },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    logger.api.error('Contact form hatası', error);
    return NextResponse.json(
      { error: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
