/**
 * Writing A1 Test
 */
export interface WritingA1Test_SQL {
  punctuation: Punctuation[]
  spelling: Spelling[]
  multiChoice: MultiChoice[]
  wordOrder: WordOrder[]
  sentenceCompletion: SentenceCompletion[]
  phrasalVerbs: PhrasalVerb[]
}

export interface WritingA1Test {
  punctuation: Punctuation
  spelling: Spelling
  multiChoice: MultiChoiceParsed
  wordOrder: WordOrder[]
  sentenceCompletion: SentenceCompletion[]
  phrasalVerbs: PhrasalVerb[]
}

export interface MultiChoice {
  id: number
  exercise: string
  gap_id: number
  position: number
  correct_option_id: number
  option_id: number
  option_word: string
}

export interface PhrasalVerb {
  id: number
  verb: string
}

export interface Punctuation {
  id: number
  title: string
  script: string
}

export interface PunctuationWord {
  word: string
  position: number
  type: 'word' | 'space'
  isChanged: boolean
  hasApostrophe: boolean
}

export interface SentenceCompletion {
  id: number
  beginning_sentence: string
}

export interface Spelling {
  id: number
  script: string
}
export interface SpellingWord {
  word: string
  position: number
  isChanged: boolean
}

export interface WordOrder {
  id: number
  exercise_id: number
  word: string
  word_order: number
  word_order2: number | null
  word_order3: null
  word_order4: null
}

export interface MultiChoiceParsed {
  id: number
  exercise: string
  gaps: Gap[]
}

export interface Gap {
  gapID: number
  position: number
  correctOptionID: number
  options: Option[]
}

export interface Option {
  id: number
  word: string
}

export interface WritingA1Answer {
  testId: number
  punctuation: PunctuationAnswer
  spelling: SpellingAnswer
  multiChoice: MultiChoiceAnswer
  wordOrder: WordOrderAnswer
  sentenceCompletion: SentenceCompletionAnswer
  phrasalVerbs: PhrasalVerbAnswer
}

export interface PunctuationAnswer {
  exerciseId: number
  answer: Array<{ word: string; position: number; type: 'word' | 'space' }>
}

export interface SpellingAnswer {
  SpellingExerciseId: number
  SpellingAnswer: SpellingWordAnswer[]
}

export interface SpellingWordAnswer {
  SpellingWord: string
  SpellingWordPosition: number
}

export interface MultiChoiceAnswer {
  MultiChoiceExerciseId: number
  MultiChoiceAnswer: Array<{ gapID: number; optionID: number }>
}

export interface WordOrderAnswer {
  WordOrderExerciseId: number
  WordOrderAnswer: WordOrderWord[][]
}

export interface WordOrderWord {
  id: number
  word: string
  startingPos: number
  correctPos: number
  userPos: number
}

export interface SentenceCompletionAnswer {
  SentenceCompletionExerciseId: number
  SentenceCompletionAnswer: Array<{ id: number; userAnswer: string }>
}

export interface PhrasalVerbsAnswer {
  PhrasalVerbsExerciseId: number
  PhrasalVerbsAnswer: Array<{ id: number; userAnswer: string }>
}
