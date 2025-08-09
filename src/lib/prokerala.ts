
import type { Festival, Panchang } from './types';
import { ProkeralaAstrologer } from './prokerala-sdk';
import { getFormattedProkeralaDate } from './utils';

const CLIENT_ID = process.env.CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.CLIENT_SECRET ?? '';

const client = new ProkeralaAstrologer(CLIENT_ID, CLIENT_SECRET);

export async function getDailyPanchang(datetime: string, coordinates: string): Promise<Panchang | { error: string; details?: any }> {
    try {
         if (!CLIENT_ID || !CLIENT_SECRET) {
            const errorMsg = 'Prokerala API credentials are not set in the environment variables.';
            console.error(errorMsg);
            return { error: errorMsg };
        }
        
        const result = await client.getDailyPanchang(datetime, coordinates);
        
        if (result.status === 'error' || !result.data) {
             console.error('Prokerala API Error in getDailyPanchang:', result.errors);
             return {
                error: 'Failed to fetch panchang from Prokerala API.',
                details: result.errors?.[0]?.detail || 'No specific error details provided.',
            };
        }
        
        return result.data as Panchang;

    } catch (error: any) {
         console.error('Exception in getDailyPanchang:', error);
         return {
            error: 'Failed to fetch panchang from Prokerala API.',
            details: error.message || 'No additional details',
        };
    }
}

export async function getUpcomingFestivals(): Promise<Festival[] | { error: string; details?: any }> {
    try {
        if (!CLIENT_ID || !CLIENT_SECRET) {
            const errorMsg = 'Prokerala API credentials are not set in the environment variables.';
            console.error(errorMsg);
            return { error: errorMsg };
        }

        // Using Mumbai, India as default coordinates
        const coordinates = '19.0760,72.8777';
        // The number of days to fetch festivals for.
        const days = 30;

        const result = await client.getUpcomingFestivals(coordinates, days);

        if (result.status === 'error' || !result.data) {
             console.error('Prokerala API Error in getUpcomingFestivals:', result.errors);
             return {
                error: 'Failed to fetch upcoming festivals from Prokerala API.',
                details: result.errors?.[0]?.detail || 'No specific error details provided.',
            };
        }
        
        // The API returns festivals inside a nested `festivals` array.
        const festivals = result.data.festivals.map((f: any) => ({
            name: f.name,
            startDate: f.date,
            description: f.description,
            tithi: f.tithi,
        }));
        
        // Return first 5 festivals
        return festivals.slice(0, 5);

    } catch (error: any) {
        console.error('Error fetching upcoming festivals:', error);
        return { error: 'An unexpected error occurred while fetching festivals.', details: error.message };
    }
}
