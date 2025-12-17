/**
 * @fileOverview Type definitions and schemas for the viva questions flow.
 */

import { z } from 'zod';

export const VivaQuestionsInputSchema = z.object({
    code: z.string().describe("The source code of the lab program."),
    aim: z.string().describe("The aim or problem statement of the lab program."),
});
export type VivaQuestionsInput = z.infer<typeof VivaQuestionsInputSchema>;

export const VivaQuestion = z.object({
    question: z.string().describe("A potential viva question a professor might ask."),
    answer: z.string().describe("A concise and accurate answer to the question."),
});
export type VivaQuestion = z.infer<typeof VivaQuestion>;

export const VivaQuestionsOutputSchema = z.object({
    questions: z.array(VivaQuestion).describe("An array of 5-7 viva questions with their answers."),
});
export type VivaQuestionsOutput = z.infer<typeof VivaQuestionsOutputSchema>;
