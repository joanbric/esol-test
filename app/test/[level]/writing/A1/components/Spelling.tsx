import type { Spelling, SpellingWord } from '@/types'
import { Card, CardHeader, CardBody } from '@heroui/card'
import InputWord from './InputWord'

const textParse = (text: string): SpellingWord[] =>
  ` ${text} `.match(/\S+/g)?.map((word, index) => ({
    word,
    position: index,
    isChanged: false
  })) || []

export default function Spelling({ data }: { data: Spelling }) {
  const script = textParse(data.script)

  return (
    <Card className="md:px-10 my-6 py-4" shadow="sm">
      <CardHeader>
        <h3 className="font-bold text-lg">
          2. Read the text and underline the six spelling errors. Write the
          correct spellings on the line.
        </h3>
      </CardHeader>
      <CardBody>
        <div className="leading-12 text-xl text-gray-700 flex gap-1 flex-wrap">
          {script.map((word, index) => (
            <InputWord key={index} word={word} />
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
