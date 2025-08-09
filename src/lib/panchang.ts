import type { Festival } from './types';
import { festivalRules } from './festival-rules';
import { DEG2RAD } from './panchang-utils';


function toJulianDate(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

function normalizeAngle(angle: number): number {
  return (angle % 360 + 360) % 360;
}

// Sun's geocentric longitude
function sunLongitude(jd: number): number {
  const n = jd - 2451545.0;
  const L = normalizeAngle(280.46646 + 0.98564736 * n);
  const g = normalizeAngle(357.52911 + 0.98560028 * n);
  const lambda = L + 1.914602 * Math.sin(g * DEG2RAD) + 0.019993 * Math.sin(2 * g * DEG2RAD);
  return normalizeAngle(lambda);
}

// Moon's geocentric longitude
function moonLongitude(jd: number): number {
  const n = jd - 2451545.0;
  const L = normalizeAngle(218.316 + 13.176396 * n);
  const M = normalizeAngle(134.963 + 13.064993 * n);
  const lambda = L + 6.289 * Math.sin(M * DEG2RAD);
  return normalizeAngle(lambda);
}

export function getPanchang(date: Date, monthSystem: "purnimanta" | "amanta" = "purnimanta"): { tithi: string, paksha: string, month: string } {
  const jd = toJulianDate(date);
  const sunLon = sunLongitude(jd);
  const moonLon = moonLongitude(jd);

  const tithiNum = Math.floor(normalizeAngle(moonLon - sunLon) / 12) + 1;
  const paksha = tithiNum <= 15 ? "Shukla" : "Krishna";

  const tithiNames = [
    "Pratipada","Dvitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami",
    "Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi",
    "Purnima","Pratipada","Dvitiya","Tritiya","Chaturthi","Panchami","Shashthi",
    "Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi",
    "Chaturdashi","Amavasya"
  ];

  const monthNames = [
    "Chaitra","Vaishakha","Jyeshtha","Ashadha","Shravana","Bhadrapada",
    "Ashwin","Kartika","Margashirsha","Pausha","Magha","Phalguna"
  ];
  let monthIndex = Math.floor(sunLon / 30);

  if (monthSystem === "amanta") {
    // South India month adjustment
    if (paksha === "Krishna" && tithiNum > 15) monthIndex = (monthIndex + 1) % 12;
  } else {
    // Purnimanta (North India) adjustment
     if (tithiNum > 15) { // Krishna paksha
        monthIndex = (monthIndex + 1) % 12;
    }
  }

  return {
    tithi: tithiNames[tithiNum - 1],
    paksha,
    month: monthNames[monthIndex]
  };
}

export function getUpcomingFestivals(days = 90, monthSystem: "purnimanta" | "amanta" = "purnimanta"): Festival[] {
  const today = new Date();
  const results: Festival[] = [];
  const addedFestivals = new Set<string>();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const { tithi, paksha, month } = getPanchang(date, monthSystem);

    const todaysFestivals = festivalRules.filter(
      f => f.month === month && f.paksha === paksha && f.tithi === tithi
    );

    if (todaysFestivals.length > 0) {
        todaysFestivals.forEach(f => {
            if (!addedFestivals.has(f.name)) {
                results.push({
                    name: f.name,
                    date: date.toISOString().split("T")[0],
                    tithi: tithi,
                    description: `${paksha} Paksha, ${month}`
                });
                addedFestivals.add(f.name);
            }
        })
    }
  }
  
  // Return only the next 5 festivals
  return results.slice(0, 5);
}
