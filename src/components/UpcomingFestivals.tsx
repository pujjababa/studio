'use client';

import { useEffect, useState, useTransition } from 'react';
import { CalendarDays, RefreshCw, AlertCircle } from 'lucide-react';
import { FestivalCard } from './FestivalCard';
import type { Festival } from '@/lib/types';
import { Button } from './ui/button';
import { fetchFestivalsAction } from '@/app/actions';
import { Skeleton } from './ui/skeleton';

export function UpcomingFestivals() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, startRefreshTransition] = useTransition();

  const fetchFestivals = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchFestivalsAction();
      // @ts-ignore
      if (result.error) {
        // @ts-ignore
        setError(result.details || result.error);
        setFestivals([]);
      } else {
        setFestivals(result as Festival[]);
      }
    } catch (err: any) {
      console.error('Failed to fetch festivals:', err);
      setError(err.message || 'An unexpected error occurred.');
      setFestivals([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFestivals();
  }, []);

  const handleRefresh = () => {
    startRefreshTransition(async () => {
      await fetchFestivals();
    });
  };
  
  return (
    <section id="festivals" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <CalendarDays className="h-10 w-10 mx-auto text-primary mb-4" />
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            Upcoming Festivals
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Stay informed about the next auspicious dates in the Hindu calendar.
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
            className="mt-4"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-[150px] w-full rounded-lg" />
            ))
          ) : error ? (
            <div className="col-span-full text-center text-destructive flex items-center justify-center p-4 bg-destructive/10 rounded-md">
                <AlertCircle className="h-5 w-5 mr-2" />
                <div>
                    <p className="font-bold">Could not load upcoming festivals.</p>
                    <p className="text-xs">{error}</p>
                </div>
              </div>
          ) : festivals.length > 0 ? (
            festivals.map((festival) => (
              <FestivalCard key={festival.name} festival={festival} />
            ))
          ) : (
             <div className="col-span-full text-center text-muted-foreground p-4">
                No upcoming festivals found in the next few days. Please check back later.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
