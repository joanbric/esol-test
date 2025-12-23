import { Menu, X } from 'lucide-react'

interface ToggleButtonProps {
  isOpen: boolean
  toggle: () => void
}

export default function ToggleButton({ isOpen, toggle }: ToggleButtonProps) {
  return (
    <button
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      className="relative flex items-center justify-center w-12 h-12 p-2 rounded-full transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-500 md:hidden"
      onClick={toggle}
    >
      <div className="relative w-6 h-6">
        <span
          className={`absolute inset-0 transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
        >
          <Menu className="w-6 h-6 text-primary-600" />
        </span>
        <span
          className={`absolute inset-0 transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
          }`}
        >
          <X className="w-6 h-6 text-red-600" />
        </span>
      </div>
    </button>
  )
}