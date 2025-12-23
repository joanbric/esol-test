'use server'
import { turso } from '@/libs/db'
import z from 'zod'
import { auth } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import Tasks from '../(service)/tests/create/writing/A2/Tasks'

const wa2TestSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  genre: z.string().min(1),
  topic: z.string().min(1),
  level: z.string().min(1),
  tasks: z.array(
    z.object({
      id: z.string().min(1),
      value: z.string().min(1)
    })
  )
})

interface FormDataParsed {
  [key: string]: string | { [key: string]: string }[]
}

function transformData(formData: FormData) {
  const parsedData: FormDataParsed = {}

  for (const key of formData.keys()) {
    if ((key as string).includes('task')) {
      if (parsedData['tasks']) {
        ;(parsedData['tasks'] as { [key: string]: string }[]).push({ id: key, value: formData.get(key) as string })
      } else {
        parsedData['tasks'] = [{ id: key, value: formData.get(key) as string }]
      }
    } else {
      parsedData[key] = formData.get(key) as string
    }
  }

  return parsedData
}

export async function submitWA2Test(formData: FormData) {
  const { userId } = await auth()
  try {
    if (!userId) throw new Error('User not authenticated and not allowed to submit answers')
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err
      }),
      {
        status: 401
      }
    )
  }

  const formDataParsed = transformData(formData)

  const data = wa2TestSchema.safeParse(formDataParsed)
  if (!data.success) {
    return {
      success: false,
      error: 'Invalid data'
    }
  }

  const tx = await turso.transaction()
  try {

    const WA2Test = await tx.execute({
      sql: 'INSERT INTO writing_test (title, description, genre, topic, level, user_id) VALUES (?, ?, ?, ?, ?, ?)',
      args: [data.data.title, data.data.description, data.data.genre, data.data.topic, data.data.level, userId]
    })

    const WA2TestId = WA2Test.lastInsertRowid

    if(!WA2TestId) throw new Error('Error creating test')
    await tx.batch(data.data.tasks.map((task) => ({
      sql: 'INSERT INTO writing_test_tasks (task_id, value, writing_test_id) VALUES (?, ?, ?)',
      args: [task.id, task.value, WA2TestId]
    })))

    await tx.commit()

    return {
      success: true,
      data: data.data
    }
  } catch (error) {
    await tx.rollback()
    console.log(error)
    return {
      success: false,
      error: error
    }
  }
}