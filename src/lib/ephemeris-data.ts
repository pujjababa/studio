/**
 * @fileOverview Pre-computed ephemeris data for planetary positions.
 * This file contains a sample of pre-computed astrological data to avoid heavy runtime calculations.
 * For a production app, this data would be expanded to cover a wide range of dates (e.g., 1950-2050)
 * and would be generated from a reliable source like Swiss Ephemeris or NASA/JPL tables.
 */

export interface PlanetaryData {
    rashi: string;
    nakshatra: string;
    nakshatraPada: number;
    longitude: number;
}

export interface DailyEphemeris {
    [planet: string]: PlanetaryData;
}

// NOTE: This is a tiny, illustrative sample. A real implementation would have data for every day.
export const ephemerisData: { [date: string]: DailyEphemeris } = {
    "1990-05-27": {
        "Sun": { "rashi": "Taurus", "nakshatra": "Rohini", "nakshatraPada": 1, "longitude": 42.1 },
        "Moon": { "rashi": "Leo", "nakshatra": "Purva Phalguni", "nakshatraPada": 2, "longitude": 139.8 },
        "Mars": { "rashi": "Pisces", "nakshatra": "Revati", "nakshatraPada": 4, "longitude": 358.2 },
        "Mercury": { "rashi": "Gemini", "nakshatra": "Mrigashira", "nakshatraPada": 4, "longitude": 66.5 },
        "Jupiter": { "rashi": "Gemini", "nakshatra": "Punarvasu", "nakshatraPada": 1, "longitude": 81.3 },
        "Venus": { "rashi": "Cancer", "nakshatra": "Pushya", "nakshatraPada": 3, "longitude": 101.9 },
        "Saturn": { "rashi": "Capricorn", "nakshatra": "Shravana", "nakshatraPada": 1, "longitude": 281.4 },
        "Rahu": { "rashi": "Capricorn", "nakshatra": "Shravana", "nakshatraPada": 3, "longitude": 289.0 }
    },
    "1992-11-15": {
        "Sun": { "rashi": "Libra", "nakshatra": "Vishakha", "nakshatraPada": 3, "longitude": 210.5 },
        "Moon": { "rashi": "Capricorn", "nakshatra": "Dhanishta", "nakshatraPada": 1, "longitude": 294.6 },
        "Mars": { "rashi": "Cancer", "nakshatra": "Ashlesha", "nakshatraPada": 1, "longitude": 107.7 },
        "Mercury": { "rashi": "Scorpio", "nakshatra": "Jyeshtha", "nakshatraPada": 1, "longitude": 226.2 },
        "Jupiter": { "rashi": "Virgo", "nakshatra": "Chitra", "nakshatraPada": 1, "longitude": 172.9 },
        "Venus": { "rashi": "Sagittarius", "nakshatra": "Purva Ashadha", "nakshatraPada": 4, "longitude": 254.8 },
        "Saturn": { "rashi": "Capricorn", "nakshatra": "Shravana", "nakshatraPada": 4, "longitude": 292.1 },
        "Rahu": { "rashi": "Scorpio", "nakshatra": "Anuradha", "nakshatraPada": 2, "longitude": 219.5 }
    },
    "2000-01-01": {
        "Sun": { "rashi": "Sagittarius", "nakshatra": "Purva Ashadha", "nakshatraPada": 1, "longitude": 255.8 },
        "Moon": { "rashi": "Aries", "nakshatra": "Ashwini", "nakshatraPada": 3, "longitude": 8.7 },
        "Mars": { "rashi": "Capricorn", "nakshatra": "Dhanishta", "nakshatraPada": 2, "longitude": 297.4 },
        "Mercury": { "rashi": "Sagittarius", "nakshatra": "Mula", "nakshatraPada": 2, "longitude": 244.9 },
        "Jupiter": { "rashi": "Aries", "nakshatra": "Ashwini", "nakshatraPada": 4, "longitude": 12.6 },
        "Venus": { "rashi": "Capricorn", "nakshatra": "Uttara Ashadha", "nakshatraPada": 1, "longitude": 270.1 },
        "Saturn": { "rashi": "Aries", "nakshatra": "Bharani", "nakshatraPada": 2, "longitude": 18.5 },
        "Rahu": { "rashi": "Cancer", "nakshatra": "Ashlesha", "nakshatraPada": 4, "longitude": 118.9 }
    },
};

    