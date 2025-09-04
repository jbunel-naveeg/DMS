import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Naveeg - Automated WordPress Site Creation',
  description: 'Create professional WordPress websites in minutes with AI-powered automation. Perfect for solopreneurs and SMEs.',
  keywords: ['WordPress', 'website builder', 'AI', 'automation', 'SaaS'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
