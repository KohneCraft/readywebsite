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
    const q = collection(db, 'projects');
    const constraints: Array<ReturnType<typeof where> | ReturnType<typeof orderBy> | ReturnType<typeof firestoreLimit>> = [];

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

    // Default limit to prevent large queries
    const limitValue = limitParam ? Math.min(parseInt(limitParam, 10), 100) : 50;
    constraints.push(firestoreLimit(limitValue));

    const queryRef = query(q, ...constraints);
    const snapshot = await getDocs(queryRef);

    const projects = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
        startDate: data.startDate?.toDate?.()?.toISOString() || null,
        endDate: data.endDate?.toDate?.()?.toISOString() || null,
      };
    });

    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch projects';
    return NextResponse.json(
      { success: false, error: errorMessage },
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

    // Validate date formats
    let startDate: Timestamp | null = null;
    let endDate: Timestamp | null = null;
    
    if (body.startDate) {
      try {
        startDate = Timestamp.fromDate(new Date(body.startDate));
      } catch {
        return NextResponse.json(
          { success: false, error: 'Invalid startDate format' },
          { status: 400 }
        );
      }
    }
    
    if (body.endDate) {
      try {
        endDate = Timestamp.fromDate(new Date(body.endDate));
      } catch {
        return NextResponse.json(
          { success: false, error: 'Invalid endDate format' },
          { status: 400 }
        );
      }
    }

    const projectData = {
      ...body,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      startDate,
      endDate,
    };

    const docRef = await addDoc(collection(db, 'projects'), projectData);

    return NextResponse.json({
      success: true,
      data: { id: docRef.id },
      message: 'Project created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create project';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
