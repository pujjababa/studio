
import { NextResponse } from 'next/server';
import { getUpcomingFestivals } from '@/lib/prokerala';

export async function GET() {
  try {
    const result = await getUpcomingFestivals(true);
    
    // @ts-ignore
    if (result.error) {
      return NextResponse.json(
        { 
            status: 'error',
            message: 'An error occurred while fetching festivals.',
            ...result
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ status: 'success', data: result });
  } catch (error: any) {
    console.error('[Debug Festivals Endpoint] Error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'An unexpected error occurred in the debug endpoint.',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
