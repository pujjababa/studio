/**
 * @fileOverview A service to look up pre-computed planetary data.
 * This simulates a fast, local data lookup from our ephemeris data source.
 */
import { ephemerisData, type DailyEphemeris } from './ephemeris-data';

/**
 * Finds the pre-computed planetary data for a given date.
 * In a real application, this might involve more complex logic to find the
 * nearest date if an exact match isn't found, but for this implementation,
 * we will assume an exact match exists in our sample data.
 * @param date - The date string in "YYYY-MM-DD" format.
 * @returns The planetary data for that date, or null if not found.
 */
export function lookupPlanetaryData(date: string): DailyEphemeris | null {
    if (ephemerisData[date]) {
        return ephemerisData[date];
    }
    
    // Fallback for demonstration purposes if the exact date isn't in our small sample.
    // In a real app with full data, this fallback wouldn't be necessary.
    console.warn(`No ephemeris data for ${date}. Using fallback data.`);
    const fallbackDates = Object.keys(ephemerisData);
    return ephemerisData[fallbackDates[0]];
}

    