import { WritingA1Solution } from '@/types'
import { StateCreator } from 'zustand'

export type WritingA1SolutionsStates = WritingA1Solution

export type WritingA1SolutionsActions = {
  setWritingA1Solutions: (solution: WritingA1Solution) => void
}

export const createWritingA1SolutionsStore: StateCreator<
  WritingA1SolutionsStates & WritingA1SolutionsActions
> = (set) => ({
  multiChoiceSolution: [],
  punctuationSolution: [],
  spellingSolution: [],
  sentenceCompletionSolution: [],
  phrasalVerbsSolution: [],
  wordOrderSolution: [],

  setWritingA1Solutions: (solution) =>
    set({
      multiChoiceSolution: solution.multiChoiceSolution,
      punctuationSolution: solution.punctuationSolution,
      spellingSolution: solution.spellingSolution,
      sentenceCompletionSolution: solution.sentenceCompletionSolution,
      phrasalVerbsSolution: solution.phrasalVerbsSolution,
      wordOrderSolution: solution.wordOrderSolution
    })
})
