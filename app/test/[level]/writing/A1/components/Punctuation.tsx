'use client'
import { Card, CardHeader, CardBody } from '@heroui/card'
import type { Punctuation, PunctuationWord } from '@/types'
import DropDownWord from './DropDownWord'
import { useWritingA1Store } from '@stores/stores'
import { useCallback } from 'react'

type Props = {
  data: Punctuation
}

const textParse = (text: string): PunctuationWord[] =>
  ` ${text} `.match(/\S+|\s+/g)?.map((word, index) => ({
    word,
    position: index,
    type: word === ' ' ? 'space' : 'word',
    isChanged: false,
    // eslint-disable-next-line quotes
    hasApostrophe: word.includes("'")
  })) || []

export default function Punctuation({ data }: Props) {
  const title = textParse(data.title)
  const script = textParse(data.script)
  const { setWordTitle, setWordScript } = useWritingA1Store()

  const updateGlobalTitle = useCallback((word: PunctuationWord) => setWordTitle(word), [])
  const updateGlobalScript = useCallback((word: PunctuationWord) => setWordScript(word), [])

  return (
    <Card className="md:px-10 my-6 py-4" shadow="sm">
      <CardHeader>
        <h3 className="font-bold mb-[1lh]">
          1. Read the text and insert the correct punctuation markers. There are
          a total of 13 missing punctuation markers.
        </h3>
      </CardHeader>
      <CardBody className="relative">
        <h4 className="font-bold text-xl text-gray-700 mb-[1lh] select-none">
          {title.map((word, index) => (
            <DropDownWord
              key={`${index}-word-title`}
              wordValue={word}
              updateGlobalState={updateGlobalTitle}
            />
          ))}
        </h4>

        <p className="text-gray-700 text-lg select-none">
          {script.map((word, index) => (
            <DropDownWord
              key={`${index}-word-script`}
              wordValue={word}
              updateGlobalState={updateGlobalScript}
            />
          ))}
        </p>
      </CardBody>
    </Card>
  )
}
