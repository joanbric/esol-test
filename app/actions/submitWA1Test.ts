'use server'

import { z } from 'zod'
import { turso } from '@/libs/db'
import { removeExtraActionProps } from './removeExtraActionProps'
import { WA1TestFieldsSchema } from './validations'

export type State = {
  success: boolean
  msg: string
  errors: undefined | Record<string, string[] | undefined>
  fields: Record<string, any>
}

export async function submitWA1Test(initialState: State, formData: FormData): Promise<State> {
  const storeDataRaw = formData.get('storeData') as string
  let fields: any = {}

  try {
    if (storeDataRaw) {
      const store = JSON.parse(storeDataRaw)
      fields = {
        testTitle: store.testTitle,
        testDescription: store.testDescription,
        topicId: store.topicId,
        levelId: store.levelId,
        punctuationTitle: store.punctuationTitle,
        punctuationScript: store.punctuationScript,
        spellingTitle: store.spellingTitle,
        spellingScript: store.spellingScript,
        grammarTitle: store.multiChoiceTitle,
        grammarScript: store.multiChoiceScript,
        wordOrders: (store.wordOrderSentences || []).map((s: any) => s.sentence).filter(Boolean),
        sentenceCompletions: (store.sentenceCompletionBeginning || []).map((s: any) => s.sentence).filter(Boolean),
        writeSentencesWithVerbs: (store.phrasalVerbsSentences || []).map((s: any) => s.sentence).filter(Boolean),
        // Solution mappings
        punctuationAnswer: store.punctuationAnswer,
        SpellingAnswer: store.SpellingAnswer,
        multiChoiceOptions: store.multiChoiceOptions,
        wordOrderSolution: store.wordOrderSolution
      }
    }
  } catch (e) {
    console.error('Error parsing store data:', e)
  }

  try {
    const validatedFields = WA1TestFieldsSchema.safeParse(fields)
    if (!validatedFields.success) {
      const flattenedErrors = z.flattenError(validatedFields.error)
      return {
        fields,
        success: false,
        msg: `Validation Error`,
        errors: flattenedErrors.fieldErrors as State['errors']
      }
    }

    await createWA1Test(validatedFields.data)

    return {
      fields,
      success: true,
      errors: undefined,
      msg: 'Success'
    }
  } catch (error) {
    console.error('Submit error:', error)
    return {
      fields,
      success: false,
      errors: undefined,
      msg: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

async function createWA1Test(data: z.infer<typeof WA1TestFieldsSchema>) {
  const transaction = await turso.transaction('write')

  try {
    const now = Date.now()

    // 1. Insert Test
    const testResult = await transaction.execute({
      sql: 'INSERT INTO writing_a1_test (title, description, topic_id, level_id, created_at) VALUES (?, ?, ?, ?, ?) RETURNING id',
      args: [data.testTitle, data.testDescription || '', data.topicId.toString(), data.levelId.toString(), now]
    })

    const testId = testResult.rows[0]?.id
    if (!testId) throw new Error('Failed to create test')

    // 2. Insert Punctuation
    const puncResult = await transaction.execute({
      sql: 'INSERT INTO punctuation (topic_id, level_id, title, script, created_at, updated_at, test_id) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id',
      args: [
        data.topicId.toString(),
        data.levelId.toString(),
        data.punctuationTitle,
        data.punctuationScript,
        now,
        now,
        testId
      ]
    })
    const punctuationId = puncResult.rows[0]?.id

    if (punctuationId && data.punctuationAnswer) {
      for (const sol of data.punctuationAnswer) {
        await transaction.execute({
          sql: 'INSERT INTO punctuation_solutions (exercise_id, position, solution, punctuation_type_id, test_id, group_id) VALUES (?, ?, ?, ?, ?, ?)',
          args: [punctuationId, sol.position, sol.answer, sol.punctuationTypeId, testId, sol.group]
        })
      }
    }

    // 3. Insert Spelling
    const spellResult = await transaction.execute({
      sql: 'INSERT INTO spelling (topic_id, level_id, title, script, created_at, updated_at, test_id) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id',
      args: [
        data.topicId.toString(),
        data.levelId.toString(),
        data.spellingTitle,
        data.spellingScript,
        now,
        now,
        testId
      ]
    })
    const spellingId = spellResult.rows[0]?.id

    if (spellingId && data.SpellingAnswer) {
      for (const sol of data.SpellingAnswer) {
        await transaction.execute({
          sql: 'INSERT INTO spelling_solutions (exercise_id, position, solution, test_id) VALUES (?, ?, ?, ?)',
          args: [spellingId, sol.SpellingWordPosition, sol.SpellingWord, testId]
        })
      }
    }

    // 4. Insert Grammar (Multi Choice)
    const mcResult = await transaction.execute({
      sql: 'INSERT INTO multi_choice(topic_id, level_id, test_id, title, exercise, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id',
      args: [data.topicId.toString(), data.levelId.toString(), testId, data.grammarTitle, data.grammarScript, now, now]
    })
    const multiChoiceId = mcResult.rows[0]?.id

    if (multiChoiceId && data.multiChoiceOptions) {
      // Group options by gapNumber
      const gaps = Array.from(new Set(data.multiChoiceOptions.map((o) => o.gapNumber)))
      for (const gapNumber of gaps) {
        const gapOptions = data.multiChoiceOptions.filter((o) => o.gapNumber === gapNumber)
        const correctOpt = gapOptions.find((o) => o.isCorrect)

        const gapResult = await transaction.execute({
          sql: 'INSERT INTO multi_choice_gaps (exercise_id, position, test_id) VALUES (?, ?, ?) RETURNING id',
          args: [multiChoiceId, gapNumber, testId]
        })
        const gapId = gapResult.rows[0]?.id

        if (gapId) {
          for (const opt of gapOptions) {
            const optResult = await transaction.execute({
              sql: 'INSERT INTO multi_choice_options (gap_id, option_word, test_id) VALUES (?, ?, ?) RETURNING id',
              args: [gapId, opt.option, testId]
            })
            if (opt.isCorrect) {
              await transaction.execute({
                sql: 'UPDATE multi_choice_gaps SET correct_option_id = ? WHERE id = ?',
                args: [optResult.rows[0]?.id, gapId]
              })
            }
          }
        }
      }
    }

    // 5. Insert Word Order
    const woResult = await transaction.execute({
      sql: 'INSERT INTO word_order (topic_id, level_id, created_at, updated_at, test_id) VALUES (?, ?, ?, ?, ?) RETURNING id',
      args: [data.topicId.toString(), data.levelId.toString(), now, now, testId]
    })
    const wordOrderId = woResult.rows[0]?.id

    if (wordOrderId && data.wordOrderSolution) {
      for (const sol of data.wordOrderSolution) {
        await transaction.execute({
          sql: 'INSERT INTO word_order_solutions (exercise_id, word, word_order, word_order2, word_order3, word_order4, test_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
          args: [
            wordOrderId,
            sol.word || '',
            sol.wordOrder,
            sol.wordOrder2,
            sol.wordOrder3 || null,
            sol.wordOrder4 || null,
            testId
          ]
        })
      }
    }

    // 6. Sentence Completions
    if (data.sentenceCompletions) {
      for (const sentence of data.sentenceCompletions) {
        await transaction.execute({
          sql: 'INSERT INTO sentence_completion (topic_id, level_id, beginning_sentence, created_at, updated_at, test_id) VALUES (?, ?, ?, ?, ?, ?)',
          args: [data.topicId.toString(), data.levelId.toString(), sentence, now, now, testId]
        })
      }
    }

    // 7. Phrasal Verbs
    if (data.writeSentencesWithVerbs) {
      for (const verbSentence of data.writeSentencesWithVerbs) {
        await transaction.execute({
          sql: 'INSERT INTO phrasal_verbs (topic_id, level_id, verb, created_at, updated_at, test_id) VALUES (?, ?, ?, ?, ?, ?)',
          args: [data.topicId.toString(), data.levelId.toString(), verbSentence, now, now, testId]
        })
      }
    }

    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
