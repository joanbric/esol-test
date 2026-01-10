'use client'
import { MoveLeftIcon, MoveRightIcon } from 'lucide-react'
import Link from 'next/link'
import { useGlobalStore } from '@/libs/store/store'
import { useParams, useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { type State, submitWA1Test } from '@/app/actions/submitWA1Test'

const initActionState: State = {
  success: false,
  errors: undefined,
  fields: {},
  msg: ''
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const store = useGlobalStore()
  const { step } = useParams<{ step: string }>()
  const router = useRouter()
  const stepInt = parseInt(step, 10)
  const totalSteps = 6
  const [actionState, formAction, isPending] = useActionState(submitWA1Test, initActionState)

  useEffect(() => {
    if (actionState.success) {
      alert('Test created successfully!')
      router.push('/tests') // or wherever appropriate
    } else if (actionState.msg) {
      alert(actionState.msg)
    }
  }, [actionState, router])

  // Serialize store data (exclude functions)
  const storeData = JSON.stringify(store)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={stepInt === 1 ? '/tests/create/writing/A1' : `/tests/create/writing/A1/${stepInt - 1}`}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-primary"
              aria-label="Go back"
            >
              <MoveLeftIcon size={24} />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight truncate max-w-[200px] md:max-w-md">
                {store.testTitle || 'Untitled Assessment'}
              </h1>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                Step {step} of {totalSteps}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {stepInt < totalSteps ? (
              <Link
                href={`/tests/create/writing/A1/${stepInt + 1}`}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
              >
                <span>Next</span>
                <MoveRightIcon size={20} />
              </Link>
            ) : null}

            {stepInt === totalSteps && (
              <button
                type="submit"
                form="assessment-form"
                disabled={isPending}
                className="px-6 py-2 bg-primary-500 text-white font-bold rounded-xl shadow-lg border-b-4 border-primary-700 hover:bg-primary-600 hover:-translate-y-0.5 active:translate-y-0 active:border-b-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating...
                  </span>
                ) : (
                  'Finish & Create'
                )}
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 max-w-4xl mx-auto h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 transition-all duration-500 ease-out"
            style={{ width: `${(stepInt / totalSteps) * 100}%` }}
          />
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
        <form id="assessment-form" action={formAction}>
          <input type="hidden" name="storeData" value={storeData} />
          {children}
        </form>
      </main>
    </div>
  )
}
