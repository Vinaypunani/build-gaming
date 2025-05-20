import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET order details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      items: { include: { product: true } },
    },
  });
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  return NextResponse.json(order);
}

// UPDATE order status
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status } = await request.json();
  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });
  return NextResponse.json(order);
}

// DELETE order
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.order.delete({ where: { id } });
  return NextResponse.json({ success: true });
}