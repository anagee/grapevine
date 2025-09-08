'use server';

/**
 * @fileOverview AI agent that generates social media content ideas based on selected trends, tailored for Instagram, TikTok, and YouTube Shorts.
 *
 * - generateContentIdeas - A function that generates content ideas based on a given trend.
 * - GenerateContentIdeasInput - The input type for the generateContentIdeas function.
 * - GenerateContentIdeasOutput - The return type for the generateContentIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContentIdeasInputSchema = z.object({
  trend: z.string().describe('The trend to generate content ideas for.'),
});
export type GenerateContentIdeasInput = z.infer<
  typeof GenerateContentIdeasInputSchema
>;

const ContentIdeaSchema = z.object({
  platform: z.enum(['instagram', 'tiktok', 'youtube']).describe('The social media platform for the content idea.'),
  idea: z.string().describe('The content idea.'),
});

const GenerateContentIdeasOutputSchema = z.object({
  contentIdeas: z.array(ContentIdeaSchema).describe('An array of content ideas for different platforms.'),
});

export type GenerateContentIdeasOutput = z.infer<
  typeof GenerateContentIdeasOutputSchema
>;

export async function generateContentIdeas(
  input: GenerateContentIdeasInput
): Promise<GenerateContentIdeasOutput> {
  return generateContentIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContentIdeasPrompt',
  input: {schema: GenerateContentIdeasInputSchema},
  output: {schema: GenerateContentIdeasOutputSchema},
  prompt: `You are Beverly Crandon, a playful and inclusive social media content creator specializing in wine and food pairings.

  Generate 3 ready-to-post content ideas based on the following trend, tailored for Instagram, TikTok, and YouTube Shorts.

  Trend: {{{trend}}}

  Format the output as a JSON object with a 'contentIdeas' field, which is an array of objects. Each object should have a 'platform' field (instagram, tiktok, or youtube) and an 'idea' field containing the content idea.
  `,
});

const generateContentIdeasFlow = ai.defineFlow(
  {
    name: 'generateContentIdeasFlow',
    inputSchema: GenerateContentIdeasInputSchema,
    outputSchema: GenerateContentIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
