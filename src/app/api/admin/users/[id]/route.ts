import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

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

// GET - get a single user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;
    
    // Verify admin access
    const { isAdmin, error, status } = await verifyAdminAccess(request);
    
    if (!isAdmin) {
      return NextResponse.json({
        success: false,
        message: error,
      }, { status });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: userId },
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

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });

  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}

// PUT - update a user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;
    
    // Verify admin access
    const { isAdmin, error, status, userId: adminId } = await verifyAdminAccess(request);
    
    if (!isAdmin) {
      return NextResponse.json({
        success: false,
        message: error,
      }, { status });
    }

    // Parse body
    const body = await request.json();
    const { name, email, role, password } = body;

    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
      }, { status: 404 });
    }
    
    // Prevent admin from demoting themselves
    if (userId === adminId && role && role !== 'ADMIN') {
      return NextResponse.json({
        success: false,
        message: 'You cannot demote yourself from admin role',
      }, { status: 400 });
    }

    // Create update data
    const updateData: any = {};
    
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (password) {
      // Hash password if provided
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
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
      message: 'User updated successfully',
      data: updatedUser,
    });

  } catch (error) {
    console.error('Update user error:', error);
    
    // Check for Prisma unique constraint error
    if ((error as any)?.code === 'P2002') {
      return NextResponse.json({
        success: false,
        message: 'Email is already in use',
      }, { status: 409 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}

// DELETE - delete a user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;
    
    // Verify admin access
    const { isAdmin, error, status, userId: adminId } = await verifyAdminAccess(request);
    
    if (!isAdmin) {
      return NextResponse.json({
        success: false,
        message: error,
      }, { status });
    }

    // Prevent admin from deleting themselves
    if (userId === adminId) {
      return NextResponse.json({
        success: false,
        message: 'You cannot delete your own account',
      }, { status: 400 });
    }

    // Delete user
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });

  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
} 