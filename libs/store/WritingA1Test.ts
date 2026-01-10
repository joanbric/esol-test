import type { StateCreator } from 'zustand'

export type WritingA1TestStates = {
  test_id: number
  isSolved: boolean
  testTitle: string
  testDescription: string
  topicId: string
  levelId: string
}

export type WritingA1TestActions = {
  setTestId: (test_id: number) => void
  setIsSolved: (isSolved: boolean) => void
  setTestTitle: (testTitle: string) => void
  setTestDescription: (testDescription: string) => void
  setTopicId: (topicId: string) => void
  setLevelId: (levelId: string) => void
}

export const createWritingA1TestStore: StateCreator<WritingA1TestStates & WritingA1TestActions> = (set) => ({
  test_id: -1,
  isSolved: false,
  testTitle: '',
  testDescription: '',
  topicId: '',
  levelId: '',
  setTestId: (test_id) => set({ test_id }),
  setIsSolved: (isSolved) => set({ isSolved }),
  setTestTitle: (testTitle) => set({ testTitle }),
  setTestDescription: (testDescription) => set({ testDescription }),
  setTopicId: (topicId) => set({ topicId }),
  setLevelId: (levelId) => set({ levelId })
})
