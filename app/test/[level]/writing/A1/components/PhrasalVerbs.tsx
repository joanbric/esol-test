'use client'
import { useGlobalStore } from '@/libs/store/store'
import { PhrasalVerb } from '@/types'
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
export default function PhrasalVerbs({ data }: { data: PhrasalVerb[] }) {
  const [phrasalVerbs, setPhrasalVerbs] = useState(
    data.map((item) => ({
      ...item,
      userAnswer: ''
    }))
  )
  const setPhrasalVerbsAnswer = useGlobalStore(
    (state) => state.setPhrasalVerbsAnswer
  )
  const debouncedSetPhrasalVerbsAnswer = debounce(setPhrasalVerbsAnswer, 500)
  useEffect(() => {
    debouncedSetPhrasalVerbsAnswer(phrasalVerbs)
  }, [phrasalVerbs])
  return (
    <Card className="md:px-10 py-4 my-6" shadow="sm">
      <CardHeader>
        <h3 className="font-bold text-lg">
          6. Write a sentence using each of these phrasal verbs. You can use
          different tenses.
        </h3>
      </CardHeader>
      <CardBody>
        {/* <header>
          <ul className='flex gap-2 justify-start flex-wrap'>
            {phrasalVerbs.map((phrasalVerb, index) => (
              <li key={index} className='text-nowrap bg-primary-50 px-4 py-1 rounded-md'>{phrasalVerb.phrasalVerb}</li>
            ))}
          </ul>
        </header> */}
        <ol className="list-decimal ps-4">
          {phrasalVerbs.map((phrasalVerb, index) => (
            <li key={index} className="my-[2lh] ">
              <div
                key={index}
                className="text-nowrap bg-primary-50 px-4 py-1 rounded-md w-min"
              >
                {phrasalVerb.verb}
              </div>
              <Input
                value={phrasalVerb.userAnswer}
                variant="underlined"
                size="sm"
                className="pt-4"
                classNames={{
                  input: 'text-lg'
                }}
                onChange={(e) =>
                  setPhrasalVerbs((prev) => {
                    const newPhrasalVerbs = [...prev]
                    newPhrasalVerbs[index].userAnswer = e.target.value
                    return newPhrasalVerbs
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
