'use server';

/**
 * @fileOverview This file defines a Genkit flow for customizing captions based on platform-specific guidelines.
 *
 * - customizeCaption - A function that takes trend information and platform, and returns a customized caption.
 * - CustomizeCaptionInput - The input type for the customizeCaption function.
 * - CustomizeCaptionOutput - The return type for the customizeCaption function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CustomizeCaptionInputSchema = z.object({
  trendName: z.string().describe('The name of the current trend.'),
  platform: z.enum(['Instagram', 'TikTok', 'YouTube Shorts']).describe('The social media platform for the caption.'),
});
export type CustomizeCaptionInput = z.infer<typeof CustomizeCaptionInputSchema>;

const CustomizeCaptionOutputSchema = z.object({
  caption: z.string().describe('The customized caption for the specified platform, including a hook, hashtags, and a call to action.'),
});
export type CustomizeCaptionOutput = z.infer<typeof CustomizeCaptionOutputSchema>;

export async function customizeCaption(input: CustomizeCaptionInput): Promise<CustomizeCaptionOutput> {
  return customizeCaptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customizeCaptionPrompt',
  input: {schema: CustomizeCaptionInputSchema},
  output: {schema: CustomizeCaptionOutputSchema},
  prompt: `You are Beverly Crandon, a playful and inclusive social media expert.

  Generate a caption for the following trend, tailored for the specified platform. The caption should include a hook, relevant hashtags, and a call to action.

  Trend: {{{trendName}}}
  Platform: {{{platform}}}

  Follow platform-specific guidelines for caption length and style.
  `,
});

const customizeCaptionFlow = ai.defineFlow(
  {
    name: 'customizeCaptionFlow',
    inputSchema: CustomizeCaptionInputSchema,
    outputSchema: CustomizeCaptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
