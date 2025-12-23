import { StateCreator } from 'zustand'
import { MultiChoiceAnswer } from '@/types'

export type MultiChoiceStates = MultiChoiceAnswer

export type MultiChoiceActions = {
  setMultiChoiceAnswer: (gapID: number, optionID: number) => void
  setExerciseId: (exerciseId: number) => void
  removeMultiChoiceAnswer: (gapID: number) => void
}

export const createMultiChoiceStore: StateCreator<
  MultiChoiceStates & MultiChoiceActions
> = (set) => ({
  MultiChoiceExerciseId: 0,
  MultiChoiceAnswer: [],
  setExerciseId: (exerciseId) => set({ MultiChoiceExerciseId: exerciseId }),
  setMultiChoiceAnswer: (gapID, optionID) =>
    set((state) => {
      const index = state.MultiChoiceAnswer.findIndex((gap) => gap.gapID === gapID)
      if (index >= 0) {
        return { MultiChoiceAnswer: state.MultiChoiceAnswer.toSpliced(index, 1, { gapID, optionID }) }
      }
      return { MultiChoiceAnswer: [...state.MultiChoiceAnswer, { gapID, optionID }] }
    }),
  removeMultiChoiceAnswer: (gapID) =>
    set((state) => ({
      MultiChoiceAnswer: state.MultiChoiceAnswer.filter((gap) => gap.gapID !== gapID)
    }))
})
