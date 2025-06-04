import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ProtectedLayout from '@/components/ProtectedLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Creative Portfolio | Interactive Developer Portfolio',
  description: 'Explore my interactive portfolio featuring modern web development projects, creative UI/UX designs, and innovative solutions.',
  keywords: 'portfolio, web developer, frontend, UI/UX, interactive design, creative developer',
  openGraph: {
    title: 'Creative Portfolio | Interactive Developer Portfolio',
    description: 'Explore my interactive portfolio featuring modern web development projects and creative designs.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creative Portfolio | Interactive Developer Portfolio',
    description: 'Explore my interactive portfolio featuring modern web development projects and creative designs.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProtectedLayout>{children}</ProtectedLayout>
      </body>
    </html>
  )
} 