import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all products
export async function GET() {
  // Exclude products in the 'Custom Build' category
  const products = await prisma.product.findMany({
    where: {
      AND: [
        {
          category: {
            name: {
              not: 'Custom Build',
            },
          },
        },
        {
          name: {
            not: 'Custom PC Build (8 parts)',
          },
        },
      ],
    },
    include: { category: true },
  });
  return NextResponse.json(products);
}

// CREATE a product
export async function POST(request: NextRequest) {
  const { name, price, stock, categoryId, image, description } = await request.json();
  if (!name || !price || !stock || !categoryId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const product = await prisma.product.create({
    data: { name, price, stock, categoryId, image, description },
  });
  
  return NextResponse.json(product);
} 