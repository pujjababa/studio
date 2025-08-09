import type { Festival, Panchang } from './types';
import { ProkeralaAstrologer } from './prokerala-sdk';
import { getFormattedProkeralaDate } from './utils';

const CLIENT_ID = process.env.PROKERALA_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.PROKERALA_CLIENT_SECRET ?? '';

const client = new ProkeralaAstrologer(CLIENT_ID, CLIENT_SECRET);

export async function getDailyPanchang(datetime: string, coordinates: string): Promise<Panchang | { error: string; details?: any }> {
    try {
         if (!CLIENT_ID || !CLIENT_SECRET) {
            const errorMsg = 'Prokerala API credentials are not set in the environment variables.';
            console.error(errorMsg);
            return { error: errorMsg };
        }
        
        const formattedDate = getFormattedProkeralaDate(new Date(datetime));

        const result = await client.getDailyPanchang(formattedDate, coordinates);
        
        if (result.status === 'error') {
             console.error('Prokerala API Error in getDailyPanchang:', result.errors);
             return {
                error: 'Failed to fetch panchang from Prokerala API.',
                details: result.errors?.[0]?.detail || 'No specific error details provided.',
            };
        }
        
        const panchangData = result.data;

        if (!panchangData || Object.keys(panchangData).length === 0 || !panchangData.tithi || !panchangData.nakshatra || !panchangData.yoga) {
             console.error('Incomplete panchang data received:', panchangData);
             return {
                error: 'Failed to fetch panchang from Prokerala API.',
                details: 'Response did not contain complete panchang data.',
            };
        }
        
        return {
            tithi: panchangData.tithi.name,
            nakshatra: panchangData.nakshatra.name,
            yoga: panchangData.yoga.name,
        };
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
            throw new Error('Prokerala API credentials are not set in the environment variables.');
        }

        // Using Mumbai, India as default coordinates
        const coordinates = '19.0760,72.8777';
        
        const result = await client.getUpcomingFestivals(coordinates, 1, 60);
        
        if (result.status === 'error') {
            const errorDetails = result.errors?.[0]?.detail || 'No details provided';
            console.error(`Prokerala API Error fetching festivals: ${errorDetails}`);
            throw new Error(`Prokerala API Error: ${errorDetails}`);
        }

        const festivalData = result.data?.festivals || [];
        
        const festivals = festivalData.slice(0, 5).map((f: any) => ({
            name: f.name,
            startDate: f.date,
            description: f.description,
            tithi: f.tithi,
        }));
        
        return festivals;

    } catch (error: any) {
        console.error('Error fetching upcoming festivals:', error);
        // In the component, we don't want to crash the page, so we return an empty array.
        // A more robust solution might pass the error to the UI.
        return [];
    }
}
