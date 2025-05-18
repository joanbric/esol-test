'use client'
import { Button } from '@heroui/button'
import { useGlobalStore } from '@/libs/store/store'
import { submitWritingA1Answers } from '@/app/actions'

export default function Submit() {
  const SpellingAnswers = useGlobalStore((state) => state.SpellingAnswer)
  const MultiChoiceAnswers = useGlobalStore((state) => state.MultiChoiceAnswer)
  const MultiChoiceExerciseId = useGlobalStore((state) => state.MultiChoiceExerciseId)
  const WordOrderAnswers = useGlobalStore((state) => state.WordOrderAnswer)
  const WordOrderExerciseId = useGlobalStore((state) => state.WordOrderExerciseId)
  const SentenceCompletionAnswers = useGlobalStore((state) => state.SentenceCompletionAnswer)
  const PhrasalVerbsAnswers = useGlobalStore((state) => state.PhrasalVerbsAnswer)

  const dataToSend = {
    answer: {
      SpellingExerciseId: 1,
      SpellingAnswer: SpellingAnswers,
      MultiChoiceExerciseId,
      MultiChoiceAnswer: MultiChoiceAnswers,
      WordOrderExerciseId,
      WordOrderAnswer: WordOrderAnswers,
      SentenceCompletionExerciseId: 1,
      SentenceCompletionAnswer: SentenceCompletionAnswers,
      PhrasalVerbsExerciseId: 1,
      PhrasalVerbsAnswer: PhrasalVerbsAnswers
    }
  }

  return (
    <Button
      onPress={() => submitWritingA1Answers(dataToSend)}
      variant="solid"
      color="primary"
      className="w-full max-w-[80ch] mx-auto mb-10 mt-6 block font-bold"
      size="lg"
    >
      Submit
    </Button>
  )
}
