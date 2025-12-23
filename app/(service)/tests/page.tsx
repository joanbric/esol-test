import Link from 'next/link'

export default function TestsPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold text-primary-400 mb-5">Tests</h1>
      <hr className="text-primary-200" />
      <Link href="/tests/L2/reading">Reading</Link>
      <Link href="/tests/L2/writing/A1">Writing A1</Link>
      <Link href="/tests/L2/writing/A2">Writing A2</Link>
      <Link href="/tests/L2/writing/A3">Writing A3</Link>
    </main>
  )
}
