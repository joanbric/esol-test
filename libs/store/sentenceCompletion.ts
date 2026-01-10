import type { StateCreator } from 'zustand'
import type { SentenceCompletionAnswer } from '@/types'

export type SentenceCompletionStates = SentenceCompletionAnswer & {
  sentenceCompletionBeginning: Array<{ id: string; sentence: string }>
}
export type SentenceCompletionActions = {
  setSentenceCompletionAnswer: (answer: { id: number; userAnswer: string }) => void
  setSentenceCompletionExerciseId: (exerciseId: number) => void
  setSentenceCompletionBeginning: (sentences: Array<{ id: string; sentence: string }>) => void
}

export const createSentenceCompletionStore: StateCreator<SentenceCompletionStates & SentenceCompletionActions> = (
  set
) => ({
  SentenceCompletionExerciseId: -1,
  SentenceCompletionAnswer: [],
  sentenceCompletionBeginning: [],
  setSentenceCompletionExerciseId: (exerciseId) => set({ SentenceCompletionExerciseId: exerciseId }),
  setSentenceCompletionAnswer: (answer) =>
    set((state) => {
      const index = state.SentenceCompletionAnswer.findIndex((sentence) => sentence.id === answer.id)
      if (index >= 0) {
        return {
          SentenceCompletionAnswer: state.SentenceCompletionAnswer.toSpliced(index, 1, answer)
        }
      }
      return {
        SentenceCompletionAnswer: [...state.SentenceCompletionAnswer, answer]
      }
    }),
  setSentenceCompletionBeginning: (sentences) => set({ sentenceCompletionBeginning: [...sentences] })
})
