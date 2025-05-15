import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { name } = await request.json();
  const category = await prisma.category.update({
    where: { id: params.id },
    data: { name },
  });
  return NextResponse.json(category);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await prisma.category.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
} 