'use server';

import { getUpcomingFestivals, getDailyPanchang } from '@/lib/prokerala';

export async function fetchFestivalsAction() {
  return getUpcomingFestivals();
}

export async function fetchDailyPanchangAction(datetime: string, coordinates: string) {
    return getDailyPanchang(datetime, coordinates);
}
