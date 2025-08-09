'use server';

import { getUpcomingFestivals } from '@/lib/prokerala';

export async function fetchFestivalsAction() {
  // Location for Delhi, India. This can be made dynamic later.
  const lat = 28.6139;
  const lon = 77.2090;
  
  return getUpcomingFestivals(90, lat, lon);
}
