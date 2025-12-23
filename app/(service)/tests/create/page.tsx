import Link from 'next/link'

export default function CreateTestPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold text-primary-400 mb-5">Create Test</h1>
      <hr className="text-primary-200" />

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(156px,1fr))] gap-2 mt-5">
        <Link href="/tests/create/reading">
          <li className="aspect-square border-2 border-blue-300 flex items-center justify-center rounded-lg hover:bg-blue-50 text-lg">
            Reading
          </li>
        </Link>
        <Link href="/tests/create/writing/A1">
          <li className="aspect-square border-2 border-blue-300 flex items-center justify-center rounded-lg hover:bg-blue-50 text-lg">
            Writing A1
          </li>
        </Link>
        <Link href="/tests/create/writing/A2">
          <li className="aspect-square border-2 border-blue-300 flex items-center justify-center rounded-lg hover:bg-blue-50 text-lg">
            Writing A2
          </li>
        </Link>
        <Link href="/tests/create/writing/A3">
          <li className="aspect-square border-2 border-blue-300 flex items-center justify-center rounded-lg hover:bg-blue-50 text-lg">
            Writing A3
          </li>
        </Link>
      </ul>
    </main>
  )
}
