'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { pujaPlanner } from '@/ai/flows/puja-planner';
import type { PujaPlan } from '@/lib/types';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Calendar, BookHeart, Info } from 'lucide-react';

const formSchema = z.object({
  purpose: z.string().min(10, {
    message: 'Please describe your purpose in at least 10 characters.',
  }),
});

export function PujaPlannerClient() {
  const [pujaPlan, setPujaPlan] = useState<PujaPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purpose: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPujaPlan(null);
    try {
      const result = await pujaPlanner(values);
      setPujaPlan(result);
    } catch (error) {
      console.error('Error planning puja:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to generate a puja plan. Please try again.',
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">What is the purpose of your puja?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., for success in my new business, for my child's health, for a peaceful married life..."
                        className="min-h-[120px] text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  'Generate Puja Plan'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {pujaPlan && (
        <div className="mt-10 animate-in fade-in-50 duration-500">
          <h2 className="text-2xl font-headline text-center mb-4">Your Personalized Puja Plan</h2>
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center">
                <BookHeart className="mr-3 h-7 w-7 text-primary" />
                Recommended Puja: {pujaPlan.pujaType}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <Calendar className="mr-3 h-5 w-5 mt-1 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Ideal Date</h3>
                  <p className="text-muted-foreground">{pujaPlan.idealDate}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Info className="mr-3 h-5 w-5 mt-1 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Reasoning</h3>
                  <p className="text-muted-foreground">{pujaPlan.reason}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
