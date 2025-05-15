import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all categories
export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}

// CREATE a category
export async function POST(request: NextRequest) {
  const { name } = await request.json();
  if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 });
  const category = await prisma.category.create({ data: { name } });
  return NextResponse.json(category);
} 