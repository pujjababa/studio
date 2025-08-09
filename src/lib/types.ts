
export interface PujaSamagri {
    item_hindi: string;
    item_english: string;
    quantity: number;
    unit: string;
    price_inr: number;
}

export interface PujaKit {
    festival_hindi: string;
    festival_english: string;
    total_price_inr: number;
    puja_samagri: PujaSamagri[];
}


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
}

export interface Content {
    id:string;
    type: 'blog' | 'video';
    title: string;
    excerpt: string;
    imageUrl: string;
    link: string;
    category: string;
}

export interface Temple {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  deity: string;
  liveAarti: boolean;
  onlineDarshan: boolean;
}

export interface Festival extends Panchang {
  name: string;
  date: string;
  description?: string;
}

export interface Panchang {
    tithi: string;
    paksha: string;
    month: string;
    nakshatra: string;
    yoga: string;
    karana: string;
    sunrise?: string;
    sunset?: string;
}
