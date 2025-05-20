'use client'
import { useGlobalStore } from '@/libs/store/store'
import type { MultiChoiceParsed } from '@/types'
import { Card, CardHeader, CardBody } from '@heroui/card'
import { Select, SelectItem } from '@heroui/select'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

export default function MultiChoice({ data }: { data: MultiChoiceParsed }) {
  const { setMultiChoiceAnswer, setExerciseId } = useGlobalStore(
    useShallow((state) => ({
      setMultiChoiceAnswer: state.setMultiChoiceAnswer,
      setExerciseId: state.setExerciseId
    }))
  )

  useEffect(() => setExerciseId(data.id), [data.id])

  function handleSelectChange(gapID: number, optionID: number) {
    setMultiChoiceAnswer(gapID, optionID)
  }

  return (
    <Card className="md:px-10 py-4 my-6" shadow="sm">
      <CardHeader>
        <h3 className="font-bold text-lg">3. Complete the text by selecting the grammatically correct word.</h3>
      </CardHeader>
      <CardBody>
        <div>
          {data.exercise.split(/\{\{\d+\}\}/).map((part, index) => (
            <span key={index}>
              {part}
              {index < data.gaps.length && (
                <Select
                  as="span"
                  className="inline-flex w-[100px] my-1"
                  fullWidth={false}
                  radius="sm"
                  size="sm"
                  placeholder="Select an option"
                  variant="bordered"
                  isRequired
                  aria-label={`Select an option for gap ${index + 1}`}
                  onChange={(e) => handleSelectChange(data.gaps[index].gapID, parseInt(e.target.value))}
                >
                  {data.gaps[index].options.map((option) => (
                    <SelectItem key={option.id}>{option.word}</SelectItem>
                  ))}
                </Select>
              )}
            </span>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
