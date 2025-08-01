'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { kundliGenerator } from '@/ai/flows/kundli-generator';
import type { KundliResult as KundliGeneratorOutput, DoshaResult as DoshaResultType, HouseInfo } from '@/lib/types';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Star, Moon, Sun, Users, ShieldAlert, Heart, Briefcase, BrainCircuit, Calendar as CalendarIcon, CheckCircle2, XCircle, Home, TrendingUp } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TimePicker } from '@/components/ui/time-picker';
import { DateInput } from '@/components/ui/date-input';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Please enter a valid name.',
  }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Please enter time in HH:MM format (e.g., 14:30)",
  }),
  place: z.string().min(2, {
    message: "Please enter a valid place of birth.",
  }),
});

const DoshaCard = ({ title, dosha }: { title: string; dosha: DoshaResultType }) => {
    const hasDosha = dosha.hasDosha;
    return (
        <Card className={cn("w-full", hasDosha ? "bg-destructive/10 border-destructive/20" : "bg-green-500/10 border-green-500/20")}>
            <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center">
                    {hasDosha ? <XCircle className="mr-2 h-5 w-5 text-destructive" /> : <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />}
                    {title}
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

const PredictionCard = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2">
                {icon}
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{text}</p>
        </CardContent>
    </Card>
)

const HouseChart = ({ title, houses }: { title: string; houses: HouseInfo[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>House</TableHead>
        <TableHead>Sign</TableHead>
        <TableHead>Planets</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {houses.map(h => (
        <TableRow key={`${title}-${h.house}`}>
          <TableCell className="font-medium">{h.house}</TableCell>
          <TableCell>{h.sign}</TableCell>
          <TableCell>{h.planets.length > 0 ? h.planets.join(', ') : 'None'}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);


export function KundliGeneratorClient() {
  const [kundliResult, setKundliResult] = useState<KundliGeneratorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      time: '12:00',
      place: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setKundliResult(null);
    try {
        const input = {
            name: values.name,
            dateOfBirth: format(values.dob, 'yyyy-MM-dd'),
            timeOfBirth: values.time,
            placeOfBirth: values.place,
        };
      const result = await kundliGenerator(input);
      setKundliResult(result);
    } catch (error: any) {
      console.error('Error generating kundli:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: error.message || 'Failed to generate Kundli. Please try again.',
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
                name="place"
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
                    Generating Kundli...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Kundli
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {kundliResult && (
        <div className="mt-10 animate-in fade-in-50 duration-500">
          <h2 className="text-2xl font-headline text-center mb-6">Your Detailed Kundli Report for {form.getValues('name')}</h2>
          
          <Accordion type="multiple" defaultValue={['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6', 'item-7']} className="w-full space-y-4">
              
              <AccordionItem value="item-1" className="border-b-0">
                  <Card className="shadow-sm">
                      <AccordionTrigger className="p-6 font-headline text-xl">Core Astrological Details</AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                              <Card className="p-4">
                                  <Sun className="h-8 w-8 mx-auto text-primary mb-2" />
                                  <p className="text-sm text-muted-foreground">Lagna (Ascendant)</p>
                                  <p className="text-xl font-bold">{kundliResult.coreDetails.lagna}</p>
                              </Card>
                              <Card className="p-4">
                                  <Moon className="h-8 w-8 mx-auto text-primary mb-2" />
                                  <p className="text-sm text-muted-foreground">Rashi (Moon Sign)</p>
                                  <p className="text-xl font-bold">{kundliResult.coreDetails.rashi}</p>
                              </Card>
                              <Card className="p-4">
                                  <Star className="h-8 w-8 mx-auto text-primary mb-2" />
                                  <p className="text-sm text-muted-foreground">Nakshatra (Birth Star)</p>
                                  <p className="text-xl font-bold">{kundliResult.coreDetails.nakshatra}</p>
                              </Card>
                          </div>
                      </AccordionContent>
                  </Card>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-b-0">
                  <Card className="shadow-sm">
                      <AccordionTrigger className="p-6 font-headline text-xl">Panchang at Birth</AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                              <Card className="p-3"><p className="text-sm text-muted-foreground">Day</p><p className="font-bold">{kundliResult.panchangDetails.day}</p></Card>
                              <Card className="p-3"><p className="text-sm text-muted-foreground">Tithi</p><p className="font-bold">{kundliResult.panchangDetails.tithi}</p></Card>
                              <Card className="p-3"><p className="text-sm text-muted-foreground">Yoga</p><p className="font-bold">{kundliResult.panchangDetails.yoga}</p></Card>
                              <Card className="p-3"><p className="text-sm text-muted-foreground">Karana</p><p className="font-bold">{kundliResult.panchangDetails.karana}</p></Card>
                          </div>
                      </AccordionContent>
                  </Card>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b-0">
                  <Card className="shadow-sm">
                      <AccordionTrigger className="p-6 font-headline text-xl">Planetary Positions</AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                          <Table>
                              <TableHeader>
                                  <TableRow>
                                      <TableHead>Planet</TableHead>
                                      <TableHead>Sign</TableHead>
                                      <TableHead className="text-right">House</TableHead>
                                      <TableHead className="text-right">Degrees</TableHead>
                                  </TableRow>
                              </TableHeader>
                              <TableBody>
                                  {kundliResult.planetaryPositions.map(p => (
                                      <TableRow key={p.planet}>
                                          <TableCell className="font-medium">{p.planet}</TableCell>
                                          <TableCell>{p.sign}</TableCell>
                                          <TableCell className="text-right">{p.house}</TableCell>
                                          <TableCell className="text-right">{p.degrees}</TableCell>
                                      </TableRow>
                                  ))}
                              </TableBody>
                          </Table>
                      </AccordionContent>
                  </Card>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b-0">
                  <Card className="shadow-sm">
                      <AccordionTrigger className="p-6 font-headline text-xl">Bhava & Divisional Charts</AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 grid md:grid-cols-2 gap-8">
                          <div>
                            <h3 className="font-semibold text-lg mb-2 text-center flex items-center justify-center gap-2"><Home className="h-5 w-5 text-primary" />Bhava Chakra (Main Chart)</h3>
                            <HouseChart title="Bhava" houses={kundliResult.bhavaChakra} />
                          </div>
                           <div>
                            <h3 className="font-semibold text-lg mb-2 text-center flex items-center justify-center gap-2"><Sparkles className="h-5 w-5 text-primary" />Navamsa (D9) Chart</h3>
                            <HouseChart title="Navamsa" houses={kundliResult.navamsaChart} />
                          </div>
                      </AccordionContent>
                  </Card>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b-0">
                  <Card className="shadow-sm">
                      <AccordionTrigger className="p-6 font-headline text-xl">Dosha Analysis</AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                          <div className="flex flex-col md:flex-row gap-4">
                              <DoshaCard title="Manglik Dosha" dosha={kundliResult.doshas.manglik} />
                              <DoshaCard title="Kaal Sarp Dosha" dosha={kundliResult.doshas.kaalSarp} />
                          </div>
                      </AccordionContent>
                  </Card>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-b-0">
                <Card className="shadow-sm">
                  <AccordionTrigger className="p-6 font-headline text-xl">Vimshottari Dasha</AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mahadasha Planet</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>End Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {kundliResult.vimshottariDasha.map(dasha => (
                          <TableRow key={dasha.planet}>
                            <TableCell className="font-medium">{dasha.planet}</TableCell>
                            <TableCell>{dasha.startDate}</TableCell>
                            <TableCell>{dasha.endDate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </Card>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-b-0">
                  <Card className="shadow-sm">
                      <AccordionTrigger className="p-6 font-headline text-xl">Life Predictions</AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 space-y-4">
                          <PredictionCard icon={<BrainCircuit className="h-6 w-6 text-primary"/>} title="Personality" text={kundliResult.basicPredictions.personality} />
                          <PredictionCard icon={<Briefcase className="h-6 w-6 text-primary"/>} title="Career" text={kundliResult.basicPredictions.career} />
                          <PredictionCard icon={<Heart className="h-6 w-6 text-primary"/>} title="Relationships" text={kundliResult.basicPredictions.relationships} />
                      </AccordionContent>
                  </Card>
              </AccordionItem>

          </Accordion>
        </div>
      )}
    </div>
  );
}
