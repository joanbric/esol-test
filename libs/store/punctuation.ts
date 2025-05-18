import type { PunctuationWord } from '@/types'
import { StateCreator } from 'zustand'

export type PunctuationStates = {
  punctuationTitle: PunctuationWord[]
  punctuationScript: PunctuationWord[]
}
export type PunctuationActions = {
  setPunctuationTitle: (title: PunctuationWord[]) => void
  setWordTitle: (wordTitle: PunctuationWord) => void
  setPunctuationScript: (script: PunctuationWord[]) => void
  setWordScript: (wordScript: PunctuationWord) => void
}

const updateWordInArray = (
  array: PunctuationWord[],
  newWord: PunctuationWord
) => {
  const index = array.findIndex((word) => word.position === newWord.position)
  if (index >= 0) {
    return array.map((word, i) => (i === index ? newWord : word))
  }
  return [...array, newWord]
}

export const createPunctuationStore: StateCreator<
  PunctuationStates & PunctuationActions
> = (set) => {
  return {
    punctuationTitle: [],
    setPunctuationTitle: (title) => set({ punctuationTitle: title }),
    setWordTitle: (wordTitle) =>
      set((state) => ({
        punctuationTitle: updateWordInArray(state.punctuationTitle, wordTitle)
      })),
    punctuationScript: [],
    setPunctuationScript: (script) => set({ punctuationScript: script }),
    setWordScript: (wordScript) =>
      set((state) => ({
        punctuationScript: updateWordInArray(
          state.punctuationScript,
          wordScript
        )
      }))
  }
}
