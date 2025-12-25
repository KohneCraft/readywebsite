// ============================================
// Vav Yapı - Team API Route
// CRUD operations for team members
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

// Force dynamic rendering - prevent build-time Firebase initialization
export const dynamic = 'force-dynamic';

// GET /api/team - Get all team members
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active');

    const constraints: any[] = [];

    if (activeOnly === 'true') {
      constraints.push(where('isActive', '==', true));
    }

    constraints.push(orderBy('order', 'asc'));

    const q = query(collection(db, 'team'), ...constraints);
    const snapshot = await getDocs(q);

    const members = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || null,
    }));

    return NextResponse.json({
      success: true,
      data: members,
      count: members.length,
    });
  } catch (error) {
    console.error('Error fetching team:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

// POST /api/team - Add new team member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.position?.tr) {
      return NextResponse.json(
        { success: false, error: 'Name and position are required' },
        { status: 400 }
      );
    }

    const memberData = {
      ...body,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, 'team'), memberData);

    return NextResponse.json({
      success: true,
      data: { id: docRef.id, ...memberData },
      message: 'Team member added successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding team member:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add team member' },
      { status: 500 }
    );
  }
}
