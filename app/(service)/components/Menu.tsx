'use client'
import {
  BookOpenIcon,
  ChevronDownIcon,
  HeadphonesIcon,
  LayoutDashboardIcon,
  type LucideIcon,
  MicVocalIcon,
  PenLineIcon,
  PlusIcon,
  UserIcon
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ReactNode, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Route {
  name: string
  href?: string
  Icon: LucideIcon
  children?: Route[]
}

const ROUTES: Route[] = [
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

function NavLink({
  href,
  Icon,
  children,
  isActive,
  className
}: {
  href: string
  Icon: LucideIcon
  children: ReactNode
  isActive: boolean
  className?: string
  onAction?: () => void
}) {
  return (
    <Link
      href={href}
      className={`flex w-full items-center gap-2 rounded-lg px-2 py-3 transition-colors hover:bg-primary-500 hover:text-primary-foreground ${
        isActive ? 'bg-primary-500 text-primary-foreground' : 'text-primary'
      } ${className}`}
    >
      <Icon size={20} />
      <span className="font-semibold">{children}</span>
    </Link>
  )
}

function NavItem({ route, pathname, onAction }: { route: Route; pathname: string; onAction?: () => void }) {
  const hasChildren = route.children && route.children.length > 0

  if (hasChildren) {
    return (
      <details className="group select-none">
        <summary className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-3 text-primary transition-colors hover:bg-primary-500 hover:text-primary-foreground">
          <route.Icon size={20} />
          <span className="font-bold">{route.name}</span>
          <ChevronDownIcon size={16} className="ml-auto transition-transform group-open:rotate-180" />
        </summary>
        <ul className="mt-1 flex flex-col gap-1 pl-4">
          {route.children?.map((child) => (
            <li key={child.name}>
              <NavLink
                href={child.href || '#'}
                Icon={child.Icon}
                isActive={pathname.startsWith(child.href || '')}
                onAction={onAction}
              >
                {child.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </details>
    )
  }

  return (
    <NavLink
      href={route.href || '#'}
      Icon={route.Icon}
      isActive={pathname.startsWith(route.href || '')}
      className="font-bold"
      onAction={onAction}
    >
      {route.name}
    </NavLink>
  )
}

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
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  // Handle ESC key or backdrop click via dialog events
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleClose = () => setIsOpen(false)
    const handleCancel = (e: Event) => {
      e.preventDefault()
      setIsOpen(false)
    }

    dialog.addEventListener('close', handleClose)
    dialog.addEventListener('cancel', handleCancel)

    return () => {
      dialog.removeEventListener('close', handleClose)
      dialog.removeEventListener('cancel', handleCancel)
    }
  }, [setIsOpen])

  const menuContent = (
    <ul className="flex flex-col gap-2 text-left">
      {ROUTES.map((route) => (
        <li key={route.name}>
          <NavItem route={route} pathname={pathname} />
        </li>
      ))}
    </ul>
  )

  return (
    <>
      {/* Mobile Modal (Dialog) */}
      <dialog
        ref={dialogRef}
        className="m-0 h-full max-h-none w-72 max-w-[80vw] bg-transparent p-0 backdrop:bg-black/50 backdrop:transition-opacity md:hidden"
        onClick={(e) => {
          if (e.target === dialogRef.current) setIsOpen(false)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setIsOpen(false)
        }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="h-full w-full bg-white p-4 shadow-xl"
            >
              <ul className="flex flex-col gap-2 text-left">
                {ROUTES.map((route) => (
                  <li key={route.name}>
                    <NavItem route={route} pathname={pathname} onAction={() => setIsOpen(false)} />
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>

      {/* Desktop Sidebar */}
      <nav
        className={`hidden min-h-screen border-r border-gray-100 bg-white p-4 transition-all md:block md:w-64 ${className}`}
        {...props}
      >
        {menuContent}
      </nav>
    </>
  )
}
