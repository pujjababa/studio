'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { kundliMatching } from '@/ai/flows/kundli-matching';
import type { KundliMatchingResult, BirthDetails, DoshaResult, AdvancedCompatibility, SpiritualCompatibilityIndex, KootaDetail } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CalendarIcon, Loader2, Sparkles, User, Users, AlertTriangle, ShieldCheck, Heart, BrainCircuit, Star, Moon, Gem, ChevronsRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
                        <FormControl><Input placeholder="e.g., Delhi, India" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </CardContent>
    </Card>
);

const DoshaCard = ({ title, dosha, personName }: { title: string; dosha: DoshaResult; personName?: string }) => {
    const hasDosha = dosha.hasDosha;
    return (
        <Card className={cn(hasDosha ? "bg-destructive/10 border-destructive/20" : "bg-green-500/10 border-green-500/20")}>
            <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center">
                    {hasDosha ? <AlertTriangle className="mr-2 h-5 w-5 text-destructive" /> : <ShieldCheck className="mr-2 h-5 w-5 text-green-600" />}
                    {title}
                    {personName && <span className='text-lg font-normal ml-1'>- {personName}</span>}
                </CardTitle>
                <CardDescription className={cn(hasDosha ? "text-destructive" : "text-green-700")}>
                    {hasDosha ? "Dosha Detected" : "No Dosha Found"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{dosha.description}</p>
            </CardContent>
        </Card>
    );
};

const AdvancedCompatibilitySection = ({ advanced }: { advanced: AdvancedCompatibility }) => (
  <Card>
    <CardHeader>
        <CardTitle className="font-headline text-xl">Advanced Compatibility Insights</CardTitle>
        <CardDescription>A deeper look beyond the Guna Milan score.</CardDescription>
    </CardHeader>
    <CardContent>
        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
             <AccordionItem value="item-0">
                <AccordionTrigger className="font-semibold text-base">
                    <div className="flex items-center gap-2"><Star className="h-5 w-5 text-primary"/>Lagna Compatibility (Core Personality)</div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{advanced.lagna}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold text-base">
                   <div className="flex items-center gap-2"><Moon className="h-5 w-5 text-primary"/>Moon Sign Compatibility (Emotions)</div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{advanced.moonSign}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger className="font-semibold text-base">
                    <div className="flex items-center gap-2"><Heart className="h-5 w-5 text-primary"/>Venus-Mars Synergy (Love & Affection)</div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{advanced.venusMars}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger className="font-semibold text-base">
                     <div className="flex items-center gap-2"><BrainCircuit className="h-5 w-5 text-primary"/>Mental Temperament (Communication)</div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{advanced.mental}</AccordionContent>
            </AccordionItem>
        </Accordion>
    </CardContent>
  </Card>
);

const SpiritualCompatibilityIndexSection = ({ sci }: { sci: SpiritualCompatibilityIndex }) => (
    <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20">
        <CardHeader className="text-center">
            <Gem className="mx-auto h-8 w-8 text-primary mb-2"/>
            <CardTitle className="font-headline text-2xl">Spiritual Compatibility Index (SCI)</CardTitle>
            <CardDescription>Our unique AI-powered score for long-term harmony.</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
            <p className="text-7xl font-bold text-primary">{sci.score}<span className="text-3xl text-muted-foreground">/100</span></p>
            <p className="font-semibold text-lg text-foreground/90">{sci.marriageSuccessPrediction}</p>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">{sci.summary}</p>
        </CardContent>
    </Card>
);

const AshtakootDetails = ({ details, names }: { details: KootaDetail[], names: {boy: string, girl: string} }) => (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline text-xl">Ashtakoot Milan Details</CardTitle>
            <CardDescription>The detailed breakdown of the 36 Guna matching system.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Koota (Aspect)</TableHead>
                        <TableHead>{names.boy}</TableHead>
                        <TableHead>{names.girl}</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {details.map(koota => (
                        <TableRow key={koota.name}>
                            <TableCell className="font-medium">{koota.name}</TableCell>
                            <TableCell>{koota.boyAttribute}</TableCell>
                            <TableCell>{koota.girlAttribute}</TableCell>
                            <TableCell className="text-right font-bold">{koota.pointsAwarded} / {koota.maxPoints}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
)

const ResultDisplay = ({ result, names }: { result: KundliMatchingResult, names: {boy: string, girl: string} }) => {
    const scorePercentage = (result.score / 36) * 100;
    
    let progressColor = "bg-green-500";
    if (scorePercentage < 50) progressColor = "bg-yellow-500";
    if (scorePercentage < 25) progressColor = "bg-red-500";

    return (
        <div className="mt-10 animate-in fade-in-50 duration-500">
            <h2 className="text-2xl font-headline text-center mb-4">Compatibility Report</h2>
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">
                       Match between {names.boy} & {names.girl}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {result.spiritualCompatibilityIndex && (
                        <SpiritualCompatibilityIndexSection sci={result.spiritualCompatibilityIndex} />
                    )}

                    <div className="text-center">
                        <p className="text-lg text-muted-foreground">Guna Milan Score</p>
                        <p className="text-6xl font-bold text-primary my-2">{result.score}<span className="text-3xl text-muted-foreground">/36</span></p>
                        <Progress value={scorePercentage} className={cn("h-4", progressColor)} />
                    </div>
                     <Card className="p-4">
                        <h3 className="font-headline text-xl mb-2">Compatibility Summary</h3>
                        <p className="text-muted-foreground">{result.summary}</p>
                    </Card>

                     {result.ashtakootDetails && (
                        <AshtakootDetails details={result.ashtakootDetails} names={names} />
                    )}

                    <div>
                        <h3 className="font-headline text-xl mb-2 text-center">Dosha Analysis</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DoshaCard title="Manglik Dosha" dosha={result.boyManglik} personName={names.boy} />
                            <DoshaCard title="Manglik Dosha" dosha={result.girlManglik} personName={names.girl} />
                        </div>
                         <div className="mt-4">
                           <DoshaCard title="Nadi Dosha" dosha={result.nadiDosha} />
                        </div>
                    </div>

                    {result.advancedCompatibility && (
                        <AdvancedCompatibilitySection advanced={result.advancedCompatibility} />
                    )}

                    {result.remedy && (
                        <Card className="p-4 bg-amber-100/50 border-amber-300">
                            <h3 className="font-headline text-xl mb-2 text-amber-900">Suggested Remedy</h3>
                            <p className="text-amber-800">{result.remedy}</p>
                        </Card>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export function KundliMatchingClient() {
  const [matchingResult, setMatchingResult] = useState<KundliMatchingResult | null>(null);
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
      const result = await kundliMatching(input);
      setMatchingResult(result);
    } catch (error: any) {
      console.error('Error generating kundli matching report:', error);
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
                            Analyzing Compatibility...
                        </>
                        ) : (
                        <>
                            <Users className="mr-2 h-5 w-5" />
                            Calculate Match
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

    