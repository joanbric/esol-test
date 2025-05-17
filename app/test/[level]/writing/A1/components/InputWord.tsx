'use client'

import { SpellingWord } from '@/types'
import { useState } from 'react'
import { Save } from 'lucide-react'
import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu
} from '@heroui/dropdown'
export default function InputWord({ word }: { word: SpellingWord }) {
  const defaultValue = word.word
  const [inputValue, setInputValue] = useState({
    word: '',
    position: -1,
    isChanged: false
  })

  return (
    <Dropdown>
      <DropdownTrigger>
        <span className={`${inputValue.isChanged ? 'text-primary' : ''} inline-block relative`}>
          {inputValue.isChanged ? (
            <span className='absolute top-0 left-0 -translate-y-[0.3lh] text-nowrap w-full text-red-800 z-10 text-sm text-center'>{defaultValue}</span>
          ) : null}
          {inputValue.isChanged ? inputValue.word : defaultValue}
        </span>
      </DropdownTrigger>
      <DropdownMenu
        itemClasses={{
          base: [
            'rounded-md',
            'text-default-500',
            'transition-opacity',
            'data-[hover=true]:text-foreground',
            'data-[hover=true]:bg-default-50',
            'dark:data-[hover=true]:bg-default-50',
            'data-[selectable=true]:focus:bg-default-50',
            'data-[pressed=true]:opacity-70',
            'data-[focus-visible=true]:ring-default-500',
            'p-0'
          ]
        }}
      >
        <DropdownItem
          key={word.position}
          isReadOnly
          data-hover={false}
          autoFocus
          endContent={
            <button className="ml-2 text-primary-400 cursor-pointer">
              <Save />
            </button>
          }
        >
          <input
            className="inline focus:outline-none py-2 px-3 text-lg "
            value={inputValue.word}
            placeholder={defaultValue}
            onChange={(e) =>
              setInputValue({
                word: e.target.value,
                position: word.position,
                isChanged: true
              })
            }
          />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
