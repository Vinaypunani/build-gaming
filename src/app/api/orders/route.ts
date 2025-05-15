import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all orders
export async function GET() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      items: { include: { product: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(orders);
}

// CREATE an order
export async function POST(request: NextRequest) {
  try {
    const { userId, address, city, state, pincode, phone, payment, items } = await request.json();
    if (!userId || !address || !city || !state || !pincode || !phone || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // Calculate total
    const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const order = await prisma.order.create({
      data: {
        userId,
        address,
        city,
        state,
        pincode,
        phone,
        payment,
        total,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.error('Order API error:', error);
    return NextResponse.json({ error: 'Internal server error', details: String(error) }, { status: 500 });
  }
} 