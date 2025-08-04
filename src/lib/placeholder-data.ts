import type { Pandit, Review, Content, Temple } from './types';

export const featuredPandits: Pandit[] = [
  {
    id: '1',
    name: 'Pandit Ramesh Sharma',
    specialties: ['Vedic Astrology', 'Griha Pravesh'],
    location: 'Varanasi, UP',
    rating: 4.9,
    reviewCount: 128,
    imageUrl: 'https://placehold.co/400x400',
    bio: 'With over 20 years of experience in Vedic rituals, Pandit Ramesh Sharma is a master of ancient traditions and astrology. He is known for his precise and heartfelt ceremonies.',
    verified: true,
  },
  {
    id: '2',
    name: 'Acharya Vidya Devi',
    specialties: ['Marriage Ceremonies', 'Vastu Shastra'],
    location: 'Jaipur, RJ',
    rating: 5.0,
    reviewCount: 95,
    imageUrl: 'https://placehold.co/400x400',
    bio: 'Acharya Vidya Devi specializes in creating beautiful and spiritually fulfilling marriage ceremonies. Her expertise in Vastu ensures harmony and prosperity.',
    verified: true,
  },
  {
    id: '3',
    name: 'Shastri Ji Ananth',
    specialties: ['Satyanarayan Puja', 'Havan'],
    location: 'Mumbai, MH',
    rating: 4.8,
    reviewCount: 210,
    imageUrl: 'https://placehold.co/400x400',
    bio: 'A third-generation Shastri, Ananth Ji brings deep knowledge and devotion to every puja. He is highly sought after for his powerful Havan ceremonies.',
    verified: true,
  },
  {
    id: '4',
    name: 'Pandita Sunita Joshi',
    specialties: ['Lakshmi Puja', 'Navagraha Shanti'],
    location: 'Delhi, DL',
    rating: 4.9,
    reviewCount: 150,
    imageUrl: 'https://placehold.co/400x400',
    bio: 'Pandita Sunita Joshi is renowned for her expertise in wealth and prosperity rituals. Her Navagraha Shanti pujas are known to bring peace and balance.',
    verified: true,
  },
];

export const testimonials: Omit<Review, "panditId">[] = [
  {
    id: '1',
    author: 'Anjali & Rohan Mehta',
    avatarUrl: 'https://placehold.co/100x100',
    rating: 5,
    comment:
      'PujaBaba helped us find the perfect pandit for our wedding. The AI planner was a lifesaver, and the ceremony was absolutely beautiful. Highly recommend!',
  },
  {
    id: '2',
    author: 'Suresh Patel',
    avatarUrl: 'https://placehold.co/100x100',
    rating: 5,
    comment:
      'I was skeptical about the AI planner, but it recommended a Ganesha Puja that was perfect for my new business venture. The pandit was knowledgeable and the experience was seamless.',
  },
  {
    id: '3',
    author: 'Priya Singh',
    avatarUrl: 'https://placehold.co/100x100',
    rating: 4,
    comment:
      "The content hub is a fantastic resource. I've learned so much about different fasts and mantras. It's my go-to app for spiritual knowledge.",
  },
];

export const contentHubItems: Content[] = [
    {
        id: '1',
        type: 'blog',
        title: 'The Significance of Diwali Puja',
        excerpt: 'Explore the deep spiritual meaning behind the festival of lights and how to perform the Lakshmi Puja at home.',
        imageUrl: 'https://placehold.co/600x400',
        link: '#',
        category: 'Festivals'
    },
    {
        id: '2',
        type: 'video',
        title: 'Learn to Chant the Gayatri Mantra',
        excerpt: 'A step-by-step video guide to mastering the pronunciation and rhythm of one of the most powerful Vedic mantras.',
        imageUrl: 'https://placehold.co/600x400',
        link: '#',
        category: 'Mantras'
    },
    {
        id: '3',
        type: 'blog',
        title: 'Vastu Tips for a Harmonious Home',
        excerpt: 'Simple Vastu Shastra principles you can apply to your home to attract positive energy, health, and prosperity.',
        imageUrl: 'https://placehold.co/600x400',
        link: '#',
        category: 'Spirituality'
    },
    {
        id: '4',
        type: 'blog',
        title: 'Understanding the 9 Forms of Devi in Navratri',
        excerpt: 'A guide to the Navadurga, the nine manifestations of the goddess Durga, celebrated during Navratri.',
        imageUrl: 'https://placehold.co/600x400',
        link: '#',
        category: 'Deities'
    },
     {
        id: '5',
        type: 'video',
        title: 'How to Prepare for a Satyanarayan Puja',
        excerpt: 'Our expert pandit walks you through all the necessary preparations and items for a successful Satyanarayan Puja.',
        imageUrl: 'https://placehold.co/600x400',
        link: '#',
        category: 'Rituals'
    },
    {
        id: '6',
        type: 'blog',
        title: 'The Benefits of Monday Fasting for Lord Shiva',
        excerpt: 'Learn about the traditions and spiritual benefits associated with observing a fast on Mondays to honor Lord Shiva.',
        imageUrl: 'https://placehold.co/600x400',
        link: '#',
        category: 'Fasting'
    }
];

export const famousTemples: Temple[] = [
    {
        id: '1',
        name: 'Kashi Vishwanath Temple',
        location: 'Varanasi, Uttar Pradesh',
        imageUrl: 'https://placehold.co/600x400',
        deity: 'Lord Shiva',
        liveAarti: true,
        onlineDarshan: true,
    },
    {
        id: '2',
        name: 'Vaishno Devi Temple',
        location: 'Katra, Jammu and Kashmir',
        imageUrl: 'https://placehold.co/600x400',
        deity: 'Goddess Vaishno Devi',
        liveAarti: true,
        onlineDarshan: true,
    },
    {
        id: '3',
        name: 'Tirupati Balaji Temple',
        location: 'Tirumala, Andhra Pradesh',
        imageUrl: 'https://placehold.co/600x400',
        deity: 'Lord Venkateswara',
        liveAarti: false,
        onlineDarshan: true,
    },
    {
        id: '4',
        name: 'Siddhivinayak Temple',
        location: 'Mumbai, Maharashtra',
        imageUrl: 'https://placehold.co/600x400',
        deity: 'Lord Ganesha',
        liveAarti: true,
        onlineDarshan: false,
    },
    {
        id: '5',
        name: 'Jagannath Temple',
        location: 'Puri, Odisha',
        imageUrl: 'https://placehold.co/600x400',
        deity: 'Lord Jagannath',
        liveAarti: true,
        onlineDarshan: false,
    },
    {
        id: '6',
        name: 'Meenakshi Temple',
        location: 'Madurai, Tamil Nadu',
        imageUrl: 'https://placehold.co/600x400',
        deity: 'Goddess Meenakshi',
        liveAarti: false,
        onlineDarshan: false,
    },
];
