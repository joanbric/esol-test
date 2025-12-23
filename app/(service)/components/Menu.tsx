'use client'
import { usePathname } from 'next/navigation'
import {
  BookOpenIcon,
  ChevronDownIcon,
  HeadphonesIcon,
  LayoutDashboardIcon,
  MicVocalIcon,
  PenLineIcon,
  PlusIcon,
  UserIcon
} from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
export default function Menu({
  className,
  isOpen,
  setIsOpen,
  ...props
}: {
  className?: string
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}) {
  const pathname = usePathname()
  const routes = [
    { name: 'Dashboard', href: '/dashboard', Icon: LayoutDashboardIcon },
    {
      name: 'Tests',
      Icon: BookOpenIcon,
      children: [
        { name: 'Reading', href: '/tests/L2/reading', Icon: BookOpenIcon },
        { name: 'Writing A1', href: '/tests/L2/writing/A1', Icon: PenLineIcon },
        { name: 'Writing A2', href: '/tests/L2/writing/A2', Icon: PenLineIcon },
        { name: 'Writing A3', href: '/tests/L2/writing/A3', Icon: PenLineIcon },
        { name: 'Listening', href: '/tests/L2/listening', Icon: HeadphonesIcon },
        { name: 'Speaking', href: '/tests/L2/speaking', Icon: MicVocalIcon },
        { name: 'Create Test', href: '/tests/create', Icon: PlusIcon }
      ]
    },
    { name: 'Profile', href: '/profile', Icon: UserIcon }
  ]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  return (
    <div className={` ${isOpen ? 'block' : 'hidden md:block'} z-50`}>
      <div
        onScrollCapture={(e) => e.stopPropagation()}
        className="md:hidden max-h-screen bg-black/50 fixed inset-0"
        onClick={() => setIsOpen(false)}
      ></div>
      <nav
        className={`p-4 absolute bg-white rounded-xl shadow-md min-h-screen top-0 md:static ${className}`}
        {...props}
      >
        <ul className="text-left flex flex-col gap-2">
          {routes.map((route) => (
            <li key={route.name}>
              {route.children ? (
                <details className="group select-none open:bg-primary-50">
                  <summary className="text-primary font-bold hover:text-primary-foreground transition-colors hover:bg-primary-500 px-2 py-3 rounded-lg w-full flex items-center gap-2">
                    <route.Icon />
                    {route.name}
                    <ChevronDownIcon className="group-open:rotate-180 transition-transform" />
                  </summary>
                  <ul className="ps-4">
                    {route.children.map((child) => (
                      <li key={child.name} className="py-2">
                        <Link
                          className={`text-primary font-semibold hover:text-primary-foreground transition-colors hover:bg-primary-500 px-2 py-3 rounded-lg w-full flex items-center gap-2 ${pathname.startsWith(child.href) ? 'bg-primary-500 text-primary-foreground' : ''}`}
                          href={child.href}
                        >
                          <child.Icon />
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <Link
                  className={`text-primary font-bold hover:text-primary-foreground transition-colors hover:bg-primary-500 px-2 py-3 rounded-lg w-full flex items-center gap-2 ${pathname.startsWith(route.href) ? 'bg-primary-50' : ''}`}
                  href={route.href}
                >
                  <route.Icon />
                  {route.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
