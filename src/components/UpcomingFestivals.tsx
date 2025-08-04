'use client';

import { useEffect, useState, useTransition } from 'react';
import { CalendarDays, RefreshCw } from 'lucide-react';
import { FestivalCard } from './FestivalCard';
import type { Festival } from '@/lib/types';
import { Button } from './ui/button';
import { fetchFestivalsAction } from '@/app/actions';
import { Skeleton } from './ui/skeleton';

export function UpcomingFestivals() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, startRefreshTransition] = useTransition();

  const fetchFestivals = async () => {
    try {
      const upcomingFestivals = await fetchFestivalsAction();
      setFestivals(upcomingFestivals);
    } catch (error) {
      console.error('Failed to fetch festivals:', error);
      // Optionally, set an error state here to show in the UI
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
            disabled={isRefreshing}
            className="mt-4"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-[150px] w-full rounded-lg" />
            ))
          ) : festivals.length > 0 ? (
            festivals.map((festival) => (
              <FestivalCard key={festival.name} festival={festival} />
            ))
          ) : (
             <div className="col-span-full text-center text-muted-foreground">
                Could not load upcoming festivals. Please try refreshing.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
