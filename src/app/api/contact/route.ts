// ============================================
// Vav Yapı - Contact API Route
// Handle contact form submissions
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  orderBy, 
  limit as firestoreLimit,
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

// GET /api/contact - Get all contact messages (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limitParam = searchParams.get('limit');

    // Build query
    let q = collection(db, 'contacts');
    const constraints: any[] = [];

    if (status && status !== 'all') {
      constraints.push(where('status', '==', status));
    }

    constraints.push(orderBy('createdAt', 'desc'));

    if (limitParam) {
      constraints.push(firestoreLimit(parseInt(limitParam)));
    }

    const queryRef = query(q, ...constraints);
    const snapshot = await getDocs(queryRef);

    const contacts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
    }));

    return NextResponse.json({
      success: true,
      data: contacts,
      count: contacts.length,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

// POST /api/contact - Submit contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const contactData = {
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      subject: body.subject || '',
      message: body.message,
      status: 'new', // new, read, replied, archived
      source: 'website',
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, 'contacts'), contactData);

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to user

    return NextResponse.json({
      success: true,
      data: { id: docRef.id },
      message: 'Message sent successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
