

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
    id: string;
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

export interface Festival {
  name: string;
  startDate: string;
  description?: string;
  tithi?: string;
}

export interface Panchang {
    tithi: { name: string };
    nakshatra: { name: string };
    yoga: { name: string };
    festival?: {
        name: string;
        description?: string;
    };
}
