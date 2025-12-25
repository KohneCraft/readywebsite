// ============================================
// Vav Yapı - Partners API Route
// CRUD operations for partners/references
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  orderBy,
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

// GET /api/partners - Get all partners
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const activeOnly = searchParams.get('active');

    const constraints: any[] = [];

    if (category && category !== 'all') {
      constraints.push(where('category', '==', category));
    }

    if (activeOnly === 'true') {
      constraints.push(where('isActive', '==', true));
    }

    constraints.push(orderBy('order', 'asc'));

    const q = query(collection(db, 'partners'), ...constraints);
    const snapshot = await getDocs(q);

    const partners = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || null,
    }));

    return NextResponse.json({
      success: true,
      data: partners,
      count: partners.length,
    });
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch partners' },
      { status: 500 }
    );
  }
}

// POST /api/partners - Add new partner
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.logo) {
      return NextResponse.json(
        { success: false, error: 'Name and logo are required' },
        { status: 400 }
      );
    }

    const partnerData = {
      ...body,
      category: body.category || 'partner',
      isActive: body.isActive ?? true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, 'partners'), partnerData);

    return NextResponse.json({
      success: true,
      data: { id: docRef.id, ...partnerData },
      message: 'Partner added successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding partner:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add partner' },
      { status: 500 }
    );
  }
}
