import Punctuation from './components/Punctuation'
import Spelling from './components/Spelling'
import MultiChoice from './components/MultiChoice'
import WordOrder from './components/WordOrder'
import SentenceCompletion from './components/SentenceCompletion'
import PhrasalVerbs from './components/PhrasalVerbs'
import { WritingA1Test } from '@/types'
import Submit from './components/Submit'
export default async function WritingA1Page() {
  // Get user IP (SSR only)
  let allowed = true
  let reason = ''
  if (typeof window === 'undefined') {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test-access`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ testId: 1 })
    })
    const data = await res.json()
    allowed = data.allowed
    reason = data.reason || ''
  }
  if (!allowed) {
    // Redirect to login if not allowed
    if (reason === 'already-accessed') {
      if (typeof window === 'undefined') {
        // SSR redirect
        return (
          <main className="max-w-7xl mx-auto px-2 text-center mt-20">
            <h1 className="text-2xl font-bold mb-4">Solo puedes hacer este test una vez al día sin iniciar sesión.</h1>
            <a href="/sign-in" className="text-emerald-600 underline font-bold">Inicia sesión para continuar</a>
          </main>
        )
      }
    }
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tests/L2/writing/A1`)
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
