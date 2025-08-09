
import type { Festival, Panchang } from './types';
import { festivalRules } from './festival-rules';
import { DEG2RAD, RAD2DEG } from './panchang-utils';

function toJulianDate(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

function normalizeAngle(angle: number): number {
  return (angle % 360 + 360) % 360;
}

function sunLongitude(jd: number): number {
  const n = jd - 2451545.0;
  const L = normalizeAngle(280.46646 + 0.98564736 * n);
  const g = normalizeAngle(357.52911 + 0.98560028 * n);
  const lambda = L + 1.914602 * Math.sin(g * DEG2RAD) + 0.019993 * Math.sin(2 * g * DEG2RAD);
  return normalizeAngle(lambda);
}

function moonLongitude(jd: number): number {
  const n = jd - 2451545.0;
  const L = normalizeAngle(218.316 + 13.176396 * n);
  const M = normalizeAngle(134.963 + 13.064993 * n);
  const lambda = L + 6.289 * Math.sin(M * DEG2RAD);
  return normalizeAngle(lambda);
}

// Simplified sunrise/sunset for a given latitude. Returns HH:MM string.
// Note: This is a simplified calculation for demonstration.
// For high precision, a more complex library or ephemeris data is needed.
function getSunriseSunset(date: Date, lat: number, lon: number): { sunrise: string; sunset: string } {
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
    const declination = -23.45 * Math.cos(DEG2RAD * 360 * (dayOfYear + 10) / 365);
    const hourAngle = Math.acos(-Math.tan(lat * DEG2RAD) * Math.tan(declination * DEG2RAD)) * RAD2DEG;
    
    const sunriseUTC = 12 - hourAngle / 15 - lon / 15;
    const sunsetUTC = 12 + hourAngle / 15 - lon / 15;

    const formatTime = (utcHour: number) => {
        if(isNaN(utcHour)) return "N/A";
        const hours = Math.floor(utcHour);
        const minutes = Math.floor((utcHour - hours) * 60);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} (UTC)`;
    }

    return {
        sunrise: formatTime(sunriseUTC),
        sunset: formatTime(sunsetUTC)
    };
}


export function getPanchang(date: Date, monthSystem: "purnimanta" | "amanta" = "purnimanta", lat = 28.6139, lon = 77.2090): Panchang {
  const jd = toJulianDate(date);
  const sunLon = sunLongitude(jd);
  const moonLon = moonLongitude(jd);

  // Tithi calculation
  const tithiNum = Math.floor(normalizeAngle(moonLon - sunLon) / 12) + 1;
  const paksha = tithiNum <= 15 ? "Shukla" : "Krishna";
  const tithiNames = ["Pratipada","Dvitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi","Purnima","Pratipada","Dvitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi","Amavasya"];

  // Nakshatra calculation
  const nakshatraDivision = 360 / 27;
  const nakshatraNum = Math.floor(moonLon / nakshatraDivision);
  const nakshatraNames = ["Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishtha","Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"];

  // Yoga calculation
  const yogaDivision = 360 / 27;
  const yogaNum = Math.floor(normalizeAngle(sunLon + moonLon) / yogaDivision);
  const yogaNames = ["Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", "Sukarman", "Dhriti", "Shula", "Ganda", "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra", "Siddhi", "Vyatipata", "Variyana", "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma", "Indra", "Vaidhriti"];

  // Karana calculation
  const karanaNum = Math.floor(normalizeAngle(moonLon - sunLon) / 6);
  const karanaNames = ["Bava", "Balava", "Kaulava", "Taitila", "Garaja", "Vanija", "Visti", "Shakuni", "Chatushpada", "Naga", "Kintughna"];
  
  // Month calculation
  const monthNames = ["Chaitra","Vaishakha","Jyeshtha","Ashadha","Shravana","Bhadrapada","Ashwin","Kartika","Margashirsha","Pausha","Magha","Phalguna"];
  let monthIndex = Math.floor(sunLon / 30);
  if (monthSystem === "amanta") {
    if (paksha === "Krishna" && tithiNum > 15) monthIndex = (monthIndex + 1) % 12;
  } else {
     if (tithiNum > 15) {
        monthIndex = (monthIndex + 1) % 12;
    }
  }

  const { sunrise, sunset } = getSunriseSunset(date, lat, lon);

  return {
    tithi: tithiNames[tithiNum - 1],
    paksha,
    month: monthNames[monthIndex],
    nakshatra: nakshatraNames[nakshatraNum],
    yoga: yogaNames[yogaNum],
    karana: karanaNames[karanaNum % 11],
    sunrise,
    sunset
  };
}

export function getUpcomingFestivals(days = 90, monthSystem: "purnimanta" | "amanta" = "purnimanta"): Festival[] {
  const today = new Date();
  const results: Festival[] = [];
  const addedFestivals = new Set<string>();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const panchang = getPanchang(date, monthSystem);

    const todaysFestivals = festivalRules.filter(
      f => f.month === panchang.month && f.paksha === panchang.paksha && f.tithi === panchang.tithi
    );

    if (todaysFestivals.length > 0) {
      todaysFestivals.forEach(f => {
        if (!addedFestivals.has(f.name)) {
          results.push({
            name: f.name,
            date: date.toISOString().split("T")[0],
            description: `${panchang.paksha} Paksha, ${panchang.month}`,
            ...panchang
          });
          addedFestivals.add(f.name);
        }
      });
    }
  }
  
  return results.slice(0, 5);
}


export function getFestivalByDate(dateStr: string, monthSystem: "purnimanta" | "amanta" = "purnimanta"): Festival | undefined {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return undefined;
  }
  date.setUTCHours(12, 0, 0, 0);

  const panchang = getPanchang(date, monthSystem);
  const festivalRule = festivalRules.find(
    f => f.month === panchang.month && f.paksha === panchang.paksha && f.tithi === panchang.tithi
  );
  
  if (festivalRule) {
    return {
      name: festivalRule.name,
      date: date.toISOString().split("T")[0],
      description: `${panchang.paksha} Paksha, ${panchang.month}`,
      ...panchang
    }
  }
  return undefined;
}
