// ============================================
// Vav Yapı - Projects API Route
// REST API for project operations
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit as firestoreLimit,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

// Force dynamic rendering - prevent build-time Firebase initialization
export const dynamic = 'force-dynamic';

// GET /api/projects - Get all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const limitParam = searchParams.get('limit');
    const featured = searchParams.get('featured');

    // Build query
    let q = collection(db, 'projects');
    const constraints: any[] = [];

    if (status && status !== 'all') {
      constraints.push(where('status', '==', status));
    }

    if (category && category !== 'all') {
      constraints.push(where('category', '==', category));
    }

    if (featured === 'true') {
      constraints.push(where('isFeatured', '==', true));
    }

    constraints.push(orderBy('createdAt', 'desc'));

    if (limitParam) {
      constraints.push(firestoreLimit(parseInt(limitParam)));
    }

    const queryRef = query(q, ...constraints);
    const snapshot = await getDocs(queryRef);

    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || null,
      startDate: doc.data().startDate?.toDate?.()?.toISOString() || null,
      endDate: doc.data().endDate?.toDate?.()?.toISOString() || null,
    }));

    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title?.tr || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Title and category are required' },
        { status: 400 }
      );
    }

    const projectData = {
      ...body,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      startDate: body.startDate ? Timestamp.fromDate(new Date(body.startDate)) : null,
      endDate: body.endDate ? Timestamp.fromDate(new Date(body.endDate)) : null,
    };

    const docRef = await addDoc(collection(db, 'projects'), projectData);

    return NextResponse.json({
      success: true,
      data: { id: docRef.id, ...projectData },
      message: 'Project created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
