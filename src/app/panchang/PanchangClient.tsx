
'use client';

import { useState, useEffect } from 'react';
import type { PanchangResult as PanchangDetails } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sun, Moon, Sparkles, Star, Clock, Loader2, Calendar as CalendarIcon, CheckCircle, Ban } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { panchangGenerator } from '@/ai/flows/panchang-generator';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { lookupPlanetaryData } from '@/lib/astrology-lookup';
import { getTithi, getNakshatra, getYoga, getKarana, getVara } from '@/lib/astrology-calculator';


export function PanchangClient() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [panchangDetails, setPanchangDetails] = useState<Partial<PanchangDetails> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const getErrorMessage = (e: any) => {
    let description = 'Failed to get a response from the AI model. Please try again.';
    if (e.message?.includes('503') || e.message?.includes('overloaded')) {
        description = 'The AI model is currently overloaded. Please try again in a moment.';
    } else if (e.message) {
        return e.message;
    }
    return description;
  }
  
  async function getPanchangDetails(inputDate: Date) {
      setIsLoading(true);
      setError(null);
      
      // Step 1: Perform instant local calculations
      const planetaryData = lookupPlanetaryData(format(inputDate, 'yyyy-MM-dd'));
      if (!planetaryData) {
          const errorMessage = `Could not find planetary data for ${format(inputDate, 'yyyy-MM-dd')}. Please use a date within the supported range.`;
          setError(errorMessage);
          setPanchangDetails(null);
          setIsLoading(false);
          toast({ variant: 'destructive', title: 'Error', description: errorMessage });
          return;
      }
      
      const dateObj = new Date(`${format(inputDate, 'yyyy-MM-dd')}T12:00:00Z`);
      const dayOfWeek = dateObj.getUTCDay();
      const tithi = getTithi(planetaryData.Sun.longitude, planetaryData.Moon.longitude);
      const nakshatra = getNakshatra(planetaryData.Moon.longitude);
      const yoga = getYoga(planetaryData.Sun.longitude, planetaryData.Moon.longitude);
      const karana = getKarana(tithi);
      const vara = getVara(dayOfWeek);
      
      const localDetails: Partial<PanchangDetails> = {
          date: format(inputDate, 'yyyy-MM-dd'),
          day: vara,
          tithi: tithi.name,
          nakshatra: nakshatra.name,
          yoga: yoga.name,
          karana: karana.name,
          paksha: tithi.paksha,
      };

      // Instantly update the UI with local data
      setPanchangDetails(localDetails);
      setIsLoading(false); // Stop main loader, let specific fields show loading state

      // Step 2: Fetch AI-based data in the background
      try {
        const result = await panchangGenerator({
            date: format(inputDate, 'yyyy-MM-dd'),
            location: 'New Delhi, India',
        });
        
        // Merge AI data with local data
        setPanchangDetails(prevDetails => ({...prevDetails, ...result}));

      } catch (e: any) {
        console.error('Error fetching panchang timings:', e);
        const description = getErrorMessage(e);
        setError(`Failed to fetch Panchang timings. ${description}`);
        toast({
          variant: 'destructive',
          title: 'An error occurred',
          description: description,
        });
      }
  }

  useEffect(() => {
    if (!date) return;
    getPanchangDetails(date);
  }, [date]);
  

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="font-headline text-3xl">Daily Panchang</CardTitle>
              <CardDescription>
                Details for {date ? format(date, 'PPP') : 'today'} in New Delhi, India
              </CardDescription>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal mt-4 sm:mt-0 sm:w-[280px]',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar 
                    mode="single" 
                    selected={date} 
                    onSelect={setDate} 
                    initialFocus 
                    captionLayout="dropdown-buttons"
                    fromYear={1990}
                    toYear={2000}
                />
              </PopoverContent>
            </Popover>
          </div>
           <CardDescription className='text-xs pt-2'>(Note: Some data is generated by AI.)</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[400px]">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Generating Panchang for {date ? format(date, 'PPP') : ''}...</p>
            </div>
          )}
          {error && !isLoading && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {panchangDetails && !isLoading && !error &&(
            <div className="space-y-6 animate-in fade-in-50 duration-500">
                {panchangDetails.festival ? (
                    <Alert className="bg-primary/10 border-primary/20">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <AlertTitle className="font-headline text-lg">Special Occasion</AlertTitle>
                        <AlertDescription>{panchangDetails.festival}</AlertDescription>
                    </Alert>
                ) : (
                  panchangDetails.sunrise === undefined && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <InfoCard icon={<Sun className="opacity-70" />} title="Sunrise" value={panchangDetails.sunrise} />
                    <InfoCard icon={<Sun />} title="Sunset" value={panchangDetails.sunset} />
                    <InfoCard icon={<Moon />} title="Paksha" value={panchangDetails.paksha} />
                    <InfoCard icon={<CalendarIcon />} title="Day" value={panchangDetails.day} />
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard icon={<Star />} title="Tithi" value={panchangDetails.tithi} />
                    <InfoCard icon={<Star className="opacity-70"/>} title="Nakshatra" value={panchangDetails.nakshatra} />
                </div>
                
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard icon={<Sparkles />} title="Yoga" value={panchangDetails.yoga} />
                    <InfoCard icon={<Sparkles className="opacity-70"/>} title="Karana" value={panchangDetails.karana} />
                </div>
                
                <Separator />

                <div>
                    <h3 className="text-center font-headline text-xl mb-4">Auspicious & Inauspicious Timings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-semibold flex items-center gap-2 text-green-700"><CheckCircle />Auspicious</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <TimingRow label="Abhijit Muhurat" value={panchangDetails.abhijitMuhurat} />
                                <TimingRow label="Gulika Kaal" value={panchangDetails.gulikaKaal} />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-semibold flex items-center gap-2 text-destructive"><Ban />Inauspicious</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <TimingRow label="Rahu Kaal" value={panchangDetails.rahuKaal} />
                                <TimingRow label="Yamaganda" value={panchangDetails.yamaganda} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function InfoCard({ icon, title, value }: { icon: React.ReactNode, title: string, value?: string }) {
  return (
    <Card className="p-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-2 text-muted-foreground">
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>
      {value ? (
        <p className="text-base font-bold text-foreground">{value}</p>
      ) : (
        <Loader2 className="h-5 w-5 mx-auto animate-spin" />
      )}
    </Card>
  );
}

function TimingRow({ label, value }: { label: string, value?: string }) {
    return (
        <div className="flex justify-between items-center text-sm border-b pb-1 last:border-b-0 min-h-[28px]">
            <span className="text-muted-foreground">{label}</span>
            {value ? (
                <span className="font-mono font-semibold">{value}</span>
            ) : (
                <Loader2 className="h-4 w-4 animate-spin" />
            )}
        </div>
    )
}

    