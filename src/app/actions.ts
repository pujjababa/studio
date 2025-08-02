'use server';

import { generateGreeting, GenerateGreetingInput } from '@/ai/flows/generate-greeting';
import { z } from 'zod';

const formSchema = z.object({
  nameOrDescription: z.string().min(2, {
    message: 'Please enter at least 2 characters.',
  }).max(50, {
    message: 'Please enter at most 50 characters.'
  }),
});

export type FormState = {
    message: string;
    greeting?: string;
    fields?: Record<string, string>;
    issues?: string[];
};

export async function getGreetingAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    nameOrDescription: formData.get('nameOrDescription'),
  });

  if (!validatedFields.success) {
    const errorData = validatedFields.error.flatten();
    return {
      message: 'Validation failed.',
      fields: {
        nameOrDescription: formData.get('nameOrDescription')?.toString() ?? ''
      },
      issues: errorData.fieldErrors.nameOrDescription,
    };
  }
  
  try {
    const result = await generateGreeting(validatedFields.data as GenerateGreetingInput);
    return {
      message: 'success',
      greeting: result.greeting,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
