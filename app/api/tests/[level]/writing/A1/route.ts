import type { NextRequest } from 'next/server'
import { turso } from '@/libs/db'
import type {
  Gap,
  MultiChoice,
  MultiChoiceParsed,
  PhrasalVerb,
  Punctuation,
  SentenceCompletion,
  Spelling,
  WordOrder,
  WritingA1Test,
  WritingA1Test_SQL
} from '@/types'

async function getExercises(topicId: number, levelId: number): Promise<WritingA1Test_SQL> {
  const queries = {
    punctuation: turso.execute({
      sql: 'SELECT id, title, script FROM punctuation WHERE topic_id = ? AND level_id = ?',
      args: [topicId, levelId]
    }),
    spelling: turso.execute({
      sql: 'SELECT id, script FROM spelling WHERE topic_id = ? AND level_id = ?',
      args: [topicId, levelId]
    }),
    multiChoice: turso.execute({
      sql: `
        SELECT mc.id, mc.exercise, mcg.id as gap_id, mcg.position, mcg.correct_option_id, mcgo.id as option_id, mcgo.value as option_word FROM (
          multi_choice mc
          JOIN multi_choice_gaps mcg ON mc.id = mcg.exercise_id
        ) mmcg
        JOIN multi_choice_gap_options mcgo ON mcg.id = mcgo.gap_id
        WHERE mc.topic_id = ? AND mc.level_id = ?
      `,
      args: [topicId, levelId]
    }),
    wordOrder: turso.execute({
      sql: `
        SELECT wos.* FROM words_order wo
        JOIN words_order_solution wos ON wo.id = wos.exercise_id
        WHERE wo.topic_id = ? AND wo.level_id = ?
      `,
      args: [topicId, levelId]
    }),
    sentenceCompletion: turso.execute({
      sql: 'SELECT id, beginning_sentence FROM sentence_completion WHERE topic_id = ? AND level_id = ? LIMIT 6',
      args: [topicId, levelId]
    }),
    phrasalVerbs: turso.execute({
      sql: 'SELECT id, verb FROM phrasal_verbs WHERE topic_id = ? AND level_id = ? LIMIT 6',
      args: [topicId, levelId]
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
    id: row.id,
    title: row.title,
    script: row.script
  })) as Punctuation[]

  const spelling = results[1].rows.map((row) => ({
    id: row.id,
    script: row.script
  })) as Spelling[]

  const multiChoice = results[2].rows.map((row) => ({
    id: row.id,
    exercise: row.exercise,
    gap_id: row.gap_id,
    position: row.position,
    correct_option_id: row.correct_option_id,
    option_id: row.option_id,
    option_word: row.option_word
  })) as MultiChoice[]
  const wordOrder = results[3].rows.map((row) => ({
    id: row.id,
    exercise_id: row.exercise_id,
    word: row.word,
    word_order: row.word_order,
    word_order2: row.word_order2,
    word_order3: row.word_order3,
    word_order4: row.word_order4
  })) as WordOrder[]
  const sentenceCompletion = results[4].rows.map((row) => ({
    id: row.id,
    beginning_sentence: row.beginning_sentence
  })) as SentenceCompletion[]
  const phrasalVerbs = results[5].rows.map((row) => ({
    id: row.id,
    verb: row.verb
  })) as PhrasalVerb[]

  return {
    punctuation,
    spelling,
    multiChoice,
    wordOrder,
    sentenceCompletion,
    phrasalVerbs
  }
}

function transformData(data: WritingA1Test_SQL): WritingA1Test | null {
  if (!data || !data.multiChoice || data.multiChoice.length === 0) {
    return null
  }

  if (!data.punctuation || !data.spelling || !data.wordOrder || !data.sentenceCompletion || !data.phrasalVerbs) {
    return null
  }

  if (
    data.multiChoice.length === 0 ||
    data.punctuation.length === 0 ||
    data.spelling.length === 0 ||
    data.wordOrder.length === 0 ||
    data.sentenceCompletion.length === 0 ||
    data.phrasalVerbs.length === 0
  ) {
    return null
  }

  // *** Transform punctuation ***
  const punctuation = data.punctuation[0]

  // *** Transform spelling ***
  const spelling = data.spelling[0]

  // *** Transform wordOrder ***
  const wordOrder = data.wordOrder

  // *** Transform sentenceCompletion ***
  const sentenceCompletion = data.sentenceCompletion

  // *** Transform phrasalVerbs ***
  const phrasalVerbs = data.phrasalVerbs

  // *** Transform multiChoice ***
  const firstMultiChoice = data.multiChoice[0]
  const multiChoice: MultiChoiceParsed = {
    id: firstMultiChoice.id,
    exercise: firstMultiChoice.exercise,
    gaps: []
  }

  // Group options by gap_id and position
  const groupedOptions: Record<string, Gap> = {}
  data.multiChoice.forEach((item) => {
    const key = `${item.gap_id}-${item.position}`
    if (!groupedOptions[key]) {
      groupedOptions[key] = {
        gapID: item.gap_id,
        position: item.position,
        correctOptionID: item.correct_option_id,
        options: []
      }
    }
    groupedOptions[key].options.push({
      id: item.option_id,
      word: item.option_word
    })
  })

  // Convert the grouped options into the gaps array
  multiChoice.gaps = Object.values(groupedOptions)

  return {
    punctuation,
    spelling,
    wordOrder,
    sentenceCompletion,
    phrasalVerbs,
    multiChoice: multiChoice
  }
}

export async function GET() {
  const exercises = await getExercises(1, 6)
  const exercisesParsed = transformData(exercises)

  return new Response(JSON.stringify({ test: { ...exercisesParsed } }))
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const name = formData.get('name')
  const age = formData.get('age')
  return new Response(JSON.stringify({ name, age }))
}
