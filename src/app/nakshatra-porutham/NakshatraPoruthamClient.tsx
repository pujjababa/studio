'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { nakshatraPorutham } from '@/ai/flows/nakshatra-porutham';
import type { NakshatraPoruthamResult, BirthDetails, PoruthamDetail } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CalendarIcon, Loader2, User, Users, CheckCircle2, XCircle, AlertTriangle, BadgeCheck, BadgeAlert, BadgeX } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { TimePicker } from '@/components/ui/time-picker';
import { DateInput } from '@/components/ui/date-input';

const birthDetailsSchema = z.object({
  name: z.string().min(2, 'Please enter a valid name.'),
  dob: z.date({ required_error: 'A date of birth is required.' }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please use HH:MM format.'),
  place: z.string().min(2, 'Please enter a valid place of birth.'),
});

const formSchema = z.object({
  boy: birthDetailsSchema,
  girl: birthDetailsSchema,
});

const BirthDetailsForm = ({ gender, form }: { gender: 'boy' | 'girl', form: any }) => (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center">
                <User className="mr-2 h-6 w-6"/>
                {gender === 'boy' ? "Boy's Details" : "Girl's Details"}
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <FormField
                control={form.control}
                name={`${gender}.name`}
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input placeholder="Full name" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name={`${gender}.dob`}
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
                    name={`${gender}.time`}
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Time of Birth</FormLabel>
                        <FormControl><TimePicker value={field.value} onChange={field.onChange} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
             <FormField
                control={form.control}
                name={`${gender}.place`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Place of Birth</FormLabel>
                        <FormControl><Input placeholder="e.g., Chennai, India" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </CardContent>
    </Card>
);

const PoruthamCard = ({ porutham }: { porutham: PoruthamDetail }) => {
    return (
        <Card className={cn("p-4", porutham.isMatched ? 'bg-green-500/10 border-green-500/20' : 'bg-destructive/10 border-destructive/20')}>
            <div className="flex items-start gap-4">
                {porutham.isMatched ? <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" /> : <XCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />}
                <div>
                    <p className="font-bold">{porutham.name}</p>
                    <p className="text-sm text-muted-foreground">{porutham.description}</p>
                </div>
            </div>
        </Card>
    );
}

const RecommendationBadge = ({ recommendation }: { recommendation: string }) => {
  let color = "bg-gray-500";
  let icon = <BadgeAlert className="mr-2 h-5 w-5" />;
  if (recommendation === 'Highly Recommended') {
    color = "bg-green-600";
    icon = <BadgeCheck className="mr-2 h-5 w-5" />;
  } else if (recommendation === 'Not Recommended') {
    color = "bg-destructive";
    icon = <BadgeX className="mr-2 h-5 w-5" />;
  }
  
  return (
    <div className={cn("inline-flex items-center text-white px-4 py-2 rounded-full font-bold text-lg", color)}>
        {icon}
        {recommendation}
    </div>
  );
}

const ResultDisplay = ({ result, names }: { result: NakshatraPoruthamResult, names: {boy: string, girl: string} }) => {
    const scorePercentage = (result.matchingPoints / 10) * 100;
    
    let progressColor = "bg-green-500";
    if (scorePercentage < 70) progressColor = "bg-yellow-500";
    if (scorePercentage < 50) progressColor = "bg-red-500";

    return (
        <div className="mt-10 animate-in fade-in-50 duration-500">
            <h2 className="text-2xl font-headline text-center mb-4">Porutham Report for {names.boy} & {names.girl}</h2>
            <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 space-y-6">
                    <div className="text-center space-y-4">
                         <RecommendationBadge recommendation={result.recommendation} />
                        <p className="text-muted-foreground">{result.overallSummary}</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Porutham Score</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-6xl font-bold text-primary my-2">{result.matchingPoints}<span className="text-3xl text-muted-foreground">/10</span></p>
                            <Progress value={scorePercentage} className={cn("h-4", progressColor)} />
                            <p className="text-sm text-muted-foreground mt-2">A score of 5 or more is generally considered a pass.</p>
                        </CardContent>
                    </Card>
                    
                    <Card className={cn(result.dasaSandhi.hasDasaSandhi ? "bg-destructive/10 border-destructive/20" : "bg-green-500/10 border-green-500/20")}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle />
                                Dasa Sandhi Dosha
                            </CardTitle>
                            <CardDescription>
                                {result.dasaSandhi.hasDasaSandhi ? "Dosha Detected" : "No Dosha Found"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{result.dasaSandhi.description}</p>
                        </CardContent>
                    </Card>

                    <div>
                        <h3 className="font-headline text-xl mb-4 text-center">Detailed Porutham Analysis</h3>
                        <div className="space-y-4">
                            {result.poruthamDetails.map(p => <PoruthamCard key={p.name} porutham={p} />)}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export function NakshatraPoruthamClient() {
  const [matchingResult, setMatchingResult] = useState<NakshatraPoruthamResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boy: { name: '', time: '12:00', place: '' },
      girl: { name: '', time: '12:00', place: '' },
    },
  });

  const formatBirthDetails = (values: z.infer<typeof birthDetailsSchema>): BirthDetails => ({
      name: values.name,
      dateOfBirth: format(values.dob, 'yyyy-MM-dd'),
      timeOfBirth: values.time,
      placeOfBirth: values.place,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setMatchingResult(null);
    try {
      const input = {
        boyDetails: formatBirthDetails(values.boy),
        girlDetails: formatBirthDetails(values.girl),
      };
      const result = await nakshatraPorutham(input);
      setMatchingResult(result);
    } catch (error: any) {
      console.error('Error generating porutham report:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: error.message || 'Failed to generate report. The AI model may be busy. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <BirthDetailsForm gender="boy" form={form} />
                    <BirthDetailsForm gender="girl" form={form} />
                </div>
                <div className="text-center">
                    <Button type="submit" disabled={isLoading} size="lg">
                        {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Analyzing Porutham...
                        </>
                        ) : (
                        <>
                            <Users className="mr-2 h-5 w-5" />
                            Calculate Porutham
                        </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>

      {matchingResult && (
        <ResultDisplay result={matchingResult} names={{boy: form.getValues('boy.name'), girl: form.getValues('girl.name')}}/>
      )}
    </div>
  );
}

    