
import { format, parseISO } from 'date-fns';
import { formatInTimeZone, toDate } from 'date-fns-tz';
import type { PanchangResult } from './types';

const CLIENT_ID = process.env.PROKERALA_CLIENT_ID;
const CLIENT_SECRET = process.env.PROKERALA_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('ProKerala API credentials are not configured in the environment variables.');
}

const formatTime = (dateString: string) => {
    try {
        // The API returns ISO strings, so parseISO is appropriate here.
        // We then format it into a more readable time format.
        const date = toDate(dateString);
        return format(date, 'h:mm a');
    } catch {
        return 'N/A';
    }
}

const formatTiming = (timing: {start: string, end: string}) => {
    if (!timing) return 'N/A';
    try {
        return `${formatTime(timing.start)} - ${formatTime(timing.end)}`;
    } catch {
        return 'N/A';
    }
}

const findTiming = (periods: {id: string, name: string, start: string, end: string}[], name: string) => {
    const period = periods.find(p => p.name.toLowerCase().includes(name.toLowerCase()));
    return period ? formatTiming(period) : 'N/A';
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
            const errorBody = await authResponse.text();
            throw new Error(`Failed to authenticate with ProKerala API: ${authResponse.statusText}. Response: ${errorBody}`);
        }
        const { access_token } = await authResponse.json();
        
        const coordinates = '28.6139,77.2090'; // Hardcoded for New Delhi for now
        const tz = 'Asia/Kolkata'; // Timezone for New Delhi
        
        // Format the date into a full ISO string with timezone for the API request
        const inputDate = toDate(`${dateString}T12:00:00`, {timeZone: tz});
        const zonedDate = formatInTimeZone(inputDate, tz, "yyyy-MM-dd'T'HH:mm:ssXXX");

        const encodedDateTime = encodeURIComponent(zonedDate);


        // Step 2: Fetch Panchang data using the token from the advanced endpoint
        const apiUrl = `https://api.prokerala.com/v2/astrology/panchang/advanced?ayanamsa=1&coordinates=${coordinates}&datetime=${encodedDateTime}`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Prokerala API Error (${response.status}): ${errorData.detail || response.statusText}`);
        }

        const data = await response.json();
        const panchang = data.data;

        // The API returns arrays for tithi, nakshatra, etc. We'll take the first one as primary.
        const currentTithi = panchang.tithi[0];
        const currentNakshatra = panchang.nakshatra[0];
        const currentYoga = panchang.yoga[0];
        const currentKarana = panchang.karana[0];
        
        const inauspiciousPeriods = panchang.inauspicious_period || [];
        const auspiciousPeriods = panchang.auspicious_period || [];

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
            rahuKaal: findTiming(inauspiciousPeriods, 'Rahu Kaal'),
            gulikaKaal: findTiming(auspiciousPeriods, 'Gulika Kaal'), // Gulika can be auspicious
            yamaganda: findTiming(inauspiciousPeriods, 'Yamaganda'),
            abhijitMuhurat: findTiming(auspiciousPeriods, 'Abhijit Muhurta'),
            festival: panchang.festivals && panchang.festivals.length > 0 ? panchang.festivals.join(', ') : undefined,
        };
    } catch (error: any) {
         if (error.response) {
            throw new Error(`Prokerala API Error: ${error.response.data.detail || error.response.statusText}`);
        }
        throw new Error(`Prokerala SDK Error: ${error.message}`);
    }
}
