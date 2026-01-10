import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRouter = createRouteMatcher(['/sign-in', '/sign-up', '/sign-out', '/test/demo'])
const isProtectedRouter = createRouteMatcher(['/test(.*)'])
const isHome = createRouteMatcher(['/'])

export default clerkMiddleware(async (authentication, req) => {
  if (isPublicRouter(req)) return NextResponse.next()
  const auth = await authentication()

  if (isHome(req) && auth.userId) return NextResponse.redirect(new URL('/dashboard', req.url))

  // Si es test y NO está logueado, permitir solo si no ha hecho el test hoy
  if (req.nextUrl.pathname.startsWith('/test/') && !auth.userId) {
    // Llama a la API para verificar acceso por IP
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/test-access`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': req.headers.get('x-forwarded-for') || ''
      },
      body: JSON.stringify({ testId: 1 }) // testId hardcodeado, puedes mejorarlo
    })
    if (res.status === 403) {
      // Redirige a login si ya accedió hoy
      return NextResponse.redirect(new URL('/login', req.url))
    }
    // Si no ha accedido hoy, permite el acceso
    return NextResponse.next()
  }

  // Proteger rutas privadas para usuarios logueados
  if (isProtectedRouter(req)) await authentication.protect()

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
}
