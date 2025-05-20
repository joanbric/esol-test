'use client'
import type { Spelling, SpellingWord } from '@/types'
import { Card, CardHeader, CardBody } from '@heroui/card'
import InputWord from './InputWord'
import { useGlobalStore } from '@/libs/store/store'
import { useShallow } from 'zustand/react/shallow'
const textParse = (text: string): SpellingWord[] =>
  ` ${text} `.match(/\S+/g)?.map((word, index) => ({
    word,
    position: index,
    isChanged: false
  })) || []

export default function Spelling({ data }: { data: Spelling }) {
  const script = textParse(data.script)

  const { isSolved, spellingSolution } = useGlobalStore(
    useShallow((state) => ({
      isSolved: state.isSolved,
      spellingSolution: state.spellingSolution
    }))
  )

  return (
    <Card className="md:px-10 my-6 py-4" shadow="sm">
      <CardHeader>
        <h3 className="font-bold text-lg">
          2. Read the text and underline all spelling errors. Write the correct spellings on the line.
        </h3>
      </CardHeader>
      <CardBody>
        <div className="leading-12 text-xl text-gray-700 flex gap-1 flex-wrap">
          {script.map((word, index) => (
            <InputWord
              key={index}
              word={word}
              isReadOnly={isSolved}
              solution={spellingSolution.find((sol) => sol.position === word.position)}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
