'use client'

import { useEffect, useRef, useState } from 'react'
import { useGlobalStore } from '@/libs/store/store'

interface AlternativeOption {
  id: number
  option: string
}

interface SelectedWord {
  index: number
  word: string
  alternativeOpts: AlternativeOption[]
}

function AlternativeWordsModal({
  selectedWord,
  onSave
}: {
  selectedWord: SelectedWord
  onSave: (options: AlternativeOption[]) => void
}) {
  const [alternativeOpts, setAlternativeOpts] = useState<AlternativeOption[]>([])
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    // Initialize with two empty options if none exist, or use provided options
    const initial = [...(selectedWord.alternativeOpts || [])]
    while (initial.length < 2) {
      initial.push({ id: initial.length, option: '' })
    }
    setAlternativeOpts(initial.slice(0, 2))
  }, [selectedWord])

  const handleOptionChange = (id: number, value: string) => {
    setAlternativeOpts((prev) => prev.map((opt) => (opt.id === id ? { ...opt, option: value } : opt)))
  }

  const handleClose = () => {
    // Only save if we have both options
    if (alternativeOpts.every((opt) => opt.option.trim() !== '')) {
      onSave(alternativeOpts)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      id="alternative-words"
      popover="auto"
      style={
        {
          positionAnchor: `--word-${selectedWord.index}`
        } as React.CSSProperties
      }
      className="absolute inset-auto m-0 p-4 bg-amber-50 rounded-xl shadow-2xl border-2 border-amber-200 backdrop:bg-slate-900/20 backdrop:backdrop-blur-sm focus:outline-none"
      onToggle={(e: React.ToggleEvent<HTMLDialogElement>) => {
        if (e.newState === 'closed') {
          handleClose()
        }
      }}
    >
      <div className="flex flex-col gap-3 min-w-64">
        <header className="flex justify-between items-center border-b border-amber-200 pb-2">
          <span className="text-lg font-bold text-amber-900 capitalize">{selectedWord.word}</span>
          <button
            type="button"
            className="text-amber-500 hover:text-amber-700 font-bold"
            onClick={() => dialogRef.current?.hidePopover()}
          >
            ✕
          </button>
        </header>

        <div className="space-y-2">
          <p className="text-xs font-medium text-amber-700">Add two alternative options:</p>
          {alternativeOpts.map((opt, idx) => (
            <div key={`${selectedWord.index}-opt-${opt.id}`} className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400 font-bold">{idx + 1}</span>
              <input
                type="text"
                placeholder={`Option ${idx + 1}`}
                className="block w-full pl-8 pr-3 py-2 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none text-slate-700 transition-all"
                value={opt.option}
                onChange={(e) => handleOptionChange(opt.id, e.target.value)}
              />
            </div>
          ))}
        </div>

        <footer className="mt-2 flex justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold shadow-md transition-colors"
            onClick={() => dialogRef.current?.hidePopover()}
          >
            Save Options
          </button>
        </footer>
      </div>
    </dialog>
  )
}

export default function MultichoiceStep() {
  const testTitle = useGlobalStore((state) => state.multiChoiceTitle)
  const multiChoiceScript = useGlobalStore((state) => state.multiChoiceScript)
  const multiChoiceOptions = useGlobalStore((state) => state.multiChoiceOptions)
  const setMultiChoiceOptions = useGlobalStore((state) => state.setMultiChoiceOptions)

  const [selectedWord, setSelectedWord] = useState<SelectedWord>({
    index: -1,
    word: '',
    alternativeOpts: []
  })

  const handleUpdateOptions = (newAlternatives: AlternativeOption[]) => {
    if (selectedWord.index === -1) return

    // Remove old options for this gapNumber
    const filteredOptions = multiChoiceOptions.filter((opt) => opt.gapNumber !== selectedWord.index)

    // Add new options: The correct word + the two alternatives
    const newOptions = [
      { gapNumber: selectedWord.index, option: selectedWord.word, isCorrect: true },
      ...newAlternatives.map((alt) => ({
        gapNumber: selectedWord.index,
        option: alt.option,
        isCorrect: false
      }))
    ]

    setMultiChoiceOptions([...filteredOptions, ...newOptions])
  }

  const handleWordClick = (word: string, index: number) => {
    const existingAlternatives = multiChoiceOptions
      .filter((opt) => opt.gapNumber === index && !opt.isCorrect)
      .map((opt, i) => ({ id: i, option: opt.option }))

    setSelectedWord({
      index,
      word,
      alternativeOpts: existingAlternatives
    })
  }

  const isWordSelected = (index: number) => {
    return multiChoiceOptions.some((opt) => opt.gapNumber === index)
  }

  const words = multiChoiceScript.split(/\s+/).filter(Boolean)

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <h1 className="text-2xl font-black text-slate-800 mb-6 border-l-4 border-amber-400 pl-4">
        {testTitle || 'Multi Choice Task'}
      </h1>

      <AlternativeWordsModal selectedWord={selectedWord} onSave={handleUpdateOptions} />

      <div className="bg-slate-50 p-8 rounded-xl leading-relaxed text-lg text-slate-700 min-h-[200px] border-2 border-dashed border-slate-200">
        {words.map((word, index) => {
          const isSelected = isWordSelected(index)
          const anchorName = `--word-${index}`

          return (
            <span key={`${anchorName}-${word}`} className="inline-block mr-1 mb-1">
              <button
                popoverTarget="alternative-words"
                type="button"
                className={`
                  px-2 py-0.5 rounded transition-all cursor-pointer
                  ${
                    isSelected
                      ? 'bg-amber-100 text-amber-900 font-bold border-b-2 border-amber-400 shadow-sm'
                      : 'hover:bg-slate-200 hover:text-slate-900 border-b-2 border-transparent'
                  }
                `}
                style={
                  {
                    anchorName: anchorName
                  } as React.CSSProperties
                }
                onClick={() => handleWordClick(word, index)}
              >
                {word}
              </button>
            </span>
          )
        })}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
        <div className="bg-blue-500 text-white rounded-full p-1 mt-0.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <title>Information</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-sm text-blue-800">
          Click on any word to turn it into a gap and add distractors (alternative options) for the student.
        </p>
      </div>
    </div>
  )
}
