import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { deleteImage } from '@/lib/cloudinary';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { name, price, stock, categoryId, image, description } = await request.json();
  const product = await prisma.product.update({
    where: { id: params.id },
    data: { name, price, stock, categoryId, image, description },
  });
  return NextResponse.json(product);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // First, get the product to check if it exists and get its image URL
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        orderItems: true // Include orderItems to check if product is in use
      }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // If the product has an image, delete it from Cloudinary
    if (product.image) {
      try {
        await deleteImage(product.image);
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        // Continue with product deletion even if image deletion fails
      }
    }

    try {
      // If product has order items, delete them first
      if (product.orderItems && product.orderItems.length > 0) {
        await prisma.orderItem.deleteMany({
          where: { productId: id }
        });
      }

      // Delete the product from the database
      const deletedProduct = await prisma.product.delete({
        where: { id },
      });

      return NextResponse.json({ 
        message: 'Product deleted successfully',
        product: deletedProduct 
      });
    } catch (deleteError: any) {
      console.error('Database delete error:', deleteError);
      
      // Handle specific Prisma errors
      if (deleteError.code === 'P2003') {
        return NextResponse.json(
          { error: 'Cannot delete product as it is referenced by other records' },
          { status: 400 }
        );
      }
      
      throw deleteError; // Re-throw other errors to be caught by outer catch
    }
  } catch (error: any) {
    console.error('Error deleting product:', error);
    
    // Return more specific error messages based on the error type
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: `Failed to delete product: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
} 