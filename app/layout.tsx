import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/Nav'
import { CustomCursor } from '@/components/CustomCursor'
import { Footer } from '@/components/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nikeshkumar.dev'),
  title: {
    default: 'Nikesh Kumar T.K — Software Engineer',
    template: '%s — Nikesh Kumar T.K',
  },
  description:
    'Software engineer working on serverless products with Node.js, TypeScript, AWS Lambda, DynamoDB, CDK, and React.',
  openGraph: {
    type: 'website',
    title: 'Nikesh Kumar T.K — Software Engineer',
    description:
      'Software engineer working on serverless products with Node.js, TypeScript, AWS Lambda, DynamoDB, CDK, and React.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#080808',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-bg text-body">
        <CustomCursor />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
