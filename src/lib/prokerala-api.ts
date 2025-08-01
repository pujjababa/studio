
import { format, parseISO } from 'date-fns';
import type { PanchangResult } from './types';

const CLIENT_ID = process.env.PROKERALA_CLIENT_ID;
const CLIENT_SECRET = process.env.PROKERALA_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('ProKerala API credentials are not configured in the environment variables.');
}

const formatTime = (dateString: string) => {
    try {
        return format(parseISO(dateString), 'h:mm a');
    } catch {
        return 'N/A';
    }
}

const formatTiming = (timing?: {start: string, end: string}) => {
    if (!timing) return 'N/A';
    try {
        return `${formatTime(timing.start)} - ${formatTime(timing.end)}`;
    } catch {
        return 'N/A';
    }
}


export async function fetchProkeralaPanchang(dateString: string, location: string = 'New Delhi, India'): Promise<PanchangResult> {
    try {
        // Step 1: Get the access token
        const authResponse = await fetch('https://api.prokerala.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
            })
        });
        if (!authResponse.ok) {
            throw new Error(`Failed to authenticate with ProKerala API: ${authResponse.statusText}`);
        }
        const { access_token } = await authResponse.json();

        // Step 2: Fetch Panchang data using the token
        const response = await fetch(`https://api.prokerala.com/v2/astrology/panchang?ayanamsa=1&coordinates=${location}&datetime=${dateString}T12:00:00Z`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Prokerala API Error: ${errorData.detail || response.statusText}`);
        }

        const data = await response.json();
        const panchang = data.data;

        // The API returns arrays for tithi, nakshatra, etc. We'll take the first one as primary.
        const currentTithi = panchang.tithi[0];
        const currentNakshatra = panchang.nakshatra[0];
        const currentYoga = panchang.yoga[0];
        const currentKarana = panchang.karana[0];

        return {
            date: dateString,
            day: panchang.vaara,
            tithi: currentTithi.name,
            nakshatra: currentNakshatra.name,
            yoga: currentYoga.name,
            karana: currentKarana.name,
            sunrise: formatTime(panchang.sunrise),
            sunset: formatTime(panchang.sunset),
            paksha: currentTithi.paksha,
            rahuKaal: formatTiming(panchang.timings?.rahu_kaal),
            gulikaKaal: formatTiming(panchang.timings?.gulika_kaal),
            yamaganda: formatTiming(panchang.timings?.yamaganda),
            abhijitMuhurat: formatTiming(panchang.timings?.abhijit_muhurta),
            festival: panchang.festivals && panchang.festivals.length > 0 ? panchang.festivals.join(', ') : undefined,
        };
    } catch (error: any) {
         if (error.response) {
            throw new Error(`Prokerala API Error: ${error.response.data.detail || error.response.statusText}`);
        }
        throw new Error(`Prokerala SDK Error: ${error.message}`);
    }
}
