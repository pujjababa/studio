
'use server';
/**
 * @fileOverview An AI flow to generate a Puja Samagri list for a given festival.
 *
 * - generatePujaKit - A function that handles the puja kit generation process.
 * - PujaKitInput - The input type for the generatePujaKit function.
 * - PujaKitOutput - The return type for the generatePujaKit function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const PujaKitInputSchema = z.string().describe('The name of the Hindu festival in English.');
export type PujaKitInput = z.infer<typeof PujaKitInputSchema>;

const PujaSamagriSchema = z.object({
  item_hindi: z.string().describe('The name of the item in Hindi.'),
  item_english: z.string().describe('The name of the item in English.'),
  quantity: z.number().describe('The default quantity of the item.'),
  unit: z.string().describe('The unit of measurement for the quantity (e.g., "grams", "pieces", "packet").'),
  price_inr: z.number().describe('An estimated price for the item in Indian Rupees (INR).'),
});

const PujaKitOutputSchema = z.object({
  festival_english: z.string().describe('The official English name of the festival.'),
  festival_hindi: z.string().describe('The name of the festival in Hindi.'),
  puja_samagri: z.array(PujaSamagriSchema).describe('A list of items required for the puja.'),
  total_price_inr: z.number().describe('The sum of all item prices.'),
});
export type PujaKitOutput = z.infer<typeof PujaKitOutputSchema>;


export async function generatePujaKit(input: PujaKitInput): Promise<PujaKitOutput> {
  return generatePujaKitFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePujaKitPrompt',
  input: { schema: PujaKitInputSchema },
  output: { schema: PujaKitOutputSchema },
  prompt: `You are an expert on Hindu rituals and traditions. Your task is to generate a comprehensive Puja Samagri (list of items) for a given festival.

For the festival "{{@input}}", please provide a detailed list of all the items typically required for the puja ceremony.

- For each item, provide its name in both Hindi and English.
- Suggest a standard quantity and unit for each item.
- Provide a realistic, estimated price in Indian Rupees (INR) for each item.
- Ensure the festival name is provided in both English and Hindi.
- Calculate the total price of all items.

The output must be a well-structured JSON object.`,
});

const generatePujaKitFlow = ai.defineFlow(
  {
    name: 'generatePujaKitFlow',
    inputSchema: PujaKitInputSchema,
    outputSchema: PujaKitOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
        throw new Error("AI failed to generate a puja kit.");
    }

    // Recalculate total price to ensure accuracy
    const totalPrice = output.puja_samagri.reduce((sum, item) => sum + item.price_inr, 0);
    output.total_price_inr = totalPrice;

    return output;
  }
);
