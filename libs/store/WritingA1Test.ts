import { StateCreator } from 'zustand'

export type WritingA1TestStates = {
  test_id: number
  isSolved: boolean
}

export type WritingA1TestActions = {
  setTestId: (test_id: number) => void
  setIsSolved: (isSolved: boolean) => void
}

export const createWritingA1TestStore: StateCreator<
  WritingA1TestStates &
    WritingA1TestActions
> = (set) => ({
  test_id: -1,
  isSolved: false,
  setTestId: (test_id) => set({ test_id }),
  setIsSolved: (isSolved) => set({ isSolved })
})