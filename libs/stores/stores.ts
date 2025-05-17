import { create } from 'zustand'
import type { PunctuationWord } from '@/types'

interface WritingA1Store {
  punctuationTitle: PunctuationWord[]
  punctuationScript: PunctuationWord[]
  setPunctuationTitle: (title: PunctuationWord[]) => void
  setWordTitle: (wordTitle: PunctuationWord) => void
  setPunctuationScript: (script: PunctuationWord[]) => void
  setWordScript: (wordScript: PunctuationWord) => void
}

export const useWritingA1Store = create<WritingA1Store>((set) => ({
  punctuationTitle: [] as PunctuationWord[],
  setPunctuationTitle: (title: PunctuationWord[]) =>
    set({ punctuationTitle: title }),
  setWordTitle: (wordTitle: PunctuationWord) =>
    set((state) => {
      const newState = [...state.punctuationTitle]
      const index = newState.findIndex(word => word.position === wordTitle.position)
      if (index >= 0) newState[index] = wordTitle
      else newState.push(wordTitle)
      return { punctuationTitle: newState }
    }),
  punctuationScript: [] as PunctuationWord[],
  setPunctuationScript: (script: PunctuationWord[]) =>
    set({ punctuationScript: script }),
  setWordScript: (wordScript: PunctuationWord) =>
    set((state) => {
      const newState = [...state.punctuationScript]
      const index = newState.findIndex(word => word.position === wordScript.position)
      if (index >= 0) newState[index] = wordScript
      else newState.push(wordScript)
      return { punctuationScript: newState }
    })
}))
