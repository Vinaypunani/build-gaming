import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Get total orders
    const totalOrders = await prisma.order.count();
    
    // Get total revenue
    const orders = await prisma.order.findMany({
      select: { total: true }
    });
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    
    // Get total products
    const totalProducts = await prisma.product.count();
    
    // Get total users
    const totalUsers = await prisma.user.count();
    
    // Get recent orders
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });
    
    // Get sales by category
    const salesByCategory = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
        price: true
      }
    });
    
    // Get product details for sales by category
    const categorySales = await Promise.all(
      salesByCategory.map(async (sale) => {
        const product = await prisma.product.findUnique({
          where: { id: sale.productId },
          include: { category: true }
        });
        return {
          category: product?.category.name || 'Unknown',
          quantity: sale._sum.quantity || 0,
          revenue: sale._sum.price || 0
        };
      })
    );
    
    // Get monthly sales data
    const monthlySales = await prisma.order.groupBy({
      by: ['createdAt'],
      _sum: {
        total: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    
    // Format monthly sales data
    const formattedMonthlySales = monthlySales.map(sale => ({
      date: new Date(sale.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      total: sale._sum.total || 0
    }));

    return NextResponse.json({
      totalOrders,
      totalRevenue,
      totalProducts,
      totalUsers,
      recentOrders,
      categorySales,
      monthlySales: formattedMonthlySales
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin statistics' },
      { status: 500 }
    );
  }
} 