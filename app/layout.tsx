import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Providers } from './providers'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from './components/Header'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'ESOL Test',
  description:
    'A website where you can take practice tests for the ESOL course based on City & Guilds exams.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
