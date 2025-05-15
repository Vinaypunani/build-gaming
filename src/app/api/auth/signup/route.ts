import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { SignupCredentials } from '@/types/auth';

// Admin registration secret key - must match the one in the SignupForm component
const ADMIN_SECRET_KEY = "Build@Gaming2024";

export async function POST(request: NextRequest) {
  try {
    const body: SignupCredentials & { secretKey?: string } = await request.json();
    const { name, email, password, confirmPassword, secretKey } = body;
    
    console.log(`Signup attempt for email: ${email}`);

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      console.log('Missing required fields for signup');
      return NextResponse.json({
        success: false,
        message: 'Missing required fields',
      }, { status: 400 });
    }

    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return NextResponse.json({
        success: false,
        message: 'Passwords do not match',
      }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log(`User already exists with email: ${email}`);
      return NextResponse.json({
        success: false,
        message: 'User with this email already exists',
      }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    // Determine role based on secret key
    const role = secretKey === ADMIN_SECRET_KEY ? 'ADMIN' : 'USER';
    
    if (role === 'ADMIN') {
      console.log(`Creating ADMIN user with email: ${email}`);
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });
    
    console.log(`User created successfully with ID: ${user.id} and role: ${user.role}`);

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: user,
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
} 