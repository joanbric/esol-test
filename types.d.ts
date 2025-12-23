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
  punctuationTypeId: number
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
  phrasalVerbs: PhrasalVerbsAnswer
}

export interface PunctuationAnswer {
  PunctuationExerciseId: number
  PunctuationAnswer: PunctuationWordAnswer[]
}

export interface PunctuationWordAnswer {
  position: number
  answer: string
  group: number
  punctuationTypeId: number
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
  WordOrderAnswer: WordOrderWordAnswer[][]
}

export interface WordOrderWordAnswer {
  id: number
  word: string
  startingPos: number
  correctPos: number
  userPos: number
  exercise_id: number
}

export interface SentenceCompletionAnswer {
  SentenceCompletionExerciseId: number
  SentenceCompletionAnswer: Array<{ id: number; userAnswer: string }>
}

export interface PhrasalVerbsAnswer {
  PhrasalVerbsExerciseId: number
  PhrasalVerbsAnswer: Array<{ id: number; userAnswer: string }>
}


export interface WritingA1Solution {
  punctuationSolution: PunctuationSolution[]
  spellingSolution: SpellingSolution[]
  multiChoiceSolution: MultiChoiceSolution[]
  wordOrderSolution: WordOrderSolution[]
  sentenceCompletionSolution: SentenceCompletionSolution[]
  phrasalVerbsSolution: PhrasalVerbsSolution[]
}

export interface PunctuationSolution {
  position: number
  solution: string
  punctuationTypeId: number
  group: number
}

export interface PunctuationType {
  id: number
  typeCode: string
  description: string
  characterType: number
}

export interface SpellingSolution {
  position: number
  solution: string
}

export interface MultiChoiceSolution {
  gapID: number
  correctOptionID: number
}

export interface WordOrderSolution {
  id: number
  wordOrder: number
  wordOrder2: number | null
  wordOrder3: number | null
  wordOrder4: number | null
}

export interface SentenceCompletionSolution {
  id: number
  isCorrect: boolean | null
  teacherApproved: boolean | null
  aiApproved: boolean | null
  teacherComment: string | null
  aiComment: string | null
}

export interface PhrasalVerbsSolution {
  id: number
  isCorrect: boolean | null
  teacherApproved: boolean | null
  aiApproved: boolean | null
  teacherComment: string | null
  aiComment: string | null
}

