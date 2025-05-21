import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { GraduationCap } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm mb-6">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-2 cursor-pointer" href="/">
          <GraduationCap className="h-8 w-8 text-emerald-600" />
          <span className="text-2xl font-extrabold tracking-tight text-gray-900">
            ESOL Practise
          </span>
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link
            href="/#features"
            className="text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/#testimonials"
            className="text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="/#pricing"
            className="text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors"
          >
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {/* <Link
            href="/login"
            className="text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors"
          >
            Log in
          </Link> */}
          <SignedOut>
            <SignInButton mode="modal" />
            <Link
              href="/test/demo"
              className="rounded-full bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-emerald-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Get Started
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton showName />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
