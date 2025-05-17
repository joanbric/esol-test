'use client'
import type { MultiChoice, MultiChoiceParsed } from '@/types'
import { Card, CardHeader, CardBody } from '@heroui/card'
import { Select, SelectItem } from '@heroui/select'

// const data = {
//   script: `If you dislike your job or {{1}} unhappy in your relationship or you
// simply feel like you’ve lost your way in life,
// {{2}} a hobby can be a way to build yourself
// {{3}}. Maybe you {{4}} knitting or
// playing the piano and the small improvements you make week to week are
// enough to {{5}} you while you try to figure out the rest
// of your life. Sometimes hobbies give you one solid thing to feel
// {{6}} about.`,
//   options: {
//     1: [
//       {
//         value: 'you',
//         correct: true
//       },
//       {
//         value: 'you\'re',
//         correct: false
//       },
//       {
//         value: 'your',
//         correct: false
//       }
//     ],
//     2: [
//       {
//         value: 'development',
//         correct: true
//       },
//       {
//         value: 'developing',
//         correct: false
//       },
//       {
//         value: 'developed',
//         correct: false
//       }
//     ],
//     3: [
//       {
//         value: 'back_on',
//         correct: true
//       },
//       {
//         value: 'back_in',
//         correct: false
//       },
//       {
//         value: 'back_up',
//         correct: false
//       }
//     ],
//     4: [
//       {
//         value: 'take_on',
//         correct: true
//       },
//       {
//         value: 'take_off',
//         correct: false
//       },
//       {
//         value: 'take_up',
//         correct: false
//       }
//     ],
//     5: [
//       {
//         value: 'sustain',
//         correct: true
//       },
//       {
//         value: 'sustaining',
//         correct: false
//       },
//       {
//         value: 'sustained',
//         correct: false
//       }
//     ],
//     6: [
//       {
//         value: 'good',
//         correct: true
//       },
//       {
//         value: 'well',
//         correct: false
//       },
//       {
//         value: 'plenty',
//         correct: false
//       }
//     ]
//   }
// }

export default function MultiChoice({ data }: { data: MultiChoiceParsed }) {
  return (
    <Card className="md:px-10 py-4 my-6" shadow="sm">
      <CardHeader>
        <h3 className="font-bold text-lg">
          3. Complete the text by selecting the grammatically correct word.
        </h3>
      </CardHeader>
      <CardBody>
        <div>
          {data.exercise.split(/\{\{\d+\}\}/).map((part, index) => (
            <span key={index}>
              {part}
              {index < data.gaps.length && (
                <Select
                  as="span"
                  className="inline-flex w-[100px] my-1"
                  fullWidth={false}
                  radius="sm"
                  size="sm"
                  placeholder="Select an option"
                  variant="bordered"
                  isRequired
                  aria-label={`Select an option for gap ${index + 1}`}
                >
                  {data.gaps[index].options.map((option) => (
                    <SelectItem key={option.id}>{option.word}</SelectItem>
                  ))}
                </Select>
              )}
            </span>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
