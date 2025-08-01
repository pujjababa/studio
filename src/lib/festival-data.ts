/**
 * @fileOverview A local data source for festival dates.
 * This file contains manually curated festival data to ensure accuracy,
 * especially when external APIs or AI models are inconsistent.
 * This acts as a local, reliable database for the application.
 */

export interface FestivalData {
    name: string;
    // The date in YYYY-MM-DD format.
    date: string;
}

// We can add more festivals and years here over time.
// This data is based on reliable sources like Drik Panchang.
export const festivalDatabase: FestivalData[] = [
    // 2024
    { name: 'Raksha Bandhan', date: '2024-08-19'},
    { name: 'Janmashtami', date: '2024-08-26' },
    { name: 'Ganesh Chaturthi', date: '2024-09-07' },
    { name: 'Navratri', date: '2024-10-03' },
    { name: 'Dussehra', date: '2024-10-12' },
    { name: 'Diwali', date: '2024-11-01' },
    { name: 'Deepavali', date: '2024-11-01' },

    // 2025
    { name: 'Makar Sankranti', date: '2025-01-14' },
    { name: 'Maha Shivratri', date: '2025-02-26' },
    { name: 'Holi', date: '2025-03-14' },
    { name: 'Ram Navami', date: '2025-04-06' },
    { name: 'Raksha Bandhan', date: '2025-08-09' },
    { name: 'Krishna Janmashtami', date: '2025-08-16' },
    { name: 'Janmashtami', date: '2025-08-16' },
    { name: 'Navratri', date: '2025-09-23' },
    { name: 'Dussehra', date: '2025-10-02' },
    { name: 'Vijayadashami', date: '2025-10-02' },
    { name: 'Diwali', date: '2025-10-21' },
    { name: 'Deepavali', date: '2025-10-21' },
];

    
