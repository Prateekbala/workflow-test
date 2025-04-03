import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import  db from '@/db';
import { authOptions } from '../auth/[...nextauth]/options';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, triggerType, triggerConfig } = body;

    // Create zap with trigger
    const zap = await db.zap.create({
      data: {
        name,
        userId: session.user.id,
        status: 'draft',
        trigger: {
          create: {
            type: triggerType,
          }
        }
      },
      include: {
        trigger: true
      }
    });

    return NextResponse.json(zap);
  } catch (error) {
    console.error('Failed to create zap:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// New endpoint to check token status
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const zapId = searchParams.get('zapId');

  if (!zapId) {
    return NextResponse.json({ error: 'Zap ID is required' }, { status: 400 });
  }

  try {
    const token = await db.token.findUnique({
      where: { zapId },
      select: {
        provider: true,
        expiresAt: true
      }
    });

    return NextResponse.json({
      isAuthenticated: !!token,
      provider: token?.provider,
      isValid: token ? new Date(token.expiresAt) > new Date() : false
    });
  } catch (error) {
    console.error('Failed to check token status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}