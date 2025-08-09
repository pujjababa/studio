'use server';

import type { PujaKit } from '@/lib/types';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

async function getDb() {
    const client = await clientPromise;
    return client.db("pujababa");
}

function serializePujaKit(kit: any): PujaKit {
    const { _id, ...rest } = kit;
    return { ...rest, _id: _id.toString() };
}

export async function getAllPujaKits(): Promise<PujaKit[]> {
    try {
        const db = await getDb();
        const kits = await db.collection('puja-kits').find({}).toArray();
        return kits.map(serializePujaKit);
    } catch (e) {
        console.error("Database error fetching all puja kits:", e);
        return [];
    }
}


export async function getPujaKitByFestival(festivalName: string): Promise<PujaKit | null> {
    try {
        const db = await getDb();
        const pujaKit = await db.collection('puja-kits').findOne({ festival_english: festivalName });
        return pujaKit ? serializePujaKit(pujaKit) : null;
    } catch (e) {
        console.error("Database error fetching puja kit by festival:", e);
        return null;
    }
}

export async function getPujaKitById(id: string): Promise<PujaKit | null> {
     if (!ObjectId.isValid(id)) {
        return null;
    }
    try {
        const db = await getDb();
        const pujaKit = await db.collection('puja-kits').findOne({ _id: new ObjectId(id) });
        return pujaKit ? serializePujaKit(pujaKit) : null;
    } catch (e) {
        console.error("Database error fetching puja kit by ID:", e);
        return null;
    }
}

export async function createPujaKit(data: Omit<PujaKit, '_id'>): Promise<string> {
    try {
        const db = await getDb();
        const result = await db.collection('puja-kits').insertOne(data);
        return result.insertedId.toString();
    } catch (e) {
        console.error("Database error creating puja kit:", e);
        throw new Error('Failed to create puja kit in database.');
    }
}


export async function updatePujaKit(id: string, data: Omit<PujaKit, '_id'>): Promise<void> {
    if (!ObjectId.isValid(id)) {
        throw new Error('Invalid ID format');
    }
    try {
        const db = await getDb();
        await db.collection('puja-kits').updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
    } catch (e) {
        console.error("Database error updating puja kit:", e);
        throw new Error('Failed to update puja kit in database.');
    }
}
