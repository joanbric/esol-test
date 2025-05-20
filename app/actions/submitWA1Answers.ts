// app/actions/submitExerciseAnswers.ts
'use server'

import { turso } from '@/libs/db'
import { auth } from '@clerk/nextjs/server'
import { WritingA1Answer } from '@/types'

// interface SubmitExerciseAnswersParams {
//   multiChoiceAnswers: { option_id: number; gap_id: number }[]
//   sentenceCompletionAnswers: {
//     exercise_id: number
//     completion: string
//     is_correct: boolean | null
//     teacher_approved?: boolean | null
//     teacher_id?: string | null
//     ai_approved?: boolean | null
//   }[]
//   spellingAnswers: { exercise_id: number; position: number; answer: string }[]
//   wordsOrderAnswers: { word_id: number; word_order: number }[]
//   punctuationAnswers: {
//     exercise_id: number
//     position: number
//     answer: string
//     punctuation_type_id: number
//   }[]
//   phrasalVerbsAnswers: {
//     exercise_id: number
//     answer: string
//     is_correct: boolean | null
//     teacher_approved?: boolean | null
//     teacher_id?: string | null
//     ai_approved?: boolean | null
//   }[]
// }

export async function submitExerciseAnswers({multiChoice, sentenceCompletion, spelling, wordOrder, punctuation, phrasalVerbs}: WritingA1Answer) {
  const tx = await turso.transaction()

  try {
    const now = new Date().toISOString()
    const { userId } = await auth()

    if (!userId) throw new Error('User not authenticated')

    // ** MULTI CHOICE **
    await tx.batch(
      multiChoice.MultiChoiceAnswer.map((a) => ({
        sql: `
          INSERT INTO users_answers_multi_choice 
            (user_id, option_id, date_created, gap_id)
          VALUES (?, ?, ?, ?)`,
        args: [userId, a.optionID, now, a.gapID]
      }))
    )

    // ** SENTENCE COMPLETION **
    await tx.batch(
      sentenceCompletion.SentenceCompletionAnswer.flat().map((a) => ({
        sql: `
          INSERT INTO users_sentence_completion_answers 
            (user_id, exercise_id, completion)
          VALUES (?, ?, ?)`,
        args: [
          userId,
          a.id,
          a.userAnswer
        ]
      }))
    )

    // ** SPELLING **
    await tx.batch(
      spelling.SpellingAnswer.map((a) => ({
        sql: `
          INSERT INTO users_spelling_answers 
            (user_id, exercise_id, position, answer)
          VALUES (?, ?, ?, ?)`,
        args: [userId, spelling.SpellingExerciseId, a.SpellingWordPosition, a.SpellingWord]
      }))
    )

    // ** WORD ORDER **
    await tx.batch(
      wordOrder.WordOrderAnswer.flat().map((a) => ({
        sql: `
          INSERT INTO users_words_order_answers 
            (user_id, word_id, word_order)
          VALUES (?, ?, ?)`,
        args: [userId, a.id, a.userPos]
      }))
    )

    // ** PUNCTUATION **
    await tx.batch(
      punctuation.PunctuationAnswer.map((a) => ({
        sql: `
          INSERT INTO user_answers_punctuation 
            (user_id, exercise_id, position, answer, punctuation_type_id, group_id)
          VALUES (?, ?, ?, ?, ?, ?)`,
        args: [
          userId,
          punctuation.PunctuationExerciseId,
          a.position,
          a.answer,
          a.punctuationTypeId,
          a.group
        ]
      }))
    )

    // ** PHRASAL VERBS **
    await tx.batch(
      phrasalVerbs.PhrasalVerbsAnswer.flat().map((a) => ({
        sql: `
          INSERT INTO users_phrasal_verbs_answers 
            (user_id, exercise_id, answer)
          VALUES (?, ?, ?)`,
        args: [
          userId,
          a.id,
          a.userAnswer
        ]
      }))
    )

    await tx.commit()

    return { success: true, msg: 'Answers submitted successfully' }
  } catch (error) {
    await tx.rollback()
    console.error('Error al insertar respuestas:', error)
    return { success: false, msg: 'An unexpected error occurred while submitting your answers. Please try again later.' }
  }
}
