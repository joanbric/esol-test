import Punctuation from './components/Punctuation'
import Spelling from './components/Spelling'
import MultiChoice from './components/MultiChoice'
import WordOrder from './components/WordOrder'
import SentenceCompletion from './components/SentenceCompletion'
import PhrasalVerbs from './components/PhrasalVerbs'
import { WritingA1Test } from '@/types'
import Submit from './components/Submit'
export default async function WritingA1Page() {
  const res = await fetch('http://localhost:3000/api/tests/L2/writing/A1')
  const { test } = (await res.json()) as { test: WritingA1Test }
  return (
    <main className="max-w-7xl mx-auto px-2">
      <h1 className="text-center text-2xl lg:text-4xl font-bold">Writing Activity 1</h1>
      <h2 className="text-center text-xl lg:text-2xl font-bold mb-10">Hobbies and Interests</h2>

      {test && (
        <ol className="max-w-[80ch] mx-auto">
          <li>
            <Punctuation data={test.punctuation} />
          </li>
          <li>
            <Spelling data={test.spelling} />
          </li>
          <li>
            <MultiChoice data={test.multiChoice} />
          </li>
          <li>
            <WordOrder data={test.wordOrder} />
          </li>
          <li>
            <SentenceCompletion data={test.sentenceCompletion} />
          </li>
          <li>
            <PhrasalVerbs data={test.phrasalVerbs} />
          </li>
        </ol>
      )}
      <Submit />
    </main>
  )
}
