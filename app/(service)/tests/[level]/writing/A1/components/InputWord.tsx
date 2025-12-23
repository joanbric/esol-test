'use client'
import { useGlobalStore } from '@/libs/store/store'
import { SpellingSolution, SpellingWord } from '@/types'
import { useRef, useState } from 'react'
import { Delete, Save } from 'lucide-react'
import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, DropdownSection } from '@heroui/dropdown'
const unchangedValue = {
  word: '',
  position: -1,
  isChanged: false
}
export default function InputWord({
  word,
  solution,
  isReadOnly = false
}: {
  word: SpellingWord
  solution?: SpellingSolution
  isReadOnly?: boolean
}) {
  const defaultValue = word.word
  const [inputValue, setInputValue] = useState(unchangedValue)
  const refInput = useRef<HTMLInputElement>(null)

  const setSpellingWord = useGlobalStore((state) => state.setSpellingWord)
  const removeSpellingWord = useGlobalStore((state) => state.removeSpellingWord)

  function renderValue() {
    const text = refInput.current?.value
    if (!text) return
    if (text === '') {
      setInputValue(unchangedValue)
      removeSpellingWord(word.position)
      return
    }

    setSpellingWord({
      SpellingWord: text,
      SpellingWordPosition: word.position
    })
    setInputValue({
      word: text,
      position: word.position,
      isChanged: true
    })
  }

  const getComponentStyles = () => {
    if (inputValue.isChanged) {
      if (!solution && isReadOnly) return 'text-danger'
      if (!solution) return 'text-primary'
      if (solution.solution === inputValue.word) return 'text-green-500'
      else return 'text-red-500'
    }else if (isReadOnly && solution) {
      return 'text-amber-600'
    }
    return ''
  }

  if (isReadOnly)
    return (
      <span className={`${getComponentStyles()} inline-block relative`}>
        {(inputValue.isChanged || solution) ? (
          <span className="absolute top-0 left-0 -translate-y-[0.3lh] text-nowrap w-full text-red-800 z-10 text-sm text-center">
            {defaultValue}
          </span>
        ) : null}
        {inputValue.isChanged ? inputValue.word : solution?.solution ? solution.solution : defaultValue}
      </span>
    )

  return (
    <Dropdown
      onOpenChange={(open) => {
        if (open) refInput.current?.focus()
      }}
    >
      <DropdownTrigger>
        <span className={`${getComponentStyles()} inline-block relative`}>
          {inputValue.isChanged ? (
            <span className="absolute top-0 left-0 -translate-y-[0.3lh] text-nowrap w-full text-red-800 z-10 text-sm text-center">
              {defaultValue}
            </span>
          ) : null}
          {inputValue.isChanged ? inputValue.word : defaultValue}
        </span>
      </DropdownTrigger>
      <DropdownMenu
        disabledKeys={inputValue.isChanged ? [] : ['reset']}
        onAction={(key) => {
          if (key === 'accept') {
            renderValue()
          }
          if (key === 'reset') {
            setInputValue(unchangedValue)
            removeSpellingWord(word.position)
          }
        }}
        itemClasses={{
          base: [
            'rounded-md',
            'text-default-500',
            'transition-opacity',
            // 'data-[hover=true]:text-foreground',
            'data-[hover=true]:bg-default-50',
            // 'dark:data-[hover=true]:bg-default-50',
            // 'data-[selectable=true]:focus:bg-default-50',
            // 'data-[pressed=true]:opacity-70',
            // 'data-[focus-visible=true]:ring-default-500',
            'px-4',
            'text-[1.2rem]',
            'font-bold'
          ]
        }}
      >
        <DropdownItem key={word.position} closeOnSelect={false} data-hover={false} className="border-2 border-gray-200">
          <input
            className="inline focus:outline-none py-2 text-lg "
            ref={refInput}
            defaultValue={inputValue.word}
            placeholder={defaultValue}
          />
        </DropdownItem>
        <DropdownSection showDivider>
          <DropdownItem
            key="accept"
            className="data-[hover=true]:text-primary"
            endContent={<Save className="ml-2 text-primary-400 cursor-pointer" />}
          >
            <span className="text-lg ">Accept</span>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="reset"
            className="text-danger data-[hover=true]:text-danger data-[hover=true]:bg-red-200/20"
            endContent={<Delete className="ml-2 text-red-400  cursor-pointer" />}
            color="danger"
          >
            <span className="text-lg font-semibold">Reset</span>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
