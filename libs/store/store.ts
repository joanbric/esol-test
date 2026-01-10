import { create } from 'zustand'
import { type MultiChoiceActions, type MultiChoiceStates, createMultiChoiceStore } from './multiChoice'
import { type PhrasalVerbActions, type PhrasalVerbStates, createPhrasalVerbStore } from './phrasalVerb'
import { type PunctuationActions, type PunctuationStates, createPunctuationStore } from './punctuation'
import {
  type SentenceCompletionActions,
  type SentenceCompletionStates,
  createSentenceCompletionStore
} from './sentenceCompletion'
import { type SpellingActions, type SpellingStates, createSpellingStore } from './spelling'
import { type WordOrderActions, type WordOrderStates, createWordOrderStore } from './wordOrder'
import {
  type WritingA1SolutionsActions,
  type WritingA1SolutionsStates,
  createWritingA1SolutionsStore
} from './WritingA1Solutions'
import { type WritingA1TestActions, type WritingA1TestStates, createWritingA1TestStore } from './WritingA1Test'

type WritingA1Store = PunctuationStates &
  PunctuationActions &
  SpellingStates &
  SpellingActions &
  MultiChoiceStates &
  MultiChoiceActions &
  WordOrderStates &
  WordOrderActions &
  SentenceCompletionStates &
  SentenceCompletionActions &
  PhrasalVerbStates &
  PhrasalVerbActions &
  WritingA1TestStates &
  WritingA1TestActions &
  WritingA1SolutionsStates &
  WritingA1SolutionsActions

export const useGlobalStore = create<WritingA1Store>((...arg) => ({
  ...createPunctuationStore(...arg),
  ...createSpellingStore(...arg),
  ...createMultiChoiceStore(...arg),
  ...createWordOrderStore(...arg),
  ...createSentenceCompletionStore(...arg),
  ...createPhrasalVerbStore(...arg),
  ...createWritingA1TestStore(...arg),
  ...createWritingA1SolutionsStore(...arg)
}))
