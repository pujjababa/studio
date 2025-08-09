'use server';

import { getUpcomingFestivals } from '@/lib/panchang';

export async function fetchFestivalsAction() {
  // Location for Delhi, India. This can be made dynamic later.
  // const lat = 28.6139;
  // const lon = 77.2090;
  
  // The new getUpcomingFestivals function does not yet use lat/lon, but is kept for future-proofing.
  return getUpcomingFestivals(90);
}
