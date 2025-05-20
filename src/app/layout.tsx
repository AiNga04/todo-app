import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import ThemeToggle from './components/ThemeToggle'

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A modern Todo application built with Next.js and Redux Toolkit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>
          <ThemeToggle />
          {children}
        </Providers>
      </body>
    </html>
  )
}
