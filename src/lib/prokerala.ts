
import type { Festival } from './types';
import { ProkeralaAstrologer } from './prokerala-sdk';

const CLIENT_ID = process.env.PROKERALA_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.PROKERALA_CLIENT_SECRET ?? '';

const client = new ProkeralaAstrologer(CLIENT_ID, CLIENT_SECRET);

export async function getUpcomingFestivals(): Promise<Festival[]> {
    try {
        if (!CLIENT_ID || !CLIENT_SECRET) {
            console.error('Prokerala API credentials are not set in the environment variables.');
            return [];
        }

        const year = new Date().getFullYear();
        // Using Mumbai, India as default coordinates
        const location = {
            latitude: 19.0760,
            longitude: 72.8777,
        };
        const ayanamsa = 1; // Lahiri

        const result = await client.getPanchangFestivals(location, year, true, ayanamsa, 'en');
        const festivalData = result.festivals;

        // Filter for festivals from today onwards and take the next 5
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = festivalData.filter((festival) => {
            const festivalDate = new Date(festival.start_date);
            return festivalDate >= today;
        });

        return upcoming.slice(0, 5).map((f) => ({
            name: f.name,
            startDate: f.start_date,
        }));
    } catch (error) {
        console.error('Error fetching upcoming festivals:', error);
        return [];
    }
}
