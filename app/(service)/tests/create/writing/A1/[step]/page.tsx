'use client'

import { notFound, redirect, useParams } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'
import { useGlobalStore } from '@/libs/store/store'
import PunctuationStep from './steps/aPunctuation'
import SpellingStep from './steps/bSpelling'
import MultichoiceStep from './steps/cMultichoice'
import WordOrderStep from './steps/dWordOrder'
import SentenceCompletionStep from './steps/eSentenceCompletion'
import PhrasalVerbsStep from './steps/fPhrasalVerbs'

export default function CreateWA1TestStepPage() {
  const testTitle = useGlobalStore(useShallow((state) => state.testTitle))
  const { step } = useParams<{ step: string }>()

  if (!/^[1-6]$/.test(step)) {
    notFound()
  }
  if (testTitle === '') {
    redirect('/tests/create/writing/A1')
  }
  const stepInt = parseInt(step, 10)

  return (
    <>
      {stepInt === 1 && <PunctuationStep />}
      {stepInt === 2 && <SpellingStep />}
      {stepInt === 3 && <MultichoiceStep />}
      {stepInt === 4 && <WordOrderStep />}
      {stepInt === 5 && <SentenceCompletionStep />}
      {stepInt === 6 && <PhrasalVerbsStep />}
    </>
  )
}
