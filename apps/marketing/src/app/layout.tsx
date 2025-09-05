import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'

const lato = Lato({ 
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato'
})

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sansation:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${lato.variable} font-lato`}>
        {children}
      </body>
    </html>
  )
}
