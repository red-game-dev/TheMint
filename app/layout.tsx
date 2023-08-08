import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { AppProvider } from './AppProvider';
import { Navigation } from '@/components/navigation/Navigation';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smol caviar frontend',
  description: 'A smol frontend for caviar testing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Navigation />
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
