'use client'

import { useGlobalStore } from '@/libs/store/store'
import { useState, useRef, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

function SpellingModal({
  selectedWord,
  currentCorrection,
  onSave,
  onClear
}: {
  selectedWord: { text: string; position: number }
  currentCorrection: string
  onSave: (correction: string) => void
  onClear: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [inputValue, setInputValue] = useState(currentCorrection)

  useEffect(() => {
    setInputValue(currentCorrection)
  }, [currentCorrection])

  const anchorName = `--word-${selectedWord.position}`

  return (
    <dialog
      ref={dialogRef}
      id="spelling-modal"
      popover="auto"
      style={{ positionAnchor: anchorName } as React.CSSProperties}
      className="absolute inset-auto m-0 p-4 bg-white rounded-xl shadow-2xl border border-slate-200 focus:outline-none min-w-64"
    >
      <div className="flex flex-col gap-4">
        <header className="flex justify-between items-center border-b border-slate-100 pb-2">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Correct Spelling</span>
          <button
            type="button"
            title="Close"
            className="text-slate-400 hover:text-slate-600 transition-colors"
            onClick={() => dialogRef.current?.hidePopover()}
          >
            ✕
          </button>
        </header>

        <div className="space-y-3">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-black mb-1">Original Word</p>
            <p className="text-sm font-bold text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
              {selectedWord.text}
            </p>
          </div>

          <div>
            <label htmlFor="correction-input" className="text-[10px] text-primary-600 uppercase font-black block mb-1">
              Corrected version
            </label>
            <input
              id="correction-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type correct spelling..."
              className="w-full px-3 py-2 text-sm border-2 border-primary-100 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all font-bold text-primary-900"
              autoComplete="off"
            />
          </div>
        </div>

        <footer className="flex gap-2 pt-2">
          <button
            type="button"
            className="flex-1 px-4 py-2 text-xs font-black text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-sm transition-all"
            onClick={() => {
              onSave(inputValue)
              dialogRef.current?.hidePopover()
            }}
          >
            Save Correction
          </button>
          {currentCorrection && (
            <button
              type="button"
              className="px-4 py-2 text-xs font-black text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 rounded-lg transition-all"
              onClick={() => {
                onClear()
                dialogRef.current?.hidePopover()
              }}
            >
              Clear
            </button>
          )}
        </footer>
      </div>
    </dialog>
  )
}

export default function SpellingStep() {
  const { spellingTitle, spellingScript, SpellingAnswer, setSpellingWord, removeSpellingWord } = useGlobalStore(
    useShallow((state) => ({
      spellingTitle: state.spellingTitle,
      spellingScript: state.spellingScript,
      SpellingAnswer: state.SpellingAnswer,
      setSpellingWord: state.setSpellingWord,
      removeSpellingWord: state.removeSpellingWord
    }))
  )

  const [selectedWord, setSelectedWord] = useState({ text: '', position: -1, group: -1 })

  const getCorrectionForPos = (position: number, group: number) => {
    return SpellingAnswer.find((a) => a.SpellingWordPosition === position && a.group === group)
  }

  const handleWordClick = (text: string, position: number, group: number) => {
    setSelectedWord({ text, position, group })
  }

  const handleSaveCorrection = (correction: string) => {
    if (!correction.trim()) {
      removeSpellingWord(selectedWord.position, selectedWord.group)
      return
    }
    setSpellingWord({
      SpellingWord: correction,
      SpellingWordPosition: selectedWord.position,
      group: selectedWord.group
    })
  }

  const renderText = (text: string, section: string) => {
    const group = section === 'title' ? 1 : 2
    // Split by words, keeping punctuation attached but identifying words.
    // However, the user said "click on each word", so simple split by spaces is usually best for A1.
    const parts = text.split(/(\s+)/)

    return parts.map((part, index) => {
      const isWhitespace = /^\s+$/.test(part)
      if (isWhitespace) return <span key={`space-${section}-${index}`}>{part.replace(/ /g, '\u00A0')}</span>

      const correction = getCorrectionForPos(index, group)
      const isCorrected = !!correction
      const anchorName = `--word-${index}`

      return (
        <button
          key={`word-${section}-${index}`}
          popoverTarget="spelling-modal"
          type="button"
          className={`
            relative inline-block px-1 rounded transition-all
            ${
              isCorrected
                ? 'bg-amber-100 text-amber-900 border-b-2 border-amber-400 font-bold'
                : 'hover:bg-slate-200 border-b-2 border-transparent'
            }
          `}
          style={{ anchorName: anchorName } as React.CSSProperties}
          onClick={() => handleWordClick(part, index, group)}
        >
          {isCorrected ? correction.SpellingWord : part}
        </button>
      )
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <SpellingModal
        selectedWord={selectedWord}
        currentCorrection={getCorrectionForPos(selectedWord.position, selectedWord.group)?.SpellingWord || ''}
        onSave={handleSaveCorrection}
        onClear={() => removeSpellingWord(selectedWord.position, selectedWord.group)}
      />

      <h1 className="text-2xl font-black text-slate-800 mb-8 border-l-4 border-primary-500 pl-4 uppercase tracking-tight">
        Spelling Task
      </h1>

      <div className="space-y-12">
        <section>
          <header className="mb-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Exercise Title</h3>
            <p className="text-sm text-slate-500">Correct any misspelled words in the title.</p>
          </header>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 min-h-[60px] leading-relaxed text-lg">
            {renderText(spellingTitle, 'title')}
          </div>
        </section>

        <section>
          <header className="mb-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Exercise Script</h3>
            <p className="text-sm text-slate-500">Click on words to provide their correct spelling.</p>
          </header>
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 min-h-[150px] leading-relaxed text-lg italic text-slate-700">
            {renderText(spellingScript, 'script')}
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
              Click on any <span className="font-bold underline">word</span> that is misspelled.
            </li>
            <li>
              In the menu that appears, type the <span className="font-bold underline">correct spelling</span> and click
              Save.
            </li>
            <li>
              Modified words will appear in <span className="font-bold text-amber-700">amber</span> and show the
              corrected version.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
