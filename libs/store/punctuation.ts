import type { StateCreator } from 'zustand'
import type { PunctuationAnswer, PunctuationWordAnswer } from '@/types'

export type PunctuationStates = PunctuationAnswer & {
  punctuationTitle: string
  punctuationScript: string
}
export type PunctuationActions = {
  setPunctuationTitleAnswer: (title: PunctuationWordAnswer[]) => void
  setPunctuationWordTitleAnswer: (wordTitle: PunctuationWordAnswer) => void
  setPunctuationScriptAnswer: (script: PunctuationWordAnswer[]) => void
  setPunctuationWordScriptAnswer: (wordScript: PunctuationWordAnswer) => void
  removePunctuationWordAnswer: (position: number, group: number) => void
  setPunctuationExerciseId: (exerciseId: number) => void
  setPunctuationTitle: (title: string) => void
  setPunctuationScript: (script: string) => void
}

const updateWordInArray = (array: PunctuationWordAnswer[], newWord: PunctuationWordAnswer) => {
  const index = array.findIndex((word) => word.position === newWord.position && word.group === newWord.group)
  if (index >= 0) {
    return array.toSpliced(index, 1, newWord)
  }
  return [...array, newWord]
}

export const createPunctuationStore: StateCreator<PunctuationStates & PunctuationActions> = (set) => {
  return {
    punctuationExerciseId: -1,
    punctuationAnswer: [],
    punctuationTitle: '',
    punctuationScript: '',
    setPunctuationTitleAnswer: (title) =>
      set((state) => ({
        punctuationAnswer: [...state.punctuationAnswer.filter((word) => word.group !== 1), ...title]
      })),
    setPunctuationWordTitleAnswer: (wordTitle) =>
      set((state) => ({
        punctuationAnswer: updateWordInArray(state.punctuationAnswer, wordTitle)
      })),
    setPunctuationScriptAnswer: (script) =>
      set((state) => ({
        punctuationAnswer: [...state.punctuationAnswer.filter((word) => word.group !== 2), ...script]
      })),
    setPunctuationWordScriptAnswer: (wordScript) =>
      set((state) => ({
        punctuationAnswer: updateWordInArray(state.punctuationAnswer, wordScript)
      })),
    removePunctuationWordAnswer: (position, group) =>
      set((state) => ({
        punctuationAnswer: state.punctuationAnswer.filter((a) => a.position !== position || a.group !== group)
      })),
    setPunctuationExerciseId: (exerciseId) => set({ punctuationExerciseId: exerciseId }),
    setPunctuationTitle: (title) => set({ punctuationTitle: title }),
    setPunctuationScript: (script) => set({ punctuationScript: script })
  }
}
