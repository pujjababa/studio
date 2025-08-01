/**
 * @fileOverview A collection of pure TypeScript functions for astrological calculations.
 * This file avoids heavy dependencies and uses pre-computed data for speed and compatibility.
 */

/**
 * Calculates the Tithi (lunar day) and Paksha (lunar fortnight) based on the
 * angular distance between the Sun and the Moon.
 * @param sunLon - The ecliptic longitude of the Sun.
 * @param moonLon - The ecliptic longitude of the Moon.
 * @returns An object containing the Tithi number, name, and Paksha.
 */
export function getTithi(sunLon: number, moonLon: number) {
  let diff = moonLon - sunLon;
  if (diff < 0) diff += 360;

  const tithiNumber = Math.floor(diff / 12) + 1;
  const paksha = tithiNumber <= 15 ? 'Shukla Paksha' : 'Krishna Paksha';
  const tithiIndex = (tithiNumber - 1) % 15;

  const tithiNames = [
    'Pratipada', 'Dvitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi',
    'Purnima' // Amavasya is handled separately
  ];
  
  if (tithiNumber === 15) {
      return { number: 15, name: 'Purnima', paksha, tithiIndex: 14 };
  }
  if (tithiNumber === 30) {
      return { number: 30, name: 'Amavasya', paksha, tithiIndex: 14 };
  }

  return {
    number: tithiNumber,
    name: tithiNames[tithiIndex],
    paksha,
    tithiIndex,
  };
}

/**
 * Calculates the Nakshatra (lunar mansion) based on the Moon's longitude.
 * @param moonLon - The ecliptic longitude of the Moon.
 * @returns An object containing the Nakshatra number and name.
 */
export function getNakshatra(moonLon: number) {
  const nakshatraIndex = Math.floor(moonLon / (13 + 1/3)); // 13.3333°
  const nakshatraNames = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta',
    'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];
  return {
    number: nakshatraIndex + 1,
    name: nakshatraNames[nakshatraIndex]
  };
}

/**
 * Calculates the Nitya Yoga based on the combined longitude of the Sun and Moon.
 * @param sunLon - The ecliptic longitude of the Sun.
 * @param moonLon - The ecliptic longitude of the Moon.
 * @returns An object containing the Yoga number and name.
 */
export function getYoga(sunLon: number, moonLon: number) {
  const total = (sunLon + moonLon) % 360;
  const yogaIndex = Math.floor(total / (13 + 1/3)); // 13.3333°
  const yogaNames = [
    'Vishkumbha', 'Preeti', 'Ayushman', 'Saubhagya', 'Shobhana',
    'Atiganda', 'Sukarma', 'Dhriti', 'Shoola', 'Ganda',
    'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra',
    'Siddhi', 'Vyatipata', 'Variyana', 'Parigha', 'Shiva',
    'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma',
    'Indra', 'Vaidhriti'
  ];
  return {
    number: yogaIndex + 1,
    name: yogaNames[yogaIndex]
  };
}

/**
 * Calculates the Karana based on the Tithi number.
 * @param tithi - A Tithi object from the getTithi function.
 * @returns An object containing the Karana name.
 */
export function getKarana(tithi: {number: number, tithiIndex: number}) {
  if (tithi.number === 1) return { name: 'Kimstughna' };
  if (tithi.number === 58 || tithi.number === 59 || tithi.number === 60) return { name: 'Shakuni'};
  if (tithi.number === 57) return { name: 'Chatushpada' };
  if (tithi.number === 58) return { name: 'Naga' };
  
  const bava = { name: 'Bava' };
  const balava = { name: 'Balava' };
  const kaulava = { name: 'Kaulava' };
  const taitila = { name: 'Taitila' };
  const garaja = { name: 'Garaja' };
  const vanija = { name: 'Vanija' };
  const vishti = { name: 'Vishti (Bhadra)' };

  const karanas = [bava, balava, kaulava, taitila, garaja, vanija, vishti];
  
  const karanaIndex = (tithi.tithiIndex) % 7;
  // Second half of tithi
  if ((tithi.number*2) % 2 !== 0) {
      return karanas[karanaIndex];
  } else { // First half
      if (karanaIndex === 0) return vishti;
      return karanas[karanaIndex-1];
  }
}

/**
 * Gets the Vara (weekday) name from the Javascript Date object's day number.
 * @param dayOfWeek - The day of the week (0 for Sunday, 1 for Monday, etc.).
 * @returns The name of the weekday.
 */
export function getVara(dayOfWeek: number) {
  const varaNames = [
    'Sunday', 'Monday', 'Tuesday',
    'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];
  return varaNames[dayOfWeek];
}

    