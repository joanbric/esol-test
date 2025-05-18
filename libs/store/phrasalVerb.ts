import { PhrasalVerbsAnswer } from '@/types'
import { StateCreator } from 'zustand'

export type PhrasalVerbStates = PhrasalVerbsAnswer

export type PhrasalVerbActions = {
  setPhrasalVerbsAnswer: (answer: { id: number; userAnswer: string }) => void
  setPhrasalVerbsExerciseId: (exerciseId: number) => void
}

export const createPhrasalVerbStore: StateCreator<
  PhrasalVerbStates & PhrasalVerbActions
> = (set) => {
  return {
    PhrasalVerbsExerciseId: -1,
    PhrasalVerbsAnswer: [],
    setPhrasalVerbsExerciseId: (exerciseId) =>
      set({ PhrasalVerbsExerciseId: exerciseId }),
    setPhrasalVerbsAnswer: (answer) =>
      set((state) => {
        const index = state.PhrasalVerbsAnswer.findIndex(
          (sentence) => sentence.id === answer.id
        )
        if (index >= 0) {
          return {
            PhrasalVerbsAnswer: state.PhrasalVerbsAnswer.toSpliced(
              index,
              1,
              answer
            )
          }
        }
        return {
          PhrasalVerbsAnswer: [...state.PhrasalVerbsAnswer, answer]
        }
      })
  }
}
