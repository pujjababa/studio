import { format } from 'date-fns';
import type { PanchangResult } from './types';

const API_URL = 'https://api.prokerala.com/v2/astrology/panchang';
const CLIENT_ID = '1c55492d-e2ba-4a2d-bce1-4e3b51798e70';
const CLIENT_SECRET = 'T13fgxXSVdebazgvobuvymi2qRhYHyPsUOgDPXD3';

// Helper to format time from API
const formatTime = (time: {hour: number, minute: number, second: number}) => {
    const date = new Date();
    date.setHours(time.hour, time.minute, time.second);
    return format(date, 'h:mm a');
}

// Helper to format timing periods from API
const formatTiming = (timing: {start: {hour: number, minute: number, second: number}, end: {hour: number, minute: number, second: number}}) => {
    return `${formatTime(timing.start)} - ${formatTime(timing.end)}`;
}


export async function fetchProkeralaPanchang(date: string, location: string = 'New Delhi, India'): Promise<PanchangResult> {
    const coordinates = '28.6139,77.2090'; // Default to New Delhi

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CLIENT_ID}:${CLIENT_SECRET}`
        },
        body: JSON.stringify({
            datetime: `${date}T12:00:00Z`, // Use midday for the given date
            ayanamsa: 1, // Lahiri
            coordinates: coordinates
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Prokerala API Error: ${errorData.detail || response.statusText}`);
    }

    const data = await response.json();
    const panchang = data.data;

    return {
        date: date,
        day: panchang.day,
        tithi: panchang.tithi.name,
        nakshatra: panchang.nakshatra.name,
        yoga: panchang.yoga.name,
        karana: panchang.karana.name,
        sunrise: formatTime(panchang.sunrise),
        sunset: formatTime(panchang.sunset),
        paksha: panchang.paksha,
        rahuKaal: formatTiming(panchang.timings.rahu_kaal),
        gulikaKaal: formatTiming(panchang.timings.gulika_kaal),
        yamaganda: formatTiming(panchang.timings.yamaganda),
        abhijitMuhurat: formatTiming(panchang.timings.abhijit_muhurta),
        festival: panchang.festivals.length > 0 ? panchang.festivals.join(', ') : undefined,
    };
}
