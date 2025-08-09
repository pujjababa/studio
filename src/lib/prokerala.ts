'use server';

import type { Festival, Panchang } from './types';
import { ProkeralaAstrologer } from './prokerala-sdk';

const astrologer = new ProkeralaAstrologer(
  process.env.PROKERALA_CLIENT_ID,
  process.env.PROKERALA_CLIENT_SECRET
);

export async function getDailyPanchang(
  date: Date,
  latitude: number,
  longitude: number
): Promise<Panchang | null> {
  try {
    const panchang = await astrologer.getDailyPanchang(
      date,
      latitude,
      longitude
    );
    return panchang as Panchang;
  } catch (error) {
    console.error('Error fetching daily panchang:', error);
    return null;
  }
}

export async function getUpcomingFestivals(
  days: number,
  latitude: number,
  longitude: number
): Promise<Festival[]> {
  const festivals: Festival[] = [];
  const today = new Date();
  const checkedDates = new Set<string>();

  try {
    const token = await astrologer.fetchToken();

    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      
      if (checkedDates.has(dateString)) continue;
      checkedDates.add(dateString);

      const result = await astrologer.getDailyPanchang(date, latitude, longitude, token);

      if (result && result.festival && result.festival.name) {
        const existing = festivals.find(f => f.name === result.festival.name);
        if(!existing) {
            festivals.push({
                name: result.festival.name,
                date: dateString,
                description: result.festival.description,
                tithi: result.tithi.name,
            });
        }
      }
      
      if (festivals.length >= 5) {
        break;
      }
    }
  } catch (error) {
    console.error('Failed to fetch upcoming festivals:', error);
    // Return empty array on error to prevent crashing the page
    return [];
  }

  return festivals;
}
