import type { StateCreator } from 'zustand'
import type { MultiChoiceAnswer } from '@/types'

export type MultiChoiceStates = MultiChoiceAnswer & {
  multiChoiceTitle: string
  multiChoiceScript: string
  multiChoiceOptions: Array<{ gapNumber: number; option: string; isCorrect: boolean }>
}

export type MultiChoiceActions = {
  setMultiChoiceAnswer: (gapID: number, optionID: number) => void
  setExerciseId: (exerciseId: number) => void
  removeMultiChoiceAnswer: (gapID: number) => void
  setMultiChoiceTitle: (title: string) => void
  setMultiChoiceScript: (script: string) => void
  setMultiChoiceOptions: (options: Array<{ gapNumber: number; option: string; isCorrect: boolean }>) => void
}

export const createMultiChoiceStore: StateCreator<MultiChoiceStates & MultiChoiceActions> = (set) => ({
  MultiChoiceExerciseId: 0,
  MultiChoiceAnswer: [],
  multiChoiceTitle: '',
  multiChoiceScript: '',
  multiChoiceOptions: [],
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
    })),
  setMultiChoiceTitle: (title) => set({ multiChoiceTitle: title }),
  setMultiChoiceScript: (script) => set({ multiChoiceScript: script }),
  setMultiChoiceOptions: (options) => set({ multiChoiceOptions: options })
})
