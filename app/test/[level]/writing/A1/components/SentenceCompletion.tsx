'use client'
import type { SentenceCompletion } from '@/types'
import { Card, CardHeader, CardBody } from '@heroui/card'
import { Input } from '@heroui/input'
import { useState } from 'react'

export default function SentenceCompletion({ data }: { data: SentenceCompletion[] }) {
  const [sentences, setSentences] = useState(data.map(item => ({
    ...item,
    userAnswer: ''
  })))
  return (
    <Card className="md:px-10 py-4 my-6" shadow='sm'>
      <CardHeader>
        <h3 className="font-bold text-lg">5. Finish the sentences.</h3>
      </CardHeader>
      <CardBody>
        <ol className='list-decimal ps-4'>
          {sentences.map((item, index) => (
            <li key={`${item.id}-SentenceCompletion`} className='my-[1lh] leading-[1.5lh]'>
              {item.beginning_sentence}{'...'}
              <Input
                value={item.userAnswer}
                variant='underlined'
                size='sm'
                aria-label={`Complete sentence ${index + 1}`}
                onChange={(e) => setSentences((prev) => {
                  const newSentences = [...prev]
                  newSentences[index].userAnswer = e.target.value
                  return newSentences
                })}
              />
            </li>
          ))}
        </ol>
      </CardBody>
    </Card>
  )
}
