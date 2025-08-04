
import type { Festival } from './types';

const CLIENT_ID = process.env.PROKERALA_CLIENT_ID;
const CLIENT_SECRET = process.env.PROKERALA_CLIENT_SECRET;

const BASE_URL = 'https://api.prokerala.com/v2/astrology';

async function getAuthToken() {
    if (!CLIENT_ID || !CLIENT_SECRET) {
        throw new Error('Prokerala API credentials are not set in the environment variables.');
    }

    const response = await fetch('https://api.prokerala.com/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    });

    if (!response.ok) {
        console.error('Prokerala auth error response:', await response.text());
        throw new Error('Failed to get auth token from Prokerala API');
    }

    const data = await response.json();
    return data.access_token;
}

export async function getUpcomingFestivals(): Promise<Festival[]> {
    try {
        const token = await getAuthToken();
        const year = new Date().getFullYear();
        // Using Mumbai, India as default coordinates
        const coordinates = '19.0760,72.8777';
        const ayanamsa = 1; // Lahiri

        const response = await fetch(
            `${BASE_URL}/panchang-festivals?ayanamsa=${ayanamsa}&coordinates=${coordinates}&year=${year}&la=en`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            console.error('Prokerala API Error:', await response.text());
            return [];
        }

        const data = await response.json();

        // Filter for festivals from today onwards and take the next 5
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = data.data.festivals.filter((festival: { start_date: string }) => {
            const festivalDate = new Date(festival.start_date);
            return festivalDate >= today;
        });

        return upcoming.slice(0, 5).map((f: any) => ({
            name: f.name,
            startDate: f.start_date,
        }));
    } catch (error) {
        console.error('Error fetching upcoming festivals:', error);
        return [];
    }
}
