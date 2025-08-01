
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { muhuratFinder } from '@/ai/flows/muhurat-finder';
import type { Muhurat } from '@/lib/types';
import { format, parse } from 'date-fns';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Search, CalendarCheck, Sparkles, Star, Sun, Moon, Clock, MapPin } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const currentYear = new Date().getFullYear();
const months = Array.from({length: 12}, (_, i) => {
    const date = new Date(currentYear, i, 1);
    return { value: format(date, 'MMMM yyyy'), label: format(date, 'MMMM yyyy') };
});
const nextYearMonths = Array.from({length: 12}, (_, i) => {
    const date = new Date(currentYear + 1, i, 1);
    return { value: format(date, 'MMMM yyyy'), label: format(date, 'MMMM yyyy') };
});

const allMonths = [...months, ...nextYearMonths];

const formSchema = z.object({
  month: z.string({ required_error: 'Please select a month.'}),
  region: z.string().optional(),
});

export function MarriageMuhuratClient() {
  const [muhuratDates, setMuhuratDates] = useState<Muhurat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchedMonth, setSearchedMonth] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        region: 'North India',
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSearchPerformed(true);
    setSearchedMonth(values.month);
    setMuhuratDates([]);
    try {
      const result = await muhuratFinder(values);
      setMuhuratDates(result.auspiciousDates);
       if (result.auspiciousDates.length === 0) {
        toast({
          title: 'No Auspicious Dates Found',
          description: `Our AI could not find any suitable wedding dates in the near future. This could be due to long-term astrological factors.`,
        });
      }
    } catch (error) {
      console.error('Error finding muhurat:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to find Muhurat dates. The AI model might be busy. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  const isFallbackSearch = muhuratDates.length > 0 && !muhuratDates.some(d => format(parse(d.date, 'yyyy-MM-dd', new Date()), 'MMMM yyyy') === searchedMonth);


  return (
    <div>
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="month"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Select Month</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a month" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {allMonths.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Region (Optional)</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g., North India" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Finding Auspicious Dates...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Find Muhurats
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

       {searchPerformed && !isLoading && (
        <div className="mt-10 animate-in fade-in-50 duration-500">
          {isFallbackSearch ? (
             <Alert className="mb-6">
                <AlertTitle className="font-headline text-lg">No Dates Found in {searchedMonth}</AlertTitle>
                <AlertDescription>
                  There were no auspicious dates in your selected month. Showing the next 5 available Muhurats instead.
                </AlertDescription>
              </Alert>
          ) : (
             <h2 className="text-2xl font-headline text-center mb-4">Auspicious Wedding Dates for {searchedMonth}</h2>
          )}

          {muhuratDates.length > 0 ? (
            <div className="space-y-4">
              {muhuratDates.map((muhurat, index) => (
                  <Card key={index} className="bg-primary/5 border-primary/20">
                      <CardHeader>
                          <CardTitle className="font-headline text-2xl flex items-center justify-between">
                              <span>{format(parse(muhurat.date, 'yyyy-MM-dd', new Date()), 'MMMM d, yyyy')}</span>
                              <span className="text-lg font-normal text-muted-foreground">{muhurat.day}</span>
                          </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                              <Card className="p-3">
                                  <CardTitle className="text-lg font-semibold flex items-center gap-2 mb-2"><Clock className="h-5 w-5 text-primary"/>Auspicious Window</CardTitle>
                                  <CardDescription className="font-mono font-bold text-lg text-foreground">{muhurat.muhuratWindow}</CardDescription>
                              </Card>
                               <Card className="p-3">
                                  <CardTitle className="text-lg font-semibold flex items-center gap-2 mb-2"><MapPin className="h-5 w-5 text-primary"/>Auspicious Lagna</CardTitle>
                                  <CardDescription className="font-mono font-bold text-lg text-foreground">{muhurat.lagna}</CardDescription>
                              </Card>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                              <div className="p-2 rounded-lg bg-background">
                                  <Sun className="h-6 w-6 mx-auto text-primary mb-1" />
                                  <p className="text-xs text-muted-foreground">Tithi</p>
                                  <p className="text-base font-bold">{muhurat.tithi}</p>
                              </div>
                              <div className="p-2 rounded-lg bg-background">
                                  <Star className="h-6 w-6 mx-auto text-primary mb-1" />
                                  <p className="text-xs text-muted-foreground">Nakshatra</p>
                                  <p className="text-base font-bold">{muhurat.nakshatra}</p>
                              </div>
                              <div className="col-span-2 sm:col-span-1 p-2 rounded-lg bg-background">
                                  <CalendarCheck className="h-6 w-6 mx-auto text-primary mb-1" />
                                  <p className="text-xs text-muted-foreground">Day</p>
                                  <p className="text-base font-bold">{muhurat.day}</p>
                              </div>
                          </div>
                          <div>
                             <h4 className="font-semibold flex items-center mb-1"><Sparkles className="h-4 w-4 mr-2 text-primary"/>Astro Note:</h4>
                             <p className="text-muted-foreground text-sm">{muhurat.notes}</p>
                          </div>
                      </CardContent>
                  </Card>
              ))}
            </div>
          ) : (
             <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                    No auspicious dates found. Please try a different month or region.
                </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
