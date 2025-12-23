import { StateCreator } from 'zustand'
import { WordOrderAnswer, WordOrderWordAnswer} from '@/types'

export type WordOrderStates = WordOrderAnswer

export type WordOrderActions = {
  setWordOrderExerciseId: (exerciseId: number) => void
  setWordOrderAnswer: (answer: WordOrderWordAnswer[][]) => void
}

export const createWordOrderStore: StateCreator<
  WordOrderStates & WordOrderActions
> = (set) => ({
  WordOrderExerciseId: -1,
  WordOrderAnswer: [],
  setWordOrderExerciseId: (exerciseId) =>
    set({ WordOrderExerciseId: exerciseId }),
  setWordOrderAnswer: (answer) => set({ WordOrderAnswer: answer })
})
