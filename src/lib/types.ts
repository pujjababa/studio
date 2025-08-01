import {z} from 'zod';

export interface Pandit {
  id: string;
  name: string;
  specialties: string[];
  location: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  bio: string;
  verified: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  panditId: string;
}

export interface Content {
    id: string;
    type: 'blog' | 'video';
    title: string;
    excerpt: string;
    imageUrl: string;
    link: string;
    category: string;
}

export type PujaPlan = {
  pujaType: string;
  idealDate: string;
  reason: string;
};

export type HouseInfo = {
    house: number;
    sign: string;
    planets: string[];
};

export type DashaPeriod = {
    planet: string;
    startDate: string;
    endDate: string;
}

export type KundliResult = {
  coreDetails: {
    lagna: string;
    rashi: string;
    nakshatra: string;
  };
  panchangDetails: {
    tithi: string;
    karana: string;
    yoga: string;
    day: string;
  };
  planetaryPositions: {
    planet: string;
    sign: string;
    house: number;
    degrees: string;
  }[];
  doshas: {
    manglik: DoshaResult;
    kaalSarp: DoshaResult;
  };
  bhavaChakra: HouseInfo[];
  navamsaChart: HouseInfo[];
  vimshottariDasha: DashaPeriod[];
  basicPredictions: {
    personality: string;
    career: string;
    relationships: string;
  };
};

export type PanchangResult = {
    date: string;
    day: string;
    tithi: string;
    nakshatra: string;
    yoga: string;
    karana: string;
    sunrise: string;
    sunset: string;
    paksha: string;
    rahuKaal: string;
    gulikaKaal: string;
    yamaganda: string;
    abhijitMuhurat: string;
    festival?: string;
};


export type BirthDetails = {
  name: string;
  dateOfBirth: string; // YYYY-MM-DD
  timeOfBirth: string; // HH:MM
  placeOfBirth: string;
};

export type KundliMatchingInput = {
    boyDetails: BirthDetails;
    girlDetails: BirthDetails;
};

export type DoshaResult = {
  hasDosha: boolean;
  description: string;
};

export type KootaDetail = {
    name: string;
    boyAttribute: string;
    girlAttribute: string;
    pointsAwarded: number;
    maxPoints: number;
    description: string;
};

export type AdvancedCompatibility = {
    lagna: string;
    moonSign: string;
    venusMars: string;
    mental: string;
};

export type SpiritualCompatibilityIndex = {
    score: number;
    summary: string;
    marriageSuccessPrediction: string;
};

export type KundliMatchingResult = {
    score: number; // Out of 36
    ashtakootDetails: KootaDetail[];
    summary: string;
    remedy?: string;
    boyManglik: DoshaResult;
    girlManglik: DoshaResult;
    nadiDosha: DoshaResult;
    advancedCompatibility: AdvancedCompatibility;
    spiritualCompatibilityIndex: SpiritualCompatibilityIndex;
};

export type Muhurat = {
    date: string;
    day: string;
    tithi: string;
    nakshatra: string;
    muhuratWindow: string;
    lagna: string;
    notes: string;
};

export type PoruthamDetail = {
    name: string;
    isMatched: boolean;
    description: string;
};

export type NakshatraPoruthamResult = {
    matchingPoints: number; // Out of 10
    poruthamDetails: PoruthamDetail[];
    dasaSandhi: {
        hasDasaSandhi: boolean;
        description: string;
    };
    overallSummary: string;
    recommendation: string;
};

export type NakshatraPoruthamInput = {
    boyDetails: BirthDetails;
    girlDetails: BirthDetails;
};

export type PanditEnquiryResult = {
    confirmationMessage: string;
    nextSteps: string;
};

export const MarriagePathPredictorInputSchema = z.object({
  name: z.string().describe("The user's name."),
  dateOfBirth: z.string().describe("The user's date of birth in YYYY-MM-DD format."),
  timeOfBirth: z.string().describe("The user's time of birth in HH:MM format."),
  placeOfBirth: z.string().describe("The user's place of birth (e.g., city, country)."),
});
export type MarriagePathPredictorInput = z.infer<typeof MarriagePathPredictorInputSchema>;

export const MarriagePathPredictorOutputSchema = z.object({
  marriageAgePrediction: z.string().describe("An astrological prediction of the likely age range for marriage (e.g., 'between 25-28 years')."),
  partnerPersonalityProfile: z.string().describe("A descriptive profile of the potential partner's personality based on the 7th house and its lord."),
  idealMarriagePeriods: z.array(z.string()).describe("A list of astrologically favorable time periods for marriage (e.g., 'Mid 2026 to Late 2027')."),
  overallOutlook: z.string().describe("A summary of the overall outlook for married life, including potential strengths and challenges."),
});
export type MarriagePathPrediction = z.infer<typeof MarriagePathPredictorOutputSchema>;


export interface Temple {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  deity: string;
  liveAarti: boolean;
  onlineDarshan: boolean;
}

export const FestivalFinderInputSchema = z.object({
  query: z.string().describe("The user's natural language query about a festival, e.g., 'Raksha Bandhan 2025'."),
});
export type FestivalFinderInput = z.infer<typeof FestivalFinderInputSchema>;

const DailyFestivalDetailsSchema = z.object({
  dayName: z.string().describe("The specific name of this day within the festival (e.g., 'Durga Ashtami', 'Day 1: Nahay Khay')."),
  date: z.string().describe("The exact date of this festival day in YYYY-MM-DD format."),
  day: z.string().describe("The day of the week for this festival day."),
  summary: z.string().describe("A detailed summary for the user, highlighting the key date, day, and astrological timings (like Tithi start/end) that are most relevant to them for THIS specific day."),
  tithi: z.string().describe("The name of the Tithi on this festival day."),
  nakshatra: z.string().describe("The name of the Nakshatra on this festival day."),
  tithiBegins: z.string().describe("The start date and time of the tithi in 'YYYY-MM-DD HH:mm' format."),
  tithiEnds: z.string().describe("The end date and time of the tithi in 'YYYY-MM-DD HH:mm' format."),
  rituals: z.string().describe("A summary of the main rituals and customs followed during this specific day of the festival."),
  rahuKaal: z.string().describe('The inauspicious period of Rahu Kaal, in HH:MM AM/PM - HH:MM AM/PM format, calculated for this day.'),
  gulikaKaal: z.string().describe('The period of Gulika Kaal, in HH:MM AM/PM - HH:MM AM/PM format, calculated for this day.'),
  yamaganda: z.string().describe('The period of Yamaganda, in HH:MM AM/PM - HH:MM AM/PM format, calculated for this day.'),
  abhijitMuhurat: z.string().describe('The auspicious Abhijit Muhurat, in HH:MM AM/PM - HH:MM AM/PM format, calculated for this day.'),
});

export const FestivalFinderOutputSchema = z.object({
  festivalName: z.string().describe("The name of the festival, including the year (e.g., 'Durga Puja 2025')."),
  mainDescription: z.string().describe("A brief, beginner-friendly explanation of the festival's overall significance and history."),
  calculationMethod: z.string().describe("A step-by-step explanation of how the festival's main date was determined using traditional astrological principles. This should be a numbered list in a single string, with each step separated by a newline character (\\n)."),
  dailyDetails: z.array(DailyFestivalDetailsSchema).describe("An array containing the detailed breakdown for each day of the festival. For single-day festivals, this array will contain only one item."),
});
export type FestivalDetails = z.infer<typeof FestivalFinderOutputSchema>;
