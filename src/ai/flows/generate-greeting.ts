'use server';

/**
 * @fileOverview A personalized greeting AI agent.
 *
 * - generateGreeting - A function that handles the greeting generation process.
 * - GenerateGreetingInput - The input type for the generateGreeting function.
 * - GenerateGreetingOutput - The return type for the generateGreeting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateGreetingInputSchema = z.object({
  nameOrDescription: z
    .string()
    .describe("A name or description to personalize the greeting."),
});
export type GenerateGreetingInput = z.infer<typeof GenerateGreetingInputSchema>;

const GenerateGreetingOutputSchema = z.object({
  greeting: z.string().describe("The personalized greeting."),
});
export type GenerateGreetingOutput = z.infer<typeof GenerateGreetingOutputSchema>;

export async function generateGreeting(input: GenerateGreetingInput): Promise<GenerateGreetingOutput> {
  return generateGreetingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateGreetingPrompt',
  input: {schema: GenerateGreetingInputSchema},
  output: {schema: GenerateGreetingOutputSchema},
  prompt: `You are a friendly AI assistant. Generate a personalized greeting for the following name or description, making sure that the greeting is appropriate for the current year {{{new Date().getFullYear()}}}.\n\nName or Description: {{{nameOrDescription}}}`,
});

const generateGreetingFlow = ai.defineFlow(
  {
    name: 'generateGreetingFlow',
    inputSchema: GenerateGreetingInputSchema,
    outputSchema: GenerateGreetingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
