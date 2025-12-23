'use client'
import { useGlobalStore } from '@/libs/store/store'
import type { SentenceCompletion } from '@/types'
import { Card, CardHeader, CardBody } from '@heroui/card'
import { Input } from '@heroui/input'
import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce(fn: (...args: any[]) => void, delay: number) {
  let timeoutID: number | null = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (...args: any[]) {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = window.setTimeout(() => {
      fn(...args)
      timeoutID = null
    }, delay)
  }
}

export default function SentenceCompletion({
  data
}: {
  data: SentenceCompletion[]
}) {
  const [sentences, setSentences] = useState(
    data.map((item) => ({
      ...item,
      userAnswer: ''
    }))
  )

  const setSentenceCompletionAnswer = useGlobalStore(
    (state) => state.setSentenceCompletionAnswer
  )

  const debouncedSetSentenceCompletionAnswer = debounce(
    setSentenceCompletionAnswer,
    500
  )

  useEffect(() => {
    debouncedSetSentenceCompletionAnswer(sentences)
  }, [sentences])

  return (
    <Card className="md:px-10 py-4 my-6" shadow="sm">
      <CardHeader>
        <h3 className="font-bold text-lg">5. Finish the sentences.</h3>
      </CardHeader>
      <CardBody>
        <ol className="list-decimal ps-4">
          {sentences.map((item, index) => (
            <li
              key={`${item.id}-SentenceCompletion`}
              className="my-[1lh] leading-[1.5lh]"
            >
              {item.beginning_sentence}
              {'...'}
              <Input
                value={item.userAnswer}
                variant="underlined"
                maxLength={100}
                size="sm"
                aria-label={`Complete sentence ${index + 1}`}
                onChange={(e) =>
                  setSentences((prev) => {
                    const newSentences = [...prev]
                    newSentences[index].userAnswer = e.target.value
                    return newSentences
                  })
                }
              />
            </li>
          ))}
        </ol>
      </CardBody>
    </Card>
  )
}
