// app/actions/submitExerciseAnswers.ts
'use server'

import { turso } from '@/libs/db'
import { auth } from '@clerk/nextjs/server'
import { WritingA1Answer } from '@/types'
import { headers } from 'next/headers'

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

export async function submitExerciseAnswers({
  multiChoice,
  sentenceCompletion,
  spelling,
  wordOrder,
  punctuation,
  phrasalVerbs
}: WritingA1Answer) {
  const tx = await turso.transaction()

  try {
    const now = new Date().toISOString()
    const { userId } = await auth()

    let effectiveUserId = userId

    // Check if user is authenticated or can proceed as guest (by IP)
    if (!userId) {
      // Get the IP address from the request headers
      const headersList = await headers()
      const ip = headersList.get('x-forwarded-for') || 'guest-ip'

      // Call your API to check if this IP can proceed as guest
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testId: 1 })
      })

      const { allowed } = await res.json()

      if (!allowed) {
        throw new Error('User not authenticated and not allowed to submit answers')
      }
      effectiveUserId = ip
    }

    // ** MULTI CHOICE **
    await tx.batch(
      multiChoice.MultiChoiceAnswer.map((a) => ({
        sql: `
          INSERT INTO users_answers_multi_choice 
            (user_id, option_id, date_created, gap_id)
          VALUES (?, ?, ?, ?)`,
        args: [effectiveUserId, a.optionID, now, a.gapID]
      }))
    )

    // ** SENTENCE COMPLETION **
    await tx.batch(
      sentenceCompletion.SentenceCompletionAnswer.flat().map((a) => ({
        sql: `
          INSERT INTO users_sentence_completion_answers 
            (user_id, exercise_id, completion)
          VALUES (?, ?, ?)`,
        args: [effectiveUserId, a.id, a.userAnswer]
      }))
    )

    // ** SPELLING **
    await tx.batch(
      spelling.SpellingAnswer.map((a) => ({
        sql: `
          INSERT INTO users_spelling_answers 
            (user_id, exercise_id, position, answer)
          VALUES (?, ?, ?, ?)`,
        args: [effectiveUserId, spelling.SpellingExerciseId, a.SpellingWordPosition, a.SpellingWord]
      }))
    )

    // ** WORD ORDER **
    await tx.batch(
      wordOrder.WordOrderAnswer.flat().map((a) => ({
        sql: `
          INSERT INTO users_words_order_answers 
            (user_id, word_id, word_order)
          VALUES (?, ?, ?)`,
        args: [effectiveUserId, a.id, a.userPos]
      }))
    )

    // ** PUNCTUATION **
    await tx.batch(
      punctuation.PunctuationAnswer.map((a) => ({
        sql: `
          INSERT INTO user_answers_punctuation 
            (user_id, exercise_id, position, answer, punctuation_type_id, group_id)
          VALUES (?, ?, ?, ?, ?, ?)`,
        args: [effectiveUserId, punctuation.PunctuationExerciseId, a.position, a.answer, a.punctuationTypeId, a.group]
      }))
    )

    // ** PHRASAL VERBS **
    await tx.batch(
      phrasalVerbs.PhrasalVerbsAnswer.flat().map((a) => ({
        sql: `
          INSERT INTO users_phrasal_verbs_answers 
            (user_id, exercise_id, answer)
          VALUES (?, ?, ?)`,
        args: [effectiveUserId, a.id, a.userAnswer]
      }))
    )
    // ** TEST SOLVED BY USERS **
    await tx.execute({
      sql: `
        INSERT INTO test_solved_by_users
          (user_id, test_id, last_solved_at)
        VALUES (?, ?, ?)`,
      args: [effectiveUserId, 1, now]
    })

    await tx.commit()

    return { success: true, msg: 'Answers submitted successfully' }
  } catch (error) {
    await tx.rollback()
    console.error('Error al insertar respuestas:', error)
    return {
      success: false,
      msg: 'An unexpected error occurred while submitting your answers. Please try again later.'
    }
  }
}
