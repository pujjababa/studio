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
// This data is based on the Thakur Prasad Panchang.
export const festivalDatabase: FestivalData[] = [
    { name: 'Diwali', date: '2025-10-21' },
    { name: 'Deepavali', date: '2025-10-21' },
    { name: 'Holi', date: '2025-03-14' },
    { name: 'Raksha Bandhan', date: '2024-08-19'},
    { name: 'Raksha Bandhan', date: '2025-08-09' },
    { name: 'Dussehra', date: '2025-10-02' },
    { name: 'Vijayadashami', date: '2025-10-02' },
    { name: 'Janmashtami', date: '2025-08-26' },
    { name: 'Maha Shivratri', date: '2025-02-26' },
    { name: 'Ram Navami', date: '2025-04-06' },
    { name: 'Navratri Start', date: '2025-09-23' },
    { name: 'Makar Sankranti', date: '2025-01-14' },
];

    