import type { StateCreator } from 'zustand'
import type { WordOrderAnswer, WordOrderWordAnswer } from '@/types'

export type WordOrderStates = WordOrderAnswer & { wordOrderSentences: Array<{ id: string; sentence: string }> }

export type WordOrderActions = {
  setWordOrderExerciseId: (exerciseId: number) => void
  setWordOrderAnswer: (answer: WordOrderWordAnswer[][]) => void
  setWordOrderSentences: (sentences: Array<{ id: string; sentence: string }>) => void
}

export const createWordOrderStore: StateCreator<WordOrderStates & WordOrderActions> = (set) => ({
  WordOrderExerciseId: -1,
  WordOrderAnswer: [],
  wordOrderSentences: [],
  setWordOrderExerciseId: (exerciseId) => set({ WordOrderExerciseId: exerciseId }),
  setWordOrderAnswer: (answer) => set({ WordOrderAnswer: answer }),
  setWordOrderSentences: (sentences) => set({ wordOrderSentences: sentences })
})
