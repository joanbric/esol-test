'use client'
import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu
} from '@heroui/dropdown'
import { Tooltip } from '@heroui/tooltip'
import { memo, useCallback, useEffect, useState } from 'react'
import type {
  PunctuationSolution,
  PunctuationType,
  PunctuationWord,
  PunctuationWordAnswer
} from '@/types'

interface Props {
  wordValue: PunctuationWord
  updateGlobalState: (word: PunctuationWordAnswer) => void
  group: number
  punctuationTypes: PunctuationType[]
  punctuationSolution?: PunctuationSolution
  isReadOnly?: boolean
}

function TooltipContent(userAnswer: string, solution: string) {
  return (
    <div className="p-3 text-md">
      <p className="font-bold text-success-700">The correct answer is: {solution}</p>
      <p>Your answer: {userAnswer}</p>
    </div>
  )
}

export default memo(function DropDownWord({
  wordValue,
  updateGlobalState,
  group,
  punctuationTypes,
  punctuationSolution,
  isReadOnly = false
}: Props) {
  const [wordState, setWordState] = useState<PunctuationWord>(wordValue)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    if (wordState.isChanged)
      updateGlobalState({
        answer: wordState.word,
        group,
        punctuationTypeId: wordState.punctuationTypeId,
        position: wordState.position
      })
  }, [wordState])

  const handleWordChange = useCallback(
    (key: number) => {
      const type = punctuationTypes.find((type) => type.id === key)
      console.log('El tipo de puntuacion es: ', type, key)
      if (!type) return
      setWordState((prev) => {
        let wordValue = prev.word

        if (type.typeCode === 'lowercase') wordValue = prev.word.toLowerCase()
        else if (type.typeCode === 'uppercase')
          wordValue = prev.word.toUpperCase()
        else if (type.typeCode === 'capitalised')
          wordValue =
            prev.word.charAt(0).toUpperCase() + prev.word.slice(1).toLowerCase()
        else if (type.typeCode === 'apostrophe')
          wordValue = addApostrophe(prev.word)

        const newWord = {
          ...prev,
          word: wordValue,
          punctuationTypeId: type.id,
          isChanged: true
        }
        return newWord
      })
    },
    [punctuationTypes]
  )

  const handleSpecialCharacterChange = useCallback(
    (key: number) => {
      const type = punctuationTypes.find((type) => type.id === key)
      if (!type) return
      setWordState((prev) => ({
        ...prev,
        word: type.typeCode,
        punctuationTypeId: type.id,
        isChanged: true
      }))
    },
    [punctuationTypes]
  )

  const suffixes = ['nt', 'll', 've', 're', 'd', 'm', 's']

  const addApostrophe = (word: string) => {
    // Check if it's a word
    if (/^\w+$/.test(word)) {
      for (const suffix of suffixes) {
        if (word.toLowerCase().endsWith(suffix)) {
          const idx = word.length - suffix.length
          return `${word.slice(0, idx)}'${word.slice(idx)}`
        }
      }
    }
    return `${word}'`
  }

  const getComponentStyles = () => {
    if (wordState.isChanged) {
      if (!punctuationSolution) return 'text-primary font-bold'

      if (punctuationSolution.punctuationTypeId === wordState.punctuationTypeId)
        return 'text-green-500 font-bold'
      else return 'text-red-500 font-bold'
    } else if (punctuationSolution) {
      return 'text-red-500 font-bold'
    }
    return ''
  }

  if (isReadOnly)
    return (
      <Tooltip
        isOpen={showTooltip}
        content={TooltipContent(
          wordState.word,
          punctuationSolution?.solution ?? wordValue.word
        )}
        onOpenChange={(open) => setShowTooltip(open)}
        isDisabled={!punctuationSolution && !wordState.isChanged}
      >
        <span className={getComponentStyles()} onClick={() => setShowTooltip(true)}>
          {punctuationSolution?.solution ?? wordState.word}
        </span>
      </Tooltip>
    )

  return (
    <Dropdown>
      <DropdownTrigger>
        <span className={getComponentStyles()} data-dropdown="true">
          {punctuationSolution?.solution ?? wordState.word}
        </span>
      </DropdownTrigger>

      {wordState.type !== 'space' ? (
        <DropdownMenu
          onAction={(key) => handleWordChange(Number(key))}
          disabledKeys={wordState.hasApostrophe ? ['apostrophe'] : []}
        >
          {punctuationTypes
            .filter((type) => type.characterType === 1)
            .map((type) => (
              <DropdownItem key={type.id}>{type.description}</DropdownItem>
            ))}
        </DropdownMenu>
      ) : (
        <DropdownMenu
          onAction={(key) => handleSpecialCharacterChange(Number(key))}
        >
          {punctuationTypes
            .filter((type) => type.characterType === 2)
            .map((type) => (
              <DropdownItem key={type.id}>{type.description}</DropdownItem>
            ))}
        </DropdownMenu>
      )}
    </Dropdown>
  )
})
