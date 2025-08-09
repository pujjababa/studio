'use server';

import type { PujaKit } from '@/lib/types';
import clientPromise from '@/lib/mongodb';

export async function getPujaKitByFestival(festivalName: string): Promise<PujaKit | null> {
    try {
        const client = await clientPromise;
        const db = client.db("pujababa"); // Or your database name

        const pujaKit = await db.collection<PujaKit>('puja-kits').findOne({ festival_english: festivalName });

        if (pujaKit) {
            // The _id from MongoDB is an ObjectId, which is not serializable for the client component.
            // We need to convert it to a string.
            const { _id, ...rest } = pujaKit as any;
            return { ...rest, _id: _id.toString() } as PujaKit;
        }

        return null;
    } catch (e) {
        console.error("Database error fetching puja kit:", e);
        // In a real app, you might want to throw a more specific error
        // or handle it gracefully. For now, we return null.
        return null;
    }
}
