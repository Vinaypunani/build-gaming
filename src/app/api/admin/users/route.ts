import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

// Helper function to verify admin access
const verifyAdminAccess = async (request: NextRequest) => {
  // Get token from Authorization header
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { isAdmin: false, error: 'Unauthorized: No token provided', status: 401 };
  }

  const token = authHeader.split(' ')[1];
  
  // Verify token
  const jwtSecret = process.env.JWT_SECRET || 'fallback-secret';
  let decoded: JwtPayload;
  
  try {
    // @ts-ignore - TypeScript has issues with the jwt.verify types
    decoded = jwt.verify(token, jwtSecret) as JwtPayload;
  } catch (error) {
    return { isAdmin: false, error: 'Unauthorized: Invalid token', status: 401 };
  }

  // Check if user is admin
  if (decoded.role !== 'ADMIN') {
    return { isAdmin: false, error: 'Forbidden: Admin access required', status: 403 };
  }

  return { isAdmin: true, userId: decoded.id };
};

// GET - fetch all users
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin access
    const { isAdmin, error, status } = await verifyAdminAccess(request);
    
    if (!isAdmin) {
      return NextResponse.json({
        success: false,
        message: error,
      }, { status });
    }

    // Get query parameters for pagination
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Fetch users with pagination
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    // Get total count for pagination
    const totalUsers = await prisma.user.count();
    
    return NextResponse.json({
      success: true,
      message: 'Users retrieved successfully',
      data: {
        users,
        pagination: {
          total: totalUsers,
          page,
          limit,
          pages: Math.ceil(totalUsers / limit),
        },
      },
    });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}

// POST - create a new user
export async function POST(request: NextRequest) {
  try {
    // Verify admin access
    const { isAdmin, error, status } = await verifyAdminAccess(request);
    
    if (!isAdmin) {
      return NextResponse.json({
        success: false,
        message: error,
      }, { status });
    }

    // Parse request body
    const body = await request.json();
    const { name, email, password, role } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Name, email, and password are required',
      }, { status: 400 });
    }

    // Check if email is already in use
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: 'Email is already in use',
      }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role === 'ADMIN' ? 'ADMIN' : 'USER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
} 