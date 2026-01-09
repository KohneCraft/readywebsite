import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Form verilerini object'e dönüştür
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    // Firestore'a kaydet
    const messagesRef = collection(db, 'contact-messages');
    await addDoc(messagesRef, {
      ...data,
      createdAt: serverTimestamp(),
      read: false,
    });

    logger.api.info('Form gönderildi', { fields: Object.keys(data) });

    return NextResponse.json(
      { success: true, message: 'Form başarıyla gönderildi' },
      { status: 200 }
    );
  } catch (error) {
    logger.api.error('Form gönderme hatası', error);
    
    return NextResponse.json(
      { success: false, message: 'Form gönderilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
