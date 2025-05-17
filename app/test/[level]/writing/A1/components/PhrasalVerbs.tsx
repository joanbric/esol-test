'use client'
import { PhrasalVerb } from '@/types'
import { Card, CardHeader, CardBody } from '@heroui/card'
import { Input } from '@heroui/input'
import { useState } from 'react'

// const data = [
//   {
//     phrasalVerb: 'take over',
//     userAnswer: ''
//   },
//   {
//     phrasalVerb: 'show up',
//     userAnswer: ''
//   },
//   {
//     phrasalVerb: 'look forward to',
//     userAnswer: ''
//   },
//   {
//     phrasalVerb: 'put together',
//     userAnswer: ''
//   },
//   {
//     phrasalVerb: 'turn up',
//     userAnswer: ''
//   },
//   {
//     phrasalVerb: 'stick to',
//     userAnswer: ''
//   }
// ]
export default function PhrasalVerbs({ data }: { data: PhrasalVerb[] }) {
  const [phrasalVerbs, setPhrasalVerbs] = useState(
    data.map((item) => ({
      ...item,
      userAnswer: ''
    }))
  )
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
