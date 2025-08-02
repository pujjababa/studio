'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Hand, WandSparkles } from 'lucide-react';
import { getGreetingAction, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
          Generating...
        </>
      ) : (
        <>
          <WandSparkles className="mr-2" />
          Generate Greeting
        </>
      )}
    </Button>
  );
}

export default function GreetingGenerator() {
  const [state, formAction] = useFormState(getGreetingAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [displayedGreeting, setDisplayedGreeting] = useState('');
  
  useEffect(() => {
    if (state.message === 'success' && state.greeting) {
      setDisplayedGreeting(state.greeting);
      formRef.current?.reset();
    } else if (state.message && state.message !== 'success' && !state.issues) {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-2xl shadow-primary/10 border-primary/20">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="p-4 bg-primary/10 rounded-full">
                <Hand className="h-12 w-12 text-primary" />
            </div>
          </div>
          <CardTitle className="font-headline text-3xl tracking-tight">QuickGreet</CardTitle>
          <p className="text-muted-foreground pt-2">
            Tell us who you are, and we'll craft a special greeting for you!
          </p>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nameOrDescription">Your Name or Description</Label>
              <Input
                id="nameOrDescription"
                name="nameOrDescription"
                placeholder="e.g., 'a friendly developer' or 'Jane'"
                required
                minLength={2}
                maxLength={50}
              />
               {state.issues && (
                <p className="text-sm font-medium text-destructive pt-1">
                  {state.issues[0]}
                </p>
              )}
            </div>
            <SubmitButton />
          </form>

          {displayedGreeting && (
            <div className="mt-8 pt-6 border-t animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-accent/10 p-6 rounded-lg text-center relative">
                 <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-accent/20 p-2 rounded-full">
                    <WandSparkles className="h-6 w-6 text-accent" />
                 </div>
                <p className="text-lg text-accent-foreground font-medium mt-2">{displayedGreeting}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
