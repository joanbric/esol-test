'use client'
import { useState } from 'react'
import { SignedIn, UserButton } from '@clerk/nextjs'
import Menu from './components/Menu'
import ToggleButton from './components/Toggle'
export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <header className="flex md:justify-end justify-between p-4 min-h-16">
        <ToggleButton isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
        <SignedIn>
          <UserButton showName />
        </SignedIn>
      </header>
      <div className='flex gap-4 max-w-7xl mx-auto'>
        <Menu className='w-64' isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className='flex-1 p-4'>
          {children}
        </div>
      </div>
    </>
  )
}
