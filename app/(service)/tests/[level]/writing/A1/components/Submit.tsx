'use client'
import { Button } from '@heroui/button'
import { addToast, ToastProvider } from '@heroui/toast'
import { useGlobalStore } from '@/libs/store/store'
import { submitExerciseAnswers } from '@/app/actions/submitWA1Answers'
import { WritingA1Answer } from '@/types'
import { useEffect, useState } from 'react'

export default function Submit() {
  const [success, setSuccess] = useState(false)

  const setWritingA1Solutions = useGlobalStore(
    (state) => state.setWritingA1Solutions
  )


  useEffect(() => {
    if (success) {
      fetch('/api/tests/L1/writing/A1/solutions')
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch solutions')
          }
          return res.json()
        })
        .then((data) => {
          setWritingA1Solutions(data.solutions)
        }).catch((err) => {
          console.error(err)
        })
    }
  }, [success])

  const PunctuationExerciseId = useGlobalStore(
    (state) => state.PunctuationExerciseId
  )
  const setIsSolved = useGlobalStore((state) => state.setIsSolved)
  const PunctuationAnswers = useGlobalStore((state) => state.PunctuationAnswer)
  const SpellingAnswers = useGlobalStore((state) => state.SpellingAnswer)
  const MultiChoiceAnswers = useGlobalStore((state) => state.MultiChoiceAnswer)
  const MultiChoiceExerciseId = useGlobalStore(
    (state) => state.MultiChoiceExerciseId
  )
  const WordOrderAnswers = useGlobalStore((state) => state.WordOrderAnswer)
  const WordOrderExerciseId = useGlobalStore(
    (state) => state.WordOrderExerciseId
  )
  const SentenceCompletionAnswers = useGlobalStore(
    (state) => state.SentenceCompletionAnswer
  )
  const PhrasalVerbsAnswers = useGlobalStore(
    (state) => state.PhrasalVerbsAnswer
  )

  const dataToSend: WritingA1Answer = {
    testId: 1,
    punctuation: {
      PunctuationExerciseId,
      PunctuationAnswer: PunctuationAnswers
    },
    spelling: {
      SpellingExerciseId: 1,
      SpellingAnswer: SpellingAnswers
    },
    multiChoice: {
      MultiChoiceExerciseId,
      MultiChoiceAnswer: MultiChoiceAnswers
    },
    wordOrder: {
      WordOrderExerciseId,
      WordOrderAnswer: WordOrderAnswers
    },
    sentenceCompletion: {
      SentenceCompletionExerciseId: 1,
      SentenceCompletionAnswer: SentenceCompletionAnswers
    },
    phrasalVerbs: {
      PhrasalVerbsExerciseId: 1,
      PhrasalVerbsAnswer: PhrasalVerbsAnswers
    }
  }

  // const testingToast = () => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(true)
  //     }, 2000)
  //   })
  // }
  const submitAnswersHandler = async () => {
    const actionResult = await submitExerciseAnswers(dataToSend)
    setSuccess(actionResult.success)
    if (actionResult.success) {
      setIsSolved(true)
      addToast({
        title: 'Answers submitted successfully',
        description: actionResult.msg,
        color: 'success',
        timeout: 2000
      })
    } else {
      addToast({
        title: 'Failed to submit answers',
        description: actionResult.msg,
        color: 'danger',
        timeout: 4000
      })
    }
  }

  return (
    <>
      <ToastProvider placement="top-right" toastOffset={20} />
      <Button
        isDisabled={success}
        
        onPress={() => {
          addToast({
            title: 'Submitting answers...',
            color: 'primary',
            timeout: 100,
            promise: submitAnswersHandler()
          })
        }}
        variant="solid"
        color="primary"
        className={`w-full max-w-[80ch] mx-auto mb-10 mt-6 block font-bold ${success ? 'cursor-not-allowed hover:cursor-not-allowed' : ''}`}
        size="lg"
      >
        Submit
      </Button>
    </>
  )
}
