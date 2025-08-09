
import { NextRequest, NextResponse } from 'next/server';
import { generatePujaKit } from '@/ai/flows/generate-puja-kit-flow';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { festivalName } = await req.json();

    if (!festivalName || typeof festivalName !== 'string') {
      return NextResponse.json({ error: 'festivalName is required and must be a string.' }, { status: 400 });
    }

    // Call the AI flow to generate the kit data
    const generatedKit = await generatePujaKit(festivalName);

    if (!generatedKit) {
        return NextResponse.json({ error: 'Failed to generate Puja Kit from AI.' }, { status: 500 });
    }

    const client = await clientPromise;
    const db = client.db("pujababa");
    const collection = db.collection('puja-kits');

    // Use upsert to either create a new document or update an existing one
    const result = await collection.updateOne(
      { festival_english: generatedKit.festival_english },
      {
        $set: {
          festival_hindi: generatedKit.festival_hindi,
          puja_samagri: generatedKit.puja_samagri,
          total_price_inr: generatedKit.total_price_inr,
        },
      },
      { upsert: true }
    );
    
    let message: string;
    if (result.upsertedCount > 0) {
        message = `Successfully created and inserted new puja kit for ${generatedKit.festival_english}.`;
    } else if (result.matchedCount > 0) {
        message = `Successfully updated puja kit for ${generatedKit.festival_english}.`;
    } else {
        message = `No changes were made for ${generatedKit.festival_english}. The existing kit might be identical.`
    }

    return NextResponse.json({ success: true, message, kitId: result.upsertedId?._id }, { status: 200 });

  } catch (error: any) {
    console.error('Error in generate-puja-kit endpoint:', error);
    return NextResponse.json({ error: 'An internal server error occurred.', details: error.message }, { status: 500 });
  }
}
