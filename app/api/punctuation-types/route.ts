import { turso } from '@/libs/db'

export async function GET() {
  try {
    const punctuationTypes = await turso.execute(
      'SELECT id, type_code, description, character_type FROM punctuation_types'
    )
    if (!punctuationTypes.rows)
      throw new Error('Error al obtener los tipos de puntuación')


    const punctuationTypesParsed = punctuationTypes.rows.map((row) => ({
      id: row.id,
      typeCode: row.type_code,
      description: row.description,
      characterType: row.character_type
    }))

    return new Response(
      JSON.stringify({ punctuationTypes: punctuationTypesParsed })
    )
  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify({ error: 'Error al obtener los tipos de puntuación' }),
      {
        status: 500
      }
    )
  }
}
