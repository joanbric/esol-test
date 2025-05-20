import type { PunctuationAnswer, PunctuationWordAnswer } from '@/types'
import { StateCreator } from 'zustand'

export type PunctuationStates = PunctuationAnswer
export type PunctuationActions = {
  setPunctuationTitle: (title: PunctuationWordAnswer[]) => void
  setPunctuationWordTitle: (wordTitle: PunctuationWordAnswer) => void
  setPunctuationScript: (script: PunctuationWordAnswer[]) => void
  setPunctuationWordScript: (wordScript: PunctuationWordAnswer) => void
  setPunctuationExerciseId: (exerciseId: number) => void
}

const updateWordInArray = (
  array: PunctuationWordAnswer[],
  newWord: PunctuationWordAnswer
) => {
  const index = array.findIndex(
    (word) => word.position === newWord.position && word.group === newWord.group
  )
  if (index >= 0) {
    return array.toSpliced(index, 1, newWord)
  }
  return [...array, newWord]
}

export const createPunctuationStore: StateCreator<
  PunctuationStates & PunctuationActions
> = (set) => {
  return {
    PunctuationExerciseId: -1,
    PunctuationAnswer: [],
    setPunctuationTitle: (title) =>
      set((state) => ({
        PunctuationAnswer: [
          ...state.PunctuationAnswer.filter((word) => word.group !== 1),
          ...title
        ]
      })),
    setPunctuationWordTitle: (wordTitle) =>
      set((state) => ({
        PunctuationAnswer: updateWordInArray(state.PunctuationAnswer, wordTitle)
      })),
    punctuationScript: [],
    setPunctuationScript: (script) =>
      set((state) => ({
        PunctuationAnswer: [
          ...state.PunctuationAnswer.filter((word) => word.group !== 2),
          ...script
        ]
      })),
    setPunctuationWordScript: (wordScript) =>
      set((state) => ({
        PunctuationAnswer: updateWordInArray(
          state.PunctuationAnswer,
          wordScript
        )
      })),
    setPunctuationExerciseId: (exerciseId) =>
      set({ PunctuationExerciseId: exerciseId })
  }
}
