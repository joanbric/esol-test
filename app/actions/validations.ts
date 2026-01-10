import { z } from 'zod'

export const PunctuationSolutionSchema = z.object({
  position: z.number(),
  answer: z.string(),
  group: z.number(),
  punctuationTypeId: z.number()
})

export const SpellingSolutionSchema = z.object({
  SpellingWord: z.string(),
  SpellingWordPosition: z.number(),
  group: z.number()
})

export const MultiChoiceOptionSchema = z.object({
  gapNumber: z.number(),
  option: z.string(),
  isCorrect: z.boolean()
})

export const WordOrderSolutionSchema = z.object({
  id: z.number(),
  word: z.string().optional(),
  wordOrder: z.number(),
  wordOrder2: z.number().nullable(),
  wordOrder3: z.number().nullable().optional(),
  wordOrder4: z.number().nullable().optional()
})

export const WA1TestFieldsSchema = z.object({
  testTitle: z.string().min(1, 'Title is required'),
  testDescription: z.string().optional(),
  topicId: z.coerce.number(),
  levelId: z.coerce.number(),
  punctuationTitle: z.string(),
  punctuationScript: z.string(),
  spellingTitle: z.string(),
  spellingScript: z.string(),
  grammarTitle: z.string(),
  grammarScript: z.string(),
  wordOrders: z.array(z.string()).optional(),
  sentenceCompletions: z.array(z.string()).optional(),
  writeSentencesWithVerbs: z.array(z.string()).optional(),
  // Solutions/Answers
  punctuationAnswer: z.array(PunctuationSolutionSchema).optional(),
  SpellingAnswer: z.array(SpellingSolutionSchema).optional(),
  multiChoiceOptions: z.array(MultiChoiceOptionSchema).optional(),
  wordOrderSolution: z.array(WordOrderSolutionSchema).optional()
})
