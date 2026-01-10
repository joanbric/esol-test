import type { StateCreator } from 'zustand'
import type { PhrasalVerbsAnswer } from '@/types'

export type PhrasalVerbStates = PhrasalVerbsAnswer & {
  phrasalVerbsSentences: Array<{ id: string; sentence: string }>
}

export type PhrasalVerbActions = {
  setPhrasalVerbsAnswer: (answer: { id: number; userAnswer: string }) => void
  setPhrasalVerbsExerciseId: (exerciseId: number) => void
  setPhrasalVerbsSentences: (sentences: Array<{ id: string; sentence: string }>) => void
}

export const createPhrasalVerbStore: StateCreator<PhrasalVerbStates & PhrasalVerbActions> = (set) => {
  return {
    PhrasalVerbsExerciseId: -1,
    PhrasalVerbsAnswer: [],
    phrasalVerbsSentences: [],
    setPhrasalVerbsExerciseId: (exerciseId) => set({ PhrasalVerbsExerciseId: exerciseId }),
    setPhrasalVerbsAnswer: (answer) =>
      set((state) => {
        const index = state.PhrasalVerbsAnswer.findIndex((sentence) => sentence.id === answer.id)
        if (index >= 0) {
          return {
            PhrasalVerbsAnswer: state.PhrasalVerbsAnswer.toSpliced(index, 1, answer)
          }
        }
        return {
          PhrasalVerbsAnswer: [...state.PhrasalVerbsAnswer, answer]
        }
      }),
    setPhrasalVerbsSentences: (sentences) => set({ phrasalVerbsSentences: [...sentences] })
  }
}
