import { turso } from '@/libs/db'
import {
  MultiChoiceSolution,
  PhrasalVerbsSolution,
  PunctuationSolution,
  SentenceCompletionSolution,
  SpellingSolution,
  WordOrderSolution,
  WritingA1Solution
} from '@/types'
import { auth } from '@clerk/nextjs/server'

async function getSolutions(
  testId: number,
  userId: string
): Promise<WritingA1Solution> {
  const queries = {
    punctuation: turso.execute({
      sql: 'SELECT position, solution, punctuation_type_id, group_id FROM punctuation_solutions ps WHERE ps.test_id  = ?',
      args: [testId]
    }),
    spelling: turso.execute({
      sql: 'SELECT position, solution FROM spelling_solutions ss WHERE ss.test_id = ?',
      args: [testId]
    }),
    multiChoice: turso.execute({
      sql: 'SELECT mcg.id AS  gap_id, mcg.correct_option_id  FROM multi_choice_gaps mcg JOIN  multi_choice mc ON mcg.exercise_id = mc.id WHERE mc.test_id = ?',
      args: [testId]
    }),
    wordOrder: turso.execute({
      sql: 'SELECT id, word_order, word_order2 , word_order3 , word_order4  FROM words_order_solution wos WHERE  wos.test_id = ?',
      args: [testId]
    }),
    sentenceCompletion: turso.execute({
      sql: 'SELECT is_correct, teacher_approved , ai_approved , teacher_comment , ai_comment  FROM users_sentence_completion_answers usca  WHERE usca.test_id  = ? AND usca.user_id = ?',
      args: [testId, userId]
    }),
    phrasalVerbs: turso.execute({
      sql: 'SELECT id, is_correct, teacher_approved, ai_approved , teacher_comment , ai_comment   FROM users_phrasal_verbs_answers upva WHERE upva.test_id = ? AND upva.user_id = ?',
      args: [testId, userId]
    })
  }

  const results = await Promise.all([
    queries.punctuation,
    queries.spelling,
    queries.multiChoice,
    queries.wordOrder,
    queries.sentenceCompletion,
    queries.phrasalVerbs
  ])

  const punctuation = results[0].rows.map((row) => ({
    position: row.position,
    solution: row.solution,
    punctuationTypeId: row.punctuation_type_id,
    group: row.group_id
  })) as PunctuationSolution[]

  const spelling = results[1].rows.map((row) => ({
    position: row.position,
    solution: row.solution
  })) as SpellingSolution[]

  const multiChoice = results[2].rows.map((row) => ({
    gapID: row.gap_id,
    correctOptionID: row.correct_option_id
  })) as MultiChoiceSolution[]

  const wordOrder = results[3].rows.map((row) => ({
    id: row.id,
    wordOrder: row.word_order,
    wordOrder2: row.word_order2,
    wordOrder3: row.word_order3,
    wordOrder4: row.word_order4
  })) as WordOrderSolution[]

  const sentenceCompletion = results[4].rows.map((row) => ({
    id: row.id,
    isCorrect: row.is_correct,
    teacherApproved: row.teacher_approved,
    aiApproved: row.ai_approved,
    teacherComment: row.teacher_comment,
    aiComment: row.ai_comment
  })) as SentenceCompletionSolution[]

  const phrasalVerbs = results[5].rows.map((row) => ({
    id: row.id,
    isCorrect: row.is_correct,
    teacherApproved: row.teacher_approved,
    aiApproved: row.ai_approved,
    teacherComment: row.teacher_comment,
    aiComment: row.ai_comment
  })) as PhrasalVerbsSolution[]

  return {
    punctuationSolution: punctuation,
    spellingSolution: spelling,
    multiChoiceSolution: multiChoice,
    wordOrderSolution: wordOrder,
    sentenceCompletionSolution: sentenceCompletion,
    phrasalVerbsSolution: phrasalVerbs
  }
}

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) throw new Error('User not authenticated')

    const solutions = await getSolutions(1, userId)
    return new Response(JSON.stringify({ solutions }))
  } catch (error) {
    const statusCode = error instanceof Error && error.message.includes('not authenticated') ? 401 : 500
    console.error('Error al obtener soluciones:', error)
    return new Response(
      JSON.stringify({
        solutions: null,
        error: 'Error while getting solutions',
        msg: error instanceof Error ? error.message : 'Internal server error'
      }),
      {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
