'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { marriagePathPredictor } from '@/ai/flows/marriage-path-predictor';
import type { MarriagePathPrediction } from '@/lib/types';
import { format } from 'date-fns';

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
import { Loader2, Sparkles, User, Calendar as CalendarIcon, Heart, Clock, TrendingUp } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { TimePicker } from '@/components/ui/time-picker';
import { DateInput } from '@/components/ui/date-input';


const formSchema = z.object({
  name: z.string().min(2, "Please enter a valid name."),
  dob: z.date({ required_error: 'A date of birth is required.' }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Please enter time in HH:MM format (e.g., 14:30)",
  }),
  placeOfBirth: z.string().min(2, "Please enter a valid place of birth."),
});


export function MarriagePathClient() {
  const [prediction, setPrediction] = useState<MarriagePathPrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      time: '12:00',
      placeOfBirth: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPrediction(null);
    try {
        const input = {
            name: values.name,
            dateOfBirth: format(values.dob, 'yyyy-MM-dd'),
            timeOfBirth: values.time,
            placeOfBirth: values.placeOfBirth,
        };
      const result = await marriagePathPredictor(input);
      setPrediction(result);
    } catch (error: any) {
      console.error('Error generating prediction:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: error.message || 'Failed to generate prediction. The AI model may be busy. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <DateInput
                              value={field.value}
                              onChange={field.onChange}
                              fromYear={1990}
                              toYear={2000}
                            />
                          </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Time of Birth</FormLabel>
                      <FormControl>
                        <TimePicker value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="placeOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Place of Birth</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Delhi, India" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Your Prediction...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Predict My Marriage Path
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {prediction && (
        <div className="mt-10 animate-in fade-in-50 duration-500">
          <h2 className="text-2xl font-headline text-center mb-4">Your Marriage Path Prediction</h2>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <InfoBlock
                    icon={<Clock className="h-8 w-8 text-primary" />}
                    title="Marriage Age Prediction"
                    content={prediction.marriageAgePrediction}
                />
                <InfoBlock
                    icon={<User className="h-8 w-8 text-primary" />}
                    title="Potential Partner Profile"
                    content={prediction.partnerPersonalityProfile}
                />
                <div className="md:col-span-2">
                    <InfoBlock
                        icon={<TrendingUp className="h-8 w-8 text-primary" />}
                        title="Ideal Marriage Periods"
                        content={
                            <ul className="list-disc list-inside space-y-1">
                                {prediction.idealMarriagePeriods.map((period, index) => <li key={index}>{period}</li>)}
                            </ul>
                        }
                    />
                </div>
                 <div className="md:col-span-2">
                    <InfoBlock
                        icon={<Heart className="h-8 w-8 text-primary" />}
                        title="Overall Outlook for Married Life"
                        content={prediction.overallOutlook}
                    />
                </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function InfoBlock({ icon, title, content }: { icon: React.ReactNode, title: string, content: React.ReactNode }) {
    return (
        <Card className="p-6">
            <div className="flex items-center mb-4">
                {icon}
                <CardTitle className="font-headline text-xl ml-4">{title}</CardTitle>
            </div>
            <CardDescription className="text-base text-muted-foreground">{content}</CardDescription>
        </Card>
    )
}

    