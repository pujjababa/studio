
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
        const daysToFetch = 60;
        const festivals: Festival[] = [];
        let logged = false;

        for (let i = 0; i < daysToFetch; i++) {
            if (festivals.length >= 5) {
                break;
            }
            
            const date = new Date();
            date.setDate(date.getDate() + i);
            const formattedDate = getFormattedProkeralaDate(date);

            const result = await getDailyPanchang(formattedDate, coordinates);
            
            // @ts-ignore
            if (result && !result.error && result.festival?.name) {
                // @ts-ignore
                if (!logged) {
                    // console.log(JSON.stringify(result, null, 2));
                    logged = true;
                }
                 // @ts-ignore
                festivals.push({
                    name: result.festival.name,
                    startDate: date.toISOString().split('T')[0],
                     // @ts-ignore
                    description: result.festival.description,
                     // @ts-ignore
                    tithi: result.tithi?.name,
                });
            }
        }
        
        return festivals;

    } catch (error: any) {
        console.error('Error fetching upcoming festivals:', error);
        return { error: 'An unexpected error occurred while fetching festivals.', details: error.message };
    }
}
