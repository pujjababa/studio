
import { NextResponse } from 'next/server';
import { getDailyPanchang } from '@/lib/prokerala';

export async function GET() {
  try {
    // Using Mumbai, India as default coordinates and current time for testing
    const coordinates = '19.0760,72.8777';
    const now = new Date();
    const datetime = now.toISOString();

    const result = await getDailyPanchang(datetime, coordinates);
    
    // @ts-ignore
    if (result.error) {
      return NextResponse.json(
        { 
            status: 'error',
            message: 'An error occurred while fetching panchang data.',
            ...result
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ status: 'success', data: result });
  } catch (error: any) {
    console.error('[Debug Panchang Endpoint] Error:', error);
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
