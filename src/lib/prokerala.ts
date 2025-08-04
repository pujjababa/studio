
import type { Festival, Panchang } from './types';
import { ProkeralaAstrologer } from './prokerala-sdk';

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
        const result = await client.getDailyPanchang(datetime, coordinates);
        
        if (result.status === 'error') {
             return {
                error: 'Failed to fetch panchang from Prokerala API.',
                details: result.errors?.[0]?.detail || 'No specific error details provided.',
            };
        }
        
        const panchangData = result.data;

        if (!panchangData || !panchangData.tithi || !panchangData.nakshatra || !panchangData.yoga) {
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
         console.error('Error fetching daily panchang:', error);
         return {
            error: 'Failed to fetch panchang from Prokerala API.',
            details: error.message || 'No additional details',
        };
    }
}

export async function getUpcomingFestivals(detailedError = false): Promise<Festival[] | { error: string; details?: any }> {
    try {
        if (!CLIENT_ID || !CLIENT_SECRET) {
            const errorMsg = 'Prokerala API credentials are not set in the environment variables.';
            console.error(errorMsg);
            if(detailedError) {
                return { error: errorMsg };
            }
            throw new Error(errorMsg);
        }

        const now = new Date();
        const year = now.getFullYear();
        // Using Mumbai, India as default coordinates
        const location = {
            latitude: 19.0760,
            longitude: 72.8777,
        };
        const ayanamsa = 1; // Lahiri

        const result = await client.getPanchangFestivals(location, year, true, ayanamsa, 'en');
        
        if (result.status === 'error') {
            const errorDetails = result.errors?.[0]?.detail || 'No details provided';
            if (detailedError) {
                return { error: 'API returned an error', details: errorDetails };
            }
            throw new Error(`Prokerala API Error: ${errorDetails}`);
        }

        const festivalData = result.data?.festivals || [];

        // Filter for festivals from today onwards and take the next 5
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = festivalData.filter((festival) => {
            const festivalDate = new Date(festival.start_date);
            return festivalDate >= today;
        });

        const festivals = upcoming.slice(0, 5).map((f) => ({
            name: f.name,
            startDate: f.start_date,
        }));
        
        // @ts-ignore
        if (detailedError) { return festivals; }
        
        return festivals;

    } catch (error: any) {
        console.error('Error fetching upcoming festivals:', error);
        if (detailedError) {
            return {
                error: 'Failed to fetch festivals from Prokerala API.',
                details: error.message || 'No additional details',
            };
        }
        // In the component, we don't want to crash the page, so we return an empty array.
        // The debug endpoint will show the error.
        return [];
    }
}
