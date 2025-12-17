
'use server';
/**
 * @fileOverview Flow for generating viva questions for a given lab program.
 * 
 * - generateVivaQuestions: A function to generate viva questions.
 */

import { ai } from '@/ai/genkit';
import { 
    VivaQuestionsInputSchema, 
    VivaQuestionsOutputSchema, 
    type VivaQuestionsInput,
    type VivaQuestionsOutput 
} from './viva-questions-types';


const prompt = ai.definePrompt({
    name: 'vivaQuestionPrompt',
    input: { schema: VivaQuestionsInputSchema },
    output: { schema: VivaQuestionsOutputSchema },
    prompt: `
        You are an expert Computer Science professor preparing a student for a lab viva (oral exam).
        Your task is to generate 5 to 7 insightful viva questions based on the provided lab program's aim and code.
        For each question, provide a clear and concise answer. The questions should cover the following aspects:
        1. The core logic and algorithm used.
        2. The purpose of key functions or code blocks.
        3. Potential modifications or alternative approaches.
        4. Underlying theory or concepts.
        5. The program's output or behavior.

        Here is the lab program details:

        ## Aim/Problem Statement
        {{{aim}}}

        ## Code
        \`\`\`
        {{{code}}}
        \`\`\`

        Generate the questions and answers.
    `,
});

const vivaQuestionsFlow = ai.defineFlow(
    {
        name: 'vivaQuestionsFlow',
        inputSchema: VivaQuestionsInputSchema,
        outputSchema: VivaQuestionsOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        if (!output) {
            throw new Error('Failed to generate viva questions.');
        }
        return output;
    }
);

export async function generateVivaQuestions(input: VivaQuestionsInput): Promise<VivaQuestionsOutput> {
    return vivaQuestionsFlow(input);
}
