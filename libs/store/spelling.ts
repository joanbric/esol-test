import type { StateCreator } from 'zustand'
import type { SpellingAnswer, SpellingWordAnswer } from '@/types'

export type SpellingStates = SpellingAnswer & { spellingTitle: string; spellingScript: string }
export type SpellingActions = {
  setSpellingWord: (word: SpellingWordAnswer) => void
  removeSpellingWord: (position: number, group: number) => void
  setSpellingTitle: (title: string) => void
  setSpellingScript: (script: string) => void
}

export const createSpellingStore: StateCreator<SpellingStates & SpellingActions> = (set) => {
  return {
    SpellingExerciseId: 0,
    SpellingAnswer: [],
    spellingTitle: '',
    spellingScript: '',
    setSpellingWord: (word) =>
      set((state) => {
        const index = state.SpellingAnswer.findIndex(
          (w) => w.SpellingWordPosition === word.SpellingWordPosition && w.group === word.group
        )
        if (index >= 0) {
          return { SpellingAnswer: state.SpellingAnswer.toSpliced(index, 1, word) }
        }
        return { SpellingAnswer: [...state.SpellingAnswer, word] }
      }),
    removeSpellingWord: (position, group) =>
      set((state) => {
        const index = state.SpellingAnswer.findIndex((w) => w.SpellingWordPosition === position && w.group === group)
        if (index >= 0) {
          return { SpellingAnswer: state.SpellingAnswer.toSpliced(index, 1) }
        }
        return { SpellingAnswer: state.SpellingAnswer }
      }),
    setSpellingTitle: (title) => set({ spellingTitle: title }),
    setSpellingScript: (script) => set({ spellingScript: script })
  }
}
