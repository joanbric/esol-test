import { create } from 'zustand'

import {
  createPunctuationStore,
  PunctuationStates,
  PunctuationActions
} from './punctuation'

import {
  createSpellingStore,
  SpellingStates,
  SpellingActions
} from './spelling'

import {
  createMultiChoiceStore,
  MultiChoiceStates,
  MultiChoiceActions
} from './multiChoice'
import {
  createWordOrderStore,
  WordOrderStates,
  WordOrderActions
} from './wordOrder'
import {
  createSentenceCompletionStore,
  SentenceCompletionStates,
  SentenceCompletionActions
} from './sentenceCompletion'
import {
  createPhrasalVerbStore,
  PhrasalVerbStates,
  PhrasalVerbActions
} from './phrasalVerb'
import {
  createWritingA1TestStore,
  WritingA1TestStates,
  WritingA1TestActions
} from './WritingA1Test'
import {
  createWritingA1SolutionsStore,
  WritingA1SolutionsStates,
  WritingA1SolutionsActions
} from './WritingA1Solutions'

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
