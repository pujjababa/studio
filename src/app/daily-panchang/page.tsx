'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchDailyPanchangAction } from '../actions';
import type { Panchang } from '@/lib/types';
import { Calendar, AlertCircle } from 'lucide-react';

export default function DailyPanchangPage() {
  const [panchang, setPanchang] = useState<Panchang | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPanchang = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Using Mumbai, India as default coordinates
        const coordinates = '19.0760,72.8777';
        const now = new Date();
        const datetime = now.toISOString();

        const result = await fetchDailyPanchangAction(datetime, coordinates);
        
        // @ts-ignore
        if (result.error) {
          // @ts-ignore
          setError(result.details || result.error);
        } else {
          setPanchang(result as Panchang);
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPanchang();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-12">
        <Calendar className="h-12 w-12 mx-auto text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          Today's Panchang
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Daily Hindu calendar details for your location.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-center">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            ) : error ? (
              <div className="text-center text-destructive flex items-center justify-center p-4 bg-destructive/10 rounded-md">
                <AlertCircle className="h-5 w-5 mr-2" />
                <div>
                    <p className="font-bold">Could not load Panchang data.</p>
                    <p className="text-xs">{error}</p>
                </div>
              </div>
            ) : panchang ? (
              <ul className="divide-y">
                <li className="flex justify-between items-center py-3">
                  <span className="font-semibold text-muted-foreground">Tithi</span>
                  <span className="font-bold text-lg">{panchang.tithi}</span>
                </li>
                <li className="flex justify-between items-center py-3">
                  <span className="font-semibold text-muted-foreground">Nakshatra</span>
                  <span className="font-bold text-lg">{panchang.nakshatra}</span>
                </li>
                <li className="flex justify-between items-center py-3">
                  <span className="font-semibold text-muted-foreground">Yoga</span>
                  <span className="font-bold text-lg">{panchang.yoga}</span>
                </li>
              </ul>
            ) : (
                <div className="text-center text-muted-foreground p-4">
                    No Panchang data available at the moment.
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
