'use client'

import type { ReactNode } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useGlobalStore } from '@/libs/store/store'
import Link from 'next/link'

// --- Constants & Types ---

const STYLES = {
  label: 'block text-sm font-semibold text-primary-500 mb-1',
  input:
    'w-full px-4 py-2 bg-white border-2 border-primary-100 rounded-xl focus:outline-none focus:border-primary-400 transition-all text-gray-700',
  card: 'p-6 my-4 bg-white border border-primary-500/10 rounded-2xl shadow-sm',
  button: 'px-4 py-2 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed',
  addBtn: 'bg-primary-100 text-primary-600 hover:bg-primary-200 mt-2 flex items-center gap-2',
  removeBtn: 'bg-red-50 text-red-500 hover:bg-red-100 p-2 flex items-center justify-center'
}

interface SentenceItem {
  id: string
  sentence: string
}

// --- Sub-components ---

function Field({
  label,
  id,
  children,
  className
}: {
  label: string
  id: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className={STYLES.label}>
        {label}
      </label>
      {children}
    </div>
  )
}

function FormSection({ number, title, children }: { number?: number; title: string; children: ReactNode }) {
  return (
    <div className={STYLES.card}>
      <h2 className="text-xl font-bold text-primary-500 mb-4 flex items-center gap-2">
        {number && (
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-sm font-bold">
            {number}
          </span>
        )}
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function DynamicListField({
  items,
  placeholder,
  name,
  onAdd,
  onRemove,
  onChange
}: {
  items: SentenceItem[]
  placeholder: string
  name: string
  onAdd: () => void
  onRemove: (id: string) => void
  onChange: (id: string, value: string) => void
}) {
  return (
    <div className="space-y-4">
      <ol className="list-decimal list-inside space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex gap-2 items-center">
            <input
              type="text"
              name={name}
              value={item.sentence}
              onChange={(e) => onChange(item.id, e.target.value)}
              className={STYLES.input}
              placeholder={placeholder}
            />
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className={`${STYLES.button} ${STYLES.removeBtn}`}
                aria-label="Remove item"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>Remove Item</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </li>
        ))}
      </ol>
      <button type="button" onClick={onAdd} className={`${STYLES.button} ${STYLES.addBtn}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Add Item</title>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Item
      </button>
    </div>
  )
}

// --- Main Page Component ---

export default function CreateWritingA1Page() {
  const store = useGlobalStore(
    useShallow((state) => ({
      // State
      testTitle: state.testTitle,
      testDescription: state.testDescription,
      topicId: state.topicId,
      levelId: state.levelId,
      punctuationTitle: state.punctuationTitle,
      punctuationScript: state.punctuationScript,
      spellingTitle: state.spellingTitle,
      spellingScript: state.spellingScript,
      multiChoiceTitle: state.multiChoiceTitle,
      multiChoiceScript: state.multiChoiceScript,
      wordOrderSentences: state.wordOrderSentences,
      sentenceCompletionBeginning: state.sentenceCompletionBeginning,
      phrasalVerbsSentences: state.phrasalVerbsSentences,
      // Actions
      setTestTitle: state.setTestTitle,
      setTestDescription: state.setTestDescription,
      setTopicId: state.setTopicId,
      setLevelId: state.setLevelId,
      setPunctuationTitle: state.setPunctuationTitle,
      setPunctuationScript: state.setPunctuationScript,
      setSpellingTitle: state.setSpellingTitle,
      setSpellingScript: state.setSpellingScript,
      setMultiChoiceTitle: state.setMultiChoiceTitle,
      setMultiChoiceScript: state.setMultiChoiceScript,
      setWordOrderSentences: state.setWordOrderSentences,
      setSentenceCompletionBeginning: state.setSentenceCompletionBeginning,
      setPhrasalVerbsSentences: state.setPhrasalVerbsSentences
    }))
  )

  const handleAddItem = (setter: (sentences: SentenceItem[]) => void, current: SentenceItem[]) => {
    setter([...current, { id: crypto.randomUUID(), sentence: '' }])
  }

  const handleRemoveItem = (id: string, setter: (sentences: SentenceItem[]) => void, current: SentenceItem[]) => {
    if (current.length > 1) {
      setter(current.filter((item) => item.id !== id))
    }
  }

  const handleInputChange = (
    id: string,
    sentence: string,
    setter: (sentences: SentenceItem[]) => void,
    current: SentenceItem[]
  ) => {
    setter(current.map((item) => (item.id === id ? { ...item, sentence } : item)))
  }

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-primary-400 mb-2">Create Writing A1</h1>
        <p className="text-gray-500">Set up a new Writing Activity 1 assessment</p>
      </header>

      <form className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Title" id="testTitle" className="md:col-span-2">
            <input
              type="text"
              id="testTitle"
              name="testTitle"
              value={store.testTitle}
              onChange={(e) => store.setTestTitle(e.target.value)}
              className={STYLES.input}
              placeholder="e.g. Daily Routine Practice"
              required
            />
          </Field>

          <Field label="Description" id="testDescription" className="md:col-span-2">
            <textarea
              id="testDescription"
              name="testDescription"
              value={store.testDescription}
              onChange={(e) => store.setTestDescription(e.target.value)}
              className={`${STYLES.input} min-h-[100px] resize-y`}
              placeholder="Provide a short description..."
            />
          </Field>

          <Field label="Topic" id="topicId">
            <select
              id="topicId"
              name="topicId"
              value={store.topicId}
              onChange={(e) => store.setTopicId(e.target.value)}
              className={STYLES.input}
              required
            >
              <option value="" disabled>
                Choose a topic
              </option>
              {['Community', 'Family', 'Health', 'Hobbies', 'Holidays', 'Home', 'School', 'Work'].map(
                (topic, index) => (
                  <option key={topic} value={index}>
                    {topic}
                  </option>
                )
              )}
            </select>
          </Field>

          <Field label="Level" id="levelId">
            <select
              id="levelId"
              name="levelId"
              value={store.levelId}
              onChange={(e) => store.setLevelId(e.target.value)}
              className={STYLES.input}
              required
            >
              <option value="" disabled>
                Choose a level
              </option>
              {['E1', 'E2', 'L1', 'L2'].map((level, index) => (
                <option key={level} value={index}>
                  {level}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {/* Sections */}
        <FormSection number={1} title="Punctuation">
          <Field label="Script Title" id="punctuationTitle">
            <input
              type="text"
              id="punctuationTitle"
              name="punctuationTitle"
              value={store.punctuationTitle}
              onChange={(e) => store.setPunctuationTitle(e.target.value)}
              className={STYLES.input}
              placeholder="Title for the punctuation exercise"
            />
          </Field>
          <Field label="Script" id="punctuationScript">
            <textarea
              id="punctuationScript"
              name="punctuationScript"
              value={store.punctuationScript}
              onChange={(e) => store.setPunctuationScript(e.target.value)}
              className={`${STYLES.input} min-h-[120px]`}
              placeholder="Enter the text for punctuation assessment..."
            />
          </Field>
        </FormSection>

        <FormSection number={2} title="Spelling">
          <Field label="Title" id="spellingTitle">
            <input
              type="text"
              id="spellingTitle"
              name="spellingTitle"
              value={store.spellingTitle}
              onChange={(e) => store.setSpellingTitle(e.target.value)}
              className={STYLES.input}
              placeholder="Title for the spelling exercise"
            />
          </Field>
          <Field label="Text" id="spellingScript">
            <textarea
              id="spellingScript"
              name="spellingScript"
              value={store.spellingScript}
              onChange={(e) => store.setSpellingScript(e.target.value)}
              className={`${STYLES.input} min-h-[120px]`}
              placeholder="Enter the text for spelling assessment..."
            />
          </Field>
        </FormSection>

        <FormSection number={3} title="Grammar">
          <Field label="Title" id="grammarTitle">
            <input
              type="text"
              id="grammarTitle"
              name="grammarTitle"
              value={store.multiChoiceTitle}
              onChange={(e) => store.setMultiChoiceTitle(e.target.value)}
              className={STYLES.input}
              placeholder="Title for the grammar exercise"
            />
          </Field>
          <Field label="Text" id="grammarScript">
            <textarea
              id="grammarScript"
              name="grammarScript"
              value={store.multiChoiceScript}
              onChange={(e) => store.setMultiChoiceScript(e.target.value)}
              className={`${STYLES.input} min-h-[120px]`}
              placeholder="Enter the text for grammar assessment..."
            />
          </Field>
        </FormSection>

        <FormSection number={4} title="Word Order">
          <DynamicListField
            label="Sentence"
            name="wordOrders"
            items={store.wordOrderSentences}
            placeholder="Write the text for word order exercise"
            onAdd={() => handleAddItem(store.setWordOrderSentences, store.wordOrderSentences)}
            onRemove={(id) => handleRemoveItem(id, store.setWordOrderSentences, store.wordOrderSentences)}
            onChange={(id, value) =>
              handleInputChange(id, value, store.setWordOrderSentences, store.wordOrderSentences)
            }
          />
        </FormSection>

        <FormSection number={5} title="Sentence Completion">
          <DynamicListField
            label="Beginning Text"
            name="sentenceCompletionBeginning"
            items={store.sentenceCompletionBeginning}
            placeholder="Write the starting text for this exercise"
            onAdd={() => handleAddItem(store.setSentenceCompletionBeginning, store.sentenceCompletionBeginning)}
            onRemove={(id) =>
              handleRemoveItem(id, store.setSentenceCompletionBeginning, store.sentenceCompletionBeginning)
            }
            onChange={(id, value) =>
              handleInputChange(id, value, store.setSentenceCompletionBeginning, store.sentenceCompletionBeginning)
            }
          />
        </FormSection>

        <FormSection number={6} title="Write sentences with verbs">
          <DynamicListField
            label="Verb/Phrase"
            name="phrasalVerbsSentences"
            items={store.phrasalVerbsSentences}
            placeholder="Write the starting text for this exercise"
            onAdd={() => handleAddItem(store.setPhrasalVerbsSentences, store.phrasalVerbsSentences)}
            onRemove={(id) => handleRemoveItem(id, store.setPhrasalVerbsSentences, store.phrasalVerbsSentences)}
            onChange={(id, value) =>
              handleInputChange(id, value, store.setPhrasalVerbsSentences, store.phrasalVerbsSentences)
            }
          />
        </FormSection>

        <footer className="pt-4 border-t border-primary-100 flex justify-end">
          <Link
            href="/tests/create/writing/A1/1"
            className={`${STYLES.button} bg-primary-500 text-white shadow-lg border-b-4 border-primary-700 hover:bg-primary-600 hover:-translate-y-0.5 active:translate-y-0 active:border-b-0 px-8 py-3`}
          >
            Start Creation Steps
          </Link>
        </footer>
      </form>
    </main>
  )
}
