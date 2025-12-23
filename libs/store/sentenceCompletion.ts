import { SentenceCompletionAnswer } from '@/types'
import { StateCreator } from 'zustand'

export type SentenceCompletionStates = SentenceCompletionAnswer
export type SentenceCompletionActions = {
  setSentenceCompletionAnswer: (answer: {
    id: number
    userAnswer: string
  }) => void
  setSentenceCompletionExerciseId: (exerciseId: number) => void
}

export const createSentenceCompletionStore: StateCreator<
  SentenceCompletionStates & SentenceCompletionActions
> = (set) => ({
  SentenceCompletionExerciseId: -1,
  SentenceCompletionAnswer: [],
  setSentenceCompletionExerciseId: (exerciseId) =>
    set({ SentenceCompletionExerciseId: exerciseId }),
  setSentenceCompletionAnswer: (answer) =>
    set((state) => {
      const index = state.SentenceCompletionAnswer.findIndex(
        (sentence) => sentence.id === answer.id
      )
      if (index >= 0) {
        return {
          SentenceCompletionAnswer: state.SentenceCompletionAnswer.toSpliced(
            index,
            1,
            answer
          )
        }
      }
      return {
        SentenceCompletionAnswer: [...state.SentenceCompletionAnswer, answer]
      }
    })
})
