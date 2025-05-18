import { StateCreator } from 'zustand'
import { SpellingAnswer, SpellingWordAnswer } from '@/types'

export type SpellingStates = SpellingAnswer
export type SpellingActions = {
  setSpellingWord: (word: SpellingWordAnswer) => void
  removeSpellingWord: (position: number) => void
}

export const createSpellingStore: StateCreator<
  SpellingStates & SpellingActions
> = (set) => {
  return {
    SpellingExerciseId: 0,
    SpellingAnswer: [],
    setSpellingWord: (word) =>
      set((state) => {
        const index = state.SpellingAnswer.findIndex(
          (w) => w.SpellingWordPosition === word.SpellingWordPosition
        )
        if (index >= 0) {
          return {SpellingAnswer:  state.SpellingAnswer.toSpliced(index, 1, word)}
        }
        return {SpellingAnswer: [...state.SpellingAnswer, word]}
      }),
    removeSpellingWord: (position) =>
      set((state) => {
        const index = state.SpellingAnswer.findIndex(
          (w) => w.SpellingWordPosition === position
        )
        if (index >= 0) {
          return {SpellingAnswer: state.SpellingAnswer.toSpliced(index, 1)}
        }
        return {SpellingAnswer: state.SpellingAnswer}
      })
  }
}
