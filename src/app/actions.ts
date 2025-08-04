'use server';

import { getUpcomingFestivals } from '@/lib/prokerala';

export async function fetchFestivalsAction() {
  return getUpcomingFestivals();
}
