
'use server';

import { revalidatePath } from 'next/cache';
import { createPujaKit, updatePujaKit } from '@/services/puja-kits.service';
import type { PujaKit } from '@/lib/types';

export async function createPujaKitAction(data: Omit<PujaKit, '_id'>) {
    try {
        await createPujaKit(data);
        revalidatePath('/admin');
    } catch (error) {
        console.error('Error creating puja kit:', error);
        throw new Error('Failed to create puja kit.');
    }
}

export async function updatePujaKitAction(id: string, data: Omit<PujaKit, '_id'>) {
    try {
        await updatePujaKit(id, data);
        revalidatePath('/admin');
        revalidatePath(`/admin/kits/${id}/edit`);
    } catch (error) {
        console.error('Error updating puja kit:', error);
        throw new Error('Failed to update puja kit.');
    }
}
