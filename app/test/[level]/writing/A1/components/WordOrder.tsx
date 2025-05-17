'use client'
import type { WordOrder } from '@/types'
import { Card, CardHeader, CardBody } from '@heroui/card'
import { Select, SelectItem } from '@heroui/select'
import { useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
type Sentence = {
  id: string | number
  word: string
  startingPos: number
  correctPos: number
  userPos: number
  selected?: boolean
  chosen?: boolean
  filtered?: boolean
}[]

type DataParsed = {
  id: number
  word: string
  startingPos: number
  correctPos: number
  userPos: number
  filtered?: undefined
}

const dataParse = (data: WordOrder[]): DataParsed[][] => {
  const grouped: Record<number, WordOrder[]> = {}

  // Agrupar por exercise_id
  for (const item of data) {
    if (!grouped[item.exercise_id]) {
      grouped[item.exercise_id] = []
    }
    grouped[item.exercise_id].push(item)
  }

  // Transformar cada grupo
  const result: DataParsed[][] = Object.values(grouped).map((group) => {
    return group.map((item) => ({
      id: item.id,
      word: item.word,
      startingPos: item.word_order,
      correctPos: item.word_order2 ?? item.word_order,
      userPos: item.word_order
    }))
  })

  return result
}

function useSentenceOrderManager(initValue: Sentence[]): [
  Sentence[], // sentences
  (sentenceIndex: number) => (newState: Sentence) => void, // setValueConstructor
  (sentenceIndex: number) => Sentence // getValue
] {
  const [v, setV] = useState<Sentence[]>(initValue)

  function setValueConstructor(sentenceIndex: number) {
    return (newState: Sentence) => {
      const modifiedValue = newState.map((word, index) => ({
        ...word,
        userPos: index
      }))
      setV((prev) => {
        const newV = [...prev]
        newV[sentenceIndex] = modifiedValue
        return newV
      })
    }
  }

  function getValue(sentenceIndex?: number) {
    if (
      sentenceIndex !== undefined &&
      typeof sentenceIndex === 'number' &&
      sentenceIndex >= 0 &&
      sentenceIndex < v.length &&
      v[sentenceIndex]
    )
      return v[sentenceIndex].map((word) => ({
        selected: false,
        chosen: false,
        filtered: false,
        ...word
      }))

    return [
      {
        id: 0,
        word: 'Error',
        startingPos: 0,
        correctPos: 0,
        userPos: 0,
        selected: false,
        chosen: false,
        filtered: false
      }
    ]
  }

  const sentences = v.map((sentence) =>
    sentence.map((word) => ({
      ...word,
      selected: false,
      chosen: false,
      filtered: false
    }))
  )

  return [sentences, setValueConstructor, getValue]
}

export default function WordOrder({ data }: { data: WordOrder[] }) {
  const [sentences, setValueConstructor] = useSentenceOrderManager(
    dataParse(data)
  )
  return (
    <Card className="md:px-10 py-4 my-6" shadow="sm">
      <CardHeader>
        <h3 className="font-bold text-lg">
          4. Reorder the words to make questions or statements.
        </h3>
      </CardHeader>
      <CardBody>
        <ol className="list-decimal ps-4">
          {sentences.map((sentence, index) => (
            <li
              key={`${index}-sentence-word-order`}
              className="my-[1lh] leading-[1.5lh]"
            >
              <ReactSortable
                tag="span"
                list={sentence}
                setList={setValueConstructor(index)}
              >
                {sentence
                  .sort((a, b) => a.userPos - b.userPos)
                  .map(({ word, id }) => (
                    <span
                      key={`${id}-${word}`}
                      className="inline-block my-1 mx-1 bg-gray-200 px-2 rounded-md"
                    >
                      {word}
                    </span>
                  ))}
              </ReactSortable>
              <Select
                key="punctuation"
                className="inline-block min-w-[80px] my-1 mx-1 px-2 rounded-md"
                fullWidth={false}
                radius="sm"
                size="sm"
                placeholder="Select an option"
                variant="faded"
                isRequired
                aria-label="Select punctuation"
                classNames={{
                  popoverContent: 'w-[200px]'
                }}
              >
                <SelectItem key="." textValue=".">
                  Full stop (.)
                </SelectItem>
                <SelectItem key="?" textValue="?">
                  Question mark (?)
                </SelectItem>
                <SelectItem key="!" textValue="!">
                  Exclamation mark (!)
                </SelectItem>
              </Select>
            </li>
          ))}
        </ol>
      </CardBody>
    </Card>
  )
}
