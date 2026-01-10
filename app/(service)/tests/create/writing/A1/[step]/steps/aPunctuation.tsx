'use client'

import { useGlobalStore } from '@/libs/store/store'
import { useState, useRef, useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import type { PunctuationWordAnswer } from '@/types'

interface PunctuationType {
  id: number
  code: string
  label: string
  group: number // 1: Transformation, 2: Insertion
  characterType: number
}

const PUNCTUATION_TYPES: PunctuationType[] = [
  { id: 1, code: 'lowercase', label: 'Lowercase', group: 1, characterType: 1 },
  { id: 2, code: 'uppercase', label: 'Uppercase', group: 1, characterType: 1 },
  { id: 3, code: 'capitalised', label: 'Capitalised', group: 1, characterType: 1 },
  { id: 4, code: 'apostrophe', label: "Apostrophe (')", group: 1, characterType: 1 },
  { id: 5, code: 'bksp', label: 'Space', group: 2, characterType: 2 },
  { id: 6, code: '?', label: 'Question mark (?)', group: 2, characterType: 2 },
  { id: 7, code: '.', label: 'Full stop (.)', group: 2, characterType: 2 },
  { id: 8, code: '!', label: 'Exclamation mark (!)', group: 2, characterType: 2 },
  { id: 9, code: ',', label: 'Comma (,)', group: 2, characterType: 2 },
  { id: 10, code: ';', label: 'Semicolon (;)', group: 2, characterType: 2 },
  { id: 11, code: ':', label: 'Colon (:)', group: 2, characterType: 2 },
  { id: 12, code: '"', label: 'Quotation mark (")', group: 2, characterType: 2 },
  { id: 13, code: '-', label: 'Hyphen (-)', group: 2, characterType: 2 },
  { id: 14, code: '—', label: 'Dash (—)', group: 2, characterType: 2 },
  { id: 15, code: '...', label: 'Ellipsis (...)', group: 2, characterType: 2 }
]

function PunctuationModal({
  selectedPos,
  isMarked,
  onSelect,
  onClear
}: {
  selectedPos: { position: number; group: number; word: string }
  isMarked: boolean
  onSelect: (typeId: number) => void
  onClear: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const isLetter = useMemo(() => /[a-zA-Z]/.test(selectedPos.word), [selectedPos.word])

  const transformations = useMemo(() => PUNCTUATION_TYPES.filter((t) => t.group === 1), [])
  const insertions = useMemo(() => PUNCTUATION_TYPES.filter((t) => t.group === 2), [])

  return (
    <dialog
      ref={dialogRef}
      id="punctuation-modal"
      popover="auto"
      style={
        {
          positionAnchor: `--char-${selectedPos.group}-${selectedPos.position}`
        } as React.CSSProperties
      }
      className="absolute inset-auto m-0 p-4 bg-white rounded-xl shadow-2xl border border-slate-200 backdrop:bg-slate-900/10 backdrop:backdrop-blur-xs focus:outline-none min-w-64"
    >
      <div className="flex flex-col gap-4">
        <header className="flex justify-between items-center border-b border-slate-100 pb-2">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
            Mark: <span className="text-primary-600 font-black">"{selectedPos.word.trim() || 'Space'}"</span>
          </span>
          <div className="flex items-center gap-2">
            {isMarked && (
              <button
                type="button"
                className="text-[10px] font-black text-rose-500 hover:text-rose-700 bg-rose-50 px-2 py-1 rounded-md uppercase transition-colors"
                onClick={() => {
                  onClear()
                  dialogRef.current?.hidePopover()
                }}
              >
                Clear mark
              </button>
            )}
            <button
              type="button"
              title="Close"
              className="text-slate-400 hover:text-slate-600 transition-colors"
              onClick={() => dialogRef.current?.hidePopover()}
            >
              ✕
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {/* Transformations only for letters */}
          {isLetter && (
            <section>
              <h4 className="text-[10px] font-black text-slate-400 uppercase mb-2 border-l-2 border-amber-400 pl-1">
                Transformations
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {transformations.map((type) => (
                  <button
                    key={`type-${type.id}`}
                    type="button"
                    className="px-3 py-1.5 text-xs text-left bg-slate-50 hover:bg-amber-50 hover:text-amber-700 rounded-lg border border-slate-100 transition-all font-medium"
                    onClick={() => {
                      onSelect(type.id)
                      dialogRef.current?.hidePopover()
                    }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Insertions for non-letters (spaces or at positions) */}
          {!isLetter && (
            <section>
              <h4 className="text-[10px] font-black text-slate-400 uppercase mb-2 border-l-2 border-primary-400 pl-1">
                Punctuation
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {insertions.map((type) => (
                  <button
                    key={`type-${type.id}`}
                    type="button"
                    className="px-2 py-1.5 text-xs text-center bg-slate-50 hover:bg-primary-50 hover:text-primary-700 rounded-lg border border-slate-100 transition-all font-black"
                    onClick={() => {
                      onSelect(type.id)
                      dialogRef.current?.hidePopover()
                    }}
                  >
                    {type.id === 5 ? 'Space' : type.code}
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </dialog>
  )
}

export default function PunctuationStep() {
  const {
    punctuationTitle,
    punctuationScript,
    punctuationAnswer,
    setPunctuationWordTitleAnswer,
    setPunctuationWordScriptAnswer,
    removePunctuationWordAnswer
  } = useGlobalStore(
    useShallow((state) => ({
      punctuationTitle: state.punctuationTitle,
      punctuationScript: state.punctuationScript,
      punctuationAnswer: state.punctuationAnswer,
      setPunctuationWordTitleAnswer: state.setPunctuationWordTitleAnswer,
      setPunctuationWordScriptAnswer: state.setPunctuationWordScriptAnswer,
      removePunctuationWordAnswer: state.removePunctuationWordAnswer
    }))
  )

  const [selectedPos, setSelectedPos] = useState({ position: -1, group: -1, word: '' })

  const handleCharClick = (char: string, position: number, group: number) => {
    setSelectedPos({ position, group, word: char })
  }

  const handleSelectPunctuation = (typeId: number) => {
    const type = PUNCTUATION_TYPES.find((t) => t.id === typeId)
    if (!type) return

    const answer = {
      position: selectedPos.position,
      answer: type.code,
      group: selectedPos.group,
      punctuationTypeId: type.id
    }

    if (selectedPos.group === 1) {
      setPunctuationWordTitleAnswer(answer)
    } else {
      setPunctuationWordScriptAnswer(answer)
    }
  }

  const getPunctuationForPos = (position: number, group: number) => {
    return punctuationAnswer.find((a) => a.position === position && a.group === group)
  }

  const getTransformedChar = (char: string, pAns: PunctuationWordAnswer | undefined) => {
    if (!pAns) return char === ' ' ? '\u00A0' : char

    const type = PUNCTUATION_TYPES.find((t) => t.id === pAns.punctuationTypeId)
    if (!type) return char === ' ' ? '\u00A0' : char

    if (type.group === 1) {
      // Transformation
      if (type.code === 'uppercase' || type.code === 'capitalised') return char.toUpperCase()
      if (type.code === 'lowercase') return char.toLowerCase()
      if (type.code === 'apostrophe') return `${char}'` // Appending apostrophe to the right
      return char
    } else {
      // Insertion
      if (type.code === 'bksp') return '\u00A0'
      return type.code // insertion (., ,, !, etc)
    }
  }

  const renderText = (text: string, group: number) => {
    const chars = text.split('')
    chars.push(' ') // Final space for trailing punctuation

    return chars.map((char, index) => {
      const pAns = getPunctuationForPos(index, group)
      const isMarked = !!pAns
      const anchorName = `--char-${group}-${index}`

      const displayChar = getTransformedChar(char, pAns)

      return (
        <button
          key={`text-${group}-pos-${index}`}
          popoverTarget="punctuation-modal"
          type="button"
          className={`
            inline-block min-w-2 relative rounded transition-all
            ${
              isMarked
                ? 'bg-amber-100 text-amber-900 border-b-2 border-amber-400 font-bold'
                : 'hover:bg-slate-200 border-b-2 border-transparent'
            }
          `}
          style={{ anchorName: anchorName } as React.CSSProperties}
          onClick={() => handleCharClick(char, index, group)}
        >
          {displayChar}
        </button>
      )
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <PunctuationModal
        selectedPos={selectedPos}
        isMarked={!!getPunctuationForPos(selectedPos.position, selectedPos.group)}
        onSelect={handleSelectPunctuation}
        onClear={() => removePunctuationWordAnswer(selectedPos.position, selectedPos.group)}
      />

      <h1 className="text-2xl font-black text-slate-800 mb-8 border-l-4 border-primary-500 pl-4 uppercase tracking-tight">
        Punctuation & Grammar Task
      </h1>

      <div className="space-y-12">
        <section>
          <header className="mb-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Exercise Title</h3>
            <p className="text-sm text-slate-500">Tag characters in the title that require attention.</p>
          </header>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 min-h-[60px] leading-relaxed text-lg">
            {renderText(punctuationTitle, 1)}
          </div>
        </section>

        <section>
          <header className="mb-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Exercise Script</h3>
            <p className="text-sm text-slate-500">
              Select characters, spaces, or the end of sentences to add punctuation.
            </p>
          </header>
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 min-h-[150px] leading-relaxed text-lg italic text-slate-700">
            {renderText(punctuationScript, 2)}
          </div>
        </section>
      </div>

      <div className="mt-12 p-4 bg-primary-50 border border-primary-100 rounded-xl flex items-start gap-4">
        <div className="bg-primary-500 text-white rounded-full p-1.5 mt-0.5 shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <title>Information icon</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-primary-900">How to use:</p>
          <ul className="text-xs text-primary-800 list-disc list-inside space-y-1">
            <li>
              Click on any character to apply <span className="font-bold underline">transformations</span> (like
              Capitalisation).
            </li>
            <li>
              Click on a space or after the last word to <span className="font-bold underline">insert</span> markers
              (like Full stops).
            </li>
            <li>Characters with active marks will appear highlighted in blue.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
