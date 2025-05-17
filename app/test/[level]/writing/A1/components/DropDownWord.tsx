'use client'
import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu
} from '@heroui/dropdown'
import { memo, useCallback, useEffect, useState } from 'react'
import type { PunctuationWord } from '@/types'

interface Props {
  wordValue: PunctuationWord
  updateGlobalState: (word: PunctuationWord) => void
}

export default memo(function DropDownWord({ wordValue, updateGlobalState }: Props) {

  const [wordState, setWordState] = useState<PunctuationWord>(wordValue)

  useEffect(() => {
    if(wordState.isChanged) updateGlobalState(wordState)
  }, [wordState])

  const handleWordChange = useCallback((key: string) => {
    setWordState((prev) => {
      let wordValue = prev.word

      if (key === 'lowercase') wordValue = prev.word.toLowerCase()
      else if (key === 'uppercase') wordValue = prev.word.toUpperCase()
      else if (key === 'capitalised')
        wordValue =
          prev.word.charAt(0).toUpperCase() + prev.word.slice(1).toLowerCase()
      else if (key === 'apostrophe') wordValue = addApostrophe(prev.word)

      const newWord = {
        ...prev,
        word: wordValue,
        isChanged: true
      }
      return newWord
    })
  }, [])

  const handleSpecialCharacterChange = useCallback((newWord: string) => {
    setWordState((prev) => ({
      ...prev,
      word: newWord,
      isChanged: true
    }))
  }, [])

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
  return (
    <Dropdown>
      <DropdownTrigger>
        <span
          className={wordState.isChanged ? 'text-primary' : ''}
          data-dropdown="true"
        >
          {wordState.word}
        </span>
      </DropdownTrigger>

      {wordState.type !== 'space' ? (
        <DropdownMenu
          onAction={(key) => handleWordChange(key.toString())}
          disabledKeys={wordState.hasApostrophe ? ['apostrophe'] : []}
        >
          <DropdownItem key={'lowercase'}>Lowercase</DropdownItem>
          <DropdownItem key={'uppercase'}>Uppercase</DropdownItem>
          <DropdownItem key={'capitalised'}>Capitalised</DropdownItem>
          <DropdownItem key={'apostrophe'}>Apostrophe (&apos;)</DropdownItem>
        </DropdownMenu>
      ) : (
        <DropdownMenu
          onAction={(key) => handleSpecialCharacterChange(key.toString())}
        >
          <DropdownItem key={' '}>Space</DropdownItem>
          <DropdownItem key={'? '}>Question mark (?)</DropdownItem>
          <DropdownItem key={'. '}>Full stop (.)</DropdownItem>
          <DropdownItem key={'! '}>Exclamation mark (!)</DropdownItem>
          <DropdownItem key={', '}>Comma (,)</DropdownItem>
          <DropdownItem key={'; '}>Semicolon (;)</DropdownItem>
          <DropdownItem key={': '}>Colon (:) </DropdownItem>
          <DropdownItem key={' "'}>
            Quotation mark (&quot; or &apos;)
          </DropdownItem>
          <DropdownItem key={'-'}>Hyphen (-)</DropdownItem>
          <DropdownItem key={' — '}>Dash (—)</DropdownItem>
          <DropdownItem key={'... '}>Ellipsis (...)</DropdownItem>
        </DropdownMenu>
      )}
    </Dropdown>
  )
})
