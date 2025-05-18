'use server'

import { WritingA1Answer, SpellingAnswer } from '@/types'

export async function submitWritingA1Answers(answer: {answer: SpellingAnswer}) {
  console.log(answer)
}
