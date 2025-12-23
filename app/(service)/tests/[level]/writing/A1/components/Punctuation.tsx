'use client'
import { Card, CardHeader, CardBody } from '@heroui/card'
import type {
  Punctuation,
  PunctuationType,
  PunctuationWord,
  PunctuationWordAnswer
} from '@/types'
import DropDownWord from './DropDownWord'
import { useGlobalStore } from '@/libs/store/store'
import { useCallback, useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

type Props = {
  data: Punctuation
}

const textParse = (text: string): PunctuationWord[] =>
  ` ${text} `.match(/\S+|\s+/g)?.map((word, index) => ({
    word,
    position: index,
    type: word === ' ' ? 'space' : 'word',
    punctuationTypeId: -1,
    isChanged: false,
    // eslint-disable-next-line quotes
    hasApostrophe: word.includes("'")
  })) || []

export default function Punctuation({ data }: Props) {
  const title = textParse(data.title)
  const script = textParse(data.script)
  const [punctuationTypes, setPunctuationTypes] = useState<PunctuationType[]>(
    []
  )

  useEffect(() => {
    fetch('/api/punctuation-types')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch punctuation types')
        }
        return res.json()
      })
      .then((data) => {
        setPunctuationTypes(data.punctuationTypes)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const {
    isSolved,
    punctuationSolution,
    setPunctuationWordTitle,
    setPunctuationWordScript,
    setPunctuationExerciseId
  } = useGlobalStore(
    useShallow((state) => ({
      isSolved: state.isSolved,
      punctuationSolution: state.punctuationSolution,
      setPunctuationWordTitle: state.setPunctuationWordTitle,
      setPunctuationWordScript: state.setPunctuationWordScript,
      setPunctuationExerciseId: state.setPunctuationExerciseId
    }))
  )

  // useEffect(() => {
  //   if (isSolved) {
  //     console.log(punctuationSolution)
  //   }
  // }, [isSolved, punctuationSolution])

  useEffect(() => {
    setPunctuationExerciseId(data.id)
  }, [data.id])

  // Tengo que mover esto al component DropDownWord. Gracias a useShallow, ya no es necesario tenerlo aquí.
  const updateGlobalTitle = useCallback(
    (word: PunctuationWordAnswer) => setPunctuationWordTitle(word),
    []
  )
  const updateGlobalScript = useCallback(
    (word: PunctuationWordAnswer) => setPunctuationWordScript(word),
    []
  )

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
              group={1}
              punctuationTypes={punctuationTypes}
              punctuationSolution={punctuationSolution?.find((sol) => sol.position === word.position && sol.group === 1)}
              isReadOnly={isSolved}
            />
          ))}
        </h4>

        <p className="text-gray-700 text-lg select-none">
          {script.map((word, index) => (
            <DropDownWord
              key={`${index}-word-script`}
              wordValue={word}
              updateGlobalState={updateGlobalScript}
              group={2}
              punctuationTypes={punctuationTypes}
              punctuationSolution={punctuationSolution?.find((sol) => sol.position === word.position && sol.group === 2)}
              isReadOnly={isSolved}
            />
          ))}
        </p>
      </CardBody>
    </Card>
  )
}
